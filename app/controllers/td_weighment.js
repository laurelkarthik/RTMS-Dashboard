app.controller("td_weighmentCtrl",["$scope","$state","$location","$stateParams","dataservice","Datebtnservice","kpibtnservice","url","orderByFilter","showhideservice",function($scope,$state,$location,$stateParams,dataservice,Datebtnservice,kpibtnservice,url,orderBy,showhideservice){
$scope.Math = window.Math;

$scope.weighmentupdateview=function(type,obj){
     kpibtnservice.updatechildtypefn("");
 dataservice.updateviewfromtable(type,obj,false);
}

$scope.limitvalue=50;
 $scope.$on('limitvalueemit', function (eve,args) { 
 $scope.limitvalue = args; 
 }); 

//sorting on table
$scope.propertyName = 'name';
$scope.reverse = true;

$scope.sortBy = function(propertyName) {
    $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
        ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
    $scope.regions = orderBy($scope.regions, $scope.propertyName, $scope.reverse);
  };

//groupbysum function
$scope.groupbysum=function(itemarr,prop){
      return  dataservice.groupbysum(itemarr,prop,$scope.limitvalue);
   }

  //to update table for ulb page
$scope.change_weight_tbl=function(item){   
 $(".overlay-gif").show();
  kpibtnservice.updatechildtypefn(item);
dataservice.getchildData(item,"/rtms/weighment/aggregates",function(resp){
        $scope.regions=resp.child; 
        $scope.Parent=kpibtnservice.parent.name;
        $scope.tablecolname=item+" Name";
         $(".overlay-gif").hide();  
});
}
//update the view data onchange of url
//  $scope.$on('$locationChangeSuccess', debounce(initializefn,1000));

 $scope.$on('$locationChangeSuccess',initializefn);

function initializefn(event, to, toParams, from, fromParams){ 
  $(".overlay-gif").show();
    dataservice.getParentchildData("/rtms/weighment/aggregates","weight_contractor_card",function(resp,parenttbl,childtbl){
        $scope.state =resp.parent[0];
        $scope.regions=resp.child; 
        $scope.Parent=parenttbl;
        $scope.tablecolname=childtbl;
         $(".overlay-gif").hide();    
  });
    $('#container_div').scrollTop(0);
 }
 initializefn();
 function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
        $("#weight-btn-group-slide > .btn").click(function () {
          $(".weight-btn-group > .btn").removeClass("active");
          $(this).addClass("active");
      });
    $("#weight-btn-top-number-group-slide > .btn").click(function () {
        $(".weight-top-btn-group > .btn").removeClass("active");
        $(this).addClass("active");
    });
    $("#weight-btn-top-number-group-slide-number > .btn").click(function () {
        $(".weight-top-btn-number-group > .btn").removeClass("active");
        $(this).addClass("active");
    });

}]);