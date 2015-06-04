$(function() {
    /*$('#carousel span').append('<img src="img/gui/carousel_glare.png" class="glare" />');*/
    /*$('#thumbs a').append('<img src="img/gui/carousel_glare_small.png" class="glare" />');*/

	if ($('#carousel').length > 0) {
		$('#carousel').carouFredSel({
			responsive: true,
			circular: false,
			auto: false,
			prev: '#main_pic_prev',
			next: '#main_pic_next',
			items: {
				visible: 1,
				width: 100,
				height: '67%'
			},
			scroll: {
				fx: 'directscroll'
			}
		});
	}

	if ($('#thumbs').length > 0) {
		$('#thumbs').carouFredSel({
			responsive: true,
			circular: false,
			infinite: false,
			auto: false,
			prev: '#prev',
			next: '#next',
			items: {
				visible: {
					min: 2,
					max: 6
				},
				width: 100,
				height: '75%'
			}
		});

		$('#thumbs a').click(function() {
			$('#carousel').trigger('slideTo', '#' + this.href.split('#').pop());
			$('#thumbs a').removeClass('selected');
			$(this).addClass('selected');
			$('#thumb-caption-position').html($(this).attr('item'));
			return false;
		});
	}

	if ($('#main_pic_prev').length > 0) {
		$('#main_pic_prev').on('click', function() {
			var pages    = $('#thumbs a').length,
				position = parseInt($('#thumb-caption-position').html()),
				page     = position - 1;

			if (page < 1) {
				$('#thumb-caption-position').html(pages);
			} else {
				$('#thumb-caption-position').html(page);
			}
		});
	}

	if ($('#main_pic_next').length > 0) {
		$('#main_pic_next').on('click', function() {
			var pages    = $('#thumbs a').length,
				position = parseInt($('#thumb-caption-position').html()),
				page     = position + 1;

			if (page > pages) {
				$('#thumb-caption-position').html(1);
			} else {
				$('#thumb-caption-position').html(page);
			}
		});
	}
});