<?php

class CategoryController extends Controller
{

	public function actionIndex()
	{	

		$flash = true;
        $alias = str_replace(".html","",Yii::app()->uri->segment(1));
        $limit = 10;
        $order = "ID";
        $by = "DESC";


        $paginator =[];
		if(!empty($alias)){
			$model = new TblCategories;
			$options = array(
					'task'=>'public',
					'select'=>'ID,NAME,ALIAS,DESCRIPTION,PARENT',
					'field'=>'ALIAS',
					'param'=>$alias,
					'queryRow'=>true,
				);
			$resultCate = $model->getData($options);

			$menuChild = Yii::app()->contentComponent->getMenu($resultCate['ID']);
			
			//mang cate can lay
			$arrIdCate = [];
			$arrExcept = [];
			if(isset($resultCate) && !empty($resultCate)){
				array_push($arrIdCate, $resultCate['ID']);
				if(isset($menuChild) && count($menuChild) > 0){
					foreach ($menuChild as $key => $value) {
						array_push($arrIdCate, $value['ID']);
					}
				}
			}

			

			if(isset($resultCate) && !empty($resultCate)){
				
				$model = new TblArticles;


				$options = array(
					'task'=>'public',
					'select'=>'ID,TITLE,ALIAS,CATE_ID,IMAGE,TAG,CONTENT_SHORT,CREATED_AT,VIEW_NUMBER',
					'notIn'=>'ID',
					'arrParamNotIn'=>$arrExcept,
					'inArr'=>'CATE_ID',
					'order'=>'ID',
					'by'=>'DESC',
					'arrParamIn'=>$arrIdCate,
					'limit'=>5,
				);
				$news = $model->getData($options);
				

				//echo '<pre>'; print_r($news);
				if(isset($news) && count($news) >0){
					foreach ($news as $key => $value) {
						array_push($arrExcept, $value['ID']);
					}
				}
				$options = array(
					'task'=>'public',
					'select'=>'ID,TITLE,ALIAS,CATE_ID,IMAGE,TAG,CONTENT_SHORT,CREATED_AT,VIEW_NUMBER',
					'order'=>'VIEW_NUMBER',
					'by'=>'DESC',
					'notIn'=>'ID',
					'arrParamNotIn'=>$arrExcept,
					'inArr'=>'CATE_ID',
					'arrParamIn'=>$arrIdCate,
					'limit'=>9,
				);
				$hotnews = $model->getData($options);

				
				//echo '<pre>'; print_r($hotnews);	
				/*if(isset($hotnews) && count($hotnews) >0){
					foreach ($hotnews as $key => $value) {
						array_push($arrExcept, $value['ID']);
					}
				}*/

				$options = array(
					'task'=>'public',
					'select'=>'count(ID) as TOTAL',
					'notIn'=>'ID',
					'arrParamNotIn'=>$arrExcept,
					'inArr'=>'CATE_ID',
					'arrParamIn'=>$arrIdCate,
					'queryRow'=>true,
				);
				$totalRecord = $model->getData($options);
				//echo '<pre>'; print_r($totalRecord);
				
				$total = $totalRecord['TOTAL'];
				
				if(isset($total) && $total > 0){

					$options = array(
							'task'=>'public',
							'select'=>'ID,TITLE,ALIAS,CATE_ID,IMAGE,TAG,CONTENT_SHORT,CREATED_AT,CATE_ID,VIEW_NUMBER',
							'order'=>$order,
							'by'=>$by,
							'notIn'=>'ID',
							'arrParamNotIn'=>$arrExcept,
							'inArr'=>'CATE_ID',
							'arrParamIn'=>$arrIdCate,
							'limit'=>$limit,
						);
					
					//echo '<pre>';print_r($options);

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
					$contentCate = array();
					$message = "Không tồn tại bài viết cùng chuyên mục";
				}
					
				//echo '<pre>';print_r($contentCate);
			}else{
				$message = "Danh mục không được tìm thấy";
				$flash = false;
			}
			
		}else{
			$message = "Lỗi không tồn tại alias";
			$flash = false;
		}

		if($flash){
			$strExcept = '';
			if(isset($arrExcept) && count($arrExcept) >0){
				foreach ($arrExcept as $key => $value) {
					if($key == 0){
						$strExcept .= $value;
					}else{
						$strExcept .= '-'.$value;
					}
				}
			}
			$strIdCate = '';
			if(isset($arrIdCate) && count($arrIdCate) >0){
				foreach ($arrIdCate as $key => $value) {
					if($key == 0){
						$strIdCate .= $value;
					}else{
						$strIdCate .= '-'.$value;
					}
				}
			}
			$data = [
					'cate'         =>$resultCate,
					'contentCate'  =>$contentCate,
					//'contentHot' =>yii::app()->contentComponent->contentHot(),
					'paginator'    =>$paginator,
					'hotnews'      =>$hotnews,
					'news'         =>$news,
					'strExcept'    =>$strExcept,
					'strIdCate'    =>$strIdCate,
					];
			$this->render('index',$data);
		}else{
			$data = [
				'message'=>$message,
				'alias'=>$alias,
				];
			$this->render('error',$data);			
		}
	}

	public function actionGetContentCate(){
		
		
		$data = array(
				'status'=>false,
				'messages'=>'',
				'info'=>'',
			);
		
		if(isset($_POST['task']) && $_POST['task'] == "getcontent"){
			$model = new TblArticles;
			
			$offset    = ($_POST['page']-1) *$_POST['limit'];
			
			$strExcept = $_POST['strExcept'];
			$arrExcept = [];
			if(isset($strExcept) && !empty($strExcept)){
				$arrExcept = explode('-', $strExcept);
			}

			$strIdCate = $_POST['strIdCate'];
			$arrIdCate = [];
			if(isset($strIdCate) && !empty($strIdCate)){
				$arrIdCate = explode('-', $strIdCate);
			}
			$options = [
						'task'          =>'public',
						'select'        =>'ID,TITLE,ALIAS,CATE_ID,IMAGE,TAG,CONTENT_SHORT,CREATED_AT,CATE_ID',
						'order'         =>$_POST['order'],
						'by'            =>$_POST['by'],
						'notIn'         =>'ID',
						'arrParamNotIn' =>$arrExcept,
						'inArr'         =>'CATE_ID',
						'arrParamIn'    =>$arrIdCate,
						'limit'         =>$_POST['limit'],
						'offset'        =>$offset,
					];
			$contentCate=  $model->getData($options);
			
			if(isset($contentCate) && count($contentCate) > 0){
				$info = '';
				foreach ($contentCate as $key => $value) {
					

					$cateInfo = Yii::app()->contentComponent->getCate($value['CATE_ID']);
					$cateName = $cateInfo['NAME'];
					$linkCate    = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'.html';
					
					$id          = $value['ID'];						
					$link        = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'/'.$value['ALIAS'].'.html';
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
					//$img         = Yii::app()->helper->getImage('/content/',$value['IMAGE']);
					$title       = $value['TITLE'];
					$description = $value['CONTENT_SHORT'];						
					$time = Yii::app()->helper->timeText($value['CREATED_AT']);
					$tag = $value['TAG'];
					$moreContent = '';
					if($tag !=''){
						
						$moreContent ='<a href="javascript:;" id="contentMore-'.$id.'" strIdCate="'.$strIdCate.'" tag="'.$tag.'"class="showArticleRelation btn-more"></a>
									
									<section id="contentMore-'.$id.'" class="related-list collapse" style="display: none;">
										
										
										
									</section>';
					}
	                $info .='<article data-aid="'.$id.'">
								<figure>
									<a  href="'.$link.'">
										<div title="'.$title.'" style="width: 100%;height: 100%;background: url('.$img.');background-repeat: no-repeat;background-position: center;background-size: cover;display:block;"></div>
									</a>
								</figure>
								<header>
									<h2 class="titleCate">
									<a  href="'.$link.'" title="'.$title.'">'.$title.'</a>
									</h2>
									<p class="meta">
									<a href="'.$linkCate.'">'.$cateName.'</a>
									<time class="friendly" datetime="2017-03-06T17:54:00+07:00">'.$time.'</time>
									<span>
									<a href="'.$link.'" title="'.$title.'" class="spr spr-cache cache">'.$title.'</a>
									</span>
									</p>
									<p class="summary">'.$description.'</p>
								</header>
								
								'.$moreContent.'
							</article>';
	                
				}

				$data['info']  = $info;
				$data['status']  = true;
			}else{
				$data['messages'] = "Không thấy bản ghi";
			}
		}
		echo json_encode($data);
	}

	public function actionGetArticleRelation(){
		$data = array(
				'status'=>false,
				'messages'=>'',
				'post'=>$_POST,
				'info'=>'',
			);
		
		if(isset($_POST['task']) && $_POST['task'] == "getArticleRelation"){
			$moreContentRelation =  'Không có bài viết cùng từ khóa';
			$id = str_replace("contentMore-","",$_POST['id']);
			$arrCate = explode('-', $_POST['stridcate']);
			$arrTag = explode(',', $_POST['tag']);
			$tagArr = [];
			if(count($arrTag)>=1){
				foreach ($arrTag as $key => $value) {
					$tagArr[] ='%'.$value.'%';
				}
			}
			$options = [
				'field'=>'ID',
				'param'=>$id,
				'inArr'=>'CATE_ID',
				'arrParamIn'=>$arrCate,
				'like'=>'TAG',
				'arrParamLike'=>$tagArr,
			];
			$result = Yii::app()->contentComponent->getArticleRelation($options);
			if(isset($result) && count($result) > 0){
				$moreContentRelation = '<a href="" class="view-more">Xem tin liên quan</a>';
				foreach ($result as $key => $value) {

					$id          = $value['ID'];
					
					$cateInfo = Yii::app()->contentComponent->getCate($value['CATE_ID']);
					$cateName = $cateInfo['NAME'];
					$linkCate = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'.html';
					
					$options = [ 
	                        'pathImage' =>Yii::app()->params['media'].'/article/'
				                            .date('Y',$value['CREATED_AT']).'/' 
				                            .date('m',$value['CREATED_AT']).'/' 
				                            .date('d',$value['CREATED_AT']).'/'
				                            .$id.'/thumnail/'
				                            ,
				            'image'=>$value['IMAGE'],
	                    ];

					$img      =  Yii::app()->helper->getImageNew($options);	
					$link     = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'/'.$value['ALIAS'].'.html';
					$title    = $value['TITLE'];
					
					

					$time = Yii::app()->helper->timeText($value['CREATED_AT']);
					$moreContentRelation .='<article>
												<figure>
													<a href="'.$link.'" title="'.$title.'">
													<img src="'.$img.'" alt="'.$title.'" title="'.$title.'"></a>
												</figure>
												<header>
													<h2><a href="'.$link.'" title="'.$title.'">'.$title.'</a></h2>
													<p class="meta">
													<a href="'.$linkCate.'">'.$cateName.'</a>
													<time class="friendly">'.$time.'</time>
													<span>
													<a href="'.$link.'" title="'.$title.'" class="spr spr-cache cache">'.$title.'</a>
													</span>
													</p>
												</header>
											</article>
											';
				}
				
			}
			$data['info']  = $moreContentRelation;
			$data['status']  = true;
		echo json_encode($data);
		}
	}
}