app.controller("td_overall_ulbCtrl",["$scope","$stateParams",function($scope,$stateParams){
console.log("td_overall_ulbCtrl");
function initializefn(event){ 
  console.log($stateParams); 
  if($stateParams.ulb!="ulb"){
    alert("td_overall_Ctrl");
         document.getElementById("region").style.display="block";
      document.getElementById("district").style.display="block";
      document.getElementById("ulbdiv").style.display="block";
      document.getElementById("districtname").innerHTML=$stateParams.district;
      document.getElementById("regionname").innerHTML=$stateParams.region;
  }
}
initializefn();
}]);