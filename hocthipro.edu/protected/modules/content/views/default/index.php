<?php 
	if(Yii::app()->helper->checkDevice()){
	// Phien ban mobile	
		include( 'indexMobile/mainContent.php');
	}else{
	// Phien ban desktop	
 ?>
<?php 
//META SEO TITLE KEYWORD DESCRIPTION
$this->pageTitle = Yii::app()->params['description'] = Yii::app()->params['keywords'] =  'HocthiPro - Trang học trực tuyến số 1 Việt Nam - Trang chủ';
 ?>
 <h1 style="display:none">
 	<?php echo Yii::app()->params['keywords']; ?>
 </h1>
<section class="main">
    <section class="hot-news"> 
        <?php include( 'index/blocks/mainContent.php'); ?>
    </section>

    <div class="zone-list"> 
        
        <?php //include( 'index/blocks/home/contentCate__2.php'); ?>
        <?php include( 'index/blocks/home/contentCate.php'); ?>

       
        <?php //include('index/blocks/home/topic.php') ?>
      

    </div> 
</section>
        
<?php include( 'index/blocks/sidebar.php'); ?>
<?php } ?>