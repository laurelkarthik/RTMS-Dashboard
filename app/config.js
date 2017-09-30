var app =
    angular.module('app')
        .config(
        [
            '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function($controllerProvider, $compileProvider, $filterProvider, $provide) {
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;
            }
        ]);
app.value("url","http://dev.laurelsolutions.net:4000");
// app.value("currentDatebtn","today");
// app.value("currentkpibtn","overall");
app.service("Datebtnservice",['$stateParams','$state',function($stateParams,$state){
    if($stateParams.datebtn=="today"){
   this.currentDatebtn="today";
   this.currentDatebtnType="today";
    }
    else{
    this.currentDatebtn="range"; 
    this.currentDatebtnType=$stateParams.datebtn;    
    }
 
        //  console.log($state.current);
    this.update=function(newval,type){
        this.currentDatebtn=newval;
        this.currentDatebtnType=type;
        // console.log(this.currentDatebtn);
    }
}]);
app.service("kpibtnservice",['$stateParams','$state',function($stateParams,$state){ 
    this.currentkpibtn=$state.current.ncyBreadcrumb.label;
    this.parent={"name":"","id":""};
    this.dataorder = "desc";
    this.childtype="";
    this.openslider=false;
    this.locdailyview={"id":"","type":""};
        //  console.log($state.current);
    this.update=function(newval){
        this.currentkpibtn=newval;
        // console.log(this.currentkpibtn);
    }
    this.updateparent=function(name,id){
       this.parent.name=name; 
       this.parent.id=id; 
    }
    this.querttype =function(type){
        this.dataorder = type;
    }
    this.globletypfun = function(val){
        this.globletypbtn = val;
    }
 this.updatechildtypefn = function(val){
        this.childtype = val;
    }
    this.updateopenslider = function(val){
        this.openslider = val;
    }
    this.updateLocDailyViewfn=function(id,type){
       this.locdailyview.id=id;
       this.locdailyview.type=type;
    }

}]);

app.provider("CustomDate",function(){
    this.todayval="init";
    this.custm="init";
this.today= function() {
            var d = new Date(),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            this.todayval=[year, month, day].join('-');
            // this.custm="text";
            // console([year, month, day].join('-'));
            // return [year, month, day].join('-');
        }
this.$get=function(){
return "hii";
} 
})