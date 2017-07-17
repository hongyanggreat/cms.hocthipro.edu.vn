
<div class="article-list homepage">
    
   

     <?php 
        if(isset($topNews) && count($topNews)>0){
            foreach ($topNews as $key => $value) {
                include('article.php');
        
            } 
        } 
    ?>
     <?php 
        if(isset($hotNews) && count($hotNews)>0){
            foreach ($hotNews as $key => $value) {
                include('article.php');
            } 
        } 
    ?>
   
    <?php 
        if(isset($newsContent) && count($newsContent)>0){
            foreach ($newsContent as $key => $value) {
                include('article.php');
        
            } 
        } 
    ?>
   
   
</div>