<style>
    ul.child2{
        display: none;
    }
    ul.child li:hover ul.child2{
        display: block;
        position: absolute;
        background: #15a1b1;
        width: 200px;
        top: 0px;
        left: 100%;
        border-left:2px solid #fff;
    }
    ul.child li ul.child2 li:hover a{
        width: 100%;
        background: #0f8e9c;
    }
</style>
<nav class="navigation">
<?php 
  /*  
    // su dung memcache
  if(Yii::app()->cache->get('htp_menu')){
        $menuContent =  Yii::app()->cache->get('htp_menu');
        //Yii::app()->cache->delete('htp_menu');
    }else{
       $menuContent = Yii::app()->contentComponent->getMenu();
       Yii::app()->cache->set('htp_menu',$menuContent);
    }*/
     $menuContent = Yii::app()->contentComponent->getMenu();
    
?>
        <div class="header-wrap">
            <ul>
                <li class="parent home mainMenu" id="home">
                    <a href="<?php echo Yii::app()->getBaseUrl(true) ?>"><i class="spr spr-home"></i></a>
                </li>

                <?php

                    $numberMenu = 10;
                    $moreCate = '';
                    foreach ($menuContent as $key=> $value) {
                        
                        $linkCate = Yii::app()->request->baseUrl.'/'.$value['ALIAS'].'.html';
                        
                        $menuChild = Yii::app()->contentComponent->getMenu($value['ID']);
                        
                        $liCateChild ='';
                        $ulChild = '';
                        if(isset($menuChild) && count($menuChild) > 0){
                            foreach ($menuChild as $key1 => $value1) {
                                $linkLiCateChild = Yii::app()->request->baseUrl.'/'.$value1['ALIAS'].'.html';
                                $liCateChild .= '<li class="mainChildMenu" id="main-child-'.$key.$key1.'"><a href="'.$linkLiCateChild.'" data-id="'.$value1['ID'].'">'.$value1['NAME'].'</a></li>';
                            }
                            
                        }
                        if(($key +1) <= $numberMenu){
                            if(isset($liCateChild) && trim($liCateChild) !=""){
                                $ulChild = '<ul class="child">'.$liCateChild.'</ul>';
                            }
                            echo '<li class="parent mainMenu" id="main-'.$key.'"><a href="'.$linkCate.'" data-id="'.$value['ID'].'">'.$value['NAME'].'</a>'.$ulChild.'</li>';
                        }else{
                            $ulChild = '<ul class="child2">'.$liCateChild.'</ul>';
                            $moreCate .= '<li class="mainChildMenu" id="main-child2-'.$key.'"><a href="'.$linkCate.'" data-id="'.$value['ID'].'">'.$value['NAME'].'</a>'.$ulChild.'</li>';
                        }
                    }
                 ?>
                    
                <?php 
                    if(!empty($moreCate)){
                ?>
                 <li class="parent mainMenu" id="moreMenu">
                    <a ><i class="spr spr-more-content"></i></a>
                    <ul class="child"><?php echo $moreCate; ?></ul>
                </li>
               <?php } ?>
                
            </ul>
        </div>
    </nav>

    <script>
        var mainMenu = "home";
        $('body').on('click', 'li.mainMenu', function() {
            mainMenu = $(this).attr('id');
            if (window.sessionStorage) {
                sessionStorage.setItem("mainMenu", mainMenu);
            }
        });
        
        mainMenu = sessionStorage.getItem("mainMenu");
        if(!sessionStorage['mainMenu']){
            mainMenu = "home";
        }
        $('li.mainMenu').removeClass('active');
        $('li.mainMenu#'+mainMenu).addClass('active');

        $('body').on('click', 'li.mainChildMenu', function() {
            var mainChildMenu = $(this).attr('id');
            if (window.sessionStorage) {
                sessionStorage.setItem("mainChildMenu", mainChildMenu);
            }
        });
        var mainChildMenu = sessionStorage.getItem("mainChildMenu");
        $('li.mainChildMenu').removeClass('active');
        $('li.mainChildMenu#'+mainChildMenu).addClass('active');

    </script>
    <script>
        /*console.log(localStorage);
         $('body').on('click', 'li.mainMenu', function() {
            mainMenu = $(this).attr('id');
            if (window.localStorage) {
                localStorage['mainMenu'] = mainMenu;
            }
        });
        var mainMenu = localStorage['mainMenu'];
        $('li.mainMenu').removeClass('active');
        $('li.mainMenu#'+mainMenu).addClass('active');

        $('body').on('click', 'li.mainChildMenu', function() {
            var mainChildMenu = $(this).attr('id');
            if (window.localStorage) {
                localStorage['mainChildMenu'] = mainChildMenu;
            }
        });
        var mainChildMenu = localStorage['mainChildMenu'];
        $('li.mainChildMenu').removeClass('active');
        $('li.mainChildMenu#'+mainChildMenu).addClass('active');*/

    </script>