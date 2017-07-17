var currentUrl = window.location.href;
var baseUrl = window.location.origin;
//console.log("duongdan:"+currentUrl);

$(window).scroll(function(){

	var height = $(this).scrollTop();
	if (height > 100) {
	//	console.log('hien thi ra');
		$('.scrollToTop').fadeIn();
	} else {
	//	console.log('dong vao');
		$('.scrollToTop').fadeOut();
	}
});

		console.log($( window ).width());

function scrollTop(position = 0,time = 600){
	$("html, body").animate({ scrollTop: position }, time);
	return false;
}
function goToByScroll(id,time = 600){
      // Reove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        time);
}
$(document).ready(function(){
	$('body').on('click','.scrollToTop',function(){
		scrollTop();
	});


});

 $('body').on('keyup change', '.search-keyword', function(event) {
    var keyword = $(this).val();
    keyword = keyword.trim().replace(/ /g,'-');
    if(keyword !=""){
        var linkSearch = baseUrl + '/tim-kiem/'+keyword+'.html';
        console.log(baseUrl);
        window.history.pushState('', '', linkSearch);
        $('form.search-box').attr('action',linkSearch);
    }else{
        $('form.search-box').attr('action','');
    }
   // getKeyword(keyword);
});



function getKeyword(keyword){
     event.preventDefault();
  //  keyword = keyword.trim().replace(/ /g,'-');
    //keyword = keyword.trim().replace(/ /g,'-');
    var url = baseUrl+'changeTitle';
     $.ajax({
        url : url,
        type : "post",
        dateType:"JSON",
        data : {'keyword':keyword},
         beforeSend: function() {
         
        },
        success : function (keyword){
            keyword = keyword.trim();
           if(keyword !=""){
                var linkSearch = baseUrl + 'tim-kiem/'+keyword+'.html';
                window.history.pushState('', '', linkSearch);
                $('form.search-box').attr('action',linkSearch);
            }else{
                $('form.search-box').attr('action','');
            }
        },error: function() {
           console.log('error');
        }   
    });
}
function makeSortString(s) {
      if(!makeSortString.translate_re) makeSortString.translate_re = /[áàảãạăắặằẳẵâấầẩẫậÁÀẢÃẠĂẮẶẰẲẴÂẤẦẨẪẬđĐéèẻẽẹêếềểễệÉÈẺẼẸÊẾỀỂỄỆíìỉĩịÍÌỈĨỊóòỏõọôốồổỗộơớờởỡợÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢúùủũụưứừửữựÚÙỦŨỤƯỨỪỬỮỰýỳỷỹỵÝỲỶỸ]/g;
      var translate = {
        "á": "a","à": "a","ả": "a","ã": "a","ạ": "a","ă": "a","ắ": "a","ặ": "a","ằ": "a","ẳ": "a","ẵ": "a","â": "a","ấ": "a","ầ": "a","ẩ": "a","ẫ": "a","ậ": "a","Á": "A","À": "A","Ả": "A","Ã": "A","Ạ": "A","Ă": "A","Ắ": "A","Ặ": "A","Ằ": "A","Ẳ": "A","Ẵ": "A","Â": "A","Ấ": "A","Ầ": "A","Ẩ": "A","Ẫ": "A","Ậ": "A","đ": "d","Đ": "D","é": "e","è": "e","ẻ": "e","ẽ": "e","ẹ": "e","ê": "e","ế": "e","ề": "e","ể": "e","ễ": "e","ệ": "e","É": "E","È": "E","Ẻ": "E","Ẽ": "E","Ẹ": "E","Ê": "E","Ế": "E","Ề": "E","Ể": "E","Ễ": "E","Ệ": "E","í": "i","ì": "i","ỉ": "i","ĩ": "i","ị": "i","Í": "I","Ì": "I","Ỉ": "I","Ĩ": "I","Ị": "I","ó": "o","ò": "o","ỏ": "o","õ": "o","ọ": "o","ô": "o","ố": "o","ồ": "o","ổ": "o","ỗ": "o","ộ": "o","ơ": "o","ớ": "o","ờ": "o","ở": "o","ỡ": "o","ợ": "o","Ó": "o","Ò": "o","Ỏ": "o","Õ": "o","Ọ": "o","Ô": "o","Ố": "o","Ồ": "o","Ổ": "o","Ỗ": "o","Ộ": "o","Ơ": "O","Ớ": "O","Ờ": "O","Ở": "O","Ỡ": "O","Ợ": "O","ú": "u","ù": "u","ủ": "u","ũ": "u","ụ": "u","ư": "u","ứ": "u","ừ": "u","ử": "u","ữ": "u","ự": "u","Ú": "U","Ù": "U","Ủ": "U","Ũ": "U","Ụ": "U","Ư": "U","Ứ": "U","Ừ": "U","Ử": "U","Ữ": "U","Ự": "U","ý": "y","ỳ": "y","ỷ": "y","ỹ": "y","ỵ": "y","Ý": "Y","Ỳ": "Y","Ỷ": "Y","Ỹ": "Y","Ỵ": "Y",
       };
      return ( s.replace(makeSortString.translate_re, function(match) { 
        return translate[match]; 
      }) );
  }

$(document).ready(function() {
  
    $('body').on('click keyup change', '.search-keyword', function(event) {
        var keyword = $(this).val();
        keyword = keyword.trim().replace(/[",!@#$%^&*().]/gi, '').replace(/ /g,'-');
        keyword = makeSortString(keyword);
        
        if(keyword !=""){
            var linkSearch = baseUrl + '/tim-kiem/'+keyword+'.html';
            //alert(baseUrl);
            window.history.pushState('', '', linkSearch);
            $('form.search-box').attr('action',linkSearch);
        }else{
            $('form.search-box').attr('action','');
        }
       // getKeyword(keyword);
    });
   
    function getKeyword(keyword){
         event.preventDefault();
      //  keyword = keyword.trim().replace(/ /g,'-');
        //keyword = keyword.trim().replace(/ /g,'-');
        var url = baseUrl+'changeTitle';
         $.ajax({
            url : url,
            type : "post",
            dateType:"JSON",
            data : {'keyword':keyword},
             beforeSend: function() {
             
            },
            success : function (keyword){
                keyword = keyword.trim();
               if(keyword !=""){
                    var linkSearch = baseUrl + 'tim-kiem/'+keyword+'.html';
                    window.history.pushState('', '', linkSearch);
                    $('form.search-box').attr('action',linkSearch);
                }else{
                    $('form.search-box').attr('action','');
                }
            },error: function() {
               console.log('error');
            }   
        });
    }
});