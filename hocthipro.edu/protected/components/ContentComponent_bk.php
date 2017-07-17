<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class ContentComponent extends CApplicationComponent
{
	public function getAllMenu(){
		$model = new TblNewscategories;
		$options = array(
				'task'=>'getCategory',
				'taskPublic'=>'public',
				'select'=>'ID,NEWSCATE_NAME,ALIAS,PARENT_CATE',
				'order'=>'ORDER_MENU',
				'by'=>'ASC',
			);
		return $model->getData($options);
	}
	public function getMenu($parent = 0){
		$model = new TblNewscategories;
		$options = array(
				'task'=>'getCategory',
				'taskPublic'=>'public',
				'select'=>'ID,NEWSCATE_NAME,ALIAS,PARENT_CATE',
				'field1'=>'PARENT_CATE',
				'param1'=>$parent,
				'order'=>'ORDER_MENU',
				'by'=>'ASC',
			);
		return $model->getData($options);
	}
	public function getCate($idCate){
		$model = new TblNewscategories;
		$options = array(
				'task'=>'getCategory',
				'select'=>'ID,NEWSCATE_NAME,ALIAS',
				'field1'=>'ID',
				'param1'=>$idCate,
				'queryRow'=>true,
			);
		return $model->getData($options);
	}
	public function divTime(){
		$date             = date('d-m-Y',time());
		$timeInit         = strtotime($date);
		$timeWeek         = $timeInit - (1*7*24*60*60);
		$timeNow          = time();
		
		$data['timeInit'] = $timeInit;
		$data['timeWeek'] = $timeWeek;
		$data['timenow']  = $timeNow;

		return $data;
	}
	public function getContentView($date = false){

		$menuContent = $this->getAllMenu();
		 $arrIdCate = array();
		 if(isset($menuContent) && count($menuContent) > 0){
	        foreach ($menuContent as $key => $value) {
	        	array_push($arrIdCate, $value['ID']);
	        		
	    	}
    	}
		
		$model = new TblNews;
		$options = array(
				'task'=>'getContent',
				'taskPublic'=>'public',
				'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,IMAGE,KEYWORD,CREATED_AT,VIEW_NUMBER',
				'order'=>'VIEW_NUMBER',
				'by'=>'DESC',
				'limit'=>5,
				'inArr'=>'NEWS_CATE_ID',
				'arrParamIn'=>$arrIdCate,
				'field1' =>'CREATED_AT',
				//param1 =>'CREATED_AT',
				'mark1' =>'>=',
				
				'field2' =>'CREATED_AT',
				//param2 =>'CREATED_AT',
				'mark2' =>'<=',
				
			);

		$time = $this->divTime();
		
			if($date){
				//lay du lieu theo tuan
				$options['param1'] = $time['timeWeek'];
				$options['param2'] = $time['timeInit'];	
			}else{
				//lay du lieu trong ngay
				$options['param1'] = $time['timeInit'];	
				$options['param2'] = $time['timenow'];
			}
		
		return  $model->getData($options);
		//echo '<pre>';print_r($result);

	}
	public function getContentCate($idCate,$notInId = [],$limit = false){
		$model = new TblNews;
		$options = array(
				'task'=>'getContent',
				'taskPublic'=>'public',
				'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,IMAGE,KEYWORD,CREATED_AT',
				'order'=>'ID',
				'by'=>'ASC',
				'field1'=>'NEWS_CATE_ID',
				'param1'=>$idCate,
			);
		if($notInId){
			$options['notIn'] ='ID';
			$options['arrParamNotIn'] =$notInId;
		}
		if($limit){
			$options['limit'] = $limit;
			$options['offset'] = 0;
		}
		//echo '<pre>';print_r($options);
		return $model->getData($options);
	}
	public function getContentCateFull($idCate,$notInId = [],$limit = false){
		$menuChild = Yii::app()->contentComponent->getMenu($idCate);

		$arrIdCate = [];
		if(isset($idCate) && !empty($idCate)){
			array_push($arrIdCate, $idCate);
			if(isset($menuChild) && count($menuChild) > 0){
				foreach ($menuChild as $key => $value) {
					array_push($arrIdCate, $value['ID']);
				}
			}
		}

		$model = new TblNews;
		$options = array(
				'task'=>'getContent',
				'taskPublic'=>'public',
				'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,IMAGE,KEYWORD,CREATED_AT,NEWS_CATE_ID',
				'order'=>'ID',
				'by'=>'DESC',
				//'field1'=>'NEWS_CATE_ID',
				//'param1'=>$idCate,
				'inArr'=>'NEWS_CATE_ID',
				'arrParamIn'=>$arrIdCate,
			);
		if($notInId){
			$options['notIn'] ='ID';
			$options['arrParamNotIn'] =$notInId;
		}
		if($limit){
			$options['limit'] = $limit;
			$options['offset'] = 0;
		}
		//echo '<pre>';print_r($options);
		return $model->getData($options);
	}
	public function getVideo($limit = 5,$notInId =[]){
		$model = new TblVideo;
		$options = array(
				'task'=>'getVideo',
				'taskPublic'=>'public',
				'select'=>'ID,TITLE,ALIAS,LINK,IMAGE,CREATED_AT',
				'order'=>'ID',
				'by'=>'DESC',
				'field1'=>'TYLE_VIDEO',
				'param1'=>"video-youtube",
				'notIn'=>'ID',
				'arrParamNotIn'=>$notInId,
				'limit'=>$limit,
			);
		return $model->getData($options);
	}
	public function contentHot(){
		$model = new TblNews;
		
        $options = array(
			'task'=>'getContent',
			'taskPublic'=>'public',
			'select'=>'ID,TITLE,ALIAS,NEWS_CATE_ID,CREATED_AT,CONTENT_SHORT,IMAGE',
			'field1'=>'HOT',
			'param1'=>1,
			'order'=>'HOT_UPDATED_AT',
			'by'=>'DESC',
		);

		return  $model->getData($options);	
	}
	
}


