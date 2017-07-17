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
 ?>