<?php

class TagController extends Controller
{
	
	public function actionIndex()
	{	
		
		$tag = str_replace(".html","",urldecode (Yii::app()->uri->segment(2)));
		$tag = str_replace("-"," ",$tag);
		$flash     = true;
		$limit     = 3;
		$order     = "ID";
		$by        = "DESC";
		$paginator = array();
		$contentCate= [];
		if($tag){
			$model = new TblArticles;

			$options = array(
					'task'          => 'searchContent',
					'select'        => 'count(ID) as TOTAL',
					'like'          => 'TAG',
					'arrParamLike'  => $tag,
					'queryRow'      => true,
				);
			
			$totalRecord = $model->getData($options);
			$total = $totalRecord['TOTAL'];
			if(isset($total) && $total > 0){
				$options = array(
					'task'          => 'searchContent',
					'select'        => 'ID,TITLE,ALIAS,CATE_ID,IMAGE,TAG,CONTENT_SHORT,CREATED_AT',
					'order'         => $order,
					'by'            => $by,
					'like'          => 'TAG',
					'arrParamLike'  => "{$tag}",
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
				$message = "Không tìm thấy nội dung theo từ khóa tìm kiếm";
			}
			
		}else{
			$flash   = false;
			$message = "Kiểm tra lại tag";
		}

		if($flash){
			$data = array(
					'tag'     => $tag,
					'contentCate' => $contentCate,
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
		if(isset($_POST['task']) && $_POST['task'] == "searchTag"){
			

			$model  = new TblArticles;
			
			$_POST['page'] = $_POST['page'] < 0 ? $_POST['page'] = 1 : $_POST['page'];
			$offset = ($_POST['page']-1) * $_POST['limit'];
			
			$options = array(
				'task'          => 'searchContent',
				'select'        => 'ID,TITLE,ALIAS,CATE_ID,IMAGE,TAG,CONTENT_SHORT,CREATED_AT',
				'order'         => $_POST['order'],
				'by'            => $_POST['by'],
				'like'          => 'TAG',
				'arrParamLike'  => $_POST['tag'],
				'limit'         => $_POST['limit'],
				'offset'        => $offset,
			);
			$contentCate =  $model->getData($options);
			if(isset($contentCate) && count($contentCate) > 0){
				$info = '';
				foreach ($contentCate as $key => $value) {
					$id          = $value['ID'];
					$img         = Yii::app()->helper->getImage('/uploads/content/',$value['IMAGE']);
					
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
					                    <img style="background: url('.$img.');background-repeat: no-repeat;background-position: center;background-size: cover;" alt="" title="'.$title.'">
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