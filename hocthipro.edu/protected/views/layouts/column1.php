<?php /* @var $this Controller */ ?>
<?php //$this->beginContent('//layouts/main'); ?>
<?php 
	if(Yii::app()->helper->checkDevice()){
		$this->beginContent('//layouts/mainMobile');	
	}else{
		$this->beginContent('//layouts/main');
	}
?>
<?php //$this->beginContent('//layouts/mainMobile'); ?>
<div id="content">
	<?php echo $content; ?>
</div><!-- content -->
<?php $this->endContent(); ?>