<?php

class SearchController extends Controller
{


	/*public function actionTest(){
		$model = Yii::app()->db->createCommand()
		    ->select('ID,TITLE,ALIAS,CATE_ID,IMAGE,TAG,CONTENT_SHORT')
		    ->from('tbl_news')
		    ;
			$model->where(array('like', 'TITLE', '%hien ke d%'));
		   $result = $model->queryAll();
		   echo '<pre>';print_r($result);
	}*/


	public function actionIndex()
	{	

		
		//$time = Yii::app()->contentComponent->divTime();
		//print_r($time);
		$menuContent = Yii::app()->contentComponent->getAllMenu();
		
		 $arrIdCate = array();
		 if(isset($menuContent) && count($menuContent) > 0){
	        foreach ($menuContent as $key => $value) {
	        	array_push($arrIdCate, $value['ID']);
	        		
	    	}
    	}
    	//print_r($arrIdCate);
		if(!empty($_POST)){
			$keyword = trim($_POST['keyword']);
			$keyword = Yii::app()->helper->utf8convert($keyword);
		}else{
			$keyword = str_replace(".html","",urldecode (Yii::app()->uri->segment(2)));
			$keyword = Yii::app()->helper->utf8convert($keyword);
			$keyword = str_replace("-"," ",$keyword);
		}
		$flash     = true;
		$limit     = 20;
		$order     = "ID";
		$by        = "DESC";
		$paginator = array();
		if($keyword){
			$model = new TblArticles;

			$options = array(
					'task'          => 'searchContent',
					'select'        => 'count(ID) as TOTAL',
					'likeOr'          =>true,
					'like'          => 'TITLE',
					'arrParamLike'  => $keyword,
					'like2'         => 'CONTENT_SHORT',
					'arrParamLike2' => $keyword,
					'like3'         => 'TAG',
					'arrParamLike3' => $keyword,
					'inArr'         => 'CATE_ID',
					'arrParamIn'    => $arrIdCate,
					'queryRow'      => true,
				);
			
			$totalRecord = $model->getData($options);
			//print_r($totalRecord);
			$total = $totalRecord['TOTAL'];
			if(isset($total) && $total > 0){
				$options = array(
					'task'          => 'public',
					'select'        => 'ID,TITLE,ALIAS,CATE_ID,IMAGE,TAG,CONTENT_SHORT,CREATED_AT',
					'order'         => $order,
					'by'            => $by,
					'likeOr'          =>true,
					'like'          => 'TITLE',
					'arrParamLike'  => "{$keyword}",
					'like2'         => 'CONTENT_SHORT',
					'arrParamLike2' => "{$keyword}",
					'inArr'         => 'CATE_ID',
					'arrParamIn'    => $arrIdCate,
					'like3'         => 'TAG',
					'arrParamLike3' => $keyword,
					'limit'         => $limit,
					'offset'        => 0,
				);
				$contentCate=  $model->getData($options);
				if(count($contentCate) >= $limit){
					//$pageActive = Yii::app()->uri->segment(4);
					if(empty($pageActive)){
						$pageActive = 1;
					}
					
					$paginator['pageActive'] = $pageActive;
					$paginator['totalPage']  = ceil($total/$limit);
					$paginator['limit']      = $limit;
					$paginator['order']      = $order;
					$paginator['by']         = $by;
				}
			}else{
				//$flash   = false;
				$contentCate = [];
				$message = "Không tìm thấy nội dung theo từ khóa tìm kiếm";
			}
			
		}else{
			$flash   = false;
			$message = "từ khóa không được rỗng";
		}

		if($flash){
			$data = array(
					'keyword'     => $keyword,
					'contentCate' => $contentCate,
					'contentHot'=>yii::app()->contentComponent->contentHot(),
					'paginator'   => $paginator,
				);
			$this->render('index',$data);

		}else{
			echo $message;			
		}
	}
	public function actionKeyword(){
		
		$data = array(
				'status'   => false,
				'messages' => '',
				'info'     => '',
			);
		if(isset($_POST['task']) && $_POST['task'] == "searchKeyword"){
			
			$menuContent = Yii::app()->contentComponent->getAllMenu();
			 $arrIdCate = array();
			 if(isset($menuContent) && count($menuContent) > 0){
		        foreach ($menuContent as $key => $value) {
		        	array_push($arrIdCate, $value['ID']);
		        		
		    	}
	    	}
			$model  = new TblArticles;
			
			$_POST['page'] = $_POST['page'] < 0 ? $_POST['page'] = 1 : $_POST['page'];
			$offset = ($_POST['page']-1) * $_POST['limit'];
			
			$options = array(
				'task'          => 'public',
				'select'        => 'ID,TITLE,ALIAS,CATE_ID,IMAGE,TAG,CONTENT_SHORT,CREATED_AT',
				'order'         => $_POST['order'],
				'by'            => $_POST['by'],
				'likeOr'          =>true,
				'like'          => 'TITLE',
				'arrParamLike'  => $_POST['keyword'],
				'like2'         => 'CONTENT_SHORT',
				'arrParamLike2' => $_POST['keyword'],
				'like3'         => 'TAG',
				'arrParamLike3' => $_POST['keyword'],
				'inArr'         => 'CATE_ID',
				'arrParamIn'    => $arrIdCate,
				'limit'         => $_POST['limit'],
				'offset'        => $offset,
			);
			$contentCate =  $model->getData($options);
			if(isset($contentCate) && count($contentCate) > 0){
				$info = '';
				foreach ($contentCate as $key => $value) {
					$id          = $value['ID'];
					$options = [ 
                                'pathImage' =>Yii::app()->params['media'].'/article/'
                                                .date('Y',$value['CREATED_AT']).'/' 
                                                .date('m',$value['CREATED_AT']).'/' 
                                                .date('d',$value['CREATED_AT']).'/'
                                                .$id.'/thumnail/'
                                                ,
                                'image'=>$value['IMAGE'],
                            ];

                    $img =  Yii::app()->helper->getImageNew($options);
					
					$cate        = yii::app()->contentComponent->getCate($value['CATE_ID']);
					$cateTitle   = $cate['NAME'];
					$linkCate    = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
					
					$link        = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';
					$title       = $value['TITLE'];
					$description = $value['CONTENT_SHORT'];
					
					$time        = date('d-m-Y',$value['CREATED_AT']);
	                $info .='<article data-aid="'.$id.'">
					            <figure>
					                <a target="_blank" href="'.$link.'">
					                    <div title="'.$title.'" style="width: 100%;height: 100%;background: url('.$img.');background-repeat: no-repeat;background-position: center;background-size: cover;display:block;"></div>
					                </a>
					            </figure>
					            <header>
					                <h2>
					        <a target="_blank" href="'.$link.'" title="'.$title.'">'.$title.'</a>
					        </h2>
					                <p class="meta">
					                    <a href="'.$linkCate.'">'.$cateTitle.'</a>
					                    <time class="friendly" datetime="2017-02-12T11:16:00+07:00">'.$time.'</time>
					                    <span>
					        <a href="'.$link.'" title="'.$title.'" class="spr spr-cache cache">'.$title.'</a>
					        </span>
					                </p>
					                <p class="summary">'.$description.'</p>
					            </header>
					        </article>';
				}
				$data['info']   = $info;
				$data['status'] = true;
			}else{
				$data['messages'] = "Không thấy bản ghi";
			}
			echo json_encode($data);
		}
	}
}