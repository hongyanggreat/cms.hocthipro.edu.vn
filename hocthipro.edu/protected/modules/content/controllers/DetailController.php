
<?php
class DetailController extends Controller
{
	public function actionIndex()
	{	

		/*$xml=simplexml_load_file("E:\Web\PHP_ROOT\dev.hocthi.edu/note.xml");
		echo '<pre>';print_r($xml);
		die;*/
		
		$flash     = true;
		$alias = str_replace(".html","",Yii::app()->uri->segment(2));
		
		$model = new TblArticles;

		$options = array(
				'task'=>'public',
				'select'=>'ID,TITLE,ALIAS,STATUS,CATE_ID,CONTENT_SHORT,CONTENT_FULL,TAG,VIEW_NUMBER,IMAGE,CREATED_AT,META_KEYWORD',
				'field'=>'ALIAS',
				'param'=>$alias,
				'field1'=>'STATUS',
				'param1'=>1,
				'queryRow'=>true,
				
			);
		
		$contentCate =  $model->getData($options);
		//echo '<pre>';print_r($contentCate);
		//die;
		if(isset($contentCate) && !empty($contentCate)){
			$alias = str_replace(".html","",Yii::app()->uri->segment(1));
			$modelCate = new TblCategories;

			$options = array(
					'task'=>'public',
					'select'=>'ID,NAME,ALIAS',
					'field1'=>'ALIAS',
					'param1'=>$alias,
					'queryRow'=>true,
					
				);
			
			$cate =  $modelCate->getData($options);
		
			if(isset($cate) && !empty($cate)){

				$limit = 5;
		        $notInId = array($contentCate['ID']);
				$options = array(
						'task'=>'public',
						'select'=>'ID,TITLE,ALIAS,CATE_ID,IMAGE,TAG,CONTENT_SHORT',
						'field1'=>'CATE_ID',
						'param1'=>$cate['ID'],
						'notIn'=>'ID',
						'arrParamNotIn'=>$notInId,
						'limit'=>$limit,
					);
				
				$contentMore =  $model->getData($options);
				
			}else{
				$flash     = false;
				 $message = "không thuộc danh mục nào,hoặc danh mục chưa được kích hoạt";
			}
			
		}else{
			$flash     = false;
			 $message = "không tồn tại";
		}
		if($flash){
			$view               = $contentCate['VIEW_NUMBER'] + 1;
			$model              = TblArticles::model()->findByPk($contentCate['ID']);
			$model->VIEW_NUMBER = $view;	
			$result = $model->save();
			/*echo '<pre>';print_r($contentCate);
			die;*/
			$data = array(
					'contentCate' =>$contentCate,
					'cate'        =>$cate,
					'contentMore' =>$contentMore,
					'contentHot'=>yii::app()->contentComponent->contentHot(),
				);
			$this->render('index',$data);

		}else{
			$data = [
				'message'=>$message,
				'alias'=>$alias,
				];
			$this->render('error',$data);		
		}
	}
}