<?php 

    $alias = Yii::app()->uri->segment(1);
    
    $menuContent = Yii::app()->contentComponent->getMenu();
    if(isset($menuContent) && count($menuContent)>0){

 ?>
<nav class="navigation">
    <ul>
        <li class="parent hot <?php echo ($alias == "" ? "active" : "")?>"><a href="/"><i class="spr spr-hot"></i><span>Nóng</span></a> </li>
        <li class="parent <?php echo ($alias == "diem-chuan.html" ? "active" : "")?>"><a href="<?php echo Yii::app()->request->baseUrl.'/diem-chuan.html' ?>"><i class="spr spr-news"></i><span>Điểm thi</span></a> </li>
       <li style="width:0px" class="parent news"></li>
       <li style="width:0px" class="parent news"></li>
       
         <?php 
            foreach ($menuContent as $key => $value) {
                $nameCate = $value['NAME'];
                $linkCate = Yii::app()->request->baseUrl.'/'.$value['ALIAS'].'.html';

                $menuChild = Yii::app()->contentComponent->getMenu($value['ID']);
         ?>
        <li class="parent">
            <a href="<?php echo $linkCate; ?>" data-id=""><span><?php echo $nameCate ?></span></a>
            <?php
                if(isset($menuContent) && count($menuContent)>0){
               
             ?>
            <ul class="child">
                <?php 
                     foreach ($menuChild as $key2 => $value2) {
                     $nameCateChild = $value2['NAME'];
                     $linkLiCateChild = Yii::app()->request->baseUrl.'/'.$value2['ALIAS'].'.html';
                 ?>
                    <li>
                        <a href="<?php echo $linkLiCateChild; ?>" data-id="">
                            <span><?php echo $nameCateChild; ?></span>
                        </a>
                    </li>
                <?php } ?>
                
            </ul>
            <?php } ?>
        </li>
       <?php } ?>
       
        <li class="parent hamburger fake-btn"><a class="category"><i class="spr spr-hamburger"></i></a>
        </li>
    </ul>
</nav>
<style>
    @media only screen and (max-width: 767px){
        .navigation>ul .parent:last-child {
            display: block;
        }
    }
</style>
 <?php } ?>