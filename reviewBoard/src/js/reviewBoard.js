var app=angular.module('reviewBoard',[]);

app.controller('displayReviewCtrl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
 console.log("inside the displayReview");
  $http({
  method: 'GET',
  url: '/readReviews'
}).then(function successCallback(response) {
       console.log(response.data);
       $rootScope.reviews=response.data;
  }, function errorCallback(errResponse) {
    console.log(errResponse);
  });

}]);


app.controller('enterReviewCtrl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
  $scope.submitReview=function(){
  var newReview= { "review":$scope.reviewInput,
      "name":"XYZ"
  }
  $http({
  method: 'POST',
  url: '/newReview',
  ContentType:'application/json',
  data:newReview
}).then(function successCallback(response) {
       $rootScope.reviews=response.data;
       console.log($rootScope.reviews);
  }, function errorCallback(errResponse) {
      console.log(errResponse);
  });

  };
 
}]);
