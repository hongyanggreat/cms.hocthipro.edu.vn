<?php 
//META SEO TITLE KEYWORD DESCRIPTION
$this->pageTitle = Yii::app()->params['description'] = Yii::app()->params['keywords'] =  htmlspecialchars_decode($cate['DESCRIPTION']);
 ?>

<section class="main category-page">
	<section class="hot-news">
		<div class="focus" data-track="|hotnews">
			<div class="main">
				
				<?php 					
					if(isset($news) && count($news) > 0){	
						foreach ($news as $key => $value) {
							if($key === 0){
								$feature = 'feature';
							}else{
								$feature = '';
							}
							$cateInfo = Yii::app()->contentComponent->getCate($value['CATE_ID']);
							$cateName = $cateInfo['NAME'];
							$linkCate    = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'.html';
							
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
							$link        = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'/'.$value['ALIAS'].'.html';
							$title       = $value['TITLE'];
							$description = $value['CONTENT_SHORT'];
							//$time        = date('d-m-Y',$value['CREATED_AT']);
							$time = Yii::app()->helper->timeText($value['CREATED_AT'],true);
				?>
							<article data-aid="<?php echo $id ?>" class="<?php echo $feature ?>">
								<figure>
									<a href="<?php echo $link ?>">
										<div title="<?php echo $title ?>" style="width: 100%;height: 100%;background: url(<?php echo $img ?>);background-repeat: no-repeat;background-position: center;background-size: cover;display:block;"></div>
									</a>
								</figure>
								<header>
									<h2><a href="<?php echo $link ?>" title="<?php echo $title ?>"><?php echo $title ?></a></h2>
									<p class="meta">
										<a href="<?php echo $linkCate ?>"><?php echo $cateName ?></a>
										<time class="friendly" datetime="2017-03-06T17:24:00+07:00"><?php echo $time ?></time>
										<span>
										<a href="<?php echo $link ?>" title="<?php echo $title ?>" class="spr spr-cache cache"><?php echo $title ?></a>
										</span>
									</p>
								</header>
							</article>
				<?php 	
						}
					}
				?>			
				
			</div>
		</div>
		<div class="more-article" data-track="|news">
			<?php 					
				if(isset($hotnews) && count($hotnews) > 0){	
					foreach ($hotnews as $key => $value) {
						
						$cateInfo = Yii::app()->contentComponent->getCate($value['CATE_ID']);
						$cateName = $cateInfo['NAME'];
						$linkCate    = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'.html';
						
						$id          = $value['ID'];						
						$link        = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'/'.$value['ALIAS'].'.html';
						$title       = $value['TITLE'];
						$description = $value['CONTENT_SHORT'];						
						$time = Yii::app()->helper->timeText($value['CREATED_AT']);
						
			?>
				<article data-aid="<?php echo $id ?>">
					<header>
						<h2>
							<a href="<?php echo $link ?>" title="<?php echo $title ?>"><?php echo $title ?></a>
						</h2>
						<p class="meta">
							<a href="<?php echo $linkCate ?>"><?php echo $cateName ?></a>
							<time class="friendly" datetime="2017-03-06T18:07:00+07:00"><?php echo $time ?></time>
							<span>
							<a href="<?php echo $link ?>" title="<?php echo $title ?>" class="spr spr-cache cache"><?php echo $title ?></a>
							</span>
						</p>
					</header>
				</article>
			<?php 	
					}
				}
			?>	
		</div>
	</section>

<div class="cat-content">
<section class="content-list" data-track="|contentlist" id = "contentlistDiv" href="#">
	<header>
	<h1 class="title"><?php  echo $cate['NAME'] ?></h1>
	</header>

		<fieldset id="showContentCate">
			
		
		<?php 					
				
			if(isset($contentCate) && count($contentCate) > 0){	
				foreach ($contentCate as $key => $value) {
					$cateInfo = Yii::app()->contentComponent->getCate($value['CATE_ID']);
					$cateName = $cateInfo['NAME'];
					$linkCate    = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'.html';
					
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

					$link        = Yii::app()->request->baseUrl.'/'.$cateInfo['ALIAS'].'/'.$value['ALIAS'].'.html';
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
					echo $info ='<article data-aid="'.$id.'">
									<figure>
										<a href="'.$link.'">
											<div title="'.$title.'" style="width: 100%;height: 100%;background: url('.$img.');background-repeat: no-repeat;background-position: center;background-size: cover;display:block;"></div>
										</a>
									</figure>
									<header>
										<h2 class="titleCate">
										<a href="'.$link.'" title="'.$title.'">'.$title.'</a>
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
			}
		?>	
		</fieldset>
	<?php 
    if(isset($paginator['totalPage']) && $paginator['totalPage'] > 1){
?>

    <style>
    .pagination span a.main_PagingList1_pager_backControl{
        display: none;
    }
    #pageText{
        border: 1px solid green;
        padding: 5px;
        width: 85px;
        border-radius: 2px 0 0 2px;
    }  
    #gotoPage{
        border: 1px solid green;
        padding: 5px 7px;
        width: 100px;
        border-radius: 0 2px 2px 0;
        background: green;
        color: #fff;
        margin-left: -5px;
    }
    </style>
    <div class="pagination pagination-centered">
        <span id="main_PagingList1_pager" strExcept="<?php echo $strExcept ?>" limit="<?php echo $paginator['limit']?>"  strIdCate="<?php echo $strIdCate ?>" cateTitle="<?php echo $cate['NAME'] ?>" cateAlias="<?php echo $cate['ALIAS'] ?>" order="<?php echo $paginator['order'] ?>" by="<?php echo $paginator['by'] ?>" >
            <a class="main_PagingList1_pager_backControl cursor" >«</a>
            <?php
                for ($i=0 ; $i < 3 ; $i++) { 
                 if($i < $paginator['totalPage']){
                    if(($i+1) == $paginator['pageActive']){
                        $link = "class='page active'";
                    }else{
                        $link = 'class="page cursor pageNumber"';
                    }
            ?>
                <a <?php echo  $link ?> id='page<?php echo $i +1 ?>'><?php echo $i +1 ?></a>
            <?php }} ?>
            <?php 
                if($paginator['totalPage'] >= 4){
            ?>
                <a class="cursor">...</a>
            <a class="page cursor" id='lastPage'><?php echo $paginator['totalPage'] ?></a>
            <a  class="main_PagingList1_pager_nextControl cursor">»</a>
            <?php } ?>
        </span>
        <div>
            <input id="pageText" type="text" name="" value="" placeholder="Nhập trang">
            <input id="gotoPage" type="button" name="" value="chuyển trang" >
        </div>
    </div>

     <?php }  ?>
</section>
	
</div>
</section>


    <script>



    
    

    function getContent(page){
         var limit = $('#main_PagingList1_pager').attr('limit');         
         var strIdCate = $('#main_PagingList1_pager').attr('strIdCate');
		 var strExcept = $('#main_PagingList1_pager').attr('strExcept');         
         var cateTitle = $('#main_PagingList1_pager').attr('cateTitle');         
         var cateAlias = $('#main_PagingList1_pager').attr('cateAlias');         
         var order = $('#main_PagingList1_pager').attr('order');         
         var by = $('#main_PagingList1_pager').attr('by');         
         var url = baseUrl+'/GetContentCate';
          $.ajax({
            url : url,
            type : "post",
            dateType:"JSON",
            data : {'task':'getcontent','page':page,'limit':limit,'strIdCate':strIdCate,'strExcept':strExcept,'cateTitle':cateTitle,'cateAlias':cateAlias,'order':order,'by':by},
             beforeSend: function() {
                //$('#showContentCate').css('opacity', '0.1');
            },
            success : function (result){

            //console.log(result);
             var result = jQuery.parseJSON(result);
              if(result.status){
                 $('#showContentCate').html(result.info);
             }else{
                 $('#showContentCate').html(result.messages);
             }
               $('#showContentCate').css('opacity', '1');
               //scrollTop(940);
               goToByScroll('contentlistDiv');    
            },error: function() {
               console.log('error');
               $('#showContentCate').css('opacity', '1');
            }   
        });
        
    }
   	
	$('body').on('click', '.showArticleRelation ', function(event) {
		event.preventDefault();
		var idContentMore = $(this).attr('id');
		var stridcate     = $(this).attr('stridcate');
		var tag           = $(this).attr('tag');
		//console.log(idContentMore);
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			//$('section#'+idContentMore).fadeOut(600);
			$('section#'+idContentMore).slideUp(600);
		}else{
			//console.log(idContentMore);
			if($(this).hasClass('hasArticle')){
				console.log('da co data.');
				//$('section#'+idContentMore).fadeIn(600);
				$('section#'+idContentMore).slideDown(600);
			}else{
				console.log('chua co data');
				 var url = baseUrl+'/GetArticleRelation';
				 $.ajax({
		            url : url,
		            type : "post",
		            dateType:"JSON",
		            data : {'task':'getArticleRelation','id':idContentMore,'stridcate':stridcate,'tag':tag},
		             beforeSend: function() {
		                //$('#showContentCate').css('opacity', '0.1');
		            },
		            success : function (result){

		           		// console.log(result);
		             	var result = jQuery.parseJSON(result);
						if(result.status){
						 	$('section#'+idContentMore).html(result.info).addClass('show');
						 	setTimeout(function(){ 
						 			//$('section#'+idContentMore).fadeIn(600); 
									$('section#'+idContentMore).slideDown(600);
						 	}, 500);
						}
		            },error: function() {
		               console.log('error');
		            }   
		        });
			}
			$(this).addClass('on hasArticle');
		}
	});	
	
    </script>