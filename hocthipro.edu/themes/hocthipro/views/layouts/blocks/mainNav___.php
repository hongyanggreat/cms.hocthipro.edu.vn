<nav class="navigation">
<?php 
    $menuContent = Yii::app()->session['menuContent'];
    // print_r($menuContent);
    // unset(Yii::app()->session['menuContent']);
     if(!$menuContent){
        $menuContent = Yii::app()->contentComponent->getMenu();
        Yii::app()->session['menuContent'] = $menuContent;
     }
?>
        <div class="header-wrap">
            <ul>
                <li class="parent home">
                    <a href="<?php echo Yii::app()->request->baseUrl; ?>"><i class="spr spr-home"></i></a>
                </li>

                <?php

                    $numberMenu = 7; 
                    $moreCate = '';
                    foreach ($menuContent as $key=> $value) {
                            $linkCate = Yii::app()->request->baseUrl.'/'.$value['ALIAS'].'.html';
                        if(($key +1) <= $numberMenu){
                            echo '<li class="parent"><a href="'.$linkCate.'" data-id="'.$value['ID'].'">'.$value['NEWSCATE_NAME'].'</a> </li>';
                        }else{
                            $moreCate .= '<li class="parent"><a href="'.$linkCate.'" data-id="'.$value['ID'].'">'.$value['NEWSCATE_NAME'].'</a> </li>';
                        }
                    }
                 ?>
                    
               
                 <li class="parent home">
                    <a ><i class="spr spr-more-content"></i></a>
                    <ul class="child">
                         <?php echo $moreCate; ?>
                    </ul>
                </li>
                
            </ul>
        </div>
    </nav>

    <script>
       /* $('body').on('hover', '.parent', function(event) {
            event.preventDefault();
            alert(1);
        });*/
    </script>