app.service("dataservice",['$http','url','$stateParams','$state','Datebtnservice','kpibtnservice','showhideservice',
function($http,url,$stateParams,$state,Datebtnservice,kpibtnservice,showhideservice){
this.getdata=function(suburl,callback){
$http.get(suburl).success(function(resp){
callback(resp);
}).error(function(err){
alert(err);
})
}
this.postdata=function(suburl,dataobj,callback){
$http.post(url+suburl,JSON.stringify(dataobj)).success(function(resp){  
callback(resp);
}).error(function(err){
alert(JSON.stringify(err));
})
}
this.groupbysum=function(itemarr,prop,len){
      return  sum= itemarr.map(function(x,index) {
            if(index<len){
               return x[prop];
            }
            else{
              return 0;    
            }
      }).reduce(function(a, b) { return a + b; });
}
this.getchildData=function(item,url,callback){
      
          if($stateParams.from==$stateParams.to){
               var obj={
                        "fromdate":$stateParams.from+" 00:00:00",
                        "todate":$stateParams.to+" 23:59:59",
                        "parenttype":kpibtnservice.parent.name,
                        "order":kpibtnservice.dataorder,
                        "id":kpibtnservice.parent.id,
                        "parent":0
                    } 
          }
         else{
               var obj={
                        "fromdate":$stateParams.from,
                        "todate":$stateParams.to,
                        "parenttype":kpibtnservice.parent.name,
                        "order":kpibtnservice.dataorder,
                        "id":kpibtnservice.parent.id,
                        "parent":0
                     } 
           }
      //    console.log(obj);
            if(item=='district'){ 
                  obj.childtype=(kpibtnservice.parent.name=="region"?"":"district");
                  this.postdata(url,obj,function(resp){
                        callback(resp);
                  });
            }
            else if(item=='region'){   
                   obj.childtype=(kpibtnservice.parent.name=="state"?"":"region");    
                  this.postdata(url,obj,function(resp){
                        callback(resp);
                  });
            }
            else if(item=='ULB'){  
                 obj.childtype=(kpibtnservice.parent.name=="district"?"":"ULB");      
                  this.postdata(url,obj,function(resp){
                        callback(resp);
                  });
            }
            else if(item=='WP'){
                  obj.childtype=(kpibtnservice.parent.name=="ULB"||kpibtnservice.parent.name=="contractor"?"":"WP");    
                  this.postdata(url,obj,function(resp){
                        callback(resp);  
                  });
            }
            else if(item=='ward'){
                      obj.childtype= (kpibtnservice.parent.name=="WP"?"":"ward");
                  this.postdata(url,obj,function(resp){
                  resp.child.forEach(function(element) {
                        element.Name=element.WorkPackageName+'/'+element.Name;
                  }, this);
                        callback(resp);
                  });
            }
            else if(item=='MP'){
                   obj.childtype="MP";
                  this.postdata(url,obj,function(resp){
                        callback(resp); 
                  });
            }
            else if(item=='contractor'){
                  obj.childtype="contractor";
            this.postdata(url,obj,function(resp){
                  callback(resp);
                  });
            }
     }
this.getParentchildData=function(url,cardId,callback){
      // alert("location "+kpibtnservice.childtype);
      if($stateParams.from==$stateParams.to){
           var obj={
                        "fromdate":$stateParams.from+" 00:00:00",
                        "todate":$stateParams.to+" 23:59:59",
                        "order":kpibtnservice.dataorder,
                        "parent":1
                    } 
      }
      else{
               var obj={
                        "fromdate":$stateParams.from,
                        "todate":$stateParams.to,
                        "order":kpibtnservice.dataorder,
                        "parent":1
                    } 
      }
  console.log(obj);              
 if($stateParams.mp!=""){
           obj.parenttype="MP"; 
           obj.id=$stateParams.mp;  
           kpibtnservice.updateparent("MP",$stateParams.mp);        
           this.postdata(url,obj,function(resp){
               callback(resp,"Micropocket","Date");    
           });
//                      var daterangeobj={
//                     "fromdate":"2017-07-01",
//                     "todate":"2017-07-08",
//                     "type":'MP',
//                     "id":$stateParams.mp
//                 }
//     dataservice.postdata("/rtms/attendance/dmw/aggregates",daterangeobj,function(resp){
//         $scope.dailydata=resp;
//         console.log(resp);
//         $scope.dailydata.forEach(function(obj){
//          obj['Month']=obj.PeriodName.split('-')[0];
//         })
//     });
     
  }
   else  if($stateParams.ward!=""){
        $("#"+cardId).css("display","none");
          showhideservice.showhide([],['ele_region','ele_district','ele_ULB','ele_WP','ele_ward','ele_contractor','ele_MP','ele_bottom','ele_top','ele_select','ele_all']);        
            kpibtnservice.updateparent("ward",$stateParams.ward);  
            obj.parenttype="ward"; 
           obj.id=$stateParams.ward;   
           obj.childtype=(kpibtnservice.childtype=="MP"?"":kpibtnservice.childtype);        
           this.postdata(url,obj,function(resp){
                callback(resp,"Ward",(kpibtnservice.childtype==""? "Micropocket Name":kpibtnservice.childtype+" Name")); 
            });
  }
  else  if($stateParams.wp!=""){
       $("#"+cardId).css("display","block");
        showhideservice.showhide(['ele_ward','ele_MP'],['ele_region','ele_district','ele_ULB','ele_WP','ele_contractor']);          
        this.updateChildfilterfn(kpibtnservice.childtype);      
         kpibtnservice.updateparent("WP",$stateParams.wp); 
         obj.parenttype="WP"; 
        obj.id=$stateParams.wp; 
        obj.childtype=(kpibtnservice.childtype=="ward"?"":kpibtnservice.childtype);    
         this.postdata(url,obj,function(resp){
          resp.child.forEach(function(element) {
            element.Name=element.WorkPackageName+'/'+element.Name;
          }, this);       
            callback(resp,"Work Package",(kpibtnservice.childtype==""? "Ward Name":kpibtnservice.childtype+" Name"));  
      });
  }
    else  if($stateParams.contractor!=""){
       
         showhideservice.showhide(['ele_WP','ele_ward','ele_MP'],['ele_region','ele_district','ele_ULB','ele_contractor']); 
        this.updateChildfilterfn(kpibtnservice.childtype);       
        $("#"+cardId).css("display","block");
           kpibtnservice.updateparent("contractor",$stateParams.contractor);  
         obj.parenttype="contractor"; 
        obj.id=$stateParams.contractor;
        obj.childtype=(kpibtnservice.childtype=="WP"?"":kpibtnservice.childtype);               
         this.postdata(url,obj,function(resp){
            if(kpibtnservice.childtype=="ward"){
             resp.child.forEach(function(element) {
             element.Name=element.WorkPackageName+'/'+element.Name;
            }, this); 
          }   
              callback(resp,"Contractor",(kpibtnservice.childtype==""? "Work Package Name":kpibtnservice.childtype+" Name"));                     
         });
  }
else  if($stateParams.ulb!=""){
     $("#"+cardId).css("display","none");
      showhideservice.showhide(['ele_WP','ele_ward','ele_MP','ele_contractor'],['ele_region','ele_district','ele_ULB']); 
      this.updateChildfilterfn(kpibtnservice.childtype);
       kpibtnservice.updateparent("ULB",$stateParams.ulb);  
        obj.parenttype="ULB"; 
        obj.id=$stateParams.ulb;   
        obj.childtype=(kpibtnservice.childtype=="WP"?"":kpibtnservice.childtype);
         this.postdata(url,obj,function(resp){
          if(kpibtnservice.childtype=="ward"){
             resp.child.forEach(function(element) {
             element.Name=element.WorkPackageName+'/'+element.Name;
            }, this); 
          }     
             callback(resp,"ULB",(kpibtnservice.childtype==""? "Work Package Name":kpibtnservice.childtype+" Name"));                       
         });
  }
 else if($stateParams.district!=""){
     $("#"+cardId).css("display","none");
        showhideservice.showhide(['ele_ULB','ele_WP','ele_ward','ele_MP','ele_contractor'],['ele_region','ele_district']); 
        this.updateChildfilterfn(kpibtnservice.childtype); 
        kpibtnservice.updateparent("district",$stateParams.district);
         obj.parenttype="district"; 
        obj.id=$stateParams.district; 
        obj.childtype=(kpibtnservice.childtype=="ULB"?"":kpibtnservice.childtype);     
        this.postdata(url,obj,function(resp){
          if(kpibtnservice.childtype=="ward"){
             resp.child.forEach(function(element) {
             element.Name=element.WorkPackageName+'/'+element.Name;
            }, this); 
          }    
         callback(resp,"District",(kpibtnservice.childtype==""? "ULB Name":kpibtnservice.childtype+" Name"));                      
      });
  }
  else if($stateParams.region!=""){
        $("#"+cardId).css("display","none");
        showhideservice.showhide(['ele_district','ele_ULB','ele_WP','ele_ward','ele_MP','ele_contractor'],['ele_region']);                
        this.updateChildfilterfn(kpibtnservice.childtype); 
         kpibtnservice.updateparent("region",$stateParams.region);      
        obj.parenttype="region"; 
        obj.id=$stateParams.region;
        obj.childtype=(kpibtnservice.childtype=="district"?"":kpibtnservice.childtype); 
        this.postdata(url,obj,function(resp){
         if(kpibtnservice.childtype=="ward"){
             resp.child.forEach(function(element) {
             element.Name=element.WorkPackageName+'/'+element.Name;
            }, this); 
          }     
           callback(resp,"Region",(kpibtnservice.childtype==""? "District Name":kpibtnservice.childtype+" Name"));     
         });
  }
  else{
        $("#"+cardId).css("display","none");
        showhideservice.showhide(['ele_region','ele_district','ele_ULB','ele_WP','ele_ward','ele_MP','ele_contractor'],[]);  
        this.updateChildfilterfn(kpibtnservice.childtype);
        kpibtnservice.updateparent("state","AP");   
        obj.parenttype="state"; 
        obj.id="AP"; 
        obj.childtype=(kpibtnservice.childtype=="region"?"":kpibtnservice.childtype);
        this.postdata(url,obj,function(resp){
         if(kpibtnservice.childtype=="ward"){
             resp.child.forEach(function(element) {
             element.Name=element.WorkPackageName+'/'+element.Name;
            }, this); 
          }
          callback(resp,"State",(kpibtnservice.childtype==""? "Region Name":kpibtnservice.childtype+" Name"));                 
        });
  }
}
this.updateviewfromtable=function(type,obj,notifyexp){
      
            kpibtnservice.querttype("desc");
if(type=="region"){          
            kpibtnservice.updatechildtypefn("district");
            kpibtnservice.globletypfun("district");
$state.go("app."+Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"region":obj.Id,"from":$stateParams.from,"to":$stateParams.to},{"notify":notifyexp});
showhideservice.updatebreadcrumbs({"DistrictName":"","RegionName":obj.Name,"ULBName":"","WorkPackageName":"","WardName":"","MicropocketName":"","ContractorName":""}); 
}
else if(type=="district"){        
            kpibtnservice.updatechildtypefn("ULB");
            kpibtnservice.globletypfun("ULB");

$state.go("app."+Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"region":obj.RegionId,"district":obj.Id,"from":$stateParams.from,"to":$stateParams.to},{"notify":notifyexp});
showhideservice.updatebreadcrumbs({"DistrictName":obj.Name,"RegionName":obj.RegionName,"ULBName":"","WorkPackageName":"","WardName":"","MicropocketName":"","ContractorName":""});  
}
else if(type=="ULB"){        
            kpibtnservice.updatechildtypefn("WP");
            kpibtnservice.globletypfun("WP");

   $state.go("app."+Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"region":obj.RegionId,"district":obj.DistrictId,"ulb":obj.Id,"from":$stateParams.from,"to":$stateParams.to},{"notify":notifyexp}); 
   showhideservice.updatebreadcrumbs({"DistrictName":obj.DistrictName,"RegionName":obj.RegionName,"ULBName":obj.Name,"WorkPackageName":"","WardName":"","MicropocketName":"","ContractorName":""}); 
}
else if(type=="WP"){
            kpibtnservice.updatechildtypefn("ward");
            kpibtnservice.globletypfun("ward");

   $state.go("app."+Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"region":obj.RegionId,"district":obj.DistrictId,"ulb":obj.ULBId,"wp":obj.Id,"from":$stateParams.from,"to":$stateParams.to},{"notify":notifyexp}); 
   showhideservice.updatebreadcrumbs({"DistrictName":obj.DistrictName,"RegionName":obj.RegionName,"ULBName":obj.ULBName,"WorkPackageName":obj.Name,"WardName":"","MicropocketName":"","ContractorName":document.getElementById("contractorname").innerHTML});       
}
else if(type=="contractor"){
            kpibtnservice.updatechildtypefn("WP");
            kpibtnservice.globletypfun("WP");

   $state.go("app."+Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"region":$stateParams.region,"district":$stateParams.district,"ulb":$stateParams.ulb,"wp":"","ward":"","mp":"","contractor":obj.Id,"from":$stateParams.from,"to":$stateParams.to},{"notify":notifyexp}); 
   showhideservice.updatebreadcrumbs({"DistrictName":"","RegionName":"","ULBName":"","WorkPackageName":"","WardName":"","MicropocketName":"","ContractorName":obj.Name});  
}
else if(type=="ward"){
            kpibtnservice.updatechildtypefn("MP");
            kpibtnservice.globletypfun("MP");

   $state.go("app."+Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"region":obj.RegionId,"district":obj.DistrictId,"ulb":obj.ULBId,"wp":obj.WorkPackageId,"ward":obj.Id,"from":$stateParams.from,"to":$stateParams.to},{"notify":notifyexp}); 
   showhideservice.updatebreadcrumbs({"DistrictName":obj.DistrictName,"RegionName":obj.RegionName,"ULBName":obj.ULBName,"WorkPackageName":obj.WorkPackageName,"WardName":obj.Name,"MicropocketName":"","ContractorName":document.getElementById("contractorname").innerHTML});   
}
else if(type=="MP"){ 
   $state.go("app."+Datebtnservice.currentDatebtn+"."+kpibtnservice.currentkpibtn,{"region":obj.RegionId,"district":obj.DistrictId,"ulb":obj.ULBId,"wp":obj.WorkPackageId,"ward":obj.WardId,"mp":obj.Id,"from":$stateParams.from,"to":$stateParams.to},{"notify":true}); 
   showhideservice.updatebreadcrumbs({"DistrictName":obj.DistrictName,"RegionName":obj.RegionName,"ULBName":obj.ULBName,"WorkPackageName":obj.WorkPackageName,"WardName":obj.WorkPackageName+'/'+obj.WardName,"MicropocketName":obj.Name,"ContractorName":document.getElementById("contractorname").innerHTML});   
}      
}
this.getLocDailyData=function(url,callback){
      // alert("listenercall");
             var obj={
                    "fromdate":$stateParams.from,
                    "todate":$stateParams.to,
                    "type":kpibtnservice.locdailyview.type,
                    "id":kpibtnservice.locdailyview.id
                }
                console.log(obj);
    this.postdata(url,obj,function(resp){
        resp.forEach(function(obj){
         obj['Month']=obj.PeriodName.split('-')[0];
        });
        callback(resp);    
    })             
}
this.updateChildfilterfn=function(child){ 
if(child=="region"){
 showhideservice.butten_action([],['ele_bottom','ele_top','ele_select','ele_all']);       
}
else if(child=="district"){
  showhideservice.butten_action([],['ele_bottom','ele_top','ele_select','ele_all']);      
}
else if(child=="ULB"){
            if($stateParams.ulb!=""){ 
      showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']);  
      }
      else{
      showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']); 
      }    
}
else if(child=="WP"){
     if($stateParams.ulb!=""){ 
      showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']);  
      }
      else{
      showhideservice.butten_action(['ele_bottom','ele_top','ele_select'],['ele_all']);    
      } 
}
else if(child=="ward"){
      if($stateParams.ulb!=""){ 
      showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']);  
      }
      else{
             showhideservice.butten_action(['ele_bottom','ele_top','ele_select'],['ele_all']);     
      }      
}
else if(child=="MP"){  
        if($stateParams.ulb!=""){ 
            showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']);  
      }
      else{
             showhideservice.butten_action(['ele_bottom','ele_top','ele_select'],['ele_all']);      
      }     
}
else if(child=="contractor"){
        if($stateParams.ulb!=""){ 
            showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']);  
      }
      else{
            showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']);     
      }       
}
else{
// showhideservice.butten_action([],['ele_bottom','ele_top','ele_select','ele_all']);  

//limit button values div hide and show condition

if($stateParams.mp!=""){
                if($stateParams.contractor!=""){
  showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']); 
                 }
                 else if($stateParams.ulb!=""){ 
            showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']);  
                  }
                else{
            showhideservice.butten_action([],['ele_bottom','ele_top','ele_select','ele_all']);    
                }
          
  }
   else  if($stateParams.ward!=""){

       if($stateParams.contractor!=""){
  showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']); 
      } 
      else if($stateParams.ulb!=""){ 
            showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']);  
                  }
      else{
  showhideservice.butten_action(['ele_bottom','ele_top','ele_select'],['ele_all']);   
      }
  }
  else  if($stateParams.wp!=""){   
      if($stateParams.contractor!=""){
  showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']); 
      }
      else if($stateParams.ulb!=""){ 
            showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']);  
                  }
      else{
  showhideservice.butten_action(['ele_bottom','ele_top','ele_select'],['ele_all']);    
      }             
  }
    else  if($stateParams.contractor!=""){ 
  showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']); 
  }
else  if($stateParams.ulb!=""){ 
  showhideservice.butten_action(['ele_bottom','ele_top','ele_all'],['ele_select']);  
         
  }
 else if($stateParams.district!=""){ 
  showhideservice.butten_action(['ele_bottom','ele_top','ele_select'],['ele_all']);  
  }
  else if($stateParams.region!=""){ 
            showhideservice.butten_action([],['ele_bottom','ele_top','ele_select','ele_all']);  
  }
  else{ 
            showhideservice.butten_action([],['ele_bottom','ele_top','ele_select','ele_all']);    
  }

}
}
this.convertToHourMin=function(mints){
   var   m = mints % 60;
   var   h = (mints-m)/60;
   if(h!=0){
    return h.toString() + "Hrs " + (m<10?"0":"") + m.toString()+"Min";
   }
  else{
     return m.toString()+" Min";   
  } 
}
this.dailydatabtnfn=function(item){
   if(item=="daily"){
      return ["Date","Date"];
}
else if(item=="weekly"){
      return ["Week","PeriodName"]; 
}
else if(item=="monthly"){
      return ["Month","Month"];
}
} 

//kpi button service starting 
this.kpiButtonMainFun = function(spanId){
 kpibtnservice.querttype("desc");
       if(spanId=='mpname'){
            var name= $( "#"+spanId ).html();
            var type= "mp" ;
             
            this.relocation(name,type);
        }
      else  if(spanId=='wardname'){
            var name= $( "#"+spanId ).html();
            var type= "ward" ;
             
            this.relocation(name,type);
        }
     else if(spanId=='wpname'){
            var name= $( "#"+spanId ).html();
            var type= "wp" ;
             
            this.relocation(name,type);
        }
      else if(spanId=='contractorname'){
            var name= $( "#"+spanId ).html();
            var type= "contractor" ;
             
            this.relocation(name,type);
        }   
     else if(spanId=='ulbname'){
            var name= $( "#"+spanId ).html();
            var type= "ulb" ;
             
            this.relocation(name,type);
        }        
      else if(spanId=='regionname'){
            var name= $( "#"+spanId ).html();
            var type= "region" ;
             
            this.relocation(name,type);
        }
        else if(spanId=='districtname'){
             var name= $( "#"+spanId ).html();
            var type= "district";
            this.relocation(name,type);
        } 
        else if(spanId=='state'){        
            this.relocation('state','state');
        }  
        
      
}
//kpi button servivce end 

this.relocation=function(name,type){
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

}]);

app.service("showhideservice",['$stateParams','kpibtnservice',function($stateParams,kpibtnservice){
this.showhide=function(showarr,hidearr){
for(var i=0;i<showarr.length;i++){
angular.element(document.querySelector('#'+showarr[i]))[0].style.display="block";
}
for(var j=0;j<hidearr.length;j++){
angular.element(document.querySelector('#'+hidearr[j]))[0].style.display="none";       
}
if(showarr.length!=0 &&kpibtnservice.childtype==""){
angular.element(document.querySelector('#'+showarr[0]))[0].classList.add("active");
}
else if(showarr.length!=0 &&kpibtnservice.childtype!=""){
angular.element(document.querySelector('#ele_'+kpibtnservice.childtype))[0].classList.add("active");      
}
} 
this.updatebreadcrumbs=function(dataobj){
      document.getElementById("districtname").innerHTML=dataobj.DistrictName;
      document.getElementById("regionname").innerHTML=dataobj.RegionName;
      document.getElementById("ulbname").innerHTML=dataobj.ULBName;
      document.getElementById("wpname").innerHTML=dataobj.WorkPackageName;
      document.getElementById("contractorname").innerHTML=dataobj.ContractorName;
      document.getElementById("wardname").innerHTML=dataobj.WardName;
       document.getElementById("mpname").innerHTML=dataobj.MicropocketName;
}
this.butten_action = function(enableArray,disableArray){
       disableArray.forEach(function(ele){
                  angular.element(document.querySelector('#'+ele))[0].style.display="none";
                  angular.element(document.querySelector('#'+ele))[0].classList.remove("active");
              })
              enableArray.forEach(function(val){
                  angular.element(document.querySelector('#'+val))[0].style.display="block";
                   angular.element(document.querySelector('#'+val))[0].classList.remove("active");
              })
        if(enableArray.length!=0){
         angular.element(document.querySelector('#'+enableArray[0]))[0].classList.add("active");  
}    
}      
}]);

app.service("customservice",[function(){

}]);

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});