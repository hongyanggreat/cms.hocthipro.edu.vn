<?php 
/*$videoHot = Yii::app()->session['videoHot'];

if(!$videoHot){
	Yii::app()->session['videoHot'] = $videoHot;
}*/
$videoHot = Yii::app()->contentComponent->getVideo(10);
if(isset($videoHot) && count($videoHot) > 0){
 ?>

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
                        	
                                foreach ($videoHot as $key => $value) {

	                                $id = $value['ID'];
	                                $img = Yii::app()->helper->getImage('/youtube/',$value['IMAGE']);
	                                $title = $value['TITLE'];
	                                $link = Yii::app()->request->baseUrl.'/video/'.$value['ALIAS'].'.html';
	                                $time = date('H:i:s d-m-Y',$value['CREATED_AT']);
	                               
	                                if($key == 0){
	                                    $active = ' active';
	                                    $intro = '<iframe src="http://www.youtube.com/embed/'.$value['LINK'].'?modestbranding=1&amp;controls=2&amp;autoplay=0&amp;title=0" frameborder="0" width="100%" height="100%" allowfullscreen=""></iframe>';
	                                }else{
	                                    $active = '';
	                                    $intro = '<img src="'.$img.'" alt="'.$title.'"/>';
	                                }
                         ?>
                        <article class="hotVideo<?php echo $active?>" data-aid="21508262" >
                        	<figure>
                                <a class="showVideo">
                                    <?php echo $intro?>
                                </a>
                            </figure>
                            <header>
                                <h2><a href="<?php echo $link?>" title="<?php echo $title?>"><?php echo $title?></a></h2>
                                <p class="meta">
                                    <a >Video hot trong ngày</a>
                                    <time class="friendly" datetime="2017-02-10T15:19:00+07:00"><?php echo $time?></time>
                                    <span>
										<i class="spr video-icon"></i>
										<a href="<?php echo $link?>" title="<?php echo $title?>" class="spr spr-more" target="_blank"><?php echo $title?></a>
									</span>
                                </p>
                            </header>
                        </article>
                         <?php  } ?>
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

 <?php  } ?>