<div class="more-article" data-track="|news">
                    <style>
                        .lableContent{
                            color:#15A1B1;
                            font-size: 20px;
                            text-decoration:underline;
                            cursor: pointer;
                        }
                    </style>
                
                <?php 

                // echo '<pre>'; print_r($topContent);
                    if(isset($hotNews) && count($hotNews) > 0){
                       //echo "<span  class='lableContent'>$titleTopContent</span>";
                        foreach ($hotNews as $key => $value) {
                            $id = $value['ID'];
                           //echo '<pre>'; print_r($value);
                            $cate = yii::app()->contentComponent->getCate($value['CATE_ID']);
                            $cateTitle = $cate['NAME'];
                            $linkCate = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
                            
                            $title = $value['TITLE'];
                            $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';

                            //$time = date('H:i:s d-m-Y',$value['CREATED_AT']);
                            $time = Yii::app()->helper->timeText($value['CREATED_AT']);
                        
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