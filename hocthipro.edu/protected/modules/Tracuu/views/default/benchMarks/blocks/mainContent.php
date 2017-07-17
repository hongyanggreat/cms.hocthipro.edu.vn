

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
		.infoSchool select[name="yearBenchMarkSearch"]{

		}
        .w40 {
            width: 40px;
        }
        .w70{
            width: 70px;
        }
        form[name="formInfoBenchMark"] .pinkTab h2{
          text-decoration: underline;
        }

</style>

<form action="" method="post" name="formInfoBenchMark">
    <div class="centerBox">
            <div class="pinkTab">
                <h2>Kết quả Điểm Chuẩn năm <span id="showYear"><?php echo isset($year)?$year:'???' ?></span></h2>
            </div>
            <div class="infoSchool">
                <div class="nameSchool">
                    <span >Trường: </span><span ><i><?php echo isset($school['NAME'])?$school['NAME']:''; ?></i></span>
                </div>
                <div>
                    <span>Xem điểm chuẩn năm khác </span>
                    <span class="year">
                         <select name="yearBenchMarkSearch"><!-- class="chosen-select" -->
                            <?php  $yearCurrent = 2016; ?>
                            <?php 
                                for ($i=0; $i <=7 ; $i++) {
                                    $select = '';
                                    $textYear = $yearCurrent-$i; 
                                    if($textYear == $year){
                                        $select = 'selected';
                                    }
                                    echo ' <option value="'.$textYear.'" '.$select.'>Năm '.$textYear.'</option>';  
                                }
                             ?>
                        </select>
                    </span>
                </div>
                 <div style="width:100%;overflow-x:auto;">
                    <table width="100%" cellpadding="1" cellspacing="1" border="0" bgcolor="#fff">
                        <thead>
                            <tr>
                                <input type="hidden" name="codeBenchMark" value="<?php echo isset($school['CODE'])?$school['CODE']:''; ?>">
                                <td colspan="6"><span >Mã trường: </span><span ><?php echo isset($school['CODE'])?$school['CODE']:''; ?></span>
                                </td>
                            </tr>
                            <tr>
                                <td class="DSTT_Header_bg w40">STT</td>
                                <td class="DSTT_Header_bg w70">Mã ngành</td>
                                <td class="DSTT_Header_bg">Tên ngành</td>
                                <td class="DSTT_Header_bg w70">Khối thi</td>
                                <td class="DSTT_Header_bg w70">Điểm chuẩn</td>
                                <td class="DSTT_Header_bg">Ghi chú</td>
                            </tr>
                        </thead>
                        <tbody id="showResultBenchMark">
                            <?php 
                                
                                if(isset($info) && count($info)>0){

                                    foreach ($info as $key => $value) {
                                        

                            ?>
                            <tr>
                                <td class="DSTT_row"><?php echo ($key+1);?></td>
                                <td class="DSTT_row"><?php echo htmlspecialchars_decode($value['BRANCH_CODE']); ?></td>
                                <td class="DSTT_row"><?php echo htmlspecialchars_decode($value['BRANCH_NAME']) ?></td>
                                <td class="DSTT_row"><?php echo htmlspecialchars_decode($value['EXAM_BLOCK']); ?></td>
                                <td class="DSTT_row"><?php echo htmlspecialchars_decode($value['BRENCHMARK']); ?></td>
                                <td class="DSTT_row"><?php echo htmlspecialchars_decode($value['NOTE']); ?></td>
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
<?php 
    if(Yii::app()->helper->checkDevice()){
        // Phien ban mobile 
        echo $this->renderPartial('//../modules/common/diemthiMobile');
    }else{
        // Phien ban desktop    
        echo $this->renderPartial('//../modules/common/diemthi_2');
    }
 ?>
<?php echo $this->renderPartial('//../modules/common/social/commentFacebook'); ?>