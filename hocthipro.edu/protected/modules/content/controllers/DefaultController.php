<?php

class DefaultController extends Controller
{
	
	public function actionIndex()
	{	

		//echo 'tets';
		//die;

			$arrIdCate   = [];
			$arrExcept   = [];
			$arrKeyword  = [];
			$contentCate = [];
		 
		 $menuContent = Yii::app()->contentComponent->getAllMenu();
		 if(isset($menuContent) && count($menuContent) > 0){
	        foreach ($menuContent as $key => $value) {
	        	array_push($arrIdCate, $value['ID']);
	        		
	    	}
    	}
		
		//Get content top :TOP_HOT = 1
		$modelNew = new TblArticles;
		

        $options = [
	        	'task'=>'public',
				'select'=>'ID,TITLE,CONTENT_SHORT,ALIAS,CATE_ID,CREATED_AT,TAG,IMAGE,TOP_HOT,VIEW_NUMBER',
				'field'=>'TOP_HOT',
				'param'=>1,
				'order'=>'UPDATE_TOPHOT',
				'by'=>'DESC',
				'inArr'=>'CATE_ID',
				'arrParamIn'=>$arrIdCate,
				'limit'=>5
			];
		$topNews = $modelNew->getData($options);
		
		//echo '<pre>';print_r($topNews);
		//die;
	     //get id top content
		if(isset($topNews) && count($topNews) > 0){
	        foreach ($topNews as $key => $value) {
	        	array_push($arrExcept, $value['ID']);
	        	if($value['TAG']!=""){
					array_push($arrKeyword, $value['TAG']);
				}	
	    	}
    	}
		//Get content hot 
        $options = [
					'task'          =>'public',
					'select'        =>'ID,TITLE,CONTENT_SHORT,ALIAS,CATE_ID,CREATED_AT,UPDATE_TOPHOT,TAG,IMAGE,VIEW_NUMBER',
					'field'         =>'TOP_HOT',
					'param'         =>2,
					'notIn'         =>'ID',
					'arrParamNotIn' =>$arrExcept,
					'order'         =>'UPDATE_TOPHOT',
					'by'            =>'DESC',
					'inArr'         =>'CATE_ID',
					'arrParamIn'    =>$arrIdCate,
					'limit'         =>5
        		];

		$hotNews = $modelNew->getData($options);	
		
    	//get id hot content
    	if(isset($hotNews) && count($hotNews) > 0){
	    	foreach ($hotNews as $key => $value) {
	    		if(!in_array($value['ID'], $arrExcept)){
	        		array_push($arrExcept, $value['ID']);
	        		if($value['TAG']!="" && !in_array($value['TAG'], $arrKeyword)){
						array_push($arrKeyword, $value['TAG']);
					}
	    		}
	    	}
    	}
    	
   		
		//Get content new 
		$options = array(
				'task'          =>'public',
				'select'        =>'ID,TITLE,CONTENT_SHORT,ALIAS,CATE_ID,CREATED_AT,UPDATE_TOPHOT,TAG,IMAGE,VIEW_NUMBER',
				'notIn'         =>'ID',
				'arrParamNotIn' =>$arrExcept,
				'order'         =>'CREATED_AT',
				'by'            =>'DESC',
				'inArr'         =>'CATE_ID',
				'arrParamIn'    =>$arrIdCate,
				'limit'         =>5,
			);
		$newsContent = $modelNew->getData($options);
		
	    if(isset($newsContent) && count($newsContent) > 0){
		    foreach ($newsContent as $key => $value) {
	    		if(!in_array($value['ID'], $arrExcept)){
	        		array_push($arrExcept, $value['ID']);
	    		}
        		if($value['TAG']!="" && !in_array($value['TAG'], $arrKeyword)){
					array_push($arrKeyword, $value['TAG']);
				}
	    	}
	    }
		 
     	//get content of cate
		$menuContent = Yii::app()->contentComponent->getMenu();
		
    	if(isset($menuContent) && count($menuContent) > 0){
    		$arrCateId = [];
			 $arrExcept = array();
		     foreach ($menuContent as $key => $value) {
				$resultContentCate['cate'] =  $value;
				
				//test case empty
	        	$resultContentCate['info'] = Yii::app()->contentComponent->getContentCateFull($value['ID'],$arrExcept,5);
	        	
	        	$contentCate[] = $resultContentCate;
		     }
	    }

   		 
	     //now,we using keyword from top-hot-new content
	     //check isset session arrKeyword
		$arrKeyword = implode(',', $arrKeyword);
		$arrKeyword = explode(',', $arrKeyword);

		
		$data = [
					'topNews'   => $topNews,
					'hotNews'    => $hotNews,
					'newsContent' => $newsContent,
					'contentCate' => $contentCate,
					'arrKeyword'  => $arrKeyword,
				];
	
		/*echo '<pre>';
		print_r($newsContent);
		die;*/
		$this->render('index',$data);
	}
}