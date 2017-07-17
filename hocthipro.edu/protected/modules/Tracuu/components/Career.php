<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class Career extends CApplicationComponent
{
	public function  get($field,$param){
		$model = new TblCareers;
		$options = [
					'task'     =>'public',
					'select'   =>'CODE, NAME',
					'field'    =>$field,
					'param'    =>$param,
					'queryRow' =>true,
				];
		return $model->getData($options);
	}
}


