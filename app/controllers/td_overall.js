
app.controller("dashboardCtrl",["$scope","$state","$location","$stateParams","dataservice","Datebtnservice","kpibtnservice","url","orderByFilter","showhideservice",
                function($scope,$state,$location,$stateParams,dataservice,Datebtnservice,kpibtnservice,url,orderBy,showhideservice){
$scope.Math = window.Math;
$scope.ulbTableHeader="Work Package Name"
$scope.daterange=$("#sam").dateRangeSlider("values");
$scope.updatedstate=function(item){
    $("#"+$state.current.ncyBreadcrumb.label).removeClass('current');
    kpibtnservice.querttype("desc");
    kpibtnservice.update(item);    
$state.go("app."+ Datebtnservice.currentDatebtn+"."+item,angular.extend($stateParams,{"daily":false}),{"notify":true});
}

//limit value broadcast listener 
$scope.limitvalue=50;
 $scope.$on('limitvalueemit', function (eve,args) { 
 $scope.limitvalue = args;  
}); 


//update url onclick of location (table data)
$scope.updateview=function(type,obj){
  kpibtnservice.updatechildtypefn("");
   dataservice.updateviewfromtable(type,obj,false);    
}

$scope.GetkpidataforLoc=function(kpi,type,obj){
kpibtnservice.update(kpi);
$("#"+$state.current.ncyBreadcrumb.label).removeClass('current');      
dataservice.updateviewfromtable(type,obj,true);  
}

//to update table for ulb page 
$scope.change_ulb_tbl=function(item){
$(".overlay-gif").show();
 kpibtnservice.updatechildtypefn(item);
//  alert(kpibtnservice.childtype);
dataservice.getchildData(item,"/rtms/overall/aggregates",function(resp){
        $scope.regions=resp.child; 
        $scope.calculatepercents();
        $scope.Parent=kpibtnservice.parent.name;
        $scope.tablecolname=item+" Name";
        $(".overlay-gif").hide();
         if(resp.child.length>=7){             
            $('#tblbody').height(0.58*$(window).height());
            $('#tblbody').css("overflow-y","auto");   
        } 
       else{
           $('#tblbody').height(resp.child.length*0.098*$(window).height());  
           $('#tblbody').css("overflow-y","hidden");  
       }    
});
}

//sorting on table
$scope.propertyName = 'name';
$scope.reverse = true;
  //$scope.friends = orderBy(friends, $scope.propertyName, $scope.reverse);

  $scope.sortBy = function(propertyName) {
    $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
        ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
    $scope.regions = orderBy($scope.regions, $scope.propertyName, $scope.reverse);
  };

  $scope.convertToHousrs=function(mints){
      return dataservice.convertToHourMin(mints);
  }

  $scope.groupbyitem="Date";

  $scope.changedata=function(item){
    var obj=dataservice.dailydatabtnfn(item);   
    $scope.rangetype=obj[0];
    $scope.groupbyitem=obj[1];
   }
  $scope.groupbysum=function(itemarr,prop){
      return  dataservice.groupbysum(itemarr,prop,$scope.limitvalue);
    }
  $scope.calculatepercents=function(){
      $scope.regions.forEach(function(dataobj,index){
          $scope.regions[index].AttendancePercent=Math.round(dataobj.AttendancePresent/dataobj.AttendanceTotal*100);
          $scope.regions[index].HouseCoveragePercent=Math.round(dataobj.CoveredHouses/dataobj.TotalHouses*100);
          $scope.regions[index].WetPercent=Math.round(dataobj.WetWeightActual/dataobj.WetWeightTarget*100);
          $scope.regions[index].DryPercent=Math.round(dataobj.DryWeightActual/dataobj.DryWeightTarget*100); 
          $scope.regions[index].TotalWeightPercent=Math.round(dataobj.TotalWeightActual/dataobj.TotalWeightTarget*100); 
          $scope.regions[index].GrivancePercent=Math.round(dataobj.GrievanceWithinSLA/dataobj.GrievanceOpen*100);
          $scope.regions[index].BlackspotPercent=Math.round(dataobj.TotalGreenspots/(dataobj.TotalGreenspots+dataobj.TotalBlackspots)*100); 
          $scope.regions[index].CollectioPointPercent=Math.round(dataobj.CoveredCollectionPoints/dataobj.VehicleTotalCollectionPoints*100); 
          if($stateParams.mp==""){
          $scope.regions[index].clientAvgVhclDelay=Math.round(dataobj.CoverageAverageTime/dataobj.NoMicropockets);
          $scope.regions[index].clientAvgCovgDelay=Math.round(dataobj.VehicleAverageDelay/dataobj.NoMicropockets);
          }
    });
  }

//update the view data onchange of url
 $scope.$on('$locationChangeSuccess', initializefn);
function initializefn(event, to, toParams, from, fromParams){ 
    // $('#recordsLimitId').hide();
  $(".overlay-gif").show();
  dataservice.getParentchildData("/rtms/overall/aggregates","contractor_card",function(resp,parenttbl,childtbl){
        $scope.state =resp.parent[0];
     if($stateParams.mp==""){
         $scope.regions=resp.child; 
         $scope.calculatepercents();
          if(resp.child.length>=7){             
            $('#tblbody').height(0.58*$(window).height());
            $('#tblbody').css("overflow-y","auto");   
        } 
       else{
           $('#tblbody').height(resp.child.length*0.098*$(window).height()); 
           $('#tblbody').css("overflow-y","hidden");  
       } 
        }
        $scope.Parent=parenttbl;
        $scope.tablecolname=childtbl; 
          $(".overlay-gif").hide();   
  });
    if($stateParams.mp!=""&&$stateParams.from!=$stateParams.to){
               var daterangeobj={
                    "fromdate":$stateParams.from,
                    "todate":$stateParams.to,
                    "id":$stateParams.mp
                }
    dataservice.postdata("/rtms/overall/MP/daily/aggregates",daterangeobj,function(resp){
        $scope.regions=resp;
        $scope.calculatepercents();
        // $scope.dailydata.forEach(function(obj){
        //  obj['Month']=obj.PeriodName.split('-')[0];
        // })
       });
  }
   $('#container_div').scrollTop(0);  
 }
 initializefn();
                     $('.mycardactive .ulb-contractor-select').click(function(e) {
                        e.preventDefault(); //prevent the link from being followed
                        $('.mycardactive .ulb-contractor-select').removeClass('active');
                        $(this).addClass('active');
                    });
                    //active button group top bottom contractor
                    $("#btn-group-top-btm-contractor > .btn").click(function () {
                        $(".top-bottom-group > .btn").removeClass("active");
                        $(this).addClass("active");
                    });
                    $("#btn-group-top-btm-workpackage > .btn").click(function () {
                        $(".top-bottom-group-1 > .btn").removeClass("active");
                        $(this).addClass("active");
                    });
                       $("#ulb-btn-group-slide > .btn").click(function () {
                      $(".ulb-btn-group > .btn").removeClass("active");
                      $(this).addClass("active");
                  });
                $("#overall-btn-group-slide > .btn").click(function () {
                      $(".overall-btn-group > .btn").removeClass("active");
                      $(this).addClass("active");
                  });
                    $("#overall-top-btn-top-group-slide > .btn").click(function () {
                        $(".overalll-top-btn-group > .btn").removeClass("active");
                        $(this).addClass("active");
                    });
                    $("#ulb-overall-top-btn-top-group-slide > .btn").click(function () {
                        $(".ulb-overalll-top-btn-group > .btn").removeClass("active");
                        $(this).addClass("active");
                    });
                    $("#wards-btn-group-slide > .btn").click(function () {
                        $(".wards-btn-group > .btn").removeClass("active");
                        $(this).addClass("active");
                    });
                    $("#wards-top-btn-top-group-slide > .btn").click(function () {
                        $(".wards-top-btn-group > .btn").removeClass("active");
                        $(this).addClass("active");
                    });
                    $("#workpkg-btn-group-slide > .btn").click(function () {
                        $(".workpkg-btn-group > .btn").removeClass("active");
                        $(this).addClass("active");
                    });
                    $("#workpkg-top-btn-top-group-slide > .btn").click(function () {
                        $(".workpkg-top-btn-group > .btn").removeClass("active");
                        $(this).addClass("active");
                    });


}]);
