
<?php 
    if(isset($contentVideoNext) && count($contentVideoNext) > 0){
 ?>

<section class="top-story moreVideo">
    <style>
        .newHot{
            cursor: pointer;
        }
        .top-story.moreVideo .tab-content{
             min-height: auto;
        }
        .top-story.moreVideo article{
            margin-bottom: 0px;
            border-bottom: 0px solid #E6E6E6; 
        }
        .top-story article header{
            margin-left: 5px;
        }
        .top-story.moreVideo article:before{
            counter-increment: section;
            content: "";
            width: 0px;
            height: 0px;
            line-height: 34px;
            border-radius: 17px;
            font-size: 20px;
            font-size: 32px;
            font-size: 2rem;
            background-color: #ddd;
            display: inline-block;
            font-weight: 700;
            text-align: center;
            float: left;
            color: #383838;

        }
    </style>
    <ul class="tab-header">
        <li class="newHot active" id="most-read"><a data-toggle="tab-most-read">Video Tiếp Theo</a>

        </li>
        <li class="newHot" id="most-read-more"><a data-toggle="tab-most-read-more">Video vừa xem</a>
        </li>
    </ul>
    <div id="top-story" class="tab-content">
        <div class="tab-pane active" id="most-read" data-track="|mostread">
                <?php 
                   foreach ($contentVideoNext as $key => $value) {
                        $img =  Yii::app()->helper->getImage('/youtube/', $value['IMAGE']);
                        $title = $value['TITLE'];
                        $link = Yii::app()->request->baseUrl.'/video/'.$value['ALIAS'].'.html';
                        $time = date('H:i:s d-m-Y',$value['CREATED_AT']);
                        $view = number_format($value['VIEW'],'0',',','.');
                 ?>
            
                <article class="" data-aid="21508262">
                   <style>
                       .imageVideo{
                            height: 150px;
                            width: 100%;
                            display: block;
                            margin-bottom: 7px;
                       }
                   </style>
                    <header>
                        <div class="cursor imageVideo" style="background: url(<?php echo $img ?>);background-repeat: no-repeat;background-position: center;background-size: cover;"></div>
                        <h2><a class="cursor"  href="<?php echo $link ?>" title="<?php echo $title ?>"><?php echo $title ?></a></h2>
                        <p class="meta">
                            <a>Số lượt xem : <?php echo $view ?> view</a>
                            <time class="friendly" datetime="2017-02-10T15:19:00+07:00"><?php echo $time ?></time>
                            <span>
                                <i class="spr video-icon cursor"></i>
                                <a href="<?php echo $link ?>" title="<?php echo $title ?>" class="spr spr-more" target="_blank"><?php echo $title ?></a>
                            </span>
                        </p>
                    </header>
                </article>  
            <?php } ?>
        </div>
        <div class="tab-pane " id="most-read-more" data-track="|mostread7">
            
            <article data-aid="257">
                
                <header>
                    <h2><a href="/duongnh/hocthipro/tai-chinh/nam-2017-luot-song-bat-dong-san-con-co-hoi-khong.html" target="_blank">Năm 2017, lướt sóng bất động sản còn cơ hội không?</a></h2>
                    <p class="meta"><a href="/duongnh/hocthipro/tai-chinh.html">Tài Chính</a>
                        <time class="friendly" datetime="1486623600">18-02-2017</time><span><a class="spr spr-cache cache" href="/duongnh/hocthipro/tai-chinh/nam-2017-luot-song-bat-dong-san-con-co-hoi-khong.html"></a></span>
                    </p>
                </header>
            </article> 

            
            <article data-aid="256">
                
                <header>
                    <h2><a href="/duongnh/hocthipro/van-hoa/7-loi-khuyen-cho-nhung-ai-muon-du-lich-sang-chanh.html" target="_blank">7 lời khuyên cho những ai muốn du lịch 'sang chảnh'</a></h2>
                    <p class="meta"><a href="/duongnh/hocthipro/van-hoa.html">Văn hóa</a>
                        <time class="friendly" datetime="1486623600">18-02-2017</time><span><a class="spr spr-cache cache" href="/duongnh/hocthipro/van-hoa/7-loi-khuyen-cho-nhung-ai-muon-du-lich-sang-chanh.html"></a></span>
                    </p>
                </header>
            </article> 

            
            <article data-aid="255">
                
                <header>
                    <h2><a href="/duongnh/hocthipro/xa-hoi/cong-nghe-24h-grabcar-bi-tu-choi-thi-diem-tai-da-nang.html" target="_blank">Công nghệ 24h: GrabCar bị từ chối thí điểm tại Đà Nẵng</a></h2>
                    <p class="meta"><a href="/duongnh/hocthipro/xa-hoi.html">Xã hội</a>
                        <time class="friendly" datetime="1486623600">17-02-2017</time><span><a class="spr spr-cache cache" href="/duongnh/hocthipro/xa-hoi/cong-nghe-24h-grabcar-bi-tu-choi-thi-diem-tai-da-nang.html"></a></span>
                    </p>
                </header>
            </article> 

            
            <article data-aid="254">
                
                <header>
                    <h2><a href="/duongnh/hocthipro/kinh-doanh/thanh-long-ruot-do-lam-giau-cho-nguoi-dan-lap-thach.html" target="_blank">Thanh long ruột đỏ làm giàu cho người dân Lập Thạch</a></h2>
                    <p class="meta"><a href="/duongnh/hocthipro/kinh-doanh.html">Kinh doanh</a>
                        <time class="friendly" datetime="1486623600">17-02-2017</time><span><a class="spr spr-cache cache" href="/duongnh/hocthipro/kinh-doanh/thanh-long-ruot-do-lam-giau-cho-nguoi-dan-lap-thach.html"></a></span>
                    </p>
                </header>
            </article> 

            
            <article data-aid="253">
                
                <header>
                    <h2><a href="/duongnh/hocthipro/kinh-doanh/tru-tri-quyen-luc-o-thai-lan-thu-nap-tin-do-kieu-da-cap.html" target="_blank">Trụ trì quyền lực ở Thái Lan thu nạp tín đồ kiểu đa cấp</a></h2>
                    <p class="meta"><a href="/duongnh/hocthipro/kinh-doanh.html">Kinh doanh</a>
                        <time class="friendly" datetime="1486623600">17-02-2017</time><span><a class="spr spr-cache cache" href="/duongnh/hocthipro/kinh-doanh/tru-tri-quyen-luc-o-thai-lan-thu-nap-tin-do-kieu-da-cap.html"></a></span>
                    </p>
                </header>
            </article> 

            
            <article data-aid="252">
                
                <header>
                    <h2><a href="/duongnh/hocthipro/kinh-doanh/nghien-cuu-nang-cao-nang-luc-he-thong-bao-mat-thong-tin.html" target="_blank">Nghiên cứu nâng cao năng lực hệ thống bảo mật thông tin</a></h2>
                    <p class="meta"><a href="/duongnh/hocthipro/kinh-doanh.html">Kinh doanh</a>
                        <time class="friendly" datetime="1486623600">17-02-2017</time><span><a class="spr spr-cache cache" href="/duongnh/hocthipro/kinh-doanh/nghien-cuu-nang-cao-nang-luc-he-thong-bao-mat-thong-tin.html"></a></span>
                    </p>
                </header>
            </article> 
         </div>
    </div>
</section>

<?php 
   }
 ?>