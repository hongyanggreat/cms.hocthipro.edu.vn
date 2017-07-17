<?php $linkUrl = Yii::app()->getRequest()->getHostInfo().Yii::app()->request->requestUri ;?>
<style>
    .popup{
        cursor: pointer;
    }
</style>
<div class="social-button selectionShareable">
            <ul class="rrssb-buttons">
                <li class="rrssb-facebook">
                  <div class="fb-like" data-href="<?php echo Yii::app()->request->requestUri ?>" data-layout="standard" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>
                </li>
                <li class="rrssb-facebookPage">
                    <!-- <a rel="nofollow"  class="popup">
                        <span class="rrssb-icon"></span>
                        <i class="spr spr-personal"></i>
                        <span class="rrssb-text">HocthiPro</span>
                    </a> -->
                </li>
                <li class="rrssb-googleplus" >
                    <a rel="nofollow" class="popup" style="background:#fff">
                        <span class="rrssb-text" style="text-align: center;margin-top: 5px;margin-left: 20px;"><div class="g-plus" data-action="share" data-height="24"></div></span>
                    </a>
                </li>
                <!-- <li class="rrssb-twitter">
                     <a target="_blank" class="twitter-share-button"
                       href="https://twitter.com/share"
                       data-size="large"
                       data-text="custom share text"
                       data-url="https://dev.twitter.com/web/tweet-button"
                       data-hashtags="example,demo"
                       data-via="twitterdev"
                       data-related="twitterapi,twitter">
                     Tweet
                     </a>
                 </li> --> 
                
            </ul>
        </div>  
