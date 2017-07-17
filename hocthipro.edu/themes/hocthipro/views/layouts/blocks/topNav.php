<style>
    ul.child2{
        display: none;
    }
    ul.child li:hover ul.child2{
        display: block;
        position: absolute;
        background: #15a1b1;
        width: 200px;
        top: 0px;
        left: 100%;
        border-left:2px solid #fff;
    }
    ul.child li ul.child2 li:hover a{
        width: 100%;
        background: #0f8e9c;
    }
    .navigation.top{
        background: rgba(255, 255, 255, 0);
        
    }
    .navigation.top>div>ul{
        margin-left: 40px;
    }   
    .navigation.top li.parent>a{
        color: #cacaca;
    }
    .navigation.top li.parent:hover>a{
        background: initial;
        color: red;
    }
    .navigation.top li.parent.active>a{
        background: rgba(255, 255, 255, 0);
        color: #d00505;
    }
</style>
<nav class="navigation top">

        <div class="header-wrap">
            <ul id="nav">
                <li class="topMenu parent " id="tin-tuc">
                    <a href="<?php echo Yii::app()->request->baseUrl ?>/tin-tuc.htp"><i class="spr"></i>Tin Tức</a>
                </li>
                <li class="topMenu parent "  id="tuyen-sinh-huong-nghiep">
                    <a href="<?php echo Yii::app()->request->baseUrl ?>/tuyen-sinh-huong-nghiep.htp"><i class="spr"></i>Tuyển sinh - Hướng nghiệp</a>
                </li>
                <li class="topMenu parent " id="khoa-hoc">
                    <a href="<?php echo Yii::app()->request->baseUrl ?>/khoa-hoc.htp"><i class="spr"></i>Khóa học</a>
                </li>
                <li class="topMenu parent active" id="dien-dan">
                    <a href="<?php echo Yii::app()->request->baseUrl ?>/dien-dan.htp"><i class="spr"></i>Diễn đàn</a>
                </li>
                <li class="topMenu parent" id="thu-vien">
                    <a href="<?php echo Yii::app()->request->baseUrl ?>/thu-vien.htp"><i class="spr"></i>Thư viện</a>
                </li>
                <li class="topMenu parent" id="diem-chuan">
                    <a href="<?php echo Yii::app()->request->baseUrl ?>/diem-chuan.htp"><i class="spr"></i>Điểm chuẩn</a>
                </li>
                <li class="topMenu parent" id="tra-cuu-diem-thi">
                    <a href="<?php echo Yii::app()->request->baseUrl ?>/tra-cuu-diem-thi.htp"><i class="spr"></i>Tra cứu điểm thi</a>
                </li>
                <li class="topMenu parent" id="dong-hanh-cung-mua-thi">
                    <a href="<?php echo Yii::app()->request->baseUrl ?>/dong-hanh-cung-mua-thi.htp"><i class="spr"></i>Đồng hành mùa thi</a>
                </li>
                
            </ul>
        </div>
    </nav>

    <script>
        $('body').on('click', 'li.topMenu', function() {
           var topMenu = $(this).attr('id');
            if (window.sessionStorage) {
                sessionStorage.setItem("topMenu", topMenu);
            }
        });
        $('body').on('click', '.logo', function() {
            topMenu = "tin-tuc";
            if (window.sessionStorage) {
                sessionStorage.setItem("topMenu", topMenu);
            }
        });
        topMenu = sessionStorage.getItem("topMenu");
        if(!sessionStorage['topMenu']){
            topMenu = "tin-tuc";
        }
        $('li.topMenu').removeClass('active');
        $('li.topMenu#'+topMenu).addClass('active');
    </script>