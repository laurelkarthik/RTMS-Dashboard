app.controller("cleanlinessCtrl",["$scope",function($scope){
console.log("cleanliness");
 $('#container_div').height($(window).height()-(0.25*$(window).height()));
}]);