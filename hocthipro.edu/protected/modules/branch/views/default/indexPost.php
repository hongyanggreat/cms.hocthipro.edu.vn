<div class="content-box" id="showEditElement">
    <h3 class="content-box-header bg-warning ">
       <span id="titleAction">Branch</span>
    </h3>
    <div class="content-box-wrapper showFormData" style="display: block;">
            <div class="panel">
                <div class="panel-body">
                    <!-- <form name="formData" action="http://cms.hocthipro.edu/index.php?r=TracNghiem/branch/proccess" method="get" class="form-horizontal bordered-row" id="formData"  enctype="multipart/form-data">
                     -->
                     <?php 
                            $form = $this->beginWidget('CActiveForm', [
                                    'method' => 'post',
                                    'htmlOptions'=>array(
                                      'class'=>'form-horizontal bordered-row',
                                    ),
                                    'id'=>'formData',
                                   // 'action' => $this->createUrl('Branch/Proccess'),
                                  //  'action' => 'http://api.brand1.xyz:8080/service/cp/brand/CSKH',
                                   'action' => 'ProccessPost',
                            ]);
                     ?>
                        <div class="row">
                            <div class="col-md-5">
                               
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">user</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="user" value="ahp"  placeholder="user" class="form-control" data-parsley-id="3565">
                                        <ul class="parsley-errors-list  showMessageError" id="user"></ul>
                                    </div>
                                </div> 
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">pass</label>
                                    <div class="col-sm-9">
                                        <input type="password" name="pass" value="2hsj@3#8" placeholder="pass" class="form-control" data-parsley-id="3565">
                                        <ul class="parsley-errors-list  showMessageError" id="pass"></ul>
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <label class="col-sm-3 control-label">phone</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="phone" value="0964933669"  placeholder="phone" class="form-control" data-parsley-id="3565">
                                        <ul class="parsley-errors-list  showMessageError" id="phone"></ul>
                                    </div>
                                </div>  
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">mess</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="mess"  placeholder="mess" class="form-control" data-parsley-id="3565">
                                        <ul class="parsley-errors-list  showMessageError" id="mess"></ul>
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <label class="col-sm-3 control-label">tranId</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="tranId"  placeholder="tranId" value="<?php 
                                        	echo Yii::app()->helper->RandomString(5);
                                         ?>" class="form-control" data-parsley-id="3565">
                                        <ul class="parsley-errors-list  showMessageError" id="tranId"></ul>
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <label class="col-sm-3 control-label">brandName</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="brandName" value="MBServices"  placeholder="brandName" class="form-control" data-parsley-id="3565">
                                        <ul class="parsley-errors-list  showMessageError" id="brandName"></ul>
                                    </div>
                                </div>
                               
                               
                            </div>
                            
                        </div>
                        <div class="bg-default  text-center">
                            <input type="submit" class="btn btn-md btn-primary actionForm" value="Gửi thông tin">
                        </div>
                    <!-- </form> -->
                    <?php 
                        $this->endWidget();
                     ?>
                </div>
            </div>
    </div>
</div>