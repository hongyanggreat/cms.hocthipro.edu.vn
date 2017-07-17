<?php

class DefaultController extends Controller
{
	public function actionIndex()
	{

		//============== SET CACHE FOR PROVINCE

		if(Yii::app()->cache->get('htp_provinces')){
	       $provinces =  Yii::app()->cache->get('htp_provinces');
	       //print_r($provinces);
	       //Yii::app()->cache->delete('htp_provinces');
	    }else{
	       $model = new TblProvince;
	       $options = [
	       				'task'=>'public',
	       				'select'=>'*',
	       				'order'=>'ID',
	       				'by'=>'ASC',
	       				];
	       $provinces = $model->getData($options);
	       Yii::app()->cache->set('htp_provinces',$provinces);
	    }
	    //============== SET CACHE FOR UNIVERCITY

		if(Yii::app()->cache->get('htp_University')){
	       $universities =  Yii::app()->cache->get('htp_University');
	      // Yii::app()->cache->delete('htp_University');
	    }else{
	       $model = new TblUniversities;
	       $options = [
	       				'task'=>'public',
	       				'select'=>'ID,CODE, NAME, NAME_ASCII, REGION, STATUS, EXAM_BLOCK, TYPE,ADDRESS',
	       				'order'=>'TYPE',
	       				'by'=>'DESC',
	       				];
	       $universities = $model->getData($options);
	       Yii::app()->cache->set('htp_University',$universities);
	    }


	}
}