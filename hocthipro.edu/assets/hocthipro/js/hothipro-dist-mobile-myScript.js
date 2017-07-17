$(document).ready(function() {

	$('body').on('click', '.spr-search', function(event) {
		event.preventDefault();
		if($('.search-zone').hasClass('active')){
			$('body').find('.search-zone').removeClass('active');
		}else{
			$('body').find('.search-zone').addClass('active');
		}
	});
	$('body').on('click', '.spr-hamburger', function(event) {
		event.preventDefault();

		if($('.nav-hamburger.category-zone').hasClass('active')){
			$('body').find('.nav-hamburger.category-zone').removeClass('active');
		}else{
			var navigation =  $('.navigation').html();
			//console.log(navigation);
			$('body').find('.nav-hamburger.category-zone').addClass('active').html(navigation);

		}
	});


	//var getDefaultImg = $(this).find("figure img").data("src");
//
//alert(getDefaultImg);

	/*$('figure img').each(function() {
	  	this.src = $(this).data('src');
	  	console.log(this.src);
	});
*/






});