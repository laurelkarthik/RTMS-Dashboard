app.controller("coverage_TodayCtrl",["$scope","$state","$location","$stateParams","dataservice","Datebtnservice","kpibtnservice","url","orderByFilter","showhideservice",function($scope,$state,$location,$stateParams,dataservice,Datebtnservice,kpibtnservice,url,orderBy,showhideservice){
    $scope.Math = window.Math;
    $scope.attendanceupdateview=function(type,obj){
         kpibtnservice.updatechildtypefn("");
       dataservice.updateviewfromtable(type,obj,false);
    }
    
    
    //  if($stateParams.ulb!=""){ 
    //            $scope.limitvalue='all';
    //                   }
    //       else{
    //   $scope.limitvalue=50; 
    //       } 
    
     $scope.limitvalue=50; 
     $scope.$on('limitvalueemit', function (eve,args) { 
     $scope.limitvalue = args;  
     }); 
    //sorting on table
    $scope.propertyName = 'name';
    $scope.reverse = true;
      //$scope.friends = orderBy(friends, $scope.propertyName, $scope.reverse);
    
      $scope.sortBy = function(propertyName) { 
        $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
            ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
        $scope.childarr = orderBy($scope.childarr, $scope.propertyName, $scope.reverse);
        //  alert($scope.regions);
      };
    
      $scope.groupbyitem="Date";
    
      $scope.changedata=function(item){
        var obj=dataservice.dailydatabtnfn(item);   
        $scope.rangetype=obj[0];
        $scope.groupbyitem=obj[1];
       }
    
    //groupbysum function
      $scope.groupbysum=function(itemarr,prop){
          return  dataservice.groupbysum(itemarr,prop,$scope.limitvalue);
      }
    
      $scope.openNavweighment = function (id,type,name) {
            $(".overlay-gif").show();
            kpibtnservice.updateopenslider(true);  
            kpibtnservice.updateLocDailyViewfn(id,type); 
            $scope.slidertype=type+" Name"
          $scope.slidername=name;  
            document.getElementById("myNav-weighment").style.width = "100%";
          $(".overlay-content-weighment div").fadeIn(400)
            // $('#myNav-weighment').height($(document).height()-(0.20*$(document).height()));
            dataservice.getLocDailyData("/rtms/attendance/dmw/aggregates",function(resp){
                   $scope.dailydata=resp;
                   $(".overlay-gif").hide(); 
            })
    
        //      var obj={
        //                 "fromdate":$stateParams.from,
        //                 "todate":$stateParams.to,
        //                 "type":type,
        //                 "id":id
        //             }
        // dataservice.postdata("/rtms/attendance/dmw/aggregates",obj,function(resp){
        //     $scope.dailydata=resp;
        //     $scope.dailydata.forEach(function(obj){
        //      obj['Month']=obj.PeriodName.split('-')[0];
        //        $(".overlay-gif").hide(); 
        //     })
        // })
        }
    
        $scope.closeNavweighment =function () {
             kpibtnservice.updateopenslider(false); 
            $state.go("app."+Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"daily":false},{"notify":true});
            document.getElementById("myNav-weighment").style.width = "0%";
            $(".overlay-content-weighment div").fadeOut(800)
        }
    
      //to update table for ulb page
    $scope.change_attendance_tbl=function(item){
       $(".overlay-gif").show();
        kpibtnservice.updatechildtypefn(item);
    dataservice.getchildData(item,"/rtms/attendance/aggregates",function(resp){
            $scope.childarr=resp.child;
            $scope.childarr.forEach(function(val,index){
                $scope.childarr[index].clientDryVariance=((1-val.EmployeesPresent/val.TotalEmployees)*100).toPrecision(4);
            }) 
            $scope.Parent=kpibtnservice.parent.name;
            $scope.tablecolname=item+" Name";
             $(".overlay-gif").hide();  
    });
    }
    //update the view data onchange of url
     $scope.$on('$locationChangeSuccess', initializefn);
    function initializefn(event, to, toParams, from, fromParams){
    if(kpibtnservice.openslider==true){
         $(".overlay-gif").show();
        dataservice.getLocDailyData("/rtms/attendance/dmw/aggregates",function(resp){
                   $scope.dailydata=resp;
                   $(".overlay-gif").hide(); 
            })
    }
    else{   
      $(".overlay-gif").show();
          dataservice.getParentchildData("/rtms/attendance/aggregates","attendance_contractor_card",function(resp,parenttbl,childtbl){
            $scope.parentarr =resp.parent[0];
            $scope.childarr=resp.child; 
            $scope.childarr.forEach(function(val,index){
                $scope.childarr[index].clientDryVariance=((1-val.EmployeesPresent/val.TotalEmployees)*100).toPrecision(4);
            })
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
        dataservice.postdata("/rtms/attendance/dmw/aggregates",daterangeobj,function(resp){
            $scope.dailydata=resp;
            $scope.dailydata.forEach(function(obj){
             obj['Month']=obj.PeriodName.split('-')[0];
            });
            $(".overlay-gif").hide(); 
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

}]);