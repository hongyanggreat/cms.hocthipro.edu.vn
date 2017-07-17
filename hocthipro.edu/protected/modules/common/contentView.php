<?php 

    $getContentViewDay = Yii::app()->contentComponent->getContentView();
    $getContentViewWeek = Yii::app()->contentComponent->getContentView(true);  
    if((isset($getContentViewDay) && count($getContentViewDay) > 0) || (isset($getContentViewWeek) && count($getContentViewWeek) > 0)){
				
?>
<section class="top-story">
    <style>
        .newHot{
            cursor: pointer;
        }
    </style>
    <ul class="tab-header">
        <li class="newHot active" id="most-read"><a  data-toggle="tab-most-read">Bài viết trong ngày</a>

        </li>
        <li class="newHot" id="most-read-more" ><a data-toggle="tab-most-read-more">Trong tuần</a>
        </li>
    </ul>
    <div id="top-story" class="tab-content">
        <div class="tab-pane active" id="most-read" data-track="|mostread">
            <?php 
                 if(isset($getContentViewDay) && count($getContentViewDay) > 0){
                        foreach ($getContentViewDay as $key => $value) {
                            $id = $value['ID'];
                           //echo '<pre>'; print_r($value);
                            $cate = yii::app()->contentComponent->getCate($value['CATE_ID']);
                            $cateTitle = $cate['NAME'];
                            $linkCate = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
                            
                            $title = $value['TITLE'];
                            $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';

                            $time = date('d-m-Y',$value['CREATED_AT']);

               
             ?>

            <article data-aid="<?php echo $id?>">
                
                <header>
                    <h2><a href="<?php echo $link?>" target="_blank"><?php echo $title?></a></h2>
                    <p class="meta"><a href="<?php echo $linkCate?>"><?php echo $cateTitle?></a>
                        <time class="friendly" datetime="1486623600"><?php echo $time?></time>
                        <span><a class="spr spr-cache cache" href="<?php echo $link?>"></a></span>
                        <time class="friendly" datetime="view"><?php echo $value['VIEW_NUMBER']?> Lượt xem</time>
                    </p>
                </header>
            </article> 

            <?php
                    }  
                }
            ?>
        </div>
        <div class="tab-pane " id="most-read-more" data-track="|mostread7">
            <?php 
                 if(isset($getContentViewWeek) && count($getContentViewWeek) > 0){
                        foreach ($getContentViewWeek as $key => $value) {
                            $id = $value['ID'];
                           //echo '<pre>'; print_r($value);
                            $cate = yii::app()->contentComponent->getCate($value['CATE_ID']);
                            $cateTitle = $cate['NAME'];
                            $linkCate = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
                            
                            $title = $value['TITLE'];
                            $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';

                            $time = date('d-m-Y',$value['CREATED_AT']);

               
             ?>

            <article data-aid="<?php echo $id?>">
                
                <header>
                    <h2><a href="<?php echo $link?>" target="_blank"><?php echo $title?></a></h2>
                    <p class="meta"><a href="<?php echo $linkCate?>"><?php echo $cateTitle?></a>
                        <time class="friendly" datetime="1486623600"><?php echo $time?></time>
                        <span><a class="spr spr-cache cache" href="<?php echo $link?>"></a></span>
                        <time class="friendly" datetime="view"><?php echo $value['VIEW_NUMBER']?> Lượt xem</time>
                    </p>
                </header>
            </article> 

            <?php
                    }  
                }
            ?>
            
         </div>
    </div>
</section>

<script>
    
    $('body').on('click', '.newHot', function(event) {
        event.preventDefault();
        var idTab = $(this).attr('id');
        $('.newHot').removeClass('active');
        $(this).addClass('active');
        $('.tab-content .tab-pane').removeClass('active');
        $('.tab-content .tab-pane#'+idTab).addClass('active');
    });
</script>
<?php 				 
	}
?>