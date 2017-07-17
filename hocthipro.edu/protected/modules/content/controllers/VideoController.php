
<?php
class VideoController extends Controller
{
	public function actionIndex()
	{	
		
		$flash     = true;
		$alias = str_replace(".html","",Yii::app()->uri->segment(2));
		$model = new TblVideo;
		$arrExcept = array();	
		$options = array(
				'task'=>'getVideo',
				'taskPublic'=>'public',
				'select'=>'*',
				'field1'=>'ALIAS',
				'param1'=>$alias,
				'queryRow'=>true,
			);
		
		$contentVideo =  $model->getData($options);

		if(isset($contentVideo) && !empty($contentVideo)){
			//echo '<pre>';print_r($contentVideo);
	    	array_push($arrExcept, $contentVideo['ID']);
	    	$options = array(
				'task'=>'getVideo',
				'taskPublic'=>'public',
				'select'=>'*',
				'notIn'=>"ID",
				'paramNotIn'=>$contentVideo['ID'],
				'limit'=>2,
				'order'=>'ID',
				'by'=>"DESC",
				'field1'=>"ID",
				'mark1'=>">",
				'param1'=>$contentVideo['ID'],

			);
			$contentVideoNext =  $model->getData($options);
			if(isset($contentVideoNext) && empty($contentVideoNext)){
				$options['mark1'] = "<";
				$contentVideoNext =  $model->getData($options);
			}
		}else{
			$flash     = false;
			echo $message = "Không tồn tại video";
		}
		if($flash){
			$view               = $contentVideo['VIEW'] + 1;
			$model              = TblVideo::model()->findByPk($contentVideo['ID']);
			$model->VIEW = $view;	
			$result = $model->save();
			/*echo '<pre>';print_r($contentCate);
			die;*/
			$data = array(
					'contentVideo' =>$contentVideo,
					'contentVideoNext' =>$contentVideoNext,
				);
			$this->render('index',$data);

		}else{
			echo $message;			
		}
	}
}