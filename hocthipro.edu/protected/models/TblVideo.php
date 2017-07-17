<?php


class TblVideo extends CActiveRecord
{
	
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_video';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function getData($options){
		$model = Yii::app()->db->createCommand()
				->from($this->tableName());
		
		$select = "ID";
		if(isset($options['select'])){
			$select = $options['select'];
		}
		$model->select($select);
			
		if(isset($options['task']) && $options['task'] == "public"){
			if(isset($options['field'])){
				$query = array('and');
			}else{
				$query = array('and', 'ID != 0','STATUS=1');
			}
		}else{
			if(isset($options['field'])){
				$query = array('and');
			}else{
				$query = array('and','ID != 0','STATUS != 10');
			}
		}

		if(isset($options['field'])){
			if(isset($options['mark']) && $options['mark'] !=""){
				$mark = $options['mark'];
			}else{
				$mark = "=";
			}
			$query[] = $options['field'].' '.$mark.' "'.$options['param'].'"';
		}
		if(isset($options['field1'])){
			if(isset($options['mark1']) && $options['mark1'] !=""){
				$mark = $options['mark1'];
			}else{
				$mark = "=";
			}
			$query[] = $options['field1'].' '.$mark.' "'.$options['param1'].'"';
		}
		if(isset($options['field2'])){
			if(isset($options['mark2']) && $options['mark2'] !=""){
				$mark = $options['mark2'];
			}else{
				$mark = "=";
			}
			$query[] = $options['field2'].' '.$mark.' "'.$options['param2'].'"';
		}
		if(isset($options['field3'])){
			if(isset($options['mark3']) && $options['mark3'] !=""){
				$mark = $options['mark3'];
			}else{
				$mark = "=";
			}
			$query[] = $options['field3'].' '.$mark.' "'.$options['param3'].'"';
		}
		if(isset($options['field4'])){
			if(isset($options['mark4']) && $options['mark4'] !=""){
				$mark = $options['mark4'];
			}else{
				$mark = "=";
			}
			$query[] = $options['field4'].' '.$mark.' "'.$options['param4'].'"';
		}
		
		if(isset($options['notIn'])){
			if(isset($options['paramNotIn'])){
				$query[] = $options['notIn'].' != '.$options['paramNotIn'];
			}
			if(isset($options['arrParamNotIn'])){
				$query[] = array('not in', $options['notIn'], $options['arrParamNotIn']);
			}
		}
		if(isset($options['inArr'])){
			$query[] = array('in', $options['inArr'], $options['arrParamIn']);
		}

		if(isset($options['like'])){
			$query[] = array('like', $options['like'], "%".$options['arrParamLike']."%");
		}
		if(isset($options['like2'])){
			$query[] = array('like', $options['like2'], "%".$options['arrParamLike2']."%");
		}
		if(isset($options['like3'])){
			$query[] = array('like', $options['like3'], "%".$options['arrParamLike3']."%");
		}

		$model->where($query);

		if(isset($options['random']) && $options['random'] == 1){
			$model->order(array('RAND()'));
		}
		if(isset($options['order'])){
			$model->order($options['order']." ".$options['by']);
		}else{
			$model->order("ID DESC");
		}
		if(isset($options['limit'])){
			if(isset($options['offset'])){
				$offset = $options['offset'];
			}else{
				$offset = 0;
			}
			$model->limit($options['limit'],$offset);
		}
		if(isset($options['queryRow']) && $options['queryRow']){
			return $model->queryRow();
		}else{
			return $model->queryAll();
		}
	}
}