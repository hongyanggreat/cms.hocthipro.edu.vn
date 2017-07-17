
<style>
  .postCate{
      float: left;
      height: 640px;
      overflow: hidden;
  }

</style>
<br>
<?php 

    if(isset($contentCate) && count($contentCate)>0){

    foreach ($contentCate as $key => $value) {
      
      $cateLable = $value['cate']['NAME']; 
      $linkCateLable = Yii::app()->request->baseUrl.'/'.$value['cate']['ALIAS'].'.html';
 ?>

 <section class="zone postCate" data-track="home|xa-hoi">
    <header>
      <a href="<?php echo $linkCateLable ?>" title="<?php echo $cateLable ?>"><?php echo $cateLable ?></a>
    </header>
    
    <?php 
    if(isset($value['info']) && count($value['info']) > 0){
      foreach ($value['info'] as $keyInfo => $valueInfo) {
            $id = $valueInfo['ID'];
            $cateInfo = Yii::app()->contentComponent->getCate($valueInfo['CATE_ID']);
            $cateTitle = $cateInfo['NAME'];
            $linkCate    = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'.html';

            $title = $valueInfo['TITLE'];
            $link = Yii::app()->request->baseUrl.'/'.$value['cate']['ALIAS'].'/'.$valueInfo['ALIAS'].'.html';
            $time = Yii::app()->helper->timeText($valueInfo['CREATED_AT']);


           
                 
            $options = [ 
                    'pathImage' =>Yii::app()->params['media'].'/article/'
                                    .date('Y',$valueInfo['CREATED_AT']).'/' 
                                    .date('m',$valueInfo['CREATED_AT']).'/' 
                                    .date('d',$valueInfo['CREATED_AT']).'/'
                                    .$id.'/thumnail/',
                    'image'=>$valueInfo['IMAGE'],
                    ];
            
            $img =  Yii::app()->helper->getImageNew($options);
    ?>
    <?php //for ($i=0; $i <5 ; $i++) {?>
    <article data-aid="<?php echo $link ?>" class="feature">
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
                <time class="friendly" datetime="<?php echo $valueInfo['CREATED_AT']?>"><?php echo $time ?></time> 
                <span>
                    <a href="<?php echo $link ?>" title="<?php echo $title ?>" class="spr spr-cache cache"><?php echo $title ?></a>
                </span> 
            </p>
        </header>
    </article>
    <?php } ?>
    <?php } ?>
</section>
<?php }} ?>
    