    <footer id="site-footer">
        <a href="/" class="logo" title="Học thi pro "></a>
        <form class="search-box" action="" method="POST">
            <input type="text" name="keyword" id="keyword" value="<?php echo isset($_POST['keyword'])?trim($_POST['keyword']):'' ?>" class="search-keyword" placeholder="Nhập nội dung tìm kiếm"/>
            <button type="submit" ><i class="spr spr-search"></i></button>
        </form>
        <section class="site-index ">
            <div>
                <h3>PHIÊN BẢN KHÁC</h3>
                <ul>
                    <li><a href="" target="_blank">Học thi Pro APPS</a>
                    </li>
                    <li><a target="_blank" href="">Học thi Pro ENGLISH</a>
                    </li>
                    <li><a target="_blank" href="">Học thi Pro BLOG</a>
                    </li>
                </ul>
            </div>
            <div>
                <h3>LIÊN HỆ</h3>
                <ul>
                    <li><a href="">Giới thiệu</a>
                    </li>
                    <li><a href="">Điều khoản sử dụng</a>
                    </li>
                    <li><a href="" target="_blank">Quảng cáo</a>
                    </li>
                </ul>
            </div>
            <div>
                <h3>NGƯỜI DÙNG</h3>
                <ul>
                    <li><a href="">Nhúng tin vào trang web</a>
                    </li>
                    <li><a href="" target="_blank">Thống kê & So sánh</a>
                    </li>
                </ul>
            </div>
        </section>
        <div class="copyright">
            <hr>
            <div class="left">
                <p> HOC THI PRO nơi dành cho cộng đồng học tập
                    <br> và cập nhật tin tức
                    <br> được biên tập chất lượng và hiệu quả nhất</p>
            </div>
            <div class="right">
                <p>Phiên bản thử nghiệm.</p>
                <!-- <p>Giấy phép số XXXX/GP-TTĐT do Sở Thông tin và Truyền thông Hà Nội cấp.</p>
                <p>Đơn vị chủ quản: Công ty Cổ phần XXXX * Chịu trách nhiệm: XXXX</p>
                <p>Địa chỉ: Tầng 7, Tòa nhà XXXX, D29 XXXX, Yên Hòa, Cầu Giấy, Hà Nội</p>
                <p> Tel: (04) 6-xxx-xxxx ext. xxxx .Email : xxxx.com.vn </p> -->
            </div>
        </div>
    </footer>
    <script type="text/javascript" src="<?php echo Yii::app()->getBaseUrl() ?>/assets/hocthipro/js/panigator.js?v=1.0.2"></script>

       
    <style>
        .scrollToTop{
            position: fixed;
            /* bottom: 10px; */
            bottom: 30px;
            right: 15px;
            border: 1px solid #ccc;
            padding: 5px;
            cursor: pointer;
            display: none;
        }
    </style>
<div style="height: 50px;width: 100%;position: relative;">
    <div class="scrollToTop">Lên đầu</div>
</div>
</body>

</html>