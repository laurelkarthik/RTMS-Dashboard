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

	 $("#leftAerrow").prop("disabled",true);
    $("#rightAerrow").prop("disabled",true);

}
function lastewwk(){
    var oneWeekAgo = new Date();
var maxVal =oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); 
   
var minVal = new Date() ; 

    $("#rightAerrow").prop("disabled",true);
	 $("#leftAerrow").prop("disabled",false);
	 
 backaerrow(maxVal,minVal); 
} 
function thisMonth(){
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
 
function sam1(){  
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
	if(diffDays<=1  && globleValue==null && globleValue!=''){

		    
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
function sam23(){ 
	
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
 $(document).ready(function(){ 
//         $("#sam").dateRangeSlider("max", new Date(2017, 0, 31));
// var bound= $("#sam").dateRangeSlider("bounds", new Date(2017, 0, 1), new Date(2018, 0, 31)); 
// var res=$("#sam").dateRangeSlider("values",new Date(2017, 0, 31), new Date()); 
            $("#sam").dateRangeSlider();
	   $("#sam").dateRangeSlider({arrows:false});
			// $("#sam").dateRangeSlider({arrows:false});
	 scope.backaerrow(Date(2017, 0, 31), new Date()); 
});
 
      
                $(document).on("valuesChanged", ".ui-rangeSlider",  function(e, data){ 
					backaerrow(new Date(data.values.min),new Date(data.values.max));  
});
	