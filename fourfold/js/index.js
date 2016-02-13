$(document).ready(function() {

  $(window).on('scroll', '', function() {
    if ($(window).scrollTop() >= 530) {
      $("header").addClass('minified');
    } else {
      $("header").removeClass('minified');
    }
 });
  
  $('.navbar-toggle').click(function(){
    $('.navbar-toggle').toggleClass('open');
    $('header').toggleClass('open');
  });
  
  $('.ff-icon').css('background',
  function(){
  return "url('images/icons/Stroked/"+$(this).data('icon-src')+"')";
  });
  
  $('.ff-icon').hover(
 function()
 {
   $(this).css('background',"url('images/icons/Orange/"+$(this).data('icon-src')+"')");
   $(this).parent().css('background-color',"white");
 },
 function()
 {
   $(this).css('background',"url('images/icons/Stroked/"+$(this).data('icon-src')+"')");
   $(this).parent().css('background',"none");
 });

$(function() {
  $('a[href*="#scrolltop"]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

})

$(document).ready(function(){
  //Home Image Slider
  $.backstretch([
    "images/bg/2.jpg",
    "images/bg/3.jpg",
    "images/bg/4.jpg",
    "images/bg/5.jpg",
    "images/bg/1.jpg",   
  ], {duration: 4500, fade: 'slow'});
  
});

