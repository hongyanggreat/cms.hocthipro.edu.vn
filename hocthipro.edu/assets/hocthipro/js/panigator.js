 $('body').on('click', '#gotoPage', function(event) {
        var page = parseInt($('#pageText').val());
        var lastPage = parseInt($('#main_PagingList1_pager a#lastPage').text());
        if(page <= lastPage){
            $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
            if(page ==1){
                 $('#main_PagingList1_pager a#page1').addClass('active').removeClass('cursor').text(page);
                 $('#main_PagingList1_pager a#page2').text(page+1);
                 $('#main_PagingList1_pager a#page3').text(page+2);
            }
            if(page ==2){
                $('#main_PagingList1_pager a#page3').text(page+1);
                $('#main_PagingList1_pager a#page2').addClass('active').removeClass('cursor').text(page);
                $('#main_PagingList1_pager a#page1').text(page-1);
            }
            if(page >=3 && page < lastPage){
                $('#main_PagingList1_pager a#page3').text(page+1);
                $('#main_PagingList1_pager a#page2').addClass('active').removeClass('cursor').text(page);
                $('#main_PagingList1_pager a#page1').text(page-1);
            }
            if(page == lastPage){
                $('#main_PagingList1_pager a#page3').addClass('active').removeClass('cursor').text(page);
                $('#main_PagingList1_pager a#page2').text(page-1);
                $('#main_PagingList1_pager a#page1').text(page-2);
            }
            getContent(page);
        }
    });
    $('body').on('click', '#main_PagingList1_pager a.main_PagingList1_pager_backControl', function(event) {
        var page3 = parseInt($('#page3').text());
        var page1 = parseInt($('#page1').text());
         var lastPage = $('#main_PagingList1_pager a#lastPage').text();
        if(page1 > 2){
           $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
           $('#main_PagingList1_pager a#page3').text(page1+1);
           $('#main_PagingList1_pager a#page2').addClass('active').removeClass('cursor').text(page1);
           $('#main_PagingList1_pager a#page1').text(page1-1);
           $('#main_PagingList1_pager a.main_PagingList1_pager_nextControl').show();
        
        }else{
            $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
            if(page1 !=1){
                $('#main_PagingList1_pager a#page3').text(page1+1);
                $('#main_PagingList1_pager a#page2').addClass('active').removeClass('cursor').text(page1);
                $('#main_PagingList1_pager a#page1').text(page1-1);
                $('#main_PagingList1_pager a.main_PagingList1_pager_backControl').hide();
            }else {

            }

        }
        var page = $('#main_PagingList1_pager a.active').text();
        getContent(page);
    });
    $('body').on('click', '#main_PagingList1_pager a.main_PagingList1_pager_nextControl', function(event) {
        var page3 = parseInt($('#page3').text());
        var page2 = parseInt($('#page2').text());
        var page1 = parseInt($('#page1').text());
         var lastPage = $('#main_PagingList1_pager a#lastPage').text();
        if(page1 == 1){

            if($('#main_PagingList1_pager a#page2').hasClass('active')){
                $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
                $('#main_PagingList1_pager a#page1').text(page2);
                $('#main_PagingList1_pager a#page2').addClass('active').removeClass('cursor').text(page2+1);
                $('#main_PagingList1_pager a#page3').text(page2+2);
                $('#main_PagingList1_pager a.main_PagingList1_pager_backControl').show();
            }else{
                if($('#main_PagingList1_pager a#page3').hasClass('active')){
                    $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
                    $('#main_PagingList1_pager a#page3').text(page3+1);
                    $('#main_PagingList1_pager a#page2').addClass('active').removeClass('cursor').text(page3);
                    $('#main_PagingList1_pager a#page1').text(page3-1);
                     
                }else{
                    $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
                    $('#main_PagingList1_pager a#page2').addClass('active').removeClass('cursor').text(page1+1);
                }
            }
        
        }else{
            $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
            if(page3 < lastPage){
                $('#main_PagingList1_pager a#page3').text(page3+1);
                $('#main_PagingList1_pager a#page2').addClass('active').removeClass('cursor').text(page3);
                $('#main_PagingList1_pager a#page1').text(page3-1);
            }else if(page3 == lastPage){
                $('#main_PagingList1_pager a#page3').addClass('active').removeClass('cursor').text(lastPage);
                $('#main_PagingList1_pager a#page2').text(lastPage-1);
                $('#main_PagingList1_pager a#page1').text(lastPage-2);
                 $('#main_PagingList1_pager a.main_PagingList1_pager_nextControl').hide();
            }

        }
        var page = $('#main_PagingList1_pager a.active').text();
        getContent(page);
    });
    
	$('body').on('click', '#main_PagingList1_pager a.page', function(event) {
        event.preventDefault();
        /* Act on the event */
        if($(this).hasClass('active')){
            console.log('không cần phải lấy dữ liệu');
        }else{
            var pageActive = $(this).text();

            var page = parseInt(pageActive);
            var lastPage = $('#main_PagingList1_pager a#lastPage').text();
           /* if(!$.isNumeric(page)){
                var page3 = parseInt($('#page3').text());
                if(page3 >= 3  && page3 <lastPage){
                   $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
                   $('#main_PagingList1_pager a#page3').addClass('active').removeClass('cursor').text(page3+1);
                   $('#main_PagingList1_pager a#page2').text(page3);
                   $('#main_PagingList1_pager a#page1').text(page3-1);
                }
            }*/
            if(lastPage > 2){

                if(lastPage ==""){
                    lastPage = $('#main_PagingList1_pager a:last-child').text();
                }
                if(page == lastPage){
                       $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
                       $('#main_PagingList1_pager a#page3').addClass('active').removeClass('cursor').text(page);
                       $('#main_PagingList1_pager a#page2').text(page-1);
                       $('#main_PagingList1_pager a#page1').text(page-2);
                     /*var page3 = parseInt($('#page3').text());
                      if(page3 != lastPage){
                      }else{
                            console.log('không cần phải lấy dữ liệu');
                      }*/
                }else if(page < lastPage && page == 2){
                    var page1 = parseInt($('#page1').text());
                    if(page1 == 2){
                        $('#main_PagingList1_pager a#page3').text(page+1)
                        $('#main_PagingList1_pager a#page2').addClass('active').removeClass('cursor').text(page);
                        $('#main_PagingList1_pager a#page1').text(page-1);
                    }else{
                      $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
                      $(this).addClass('active').removeClass('cursor').text(page);
                    }

                }else if(page < lastPage && page == 1){
                   $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
                   $(this).addClass('active').removeClass('cursor').text(page);
                }else if(page < lastPage && page >= 3){
                   $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
                   $('#main_PagingList1_pager a#page3').text(page+1)
                   $('#main_PagingList1_pager a#page2').addClass('active').removeClass('cursor').text(page);
                   $('#main_PagingList1_pager a#page1').text(page-1)
                }
            }else{
                 $('#main_PagingList1_pager a').removeClass('active').addClass('cursor');
                 $(this).addClass('active').removeClass('cursor').text(page);
            }
        }

        var page1 = parseInt($('#page1').text());
        var page3 = parseInt($('#page3').text());
        if(page1 > 1){
            $('#main_PagingList1_pager a.main_PagingList1_pager_backControl').show();
        }else{
            $('#main_PagingList1_pager a.main_PagingList1_pager_backControl').hide();

        }
        if(page3 < lastPage){
            $('#main_PagingList1_pager a.main_PagingList1_pager_nextControl').show();
        }else{
            $('#main_PagingList1_pager a.main_PagingList1_pager_nextControl').hide();

        }
       var page = $('#main_PagingList1_pager a.active').text();
        getContent(page);
    });