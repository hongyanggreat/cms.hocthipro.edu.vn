
<section class="content-list" data-track="|contentlist">

    <?php 
   // print_r($contentVideo);
        if(isset($contentVideo) && count($contentVideo) > 0){
            $id = $contentVideo['ID'];
            Yii::app()->params['metaImage'] = $img = Yii::app()->helper->getImage('/uploads/content/',$contentVideo['IMAGE']);
           
            Yii::app()->params['keywords'] = "Video";
            Yii::app()->params['description'] = $title = $contentVideo['TITLE'];

            $time = date('H:i:s d-m-Y',$contentVideo['CREATED_AT']);
            $video = '<iframe src="http://www.youtube.com/embed/'.$contentVideo['LINK'].'?modestbranding=1&amp;controls=2&amp;autoplay=1&amp;title=0" frameborder="0" width="560" height="315" allowfullscreen="0"></iframe>';

     ?>
        
    <div id="showContentCate">
       
          <article data-aid="<?php echo $id ?>">
               
                <header class="contentDetail">
                    <h2>
                        <a  title="<?php echo $title ?>"><?php echo $title ?></a>
                    </h2>
                    <p class="meta">
                        <a href="">Lượt xem : <?php echo number_format($contentVideo['VIEW'],'0',',','.') ?> view</a>
                        <a ></a>
                        <time class="friendly" datetime="2017-02-12T11:16:00+07:00"><?php echo $time  ?></time>
                        <span>
            <a href="" title="<?php echo $title ?>" class="spr spr-cache cache"><?php echo $title ?></a>
            </span>
                    </p>
                </header>

                <style>
                    .showVideo{
                        text-align: center;
                    }
                </style>
                <div class="showVideo"><?php echo  $video; ?></div>
            
            </article>    
        <?php echo $this->renderPartial('//../modules/common/social/socialButton'); ?>
        <?php echo $this->renderPartial('//../modules/common/social/commentFacebook'); ?>
     
    </div>

    <?php } ?>
   
    
</section>

