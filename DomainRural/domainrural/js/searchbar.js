var $baseUrl = $formCloseTown = $formSearchType = $formRegion = $agentTown = '';

if ($('#base_url').length > 0) {
    $baseUrl = $('#base_url').val();
}
if ($('#form_closeTown').length > 0 ) {
    $formCloseTown = $('#form_closeTown').val();
}
if ($('#form_searchType').length > 0) {
    $formSearchType = $('#form_searchType').val();
}
if ($('#form_region').length > 0) {
    $formRegion = $('#form_region').val();
}


$(window).load(function() {

//	   $('#searchbox').hide();
//        $('#searchboxagent').hide();
//        $('#open-gate').show();

    var closeTownInitV = $formCloseTown,
		$matchFound    = ($('#form_closeTown').val()) ? true : false,
		$townSearch    = false;

    if ($('#faRegion').val() === 'All' && $('#faState').val() === 'All') {
        $('#faRegion').prop('disabled', true).trigger('liszt:updated');
    }

	$('#search-button-agent').on('click', function(e) {
		if ($townSearch) {
			if ($agentTown && $matchFound) {
				$('#faCloseTownIn').val($agentTown);
			} else if (!$agentTown && !$matchFound) {
				$('#faCloseTownIn').val('');
				$townSearch = false;
				e.preventDefault();
			}
		}
	});

	$('#faCloseTownIn').autocomplete({
		autoFocus: true,
		delay: 0,
        minLength: 3,
        source: function(request, response) {
			$.ajax({
				url: '/listings/getCloseTown',
				dataType: 'json',
				data: {
					region : $('#faRegion').val(),
					state  : $('#faState').val(),
					term   : request.term
				},
				success: function(data) {
					response($.map(data, function(item) {
						return {
							label: item.label,
							value: item.value
						};
					}));
				}
			});
		},
		focus: function(event, ui) {
			$townSearch = true;

			if (ui.item.value) {
				$agentTown  = ui.item.value;
				$matchFound = true;
			} else {
				$agentTown  = '';
				$matchFound = false;
			}
		},
        select: function(event, ui) {
			$(this).val(ui.item.value);

			if (ui.item.value) {
				// Set the state dropdown
				var part = ui.item.value.split(',');
				$('#faState').val($.trim(part[1])).trigger('liszt:updated');
				$('#faState').chosen().change();

				// Set the region dropdown
				//if ($('#faRegion').val() === 'All') {
					var req = {
						pid: new Date().getTime(),
						value: ui.item.value
					};
					$.getJSON('/listings/getRegionByStateTown', req, function(data) {
						$('#faRegion').prop('disabled', false).val(data.region).trigger('liszt:updated');
					});
				//}
			}
        }
    });

	$('#search-button').on('click', function(e) {
		if ($townSearch) {
			if ($vars.detailedSearch && $matchFound) {
				$('#dsCloseTownIn').val($vars.detailedSearch);
			} else if (!$vars.detailedSearch && !$matchFound) {
				$('#dsCloseTownIn').val('');
				$townSearch = false;
				e.preventDefault();
			}
		}
	});

	$('#dsCloseTownIn').autocomplete({
		autoFocus: true,
		delay: 0,
        minLength: 3,
        source: function(request, response) {
			$.ajax({
				url: '/listings/getCloseTown',
				dataType: 'json',
				data: {
					region : $('#dsRegion').val(),
					state  : $('#dsState').val(),
					term   : request.term
				},
				success: function(data) {
					response($.map(data, function(item) {
						return {
							label: item.label,
							value: item.value
						};
					}));
				}
			});
		},
		focus: function(event, ui) {
			$townSearch = true;

			if (ui.item.value) {
				$vars.detailedSearch = ui.item.value;
				$matchFound = true;
			} else {
				$vars.detailedSearch = '';
				$matchFound = false;
			}
		},
        select: function(event, ui) {
			$(this).val(ui.item.value);

			if (ui.item.value) {
				// Set the state dropdown
				var part = ui.item.value.split(',');
				$('#dsState').val($.trim(part[1]))
					.trigger('liszt:updated')
					.chosen()
					.change();

				// Set the region dropdown
				if ($('#dsRegion').val() === 'All') {
					var req = {
						pid: new Date().getTime(),
						value: ui.item.value
					};
					$.getJSON('/listings/getRegionByStateTown', req, function(data) {
						$('#dsRegion').prop('disabled', false).val(data.region).trigger('liszt:updated');
					});
				}
			}
        }
    });

    $('#vrCloseTownx').autocomplete({
        minLength: 3,
        source: function(req, res) {
            req.region = 'All';
            req.state = $('#hiddenState').val();
            $.getJSON("/listings/getCloseTownFromStateJ", req, function(data, status, xhr) {
                var term = $.ui.autocomplete.escapeRegex(req.term),
                        startsWithMatcher = new RegExp("^" + term, "i"),
                        startsWith = $.grep(data, function(value) {
                            return startsWithMatcher.test(value.label || value.value || value);
                        }),
                        containsMatcher = new RegExp(term, "i"),
                        contains = $.grep(data, function(value) {
                            return $.inArray(value, startsWith) < 0 && containsMatcher.test(value.label || value.value || value);
                        });

                res(startsWith.concat(contains));
            });
        },
        select: function(event, ui) {
            showMeTheValue(ui.item.value);
            console.log(ui.item);
        }
    });

    // set the initial data for the dropdowns
    var seacrhType = $formSearchType;
    if (seacrhType === 'detailed') {
        populateRegionTown_detail_search();
    } else {
        populateRegionTown_find_agent();
    }

    $('.close-action').click(function() {
        $('#searchbox').hide();
        $('#searchboxagent').hide();
        $('#open-gate').show();
        $('#arrows').css({
            backgroundColor: '#ccc',
            position: 'relative',
            left: '0',
            width: '975px',
            height: '18px',
            boxShadow: '2px 2px 2px #999',
            mozBoxShadow: '2px 2px 2px #999',
            webkitBoxShadow: '2px 2px 2px #999'
        });
    });

    $('#open-gate').click(function() {
        $('#searchbox').show();
        
        $('#arrows').removeAttr('style');
    });

    $('#lnk-searchbar').click(function() {
		$townSearch = false;
		$('#dsState').val('All').trigger('change');
        $('#open-gate').hide();
        $('#searchbox').show();
        $('#searchboxagent').hide();
        $('#arrows').removeAttr('style');

        $('#sortorderby').find('option')
			.remove()
			.end()
			.append('<option value="">Sort By</option>')
			.append('<option value="price ASC" >Lowest Price</option>')
			.append('<option value="price DESC">Highest Price</option>')
			.append('<option value="id DESC">Newest Listing</option>')
			.append('<option value="id ASC">Oldest Listing</option>');

        $('#lnk-findagent').removeClass('active-tab');
        $(this).addClass('active-tab');

		var $optn = $('#dsState').find('option');
		var $state_li  = $('#dsState_chzn .chzn-results').find('li');

		$.each($state_li, function(i, e) {
			$(e).removeClass('result-selected');
		});

		$state_li.eq(0).addClass('result-selected');

		$.each($optn, function(i, e) {
			$(e).removeAttr('selected');
		});

		$optn.eq(0).attr('selected', 'selected');

		$('.chzn-single span').text('All');
		$('#dsCloseTownIn').val('');
		$('#dsRegion').prop('disabled', true).trigger('liszt:updated');
		$('#dsState').val('').trigger('liszt:updated');
    });

	$('#header-main-cont-lc-agent').click(function() {
		$('#faCloseTownIn').val('');
	});

    $('#lnk-findagent').click(function() {
		$townSearch = false;
        $('#open-gate').hide();
        $('#searchbox').hide();
        $('#searchboxagent').show();
        $('#arrows').removeAttr('style');

        $('#sortorderby').find('option')
			.remove()
			.end()
			.append('<option value="">Sort By</option>')
			.append('<option value="region ASC">Region</option>')
			.append('<option value="town ASC">Town</option>');

        $('#lnk-searchbar').removeClass('active-tab');
        $(this).addClass('active-tab');

        $('#faRegion').find('option')
			.remove()
			.end()
			.append('<option>All</option>');

        $('#faState').val('All').trigger('liszt:updated');
        $('#faRegion').val('All')
            .trigger('liszt:updated')
            .prop('disabled', true)
            .trigger('liszt:updated');
    });


    $('.select1').chosen();
    $('#vrRegion').chosen();
    $('#vrCloseTown').chosen();

    $('#faState').chosen({width: "80px;"});
    $('#faRegion').chosen({width: "250px;"});
    $('#faWithin').chosen({width: "80px;"});

    $('#dsPriceFrom').chosen({width: "90px"});
    $('#dsPriceTo').chosen({width: "90px"});
    $('#dsPropertySizeFrom').chosen({width: "60px"});
    $('#dsPropertySizeTo').chosen({width: "60px"});
    $('#dsCategory').chosen({width: "150px"});

    $('#faRegion').chosen().change(function() {
//    console.log('$('#faRegion').chosen().change()');
//        $('#faCloseTownIn').val("");
        if (closeTownInitV.length > 0) {
            $('#faCloseTownIn').val(closeTownInitV);
            closeTownInitV = '';
        }
    });

    $('#dsRegion').chosen().change(function() {
//    console.log("$('#dsRegion').chosen().change()");
        if (closeTownInitV.length > 0) {
            $('#dsCloseTownIn').val(closeTownInitV);
            closeTownInitV = '';
        }

//        var length = $('#search-input').val().length;
//        if (length > 0 && length != 51) {
////            console.log('search-bar');
//            var val = $('#search-input').val(),
//                    string_end = val.indexOf(',');
//
//            if (string_end > 0) {
//                $('#dsCloseTownIn').val(val.substring(0, string_end));
//            } else {
//                $('#dsCloseTownIn').val(val);
//            }
//        }
    });

    $('#dsState').chosen().change(function() {
//        console.log("$('#dsState').chosen().change()-"+$(this).val());
        var stateValue = $(this).val();
        populateRegionTown_detail_search();
		if (stateValue === 'All') {
			$('#dsRegion').prop('disabled', true).trigger('liszt:updated');
		} else {
			$('#dsRegion').prop('disabled', false).trigger('liszt:updated');
		}
//		$('#search-input').val('');
		$('#dsCloseTownIn').val('');
    });

    $('#faState').chosen().change(function() {
        $('#faRegion').prop('disabled', false).trigger('liszt:updated');
        populateRegionTown_find_agent();
        var stateValue = $(this).val();
//		$('#faCloseTownIn').val('');
        if (stateValue === 'All' && $('#faRegion').val() === 'All') {
            $('#faRegion').prop('disabled', true).trigger('liszt:updated');
	//		$('#search-input').val('');
            $('#faCloseTownIn').val('');
        }
    });

    // View region modal initiation
    $('.popupbox').colorbox({iframe: true, width: '50%', height: '80%'});
    $('.searchbox').colorbox({iframe: true, width: '40%', height: '35%'});
    $('.smallbox').colorbox({iframe: true, width: '40%', height: '150px', onClosed: function() {
            location.reload(true);
        }});
    $('.inline').colorbox({inline: true, width: '50%'});
    $('.view-region-button').colorbox({inline: true, width: '680px', height: '375px'});

    $('.callbacks').colorbox({
        onOpen: function() {
            alert('onOpen: colorbox is about to open');
        },
        onLoad: function() {
            alert('onLoad: colorbox has started to load the targeted content');
        },
        onComplete: function() {
            alert('onComplete: colorbox has displayed the loaded content');
        },
        onCleanup: function() {
            alert('onCleanup: colorbox has begun the close process');
        },
        onClosed: function() {
            alert('onClosed: colorbox has completely closed');
        }
    });

    // Example of preserving a JavaScript event for inline calls.
    $('#click').click(function() {
        $('#click').css({
            'background-color': '#f00',
            'color': '#fff',
            'cursor': 'inherit'
        }).text('Open this window again and this message will still be here.');
        return false;
    });

    $('#btnViewRegion').click(function() {
        $.colorbox.close();
    });
    $('#vrRegion').change(function() {
        $('#dsRegion').val($(this).val()).trigger('liszt:updated');
        $('#faRegion').val($(this).val()).trigger('liszt:updated');
    });

    function showMeTheValue(town) {
        // Get the region
        $.ajax({
            type: 'POST',
            url: '/listings/iswhatregion/' + $('#hiddenState').val() + '/' + town,
            success: function(result) {
                $('#thistown').html($('#hiddenState').val() + ', ' + town);
                $('#inbetweentext').html('is in the following region');
                $('#thisregion').html('<br>' + result);

                $('#dsCloseTownIn').prop('disabled', false);
                $('#dsCloseTownIn').val($('#vrCloseTownx').val());

                $('#dsRegion').prop('disabled', false);
				$('#dsRegion').val(result).trigger('liszt:updated');

            }
        });
    }

    $('.chkbox').change(function() {
        if ($(this).attr('id') !== 'all') {
            $('#all').prop('checked', false);
        } else {
            $('.chkbox').prop('checked', false);
            $('#all').prop('checked', true);
        }
    });

});// end document ready

/**
 * Populate the region and town for the popup-region town selector
 * this is for the interactive map selector.
 */
function populateSearchBox(state) {
    $('#hiddenState').val(state);
    $('#dsState').val(state).trigger('liszt:updated');
    $('#faState').val(state).trigger('liszt:updated');

    populateRegionTown_detail_search();

    $('#vrCloseTownx').prop('disabled', false);
    $('#vrCloseTownx').val('');

    $('#thistown').html(state);
    $('#inbetweentext').html('');
    $('#thisregion').html('');

    // lets get all towns close to state
    $.ajax({
        type: 'POST',
        url: '/listings/getCloseTownFromState',
        data: {state: state}
    }).done(function(data) {
        data = JSON.parse(data);
        console.debug(data);
        $('#dsCloseTown').find('option').remove().end();
        $('#faCloseTown').find('option').remove().end();
        $('#dsCloseTown').append('<option value="">All</option>');
        $('#faCloseTown').append('<option value="">All</option>');
        $('#vrCloseTown').find('option').remove().end();
        $('#vrCloseTown').append('<option value="">All Towns</option>');
        for (var i = 0; i < data.length; i++) {
            $('#vrCloseTown').append('<option value="' + data[i]['id'] + '">' + data[i]['town'] + '</option>');
            $('#dsCloseTown').append('<option value="' + data[i]['id'] + '">' + data[i]['town'] + '</option>');
            $('#faCloseTown').append('<option value="' + data[i]['id'] + '">' + data[i]['town'] + '</option>');

        }
        $('#vrCloseTown').trigger('liszt:updated');
        $('#dsCloseTown').prop('disabled', false).trigger('liszt:updated');
        $('#faCloseTown').prop('disabled', false).trigger('liszt:updated');
    });
}

/**
 * Populate the region and town
 */
function populateRegionTown_detail_search() {
    var state = $('#dsState').val();

    if (state !== 'All') {
        // Set the the region dropdown but check the cache for previous values
        if ($('#cache_holder').data('region_cache_' + state)) {
            $('#dsRegion').find('option').remove().end();
            $('#dsRegion').html($('#cache_holder').data('region_cache_' + state));
            $('#dsRegion').trigger('liszt:updated');
            $('#dsRegion').trigger('change');
        } else {
            // Lets gets all region base on state
            $.ajax({
                type: 'POST',
                url: '/regions',
                data: {state: state}
            }).done(function(data) {
                data = JSON.parse(data);
                $('#dsRegion').find('option')
					.remove()
					.end()
					.append('<option>All</option>');

                for (var i = 0; i < data.length; i++) {
                    $('#dsRegion').append('<option value="' + data[i] + '">' + data[i] + '</option>');
                }

                $('#cache_holder').data("region_cache_" + state, $('#dsRegion').html()); // store in cache
                // Set selected region based on the form-values
                $('#dsRegion option[value="'+$formRegion+'"]').prop('selected', true);
                $('#dsRegion').trigger('liszt:updated').trigger('change');
            });
        }
    } else {
        $('#dsRegion').find('option')
            .remove()
            .end()
            .append('<option>All</option>')
            .prop('disabled', true)
            .trigger('liszt:updated');
    }
}

function populateRegionTown_find_agent() {
//    console.log("populateRegionTown_detail_search function");
    var state = $('#faState').val();

    if (state !== 'All') {
        // set the the region dropdown but check the cache for previous values
        if ($('#cache_holder').data('region_cache_' + state)) {
            $('#faRegion').find('option')
                .remove()
                .end()
                .html($('#cache_holder')
                .data('region_cache_' + state))
                .trigger('liszt:updated');
        } else {
            // Lets gets all region base on state
            $.ajax({
                type: 'POST',
                url: '/regions',
                data: {state: state}
            }).done(function(data) {
                data = JSON.parse(data);
                $('#faRegion').find('option')
                    .remove()
                    .end()
                    .append('<option>All</option>');

                for (var i = 0; i < data.length; i++) {
                    $('#faRegion').append('<option value="' + data[i] + '">' + data[i] + '</option>');
                }

                $('#cache_holder').data('region_cache_' + state, $('#faRegion').html()); // store in cache
                // set selected region based on the form-values
                $('#faRegion option[value="' + $formRegion + '"]').prop('selected', true);
                $('#faRegion').trigger('liszt:updated').trigger('change');
            });
        }
    } else {
        $('#faRegion').find('option')
            .remove()
            .end()
            .append('<option>All</option>')
            .prop('disabled', true)
            .trigger('liszt:updated');
    }
}
