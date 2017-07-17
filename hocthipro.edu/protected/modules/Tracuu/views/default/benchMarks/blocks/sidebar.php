<style>
	section.sidebar{
		position: relative;
	}
	.fixDiemthi.in {
	    position: fixed;
	    z-index: 99999;
	    top: 10px;
	    width: 300px;
	}
</style>
<section class="sidebar">
    <?php echo $this->renderPartial('//../modules/common/follow'); ?>
    <?php echo $this->renderPartial('//../modules/common/social/boxFacebook'); ?>
    <div class="fixDiemthi">
    	<?php //echo $this->renderPartial('//../modules/common/diemthi'); ?>
    </div>
</section>            