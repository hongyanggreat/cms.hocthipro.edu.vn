<div class="cat-content search">
    <section class="content-list" data-track="|contentlist">

        <header>
            <h1 class="title">Từ khóa tìm kiếm : <?php echo $keyword ?></h1>
        </header>
        <?php 
            if(isset($contentCate) && count($contentCate) > 0){
         ?>
        
        <div id="showContentCate">
            <?php 
                    foreach ($contentCate as $key => $value) {
                        $id = $value['ID'];
                        $options = [ 
                                    'pathImage' =>Yii::app()->params['media'].'/article/'
                                                    .date('Y',$value['CREATED_AT']).'/' 
                                                    .date('m',$value['CREATED_AT']).'/' 
                                                    .date('d',$value['CREATED_AT']).'/'
                                                    .$id.'/thumnail/'
                                                    ,
                                    'image'=>$value['IMAGE'],
                                ];

                        $img =  Yii::app()->helper->getImageNew($options);
                        
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
                            <div img="<?php echo $value['IMAGE'] ?>" title="<?php echo $title ?>" style="width: 100%;height: 100%;background: url(<?php echo $img ?>);background-repeat: no-repeat;background-position: center;background-size: cover;display:block;"></div>
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
            <span id="main_PagingList1_pager" limit="<?php echo $paginator['limit']?>"  keyword="<?php echo $keyword ?>" order="<?php echo $paginator['order'] ?>" by="<?php echo $paginator['by'] ?>" >
                <a class="main_PagingList1_pager_backControl cursor" <?php //echo $linkNext ; ?>>«</a>
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
                <a  class="main_PagingList1_pager_nextControl cursor" <?php //echo $linkNext ; ?>>»</a>
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
            var keyword = $('#main_PagingList1_pager').attr('keyword');         
            var order   = $('#main_PagingList1_pager').attr('order');         
            var by      = $('#main_PagingList1_pager').attr('by');         
            var url     = baseUrl+'/tim-kiem/keyword';
              $.ajax({
                url : url,
                type : "post",
                dateType:"JSON",
                data : {'task':'searchKeyword','page':page,'limit':limit,'keyword':keyword,'order':order,'by':by},
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
                   scrollTop(0); 
                },error: function() {
                   console.log('error');
                   $('#showContentCate').css('opacity', '1');
                }   
            });
            
        }
      
        </script>
         <?php }  ?>
        <?php }else{
            echo 'Chưa có tin';
            }  ?>
        
    </section>

        <?php  
            if(isset($contentHot) && count($contentHot)>0){
        ?>
        <aside>
            <section class="zone">
                <header><a href="/tin-nong.epi">Tin nóng</a>
                </header>

                <?php 
                    foreach ($contentHot as $key => $value) {
                        $id          = $value['ID'];

                        $cate = yii::app()->contentComponent->getCate($value['CATE_ID']);
                        $cateTitle = $cate['NAME'];
                        $linkCate = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
                        
                        $link        = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';
                        $title       = $value['TITLE'];
                        
                        $description = $value['CONTENT_SHORT'];
                        
                        $options = [ 
                                    'pathImage' =>Yii::app()->params['media'].'/article/'
                                                    .date('Y',$value['CREATED_AT']).'/' 
                                                    .date('m',$value['CREATED_AT']).'/' 
                                                    .date('d',$value['CREATED_AT']).'/'
                                                    .$id.'/thumnail/'
                                                    ,
                                    'image'=>$value['IMAGE'],
                                ];

                        $img =  Yii::app()->helper->getImageNew($options);
                        $time        = date('d-m-Y',$value['CREATED_AT']);
                ?>
                <article data-aid="<?php echo $id ?>">
                    <figure>
                        <a href="<?php echo $link ?>">
                            <div title="<?php echo $title ?>" style="width: 100%;height: 100%;background: url(<?php echo $img ?>);background-repeat: no-repeat;background-position: center;background-size: cover;display:block;"></div>
                        </a>
                    </figure>
                    <header>
                        <h2><a  href="<?php echo $link ?>" title="<?php echo $title ?>"><?php echo $title ?></a></h2>
                        <p class="meta">
                            <a href="<?php echo $linkCate ?>"><?php echo $cateTitle ?></a>
                            <time class="friendly" datetime="2017-02-26T11:13:28+07:00"><?php echo $time ?></time>
                            <span>
                                <a href="<?php echo $link ?>" title="<?php echo $title ?>" class="spr spr-cache cache"><?php echo $title ?></a>
                            </span>
                        </p>
                    </header>
                </article>
               <?php }  ?>
            </section>
        </aside>
         <?php }  ?>
</div>
