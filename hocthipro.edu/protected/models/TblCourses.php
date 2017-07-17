<?php

/**
 * This is the model class for table "tbl_courses".
 *
 * The followings are the available columns in table 'tbl_courses':
 * @property integer $ID
 * @property string $NAME
 * @property string $ALIAS
 * @property string $DESCRIPTION
 * @property string $CREATED_AT
 * @property integer $CREATED_BY
 * @property string $UPDATED_AT
 * @property integer $UPDATED_BY
 * @property integer $STATUS
 * @property integer $HAS_CLASS
 * @property integer $HAS_SUBJECT
 * @property integer $HAS_CHAPTER
 * @property string $IMAGE
 * @property integer $PARENT_COURSE
 * @property integer $FLASH_COURSE
 * @property string $START_DATE
 * @property string $END_DATE
 * @property integer $IS_DELETE
 * @property integer $PRICE
 */
class TblCourses extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return TblCourses the static model class
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
		return 'tbl_courses';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('NAME, ALIAS, DESCRIPTION, CREATED_AT, CREATED_BY, STATUS, PARENT_COURSE, START_DATE, END_DATE, PRICE', 'required'),
			array('CREATED_BY, UPDATED_BY, STATUS, HAS_CLASS, HAS_SUBJECT, HAS_CHAPTER, PARENT_COURSE, FLASH_COURSE, IS_DELETE, PRICE', 'numerical', 'integerOnly'=>true),
			array('NAME, ALIAS, IMAGE', 'length', 'max'=>255),
			array('UPDATED_AT', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('ID, NAME, ALIAS, DESCRIPTION, CREATED_AT, CREATED_BY, UPDATED_AT, UPDATED_BY, STATUS, HAS_CLASS, HAS_SUBJECT, HAS_CHAPTER, IMAGE, PARENT_COURSE, FLASH_COURSE, START_DATE, END_DATE, IS_DELETE, PRICE', 'safe', 'on'=>'search'),
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
			'DESCRIPTION' => 'Description',
			'CREATED_AT' => 'Created At',
			'CREATED_BY' => 'Created By',
			'UPDATED_AT' => 'Updated At',
			'UPDATED_BY' => 'Updated By',
			'STATUS' => 'Status',
			'HAS_CLASS' => 'Has Class',
			'HAS_SUBJECT' => 'Has Subject',
			'HAS_CHAPTER' => 'Has Chapter',
			'IMAGE' => 'Image',
			'PARENT_COURSE' => 'Parent Course',
			'FLASH_COURSE' => 'Flash Course',
			'START_DATE' => 'Start Date',
			'END_DATE' => 'End Date',
			'IS_DELETE' => 'Is Delete',
			'PRICE' => 'Price',
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
		$criteria->compare('DESCRIPTION',$this->DESCRIPTION,true);
		$criteria->compare('CREATED_AT',$this->CREATED_AT,true);
		$criteria->compare('CREATED_BY',$this->CREATED_BY);
		$criteria->compare('UPDATED_AT',$this->UPDATED_AT,true);
		$criteria->compare('UPDATED_BY',$this->UPDATED_BY);
		$criteria->compare('STATUS',$this->STATUS);
		$criteria->compare('HAS_CLASS',$this->HAS_CLASS);
		$criteria->compare('HAS_SUBJECT',$this->HAS_SUBJECT);
		$criteria->compare('HAS_CHAPTER',$this->HAS_CHAPTER);
		$criteria->compare('IMAGE',$this->IMAGE,true);
		$criteria->compare('PARENT_COURSE',$this->PARENT_COURSE);
		$criteria->compare('FLASH_COURSE',$this->FLASH_COURSE);
		$criteria->compare('START_DATE',$this->START_DATE,true);
		$criteria->compare('END_DATE',$this->END_DATE,true);
		$criteria->compare('IS_DELETE',$this->IS_DELETE);
		$criteria->compare('PRICE',$this->PRICE);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	public function getData($options){
		$model = Yii::app()->db->createCommand()
				->from($this->tableName());
		
		if($options['task'] =='get-cate-has-course'){
			$model->select('ID,PARENT_COURSE,NAME,count(ID) as TOTAL')
					->where(array('and', 'STATUS=1','IS_DELETE=0'))
					->group('PARENT_COURSE')
					->order('TOTAL DESC')
					;
		}
		if($options['task'] =='get-new-course'){
			
			$select = "ID";

			if(isset($options['select'])){
				$select = $options['select'];
			}
			$model->select($select);

			$query = array('and', 'STATUS=1','IS_DELETE=0');
			if(isset($options['field'])){
				$mark = '=';
				if(isset($options['then']) && $options['then'] == 1){
					if(isset($options['by']) && $options['by'] == "DESC"){
						$mark = '<';
					}else{
						$mark = '>';
					}
				}else{
					if(isset($options['mark'])){
						$mark = $options['mark'];
					}
				}	
				$query[] = $options['field'].' '.$mark.' '.$options['param'];
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
		

		return $model->queryAll();

	}
}