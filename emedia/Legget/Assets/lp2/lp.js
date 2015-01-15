$().ready(function(e) {
	for(var i=1;i<18;i++){
		
		$('.d'+i).eq(0).click(function(e) {
		var elclass=$(this).prop('class');		
			$('.'+elclass).prop("checked", $('.'+elclass).eq(0).prop("checked"));
		});
	}
	$('form').submit(function(e) {
        e.preventDefault();
		if(!$('#agree').prop('checked')){
			$('.error').show();
		}else{
			$(this).submit();
		}
    });
});