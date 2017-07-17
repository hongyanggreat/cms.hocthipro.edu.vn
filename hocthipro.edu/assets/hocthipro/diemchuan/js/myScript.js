
$(document).ready(function() {
    var baseUrl = window.location.origin;
	$('body').on('click ', '.searchShool', function(event) {
        event.preventDefault();
        searchShool();
    });
    $('body').on('change ', 'select[name="yearBenchMark"],select[name="typeSchool"],select[name="matinh_School"],select[name="examBlock"],select[name="sort_type"]', function(event) {
        event.preventDefault();
        searchShool();
    });
    $('body').on('click ', '.resetSearch', function(event) {
        event.preventDefault();
        $('form[name="searchSchool"]')[0].reset();
        
        showUniversities();
    });
    $('body').on('change ', 'select[name="yearBenchMarkSearch"]', function(event) {
        event.preventDefault();
        //searchBenchMack2();
        searchBenchMack();
    });

    
     $('body').on('keyup ', 'input[name="keywordSchool"]', function(event) {
		event.preventDefault();
             var filter = $(this).val();
            console.log(filter);
          $("ul#benchmarking li").each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show()
            }
        });   
        
    });


    function showUniversities(){
        var url = baseUrl+'/ShowUniversities';
        //var year = $('#yearSearch').val();
        var year = $('select[name="yearBenchMark"]').val();
       // console.log(url);
        $.ajax({
            url : url,
            type : "post",
            dateType:"JSON",
            data : {'year':year,'task':'showUniversities'},
            beforeSend: function() {
                
            },
            success : function (result){
                var result = jQuery.parseJSON(result);
                if(result.status){
                   $('#benchmarking').html(result.info);
                }
            },error: function() {
               console.log('error');
            }   
        });
    }
    function searchBenchMack(){
      //  keywordSchool = keywordSchool.trim().replace(/ /g,'-');
        //keywordSchool = keywordSchool.trim().replace(/ /g,'-');
        //var url = baseUrl+'/benchMark';
        
        var url = baseUrl+'/BenchMarks';
        var listData = new FormData($('form[name="formInfoBenchMark"]')[0]);
        listData.append('task', 'searchBenchMark');
         $.ajax({
            url : url,
            type : "post",
            dateType:"JSON",
            data : listData,
            processData:false,
            contentType:false,
            beforeSend: function() {
                
            },
            success : function (result){
                var result = jQuery.parseJSON(result);
               //console.log(result);
                if(result.status){
                   $('#showYear').html(result.year);
                    $('tbody#showResultBenchMark').html(result.info);
                }
            },error: function() {
               console.log('error');
            }   
        });
            
    }
    function searchShool(){
      //  keywordSchool = keywordSchool.trim().replace(/ /g,'-');
        //keywordSchool = keywordSchool.trim().replace(/ /g,'-');
        var url = baseUrl+'/search';
        var listData = new FormData($('form[name="searchSchool"]')[0]);
        	listData.append('task', 'searchSchool');
         $.ajax({
    		url : url,
    		type : "post",
    		dateType:"JSON",
    		data : listData,
    		processData:false,
    		contentType:false,
            beforeSend: function() {
             	
            },
            success : function (result){
               //console.log(result);
                var result = jQuery.parseJSON(result);
                if(result.status){
                    $('#benchmarking').html(result.info);
                }
            },error: function() {
               console.log('error');
        	}   
        });
            
    }
});

