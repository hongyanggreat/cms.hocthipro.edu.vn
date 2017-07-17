<?php 
	if(Yii::app()->helper->checkDevice()){
	// Phien ban mobile	
		include( 'blocksMobile/contentDetail.php');
	}else{
	// Phien ban desktop	
 ?>
	<section class="main">
	    	<?php include( 'blocks/home/contentCate.php'); ?>
	</section>
	        
	<?php include( 'blocks/sidebar.php'); ?>
<?php } ?>
