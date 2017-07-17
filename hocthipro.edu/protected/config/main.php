<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',

	'name'=>'HocthiPro :: Trang học trực tuyến online số 1 Việt Nam',
	'timeZone' => 'Asia/Bangkok',
	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
	),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'1',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1','118.70.109.34','14.177.149.132','123.16.234.80','124.158.4.208'),
		),
		'content',
		'tracuu',
		'caching',
		'branch',
	),

	// application components
	'components'=>array(
		
		/*'request' => array(
			'hostInfo' => 'http://hocthipro.vn/',
			'baseUrl'  => 'http://hocthipro.vn',
        ),*/
 		/*'cache'=>array(
            'class'=>'system.caching.CMemCache',
            'servers'=>array(
                //array('host'=>'localhost', 'port'=>11211, 'weight'=>60),
                array('host'=>'124.158.4.208', 'port'=>11211, 'weight'=>60),
            ),
        ),*/
		'urlManager'=>array(
		        'urlFormat'=>'path',
		        'showScriptName' => false,
		        'caseSensitive'=>false,
		        'urlSuffix'=>'.html',
		        'rules'=>array(

						//menu top
						//'tin-tuc'                 => array('Content/Default/Index',  'urlSuffix'=>'.htp'), 	
						//'tuyen-sinh-huong-nghiep' => array('Content/Default/Index',  'urlSuffix'=>'.htp'), 	
						//'khoa-hoc'                => array('Content/Default/Index',  'urlSuffix'=>'.htp'), 	
						//'dien-dan'                => array('Content/Default/Index',  'urlSuffix'=>'.htp'), 	
						//'thu-vien'                => array('Content/Default/Index',  'urlSuffix'=>'.htp'), 	
						//'diem-chuan'              => array('Content/Default/Index',  'urlSuffix'=>'.htp'), 	
						//'tra-cuu-diem-thi'        => array('Content/Default/Index',  'urlSuffix'=>'.htp'), 	
						//'dong-hanh-cung-mua-thi'  => array('Content/Default/Index',  'urlSuffix'=>'.htp'), 	
						//===============Branch
						'branchGet' => array('Branch/Default/Index',  'urlSuffix'=>'.html'), 	
						'branchPost' => array('Branch/Default/Post',  'urlSuffix'=>'.html'), 	
						'ProccessPost' => array('Branch/Default/ProccessPost',  'urlSuffix'=>'.html'), 	
		        		//===============link Tra cuu diem thi 
						//'diem-chuan/[\w\-]+' => array('Tracuu/Default/BenchMark',  'urlSuffix'=>'.html'), 	
						'diem-chuan/[\w\-]+' => array('Tracuu/Default/BenchMarks',  'urlSuffix'=>'.html'), 	
						'diem-chuan'         => array('Tracuu/Default/Index',  'urlSuffix'=>'.html'), 	
						'diem-chuan/*' => array('Tracuu/Default/BenchMarks',  'urlSuffix'=>'.html'), 	
						//'BenchMark'          => array('Tracuu/Search/BenchMark',  'urlSuffix'=>'.html'), 	
						'BenchMarks'          => array('Tracuu/Search/BenchMarks',  'urlSuffix'=>'.html'), 	
						'ShowUniversities'          => array('Tracuu/Search/ShowUniversities',  'urlSuffix'=>'.html'), 	
						'Search'             => array('Tracuu/Search/Index',  'urlSuffix'=>'.html'), 	
						'caching'             => array('caching/Default/Index',  'urlSuffix'=>'.html'), 	
						
		        		//=============== TEST CACHE
						// 'Cache'       => array('Tracuu/Cache/Index',  'urlSuffix'=>'.html'), 	
						// 'Cache/set'   => array('Tracuu/Cache/Set',  'urlSuffix'=>'.html'), 	
						// 'Cache/SetPhp'   => array('Tracuu/Cache/SetPhp',  'urlSuffix'=>'.html'), 	
						// 'Cache/get'   => array('Tracuu/Cache/Get',  'urlSuffix'=>'.html'), 	
						// 'Cache/remove' => array('Tracuu/Cache/Remove',  'urlSuffix'=>'.html'), 	
						// 'Cache/flush' => array('Tracuu/Cache/Flush',  'urlSuffix'=>'.html'), 	
						
		        		//===============link category 
						'test/[\w\-]+'     => array('Content/Test/Index',  'urlSuffix'=>'.html'), 	
						'tim-kiem/keyword' => array('Content/Search/Keyword',  'urlSuffix'=>'.html'), 	
						'tim-kiem/tag'     => array('Content/Tag/Keyword',  'urlSuffix'=>'.html'), 	
						'tim-kiem/[\w\-]+' => array('Content/Search/Index',  'urlSuffix'=>'.html'), 	
						'tim-kiem/*' => array('Content/Search/Index',  'urlSuffix'=>'.html'), 	
						
						'tag/[\w\-]+'      => array('Content/Tag/Index',  'urlSuffix'=>'.html'), 	
						'GetContentCate'   => array('Content/Category/GetContentCate',  'urlSuffix'=>'.html'), 	
						'getArticleRelation'   => array('Content/Category/getArticleRelation',  'urlSuffix'=>'.html'), 	
						'tin-nong'         => array('Content/Default/HotContent',  'urlSuffix'=>'.html'), 	
						'tin-moi'          => array('Content/Default/NewContent',  'urlSuffix'=>'.html'), 	
						'Video/[\w\-]+'    => array('Content/Video/Index',  'urlSuffix'=>'.html'), 	
						'[\w\-]+/[\w\-]+'  => array('Content/Detail/Index',  'urlSuffix'=>'.html'), 	
						'[\w\-]+'          => array('Content/Category/Index',  'urlSuffix'=>'.html'), 	

						'<module:\w+><controller:\w+>/<id:\d+>'              => '<module><controller>/view',
						'<module:\w+><controller:\w+>/<action:\w+>/<id:\d+>' => '<module><controller>/<action>',
						'<module:\w+><controller:\w+>/<action:\w+>'          => '<module><controller>/<action>',
						

						
						'<controller:\w+>/<id:\d+>'              => '<controller>/view',
						'<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
						'<controller:\w+>/<action:\w+>'          => '<controller>/<action>',
		        ),
		),
		
		'uri'=>array(
			'class'=>'Uri',
		),
		'helper'=>array(
			'class'=>'Helper',
		),
		
		'contentComponent'=>array(
			'class'=>'ContentComponent',
		),
		
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),

		// uncomment the following to enable URLs in path-format
		
		

		// database settings are configured in database.php
		//'db'=>require(dirname(__FILE__).'/database.php'),
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=dev_hocthipro',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
		),
		'db3'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=dev_hocthipro2',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
			'class'=>'CDbConnection', 
		),
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>YII_DEBUG ? null : 'Site/MyError',
		),

		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
			),
		),

	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail' =>'webmaster@example.com',
		'media' =>'http://media.hocthipro.vn',
	),
	'theme' => 'hocthipro',
	'defaultController'=>'Content/Default/Index',
	//'defaultController'=>'Content/Category/Index',
);
