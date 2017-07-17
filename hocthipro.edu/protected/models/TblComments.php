<?php

/**
 * This is the model class for table "tbl_comments".
 *
 * The followings are the available columns in table 'tbl_comments':
 * @property integer $ID
 * @property integer $NEWS_ID
 * @property string $CONTENT
 * @property string $ALIAS
 * @property string $EMAIL
 * @property string $COMMENT_AT
 * @property integer $APPROVED_PUBLIC
 * @property string $APPROVED_AT
 * @property integer $IS_DELETE
 */
class TblComments extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */



	public function tableName()
	{
		return 'tbl_comments';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('NEWS_ID, CONTENT, EMAIL', 'required'),
			
			array('NEWS_ID, APPROVED_PUBLIC, IS_DELETE', 'numerical', 'integerOnly'=>true),
			array('ALIAS, EMAIL', 'length', 'max'=>250),
			//array('EMAIL', 'email'),
			array('EMAIL', 'validateEmail'),
			array('CONTENT, COMMENT_AT, APPROVED_AT', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('ID, NEWS_ID, CONTENT, ALIAS, EMAIL, COMMENT_AT, APPROVED_PUBLIC, APPROVED_AT, IS_DELETE', 'safe', 'on'=>'search'),
		);
	}
	public function validateEmail ($attribute,$params)
	{
		$partten = "/^[A-Za-z0-9_\.]{2,32}@([a-zA-Z0-9]{2,6})(\.[a-zA-Z]{2,6})+$/";
		if(preg_match($partten, $_POST["email"]) ) {
			 return true;
		}else{
			$this->addError($attribute, 'Vui Lòng không nhập : ký tự đặc biệt,ký tự có dấu,khoảng trông.');
		}
	   

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
			'NEWS_ID' => 'News',
			'CONTENT' => 'Content',
			'ALIAS' => 'Alias',
			'EMAIL' => 'Email',
			'COMMENT_AT' => 'Comment At',
			'APPROVED_PUBLIC' => 'Approved Public',
			'APPROVED_AT' => 'Approved At',
			'IS_DELETE' => 'Is Delete',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('ID',$this->ID);
		$criteria->compare('NEWS_ID',$this->NEWS_ID);
		$criteria->compare('CONTENT',$this->CONTENT,true);
		$criteria->compare('ALIAS',$this->ALIAS,true);
		$criteria->compare('EMAIL',$this->EMAIL,true);
		$criteria->compare('COMMENT_AT',$this->COMMENT_AT,true);
		$criteria->compare('APPROVED_PUBLIC',$this->APPROVED_PUBLIC);
		$criteria->compare('APPROVED_AT',$this->APPROVED_AT,true);
		$criteria->compare('IS_DELETE',$this->IS_DELETE);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return TblComments the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	
	public function getData($options){
		$model = Yii::app()->db->createCommand()
				->select('ID,CONTENT, EMAIL, COMMENT_AT,APPROVED_AT')
				->from($this->tableName());
		if($options['task'] =='get-comment'){
			$query = array('and','IS_DELETE = 0','APPROVED_PUBLIC = 1',$options['field'] .'='.$options['param']);
			
			if(isset($options['order'])){
				$model->order($options['order'].' ' .$options['by']);
			}
			if(isset($options['limit'])){
				$model->limit($options['limit']);
			}
			if(isset($options['notIn'])){
				$query[] = array('not in', $options['field2'], $options['notIn']);
			}
			$model->where($query);
		}
		return $model->queryAll();

	}
	
}
