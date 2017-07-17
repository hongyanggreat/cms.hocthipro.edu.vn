<?php


class TblNewscategories extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return TblNewscategories the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_newscategories';
	}

	
	public function getData($options){
		$model = Yii::app()->db->createCommand()->from($this->tableName());
		
		$select = "ID";
		if(isset($options['select'])){
			$select = $options['select'];
		}
		$model->select($select);
		if($options['task'] =='getCategory'){
			
			if(isset($options['taskPublic']) && $options['taskPublic'] == "public"){

				$query = array('and', 'NEWS_CATE_IS_PUBLIC=1','NEWSCATE_IS_DELETE=0');
			}else{
				$query = array('and','ID != 0','NEWSCATE_IS_DELETE != 10');
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
			$model->where($query);

			if(isset($options['random']) && $options['random'] == 1){
				$model->order(array('RAND()'));
			}
			if(isset($options['order'])){
				$model->order($options['order']." ".$options['by']);
			}
			if(isset($options['limit'])){
				$model->limit($options['limit']);
			}	
		}
		
		if(isset($options['queryRow']) && $options['queryRow']){
			return $model->queryRow();
		}else{
			return $model->queryAll();
		}
	}	
	
	public function getByPk($options){
		$model = Yii::app()->db->createCommand()
				->from($this->tableName());
		$model->select('ID, NEWSCATE_NAME, ALIAS');
		
		$query = array('and');

		if(isset($options['task']) && $options['task'] == "unPublic"){
			$query[] = 'NEWS_CATE_IS_PUBLIC=1';
			$query[] = 'NEWSCATE_IS_DELETE=0';
		}	
		if(isset($options['select'])){
			$model->select($options['select']);
		}
		if(isset($options['field'])){
			$query[] = $options['field'].' = "'.$options['param'].'"';
			if(isset($options['field2'])){
				$query[] = $options['field2'].' = "'.$options['param2'].'"';
				if(isset($options['field3'])){
					$query[] = $options['field3'].' = "'.$options['param3'].'"';
					if(isset($options['field4'])){
						$query[] = $options['field4'].' = "'.$options['param4'].'"';
					}
				}
			}
		}
		$model->where($query);

		
		
		return $model->queryRow();
	}
}