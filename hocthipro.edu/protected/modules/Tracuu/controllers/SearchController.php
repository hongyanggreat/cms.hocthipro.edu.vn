<?php

class SearchController extends Controller
{
	public function actionIndex()
	{
		$data = [
					'status'=>false,
					//'post'=>$_POST,
					'info'=>'',
					'messages'=>'',
					'notify'=>'Kiểm tra lại các trường chưa đủ điều kiện!',
				];
		/*$_POST = [
						'typeSchool' => '',
						'matinh_School' => '',
						'examBlock' => 'A',
						'keywordSchool' => '',
						'sort_type' => '',
						'task' => 'searchSchool',
				];*/

		
		if(isset($_POST['task']) &&  $_POST['task']=='searchSchool'){
			$model = new TblUniversities;
			$options = [
						'task'          =>'public',
						'select'        =>'CODE, NAME,NAME_ASCII',
						'likeOr'        =>true,
						'like'          =>"CODE",
						'arrParamLike'  =>$_POST['keywordSchool'],
						'like2'         =>"NAME_ASCII",
						'arrParamLike2' =>$_POST['keywordSchool'],
						//'limit'         =>10,
					];
			$options['field'] = 'TYPE';
			if(isset($_POST['typeSchool']) && !empty($_POST['typeSchool'])){
				$options['param'] = $_POST['typeSchool'];
			}else{
				$options['mark'] = "!=";
				$options['param'] = 5;
			}
			if(isset($_POST['matinh_School']) && !empty($_POST['matinh_School'])){
				$options['field2'] = 'MATINH';
				$options['param2'] = $_POST['matinh_School'];
			}
			if(isset($_POST['examBlock']) && !empty($_POST['examBlock'])){
				$options['likeAnd']         = 'EXAM_BLOCK';
				$options['arrParamLikeAnd'] = $_POST['examBlock'];
			}
			if(isset($_POST['sort_type']) && !empty($_POST['sort_type'])){
				switch ($_POST['sort_type']) {
					case '0':
						$options['order'] = 'ID';
						$options['by'] = 'DESC';
						break;
					case '1':
						$options['order'] = 'NAME';
						$options['by'] = 'ASC';
						break;
					case '2':
						$options['order'] = 'CODE';
						$options['by'] = 'ASC';
						break;
					case '3':
						$options['order'] = 'ID';
						$options['by'] = 'DESC';
						break;
					
					default:
						$options['order'] = 'NAME';
						$options['by'] = 'ASC';
						break;
				}
				
			}
			$result = $model->getData($options);
			if(isset($result) && count($result) >0){
				$options = '';
				foreach ($result as $key => $value) {
					$year = $_POST['yearBenchMark'];
					$alias = Yii::app()->helper->changTitle($value['NAME_ASCII']);
					$link = Yii::app()->getRequest()->getHostInfo().'/diem-chuan/'.$alias.'-htp'.$value['CODE'].'-n'.$year.'.html';
					$options .='<li><a title="" href="'.$link.'"><strong class="clblue2">'.$value['CODE'].'</strong> - '.$value['NAME'].'</a></li>';
				}
			}
			$data['info']   = $options;
			$data['status'] = true;
		}
		//echo '<pre>';print_r($result);
		echo json_encode($data);
	}
	public function actionBenchMark()
	{
		$data = [
					'status'=>false,
					//'post'=>$_POST,
					'info'=>'',
					'messages'=>'',
					'notify'=>'Kiểm tra lại các trường chưa đủ điều kiện!',
				];
		
		if(isset($_POST['task']) &&  $_POST['task']=='searchBenchMark'){
			$model = new TblBenchmark;
			$options = [
						'task'   =>'public',
						'select' =>'CODE_SCHOOL, CAREER, EXAM_BLOCK, BRENCHMARK, NOTE,GENDER',
						
						'field'  =>'CODE_SCHOOL',
						'param'  =>$_POST['codeBenchMark'],
						'field1' =>'YEAR',
						'param1' =>$_POST['yearBenchMark'],
						'order'  =>'EXAM_BLOCK',
						'by'     =>'ASC',
					];
			
			$result = $model->getData($options);

			
			$row = '';
			if(isset($result) && count($result) >0){
				foreach ($result as $key => $value) {
					$career = $this->module->career->get('ID',$value['CAREER']);
					switch ($value['GENDER']) {
						case '2':
							$gender = '( Nữ )';
							break;
						case '1':
							$gender = '( Nam )';
							break;
						
						default:
							$gender = '';
							break;
					}
					$row .='<tr>
								<td class ="DSTT_row">'.($key+1).'</td>
								<td class ="DSTT_row">'.$career['CODE'].'</td>
								<td class ="DSTT_row">'.$career['NAME'].' '.$gender.'</td>
								<td class ="DSTT_row">'.$value['EXAM_BLOCK'].'</td>
								<td class ="DSTT_row">'.$value['BRENCHMARK'].'</td>
								<td class ="DSTT_row">'.$value['NOTE'].'</td>
                            </tr>';
				}
			}else{
				$row .='<tr style="border: 1px solid #ccc;">
                            <td colspan="6" style="text-align:center;height:50px;"> <a href="/diem-chuan.html" title="Tra điểm chuẩn DHCD" style="color:#E40001;font-weight:bold;text-align:center;font-size: 14px;">Dữ liệu bạn cần tìm không có! &nbsp;&nbsp;Mời bạn quay lại giao diện điểm chuẩn!</a> </td>
                        </tr>';
			}
			$data['info']   = $row;
			$data['status'] = true;
		}

		//echo '<pre>';print_r($data);
		echo json_encode($data);
	}
	public function actionBenchMarks()
	{
		$data = [
					'status'=>false,
					'post'=>$_POST,
					'info'=>'',
					'messages'=>'',
					'notify'=>'Kiểm tra lại các trường chưa đủ điều kiện!',
				];

		if(isset($_POST['task']) &&  $_POST['task']=='searchBenchMark'){
			$model = new TblBenchmarks;
			$options = [
						'task'   =>'public',
						'select' =>'CODE_SCHOOL,BRANCH_CODE, BRANCH_NAME ,EXAM_BLOCK, BRENCHMARK,YEAR,NOTE',
						'field'  =>'CODE_SCHOOL',
						'param'  =>$_POST['codeBenchMark'],
						'field1' =>'YEAR',
						'param1' =>$_POST['yearBenchMarkSearch'],
						'order'  =>'EXAM_BLOCK',
						'by'     =>'ASC',
					];
			
			
			$result = $model->getData($options);

			
			$row = '';
			if(isset($result) && count($result) >0){
				foreach ($result as $key => $value) {
					
					$row .='<tr>
								<td class ="DSTT_row">'.($key+1).'</td>
								<td class ="DSTT_row">'.htmlspecialchars_decode($value['BRANCH_CODE']).'</td>
								<td class ="DSTT_row">'.htmlspecialchars_decode($value['BRANCH_NAME']).'</td>
								<td class ="DSTT_row">'.htmlspecialchars_decode($value['EXAM_BLOCK']).'</td>
								<td class ="DSTT_row">'.htmlspecialchars_decode($value['BRENCHMARK']).'</td>
								<td class ="DSTT_row">'.htmlspecialchars_decode($value['NOTE']).'</td>
                            </tr>';
				}
			}else{
				$row .='<tr style="border: 1px solid #ccc;">
                            <td colspan="6" style="text-align:center;height:50px;"> <a href="/diem-chuan.html" title="Tra điểm chuẩn DHCD" style="color:#E40001;font-weight:bold;text-align:center;font-size: 14px;">Dữ liệu bạn cần tìm không có! &nbsp;&nbsp;Mời bạn quay lại giao diện điểm chuẩn!</a> </td>
                        </tr>';
			}
			$data['info']   = $row;
			$data['year']   = $_POST['yearBenchMarkSearch'];
			
			$data['status'] = true;
		}

		echo json_encode($data);
	}

	public function actionShowUniversities(){
		$data = [
					'status'=>false,
					'info'=>'',
					'messages'=>'',
					'notify'=>'Kiểm tra lại các trường chưa đủ điều kiện!',
				];

		if(isset($_POST['task']) &&  $_POST['task']=='showUniversities'){

			/*if(Yii::app()->cache->get('htp_University')){
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

		    	$li = '';
		    	$year = $_POST['year'];
				foreach ($universities as $key => $value) {
					$alias = Yii::app()->helper->changTitle($value['NAME_ASCII']);
					$link = Yii::app()->getRequest()->getHostInfo().'/diem-chuan/'.$alias.'-htp'.$value['CODE'].'-n'.$year.'.html';
					$li .= '<li><a title="" href="'.$link.'"><strong class="clblue2">'.$value['CODE'].'</strong> - '.$value['NAME'].'</a></li>';
				}
				$data['info']   = $li;
				$data['status'] = true;
			}
		}
		echo json_encode($data);
	}

}