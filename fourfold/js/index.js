$(document).ready(function() {

  $(window).on('scroll', '', function() {
    if ($(window).scrollTop() >= 530) {
      $("header").addClass('minified');
    } else {
      $("header").removeClass('minified');
    }
 });
  
  $('.mobile-nav-btn').click(function(){
    $('.mobile-nav-btn').toggleClass('open');
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

})