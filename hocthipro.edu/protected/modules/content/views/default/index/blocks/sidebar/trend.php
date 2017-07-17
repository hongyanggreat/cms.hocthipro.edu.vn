<?php 
    if(isset($arrKeyword) && count($arrKeyword)<0){
?>
<section id="trending-list" data-track="|trending">
    <header>
        <h6> <a href="javascript:;">Xu hướng</a> </h6> 
    </header>

    <div class="trending"> 
        <?php 
            $fontSize = array(
                   
                    'w20',
                    'w19',
                    'w18',
                    'w17',
                    'w16',
                    'w15',
                    'w14',
                    'w13',
                    'w12',
                    'w11',
                    'w10',
                    'w9',
                    'w7',
                    'w6',
                    'w5',
                    'w4',
                    'w2',
                    'w1',
                    'none',
                );
            $arrow = array( 
                        'down',
                        'up',
                    );
         //   print_r($arrKeyword);

           if(isset($arrKeyword) && count($arrKeyword)){
                foreach ($arrKeyword as $key => $value) {
                $linkKeyword = Yii::app()->request->baseUrl.'/tag/'.Yii::app()->helper->removeSpace($value).'.html';
                $random_keys = array_rand($fontSize,count($fontSize));
                $random_keys2 = array_rand($arrow,count($arrow));
                
                $fontSizeClass = $fontSize[$random_keys[rand(0,(count($fontSize) - 1))]];
                $arrowClass = $arrow[$random_keys[rand(0,(count($arrow) - 1))]];
         ?>
    
    	        <span class="<?php echo $arrowClass . ' '. $fontSizeClass  ?>">
                    <a href="<?php echo $linkKeyword ?>"><?php echo $value ?></a>
                </span> 
        <?php 
                } 
            }
        ?>
    	
    </div>
</section>

 <?php 
    }
?>

