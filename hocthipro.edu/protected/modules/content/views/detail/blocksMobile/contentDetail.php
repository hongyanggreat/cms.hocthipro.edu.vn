<?php 
     if(isset($contentCate) && count($contentCate) > 0){
        $id = $contentCate['ID'];
        $title = str_replace('"', '', $contentCate['TITLE']);
        $this->pageTitle = $title;
        //$img = Yii::app()->helper->getImage('/content/',$contentCate['IMAGE']);
        $options = [ 
                        'pathImage' =>Yii::app()->params['media'].'/article/'
                                        .date('Y',$contentCate['CREATED_AT']).'/' 
                                        .date('m',$contentCate['CREATED_AT']).'/' 
                                        .date('d',$contentCate['CREATED_AT']).'/'
                                        .$id.'/thumnail/'
                                        ,
                        'image'=>$contentCate['IMAGE'],
                    ];
        $img =  Yii::app()->helper->getImageNew($options);
        Yii::app()->params['metaImage'] = $img;
        $description = htmlspecialchars_decode($contentCate['CONTENT_SHORT']);
        Yii::app()->params['description'] =  $description;

        $metaKeyword =  htmlspecialchars_decode($contentCate['META_KEYWORD']);
        if($metaKeyword && !empty($metaKeyword)){

            Yii::app()->params['metaKeyword'] = $metaKeyword;
        }else{
            
            Yii::app()->params['metaKeyword'] = $description;

        }
        $keyword =  htmlspecialchars_decode($contentCate['TAG']);
        $linkCate = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
        //$link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$contentCate['ALIAS'].'.html';
        $link = '';
        //$contentFull = htmlspecialchars_decode($contentCate['CONTENT_FULL']);
        $contentFull = htmlspecialchars_decode($contentCate['CONTENT_FULL']);
        
        $time = date('d-m-Y',$contentCate['CREATED_AT']);
 ?>
<article class="main-article" data-aid="22369327">
    <header>
        <h1><?php echo $title ?></h1>
        <div class="meta new">
            <div class="time-source">
                <a class="source" href="<?php echo $linkCate ?>"><?php echo $cate['NAME'] ?></a>
                <time><?php echo $time ?></time>
                <a><?php echo $contentCate['VIEW_NUMBER'] ?> view</a>
            </div>
            <div class="tools">
                <a class="like" href="#"><i class="spr spr-like"></i><span><?php echo $contentCate['VIEW_NUMBER'] ?></span></a>
                <a class="cache" rel="nofollow" href="<?php echo $link ?>" target="_blank"><i class="spr spr-source"></i><span>Gốc</span></a>
                <div class="social">
                    <ul class="rrssb-buttons">
                        
                    </ul>
                </div>
            </div>
        </div>
    </header>
    <div class="article-body">
        <?php echo $contentFull; ?>
    </div>
</article>
<?php } ?>