

<style>
    	.centerBox {
			width: 100%;
			margin: 0 auto;
			margin-bottom: 7px;
			padding: 5px;
    	}
    	.pinkTab{
			padding: 5px;
			border-radius: 3px 3px 0 0;
			text-align: center;
			margin: 0 auto;
            color: #9e057f;
    	}
    	.DSTT_Header_bg {
			background-color: #d3f0b4;
			text-align: center;
			font-weight: bold;
			padding: 5px 3px;
		    border: 1px solid #ccc;
		}
		.DSTT_row {
		    background-color: #ffffff;
		    text-align: center;
		    padding: 5px 5px 5px 5px;
		    border: 1px solid #ccc;
		}
		div.nameSchool{
			color: #9e057f;
			font-weight: bold;
		}
		span.year select{
			margin-left: 5px;
            width: inherit;
		}
		div.infoSchool{
			margin: 10px 0px 5px;
		}
		select[name=" "]{

		}
</style>

<form action="" method="post" name="formInfoBenchMark">
    <div class="centerBox">
            <div class="pinkTab">
                <h2 style="text-decoration: underline;">Kết quả Điểm Chuẩn năm <span id="showYear"><?php echo isset($year)?$year:'???' ?></span></h2>
            </div>
            <div class="infoSchool">
                <div class="nameSchool">
                    <span >Trường: </span><span ><i><?php echo isset($school['NAME'])?$school['NAME']:''; ?></i></span>
                </div>
                <div>
                	<span>Xem điểm chuẩn năm khác </span>
                    <span class="year">
                    	 <select name="yearBenchMark"><!-- class="chosen-select" -->

                            <?php 
                                for ($i=0; $i <=7 ; $i++) {
                                    $select = '';
                                    $textYear = $year-$i; 
                                    if($textYear == $year){
                                        $select = 'selected';
                                    }
                                    echo ' <option value="'.$textYear.'" '.$select.'>Năm '.$textYear.'</option>';  
                                }
                             ?>
                        </select>
                    </span>
                </div>
                <div style="overflow-x:auto;">
                    <table width="100%" cellpadding="1" cellspacing="1" border="0" bgcolor="#fff">
                        <thead>
                            <tr>
                                <input type="hidden" name="codeBenchMark" value="<?php echo isset($school['CODE'])?$school['CODE']:''; ?>">
                                <td colspan="6"><span >Mã trường: </span><span ><?php echo isset($school['CODE'])?$school['CODE']:''; ?></span>
                                </td>
                            </tr>
                            <tr>
                                <td width="20" class="DSTT_Header_bg">STT</td>
                                <td class="DSTT_Header_bg">Mã ngành</td>
                                <td class="DSTT_Header_bg">Tên ngành</td>
                                <td class="DSTT_Header_bg">Khối thi</td>
                                <td class="DSTT_Header_bg">Điểm chuẩn</td>
                                <td class="DSTT_Header_bg" width="70">Ghi chú</td>
                            </tr>
                        </thead>
                        <tbody id="showResultBenchMark">
                            <?php 
                                
                                if(isset($info) && count($info)>0){

                                    foreach ($info as $key => $value) {
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
                                        $career = $this->module->career->get('ID',$value['CAREER']);

                            ?>
                            <tr>
                                <td class="DSTT_row"><?php echo ($key+1);?></td>
                                <td class="DSTT_row"><?php echo $career['CODE']; ?></td>
                                <td class="DSTT_row"><?php echo $career['NAME'].' '.$gender; ?></td>
                                <td class="DSTT_row"><?php echo $value['EXAM_BLOCK']; ?></td>
                                <td class="DSTT_row"><?php echo $value['BRENCHMARK']; ?></td>
                                <td class="DSTT_row"><?php echo $value['NOTE']; ?></td>
                            </tr>
                            <?php } ?>
                            <?php }else{

                                echo '<tr style="border: 1px solid #ccc;">
                                            <td colspan="6" style="text-align:center;height:50px;"> <a href="/diem-chuan.html" title="Tra điểm chuẩn DHCD" style="color:#E40001;font-weight:bold;text-align:center;font-size: 14px;">Dữ liệu bạn cần tìm không có! &nbsp;&nbsp;Mời bạn quay lại giao diện điểm chuẩn!</a> </td>
                                        </tr>';
                                }  ?>
                                
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
</form>
<?php echo $this->renderPartial('//../modules/common/diemthiMobile'); ?>
