<?php

/**
 * This is the model class for table "tbl_universities".
 *
 * The followings are the available columns in table 'tbl_universities':
 * @property string $ID
 * @property string $CODE
 * @property string $NAME
 * @property string $NAME_ASCII
 * @property string $REGION
 * @property integer $TYPE
 * @property integer $STATUS
 * @property string $EXAM_BLOCK
 * @property string $ADDRESS
 * @property integer $MATINH
 * @property string $INFO
 * @property integer $CREATED_AT
 * @property integer $CREATED_BY
 * @property integer $UPDATE_AT
 * @property integer $UPDATE_BY
 */
class TblUniversities extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return TblUniversities the static model class
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
		return 'tbl_universities';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('CODE, NAME, NAME_ASCII, REGION, STATUS, EXAM_BLOCK, ADDRESS, CREATED_AT', 'required'),
			array('TYPE, STATUS, MATINH, CREATED_AT, CREATED_BY, UPDATE_AT, UPDATE_BY', 'numerical', 'integerOnly'=>true),
			array('CODE', 'length', 'max'=>64),
			array('NAME, NAME_ASCII, REGION', 'length', 'max'=>255),
			array('EXAM_BLOCK', 'length', 'max'=>128),
			array('ADDRESS', 'length', 'max'=>1024),
			array('INFO', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('ID, CODE, NAME, NAME_ASCII, REGION, TYPE, STATUS, EXAM_BLOCK, ADDRESS, MATINH, INFO, CREATED_AT, CREATED_BY, UPDATE_AT, UPDATE_BY', 'safe', 'on'=>'search'),
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
			'CODE' => 'Code',
			'NAME' => 'Name',
			'NAME_ASCII' => 'Name Ascii',
			'REGION' => 'Region',
			'TYPE' => 'Type',
			'STATUS' => 'Status',
			'EXAM_BLOCK' => 'Exam Block',
			'ADDRESS' => 'Address',
			'MATINH' => 'Matinh',
			'INFO' => 'Info',
			'CREATED_AT' => 'Created At',
			'CREATED_BY' => 'Created By',
			'UPDATE_AT' => 'Update At',
			'UPDATE_BY' => 'Update By',
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

		$criteria->compare('ID',$this->ID,true);
		$criteria->compare('CODE',$this->CODE,true);
		$criteria->compare('NAME',$this->NAME,true);
		$criteria->compare('NAME_ASCII',$this->NAME_ASCII,true);
		$criteria->compare('REGION',$this->REGION,true);
		$criteria->compare('TYPE',$this->TYPE);
		$criteria->compare('STATUS',$this->STATUS);
		$criteria->compare('EXAM_BLOCK',$this->EXAM_BLOCK,true);
		$criteria->compare('ADDRESS',$this->ADDRESS,true);
		$criteria->compare('MATINH',$this->MATINH);
		$criteria->compare('INFO',$this->INFO,true);
		$criteria->compare('CREATED_AT',$this->CREATED_AT);
		$criteria->compare('CREATED_BY',$this->CREATED_BY);
		$criteria->compare('UPDATE_AT',$this->UPDATE_AT);
		$criteria->compare('UPDATE_BY',$this->UPDATE_BY);

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
		if(isset($options['likeAnd'])){
			$query[] =  array('like', $options['likeAnd'], "%".$options['arrParamLikeAnd']."%");
		}
		if(isset($options['likeOr']) && $options['likeOr']){

			if(isset($options['like'])){
				$queryLike1 = array('like', $options['like'], "%".$options['arrParamLike']."%");
			}
			if(isset($options['like2'])){
				$queryLike2 = array('like', $options['like2'], "%".$options['arrParamLike2']."%");
			}
			if(isset($options['like3'])){
				$queryLike3 =  array('like', $options['like3'], "%".$options['arrParamLike3']."%");
			}
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