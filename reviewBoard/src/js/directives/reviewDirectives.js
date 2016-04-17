app.directive('displayreviewSection',function(){
  
   return {
  	restrict:'E',
  	controller:'displayReviewCtrl',
    templateUrl:'displayreviewSection.html'
  };
 });

app.directive('addreviewSection',function(){
  
   return {
  	restrict:'E',
  	controller:'enterReviewCtrl',
  	templateUrl:'addreviewSection.html'
  };
 });