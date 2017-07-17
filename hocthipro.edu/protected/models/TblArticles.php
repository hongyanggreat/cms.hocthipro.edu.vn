<?php

/**
 * This is the model class for table "tbl_articles".
 *
 * The followings are the available columns in table 'tbl_articles':
 * @property integer $ID
 * @property string $TITLE
 * @property string $ALIAS
 * @property string $CONTENT_SHORT
 * @property string $CONTENT_FULL
 * @property string $IMAGE
 * @property integer $CATE_ID
 * @property integer $CREATED_AT
 * @property integer $CREATED_BY
 * @property integer $UPDATE_AT
 * @property integer $UPDATE_BY
 * @property integer $VIEW_NUMBER
 * @property integer $LIKE_NUMBER
 * @property integer $STATUS
 * @property string $TAG
 * @property string $META_KEYWORD
 */
class TblArticles extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return TblArticles the static model class
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
		return 'tbl_articles';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('TITLE, ALIAS, CONTENT_SHORT, CONTENT_FULL, CATE_ID, CREATED_AT, CREATED_BY, STATUS', 'required'),
			array('CATE_ID, CREATED_AT, CREATED_BY, UPDATE_AT, UPDATE_BY, VIEW_NUMBER, LIKE_NUMBER, STATUS', 'numerical', 'integerOnly'=>true),
			array('TITLE', 'length', 'max'=>250),
			array('ALIAS, CONTENT_SHORT, IMAGE, TAG, META_KEYWORD', 'length', 'max'=>255),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('ID, TITLE, ALIAS, CONTENT_SHORT, CONTENT_FULL, IMAGE, CATE_ID, CREATED_AT, CREATED_BY, UPDATE_AT, UPDATE_BY, VIEW_NUMBER, LIKE_NUMBER, STATUS, TAG, META_KEYWORD', 'safe', 'on'=>'search'),
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
			'TITLE' => 'Title',
			'ALIAS' => 'Alias',
			'CONTENT_SHORT' => 'Content Short',
			'CONTENT_FULL' => 'Content Full',
			'IMAGE' => 'Image',
			'CATE_ID' => 'Cate',
			'CREATED_AT' => 'Created At',
			'CREATED_BY' => 'Created By',
			'UPDATE_AT' => 'Update At',
			'UPDATE_BY' => 'Update By',
			'VIEW_NUMBER' => 'View Number',
			'LIKE_NUMBER' => 'Like Number',
			'STATUS' => 'Status',
			'TAG' => 'Tag',
			'META_KEYWORD' => 'Meta Keyword',
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
		$criteria->compare('TITLE',$this->TITLE,true);
		$criteria->compare('ALIAS',$this->ALIAS,true);
		$criteria->compare('CONTENT_SHORT',$this->CONTENT_SHORT,true);
		$criteria->compare('CONTENT_FULL',$this->CONTENT_FULL,true);
		$criteria->compare('IMAGE',$this->IMAGE,true);
		$criteria->compare('CATE_ID',$this->CATE_ID);
		$criteria->compare('CREATED_AT',$this->CREATED_AT);
		$criteria->compare('CREATED_BY',$this->CREATED_BY);
		$criteria->compare('UPDATE_AT',$this->UPDATE_AT);
		$criteria->compare('UPDATE_BY',$this->UPDATE_BY);
		$criteria->compare('VIEW_NUMBER',$this->VIEW_NUMBER);
		$criteria->compare('LIKE_NUMBER',$this->LIKE_NUMBER);
		$criteria->compare('STATUS',$this->STATUS);
		$criteria->compare('TAG',$this->TAG,true);
		$criteria->compare('META_KEYWORD',$this->META_KEYWORD,true);

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