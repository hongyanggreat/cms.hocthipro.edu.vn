<!DOCTYPE html>

<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="vi" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8" lang="vi" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9" lang="vi" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" xmlns="http://www.w3.org/1999/xhtml">
<!--<![endif]-->
<?php 
    include('common/params.php');
    include('blockMobile/head.php');
 ?>

<body>
    <header id="site-header">
        <div class="site-wrap">
            <h1><a href="/" class="logo" title="Báo Mới"></a></h1>
            <div class="fake-btn">
                <a id="social-login" data-animation="none" data-animationspeed="0" data-reveal-id="login-modal"><i class="spr spr-account"></i><span></span></a>
                <a class="search"><i class="spr spr-search"></i></a>
                <a class="go-desktop" data-target-host="/"><i class="spr spr-desktop"></i></a>
            </div>
        </div>
        <div class="hdr-content">
            <div class="site-wrap">
                <div class="profile-zone">
                    <ul>
                        <li class="recommend"><a>Đề xuất<i class="spr spr-suggest"></i></a>
                        </li>
                        <li class="logout"><a>Đăng xuất<i class="spr spr-logout"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="site-wrap">
                 <?php 
                    if(isset($_POST['keyword']) && trim($_POST['keyword'] !="")){
                         $keyword = str_replace(' ', '-', trim($_POST['keyword']));
                         
                         $linkaction =  Yii::app()->request->baseUrl.'/tim-kiem/'.$keyword.'.html';
                    }
                    $linkDiemChuan =  Yii::app()->request->baseUrl.'/diem-chuan.html';
                ?>
                <form class="search-zone" action="<?php echo isset($linkaction)?$linkaction:'' ?>" method="POST">
                    <input type="text" class="search-keyword" placeholder="Từ khóa">
                    <button class="search-btn">Tìm kiếm</button>
                </form>
              <script>
                   $('body').on('click keyup change', '.search-keyword', function(event) {
                            var baseUrl = window.location.origin;

                            var keyword = $(this).val();
                            keyword = keyword.trim().replace(/[",!@#$%^&*().]/gi, '').replace(/ /g,'-');
                            keyword = makeSortString(keyword);
                           //alert(keyword);
                            
                            if(keyword !=""){
                                var linkSearch = baseUrl + '/tim-kiem/'+keyword+'.html';
                                //alert(baseUrl);
                                window.history.pushState('', '', linkSearch);
                                $('form.search-box').attr('action',linkSearch);
                            }else{
                                $('form.search-box').attr('action','');
                            }
                           // getKeyword(keyword);
                        });
                     function makeSortString(s) {
                          if(!makeSortString.translate_re) makeSortString.translate_re = /[áàảãạăắặằẳẵâấầẩẫậÁÀẢÃẠĂẮẶẰẲẴÂẤẦẨẪẬđĐéèẻẽẹêếềểễệÉÈẺẼẸÊẾỀỂỄỆíìỉĩịÍÌỈĨỊóòỏõọôốồổỗộơớờởỡợÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢúùủũụưứừửữựÚÙỦŨỤƯỨỪỬỮỰýỳỷỹỵÝỲỶỸ]/g;
                          var translate = {
                            "á": "a","à": "a","ả": "a","ã": "a","ạ": "a","ă": "a","ắ": "a","ặ": "a","ằ": "a","ẳ": "a","ẵ": "a","â": "a","ấ": "a","ầ": "a","ẩ": "a","ẫ": "a","ậ": "a","Á": "A","À": "A","Ả": "A","Ã": "A","Ạ": "A","Ă": "A","Ắ": "A","Ặ": "A","Ằ": "A","Ẳ": "A","Ẵ": "A","Â": "A","Ấ": "A","Ầ": "A","Ẩ": "A","Ẫ": "A","Ậ": "A","đ": "d","Đ": "D","é": "e","è": "e","ẻ": "e","ẽ": "e","ẹ": "e","ê": "e","ế": "e","ề": "e","ể": "e","ễ": "e","ệ": "e","É": "E","È": "E","Ẻ": "E","Ẽ": "E","Ẹ": "E","Ê": "E","Ế": "E","Ề": "E","Ể": "E","Ễ": "E","Ệ": "E","í": "i","ì": "i","ỉ": "i","ĩ": "i","ị": "i","Í": "I","Ì": "I","Ỉ": "I","Ĩ": "I","Ị": "I","ó": "o","ò": "o","ỏ": "o","õ": "o","ọ": "o","ô": "o","ố": "o","ồ": "o","ổ": "o","ỗ": "o","ộ": "o","ơ": "o","ớ": "o","ờ": "o","ở": "o","ỡ": "o","ợ": "o","Ó": "o","Ò": "o","Ỏ": "o","Õ": "o","Ọ": "o","Ô": "o","Ố": "o","Ồ": "o","Ổ": "o","Ỗ": "o","Ộ": "o","Ơ": "O","Ớ": "O","Ờ": "O","Ở": "O","Ỡ": "O","Ợ": "O","ú": "u","ù": "u","ủ": "u","ũ": "u","ụ": "u","ư": "u","ứ": "u","ừ": "u","ử": "u","ữ": "u","ự": "u","Ú": "U","Ù": "U","Ủ": "U","Ũ": "U","Ụ": "U","Ư": "U","Ứ": "U","Ừ": "U","Ử": "U","Ữ": "U","Ự": "U","ý": "y","ỳ": "y","ỷ": "y","ỹ": "y","ỵ": "y","Ý": "Y","Ỳ": "Y","Ỷ": "Y","Ỹ": "Y","Ỵ": "Y",
                           };
                          return ( s.replace(makeSortString.translate_re, function(match) { 
                            return translate[match]; 
                          }) );
                      }
  
              </script>
            </div>
            <div class="site-wrap">
               <?php include('blockMobile/mainNav.php') ?>
            </div>
            <nav class="nav-hamburger category-zone"></nav>
        </div>
    </header>
    <div class="main ">

    <?php 
        echo $content;
     ?>
        <div class="show-more">
            <span id="main_PagingList1_pager"><a id="main_PagingList1_pager_nextControl" class="next" href="#">Xem thêm</a></span>
        </div>
    </div>
   <?php include('blockMobile/footer.php') ?>
    <div id="login-modal" class="reveal-modal">
        <header>Đăng nhập</header>
        <p>
            <a class="facebook" rel="nofollow" href="#">Đăng nhập tài khoản Facebook</a>
        </p>
        <p>
            <a class="google" rel="nofollow" href="#">Đăng nhập tài khoản Google</a>
        </p>
        <a class="close-reveal-modal">&#215;</a>
    </div>
     <?php 
        $a = true;
        $a = false;
        if($a){
            $file = "hothipro-dist-mobile.js?v=1.0.5";
        }else{
            $file = "hothipro-dist-mobile-myscript.js?v=1.0.1";
        }
      ?>
    <script src="<?php echo Yii::app()->getBaseUrl() ?>/assets/hocthipro/js/<?php echo $file ?>"></script>
</body>

</html>