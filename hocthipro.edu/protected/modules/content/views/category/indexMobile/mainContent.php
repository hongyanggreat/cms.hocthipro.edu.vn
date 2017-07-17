<?php 	
	$cateParentName = $cate['NAME'];
	$cateParent = $cate['PARENT'];
?>
<div class="breadcrumb">
    <div class="site-wrap">
        <div class="cate" itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb">
            <a itemprop="url" ><span itemprop="title"><?php echo $cateParentName;  ?></span></a>
        </div>
        <div class="sub" itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb">
        </div>
    </div>
</div>

<div class="article-list category">
	<!-- //========================================== -->

	<?php 

		foreach ($news as $key => $value) {
   			include('article.php');
	
	} ?>

	<!-- //========================================== -->
	<?php 

		foreach ($hotnews as $key => $value) {
			include('article.php');
		} ?>

	
	<!-- //========================================== -->

	<?php 
		foreach ($contentCate as $key => $value) {
		
	 		include('article.php');
	 } ?>
   
    
</div>
