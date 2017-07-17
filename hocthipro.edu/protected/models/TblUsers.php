<?php

/**
 * This is the model class for table "tbl_users".
 *
 * The followings are the available columns in table 'tbl_users':
 * @property integer $ID
 * @property string $USERNAME
 * @property string $PASSWORD
 * @property integer $STATUS
 * @property integer $IS_DELETE
 * @property string $FULLNAME
 * @property string $PHONE_NUMBER
 * @property string $EMAIL
 * @property string $FACEBOOK
 * @property string $SKYPE
 * @property string $CREATED_AT
 * @property integer $CREATED_BY
 * @property string $UPDATED_AT
 * @property integer $UPDATED_BY
 */
class TblUsers extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return TblUsers the static model class
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
		return 'tbl_users';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('USERNAME, PASSWORD, CREATED_AT, CREATED_BY', 'required'),
			array('STATUS, IS_DELETE, CREATED_BY, UPDATED_BY', 'numerical', 'integerOnly'=>true),
			array('USERNAME, PASSWORD, FULLNAME, PHONE_NUMBER, EMAIL, FACEBOOK, SKYPE', 'length', 'max'=>250),
			array('UPDATED_AT', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('ID, USERNAME, PASSWORD, STATUS, IS_DELETE, FULLNAME, PHONE_NUMBER, EMAIL, FACEBOOK, SKYPE, CREATED_AT, CREATED_BY, UPDATED_AT, UPDATED_BY', 'safe', 'on'=>'search'),
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
			'USERNAME' => 'Username',
			'PASSWORD' => 'Password',
			'STATUS' => 'Status',
			'IS_DELETE' => 'Is Delete',
			'FULLNAME' => 'Fullname',
			'PHONE_NUMBER' => 'Phone Number',
			'EMAIL' => 'Email',
			'FACEBOOK' => 'Facebook',
			'SKYPE' => 'Skype',
			'CREATED_AT' => 'Created At',
			'CREATED_BY' => 'Created By',
			'UPDATED_AT' => 'Updated At',
			'UPDATED_BY' => 'Updated By',
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
		$criteria->compare('USERNAME',$this->USERNAME,true);
		$criteria->compare('PASSWORD',$this->PASSWORD,true);
		$criteria->compare('STATUS',$this->STATUS);
		$criteria->compare('IS_DELETE',$this->IS_DELETE);
		$criteria->compare('FULLNAME',$this->FULLNAME,true);
		$criteria->compare('PHONE_NUMBER',$this->PHONE_NUMBER,true);
		$criteria->compare('EMAIL',$this->EMAIL,true);
		$criteria->compare('FACEBOOK',$this->FACEBOOK,true);
		$criteria->compare('SKYPE',$this->SKYPE,true);
		$criteria->compare('CREATED_AT',$this->CREATED_AT,true);
		$criteria->compare('CREATED_BY',$this->CREATED_BY);
		$criteria->compare('UPDATED_AT',$this->UPDATED_AT,true);
		$criteria->compare('UPDATED_BY',$this->UPDATED_BY);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}