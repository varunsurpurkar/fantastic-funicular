var app=angular.module('reviewBoard',[]);

app.controller('displayReview',['$scope','$http',function($scope,$http){
 console.log("inside the controller");
  $http({
  method: 'GET',
  url: 'reviews.json'
}).then(function successCallback(response) {
       console.log(response.data);
       $scope.reviews=response.data;
  }, function errorCallback(errResponse) {
    console.log(errResponse);
  });

}]);


app.controller('enterReview',['$scope','$http',function($scope,$http){

	
}]);
