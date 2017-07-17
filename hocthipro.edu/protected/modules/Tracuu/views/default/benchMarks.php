

<?php 
//META SEO TITLE KEYWORD DESCRIPTION
$this->pageTitle = Yii::app()->params['description'] = Yii::app()->params['keywords'] =  'HocthiPro - Trang học trực tuyến online số 1 Việt Nam - Trang chủ';
 ?>
<section class="main">
    <section class="hot-news"> 
        <?php include( 'benchMarks/blocks/mainContent.php'); ?>
    </section>
</section>
        
<?php 
    if(!Yii::app()->helper->checkDevice()){
        // Phien ban desktop 
        include( 'benchMarks/blocks/sidebar.php');
    }
 ?>