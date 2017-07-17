

 <?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class Helper extends CApplicationComponent
{
	function timeText($timeAt,$str = false){
		$timeNow = time();
		$t = $timeNow - $timeAt;
		// khai bao gia tri ban dau
		$s = 0;
		$m = 0;
		$h = 0;
		$d = 0;
		$y = 0;

		if($t < 60){
			$s = $t; // so giay la 40s 
			$message =  $s.' giây';
			return $message ;
		}else if($t >= 60 && $t < 3600){
			$m = floor($t/60); //so phut la : 1 phut
			$s = $t-($m*60); //so giay la 100-(1*60) = 40
			if($str){
				$message =  $m.' phút '.$s.' giây trước';
			}else{
				$message =  $m.' phút trước';
			}
			return  $message ;
			//return  $message =  $m.' phút '.$s.' giây trước';
		}else if($t >= 3600 && $t < 86400){
			$h = floor($t/(60*60));  //so gio la : 3700/(60*60)
			$t = $t- ($h*60*60); //so giay con lai la 3700 - (1*60*60) = 100s
			$m = floor($t/60); //so phut la :100/60 = 1 phut 
			$s = $t-($m*60); //so giay la 100-(1*60) = 40 giây
			//$message = $h.' giờ';

			if($str){
				$message =  $h.' giờ '.$m.' phút trước';
			}else{
				$message =  $h.' giờ trước';
			}
			return $message;
			//return $message = $h.' giờ '.$m.' phút '.$s.' giây trước';
		}else if($t >= 86400){
			$d = floor($t/(24*60*60));  //so ngay la : 87400/(24*60*60) = 1 ngay
			$t = $t- ($d*24*60*60); //so giay con lai la 87400 - (1*24*60*60) = 1000s
			$h = floor($t/(60*60));  //so gio la : 1000/(60*60) = 0;
			$t = $t- ($h*60*60); //so giay con lai la 1000 - (0*60*60) = 1000s
			$m = floor($t/60); //so phut la :1000/60 = 16 phut 
			$s = $t-($m*60); //so giay la 1000-(16*60) = 40 giây
			if($str){
				$message =  $d.' ngày '.$h.' giờ trước';
			}else{
				$message =  $d.' ngày trước';
			}
			return $message;
			//return $message = $d.' ngày '.$h.' giờ '.$m.' phút '.$s.' giây trước';
		}
	}
	function text_limit($str,$limit=10,$dots,$seeMore = null)
	 {

		 if(stripos($str," ")){
		 	$ex_str = explode(" ",$str);
		 	if(count($ex_str)>$limit){

		 		$str_s ='';
			 	for($i=0;$i<$limit;$i++){
				 	$str_s.=$ex_str[$i]." ";
		 		}

		 		$dot ="";
		 		for ($i=0; $i < $dots; $i++) { 
		 			$dot .= ".";
		 		}
		 		$str_s .= $dot .$seeMore;
			 	return $str_s;
			 }else{
			 	return $str;
			 }	
		 }else{
		 	return $str;
		 }
	 }


	 function mysubstr($str, $length, $minword = 3)
		{
		$sub = '';
		$len = 0;
		foreach (explode(' ', $str) as $word)
		{
		    $part = (($sub != '') ? ' ' : '') . $word;
		    $sub .= $part;
		    $len += strlen($part);
		    if (strlen($word) > $minword && strlen($sub) >= $length)
		    {
		      break;
		    }
		 }
		    return $sub . (($len < strlen($str)) ? '...' : '');
		}
	 

	
	 function getImage($path, $image,$thumb = false,$missImg = 'hocthipro_miss.png'){
		  
		if($thumb){
			$file = $img =  Yii::app()->params['media'].$path.'thumbs/'.$image;
		}else{
			$file = $img =  Yii::app()->params['media'].$path.$image;
		}
                                   
        $file_headers = @get_headers($file);
        if(!$file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found' || empty($image)) {
			$img =  Yii::app()->params['media'].'/errors/'.$missImg;
        }
        return $img;
	 }
	
	 function getImageNew($options){
		
        $img = $options['pathImage'] . $options['image'];
        $file_headers = @get_headers($img);
        if(!$file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found' || $options['image'] == '') {
		 	$img = Yii::app()->params['media'].'/errors/hocthipro_miss.png';
        }
        return $img;
	 }
	
	function rate($num,$key){
		for ($i=0; $i < ($num - $key) ; $i++) { 
			echo '<i class="fa fa-star" aria-hidden="true"></i> '; 
		}
		for ($i=0; $i < $key; $i++) { 
				echo '<i class="fa fa-star unStar" aria-hidden="true"></i> ';
		}
	}

	public  function  RandomString($length = 10) {
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}
	public  function  RandomNumber($length = 10) {
	    $characters = '0123456789';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}
	public  function  RandomNumberBoolean($length = 10) {
	    $characters = '01';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}
	public function validateImage($ext,$extension = array("jpg", "jpeg", "png","JPG")){

		if (in_array($ext, $extension)){
			return 'true';
		}else{
			return 'Không đúng định dạng file yêu cầu';
		}

	}
	public function array_same($arr1,$arr2){
		$check = 0;

		$result  = array_diff($arr1,$arr2);
		$result2 = array_diff($arr2,$arr1);

		if($result){
			$check = 1;
		}
		if($result2){
			$check = 1;
		}

		if($check == 0){
			return true;
		}else{
			return false;
		}
		
	}
	public function utf8convert($str) {
      if(!$str) return false;
      $utf8 = array(
            'a'=>'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ|Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
            'd'=>'đ|Đ',
            'e'=>'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
            'i'=>'í|ì|ỉ|ĩ|ị|Í|Ì|Ỉ|Ĩ|Ị',
            'o'=>'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ|Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
            'u'=>'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
            'y'=>'ý|ỳ|ỷ|ỹ|ỵ|Ý|Ỳ|Ỷ|Ỹ|Ỵ',
                  );
      foreach($utf8 as $ascii=>$uni) $str = preg_replace("/($uni)/i",$ascii,$str);
      return $str;
	}
	public function removeSpace($str){
		$str = explode ( ' ' , $str);
		$ok = [];
		foreach($str as $item){
			if($item ==''){
			    $rong=$item;
			}else{
			    $ok[]=$item;
			}
		}
		return $str = implode('-', $ok);
	}
	public function changTitle($changTitle){
				
	            $changTitle =  preg_replace('/([^\pN\pL\ ]+)/u', '', strip_tags($changTitle));  
	            $changTitle = explode ( ' ' , $changTitle);
	            foreach($changTitle as $item){
	                  if($item ==''){
	                        $rong=$item;
	                  }else{
	                        $ok[]=$item;
	                  }
	            }
	            $changTitle = implode('-', $ok);
	            $changTitle = strtolower($changTitle);
	            $changTitle = $this->utf8convert($changTitle);
	           

	            return $changTitle;
	}
	public function checkDevice(){
		$flash = false;
		$useragent=$_SERVER['HTTP_USER_AGENT'];
	    if(preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4))){

	        //$mLinkUrl = 'http://dev.hocthipro.vn';
	        //$this->redirect($mLinkUrl.$link) ;  
	        $flash = true;
	    }
	    return $flash;
	}

}


