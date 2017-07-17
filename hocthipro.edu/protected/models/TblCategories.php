<?php

/**
 * This is the model class for table "tbl_categories".
 *
 * The followings are the available columns in table 'tbl_categories':
 * @property integer $ID
 * @property string $NAME
 * @property string $ALIAS
 * @property string $IMAGE
 * @property string $DESCRIPTION
 * @property integer $CREATED_AT
 * @property integer $CREATED_BY
 * @property integer $UPDATE_AT
 * @property integer $UPDATE_BY
 * @property integer $STATUS
 * @property integer $POSITION
 * @property integer $PARENT
 */
class TblCategories extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return TblCategories the static model class
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
		return 'tbl_categories';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('NAME, ALIAS, DESCRIPTION, CREATED_AT, STATUS', 'required'),
			array('CREATED_AT, CREATED_BY, UPDATE_AT, UPDATE_BY, STATUS, POSITION, PARENT', 'numerical', 'integerOnly'=>true),
			array('NAME, ALIAS, IMAGE', 'length', 'max'=>255),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('ID, NAME, ALIAS, IMAGE, DESCRIPTION, CREATED_AT, CREATED_BY, UPDATE_AT, UPDATE_BY, STATUS, POSITION, PARENT', 'safe', 'on'=>'search'),
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
			'NAME' => 'Name',
			'ALIAS' => 'Alias',
			'IMAGE' => 'Image',
			'DESCRIPTION' => 'Description',
			'CREATED_AT' => 'Created At',
			'CREATED_BY' => 'Created By',
			'UPDATE_AT' => 'Update At',
			'UPDATE_BY' => 'Update By',
			'STATUS' => 'Status',
			'POSITION' => 'Position',
			'PARENT' => 'Parent',
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
		$criteria->compare('NAME',$this->NAME,true);
		$criteria->compare('ALIAS',$this->ALIAS,true);
		$criteria->compare('IMAGE',$this->IMAGE,true);
		$criteria->compare('DESCRIPTION',$this->DESCRIPTION,true);
		$criteria->compare('CREATED_AT',$this->CREATED_AT);
		$criteria->compare('CREATED_BY',$this->CREATED_BY);
		$criteria->compare('UPDATE_AT',$this->UPDATE_AT);
		$criteria->compare('UPDATE_BY',$this->UPDATE_BY);
		$criteria->compare('STATUS',$this->STATUS);
		$criteria->compare('POSITION',$this->POSITION);
		$criteria->compare('PARENT',$this->PARENT);

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
			
		if(isset($options['task']) && $options['task'] == "public"){

			$query = array('and', 'ID != 0','STATUS=1');
		}else{
			$query = array('and','ID != 0','STATUS != 10');
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
		}else{
			$model->order("ID DESC");
		}
		if(isset($options['limit'])){
			$model->limit($options['limit']);
		}	
		
		if(isset($options['queryRow']) && $options['queryRow']){
			return $model->queryRow();
		}else{
			return $model->queryAll();
		}
	}
}