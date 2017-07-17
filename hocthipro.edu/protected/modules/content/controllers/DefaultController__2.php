<?php

class DefaultController extends Controller
{
	public function actionHotContent(){
		$modelNew = new TblNews;
		
		$arrExcept = array();
		$arrKeyword = array();
    	
		//Get content hot 
        $options = array(
			'task'=>'getContent',
			'taskPublic'=>'public',
			'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,HOT_UPDATED_AT,KEYWORD,IMAGE',
			'field1'=>'HOT',
			'param1'=>1,
			'notIn'=>'ID',
			'arrParamNotIn'=>$arrExcept,
			'order'=>'HOT_UPDATED_AT',
			'by'=>'DESC',
		);

		$hotNews = $modelNew->getData($options);	
		
    	//get id hot content
    	if(isset($hotNews) && count($hotNews) > 0){
	    	foreach ($hotNews as $key => $value) {
	    		if(!in_array($value['ID'], $arrExcept)){
	        		array_push($arrExcept, $value['ID']);
	        		if($value['KEYWORD']!="" && !in_array($value['KEYWORD'], $arrKeyword)){
						array_push($arrKeyword, $value['KEYWORD']);
					}
	    		}
	    	}
    	}
    	$arrKeyword = implode(',', $arrKeyword);
		$arrKeyword = explode(',', $arrKeyword);
		//Get content new 
		$options = array(
				'task'=>'getContent',
				'taskPublic'=>'public',
				'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,HOT_UPDATED_AT,KEYWORD,IMAGE,VIEW_NUMBER',
				'notIn'=>'ID',
				'arrParamNotIn'=>$arrExcept,
				'order'=>'VIEW_NUMBER',
				'by'=>'DESC',
				'limit'=>10,
			);
		$newsContent = $modelNew->getData($options);
		/*echo '<pre>';
		print_r($newsContent);
		die;*/
		$contentCate = array();
		$topNews = array();
		$data = array(
				'mainContent'   => $hotNews,
				
				'titleTopContent'   => "Bài viết Top",
				'topContent'    => $topNews,

				'titleBottomContent'   => "Bài viết Được quan tâm",
				'bottomContent' => $newsContent,
				
				'contentCate' => $contentCate,
				'arrKeyword'  => $arrKeyword,
			);
		$this->render('index',$data);
	}



	public function actionNewContent(){

		$modelNew = new TblNews;
		
		$arrExcept = array();
		$arrKeyword = array();

        // unset(Yii::app()->session['topNews']);

        $options = array(
			'task'=>'getContent',
			'taskPublic'=>'public',
			'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,TOP_UPDATED_AT,KEYWORD,IMAGE',
			'field1'=>'TOP',
			'param1'=>1,
			'order'=>'TOP_UPDATED_AT',
			'by'=>'DESC',
		);
		$topNews = $modelNew->getData($options);	

	     //get id top content
		if(isset($topNews) && count($topNews) > 0){
	        foreach ($topNews as $key => $value) {
	        	array_push($arrExcept, $value['ID']);
	        	if($value['KEYWORD']!=""){
					array_push($arrKeyword, $value['KEYWORD']);
				}	
	    	}
    	}
    	
		//Get content hot 
        $options = array(
			'task'=>'getContent',
			'taskPublic'=>'public',
			'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,HOT_UPDATED_AT,KEYWORD,IMAGE',
			'field1'=>'HOT',
			'param1'=>1,
			'notIn'=>'ID',
			'arrParamNotIn'=>$arrExcept,
			'order'=>'HOT_UPDATED_AT',
			'by'=>'DESC',
		);

		$hotNews = $modelNew->getData($options);	
		
    	//get id hot content
    	if(isset($hotNews) && count($hotNews) > 0){
	    	foreach ($hotNews as $key => $value) {
	    		if(!in_array($value['ID'], $arrExcept)){
	        		array_push($arrExcept, $value['ID']);
	        		if($value['KEYWORD']!="" && !in_array($value['KEYWORD'], $arrKeyword)){
						array_push($arrKeyword, $value['KEYWORD']);
					}
	    		}
	    	}
    	}
    	$arrKeyword = implode(',', $arrKeyword);
		$arrKeyword = explode(',', $arrKeyword);
   		
		//Get content new 
		$options = array(
				'task'=>'getContent',
				'taskPublic'=>'public',
				'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,HOT_UPDATED_AT,KEYWORD,IMAGE',
				'notIn'=>'ID',
				'arrParamNotIn'=>$arrExcept,
				'order'=>'CREATED_AT',
				'by'=>'DESC',
				'limit'=>7,
			);
		$newsContent = $modelNew->getData($options);
	/*	echo '<pre>';
		print_r($newContent);*/
		$contentCate = array();
		$data = array(
				'mainContent'   => $newsContent,
				'titleTopContent'   => "Bài viết Top",
				'topContent'    => $topNews,
				'titleBottomContent'   => "Bài viết Hot",
				'bottomContent' => $hotNews,
				'contentCate' => $contentCate,
				'arrKeyword'  => $arrKeyword,
			);
		$this->render('index',$data);
	}
	public function actionIndex()
	{	

		
		 $menuContent = Yii::app()->contentComponent->getMenu();
		 $arrIdCate = array();
		 if(isset($menuContent) && count($menuContent) > 0){
	        foreach ($menuContent as $key => $value) {
	        	array_push($arrIdCate, $value['ID']);
	        		
	    	}
    	}
		
		//Get content top 
		$modelNew = new TblNews;
		
		$arrExcept = array();
		$arrKeyword = array();
		$contentCate = array();

        $options = array(
			'task'=>'getContent',
			'taskPublic'=>'public',
			'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,TOP_UPDATED_AT,KEYWORD,IMAGE',
			'field1'=>'TOP',
			'param1'=>1,
			'order'=>'TOP_UPDATED_AT',
			'by'=>'DESC',
			'inArr'=>'NEWS_CATE_ID',
			'arrParamIn'=>$arrIdCate,
		);
		$topNews = $modelNew->getData($options);	
		//echo '<pre>';print_r($topNews);
		//die;
	     //get id top content
		if(isset($topNews) && count($topNews) > 0){
	        foreach ($topNews as $key => $value) {
	        	array_push($arrExcept, $value['ID']);
	        	if($value['KEYWORD']!=""){
					array_push($arrKeyword, $value['KEYWORD']);
				}	
	    	}
    	}
		
		//Get content hot 
        $options = array(
			'task'=>'getContent',
			'taskPublic'=>'public',
			'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,HOT_UPDATED_AT,KEYWORD,IMAGE',
			'field1'=>'HOT',
			'param1'=>1,
			'notIn'=>'ID',
			'arrParamNotIn'=>$arrExcept,
			'order'=>'HOT_UPDATED_AT',
			'by'=>'DESC',
			'inArr'=>'NEWS_CATE_ID',
			'arrParamIn'=>$arrIdCate,
		);

		$hotNews = $modelNew->getData($options);	
		
    	//get id hot content
    	if(isset($hotNews) && count($hotNews) > 0){
	    	foreach ($hotNews as $key => $value) {
	    		if(!in_array($value['ID'], $arrExcept)){
	        		array_push($arrExcept, $value['ID']);
	        		if($value['KEYWORD']!="" && !in_array($value['KEYWORD'], $arrKeyword)){
						array_push($arrKeyword, $value['KEYWORD']);
					}
	    		}
	    	}
    	}
    	
   		
		//Get content new 
		$options = array(
				'task'=>'getContent',
				'taskPublic'=>'public',
				'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,HOT_UPDATED_AT,KEYWORD,IMAGE',
				'notIn'=>'ID',
				'arrParamNotIn'=>$arrExcept,
				'order'=>'CREATED_AT',
				'by'=>'DESC',
				'limit'=>'6',
				'inArr'=>'NEWS_CATE_ID',
				'arrParamIn'=>$arrIdCate,
			);
		$newsContent = $modelNew->getData($options);
		
	    if(isset($newsContent) && count($newsContent) > 0){
		    foreach ($newsContent as $key => $value) {
	    		if(!in_array($value['ID'], $arrExcept)){
	        		array_push($arrExcept, $value['ID']);
	    		}
        		if($value['KEYWORD']!="" && !in_array($value['KEYWORD'], $arrKeyword)){
					array_push($arrKeyword, $value['KEYWORD']);
				}
	    	}
	    }
		
     	//get content of cate
        $menuContent = Yii::app()->contentComponent->getMenu();
		
        Yii::app()->session['menuContent'] = $menuContent;
    	if(isset($menuContent) && count($menuContent) > 0){
		     foreach ($menuContent as $key => $value) {

				$resultContentCate['cate'] =  $value;
				//test case empty
				//$arrExcept = array();
	        	$resultContentCate['info'] = Yii::app()->contentComponent->getContentCate($value['ID'],$arrExcept,5);
	        	
	        	$contentCate[] = $resultContentCate;
		     }
	    }
		
	     //now,we using keyword from top-hot-new content
	     //check isset session arrKeyword
		$arrKeyword = implode(',', $arrKeyword);
		$arrKeyword = explode(',', $arrKeyword);
	      /*$arrKeyword = Yii::app()->session['arrKeywordSession'];
	      if(!$arrKeyword){
	     	

	     	Yii::app()->session['arrKeywordSession'] = $arrKeyword;
	      }*/
		  	/*print_r($topNews);
			print_r($hotNews);
			print_r($newsContent);
			print_r($menuContent);
			print_r($contentCate);
        	die;*/
		$data = array(
				'mainContent'   => $topNews,
				'titleTopContent'   => "Bài viết Hot",
				'topContent'    => $hotNews,
				'titleBottomContent'   => "Bài viết Mới",
				'bottomContent' => $newsContent,
				'contentCate' => $contentCate,
				'arrKeyword'  => $arrKeyword,
			);
		$this->render('index',$data);
	}
}