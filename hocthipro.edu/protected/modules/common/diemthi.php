
<section id="photo-box" class="boxTimTruong" data-track="|video">
    <header style="background:#1a9622">
        <h6>
			<a class="cursor">Tra cứu điểm chuẩn các trường ĐH-CĐ</a>
		</h6>
    </header>

    <link rel="stylesheet" href="../assets/hocthipro/diemchuan/css/myStyle.css?v=1.0.1">
    <form method="post" name="searchSchool">

	    <div class="bx-wrapper" >
	        <div class="bx-viewport" aria-live="polite">
	            <div class="bx-wrapper">
	                <div class="bx-viewport" aria-live="polite" >
	                    <div class="slider" id="findSchool" >
	                   
	                        <!-- <h4>Đã có <span style="color:red;font-weight:bold"><b>214</b></span> trường công bố điểm chuẩn năm 2016</h4> -->
	                     
	                       
					        <div class="schol-fiter  bottom25 clearfix">
					        	<div class="list-fiter fr">
							        <ul class="list_style">
							            <li>
							                <strong class="clblue2">Tìm kiếm theo:</strong>
							                <br/>
							                <select class="option choice"  name="yearBenchMark" style="width:35%">
							                     <?php 
	                                                $year = 2016;
	                                                for ($i=0; $i <=7 ; $i++) {
	                                                    $textYear = $year-$i; 
	                                                    echo ' <option value="'.$textYear.'">Năm '.$textYear.'</option>';  
	                                                }
	                                             ?>
							                </select>
							                <input type="hidden" id="yearSearch" value="<?php echo $year ?>">
							                <select class="option choice"  name="typeSchool" style="width:60%">
							                    <option value="">--Loại trường--</option>
							                    <option value="2">Cao đẳng</option>
							                    <option value="3">Đại học</option>
							                    <option value="4">Học Viện</option>
							                </select>
							            </li>
							             <li>
							                <select class="option choice" name="matinh_School" style="width:60%">
												<option value ="">--Tỉnh/TP--</option>
												<?php 


												 /*	
												// Sử dụng memcache
												 if(Yii::app()->cache->get('htp_provinces')){
												       $provinces =  Yii::app()->cache->get('htp_provinces');
												       //Yii::app()->cache->delete('htp_provinces');
												    }else{
												       $model = new TblProvince;
												       $options = [
												       				'task'=>'public',
												       				'select'=>'*',
												       				'order'=>'ID',
												       				'by'=>'ASC',
												       				];
												       $provinces = $model->getData($options);
												       Yii::app()->cache->set('htp_provinces',$provinces);
												    }*/

												   /*$model = new TblProvince;
											       $options = [
											       				'task'=>'public',
											       				'select'=>'*',
											       				'order'=>'ID',
											       				'by'=>'ASC',
											       				];
											       $provinces = $model->getData($options);*/
												 	if(isset($provinces) && count($provinces)>0){
												 		foreach ($provinces as $key => $value) {
												 			echo '<option value ="'.$value['CODE'].'">'.$value['TYPE'].' '.$value['NAME'].'</option>';
												 		}
												 	}
												 ?>
							                </select>
							                <select  class="option choice" name="examBlock" style="width:35%">
												<option value ="">Khối thi</option>
												<option value ="A">Khối A</option>
												<option value ="B">Khối B</option>
												<option value ="C">Khối C</option>
												<option value ="D">Khối D</option>
												<option value ="D1">Khối D1</option>
												<option value ="D2">Khối D2</option>
												<option value ="D3">Khối D3</option>
												<option value ="D4">Khối D4</option>
												<option value ="D5">Khối D5</option>
												<option value ="D6">Khối D6</option>
												<option value ="H">Khối H</option>
												<option value ="M">Khối M</option>
												<option value ="N">Khối N</option>
												<option value ="N1">Khối N1</option>
												<option value ="T">Khối T</option>
												<option value ="K">Khối K</option>
												<option value ="R">Khối R</option>
												<option value ="R1">Khối R1</option>
												<option value ="R2">Khối R2</option>
												<option value ="R3">Khối R3</option>
												<option value ="V">Khối V</option>
												<option value ="A1">Khối A1</option>
							                </select>
							            </li>
							            <li>
											<strong class="clblue2">Chọn trường:</strong>
											<input type="text" name="keywordSchool" style="width:100%"  value="" placeholder="Nhập tên trường hoặc mã trường">
							            </li>
							            <li>
							            	<strong class="clblue2">Sắp Xếp theo:</strong>
								            <span>
								            	<select style="width:67%;margin: 5px 0px 5px 5px;" class="option" name="sort_type">
								                    <option value="">--Sắp xếp theo--</option>
								                    <option value="1">Tên trường theo thứ tự ABC</option>
								                    <option value="2">Mã trường theo thứ tự ABC</option>
								                </select>
								            </span>
							            </li>
							        </ul>
							       
							    </div>

							
							</div>
					         <div align="center">
					            <input type="button" value="Làm mới" class="btn-search resetSearch"/> 
					            <input type="button" value="Tìm kiếm" class="btn-search searchShool"/> 
					        </div>
					        <div class="list-schol fl showListSchool">
						        <ul class="list_style" id="benchmarking">
						            <?php 
						            /*	if(Yii::app()->cache->get('htp_University')){
									       $universities =  Yii::app()->cache->get('htp_University');
									    }else{
									       $model = new TblUniversities;
									       $options = [
									       				'task'=>'public',
									       				'select'=>'ID,CODE, NAME, NAME_ASCII, REGION, STATUS, EXAM_BLOCK, ADDRESS',
									       				'order'=>'NAME',
									       				'by'=>'ASC',
									       				];
									       $universities = $model->getData($options);
									       Yii::app()->cache->set('htp_University',$universities);
									    }*/
									     $model = new TblUniversities;
									       $options = [
									       				'task'=>'public',
									       				'select'=>'ID,CODE, NAME, NAME_ASCII, REGION, STATUS, EXAM_BLOCK, ADDRESS',
									       				'order'=>'NAME',
									       				'by'=>'ASC',
									       				];
									       $universities = $model->getData($options);
									    if(isset($universities) && count($universities) >0){
											foreach ($universities as $key => $value) {
												$alias = Yii::app()->helper->changTitle($value['NAME_ASCII']);
												$link = Yii::app()->getRequest()->getHostInfo().'/diem-chuan/'.$alias.'-htp'.$value['CODE'].'-n'.$year.'.html';
												echo '<li><a title="" href="'.$link.'"><strong class="clblue2">'.$value['CODE'].'</strong> - '.$value['NAME'].'</a></li>';
											}
										}
						             ?>
						        </ul>
						    </div>

	                    </div>
	                </div>
	            </div>
	        </div>
	        
	    </div>
    </form>
</section>
<script src="/assets/hocthipro/diemchuan/js/myScript.js?v=1.1.8"></script>