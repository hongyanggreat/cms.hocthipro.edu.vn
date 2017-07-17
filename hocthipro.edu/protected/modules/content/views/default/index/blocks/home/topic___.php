<?php 
 //echo '<pre>'; print_r($contentCate);
  if(isset($contentCate) && count($contentCate)>0){


     foreach ($contentCate as $key => $value) {
        if(count($value['info']) > 0 ){
            $id = $value['ID'];
            $cateTitle = $value['cate']['NEWSCATE_NAME']; 
            $linkCate = Yii::app()->request->baseUrl.'/'.$value['cate']['ALIAS'].'.html';

            $time = date('d-m-Y',$value['CREATED_AT']);

 ?>

<section class="topic">
    <header> 
        <a id="main_TopClusters1_rptClusters_hlCluster_0" href="<?php echo $linkCate ?>"><?php echo $cateTitle ?></a> 
    </header>
     <?php 
        foreach ($value['info'] as $keyInfo => $valueInfo) {
            $link = Yii::app()->request->baseUrl.'/'.$value['cate']['ALIAS'].'/'.$valueInfo['ALIAS'].'.html';
            $title = $valueInfo['TITLE'];
            if($keyInfo == 0){
                $feature = "feature";
            }else{
                $feature= '';
            }
     ?>  
        <article data-aid="<?php echo $id ?>">

            <?php 
                if($keyInfo == 0){
                    $img = Yii::app()->helper->getImage('/uploads/content/',$value['IMAGE']);
            ?>
                <figure>
                    <a target="_blank" href="<?php echo $link ?>"> <img style="background: url(<?php echo $img ?>);background-repeat: no-repeat;background-position: center;background-size: cover;display:block" alt="<?php echo $title ?>">
                    </a>
                </figure>
            <?php } ?>
            <header>
                <h2>
                    <a target="_blank" href="<?php echo $link ?>" title="Tin gió mùa Đông Bắc mới nhất ngày 9/2: Có nơi dưới 8 độ"><?php echo $title ?></a>
                </h2>
                <p class="meta"> 
                    <a href="<?php echo $linkCate ?>"><?php echo $cateTitle ?></a>
                    <time class="friendly" datetime="2017-02-09T12:04:00+07:00"><?php echo $time ?></time> 
                    <span>
                        <a href="<?php echo $link ?>" title="<?php echo $title ?>" class="spr spr-cache cache"><?php echo $title ?></a>
                    </span> 
                </p>
            </header>
        </article>
    <?php } ?>  
</section>
<?php 
      }
    } 
  }
?>
