<section id="photo-box" data-track="|video">
    <header>
        <h6>
<a class="cursor">Video Hot</a>
</h6>
    </header>
    <div class="bx-wrapper" >
        <div class="bx-viewport" aria-live="polite">
            <div class="bx-wrapper">
                <div class="bx-viewport" aria-live="polite" >
                    <div class="slider" id="slideHotVideo" >
                   
                        <?php 
                        	if(isset($topNews) && count($topNews) > 0){
                                foreach ($topNews as $key => $value) {
	                                array_push($arrTop, $value['ID']);
	                               
	                                //$img = 'http://baomoi-photo-3.d.za.zdn.vn/w205/17/02/09/4/21495089/1_32273.jpg';

	                                $id = $value['ID'];
	                                $img = Yii::app()->helper->getImage('/uploads/content/',$value['IMAGE']);
	                                
	                                $cate = yii::app()->contentComponent->getCate($value['NEWS_CATE_ID']);
	                                $cateTitle = $cate['NEWSCATE_NAME'];
	                                $linkCate = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'.html';
	                                
	                                $title = $value['TITLE'];
	                                $link = Yii::app()->request->baseUrl.'/'.$cate['ALIAS'].'/'.$value['ALIAS'].'.html';

	                                $time = date('d-m-Y',$value['CREATED_AT']);
	                               
	                                if($key == 0){
	                                    $active = ' active';
	                                }else{
	                                    $active = '';
	                                }
                         ?>
                        <article class="hotVideo<?php echo $active?>" data-aid="21508262" >
                        	<figure>
                                <a href="<?php echo $link?>">
                                    <img src="<?php echo $img?>" alt="<?php echo $title?>">
                                </a>
                            </figure>
                            <header>
                                <h2><a href="<?php echo $link?>" title="<?php echo $title?>"><?php echo $title?></a></h2>
                                <p class="meta">
                                    <a href="<?php echo $linkCate?>"><?php echo $cateTitle?></a>
                                    <time class="friendly" datetime="2017-02-10T15:19:00+07:00"><?php echo $time?></time>
                                    <span>
										<i class="spr video-icon"></i>
										<a href="<?php echo $link?>" title="<?php echo $title?>" class="spr spr-more" target="_blank"><?php echo $title?></a>
									</span>
                                </p>
                            </header>
                        </article>
                         <?php } } ?>
                    </div>
                </div>
            </div>
        </div>
         <div class="bx-controls bx-has-controls-direction">
		    <div class="bx-controls-direction">
		    	<a class="bx-prev" href="">Prev</a>
		    	<a class="bx-next" href="">Next</a>
		    </div>
		</div>
    </div>
</section>
<script>
	$('body').on('click', '.bx-controls-direction a', function(event) {
		event.preventDefault();
		var direction = $(this).attr('class');
		//console.log(direction);
		if(direction == "bx-prev"){
			$('#slideHotVideo .hotVideo.active').prev().addClass('active checkIn');
			$('.checkIn').siblings().removeClass('active');
			$('#slideHotVideo .hotVideo.active').removeClass('checkIn');
		}else{

			$('#slideHotVideo .hotVideo.active').next().addClass('active checkIn');
			$('.checkIn').siblings().removeClass('active');
			$('#slideHotVideo .hotVideo.active').removeClass('checkIn');
		}
	});
	
</script>