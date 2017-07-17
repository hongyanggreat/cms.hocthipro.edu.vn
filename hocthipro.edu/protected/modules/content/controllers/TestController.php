<?php

class TestController extends Controller
{

	public function actionIndex()
	{	
		$data = [];
		$this->render('index',$data);
	}

	
}