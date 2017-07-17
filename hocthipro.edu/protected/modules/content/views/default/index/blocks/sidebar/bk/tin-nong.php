<?php 
    if((isset($topContent) && count($topContent) > 0) || (isset($bottomContent) && count($bottomContent) > 0)){
				
?>
<section class="top-story">
    <style>
        .newHot{
            cursor: pointer;
        }
    </style>
    <ul class="tab-header">
        <li class="newHot active" id="most-read"><a  data-toggle="tab-most-read">Nóng trong ngày</a>

        </li>
        <li class="newHot" id="most-read-more" ><a data-toggle="tab-most-read-more">Trong tuần</a>
        </li>
    </ul>
    <div id="top-story" class="tab-content">
        <div class="tab-pane active" id="most-read" data-track="|mostread">
            <?php 
                 if(isset($topContent) && count($topContent) > 0){
                        foreach ($topContent as $key => $value) {
                            $id = $value['ID'];
                           //echo '<pre>'; print_r($value);
                            $cate = yii::app()->contentComponent->getCate($value['NEWS_CATE_ID']);
                            $cateTitle = $cate['NEWSCATE_NAME'];
                            $linkCate = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
                            
                            $title = $value['TITLE'];
                            $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';

                            $time = date('d-m-Y',$value['CREATED_AT']);

               
             ?>

            <article data-aid="<?php echo $id?>">
                
                <header>
                    <h2><a href="<?php echo $link?>" target="_blank"><?php echo $title?></a></h2>
                    <p class="meta"><a href="<?php echo $linkCate?>"><?php echo $cateTitle?></a>
                        <time class="friendly" datetime="1486623600"><?php echo $time?></time><span><a class="spr spr-cache cache" href="<?php echo $link?>"></a></span>
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
                 if(isset($bottomContent) && count($bottomContent) > 0){
                        foreach ($bottomContent as $key => $value) {
                            $id = $value['ID'];
                           //echo '<pre>'; print_r($value);
                            $cate = yii::app()->contentComponent->getCate($value['NEWS_CATE_ID']);
                            $cateTitle = $cate['NEWSCATE_NAME'];
                            $linkCate = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
                            
                            $title = $value['TITLE'];
                            $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';

                            $time = date('d-m-Y',$value['CREATED_AT']);

               
             ?>

            <article data-aid="<?php echo $id?>">
                
                <header>
                    <h2><a href="<?php echo $link?>" target="_blank"><?php echo $title?></a></h2>
                    <p class="meta"><a href="<?php echo $linkCate?>"><?php echo $cateTitle?></a>
                        <time class="friendly" datetime="1486623600"><?php echo $time?></time><span><a class="spr spr-cache cache" href="<?php echo $link?>"></a></span>
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