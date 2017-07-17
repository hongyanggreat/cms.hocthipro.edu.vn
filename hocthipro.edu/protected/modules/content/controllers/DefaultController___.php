<?php

class DefaultController extends Controller
{
	public function actionHotContent(){

		$modelNew = new TblNews;
		
		$arrExcept = array();
		$arrKeyword = array();
    	
		//Get content hot 
		$hotNews = Yii::app()->session['hotNews'];
		//print_r($hotNews);
        // unset(Yii::app()->session['hotNews']);
	     if(!$hotNews){
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
	        Yii::app()->session['hotNews'] = $hotNews;
	     }
		
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
	     	 //	echo '<pre>';print_r($arrExcept);
		$options = array(
				'task'=>'getContent',
				'taskPublic'=>'public',
				'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,HOT_UPDATED_AT,KEYWORD,IMAGE',
				'notIn'=>'ID',
				'arrParamNotIn'=>$arrExcept,
				'order'=>'CREATED_AT',
				'by'=>'ASC',
				'limit'=>10,
			);
		$newsContent = $modelNew->getData($options);
	/*	echo '<pre>';
		print_r($newContent);*/
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

		$topNews = Yii::app()->session['topNews'];
        // unset(Yii::app()->session['topNews']);
	     if(!$topNews){

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
	        Yii::app()->session['topNews'] = $topNews;
	     }

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
		$hotNews = Yii::app()->session['hotNews'];
		//print_r($hotNews);
        // unset(Yii::app()->session['hotNews']);
	     if(!$hotNews){
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
	        Yii::app()->session['hotNews'] = $hotNews;
	     }
		
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
	     	 //	echo '<pre>';print_r($arrExcept);
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
		//Get content top 
		$modelNew = new TblNews;
		
		$arrExcept = array();
		$arrKeyword = array();

		$topNews = Yii::app()->session['topNews'];
        // unset(Yii::app()->session['topNews']);
	     if(!$topNews){

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
	        Yii::app()->session['topNews'] = $topNews;
	     }
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
		$hotNews = Yii::app()->session['hotNews'];
		//print_r($hotNews);
        // unset(Yii::app()->session['hotNews']);
	     if(!$hotNews){
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
	        Yii::app()->session['hotNews'] = $hotNews;
	     }
		
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
		$newsContent = Yii::app()->session['newsContent'];
        // unset(Yii::app()->session['hotNews']);
	    if(!$newsContent){
	     	 //	echo '<pre>';print_r($arrExcept);
			$options = array(
					'task'=>'getContent',
					'taskPublic'=>'public',
					'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,HOT_UPDATED_AT,KEYWORD,IMAGE',
					'notIn'=>'ID',
					'arrParamNotIn'=>$arrExcept,
					'order'=>'CREATED_AT',
					'by'=>'DESC',
					'limit'=>'6',
				);
			$newsContent = $modelNew->getData($options);
			Yii::app()->session['newsContent'] = $newsContent;
	    }
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
		
	     //check isset session content cate
	     //if not exits -- access to db
	     $contentCate = Yii::app()->session['contentCate'];
        // unset(Yii::app()->session['contentCate']);
	     if(!$contentCate){
	     	//get content of cate
			$menuContent = Yii::app()->session['menuContent'];
	        // unset(Yii::app()->session['menuContent']);
		    if(!$menuContent){
		        $menuContent = Yii::app()->contentComponent->getMenu();
		        Yii::app()->session['menuContent'] = $menuContent;
		    }
	    	if(isset($menuContent) && count($menuContent) > 0){
			     foreach ($menuContent as $key => $value) {

					$resultContentCate['cate'] =  $value;
					//test case empty
					//$arrExcept = array();
		        	$resultContentCate['info'] = Yii::app()->contentComponent->getContentCate($value['ID'],$arrExcept,5);
		        	
		        	$contentCate[] = $resultContentCate;
			     }
		        Yii::app()->session['contentCate'] = $contentCate;
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