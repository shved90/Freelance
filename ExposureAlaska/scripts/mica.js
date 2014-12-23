$(document).ready(function() {		

	var loadVid = $("#video-nav li:first a").attr('href').split("?v=")[1].split("&");
	swfobject.embedSWF("http://www.youtube.com/v/" + loadVid[0], "flash", "346", "250", "8", null, null);

	$("#video-nav a").click(function() {
		var url = this.href;
		var params = url.split("?v=")[1].split("&");
		swfobject.embedSWF("http://www.youtube.com/v/" + params[0], "flash", "346", "250", "8", null, null);
		
		$(this).parent('li').addClass('active').siblings('li').removeClass('active');
		return false;
	});

	function equalHeight(group) {
	   tallest = 0;
	   group.each(function() {
	      thisHeight = $(this).height();
	      if(thisHeight > tallest) {
	         tallest = thisHeight;
	      }
	   });
	   group.height(tallest);
	}

	equalHeight($("#adventures div.txt"));



	$('#slides').cycle({
		timeout: 4000, //time between slides
		pause: true //pause the slideshow on hover
	});
	
	
	//once the page loads this aligns the right content to the bottom of the page.
	$(window).load(function() {
		var r = $("#right-col").height();
		var l = $("#left-col").height();
		if(l > r) {
			var d = l - r + 20;
			$("#auto-height").animate({marginTop : d});	
		}
	})
	
});
