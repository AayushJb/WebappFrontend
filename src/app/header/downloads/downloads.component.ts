import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/user.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Order } from 'src/app/shared/order.model';
import { User } from 'src/app/shared/user.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { SitedetailsComponent } from './sitedetails/sitedetails.component';
import { SitedetailsService } from 'src/app/services/sitedetails.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { LoaderComponent } from '../projects/loader/loader.component';
import { ProcoreService } from 'src/app/services/procore.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {


  users : User[] = [];
  orders : Order[] = [];
  subscription : Subscription[] = [];
  UserData :string;

  orderID : string;
  
  userList : string[] = []

  SelectedOrderNumber :string;

  keyword = 'OrderNo';

 


  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;
  Profile : string;
  Status : string;
  AssociatedSince : string;
  Code :string;

  form : FormGroup;

  constructor(
    
    public projectsService : ProjectsService ,
    public wqgformService : WqgformService, 
    private userService : UsersService,
    private Sdialog : MatDialog,
    public router : Router,
    public overlay : Overlay,
    private dialog : MatDialog,
    public sitedetailsservice : SitedetailsService,
    public procoreService : ProcoreService
     ) 
    { }
 

  ngOnInit(): void {


    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.disableClose =true;
    dialogConfig2.autoFocus =true;
    this.Sdialog.open(LoaderComponent,dialogConfig2)

    this.form = new FormGroup({
      'Order' : new FormControl(null,{validators:[Validators.required]})  
    });

     //===============Getting the User and MaxDiscount Value==========================================
     this.userIsAuthenticated = this.userService.getIsAuth();
     this.UserFullName = this.userService.getUserFullName();
     this.UserData = this.UserFullName
   
 
     this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
       this.userIsAuthenticated = isAuthenticated;
       this.UserFullName = this.userService.getUserFullName();
       this.UserData = this.UserFullName
     
      
    });
 
   //=====================GET USERS==================================================================
    this.wqgformService.getUsers().subscribe(usersData =>{
      this.users = usersData.users;
   
      this.users.map(item =>{
        if(item.UserFullName===this.UserFullName)
        {
          this.Profile = item.Profile;
        }
      })
      
     
 
      if(this.Profile==="ADMIN"||this.Profile==="BACKEND"||this.Profile==="PRE PRODUCTION")
      {
       this.UserFullName = "ALL"
      }


   this.projectsService.getProjects(this.UserFullName)


   if(this.UserFullName!=="ALL")
   {

   this.wqgformService.getDownloadsOrders(this.UserFullName).subscribe(data=>{

    this.orders = [];

   
    data.orders.map(item=>{if(item.Status==="Win"||item.Status==="Old Win"||item.Status==="Handover")
    {  
      this.orders.push(item)
      this.Sdialog.closeAll()
    }
   
   })
    
   })
   
   }

   if(this.UserFullName==="ALL")
   {

   this.wqgformService.getAllUserWinsOrder().subscribe(data=>{

    this.orders = [];

   
    data.orders.map(item=>{if(item.Status==="Win"||item.Status==="Old Win"||item.Status==="Handover")
    {  
      this.orders.push(item)
      this.Sdialog.closeAll()
    }
   
   })

   })
   
   }


  
     
    })   
 
   
   //====================GET ORDERS==================================================================


   

   
  }


  GetWinPdf(){

    
  if(!this.SelectedOrderNumber)
  {
   return
  }

    let OrderId: string;

    this.orders.map(item=>{
    if(item.OrderNo===this.SelectedOrderNumber)
     {
  
       OrderId =item._id;
    

     }

    })

    this.router.navigate(["/presentation/"+OrderId]);
 
  }

 OpenSDFormMeasurementSheet()
 {
 
 if(!this.SelectedOrderNumber)
 {
  return
 }

  let mode = 'Measurement';
  let OrderNumber = this.SelectedOrderNumber

  let OrderId: string;

  this.orders.map(item=>{
  if(item.OrderNo===this.SelectedOrderNumber)
   {

     OrderId =item._id;
  

   }

  })

  this.sitedetailsservice.getOrder(mode,OrderNumber,OrderId)

  const scrollStrategy = this.overlay.scrollStrategies.reposition();
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose =true;
  dialogConfig.autoFocus =true;
  dialogConfig.width = "90%";
  dialogConfig.height= "90%";
  dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
  this.dialog.open(SitedetailsComponent,dialogConfig)
 }

 
 OpenSDFormGoodsDelivery()
 {
  
  if(!this.SelectedOrderNumber)
  {
   return
  }

  let mode = 'GoodsDelivery';
  let OrderNumber = this.SelectedOrderNumber;

  let OrderId: string;

  this.orders.map(item=>{
  if(item.OrderNo===this.SelectedOrderNumber)
   {

     OrderId =item._id;
  

   }

  })

  this.sitedetailsservice.getOrder(mode,OrderNumber,OrderId)

  const scrollStrategy = this.overlay.scrollStrategies.reposition();
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose =true;
  dialogConfig.autoFocus =true;
  dialogConfig.width = "90%";
  dialogConfig.height= "90%";
  dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
  this.dialog.open(SitedetailsComponent,dialogConfig)

 }


 OpenSDFormWorkCompletion()
 {

  if(!this.SelectedOrderNumber)
  {
   return
  }
  
  let mode = 'WorkCompletion';
  let OrderNumber = this.SelectedOrderNumber;

  let OrderId: string;

  this.orders.map(item=>{
  if(item.OrderNo===this.SelectedOrderNumber)
   {

     OrderId =item._id;
  

   }

  })

  this.sitedetailsservice.getOrder(mode,OrderNumber,OrderId)

  const scrollStrategy = this.overlay.scrollStrategies.reposition();
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose =true;
  dialogConfig.autoFocus =true;
  dialogConfig.width = "90%";
  dialogConfig.height= "90%";
  dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
  this.dialog.open(SitedetailsComponent,dialogConfig)

 }
 
 OpenCustomerFeedBack()
 {
  
  let OrderNumber = this.SelectedOrderNumber;

  let OrderId: string;

  this.orders.map(item=>{
  if(item.OrderNo===this.SelectedOrderNumber)
   {

     OrderId =item._id;

  
   }

  })

  this.router.navigate(["/customerfeedback/"+OrderId]);

 }


CreateProjectProcore()
{

  if(!this.SelectedOrderNumber)
  {
   return
  }

    let OrderId: string;

    this.orders.map(item=>{
    if(item.OrderNo===this.SelectedOrderNumber)
     {
  
       OrderId =item._id;
    

     }

    })


    this.wqgformService.getOrder(OrderId).subscribe((OrderData)=>{



      
    })


}

EditProjectProcore()
{

}


GetPunchList()
{

  
  if(!this.SelectedOrderNumber)
  {
    alert("Please select the order number")
   return
  }
    

  let OrderId: string;

  this.orders.map(item=>{
  if(item.OrderNo===this.SelectedOrderNumber)
   {

     OrderId =item._id;

  
   }

  })

this.wqgformService.getOrder(OrderId).subscribe((OrderData)=>{






var ExportArray = [];


 
 																
var Swing = ["Sub Frame",""]
var Soft =  ["Sub Track",""]
 
 var type = [["Location Level","foreman@jbglass.in","pm@jbglass.in","LL"]]
 
 
 
 
 
 var sqft = 0;
 var totloc = 0;

 let Solutions = OrderData.Solutions
 
 for(var p =0;p<Solutions.length;p++)
{
 totloc = totloc +p
 sqft = sqft + Number(Solutions[p].Quantity)*Number(Solutions[p].Width)*Number(Solutions[p].Height)*0.00001076391042;
 
}

var totalsqft = Math.ceil(sqft)

var loc = totloc+1
 
 

var Due ;

   var ChangeFormat =  OrderData.WinDate.split("-")[0]
   var ChangeFormat2 =  OrderData.WinDate.split("-")[1]
   var ChangeFormat3 =  OrderData.WinDate.split("-")[2]

   var newWinDateFormat =  ChangeFormat2+ "-" + ChangeFormat + "-" + ChangeFormat3;
   

   var WinDate = new Date(newWinDateFormat);
   var ms = WinDate.getTime() + 86400000*90;
   Due= new Date(ms); 
   
   var DueDate = Due.getDate();
   var DueMonth = Due.getMonth() +1;
   var DueYear = Due.getFullYear();
   var FormatDue = (DueMonth + "/"+DueDate+ "/"+ DueYear).toString();
 






var Bill = "";

 
var ItemName1 = OrderData.ProjectName;
var PunchItemNumber1= "147";
var PunchItemManager1 = "waltzpro@jbglass.in";
var CreatedBy1 = "waltzpro@jbglass.in";
var AssignedTo1 = "waltzpro@jbglass.in";
var FinalApprover1 = "waltzpro@jbglass.in";
var Location1 = "";
var Trade1 = "";
var ScheduleImpact1 ="yes_known";
var ScheduleImpactDays1 = totalsqft;
var CostCode1 = "";
var PunchItemType1 = "Project Level";
var DueDate1 = FormatDue//OrderData.WinDate;
var Priority1 = "";
var CostImpact1 ="yes_known";
var CostImpactAmount1 =  Math.ceil(Number(OrderData.FinalAmount));
var Reference1= Bill;
var Description1="";
var Comments1="";
 
 
let Temp2 = {
  "Item Name":ItemName1,
  "Punch Item Number":PunchItemNumber1,
  "Punch Item Manager":PunchItemManager1,
  "Created By":CreatedBy1,
  "Assigned To":AssignedTo1,
  "Final Approver" :FinalApprover1,
  "Location" :Location1,
  "Trade" :Trade1,
  "Schedule Impact" : ScheduleImpact1,
  "Schedule Impact Days" :ScheduleImpactDays1,
  "Cost Code":CostCode1,
  "Punch Item Type" :PunchItemType1,
  "Due Date" :DueDate1,
  "Priority" :Priority1,
  "Cost Impact" :CostImpact1,
  "Cost Impact Amount":CostImpactAmount1,
  "Reference" :Reference1,
  "Description" :Description1,
  "Comments":Comments1
 }

 ExportArray.push(Temp2)


 

 
for(var i =0;i<Solutions.length;i++)
{



 var Trade = Solutions[i].System+ " "+ Solutions[i].SubSystem+ " " +Solutions[i].Color;
 var ScheduleImpact = "yes_known";
 var ScheduleImpactDays
 var CostCode = "";
 var DueDate ;
 var Priority
 var CostImpact = "yes_known";
 var CostImpactAmount
 var Reference 
 var Location
 
 var Description 

 if(Solutions[i].GlassVariant)
 {
  Description = Solutions[i].GlassCategory+"/"+Solutions[i].GlassSubCategory+"/"+Solutions[i].GlassVariant;
 }
  
 if(!Solutions[i].GlassVariant)
 {
  Description = Solutions[i].GlassCategory+"/"+Solutions[i].GlassSubCategory+"/"+Solutions[i].GlassFinish;
 } 

 
 if(Number(Solutions[i].Height)<2400)
 {
 
  Priority = "low"
 
 }
 
 if(Number(Solutions[i].Height)>=2400&&Number(Solutions[i].Height)<3000)
 {
 
  Priority = "medium"
 
 }
 
  if(Number(Solutions[i].Height)>=3000)
 {
 
  Priority = "high"
 
 }
 
 var Grid,Handle,DoorCloser,DropSeal
 if(Solutions[i].Grid==="YES")
 {
  Grid = "GRID"
 }else{Grid = ""}
 
 Handle = "HANDLE: "+Solutions[i].Handle
 
 if(Solutions[i].DoorCloser==="YES")
 {
  DoorCloser = "DOOR CLOSER"
 }else{DoorCloser =""}
 
  if(Solutions[i].DropSeal==="YES")
 {
  DropSeal = "DROP SEAL"
 }else{ DropSeal =""}
 
 
 if(!Solutions[i].SubOrientation)
 {
  Reference = Solutions[i].SystemType+ " " + Solutions[i].Orientation;
 }
 
 if(Solutions[i].SubOrientation)
 {
  Reference = Solutions[i].SystemType+ " " + Solutions[i].SubOrientation
 }

var Rem = "";
if(Solutions[i].Remarks)
{
  Rem = Solutions[i].Remarks
} 

var Comments =Solutions[i].Width +" BY "+ Solutions[i].Height+ " "+Grid + " "+ Handle+ " " + DoorCloser+" "+DropSeal +" USER "+ Rem

var Quantity = Number(Solutions[i].Quantity);


 var serialnumber


if(Quantity===0)
{

  var PunchItemNumber = i+1;

   serialnumber = i+1
   CostImpactAmount = 0
   
   
     for(var k=0;k<type.length;k++)
  {
   
   
    var PunchItemManager = "waltzpro@jbglass.in";
    var CreatedBy = "waltzpro@jbglass.in";
    var AssignedTo ="mansingh402@gmail.com";
    var FinalApprover = "waltzpro@jbglass.in";
   
    var PunchItemType = type[k][0]
   
    var ItemName = serialnumber+ " "+type[k][3]+" "+ Solutions[i].Floor+ " "+ Solutions[i].Space;
 
   if(Solutions[i].System==="WALTZ.SWING")
   {
    for(var m=0;m<Swing.length;m++)
    {
    
     var ItemName = serialnumber+ " "+type[k][3]+" "+Swing[m]+" "+Solutions[i].Floor+ " "+ Solutions[i].Space;

     if(!Solutions[i].GlassVariant)
     {
      Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassFinish;
     }

     if(Solutions[i].GlassVariant)
     {
      Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassVariant;
     }
    

     if(Swing[m]==="Sub Frame")
     {
      CostImpactAmount = 0
      ScheduleImpactDays = 0;
     }
     if(Swing[m]!=="Sub Frame")
     {
      CostImpactAmount = Math.ceil((Number(Solutions[i].Amount)-(Number(Solutions[i].Amount)*Number(OrderData.Discount))/100)/Number(Quantity));
      ScheduleImpactDays = Math.ceil((Number(Solutions[i].Width)*Number(Solutions[i].Height)*0.00001076391042));
      
     }
     
     let Temp = {
      "Item Name":ItemName,
      "Punch Item Number":PunchItemNumber,
      "Punch Item Manager":PunchItemManager,
      "Created By":CreatedBy,
      "Assigned To":AssignedTo,
      "Final Approver" :FinalApprover,
      "Location" :Location,
      "Trade" :Trade,
      "Schedule Impact" : ScheduleImpact,
      "Schedule Impact Days" :ScheduleImpactDays,
      "Cost Code":CostCode,
      "Punch Item Type" :PunchItemType,
      "Due Date" :"",
      "Priority" :Priority,
      "Cost Impact" :CostImpact,
      "Cost Impact Amount":CostImpactAmount,
      "Reference" :Reference,
      "Description" :Description,
      "Comments":Comments
     }
    
     ExportArray.push(Temp)
    
    }
   
   }
 
   
   if(Solutions[i].SystemType==="SOFT"||Solutions[i].SystemType==="SYNCRO"|| Solutions[i].SystemType==="POCKET DOOR")
   {
    for(var n=0;n<Soft.length;n++)
    {
    
       var ItemName = serialnumber+ " "+type[k][3]+" "+Soft[n]+" "+Solutions[i].Floor+ " "+ Solutions[i].Space;
       
       if(!Solutions[i].GlassVariant)
       {
        Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassFinish;
       }
  
       if(Solutions[i].GlassVariant)
       {
        Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassVariant;
       }


      
      
       if(Soft[n]==="Sub Track")
     {
        CostImpactAmount = 0;
        ScheduleImpactDays = 0;
      
     }
     if(Soft[n]!=="Sub Track")
     {
       CostImpactAmount =  Math.ceil((Number(Solutions[i].Amount)-(Number(Solutions[i].Amount)*Number(OrderData.Discount))/100)/Number(Quantity));
       ScheduleImpactDays = Math.ceil((Number(Solutions[i].Width)*Number(Solutions[i].Height)*0.00001076391042));
     }
      
      let Temp = {
      "Item Name":ItemName,
      "Punch Item Number":PunchItemNumber,
      "Punch Item Manager":PunchItemManager,
      "Created By":CreatedBy,
      "Assigned To":AssignedTo,
      "Final Approver" :FinalApprover,
      "Location" :Location,
      "Trade" :Trade,
      "Schedule Impact" : ScheduleImpact,
      "Schedule Impact Days" :ScheduleImpactDays,
      "Cost Code":CostCode,
      "Punch Item Type" :PunchItemType,
      "Due Date" :"",
      "Priority" :Priority,
      "Cost Impact" :CostImpact,
      "Cost Impact Amount":CostImpactAmount,
      "Reference" :Reference,
      "Description" :Description,
      "Comments":Comments
      }
        ExportArray.push(Temp)
    }
   
   }
   
    if(Solutions[i].System!=="WALTZ.SWING"&& Solutions[i].SystemType!=="SOFT"&& Solutions[i].SystemType!=="SYNCRO"&& Solutions[i].SystemType!=="POCKET DOOR")
   { 
   
   
     CostImpactAmount =  Math.ceil((Number(Solutions[i].Amount)-(Number(Solutions[i].Amount)*Number(OrderData.Discount))/100)/Number(Quantity));
     ScheduleImpactDays = Math.ceil((Number(Solutions[i].Width)*Number(Solutions[i].Height)*0.00001076391042));

     if(!Solutions[i].GlassVariant)
     {
      Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassFinish;
     }

     if(Solutions[i].GlassVariant)
     {
      Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassVariant;
     }
    
     let Temp = {
      "Item Name":ItemName,
      "Punch Item Number":PunchItemNumber,
      "Punch Item Manager":PunchItemManager,
      "Created By":CreatedBy,
      "Assigned To":AssignedTo,
      "Final Approver" :FinalApprover,
      "Location" :Location,
      "Trade" :Trade,
      "Schedule Impact" : ScheduleImpact,
      "Schedule Impact Days" :ScheduleImpactDays,
      "Cost Code":CostCode,
      "Punch Item Type" :PunchItemType,
      "Due Date" :"",
      "Priority" :Priority,
      "Cost Impact" :CostImpact,
      "Cost Impact Amount":CostImpactAmount,
      "Reference" :Reference,
      "Description" :Description,
      "Comments":Comments
     }
   
     ExportArray.push(Temp)
    }
   
  
  }

}
 



if(Quantity!==0)
{

for(var j=0;j<Quantity;j++)
{


  if(Quantity < 2)
  {
   serialnumber = i+1
   CostImpactAmount = Math.ceil(Number(Solutions[i].Amount)-(Number(Solutions[i].Amount)*Number(OrderData.Discount))/100);
  }

 if(Quantity > 1)
  {
   var dec = j+1
   var space = i+1
   serialnumber = space+"."+dec
   CostImpactAmount = Math.ceil((Number(Solutions[i].Amount)-(Number(Solutions[i].Amount)*Number(OrderData.Discount))/100)/Number(Quantity));
  
  }
  
 
  var PunchItemNumber = i+1;
  
 
  for(var k=0;k<type.length;k++)
  {
   
   
    var PunchItemManager = "waltzpro@jbglass.in";
    var CreatedBy = "waltzpro@jbglass.in";
    var AssignedTo ="mansingh402@gmail.com";
    var FinalApprover = "waltzpro@jbglass.in";
   
    var PunchItemType = type[k][0]
   
    var ItemName = serialnumber+ " "+type[k][3]+" "+ Solutions[i].Floor+ " "+ Solutions[i].Space;
 
   if(Solutions[i].System==="WALTZ.SWING")
   {
    for(var m=0;m<Swing.length;m++)
    {
    
     var ItemName = serialnumber+ " "+type[k][3]+" "+Swing[m]+" "+Solutions[i].Floor+ " "+ Solutions[i].Space;
     
     if(!Solutions[i].GlassVariant)
     {
      Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassFinish;
     }

     if(Solutions[i].GlassVariant)
     {
      Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassVariant;
     }
    
    
     if(Swing[m]==="Sub Frame")
     {
      CostImpactAmount = 0
      ScheduleImpactDays = 0;
     }
     if(Swing[m]!=="Sub Frame")
     {
      CostImpactAmount =  Math.ceil((Number(Solutions[i].Amount)-(Number(Solutions[i].Amount)*Number(OrderData.Discount))/100)/Number(Quantity));
      ScheduleImpactDays = Math.ceil((Number(Solutions[i].Width)*Number(Solutions[i].Height)*0.00001076391042));
      
     }
     
     let Temp = {
      "Item Name":ItemName,
      "Punch Item Number":PunchItemNumber,
      "Punch Item Manager":PunchItemManager,
      "Created By":CreatedBy,
      "Assigned To":AssignedTo,
      "Final Approver" :FinalApprover,
      "Location" :Location,
      "Trade" :Trade,
      "Schedule Impact" : ScheduleImpact,
      "Schedule Impact Days" :ScheduleImpactDays,
      "Cost Code":CostCode,
      "Punch Item Type" :PunchItemType,
      "Due Date" :"",
      "Priority" :Priority,
      "Cost Impact" :CostImpact,
      "Cost Impact Amount":CostImpactAmount,
      "Reference" :Reference,
      "Description" :Description,
      "Comments":Comments
     }
    
       ExportArray.push(Temp)
    
    }
   
   }
 
   
   if(Solutions[i].SystemType==="SOFT"||Solutions[i].SystemType==="SYNCRO"|| Solutions[i].SystemType==="POCKET DOOR")
   {
    for(var n=0;n<Soft.length;n++)
    {
    
       var ItemName = serialnumber+ " "+type[k][3]+" "+Soft[n]+" "+Solutions[i].Floor+ " "+ Solutions[i].Space;
       
       if(!Solutions[i].GlassVariant)
       {
        Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassFinish;
       }
  
       if(Solutions[i].GlassVariant)
       {
        Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassVariant;
       }


       if(Soft[n]==="Sub Track")
     {
        CostImpactAmount = 0;
        ScheduleImpactDays = 0;
      
     }
     if(Soft[n]!=="Sub Track")
     {
       CostImpactAmount =  Math.ceil((Number(Solutions[i].Amount)-(Number(Solutions[i].Amount)*Number(OrderData.Discount))/100)/Number(Quantity));
       ScheduleImpactDays = Math.ceil((Number(Solutions[i].Width)*Number(Solutions[i].Height)*0.00001076391042));
     }


     let Temp = {
      "Item Name":ItemName,
      "Punch Item Number":PunchItemNumber,
      "Punch Item Manager":PunchItemManager,
      "Created By":CreatedBy,
      "Assigned To":AssignedTo,
      "Final Approver" :FinalApprover,
      "Location" :Location,
      "Trade" :Trade,
      "Schedule Impact" : ScheduleImpact,
      "Schedule Impact Days" :ScheduleImpactDays,
      "Cost Code":CostCode,
      "Punch Item Type" :PunchItemType,
      "Due Date" :"",
      "Priority" :Priority,
      "Cost Impact" :CostImpact,
      "Cost Impact Amount":CostImpactAmount,
      "Reference" :Reference,
      "Description" :Description,
      "Comments":Comments
     }
      
           ExportArray.push(Temp)
    }
   
   }
   
    if(Solutions[i].System!=="WALTZ.SWING"&& Solutions[i].SystemType!=="SOFT"&& Solutions[i].SystemType!=="SYNCRO"&& Solutions[i].SystemType!=="POCKET DOOR")
   { 
   
   
     CostImpactAmount =  Math.ceil((Number(Solutions[i].Amount)-(Number(Solutions[i].Amount)*Number(OrderData.Discount))/100)/Number(Quantity));
     ScheduleImpactDays = Math.ceil((Number(Solutions[i].Width)*Number(Solutions[i].Height)*0.00001076391042));
    
     if(!Solutions[i].GlassVariant)
     {
      Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassFinish;
     }

     if(Solutions[i].GlassVariant)
     {
      Location =  serialnumber+ " "+Solutions[i].Floor+ " "+ Solutions[i].Space+"/"+Trade+"/"+Reference+"/"+Solutions[i].GlassVariant;
     }

     let Temp = {
     "Item Name":ItemName,
     "Punch Item Number":PunchItemNumber,
     "Punch Item Manager":PunchItemManager,
     "Created By":CreatedBy,
     "Assigned To":AssignedTo,
     "Final Approver" :FinalApprover,
     "Location" :Location,
     "Trade" :Trade,
     "Schedule Impact" : ScheduleImpact,
     "Schedule Impact Days" :ScheduleImpactDays,
     "Cost Code":CostCode,
     "Punch Item Type" :PunchItemType,
     "Due Date" :"",
     "Priority" :Priority,
     "Cost Impact" :CostImpact,
     "Cost Impact Amount":CostImpactAmount,
     "Reference" :Reference,
     "Description" :Description,
     "Comments":Comments
    }
	   ExportArray.push(Temp)
    }
   
  
  }
 

}

}

} 



    
    


var options = { 
 
  headers:["Item Name","Punch Item Number","Punch Item Manager","Created By","Assigned To","Final Approver","Location","Trade","Schedule Impact","Schedule Impact Days","Cost Code","Punch Item Type","Due Date","Priority","Cost Impact","Cost Impact Amount","Reference","Description","Comments"]
	
};

let FileName = "Punch List"+ OrderData.OrderNo
   
new ngxCsv(ExportArray, FileName, options);


   



      
  })




}


selectEvent(item) {

  this.SelectedOrderNumber = item.OrderNo
 
}

onChangeSearch(val: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e){
  // do something when input is focused
}


ChangeSourceInProcore()
{
  if(!this.SelectedOrderNumber)
  {
    alert("Please select the order number")
   return
  }
    
  var SelOrder : Order

  this.orders.map(item=>{
  if(item.OrderNo===this.SelectedOrderNumber)
   {

    SelOrder  =item

  
   }

  })

  
  


  this.procoreService.UpdateProcoreSource(SelOrder).subscribe((response)=>{
    console.log(response)
   
   
     if(response.name)
     {
      alert("Source is filled")
     }
     if(!response.name)
     {
      alert("Error Occured")
     }
  })




  



}



SubmitCustFB()
{

  if(!this.SelectedOrderNumber)
  {
    alert("Please select the order number")
   return
  }
    

  
  let OrderId: string;

  this.orders.map(item=>{
  if(item.OrderNo===this.SelectedOrderNumber)
   {

     OrderId =item._id;
  

   }

  })


  this.router.navigate(["/submitcustomerfeedback/"+OrderId]);


}



GetHandlesData()
{

  this.wqgformService.getHandlesDataAnalytics().subscribe((ordersData)=>{
    let orders : Order[] = ordersData.orders;
    
    let RequiredData = []


    for(var i = 0; i <orders.length; i++)
    {
      let Solutions = orders[i].Solutions

      for(var j=0;j<Solutions.length; j++)
      {
        if(Solutions[j].Handle)
        {
          if(Solutions[j].Handle==="SQUARE SLIM"||Solutions[j].Handle==="SLIM")
          {

            let Lock = "NO"

            if(Solutions[j].Lock)
            {
              Lock = Solutions[j].Lock
            }

            
              let temp = {OrderNo :orders[i].OrderNo, ProjectName : orders[i].ProjectName, FinalAmount: orders[i].FinalAmount, Associate: orders[i].Associate,Status : orders[i].Status, Handle: Solutions[j].Handle,Quantity : Solutions[j].Quantity, Color : Solutions[j].Color, Amount : Solutions[j].Amount,Lock : Lock }
          
              RequiredData.push(temp)
          }
        }
      }

    }



    var options = { 
 
      headers:["OrderNo" , "ProjectName" , "FinalAmount", "Associate", "Status","Handle","Quantity", "Color" , "Amount" ,"Lock"]
      
    };
    
    let FileName = "HandlesData"
       
    new ngxCsv(RequiredData, FileName, options);
      
    })

}



}
