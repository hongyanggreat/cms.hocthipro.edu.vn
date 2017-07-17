<?php

/**
 * This is the model class for table "tbl_benchmark".
 *
 * The followings are the available columns in table 'tbl_benchmark':
 * @property integer $ID
 * @property string $CODE_SCHOOL
 * @property integer $CAREER
 * @property integer $GENDER
 * @property string $EXAM_BLOCK
 * @property double $BRENCHMARK
 * @property string $NOTE
 * @property integer $STATUS
 * @property integer $CREATED_AT
 * @property integer $CREATED_BY
 * @property integer $UPDATE_AT
 * @property integer $UPDATE_BY
 * @property integer $YEAR
 */
class TblBenchmark extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return TblBenchmark the static model class
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
		return 'tbl_benchmark';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('CODE_SCHOOL, EXAM_BLOCK, BRENCHMARK, STATUS, CREATED_AT, CREATED_BY, YEAR', 'required'),
			array('CAREER, GENDER, STATUS, CREATED_AT, CREATED_BY, UPDATE_AT, UPDATE_BY, YEAR', 'numerical', 'integerOnly'=>true),
			array('BRENCHMARK', 'numerical'),
			array('CODE_SCHOOL, EXAM_BLOCK, NOTE', 'length', 'max'=>255),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('ID, CODE_SCHOOL, CAREER, GENDER, EXAM_BLOCK, BRENCHMARK, NOTE, STATUS, CREATED_AT, CREATED_BY, UPDATE_AT, UPDATE_BY, YEAR', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'ID' => 'ID',
			'CODE_SCHOOL' => 'Code School',
			'CAREER' => 'Career',
			'GENDER' => 'Gender',
			'EXAM_BLOCK' => 'Exam Block',
			'BRENCHMARK' => 'Brenchmark',
			'NOTE' => 'Note',
			'STATUS' => 'Status',
			'CREATED_AT' => 'Created At',
			'CREATED_BY' => 'Created By',
			'UPDATE_AT' => 'Update At',
			'UPDATE_BY' => 'Update By',
			'YEAR' => 'Year',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('ID',$this->ID);
		$criteria->compare('CODE_SCHOOL',$this->CODE_SCHOOL,true);
		$criteria->compare('CAREER',$this->CAREER);
		$criteria->compare('GENDER',$this->GENDER);
		$criteria->compare('EXAM_BLOCK',$this->EXAM_BLOCK,true);
		$criteria->compare('BRENCHMARK',$this->BRENCHMARK);
		$criteria->compare('NOTE',$this->NOTE,true);
		$criteria->compare('STATUS',$this->STATUS);
		$criteria->compare('CREATED_AT',$this->CREATED_AT);
		$criteria->compare('CREATED_BY',$this->CREATED_BY);
		$criteria->compare('UPDATE_AT',$this->UPDATE_AT);
		$criteria->compare('UPDATE_BY',$this->UPDATE_BY);
		$criteria->compare('YEAR',$this->YEAR);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	public function getData($options){
		$model = Yii::app()->db->createCommand()
				->from($this->tableName());
		
		$select = "ID";
		if(isset($options['select'])){
			$select = $options['select'];
		}
		$model->select($select);
		
		$queryLike1 = [];
		$queryLike2 = [];
		$queryLike3 = [];
			
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
			$queryLike1 = array('like', $options['like'], "%".$options['arrParamLike']."%");
		}
		if(isset($options['like2'])){
			$queryLike2 = array('like', $options['like2'], "%".$options['arrParamLike2']."%");
		}
		if(isset($options['like3'])){
			$queryLike3 =  array('like', $options['like3'], "%".$options['arrParamLike3']."%");
		}
		if(isset($options['likeOr'])){
			$query[] = array('or', $queryLike1, $queryLike2,$queryLike3);
		}else{
			$query[] = array('and', $queryLike1, $queryLike2,$queryLike3);
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