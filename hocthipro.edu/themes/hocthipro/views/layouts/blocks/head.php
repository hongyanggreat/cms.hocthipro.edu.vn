<?php
    $baseUrl = Yii::app()->getRequest()->getHostInfo();
    $link = Yii::app()->request->requestUri;
    $linkUrl = $baseUrl.$link ;
    $icon = Yii::app()->request->baseUrl."/assets/hocthipro/images/favicon.ico";
    $title = $this->pageTitle;
    $checkImage = Yii::app()->params['metaImage'];
    $image = Yii::app()->params['media']."/logo.png";
    if(isset($checkImage) && !empty($checkImage)){
         $image = $checkImage ;
    }
    $checkDescription = Yii::app()->params['description'];
    $description = 'Học trực tuyến,trắc nghiệm trực tuyến,tin tức học đường,bí quyết thi cử';
    if(isset($checkDescription) && !empty($checkDescription)){
         $description = $checkDescription ;
    }
    $checkKeywords= Yii::app()->params['keywords'];
    $keywords = 'Học trực tuyến,trắc nghiệm trực tuyến,tin tức học đường,bí quyết thi cử';
    if(isset($checkKeywords) && !empty($checkKeywords)){
         $keywords = $checkKeywords ;
    }

        //kiem tra thiet bi truy cap la mobile | android | ios thi se xu ly 
    $checkDevice = Yii::app()->helper->checkDevice();
    $useragent=$_SERVER['HTTP_USER_AGENT'];
    if($checkDevice){

       echo  $mLinkUrl = 'http://dev.hocthipro.vn';
        //$this->redirect($mLinkUrl.$link) ;  
    }
    $myStyle = '?v=1.8.8';
    $myScript = '?v=1.0.3';
    $mySelect2 = '?v=1.0.0';
 ?>

<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="vi" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8" lang="vi" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9" lang="vi" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" xmlns="http://www.w3.org/1999/xhtml">
<!--<![endif]-->
<head>
    


    <title><?php echo $title; ?></title>
    
    <meta charset="UTF-8"/>
    <meta http-equiv="content-language" content="vi" />
    <!-- // Chua can thiet phai dung -->
   <!--  <link rel="alternate" href="<?php //echo $linkUrl ?>" hreflang="vi-vn" /> -->
    <link rel="alternate" href="<?php echo $linkUrl ?>" hreflang="x-default" />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta itemprop="name" content="<?php echo $title; ?>"/>
    <meta name="revisit-after" content="1 days" />
    <meta name="robots" content="noodp"/>
   <!--  <meta name="robots" content="INDEX,FOLLOW"/> -->
    

    <!-- //FB -->
    <meta property="fb:app_id" content="931253177010717" />
    <meta property="fb:pages" content="384037201972945" />

    <meta property="og:type" content="article"/>
    <meta property="og:title" content="<?php echo $title; ?>"/>
    <meta property="og:description" content="<?php echo $description; ?>"/>
    <meta property="og:image" content="<?php echo $image; ?>"/>
    <meta property="og:url" content="<?php echo $linkUrl; ?>"/>
    <!-- //FB -->



    <?php echo isset(Yii::app()->params['setMetaRefresh']) ? Yii::app()->params['setMetaRefresh']:''; ?>
    <meta name="copyright" content="Copyright © 2016 by <?php echo $baseUrl ?>" />

    <link href="<?php echo $icon ?>" rel="shortcut icon"/>
    
    <meta name="description" content="<?php echo $description;  ?>"/>
   
    <meta name="keywords" content="<?php echo $keywords;  ?>"/>

<link href="<?php echo Yii::app()->getBaseUrl() ?>/assets/select2/css/select2.min.css" rel="stylesheet" />

<link rel="stylesheet" href="<?php echo Yii::app()->getBaseUrl() ?>/assets/hocthipro/css/myStyle.css<?php echo $myStyle ?>"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->getBaseUrl() ?>/assets/hocthipro/js/hocthi.min.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->getBaseUrl() ?>/assets/hocthipro/js/myScript.js<?php echo $myScript ?>"></script>



<script src="<?php echo Yii::app()->getBaseUrl() ?>/assets/select2/js/select2.min.js"></script>
<script src="<?php echo Yii::app()->getBaseUrl() ?>/assets/select2/mySelect2.js<?php echo $mySelect2 ?>"></script>

<style>
    #site-header {
        z-index: 9999999 !important;
    }
</style>


</head>
<script src="https://apis.google.com/js/platform.js" async defer>
  {lang: 'vi'}
</script>
<div id="fb-root"></div>
<script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.8&appId=931253177010717";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>


<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "WebSite",
  "url": "<?php echo $baseUrl ?>",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "<?php echo $baseUrl ?>/tim-kiem/{search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>