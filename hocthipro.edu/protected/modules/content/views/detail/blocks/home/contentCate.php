<div class="cat-content search">
    <section class="content-list contentDetail" data-track="|contentlist">
          <style>
             #showContentCate{
                font-size: 17px;
             }
             #showContentCate p{
                font-size: 18px;
                margin: 5px;
                text-align: justify;
                padding-right: 10px;
             }
             #showContentCate h2{
                line-height: 25px;
                font-size: 18px;
             }
             #showContentCate .contentDetail h2{
                font-size: 24px;

             }
             #showContentCate .contentDetail p.meta{
                font-size: 14px;
             }
             .new_relation_top {
                font-size: 14px;
             }
         </style>
               
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

        
        <div id="showContentCate">
           
              <article data-aid="<?php echo $id ?>">
                   
                    <header class="contentDetail">
                        <h2>
                            <a href="<?php echo $link ?>" title="<?php echo $title ?>"><?php echo $title ?></a>
                        </h2>
                        <p class="meta">
                            <a href="<?php echo $linkCate ?>"><?php echo $cate['NAME'] ?></a>
                            <a > | <?php echo $contentCate['VIEW_NUMBER'] ?> view</a>
                            <time class="friendly" datetime="2017-02-12T11:16:00+07:00"><?php echo $time  ?></time>
                            <span>
                <a href="<?php echo $link ?>" title="<?php echo $title ?>" class="spr spr-cache cache"><?php echo $title ?></a>
                </span>
                        </p>
                    </header>
                    <?php echo $contentFull ?>
                </article>    
            <?php echo $this->renderPartial('//../modules/common/social/socialButton'); ?>
            <?php echo $this->renderPartial('//../modules/common/social/commentFacebook'); ?>

            <?php
                 if(isset($keyword) && !empty($keyword)){
             ?>
            <style>
                .su-button-center{
                    margin-top: 20px;
                    padding-bottom: 10px;
                    margin-left: 10px;
                    text-align: left;
                    display: block;
                }
                .keyword{
                    background: #2c7ab3;
                    padding: 5px 7px;
                    color: #fff;
                    border-radius: 3px;
                    line-height: 30px;
                }
            </style>

            <div class="su-button-center">
                <span class="keyword" style="text-shadow:1px 1px 8px #000;;background: #2a618a;">TỪ KHÓA</span>    
                <?php 
                   
                    $arrKeyword = explode(',', $keyword);
                    foreach ($arrKeyword as $key => $value) {
                       // $alias = Yii::app()->helper->changTitle($value);
                        $tag = str_replace(" ","-",$value);
                        $link = Yii::app()->request->baseUrl.'/tag/'.$tag.'.html';
                        echo ' <a href="'.$link.'" title=""><span class="keyword">'.$value.'</span></a>';   
                    } 
                ?>
            </div>
              
            <?php
                }
                    
             ?>
            <?php
                if(isset($contentMore) && count($contentMore)>0){
                    
             ?>
             <!-- //Bat dau bai viet lien quan -->
            <style>
                .new_relation_top{
                    margin: 10px;
                }
                .new_relation_top .head_new_relation_top{
                    font-size: 20px;
                    color: #2c7ab3;
                    font-weight: bold;
                    display: block;
                    margin-bottom: 10px;
                }
            </style>
            <div class="new_relation_top">
                <span class="head_new_relation_top">Tin cùng chuyên mục</span>
                <ul>

                    <?php 
                        foreach ($contentMore as $key => $value) {
                            $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';
                            $title = $value['TITLE'];
                     ?>
                        <li>
                            <h3><a style="display: inline;" href="<?php echo $link ?>">* <?php echo $title ?></a>
                            </h3>
                        </li>
                    <?php } ?>
                    
                </ul>
            </div>
             <?php } ?>

             <!-- //Ket thuc bai viet lien quan -->
        </div>

        <?php } ?>
       
        
    </section>


    <?php  
        if(isset($contentHot) && count($contentHot) >0 ){
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