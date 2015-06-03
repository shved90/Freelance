function validateRequiredFields() {
	// Reset color
	var TextBoxes = $('input:text.requiredField').filter(function() {
		return this.value !== '';
	});
	TextBoxes.css({'border': '1px solid #B1C1C8', 'background-color': '#fff'});

	$('select').css({'border': '1px solid #B1C1C8', 'background-color': '#fff'});

	$('#errortext').html('');

	// Check for blank fields
	var emptyTextboxes = $('input:text.requiredField'),
		emailTextboxes = $('input:text.emailField'),
		emptyTextareas = $('textarea.requiredField'),
		emptyFiles     = $('input:file.requiredField'),
		emptySelect    = $('select.requiredField'),
		isRequired     = false,
		isEmail        = false;

	emptyTextboxes.each(function(i, o) {
		if ($.trim($(this).val()) === '') {
			$(this).css({'border': '1px solid #5CAF08', 'background-color': '#CDF4D2'});
			isRequired = true;
		}
	});

	emptyTextareas.each(function(i, o) {
		if ($.trim($(this).val()) === '') {
			$(this).css({'border': '1px solid #5CAF08', 'background-color': '#CDF4D2'});
			isRequired = true;
		}
	});

	emptySelect.each(function(i, o) {
		if ($(this).val() === null) {
			// Update chosen select-box-container
			var chosen_field = '#' + $(this).attr("id") + '_chzn';
			if ($(chosen_field).length) {
				$(chosen_field).css('border', '1px solid #5CAF08');
			}

			// Set border color for non chosen select-fields
			$(this).css('border', '1px solid #5CAF08');
			isRequired = true;
		}

		if ($.trim($(this).val()) === '') {
			$(this).css('border', '1px solid #5CAF08');
			isRequired = true;
		}
	});

	emptyFiles.each(function(i, o) {
		if ($.trim($(this).val()) === '') {
			$(this).css('border', '1px solid #5CAF08');
			isRequired = true;
		}
	});

	var emailfilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	emailTextboxes.each(function(i, o) {
		if (!emailfilter.test($.trim($(this).val()))) {
			$(this).css({'border': '1px solid #5CAF08', 'background-color': '#CDF4D2'});
			$('#errormsg').css({'display': 'block', 'visibility': 'visible', 'color': '#5CAF08', 'text-align': 'center'});
			$('#errortext').css({'font-size': '12px'});
			$('#errortext').html(' Invalid Email. Please Enter a valid email address.');
			isEmail = true;
			return false;
		}
	});

	if (isRequired === true || isEmail === true) {
		$('#errormsg').css({'display': 'block', 'visibility': 'visible', 'color': '#D23700', 'text-align': 'center'});
		$('#errortext').css({'font-size': '12px', 'color': '#5CAF08'});
		$('#errortext').html('Please review and correct any fields highlighted below.');
		return false;
	} else {
		return true;
	}
}

// For the stats of ads
function adstats(id) {
	$.ajax({
		type: 'POST',
		url: '/stats/clicker/' + id,
		success: function(result) {
			var data = JSON.parse(result);
			if ($.trim(data['target']) === '_blank') {
				window.location.href = data['link'];
			} else {
				window.location.href = data['link'];
			}
		}
	});
	return false;
}

function updateSortBy(sorted) {

	if ($('#searchbar_form').is(':visible')) {
		$('#sortby1').val(sorted);
//		$('#searchbar_form').submit();
		$('#sortresults1').submit();
	}else if ($('#searchbar_form').is(':hidden') && $('#searchbar_form').is(':hidden')) {
		$('#sortby1').val(sorted);
		$('#sortresults1').submit();
	}else {
		
		$('#sortby2').val(sorted);
		$('#searchbar_agent_form').submit();

	}
}

$(document).ready(function() {
    $('.tooltip').tooltipster();


});