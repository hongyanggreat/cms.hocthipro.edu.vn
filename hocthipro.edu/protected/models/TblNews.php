<?php


class TblNews extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return TblNews the static model class
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
		return 'tbl_news';
	}

	

	public function getData($options){
		$model = Yii::app()->db->createCommand()
				->from($this->tableName());
		$select = "ID";
		if(isset($options['select'])){
			$select = $options['select'];
		}
		$model->select($select);
		/*if($options['task'] =='get-cate-has-content'){
			$model->select('ID,NEWS_CATE_ID,count(ID) as TOTAL')
					->where(array('and', 'IS_PUBLIC=1','IS_DELETE=0'))
					->group('NEWS_CATE_ID')
					->order('TOTAL DESC')
					;
		}*/

		if($options['task'] =='getContent'){
			
			if(isset($options['taskPublic']) && $options['taskPublic'] == "public"){

				$query = array('and', 'IS_PUBLIC=1','IS_DELETE=0');
			}else{		
				$query = array('and','ID != 0','IS_DELETE != 10');
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

			if(isset($options['like'])){
				$query[] = array('like', $options['like'], "%".$options['arrParamLike']."%");
			}
			

			$model->where($query);

				
		}
		if($options['task'] =='searchContent'){
			$query = array('and', 'IS_PUBLIC=1','IS_DELETE=0');
			$queryLike = array();
			$queryLike2 = array();
			$queryLike3 = array();	
			if(isset($options['like'])){

				if(isset($options['arrParamLike']) && trim($options['arrParamLike']) !=""){
					$queryLike = array('like', $options['like'],"%".$options['arrParamLike']."%");
					//$queryLike = array('like', $options['like'], '"%'.$options['arrParamLike'].'%"');
				}
			}
			if(isset($options['like2'])){
				if(isset($options['arrParamLike2']) && trim($options['arrParamLike2']) !=""){
					$queryLike2 = array('like', $options['like2'],"%".$options['arrParamLike2']."%");
				}
			}
			if(isset($options['like3'])){
				if(isset($options['arrParamLike3']) && trim($options['arrParamLike3']) !=""){
					$queryLike3 = array('like', $options['like3'], "%".$options['arrParamLike3']."%");
				}
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

			
			$query[] = array('or', $queryLike, $queryLike2,$queryLike3);
			
			$model->where($query);
		}
		if(isset($options['random']) && $options['random'] == 1){
			$model->order(array('RAND()'));
		}
		if(isset($options['order'])){
			$model->order($options['order']." ".$options['by']);
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