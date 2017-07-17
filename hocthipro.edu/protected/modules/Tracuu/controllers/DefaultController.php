<?php

class DefaultController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
		
	}
	public function actionBenchMark(){

		$alias =  Yii::app()->request->requestUri;
		preg_match('/\-htp([A-Z]+)\-/', $alias, $code);
		preg_match('/\-n([0-9]+)\./', $alias, $year);
		if(isset($code[1]) && isset($year[1])){

			$model = new TblBenchmark;
			$options = [
						'task'   =>'public',
						'select' =>'CODE_SCHOOL,CAREER ,EXAM_BLOCK, BRENCHMARK,YEAR,GENDER,NOTE',
						'field'  =>'CODE_SCHOOL',
						'param'  =>$code[1],
						'field1' =>'YEAR',
						'param1' =>$year[1],
						'order'  =>'EXAM_BLOCK',
						'by'     =>'ASC',
					];
			
			$result = $model->getData($options);
			//echo '<pre>';
			$model = new TblUniversities;
			$options = [
						'task'     =>'public',
						'select'   =>'CODE, NAME',
						'field'    =>'CODE',
						'param'    =>$code[1],
						'queryRow' =>true,
					];	
			$school = $model->getData($options);
			$data = [
						'info'   =>$result,
						'year'   =>$year[1],
						'school' =>$school,
					];
			$this->render('benchMark',$data);
			
		}else{
			$link = Yii::app()->getRequest()->getHostInfo().'/diem-chuan.html';
			$this->redirect($link);
		}
	}
	public function actionBenchMarks(){
		$alias =  Yii::app()->request->requestUri;
		preg_match('/\-htp([A-Z0-9]+)\-/', $alias, $code);
		preg_match('/\-n([0-9]+)\./', $alias, $year);
		
		if(isset($code[1]) && isset($year[1])){
			$model = new TblBenchmarks;
			$options = [
						'task'   =>'public',
						'select' =>'CODE_SCHOOL,BRANCH_CODE, BRANCH_NAME ,EXAM_BLOCK, BRENCHMARK,YEAR,NOTE',
						'field'  =>'CODE_SCHOOL',
						'param'  =>$code[1],
						'field1' =>'YEAR',
						'param1' =>$year[1],
						'order'  =>'EXAM_BLOCK',
						'by'     =>'ASC',
					];
			
			$result = $model->getData($options);
			
			$model = new TblUniversities;
			$options = [
						'task'     =>'public',
						'select'   =>'CODE, NAME',
						'field'    =>'CODE',
						'param'    =>$code[1],
						'queryRow' =>true,
					];	
			$school = $model->getData($options);
			$data = [
						'info'   =>$result,
						'year'   =>$year[1],
						'school' =>$school,
					];
			$this->render('benchMarks',$data);
			
		}else{
			$link = Yii::app()->getRequest()->getHostInfo().'/diem-chuan.html';
			$this->redirect($link);
		}
	}
}