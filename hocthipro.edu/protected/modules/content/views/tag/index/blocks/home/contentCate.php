<style>
    #showContentCate article{
        position: relative;
        padding: 10px 0 0;
        border-bottom: 1px solid #E6E6E6;
    }
    #showContentCate article figure{
        float: left;
        margin: 3px 11px 13px 11px;
        width: 205px;
        height: 136px;
    }
</style>
<section class="content-list" data-track="|contentlist">

    <header>
        <h1 class="title">Thẻ : <?php echo $tag ?></h1>
    </header>
    <?php 
        if(isset($contentCate) && count($contentCate) > 0){
     ?>
    
    <div id="showContentCate">
        <?php 
                foreach ($contentCate as $key => $value) {
                    $id = $value['ID'];
                    $img = Yii::app()->helper->getImage('/uploads/content/',$value['IMAGE']);
                    
                    $cate = yii::app()->contentComponent->getCate($value['CATE_ID']);
                    $cateTitle = $cate['NAME'];
                    $linkCate = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
                    
                    $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';
                    $title = $value['TITLE'];
                    $description = $value['CONTENT_SHORT'];

                    $time = date('d-m-Y',$value['CREATED_AT']);
        ?>
            
            <article data-aid="<?php echo $id ?>">
                <figure>
                    <a  href="<?php echo $link ?>">
                        <img src="<?php echo $img ?>" alt="<?php echo $title ?>">
                    </a>
                </figure>
                <header>
                    <h2>
            <a  href="<?php echo $link ?>" title="<?php echo $title ?>"><?php echo $title ?></a>
            </h2>
                    <p class="meta">
                        <a href="<?php echo $linkCate ?>"><?php echo $cate['NAME'] ?></a>
                        <time class="friendly" datetime="2017-02-12T11:16:00+07:00"><?php echo $time ?></time>
                        <span>
            <a href="<?php echo $link ?>" title="<?php echo $title ?>" class="spr spr-cache cache"><?php echo $title ?></a>
            </span>
                    </p>
                    <p class="summary"><?php echo $description ?></p>
                </header>
            </article>

        <?php }  ?>
    </div>
<?php 
    if(isset($paginator['totalPage']) && $paginator['totalPage'] > 1){
?>

    <style>
    .pagination span a.main_PagingList1_pager_backControl{
        display: none;
    }
    #pageText{
        border: 1px solid green;
        padding: 5px;
        width: 85px;
        border-radius: 2px 0 0 2px;
    }  
    #gotoPage{
        border: 1px solid green;
        padding: 5px 7px;
        width: 100px;
        border-radius: 0 2px 2px 0;
        background: green;
        color: #fff;
        margin-left: -5px;
    }
    </style>
    <div class="pagination pagination-centered">
        <span id="main_PagingList1_pager" limit="<?php echo $paginator['limit']?>"  tag="<?php echo $tag ?>" order="<?php echo $paginator['order'] ?>" by="<?php echo $paginator['by'] ?>" >
            <a class="main_PagingList1_pager_backControl cursor" >«</a>
            <?php
                for ($i=0 ; $i < 3 ; $i++) { 
                 if($i < $paginator['totalPage']){
                    if(($i+1) == $paginator['pageActive']){
                        $link = "class='page active'";
                    }else{
                        $link = 'class="page cursor pageNumber"';
                    }
            ?>
                <a <?php echo  $link ?> id='page<?php echo $i +1 ?>'><?php echo $i +1 ?></a>
            <?php }} ?>
            <?php 
                if($paginator['totalPage'] >= 4){
            ?>
                <a class="cursor">...</a>
            <a class="page cursor" id='lastPage'><?php echo $paginator['totalPage'] ?></a>
            <a  class="main_PagingList1_pager_nextControl cursor" >»</a>
            <?php } ?>
        </span>
        <div>
            <input id="pageText" type="text" name="" value="" placeholder="Nhập trang">
            <input id="gotoPage" type="button" name="" value="chuyển trang" >
        </div>
    </div>

    <script>



  
    
    function getContent(page){
        var limit   = $('#main_PagingList1_pager').attr('limit');         
        var tag = $('#main_PagingList1_pager').attr('tag');         
        var order   = $('#main_PagingList1_pager').attr('order');         
        var by      = $('#main_PagingList1_pager').attr('by');         
        var url     = baseUrl+'/tim-kiem/tag';
          $.ajax({
            url : url,
            type : "post",
            dateType:"JSON",
            data : {'task':'searchTag','page':page,'limit':limit,'tag':tag,'order':order,'by':by},
             beforeSend: function() {
                $('#showContentCate').css('opacity', '0.1');
            },
            success : function (result){

            // console.log(result);
             var result = jQuery.parseJSON(result);
              if(result.status){
                 $('#showContentCate').html(result.info);
             }else{
                 $('#showContentCate').html(result.messages);
             }
             $('#showContentCate').css('opacity', '1');  
              
            },error: function() {
                $('#showContentCate').css('opacity', '1');
               console.log('error');
            }   
        });
        
    }
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
    </script>
     <?php }  ?>
    <?php }else{
        echo 'Chưa có tin';
        }  ?>
    
</section>

