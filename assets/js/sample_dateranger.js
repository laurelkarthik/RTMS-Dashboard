function filterby(val){  
if(val==1){
    today();
}
if(val==2){
    lastewwk();
}
if(val==3){
    thisMonth();
}
if(val==4){
    lastMonth();
    }
}
function today(){  
    
var sam1 = new Date() ;
var sam2 = new Date() ;

var bound= $("#sam").dateRangeSlider("bounds", new Date(2017, 0, 1), new Date(2018, 0, 31)); 
var res=$("#sam").dateRangeSlider("values", sam1,sam2); 
}
function lastewwk(){
    var oneWeekAgo = new Date();
var sam2 =oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); 
   
var sam1 = new Date() ; 
var bound= $("#sam").dateRangeSlider("bounds", new Date(2017, 0, 1), new Date(2018, 0, 31)); 
var res=$("#sam").dateRangeSlider("values", sam1,sam2); 
} 
function thisMonth(){
var last_day = new Date();
  var first_day = new Date();
    first_day.setDate(1); // set to last day of previous month 
var bound= $("#sam").dateRangeSlider("bounds", new Date(2017, 0, 1), new Date(2018, 0, 31)); 
var res=$("#sam").dateRangeSlider("values", first_day,last_day); 
console.log(first_day,last_day); 
}
function lastMonth(){
  var now = new Date();
var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
var prevMonthFirstDate = new Date(now.getFullYear(), (now.getMonth() - 1 + 12) % 12, 1);
 
var bound= $("#sam").dateRangeSlider("bounds", new Date(2017, 0, 1), new Date(2018, 0, 31)); 
var res=$("#sam").dateRangeSlider("values", prevMonthFirstDate,prevMonthLastDate); 
}
    $(document).ready(function(){ 
        $("#sam").dateRangeSlider("max", new Date(2017, 0, 31));
var bound= $("#sam").dateRangeSlider("bounds", new Date(2017, 0, 1), new Date(2018, 0, 31)); 
var res=$("#sam").dateRangeSlider("values",new Date(2017, 0, 31), new Date()); 
          
});
 
        $("#sam").dateRangeSlider();
                