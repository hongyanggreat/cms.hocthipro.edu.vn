<header id="site-header">
    <?php //include( 'topNav.php') ?>
    <div class="header-wrap">
        <h1><a href="<?php echo Yii::app()->getBaseUrl(true) ?>" class="logo" title="Học thi pro"></a></h1>
        <div class="hdr-content ">
            <p class="top-keywords" data-track="topkeywords"></p>
            <?php 
                if(isset($_POST['keyword']) && trim($_POST['keyword'] !="")){
                     $keyword = str_replace(' ', '-', trim($_POST['keyword']));
                     
                    $linkaction=  Yii::app()->request->baseUrl.'/tim-kiem/'.$keyword.'.html';
                }
                $linkDiemChuan =  Yii::app()->request->baseUrl.'/diem-chuan.html';
            ?>

            <form class="search-box" action="<?php echo isset($linkaction)?$linkaction:'' ?>" method="POST">
                <input type="text" name="keyword" id="keyword" class="search-keyword" placeholder="Nhập thông tin tìm kiếm"  value="<?php echo isset($_POST['keyword'])?trim($_POST['keyword']):'' ?>"/>
                <button type="submit" id="searchKeyword" ><i class="spr spr-search"></i></button>
            </form>
            <style>
                #site-header .button-area{
                    margin-right: 210px;
                    width: 129px;
                }
                #site-header .button-area a{
                    width: auto;
                }
            </style>
            <div class="button-area">
                <a href="<?php echo $linkDiemChuan ?>" class="hot" data-track="btn-tin-nong"><i class="spr spr-hot"></i><span>Điểm chuẩn</span></a>
            </div>
        </div>
    </div>
    <?php include( 'zendChat/index.php') ?>
    <?php include( 'mainNav.php') ?>
</header>
<!--  onfocus="if (this.value == this.defaultValue)
                                       this.value = '';" onblur="if (this.value == this.defaultValue || this.value == '')
                                                   this.value = this.defaultValue"  -->
