<?php

class CacheController extends Controller
{
	function init() {
	    $this->updateCache();
	}
	private function updateCache() {
	    if(Yii::app()->request->getParam('cache', 'true') === 'false')
	        Yii::app()->setComponent('cache', new CDummyCache());
	}
	public function actionIndex()
	{
		$cache = Yii::app()->cache;
		echo '<pre>';print_r($cache);
		echo 'day la caching';
	}
	public function actionSet(){
		
		echo 'Set cache';
		$valueTest = ['name'=>'Duong','age'=>27,'gander'=>'male'];
		$valueTest1 = 'Toi se bi mat sau 10s';
		$valueTest2 = 'Toi se bi mat sau 20s';
		$valueTest3 = 'Toi se bi mat sau 30s';
		$valueTest4 = [
						'time'=>'toi se bien mat sau 40s',
						'nam'=>'gia tri thu 4',
						];
	
		Yii::app()->cache->set('test',$valueTest,10);
		Yii::app()->cache->set('test1',$valueTest1,10);
		Yii::app()->cache->set('test2',$valueTest2,20);
		Yii::app()->cache->set('test3',$valueTest3,30);
		Yii::app()->cache->set('test4',$valueTest4,40);
		

	}
	public function actionSetPhp(){
		
		$memcache = new Memcache;
		$memcache->connect("localhost",11211);
		$tmp_object = new stdClass;
		$tmp_object->str_attr = "test";
		$tmp_object->htp = "hocthipro";
		$memcache->set("myCache",$tmp_object,false,20);
		echo '<pre>';
		print_r($memcache->get("myCache"));

		die;
	
	}
	public function actionGet(){
		echo 'Get cache<hr>';
		$test =  Yii::app()->cache->get('test');
		$test1 =  Yii::app()->cache->get('test1');
		$test2 =  Yii::app()->cache->get('test2');
		$test3 =  Yii::app()->cache->get('test3');
		$test4 =  Yii::app()->cache->get('test4');
		echo '<pre>';
		print_r($test);
		echo '<hr>';
		print_r($test1);
		echo '<hr>';
		print_r($test2);
		echo '<hr>';
		print_r($test3);
		echo '<hr>';
		print_r($test4);
	}

	public function actionRemove(){
		$memcache=new CMemCache();
		$memcache->connect("localhost",11211);
		$memcache->flush();
		die;
		Yii::app()->cache->set('test', false);
	}
	public function actionFlush(){
		//echo 'Xoa toan bo cache';
		Yii::app()->cache->flush();
	}
}