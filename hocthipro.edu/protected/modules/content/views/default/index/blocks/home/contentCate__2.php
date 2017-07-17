<?php 
	$total = 0;
	foreach ($contentCate as $key => $value) {
		if(count($value['info']) > 0 ){
			$total ++; 
		}
	}
     //$total = count($contentCate);
	// $total = 13;
      $offsetColumn =  floor($total/3);
   if($total >= 3){
	    $div =  floor($total%3);  
   }else{
	    $div =  0;  
   }
     

// echo '<pre>'; print_r($contentCate);
// die;
    for ($i=1; $i <= 3 ; $i++) { 
       /*if($i == 1){
            echo $offset = 0;
      			if($total >= 3){
      				if($total !=3){
      					if($div !=0){
      						echo $limit =$offsetColumn + 1;
      					}else{
      						echo $limit =$offsetColumn;
      					}
      					
      				}else{
      					echo $limit =1;
      				}
      				
      			}else{
      				if($total < 1){
      					
      					echo $limit = 0;
      					
      				}else{
      					
      					echo $limit = 1;
      					
      				}
      			}
            
                  
        }else if($i == 2){
      			echo $offset = $limit;
      			if($total >= 3){
      				if($total !=3){
      					if($div == 2){
      						echo 'as'.$limit =$offsetColumn +$offset+1;
      					}else{
      						echo 'cc'.$limit = $offsetColumn +$offset;
      					}
      					
      				}else{
      					echo $limit =1;
      				}
      			  
      			}else{
      				
      				if($total < 2){
      					echo $limit = 0;
      				}else{
      					echo $limit = 1;
      				}
      				
      			}
      			
                       
        }else if($i == 3){
      			echo $offset = $limit;
      		   if($total > 3){
      			  echo $limit =$offsetColumn;
      			}else if($total == 3){
      				echo $limit = 1;
      			}else{
      				echo $limit = 0;
      			}
                 
         }*/
 ?>

    
<?php 
  if(isset($contentCate) && count($contentCate)>0){

        $section = "zone";
        $classDiv = "zone-collumn";
        if($i == 1){
            $offset = 0;
            $limit = $offsetColumn ;
         }else{
            $offset = $limit +1 ;
            $limit = $limit + $offsetColumn;
            if($i == 3){
                $section = "topic";
                $classDiv = "topics";
            }
         }
    echo '<div class="'.$classDiv.'">';
     foreach ($contentCate as $key => $value) {

        if($key >= $offset && $key <= $limit  ){
		//echo '<pre>';print_r($value);
        //die;
        if(count($value['info']) > 0 ){
            $id = $value['cate']['ID'];
            $cateTitle = $value['cate']['NEWSCATE_NAME']; 
            $linkCate = Yii::app()->request->baseUrl.'/'.$value['cate']['ALIAS'].'.html';

           

 ?>

             <section class="<?php echo $section ?>" data-track="home|xa-hoi">
                <header>
                    <a href="<?php echo $linkCate ?>" title="<?php echo $cateTitle ?>"> <?php echo $cateTitle ?></a>
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
						           $time = date('d-m-Y',$valueInfo['CREATED_AT']);
                 ?>  
                

                <article data-aid="<?php echo $id ?>" class="<?php echo $feature ?>">
                    <?php 
                        if($keyInfo == 0){
                             //$img = Yii::app()->helper->getImage('content/',$valueInfo['IMAGE']);
                            $file = $img =  Yii::app()->params['media'].'/content/'.$valueInfo['IMAGE'];
                                   
                            $file_headers = @get_headers($file);
                            if(!$file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found' || empty($valueInfo['IMAGE'])) {
                                $img =  Yii::app()->params['media'].'/errors/hocthipro_miss.png';
                            }

                             //$img = Yii::app()->getBaseMedia().'/content/'.$valueInfo['IMAGE'];
                    ?>
                        <figure>
                            <a target="_blank" href="<?php echo $link ?>"> 
                                <img style="background: url(<?php echo $img ?>);background-repeat: no-repeat;background-position: center;background-size: cover;display:block" title="<?php echo $title ?>" alt="" />
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
    echo '</div>';
  }
?>


<?php 

    }
?>

