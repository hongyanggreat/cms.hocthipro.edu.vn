<?php 

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
    $desciption = $value['CONTENT_SHORT'];
    
    $title = $value['TITLE'];
    $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';

    $time = Yii::app()->helper->timeText($value['CREATED_AT'],true);
    //$time = Yii::app()->helper->timeText($value['CREATED_AT']);
    $view = $value['VIEW_NUMBER'];
    if($key == 0){
        $feature = 'feature';
    }else{
        $feature = '';
    }

 ?>
<article data-track="|index0" data-aid="22339819" class="item feature">
    <a href="<?php echo $link ?>" title="<?php echo $title ?>">
        <figure>
            <img src="<?php echo $img ?>" alt="<?php echo $title ?>" width="278" height="195">
          
        </figure>
        <header>
            <h2><?php echo $title ?></h2>
            <p class="meta">
                <span><?php echo $cateTitle ?></span>
                <time><?php echo $time ?></time>
            </p>
            <p class="summary">
                <?php echo $desciption ?>
            </p>
        </header>
    </a>
    <p class="tools">
        <a href="/#" class="like">
            <i class="spr spr-like"></i>
            <span><span><?php echo $view ?></span></span>
        </a>
    </p>
</article>