<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class Uri extends CApplicationComponent
{
	public function  segment($n){
		$strUrl =  Yii::app()->request->requestUri;	
		$urlTrue =  Yii::app()->getBaseUrl(true);
		
		$arrStrUrl = explode("/",$strUrl)	;
		$arrUrlTrue = explode("/",$urlTrue)	;

		$arrUri = array();
		array_push($arrUri, $arrUrlTrue[2]);
		foreach ($arrStrUrl as $key => $value) {
			if(!empty($value)){
				array_push($arrUri, $value);
			}
		}
		if(array_key_exists($n,$arrUri)){
			return $arrUri[$n];
		}else{
			return false;
		}
		

	}
}


