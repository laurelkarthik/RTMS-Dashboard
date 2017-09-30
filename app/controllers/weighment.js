app.controller("wieghmentCtrl",["$scope","$state","$location","$stateParams","dataservice","Datebtnservice","kpibtnservice","url","orderByFilter","showhideservice",function($scope,$state,$location,$stateParams,dataservice,Datebtnservice,kpibtnservice,url,orderBy,showhideservice){
$scope.Math = window.Math;
$scope.locRangeData=[];
$scope.rangetype="Date";
$scope.btnOrdertype = "desc";
$scope.ordertypefun = function(type){
$scope.btnOrdertype = type;
}
$scope.weighmentupdateview=function(type,obj){ 
 kpibtnservice.updatechildtypefn("");    
dataservice.updateviewfromtable(type,obj,false);
}

$scope.limitvalue=50;
 $scope.$on('limitvalueemit', function (eve,args){ 
 $scope.limitvalue = args; 
 }); 
$scope.groupbyitem="Date";
$scope.changedata=function(item){
var obj=dataservice.dailydatabtnfn(item);   
$scope.rangetype=obj[0];
$scope.groupbyitem=obj[1];
}
$scope.groupbysum=function(itemarr,prop){
      return  dataservice.groupbysum(itemarr,prop,$scope.limitvalue);
}
// $scope.$on("updatesliderData",function(evnt,msg){
//      $(".overlay-gif").show(); 
//      dataservice.getLocDailyData("/rtms/weighment/dmw/aggregates",msg.from,msg.to,function(resp){
//                $scope.dailydata=resp;
//                $(".overlay-gif").hide(); 
//         })
// });
     $scope.openNavweighment = function (id,type,name) {
      $(".overlay-gif").show();    
      kpibtnservice.updateopenslider(true);  
      kpibtnservice.updateLocDailyViewfn(id,type); 
      $scope.slidertype=type+" Name"
      $scope.slidername=name; 
      document.getElementById("myNav-weighment").style.width = "100%";
        // $('#myNav-weighment').height($(document).height()-(0.20*$(document).height())); 
      dataservice.getLocDailyData("/rtms/weighment/dmw/aggregates",function(resp){
               $scope.dailydata=resp;
               $(".overlay-gif").hide(); 
        })
    }

    $scope.closeNavweighment =function () {
        kpibtnservice.updateopenslider(false); 
        $state.go("app."+Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"daily":false},{"notify":true});
        document.getElementById("myNav-weighment").style.width = "0%";
    }

//to update table for ulb page
$scope.changeweighttbl=function(item){  
$(".overlay-gif").show();
 kpibtnservice.updatechildtypefn(item);
//  alert(kpibtnservice.childtype);
dataservice.getchildData(item,"/rtms/weighment/aggregates",function(resp){
        $scope.regions=resp.child; 
        $scope.Parent=kpibtnservice.parent.name;
        $scope.tablecolname=item+" Name";
         $(".overlay-gif").hide();  
});
}    
//sorting on table
$scope.propertyName = 'name';
$scope.reverse = true;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
        ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
    $scope.regions = orderBy($scope.regions, $scope.propertyName, $scope.reverse);
  };

//update the view data onchange of url
 $scope.$on('$locationChangeSuccess', initializefn);
function initializefn(event, to, toParams, from, fromParams){
    // alert(kpibtnservice.openslider);
if(kpibtnservice.openslider==true){ 
     $(".overlay-gif").show();
    dataservice.getLocDailyData("/rtms/weighment/dmw/aggregates",function(resp){
               $scope.dailydata=resp;
               $(".overlay-gif").hide(); 
        })
}
else{ 
  $(".overlay-gif").show();
  dataservice.getParentchildData("/rtms/weighment/aggregates","weightrange_contractor_card",function(resp,parenttbl,childtbl){
        $scope.state =resp.parent[0];
        $scope.regions=resp.child; 
        $scope.Parent=parenttbl;
        $scope.tablecolname=childtbl;
         $(".overlay-gif").hide();    
  });

  if($stateParams.mp!=""){
               var daterangeobj={
                    "fromdate":$stateParams.from,
                    "todate":$stateParams.to,
                    "type":'MP',
                    "id":$stateParams.mp
                }
    dataservice.postdata("/rtms/weighment/dmw/aggregates",daterangeobj,function(resp){
        $scope.dailydata=resp;
        $scope.dailydata.forEach(function(obj){
         obj['Month']=obj.PeriodName.split('-')[0];
        })
       });
  }
}
    $('#container_div').scrollTop(0);
 }
 initializefn();

     $("#btn-group-weeklyactie > .btn").click(function () {
        $(".weekly > .btn").removeClass("active");
        $(this).addClass("active");
    });
        $("#weightrange-btn-group-slide > .btn").click(function () {
          $(".weightrange-btn-group > .btn").removeClass("active");
          $(this).addClass("active");
      });
    $("#weight-btn-top-group-slide-weightrange > .btn").click(function () {
        $(".weight-top-weightrange-btn-group > .btn").removeClass("active");
        $(this).addClass("active");
    });
    $("#weight-btn-top-number-group-slide-number-weightrange > .btn").click(function () {
        $(".weight-top-btn-number-group-weightrange > .btn").removeClass("active");
        $(this).addClass("active");
    });
}]);