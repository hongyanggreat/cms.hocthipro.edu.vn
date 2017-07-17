<?php 
	if(Yii::app()->helper->checkDevice()){
	// Phien ban mobile	
		include( 'indexMobile/mainContent.php');
	}else{
	// Phien ban desktop	
 ?>
	<section class="main">
	    	<?php 
	    		//include( 'index/blocks/home/contentCate___.php'); 
	    		include( 'index/blocks/home/contentCateNew.php'); 
	    	?>
	</section>
	        
	<?php include( 'index/blocks/sidebar.php'); ?>
<?php } ?>
