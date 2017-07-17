<?php

class DefaultController extends Controller
{

	
	const URL = "http://api.brand1.xyz:8080/service/cp/brand/CSKH?";

	private $user;
	private $pass;
	private $phone;
	private $mess;
	private $tranId;
	private $brandName;

	
	public function actionIndex()
	{




		echo 'get';
		die;
		$messages = '';

		//echo '<pre>';
		if($_GET){
			$options = [
						'method' =>'GET',
						'data'   =>$_GET,
						];
			//$messages = $this->brandApi($options);
		}
		$this->render('indexGet',['messages'=>$messages]);
	}
	public function actionPost()
	{
		echo 'post';
		die;
		$this->render('indexPost');
	}
	public function actionProccessPost()
	{
		echo 'xu ly';
		die;
		$messages = '';
		if($_POST){
			$options = [
						'method' =>'POST',
						'data'   =>$_POST,
						];
			$messages = $this->brandApi($options);
		}	

		echo $messages;
		echo '<br>';
		echo 'Nhấn vào đây để quay trở lại. <a href="'.Yii::app()->getBaseUrl().'/branchPost'.'">BranchPost</a>';
	}

	function brandApi($info){

		$user      =  trim($info['data']['user']);
		$pass      =  trim($info['data']['pass']);
		$phone     =  trim($info['data']['phone']);
		$mess      =  trim($info['data']['mess']);
		$brandName =  trim($info['data']['brandName']);
		$tranId    =  trim($info['data']['tranId']);
		//$tranId    =  Yii::app()->helper->RandomString(5);
		$url = DefaultController::URL;
		$data = [
			'user'      => $user, 
			'pass'      => $pass,
			'phone'     => $phone,
			'mess'      => $mess,
			'brandName' => $brandName,
			'tranId'    => $tranId,
		];

		$options = array(
		    'http' => array(
		        'header'  => "Content-type: application/x-www-form-urlencoded\r\n;",
		        'method'  => $info['method'],
		        'content' => http_build_query($data)
		    )
		);
		
		$context  = stream_context_create($options);
		switch ($info['method']) {
			case 'POST':
			case 'PUT':
				$result = file_get_contents($url, false, $context);
				break;
			case 'GET':
				$getdata = http_build_query($data);
				$result = file_get_contents($url.$getdata, false, $context);
				break;
			
			default:
				# code...
				break;
		}
		
		if ($result === FALSE) { /* Handle error */ }
		return $result;
		
	}

	
}