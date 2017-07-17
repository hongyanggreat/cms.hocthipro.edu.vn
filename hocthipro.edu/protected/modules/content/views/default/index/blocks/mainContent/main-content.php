<div class="focus" data-track="|hotnews">
    <div class="main">

      <?php 
            if(isset($topNews) && count($topNews) > 0){
                foreach ($topNews as $key => $value) {
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
                    
                    $title = $value['TITLE'];
                    $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';

                    $time = Yii::app()->helper->timeText($value['CREATED_AT'],true);
                    if($key == 0){
                        $feature = 'feature';
                    }else{
                        $feature = '';
                    }
         ?>
        <article data-aid="<?php echo $id ?>" class="<?php echo $feature ?>">
            <figure>
                <a  href="<?php echo $link ?>"> 
                    <div title="<?php echo $title ?>" style="width: 100%;height: 100%;background: url(<?php echo $img ?>);background-repeat: no-repeat;background-position: center;background-size: cover;display:block;"></div>
                </a>
            </figure>
            <header>
                <h2>
                    <a  href="<?php echo $link ?>" title="<?php echo $title ?>"><?php echo $title ?></a>
                </h2>
                <p class="meta"> 
                    <a href="<?php echo $linkCate ?>"><?php echo $cateTitle ?></a>
                    <time class="friendly" datetime="2017-02-09T09:44:30+07:00"><?php echo $time ?></time> 
                    <span>
                        <a href="<?php echo $link ?>" title="<?php echo $title ?>" class="spr spr-cache cache"><?php echo $title ?>
                        </a>
                    </span> 
                </p>
            </header>
        </article>

        
        <?php 
                } 
            } 
        ?>
    </div>
</div>