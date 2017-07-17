<div class="more-article" data-track="|news">
    <?php 
     // echo '<pre>'; print_r($arrTop);
        if(isset($newsContent) && count($newsContent) > 0){
            //echo "<span  class='lableContent'>".$titleBottomContent."</span>";
            foreach ($newsContent as $key => $value) {
                $id = $value['ID'];
               //echo '<pre>'; print_r($value);
                $cate = yii::app()->contentComponent->getCate($value['CATE_ID']);
                $cateTitle = $cate['NAME'];
                $linkCate = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
                
                $title = $value['TITLE'];
                $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';

                $time = date('H:i:s d-m-Y',$value['CREATED_AT']);

     ?>
        <article data-aid="<?php echo $id ?>">
            <header>
                <h2>
                    <a  href="<?php echo $link ?>" title="<?php echo $title ?>"><?php echo $title ?></a>
                </h2>
                <p class="meta"> 
                    <a href="<?php echo $linkCate ?>"><?php echo $cateTitle ?></a>
                    <time class="friendly" datetime="2017-02-09T13:00:00+07:00"><?php echo $time ?></time> 
                    <span>
                        <a href="<?php echo $link ?>" title="<?php echo $title ?>" class="spr spr-cache cache"><?php echo $title ?></a>
                    </span> </p>
            </header>
        </article>
        
    <?php 
            }
        }
    ?>

    </div>