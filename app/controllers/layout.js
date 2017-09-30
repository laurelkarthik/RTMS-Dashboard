
app.controller("layoutCtrl",["$scope","$rootScope","$state","$stateParams","$location","dataservice","Datebtnservice","kpibtnservice","CustomDate","showhideservice",
                function($scope,$rootScope,$state,$stateParams,$location,dataservice,Datebtnservice,kpibtnservice,CustomDate,showhideservice){


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


//update the view data onchange of url
 $scope.$on('$locationChangeSuccess', initializebcfn);
function initializebcfn(event, to, toParams, from, fromParams){  
  if($stateParams.mp!=""){
                if($stateParams.contractor!=""){
                        showhideservice.showhide(["region","district","ulbdiv","wpdiv","warddiv","mpdiv","contractordiv"],[]);
                }
                else{
                        showhideservice.showhide(["region","district","ulbdiv","wpdiv","warddiv","mpdiv"],["contractordiv"]);
                }
          
  }
   else  if($stateParams.ward!=""){

       if($stateParams.contractor!=""){
            showhideservice.showhide(["region","district","ulbdiv","wpdiv","contractordiv","warddiv"],["mpdiv"]);
      }
      else{
            showhideservice.showhide(["region","district","ulbdiv","wpdiv","warddiv"],["contractordiv","mpdiv"]);

      }
  }
  else  if($stateParams.wp!=""){   
      if($stateParams.contractor!=""){
            showhideservice.showhide(["region","district","ulbdiv","wpdiv","contractordiv"],["warddiv","mpdiv"]);
      }
      else{
           showhideservice.showhide(["region","district","ulbdiv","wpdiv"],["contractordiv","warddiv","mpdiv"]);
          
      }             
  }
    else  if($stateParams.contractor!=""){ 
 
            showhideservice.showhide(["contractordiv"],["region","district","ulbdiv","wpdiv","warddiv","mpdiv"]);         

  }
else  if($stateParams.ulb!=""){ 
            showhideservice.showhide(["region","district","ulbdiv"],["contractordiv","mpdiv","warddiv","wpdiv"]);
         
  }
 else if($stateParams.district!=""){ 
            showhideservice.showhide(["region","district"],["contractordiv","mpdiv","warddiv","wpdiv","ulbdiv"]);

      
      
  }
  else if($stateParams.region!=""){ 
            showhideservice.showhide(["region"],["contractordiv","mpdiv","warddiv","wpdiv","ulbdiv","district"]);
  }
  else{ 
            showhideservice.showhide([],["contractordiv","mpdiv","warddiv","wpdiv","ulbdiv","district","region"]);
  }
    $('#container_div').scrollTop(0);
      $("#"+$state.current.ncyBreadcrumb.label).addClass('current');
//   document.body.scrollTop = document.documentElement.scrollTop = 0;
 }
 initializebcfn();


      $(document).on("valuesChanged", ".ui-rangeSlider",  function(e, data){ 
      
    //    $("#"+$stateParams.datebtn).removeClass('active');

    $scope.weekAgo = new Date().setDate(new Date().getDate() - 7); 
    $scope.DBweekAgo = DatabaseDateFormte(new Date($scope.weekAgo));
   $scope.currentDBDate= DatabaseDateFormte(new Date());
   $scope.MontnFstDate = DatabaseDateFormte(new Date().setDate(1)); 
    // alert($stateParams.datebtn);
   


       	backaerrow(new Date(data.values.min),new Date(data.values.max)); 
 
  
}); 
 $(document).on("valuesChanged", ".ui-rangeSlider",    debounce(function(e,data) { 
     $scope.minDate = DatabaseDateFormte(new Date(data.values.min));
     $scope.maxDate = DatabaseDateFormte(new Date(data.values.max));
     if( $scope.minDate==$scope.maxDate){
       Datebtnservice.update("today","today"); 
         kpibtnservice.updateopenslider(false);  
        $state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,angular.extend($stateParams, {"from": $scope.minDate,"to": $scope.maxDate,"datebtn":"today","daily":false}),{"notify":true});         
     }
     else if(kpibtnservice.openslider==true && $scope.minDate!=$scope.maxDate){
        //  alert(kpibtnservice.openslider);
         $state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,angular.extend($stateParams, {"from": $scope.minDate,"to": $scope.maxDate,"datebtn":Datebtnservice.currentDatebtnType,"daily":true}),{"notify":false});          
        //  $scope.$broadcast("updatesliderData",{"from":$scope.minDate,"to":$scope.maxDate});
     } 
     else{
         Datebtnservice.update("range",Datebtnservice.currentDatebtnType); 
        $state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,angular.extend($stateParams, {"from": $scope.minDate,"to": $scope.maxDate,"datebtn":Datebtnservice.currentDatebtnType}),{"notify":true});      
     }
   if(($stateParams.from == $scope.currentDBDate) && (($stateParams.to == $scope.currentDBDate) || ($stateParams.to == ''))){ 
        $("#month").removeClass('custom-active');
        $("#week").removeClass('custom-active');
         $("#today").addClass('custom-active');
     }
   else if(($stateParams.to == $scope.currentDBDate) && ($stateParams.from == $scope.DBweekAgo) ){ 
       $("#month").removeClass('custom-active');
       $("#today").removeClass('custom-active');
         $("#week").addClass('custom-active');
      }
    else if(($stateParams.to == $scope.currentDBDate) && ($stateParams.from == $scope.MontnFstDate) ){
        $("#today").removeClass('custom-active');
            $("#week").removeClass('custom-active');
            $("#month").addClass('custom-active');
    }  
    else{
        $("#today").removeClass('custom-active');
            $("#week").removeClass('custom-active');
            $("#month").removeClass('custom-active');

    }
				
},500));
           dataservice.getdata("http://dev.laurelsolutions.net:4000/rtms/district",function(resp){
              $scope.DistListObj=resp.data;  
          }); 
           dataservice.getdata("http://dev.laurelsolutions.net:4000/rtms/ULB",function(resp){
              $scope.UlbListObj=resp.data; 
          });   
         dataservice.getdata("http://dev.laurelsolutions.net:4000/rtms/contractor",function(resp){
              $scope.ContractorListObj=resp.data; 
          });       
// $scope.ContractorListObj=[{"name":"Sai Venkateswara Agencies"},{"name":"Sri Lakshmi Kanakadurga Managerial Works"},{"name":"Smart Work Sanitaries"},{"name":"Sri Ambica Agencies"}]
$scope.RegionListObj = [ {"region":"Rajahmundry","id":3},   {"region":"Anantapur","id":1},   {"region":"Visakhapatnam","id":4},   {"region":"Guntur","id":2}];

//to update state according to kpi tab
$scope.updatedstate=function(item){
  
            kpibtnservice.querttype("desc");
    kpibtnservice.update(item);  
    kpibtnservice.openslider=false;
    //alert("app."+ Datebtnservice.currentDatebtn+"."+item,$stateParams);
    
$state.go("app."+ Datebtnservice.currentDatebtn+"."+item,angular.extend($stateParams,{"daily":false}),{"notify":true});

}

//to update state according to daterange tab
$scope.updatedDate=function(item,type,datValue){

   Datebtnservice.update(item,type);
    //  alert(currentDatebtn);
//     if(type=="week"){
// $state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,angular.extend($stateParams, {"from":"24-6-2017","to":"30-6-2017","datebtn":type}),{"notify":true});  
//     }
//     else if(type=="month"){
// $state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,angular.extend($stateParams, {"from":"1-6-2017","to":"24-6-2017","datebtn":type}),{"notify":true});  
//     }
//     else{
// $state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,angular.extend($stateParams,{"datebtn":type}),{"notify":true});  
//     }
  
   filterby(datValue);
}

// breadcrumbs calling function
$scope.regionParamsFun= function(spanId){
            kpibtnservice.querttype("desc");
       if(spanId=='mpname'){
            var name= $( "#"+spanId ).html();
            var type= "mp" ;
             
            $scope.relocation(name,type);
        }
      else  if(spanId=='wardname'){
            var name= $( "#"+spanId ).html();
            var type= "ward" ;
             
            $scope.relocation(name,type);
        }
     else if(spanId=='wpname'){
            var name= $( "#"+spanId ).html();
            var type= "wp" ;
             
            $scope.relocation(name,type);
        }
      else if(spanId=='contractorname'){
            var name= $( "#"+spanId ).html();
            var type= "contractor" ;
             
            $scope.relocation(name,type);
        }   
     else if(spanId=='ulbname'){
            var name= $( "#"+spanId ).html();
            var type= "ulb" ;
             
            $scope.relocation(name,type);
        }        
      else if(spanId=='regionname'){
            var name= $( "#"+spanId ).html();
            var type= "region" ;
             
            $scope.relocation(name,type);
        }
        else if(spanId=='districtname'){
             var name= $( "#"+spanId ).html();
            var type= "district";
            $scope.relocation(name,type);
        } 
        else if(spanId=='state'){        
            $scope.relocation('state','state');
        }      
}

//to update state according to breadcrumbs
$scope.relocation=function(name,type){
    
            kpibtnservice.querttype("desc");
    kpibtnservice.updatechildtypefn("");  
if(type=="state"){
            kpibtnservice.updatechildtypefn("region");
            kpibtnservice.globletypfun("region");
$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn, {"state":"0","region":"","district":"","ulb":"","wp":"","ward":"","mp":"","contractor":""},{"notify":true});
}
else  if(type=="region"){
            kpibtnservice.updatechildtypefn("district");
            kpibtnservice.globletypfun("district");
$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn, {"state":"0","region":$stateParams.region,"district":"","ulb":"","wp":"","ward":"","mp":"","contractor":""},{"notify":true});
}
else if(type=="district"){         
            kpibtnservice.updatechildtypefn("ULB");
            kpibtnservice.globletypfun("ULB");
$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn, {"state":"0","region":$stateParams.region,"district":$stateParams.district,"ulb":"","wp":"","ward":"","mp":"","contractor":""},{"notify":true});
}
else if(type=="ulb"){ 
            kpibtnservice.updatechildtypefn("WP");
            kpibtnservice.globletypfun("WP");

$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn, {"state":"0","region":$stateParams.region,"district":$stateParams.district,"ulb":$stateParams.ulb,"wp":"","ward":"","mp":"","contractor":""},{"notify":true});
}
else if(type=="contractor"){ 
            kpibtnservice.updatechildtypefn("WP");
            kpibtnservice.globletypfun("WP");

$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"state":"0","region":"","district":"","ulb":"","wp":"","ward":"","mp":"","contractor":$stateParams.contractor},{"notify":true});
}
else if(type=="wp"){ 
            kpibtnservice.updatechildtypefn("ward");
            kpibtnservice.globletypfun("ward");
$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn, {"state":"0","region":$stateParams.region,"district":$stateParams.district,"ulb":$stateParams.ulb,"wp":$stateParams.wp,"ward":"","mp":"","contractor":""},{"notify":true});
}
else if(type=="ward"){ 
            kpibtnservice.updatechildtypefn("MP");
            kpibtnservice.globletypfun("MP");
$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn, {"state":"0","region":$stateParams.region,"district":$stateParams.district,"ulb":$stateParams.ulb,"wp":$stateParams.wp,"ward":$stateParams.ward,"mp":"","contractor":""},{"notify":true});
}
else if(type=="mp"){ 
$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn, {"state":"0","region":$stateParams.region,"district":$stateParams.district,"ulb":$stateParams.ulb,"wp":$stateParams.wp,"ward":$stateParams.ward,"mp":$stateParams.mp,"contractor":""},{"notify":true});
}
}

//to update state according to right side filter
$scope.filterdatafn=function(obj,type){
            kpibtnservice.querttype("desc");
 if(type=="region"){
$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"state":"0","region":obj.id,"district":"","ulb":"","wp":"","ward":"","mp":"","contractor":""},{"notify":true});
showhideservice.updatebreadcrumbs({"DistrictName":"","RegionName":obj.region,"ULBName":"","WorkPackageName":"","WardName":"","MicropocketName":""}); 
}
else if(type=="district"){ 
$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"state":"0","region":obj.RegionId,"district":obj.DistrictId,"ulb":"","wp":"","ward":"","mp":"","contractor":""},{"notify":true});
showhideservice.updatebreadcrumbs({"DistrictName":obj.DistrictName,"RegionName":obj.RegionName,"ULBName":"","WorkPackageName":"","WardName":"","MicropocketName":""});  
}
else if(type=="ULB"){ 
$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"state":"0","region":obj.RegionId,"district":obj.DistrictId,"ulb":obj.ULBId,"wp":"","ward":"","mp":"","contractor":""},{"notify":true});
showhideservice.updatebreadcrumbs({"DistrictName":obj.DistrictName,"RegionName":obj.RegionName,"ULBName":obj.ULBName,"WorkPackageName":"","WardName":"","MicropocketName":""}); 
}
else if(type=="contractor"){ 
$state.go("app."+ Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"state":"0","region":"","district":"","ulb":"","wp":"","ward":"","mp":"","contractor":obj.ContractorId},{"notify":true});
 showhideservice.updatebreadcrumbs({"DistrictName":"","RegionName":"","ULBName":"","WorkPackageName":"","WardName":"","MicropocketName":"","ContractorName":obj.ContractorName});  
}
}
    $('#container_div').height($(document).height()-(0.23*$(document).height()));
    //    date range slider js

     $(document).ready(function(){ 
            $("#sam").dateRangeSlider();
	   $("#sam").dateRangeSlider({arrows:false}); 
       if($stateParams.to == ''){
	   backaerrow(new Date($stateParams.from), new Date($stateParams.from)); 
       }
       else{
        	   backaerrow(new Date($stateParams.from), new Date($stateParams.to)); 
       }
});
     $(window).mouseup(function(event){
         if($("#sidebar-wrapper-right").hasClass("active")&&!$(event.target).closest('#sidebar-wrapper-right').length){
                $("#sidebar-wrapper-right").removeClass("active");
         }
     });
    //  right sidebar  js
    $("#menu-close-right").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper-right").removeClass("active");
    });
    $("#menu-toggle-right").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper-right").addClass("active");
    });

    //    active button of group
    $("#btn-group-slide > .btn").click(function () {
        $(".btn-group > .btn").removeClass("custom-active");
        $(this).addClass("custom-active");
    });


    // right slider inside tab js
    $('.tabs-nav a').on('click', function (event) {
        event.preventDefault();

        $('.tab-active').removeClass('tab-active');
        $(this).parent().addClass('tab-active');
        $('.tabs-stage .div-close').hide();
        $($(this).attr('href')).show();
    });

       //    horizontal overall tab js
    $(document).ready(function () {

        $('ul.tabs li').click(function () {
            var tab_id = $(this).attr('data-tab');

            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#" + tab_id).addClass('current');
        });
        // $("#"+$state.current.ncyBreadcrumb.label).addClass('current');
    //    $("#"+$stateParams.datebtn).addClass('active');

    })

    $('.tabs-nav a:first').trigger('click'); // Default
 

}]);
var globleValue;  
function filterby(val){ 
var currentDt = new Date() ;
if(val==1){
	 
	window.globleValue= val;
    today();
}
if(val==2){
	window.globleValue= val;
    lastewwk();
}
if(val==3){
	window.globleValue= val;
    thisMonth();
}
if(val==4){
	window.globleValue= val;
    lastMonth();
    }
}
function today(){  
    
var minVal = new Date() ;
var maxVal = new Date() ;
 
 backaerrow(minVal,maxVal); 
    //    $("#"+$stateParams.datebtn).addClass('active');

	//  $("#leftAerrow").prop("disabled",true);
    // $("#rightAerrow").prop("disabled",true);

}
function lastewwk(){
    //    $("#"+$stateParams.datebtn).addClass('active');
    
    var oneWeekAgo = new Date();
var maxVal =oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); 
   
var minVal = new Date() ; 

    $("#rightAerrow").prop("disabled",true);
	 $("#leftAerrow").prop("disabled",false);
	 
 backaerrow(maxVal,minVal); 
} 
function thisMonth(){
    //    $("#"+$stateParams.datebtn).addClass('active');
    
var maxVal = new Date();
  var first_day = new Date();
   var minVal = first_day.setDate(1); // set to last day of previous month 

 backaerrow(minVal,maxVal);
 
	 $("#leftAerrow").prop("disabled",false);
    $("#rightAerrow").prop("disabled",true);
}
function lastMonth(){
  var now = new Date();
var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
var prevMonthFirstDate = new Date(now.getFullYear(), (now.getMonth() - 1 + 12) % 12, 1);
 
var bound= $("#sam").dateRangeSlider("bounds", new Date(2017, 0, 1), new Date()); 
var res=$("#sam").dateRangeSlider("values", prevMonthFirstDate,prevMonthLastDate); 
var date = new Date(); 
var d = new Date();
var vs= d.setDate(d.getDate() - 1); 
}

 
$(document).bind("valuesChanging", function(e, data){ 
var today = new Date();
    var cutime = today.setHours(0, 0, 0, 0);
	var dragDate= data.values.max.setHours(0, 0, 0, 0); 
	if(cutime==dragDate){ 
		
    $("#rightAerrow").prop("disabled",true); 
	}
	else{
    $("#rightAerrow").prop("disabled",false); 
	}
	
});

function forwordDate(){  
var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds  

var dateValues = $("#sam").dateRangeSlider("values");

//console.log(dateValues.min.toString() + " " + dateValues.max.toString());
var minDate = new Date(dateValues.min);

var maxDate = new Date(dateValues.max);


var today = new Date();
    var cutime = today.setHours(0, 0, 0, 0);
	var dragDate= dateValues.max.setHours(0, 0, 0, 0); 
	if(cutime==dragDate){  
    $("#rightAerrow").prop("disabled",true); 
	}
	else{
    $("#rightAerrow").prop("disabled",false); 
	}

var diffDays= (maxDate-minDate)/oneDay;
	if(diffDays<=1){

		    
var maxVal = minDate;
var d = minDate;
var minVal= d.setDate(d.getDate() - 1);
 backaerrow(minVal,maxVal);
		}
		else if(diffDays>= 2 && diffDays<8 && globleValue==null && globleValue!=''){
		    
var maxVal = new Date(minDate);
var d = minDate;
var minVal= d.setDate(d.getDate() - 7); 
 backaerrow(minVal,maxVal);
		}
		else if(diffDays>=8 && globleValue==null && globleValue!=''){
			
  var now = minDate;
var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
var prevMonthFirstDate = new Date(now.getFullYear(), (now.getMonth() - 1 + 12) % 12, 1);

 backaerrow(prevMonthFirstDate,prevMonthLastDate);
		}
		else if(globleValue==2){
			
var maxVal = new Date(minDate);
var d = minDate;
var minVal= d.setDate(d.getDate() - 7); 
 backaerrow(minVal,maxVal); 
		}
		 	else if(globleValue==3){
				
  var now = minDate;
var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
var prevMonthFirstDate = new Date(now.getFullYear(), (now.getMonth() - 1 + 12) % 12, 1);

 backaerrow(prevMonthFirstDate,prevMonthLastDate); 
		} 

}
function backwordDate(){ 
	
var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds  

var dateValues = $("#sam").dateRangeSlider("values");
//console.log(dateValues.min.toString() + " " + dateValues.max.toString());
var minDate = new Date(dateValues.min);
var maxDate = new Date(dateValues.max);


	
var diffDays= (maxDate-minDate)/oneDay;
	if(diffDays<=1){
		    
var maxVal = minDate;
var d = minDate;
var minVal= d.setDate(d.getDate() + 1);
 backaerrow(minVal,maxVal);
		}
		else if(diffDays>= 2 && diffDays<8 && globleValue==null && globleValue!=''){
		   
var minVal = new Date(maxDate);
var d = maxDate;
var maxVal= new Date(d.setDate(d.getDate() + 7)); 
 
 backaerrow(minVal,maxVal);
		}
		else if(diffDays>=8 && globleValue==null && globleValue!=''){
			  
  var now = minDate;
current = new Date(now.getFullYear(), now.getMonth()+1, 1);
  var date =  current;
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
 backaerrow(firstDay,lastDay);
		}
		else if(globleValue==2){
	 
var minVal = new Date(maxDate);
var d = maxDate;
var maxVal= new Date(d.setDate(d.getDate() + 7)); 
 
 backaerrow(minVal,maxVal); 
		}
		 	else if(globleValue==3){
				 
  var now = minDate;
current = new Date(now.getFullYear(), now.getMonth()+1, 1);
  var date =  current;
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
 backaerrow(firstDay,lastDay); 
		} 

	
}

// function backaerrow(minVal,maxVal){

// 	console.log(minVal,maxVal); 
  

// 		var bound= $("#sam").dateRangeSlider("bounds", new Date(2017, 0, 1), new Date()); 
// var res=$("#sam").dateRangeSlider("values", minVal,maxVal);    
 	
// var today = new Date();
// var from_date = ReportDate(minVal);
// var to_date = ReportDate(maxVal);

// var date_from = new Date(minVal).setHours(0, 0, 0, 0);
// 	var date_to= new Date(maxVal).setHours(0, 0, 0, 0); 

//     var cutime = today.setHours(0, 0, 0, 0);
// 	var dragDate= maxVal.setHours(0, 0, 0, 0);
	
// 	if(date_from==date_to)  { 
// 		$("#Report_period").html(from_date);
// 	}
// 	else {  
// 			$("#Report_period").html(from_date+'-'+to_date);
// 	} 
	

// 	if((cutime==dragDate) || (dragDate>cutime)){  
//     $("#rightAerrow").prop("disabled",true); 
// 	}
// 	else{
		
//     $("#rightAerrow").prop("disabled",false); 
// 	}
	
// } 

function ReportDate(today){
	var today = new Date(today);
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = dd+'/'+mm+'/'+yyyy; 
 
return today;
}

 
  function DatabaseDateFormte(today){
	var today = new Date(today);
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = yyyy+'-'+mm+'-'+dd; 
 
return today;
}

//  $(document).ready(function(){ 
//     //  alert(); 
//             $("#sam").dateRangeSlider();
// 	   $("#sam").dateRangeSlider({arrows:false});  
// });    
          
	

    //date ranger slider function start 

function backaerrow (minVal,maxVal){ 

	console.log(minVal,maxVal); 
  

		var bound= $("#sam").dateRangeSlider("bounds", new Date(2017, 0, 1), new Date()); 
var res=$("#sam").dateRangeSlider("values", minVal,maxVal);    
 	
var today = new Date();
var from_date = ReportDate(minVal);
var to_date = ReportDate(maxVal);

var date_from = new Date(minVal).setHours(0, 0, 0, 0);
	var date_to= new Date(maxVal).setHours(0, 0, 0, 0); 

    var cutime = today.setHours(0, 0, 0, 0);
	var dragDate= maxVal.setHours(0, 0, 0, 0);
	
	if(date_from==date_to)  { 
		$("#Report_period").html(from_date);
	}
	else {  
			$("#Report_period").html(from_date+'-'+to_date);
	} 
	

	if((cutime==dragDate) || (dragDate>cutime)){  
    $("#rightAerrow").prop("disabled",true); 
	}
	else{
		
    $("#rightAerrow").prop("disabled",false); 
	}
	
} 

//date ranger slider function start 
 
app.directive('directivePreformances',['showhideservice','kpibtnservice','dataservice',
            function(showhideservice,kpibtnservice,dataservice) {
    return {
        restrict:'E', 
     scope: { 
      add: '&',
      customid:'='
    },
     controller: function ($scope) {
         $scope.filtervalue=50;         
            $scope.changeweighttbl = function (item,id,enbl_arr,dsbl_arr) {
                var quertTyp= 'desc';
            kpibtnservice.querttype(quertTyp);
                kpibtnservice.globletypfun(item);
               //to remove or add class
               var idarr=["ele_region","ele_district","ele_ULB","ele_WP","ele_ward","ele_MP","ele_contractor"];
               idarr.forEach(function(val){
                   angular.element(document.querySelector('#'+val))[0].classList.remove("active");
               })
               angular.element(document.querySelector('#'+id))[0].classList.add("active");

               //to enable or disable right filter btns
               dataservice.updateChildfilterfn(item);
            //    showhideservice.butten_action(enbl_arr,dsbl_arr); 
                //Call external scope's function
                $scope.add()(item);
                
            };
          $scope.recordfilterfn=function(id,quertTyp){
             
           var item = kpibtnservice.globletypbtn; 
            kpibtnservice.querttype(quertTyp);

              //to remove or add class
               var btnidarr=["ele_all","ele_bottom","ele_top"];
               btnidarr.forEach(function(val){
                   angular.element(document.querySelector('#'+val))[0].classList.remove("active");
               })
               angular.element(document.querySelector('#'+id))[0].classList.add("active");
                $scope.add()(item);
          } 
          $scope.limitvaluefun=function(val){
            $scope.$emit('limitvalueemit', val);
            //    kpibtnservice.filtervalueupdate(val); 

} 
        },
        template:'<div class="row">  \
            <div class="col-md-9">\
                <div class="btn-group weight-btn-group" id="weight-btn-group-slide">\
                    <button type="button" id="ele_region" class="btn btn-default custom-today-button" ng-click="changeweighttbl(\'' +"region" + '\',\'' +"ele_region" + '\',[],[\'' +"ele_all" + '\',\'' +"ele_bottom" + '\',\'' +"ele_top" + '\',\'' +"ele_select" + '\'])">Regions</button>\
                    <button type="button" id="ele_district" class="btn btn-default custom-today-button" ng-click="changeweighttbl(\'' +"district" + '\',\'' +"ele_district" + '\',[],[\'' +"ele_all" + '\',\'' +"ele_bottom" + '\',\'' +"ele_top" + '\',\'' +"ele_select" + '\'])">Districts</button>\
                    <button type="button" id="ele_ULB" class="btn btn-default custom-today-button" ng-click="changeweighttbl(\'' +"ULB" + '\',\'' +"ele_ULB" + '\',[\'' +"ele_bottom" + '\',\'' +"ele_top" + '\',\'' +"ele_all" + '\'],[\'' +"ele_select" + '\'])">ULBS</button>\
                    <button type="button" id="ele_WP" class="btn btn-default custom-today-button"  ng-click="changeweighttbl(\'' +"WP" + '\',\'' +"ele_WP" + '\',[\'' +"ele_bottom" + '\',\'' +"ele_top" + '\',\'' +"ele_select" + '\'],[\'' +"ele_all" + '\'])">Work Packages</button>\
                    <button type="button" id="ele_ward" class="btn btn-default custom-today-button" ng-click="changeweighttbl(\'' +"ward" + '\',\'' +"ele_ward" + '\',[\'' +"ele_bottom" + '\',\'' +"ele_top" + '\',\'' +"ele_select" + '\'],[\'' +"ele_all" + '\'])">Wards</button>\
                    <button type="button" id="ele_MP" class="btn btn-default custom-today-button" ng-click="changeweighttbl(\'' +"MP" + '\',\'' +"ele_MP" + '\',[\'' +"ele_bottom" + '\',\'' +"ele_top" + '\',\'' +"ele_select" + '\'],[\'' +"ele_all" + '\'])">Micropockets</button>\
                    <button type="button" id="ele_contractor" class="btn btn-default custom-today-button" ng-click="changeweighttbl(\'' +"contractor" + '\',\'' +"ele_contractor" + '\',[\'' +"ele_bottom" + '\',\'' +"ele_top" + '\',\'' +"ele_all" + '\'],[\'' +"ele_select" + '\'])">Contractors</button>\
                </div>\
            </div>\
            <div id="recordsLimitId">\
         <div class="col-md-2 " style="padding-left:5px;">\
         <div class="btn-group weight-top-btn-group pull-right" id="weight-btn-top-number-group-slide">\
             <button type="button" id="ele_all" ng-click="recordfilterfn(\'' +"ele_all" + '\',\'' +"all" + '\')" class="btn btn-default custom-today-button active" >All</button>\
             <button type="button" id="ele_top" ng-click="recordfilterfn(\'' +"ele_top" + '\',\'' +"asc" + '\')" class="btn btn-default custom-today-button" >Top</button>\
             <button type="button" id="ele_bottom" ng-click="recordfilterfn(\'' +"ele_bottom" + '\',\'' +"desc" + '\')"  class="btn btn-default custom-today-button" >Bottom</button>\
         </div>\
     </div>\
         <div class="col-md-1 p-l-0">\
<select id="ele_select" class="form-control btn-10" ng-init="somethingHere = filtervalue" ng-change =limitvaluefun(filtervalue) ng-model="filtervalue"><option  value="10">10</option><option   value="20">20</option><option  value="30">30</option><option  value="40">40</option><option  value="50" >50</option></select>\
         </div></div>\
     </div> ',
        link: function(scope,element,attribute){
            
      }
    }
}]);