import { HttpClient ,HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from '../shared/color.model';
import { Glasscat } from '../shared/glasscat.model';
import { Glassfinish } from '../shared/glassfinish.model';
import { Glasssubcat } from '../shared/glasssubcat.model';
import { Glassvariant } from '../shared/glassvariant.model';
import { Handle } from '../shared/handle.model';
import { Handlevariant } from '../shared/handlevariant.model';
import { Model } from '../shared/model.model';
import { Subsystem } from '../shared/subsystem.model';
import { System } from '../shared/system.model';
import { Systemtype } from '../shared/systemtype.model';
import { Solution }  from '../shared/solution.model';
import { Subject } from 'rxjs';
import { Order } from '../shared/order.model';

import {environment} from '../../environments/environment';
import { GeneralSetting } from '../shared/generalsetting.model';
import { ProcoreService } from './procore.service';
import { User } from '../shared/user.model';
import { InvalidatedProjectKind } from 'typescript';
import { ConstantPool } from '@angular/compiler';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoaderComponent } from '../header/projects/loader/loader.component';
import { FullGlassvariant } from '../shared/fullglassvariants.model';
import { ErrorComponent } from '../header/projects/error/error.component';
import { Grid } from '../shared/grid.model';

@Injectable({
  providedIn: 'root'
})
export class WqgformService {

  hostUrl = environment.hostURL;

  private orders : Order;
  public orderId : string;
  public PrevOrder : Order;
  public spinnerStatus : boolean = false;
  public currentDateTime : any


  public Solutions : Solution[] = [];

  private systems : System[] = [];
  private subsystems : Subsystem[] =[];
  private systemtypes  : Systemtype[] = [];
  private models : Model[] = [];
  private generalSettings : GeneralSetting;





  constructor( private http : HttpClient, private router : Router , public procoreService : ProcoreService,
    private Sdialog : MatDialog, private handler: HttpBackend , private Edialog : MatDialog

    ) {this.http = new HttpClient(handler); }

  getGeneralSetting(){
    let id = "621c77a42bad8bd8a55ae50b";
    return this.http.get<{_id:string, Counter:string, Prefix: string, Factor:string, GridCost:string, DoorCloserCost:string, DropSealCost:string}>(this.hostUrl+"/api/generalsettings/"+ id)
   }


  getGrids()
  {
    return this.http.get<{message: string, grids : Grid[]}>(this.hostUrl+"/api/grids");
  }
 
  getUsers(){
    return this.http.get<{message: string, users : User[]}>(this.hostUrl+"/api/users");
  } 

  getSystems(){

    return this.http.get<{message: string, systems : System[]}>(this.hostUrl+"/api/systems");
  }

  getSubsystems(){

    return this.http.get<{message: string, subsystems : Subsystem[]}>(this.hostUrl+"/api/subsystems");
  }

  getSystemtypes(){

    return this.http.get<{message: string, systemtypes : Systemtype[]}>(this.hostUrl+"/api/systemtypes");
  }

  getModels(){

    return this.http.get<{message: string, models : Model[]}>(this.hostUrl+"/api/models");

  }

  getColors(){

    return this.http.get<{message: string, colors : Color[]}>(this.hostUrl+"/api/colors");

  }

  getGlasscats(){

    return this.http.get<{message: string, glasscats : Glasscat[]}>(this.hostUrl+"/api/glasscats");

  }

  getGlasssubcats(){

    return this.http.get<{message: string, glasssubcats : Glasssubcat[]}>(this.hostUrl+"/api/glasssubcats");

  }

  getGlassfinishes(){

    return this.http.get<{message: string, glassfinishes : Glassfinish[]}>(this.hostUrl+"/api/glassfinishes");

  }

  getGlassVariants(){

    return this.http.get<{message: string, glassvariants : Glassvariant[]}>(this.hostUrl+"/api/glassvariants");

  }

  getFullGlassVariants(){

    return this.http.get<{message: string, glassfullvariants : FullGlassvariant[]}>(this.hostUrl+"/api/fullglassvars");

  }

  getHandles(){

    return this.http.get<{message: string, handles : Handle[]}>(this.hostUrl+"/api/handles");

  }

  getHandleVariants(){

    return this.http.get<{message: string, handlevariants : Handlevariant[]}>(this.hostUrl+"/api/handlevariants");

  }

  getAllOrders()
  {
    return this.http.get<{message: string, orders : Order[]}>(this.hostUrl+"/api/orders?user=BACKEND");

  }

  getAllAnalyticsOrders()
  {
    return this.http.get<{message: string, orders : Order[]}>(this.hostUrl+"/api/orders?user=ALL");

  }

  getAnalyticsOrderNew()
  {
    return this.http.get<{message: string, orders : Order[]}>(this.hostUrl+"/api/orders/allanalyticsorders");
  }


  getHandlesDataAnalytics()
  {
    return this.http.get<{message: string, orders : Order[]}>(this.hostUrl+"/api/orders?user=ALL");
  }

  

  getDownloadsOrders(UserFullName : string)
  {
    return this.http.get<{message: string, orders : Order[]}>(this.hostUrl+"/api/orders?user="+UserFullName);
  }

  
  getAllUserWinsOrder()
  {
    return this.http.get<{message: string, orders : Order[]}>(this.hostUrl+"/api/orders/allusers");
  }

  
  


   getOrderUpdateListener(){

    return this.orders;

   }


  DateCreated = '';
  Amount = '';
  SystemRemarks = '';
  SolutionNo = '';

//==================================Add Solutions==========================================

addAndUpdateSolutions(
  OrderCompleted : string,
  OrderStatus : string,
  ProcoreID : string,
  orderId : string,
  EditSpace:number,
  Mode : string,
  Floor : string,
  Space : string,
  System : string,
  SubSystem : string,
  SystemType : string,
  Orientation : string,
  SubOrientation : string,
  Grid  : string,
  Design : string,
  Width : string,
  Height : string,
  Quantity : string,
  Color : string,
  GlassCategory : string,
  GlassSubCategory : string,
  GlassFinish : string,
  GlassVariant : string,
  Matte : string,
  OuterGlassCategory : string,
  OuterGlassSubCategory : string,
  OuterGlassFinish : string,
  OuterGlassVariant : string,
  OuterMatte : string,
  Handle : string,
  HandleVariant : string,
  DoorCloser : string,
  DropSeal : string,
  Lock :string,
  Amount : string,
  SquareFeet : string,
  Remarks : string
  )

{
  

     
      this.SystemRemarks = "11111";
      this.SolutionNo = (this.Solutions.length+1).toString();

      

if(Mode ==="Addnew"||Mode ==="SaveAndAddnew"){


 // if(OrderStatus!=="Win")
  { 
   
    var solution : Solution = {

      SolutionNo : this.SolutionNo,
      Floor : Floor.toUpperCase(),
      Space : Space.toUpperCase(),
      System : System,
      SubSystem : SubSystem,
      SystemType : SystemType,
      Orientation : Orientation,
      SubOrientation : SubOrientation,
      Grid  : Grid,
      Width : Width,
      Height : Height,
      Quantity : Quantity,
      Color : Color,
      GlassCategory :  GlassCategory,
      GlassSubCategory : GlassSubCategory,
      GlassFinish : GlassFinish,
      GlassVariant : GlassVariant,
      Matte : Matte,
      OuterGlassCategory : OuterGlassCategory,
      OuterGlassSubCategory : OuterGlassSubCategory,
      OuterGlassFinish : OuterGlassFinish,
      OuterGlassVariant : OuterGlassVariant,
      OuterMatte : OuterMatte,
      Handle : Handle,
      HandleVariant : HandleVariant,
      DoorCloser : DoorCloser,
      DropSeal : DropSeal,
      Lock : Lock,
      Remarks :Remarks,
      SystemRemarks : this.SystemRemarks,
      Amount : Amount,
      SquareFeet : SquareFeet,
      ProcoreLocationID : "",
      ProcorePunchItemID : [],
      ProcoreStatus : [],
      ProcoreBIC : "",
      ProcoreField : Design

    }
      
    this.Solutions.push(solution)

   if(OrderCompleted!=="YES")
   {
    this.http.post<{message : string,orders : Order}>(this.hostUrl+"/api/orders/pushsolutions/"+orderId,this.Solutions).subscribe(responseData => {
      console.log(responseData)
   }) 
   } 

  }
/*
  if(OrderStatus==="Win")
  {
   

   //=================Spinner Dialog================
   const dialogConfig2 = new MatDialogConfig();
   dialogConfig2.disableClose =true;
   dialogConfig2.autoFocus =true; 
   this.Sdialog.open(LoaderComponent,dialogConfig2)
  //================================================= 


     let Order = this.PrevOrder;

    var solution : Solution = {

      SolutionNo : this.SolutionNo,
      Floor : Floor,
      Space : Space,
      System : System,
      SubSystem : SubSystem,
      SystemType : SystemType,
      Orientation : Orientation,
      SubOrientation : SubOrientation,
      Grid  : Grid,
      Width : Width,
      Height : Height,
      Quantity : Quantity,
      Color : Color,
      GlassCategory :  GlassCategory,
      GlassSubCategory : GlassSubCategory,
      GlassFinish : GlassFinish,
      GlassVariant : GlassVariant,
      Matte : Matte,
      OuterGlassCategory : OuterGlassCategory,
      OuterGlassSubCategory : OuterGlassSubCategory,
      OuterGlassFinish : OuterGlassFinish,
      OuterGlassVariant : OuterGlassVariant,
      OuterMatte : OuterMatte,
      Handle : Handle,
      HandleVariant : HandleVariant,
      DoorCloser : DoorCloser,
      DropSeal : DropSeal,
      Lock : Lock,
      Remarks :Remarks,
      SystemRemarks : this.SystemRemarks,
      Amount : Amount,
      SquareFeet : SquareFeet,
      ProcoreLocationID : "",
      ProcorePunchItemID : [],
      ProcoreStatus : [],
      ProcoreBIC : "",
      ProcoreField : ""

    }

    this.procoreService.CreateWinPunchItem(ProcoreID,solution,Order).subscribe((responseW)=>{
  

      var PunchData = responseW.PunchData;
      var Punches = [];

      for(var i = 0; i<PunchData.length;i++)
      {
        Punches.push({PunchID : PunchData[i].PunchID,Serial :PunchData[i].SerialNo,Floor : PunchData[i].Floor,Space : PunchData[i].Space,PunchType : PunchData[i].PunchItemType,LocationID:PunchData[i].Location})
      }

      solution.ProcorePunchItemID = Punches;
      solution.ProcoreStatus = responseW.PunchItemType
    
      solution.ProcorePunchItemID 
    
      this.Solutions.push(solution)

      this.http.post<{message : string,orders : Order}>(this.hostUrl+"/api/orders/pushsolutions/"+orderId,this.Solutions).subscribe(responseData => {
        console.log(responseData)
        if(responseData)
        {
          this.Sdialog.closeAll()
        }

      }) 

    })

  }
*/
}

if(Mode==="UpdateSpace")
{      
  
 // if(OrderStatus!=="Win")
  {
    var updatedsolution : Solution = {

      SolutionNo : this.SolutionNo,
      Floor : Floor.toUpperCase(),
      Space : Space.toUpperCase(),
      System : System,
      SubSystem : SubSystem,
      SystemType : SystemType,
      Orientation : Orientation,
      SubOrientation : SubOrientation,
      Grid  : Grid,
      Width : Width,
      Height : Height,
      Quantity : Quantity,
      Color : Color,
      GlassCategory :  GlassCategory,
      GlassSubCategory : GlassSubCategory,
      GlassFinish : GlassFinish,
      GlassVariant : GlassVariant,
      Matte : Matte,
      OuterGlassCategory : OuterGlassCategory,
      OuterGlassSubCategory : OuterGlassSubCategory,
      OuterGlassFinish : OuterGlassFinish,
      OuterGlassVariant : OuterGlassVariant,
      OuterMatte : OuterMatte,
      Handle : Handle,
      HandleVariant : HandleVariant,
      DoorCloser : DoorCloser,
      DropSeal : DropSeal,
      Lock : Lock,
      Remarks :Remarks,
      SystemRemarks : this.SystemRemarks,
      Amount : Amount,
      SquareFeet : SquareFeet,
      ProcoreLocationID : this.Solutions[EditSpace].ProcoreLocationID,
      ProcorePunchItemID : this.Solutions[EditSpace].ProcorePunchItemID,
      ProcoreStatus : this.Solutions[EditSpace].ProcoreStatus,
      ProcoreBIC : this.Solutions[EditSpace].ProcoreBIC,
      ProcoreField : Design
  
    }
     
    this.Solutions[EditSpace]= updatedsolution; 

    if(OrderCompleted!=="YES")
    {     
    this.http.post<{message : string,orders : Order}>(this.hostUrl+"/api/orders/pushsolutions/"+orderId,this.Solutions).subscribe(responseData => {
      
      this.Solutions[EditSpace]= updatedsolution
    
   
    })
    }
  }
  
  if(OrderStatus==="Win"||OrderStatus==="Commercial Hold")
  {  

    if(Number(Quantity)===0)
    {
      
     //=================Spinner Dialog================
     const dialogConfig2 = new MatDialogConfig();
     dialogConfig2.disableClose =true;
     dialogConfig2.autoFocus =true;
     this.Sdialog.open(LoaderComponent,dialogConfig2)
    //================================================= 

    var updatedWinSolution : Solution = {

      SolutionNo : this.SolutionNo,
      Floor : Floor.toUpperCase(),
      Space : Space.toUpperCase(),
      System : System,
      SubSystem : SubSystem,
      SystemType : SystemType,
      Orientation : Orientation,
      SubOrientation : SubOrientation,
      Grid  : Grid,
      Width : Width,
      Height : Height,
      Quantity : "0",
      Color : Color,
      GlassCategory :  GlassCategory,
      GlassSubCategory : GlassSubCategory,
      GlassFinish : GlassFinish,
      GlassVariant : GlassVariant,
      Matte : Matte,
      OuterGlassCategory : OuterGlassCategory,
      OuterGlassSubCategory : OuterGlassSubCategory,
      OuterGlassFinish : OuterGlassFinish,
      OuterGlassVariant : OuterGlassVariant,
      OuterMatte : OuterMatte,
      Handle : Handle,
      HandleVariant : HandleVariant,
      DoorCloser : DoorCloser,
      DropSeal : DropSeal,
      Lock : Lock,
      Remarks :Remarks,
      SystemRemarks : this.SystemRemarks,
      Amount : "0",
      SquareFeet : "0",
      ProcoreLocationID : this.Solutions[EditSpace].ProcoreLocationID,
      ProcorePunchItemID : [],
      ProcoreStatus : this.Solutions[EditSpace].ProcoreStatus,
      ProcoreBIC : this.Solutions[EditSpace].ProcoreBIC,
      ProcoreField : Design
  
    }

    this.Solutions[EditSpace] = updatedWinSolution
    this.Sdialog.closeAll()
   
    }
   
    if(Quantity !=="0")
    {

       //=================Spinner Dialog================
       const dialogConfig2 = new MatDialogConfig();
       dialogConfig2.disableClose =true;
       dialogConfig2.autoFocus =true;
       this.Sdialog.open(LoaderComponent,dialogConfig2)
      //================================================= 

      var updatedWinSolution : Solution = {

        SolutionNo : this.SolutionNo,
        Floor : Floor.toUpperCase(),
        Space : Space.toUpperCase(),
        System : System,
        SubSystem : SubSystem,
        SystemType : SystemType,
        Orientation : Orientation,
        SubOrientation : SubOrientation,
        Grid  : Grid,
        Width : Width,
        Height : Height,
        Quantity : Quantity,
        Color : Color,
        GlassCategory :  GlassCategory,
        GlassSubCategory : GlassSubCategory,
        GlassFinish : GlassFinish,
        GlassVariant : GlassVariant,
        Matte : Matte,
        OuterGlassCategory : OuterGlassCategory,
        OuterGlassSubCategory : OuterGlassSubCategory,
        OuterGlassFinish : OuterGlassFinish,
        OuterGlassVariant : OuterGlassVariant,
        OuterMatte : OuterMatte,
        Handle : Handle,
        HandleVariant : HandleVariant,
        DoorCloser : DoorCloser,
        DropSeal : DropSeal,
        Lock : Lock,
        Remarks :Remarks,
        SystemRemarks : this.SystemRemarks,
        Amount : Amount,
        SquareFeet : SquareFeet,
        ProcoreLocationID : this.Solutions[EditSpace].ProcoreLocationID,
        ProcorePunchItemID : this.Solutions[EditSpace].ProcorePunchItemID,
        ProcoreStatus : this.Solutions[EditSpace].ProcoreStatus,
        ProcoreBIC : this.Solutions[EditSpace].ProcoreBIC,
        ProcoreField : Design
    
      }
        
      this.Solutions[EditSpace]=  updatedWinSolution;
      this.Sdialog.closeAll()
    

      
     

    }
    
  }
     
}


}

//==================================Delete Solutions==============================================
deleteSolution(orderId : string,ProjectID:any, index :number,LocationID : any, PunchItemID : any,OrderCompleted : string){
 
  
  this.Solutions.splice(index, 1);
 
  for(var i =0; i<this.Solutions.length;i++)
  {
     this.Solutions[i].SolutionNo = (i+1).toString();

  }
  
  if(OrderCompleted!=="YES")
  {
    this.spinnerStatus = true;
  this.http.post<{message : string,orders : Order}>(this.hostUrl+"/api/orders/pushsolutions/"+orderId,this.Solutions).subscribe(responseData => {
    console.log(responseData)

    this.spinnerStatus =false;

  })
  }
}








//===========================For edit orders========================================================


getOrder(_id : string){

  return this.http.get<Order>(this.hostUrl+"/api/orders/"+ _id)//=====check

}

 

//============================Add Orders============================================================


addOrders(
      ProjectName : string,
      ClientName : string,
      Location : string,
      Architect : string,
      Source : string,
      UserFullName : string,
      ProjectManager: string,
      OfficeID : string,
      Completed : string
          )

          {

            this.getCurrentDateTime()

             //=================Spinner Dialog================
             const dialogConfig2 = new MatDialogConfig();
             dialogConfig2.disableClose =true;
             dialogConfig2.autoFocus =true;
             this.Sdialog.open(LoaderComponent,dialogConfig2)
            //=================================================   

            let id = "621c77a42bad8bd8a55ae50b";
            this.http.put<{message : string,generalsettings :GeneralSetting}>(this.hostUrl+"/api/generalsettings/counter/"+ id,id)
            .subscribe(GSData =>{

              let Counter = GSData.generalsettings.Counter;
              let Prefix = GSData.generalsettings.Prefix;


              const currentDate = this.currentDateTime
              const ISTDateString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

              
              let now = new Date(ISTDateString);
              let nowDate = now.getDate();
              let nowMonth = now.getMonth()+1;
              let nowYear = now.getFullYear();
              let Sour = Source.substring(0,3);
              let Loc = Location.substring(0,3);

              let OrderNumber = Prefix+"/"+nowDate+"-"+nowMonth+"/"+Loc+"/"+Sour+"/"+Counter;
              let CreationDate = nowDate + "-" + nowMonth + "-" + nowYear;//nowYear +"-"+nowMonth + "-" +nowDate;



              this.Solutions = [];

              const order: Order = {
                _id:null,
                OrderNo : OrderNumber,
                ProjectName : ProjectName.toUpperCase(),
                ClientName : ClientName.toUpperCase(),
                Location : Location.toUpperCase(),
                Architect : Architect.toUpperCase(),
                Source : Source,
                Solutions: this.Solutions,
                Discount : "0",
                Advance : "100",
                FinalAmount : "0",
                GrandTotal :"0",
                Status : "Pipeline",
                Active : "Active",
                Completed : Completed,
                CreationDate : CreationDate,
                EditDate : "",
                WinDate : "",
                Associate : UserFullName,
                ProjectManager :  ProjectManager,
                ProjectID : "",
                OfficeID : OfficeID,
                TotalSquareFeet : "",
                CSValue : "",
                CompletionDate : "",
                DateCreated : CreationDate,
                CommercialWinDate : "",
                HandOverDate : "",
                LedgerDetails : "",
                ProPlan : "",
                ProValue : ""
              }
           

              this.http.post<{message: string, orderId: string}>(this.hostUrl+"/api/orders", order)
                .subscribe((responseData)=>{
                let id = responseData.orderId;
                this.router.navigate(["/project/"+id]);
               });

               this.Sdialog.closeAll();


/*
              this.procoreService.createProcoreProject(order).subscribe((response)=>{

              
                const order: Order = {
                  _id:null,
                  OrderNo : OrderNumber,
                  ProjectName : ProjectName,
                  ClientName : ClientName,
                  Location : Location,
                  Architect : Architect,
                  Source : Source,
                  Solutions: this.Solutions,
                  Discount : "0",
                  Advance : "100",
                  FinalAmount : "0",
                  GrandTotal : "0",
                  Status : "Pipeline",
                  Active : "Active",
                  Completed : Completed,
                  CreationDate : CreationDate,
                  EditDate : "",
                  WinDate : "",
                  Associate : UserFullName,
                  ProjectManager :  ProjectManager,
                  ProjectID : response.toString(),
                  OfficeID : OfficeID,
                  TotalSquareFeet : "",
                  CSValue :"",
                  CompletionDate :"",
                  DateCreated : CreationDate
                }
               
               if(response)
               {
                this.http.post<{message: string, orderId: string}>(this.hostUrl+"/api/orders", order)
                .subscribe((responseData)=>{
                let id = responseData.orderId;
                this.router.navigate(["/project/"+id]);
               });

               this.Sdialog.closeAll();

               }
             

              })

*/              





            })




}


//===================================update order ====================================================


updateOrder
(  formmode :string,
  _id :string,
  OrderNo : string,
  ProjectName : string,
  ClientName : string,
  Location : string,
  Architect : string,
  Source :string,
  Discount : string,
  Advance :string,
  Status :string,
  Active : string,
  Completed : string,
  WinDate : string,
  CompletionDate : string,
  Associate : string,
  ProjectManager : string,
  OfficeID : string,
  DealerDiscount : string,
  DateCreated : string,
  userID : string,
  ActualProfile : string
)
{

  this.getCurrentDateTime()

 if(formmode==="newOrder")
 {
  
  const currentDate = this.currentDateTime;
  const ISTDateString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

  let now = new Date(ISTDateString);
  let nowDate = now.getDate();
  let nowMonth = now.getMonth()+1;
  let nowYear = now.getFullYear();
  let EditDateFormat :string = nowDate + "-" + nowMonth + "-" + nowYear;//nowYear +"-"+nowMonth +"-"+nowDate;

  let WebAppValue : number = 0 ;  
  let TotalSquareFeet : number = 0;        
  this.Solutions.map(item =>{
   WebAppValue = WebAppValue + Number(item.Amount);
   TotalSquareFeet = TotalSquareFeet + Number(item.SquareFeet)
  }) 
  
  let FinalValue = WebAppValue - WebAppValue*Number(Discount)/100;
 
  let CSValue : number;
  if(DealerDiscount==="0")
  {
   CSValue = FinalValue
  }
  if(DealerDiscount!=="0")
  {
   CSValue = Math.ceil(WebAppValue - WebAppValue*Number(DealerDiscount)*0.01);
  }
   
  



  const orderPrev : Order  = {
    _id : _id,
    OrderNo : this.PrevOrder.OrderNo,
    ProjectName : ProjectName.toUpperCase(),
    ClientName : ClientName.toUpperCase(),
    Location : Location.toUpperCase(),
    Architect : Architect.toUpperCase(),
    Source : Source,
    Solutions: this.Solutions,
    Discount : Discount,
    Advance : Advance,
    FinalAmount : FinalValue.toString(),
    GrandTotal : WebAppValue.toString(),
    Status : "Pipeline",
    Active : "Active",
    Completed :  "YES",
    CreationDate :this.PrevOrder.CreationDate,
    EditDate : EditDateFormat,
    WinDate : WinDate,
    Associate : this.PrevOrder.Associate,
    ProjectManager : ProjectManager,
    ProjectID :  this.PrevOrder.ProjectID,
    OfficeID : OfficeID,
    TotalSquareFeet : TotalSquareFeet.toFixed(3).toString(),
    CSValue : CSValue.toString(),
    CompletionDate : CompletionDate,
    DateCreated : this.PrevOrder.CreationDate,
    CommercialWinDate : this.PrevOrder.CommercialWinDate,
    HandOverDate : this.PrevOrder.HandOverDate,
    LedgerDetails : this.PrevOrder.LedgerDetails,
    ProPlan :  this.PrevOrder.ProPlan,
    ProValue :  this.PrevOrder.ProValue
  
  }
  
 // this.procoreService.updateProcoreProject(orderPrev)

  this.http.put(this.hostUrl+"/api/orders/updateorder/"+ _id ,orderPrev).subscribe(responseData => {
   console.log(responseData)

   this.router.navigate(["/presentation/"+_id]);
  });


 }



 if(formmode==="editOrder")
 {
 
  const currentDate = this.currentDateTime;
  console.log(this.currentDateTime)
  const ISTDateString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });


  let now = new Date(ISTDateString);
  let nowDate = now.getDate();
  let nowMonth = now.getMonth()+1;
  let nowYear = now.getFullYear();
  let EditDateFormat :string = nowDate + "-" + nowMonth + "-" + nowYear;
  
  //nowYear +"-"+nowMonth +"-"+nowDate;
  
  let WebAppValue : number = 0 ;  
  let TotalSquareFeet : number = 0;        
  this.Solutions.map(item =>{
   WebAppValue = WebAppValue + Number(item.Amount);
   TotalSquareFeet = TotalSquareFeet + Number(item.SquareFeet)
  }) 
  
  let FinalValue = WebAppValue - WebAppValue*Number(Discount)/100;

  let CSValue :number;
  if(DealerDiscount==="0")
  {
   CSValue = FinalValue
  }
  if(DealerDiscount!=="0")
  {
   CSValue = Math.ceil(WebAppValue - WebAppValue*Number(DealerDiscount)*0.01);
  }
   

  
  let newOrderNumber :string;
  if(this.PrevOrder.OrderNo.includes("/V-"))
  {
    let hyphen = this.PrevOrder.OrderNo.lastIndexOf("-");
    let version = this.PrevOrder.OrderNo.substring(hyphen+ 1, this.PrevOrder.OrderNo.length);
    let newVersion = Number(version)+1;
    newOrderNumber = this.PrevOrder.OrderNo.substring(0,hyphen+ 1)+newVersion;
  
  }
  if(!this.PrevOrder.OrderNo.includes("/V-"))
  {
  newOrderNumber = this.PrevOrder.OrderNo+"/V-1";
  }

  const orderPrev : Order  = {
    _id : _id,
    OrderNo : this.PrevOrder.OrderNo,
    ProjectName : this.PrevOrder.ProjectName,
    ClientName : this.PrevOrder.ClientName,
    Location : this.PrevOrder.Location,
    Architect : this.PrevOrder.Architect,
    Source : this.PrevOrder.Source,
    Solutions: this.PrevOrder.Solutions,
    Discount : this.PrevOrder.Discount,
    Advance : this.PrevOrder.Advance,
    FinalAmount : this.PrevOrder.FinalAmount,
    GrandTotal :this.PrevOrder.GrandTotal,
    Status :this.PrevOrder.Status,
    Active : "InActive",
    Completed :  this.PrevOrder.Completed,
    CreationDate : this.PrevOrder.CreationDate,
    EditDate : this.PrevOrder.EditDate,
    WinDate : this.PrevOrder.WinDate,
    Associate : this.PrevOrder.Associate,
    ProjectManager : this.PrevOrder.ProjectManager,
    ProjectID : this.PrevOrder.ProjectID,
    OfficeID : OfficeID,
    TotalSquareFeet : this.PrevOrder.TotalSquareFeet,
    CSValue : this.PrevOrder.CSValue,
    CompletionDate : this.PrevOrder.CreationDate,
    DateCreated : this.PrevOrder.DateCreated,
    CommercialWinDate : this.PrevOrder.CommercialWinDate,
    HandOverDate : this.PrevOrder.HandOverDate,
    LedgerDetails : this.PrevOrder.LedgerDetails,
    ProPlan :  this.PrevOrder.ProPlan,
    ProValue :  this.PrevOrder.ProValue
    
    
  }
  
  if(!this.PrevOrder.ProjectID)
  {
   
    this.http.put(this.hostUrl+"/api/orders/updateold/"+ _id ,orderPrev).subscribe(responseData => {

    });
  }

  if(this.PrevOrder.ProjectID==="0")
  {
   
    this.http.put(this.hostUrl+"/api/orders/updateold/"+ _id ,orderPrev).subscribe(responseData => {

    });
  }
 

  const order : Order  = {
    _id : _id,
    OrderNo : newOrderNumber,
    ProjectName : ProjectName.toUpperCase(),
    ClientName : ClientName.toUpperCase(),
    Location : Location.toUpperCase(),
    Architect : Architect.toUpperCase(),
    Source : Source,
    Solutions: this.Solutions,
    Discount : Discount,
    Advance : Advance,
    FinalAmount : FinalValue.toString(),
    GrandTotal : WebAppValue.toString(),
    Status : this.PrevOrder.Status,
    Active : "Active",
    Completed :  this.PrevOrder.Completed,
    CreationDate : this.PrevOrder.CreationDate,
    EditDate : EditDateFormat,
    WinDate : this.PrevOrder.WinDate,
    Associate : this.PrevOrder.Associate,
    ProjectManager : ProjectManager,
    ProjectID :  this.PrevOrder.ProjectID,
    OfficeID : OfficeID,
    TotalSquareFeet : TotalSquareFeet.toFixed(3).toString(),
    CSValue : CSValue.toString(),
    CompletionDate : CompletionDate,  
    DateCreated : this.PrevOrder.DateCreated,
    CommercialWinDate : this.PrevOrder.CommercialWinDate,
    HandOverDate : this.PrevOrder.HandOverDate,
    LedgerDetails : this.PrevOrder.LedgerDetails,
    ProPlan :  this.PrevOrder.ProPlan,
    ProValue :  this.PrevOrder.ProValue
  
  }
  
  
  if(this.PrevOrder.Status==="Pipeline")
  {
    let NewAndOldOrder2 = {
      NewOrder : order,
      OldOrder : "",
      User : "",
      UserID : "",
      Profile : "" 
     }
   

    

    this.http.post<{message : string, orderId : string}>(this.hostUrl+"/api/orders/createnew",NewAndOldOrder2).subscribe(responseData => {
  
  
  
    let id = responseData.orderId;
    this.router.navigate(["/presentation/"+id]);
  
   })
  }

  if(this.PrevOrder.Status==="Win"||this.PrevOrder.Status==="Commercial Hold"||this.PrevOrder.Status==="Old Win") 
  {



    if(!this.PrevOrder.ProjectID)
    {

      const orderPrev : Order  = {
        _id : _id,
        OrderNo : this.PrevOrder.OrderNo,
        ProjectName : this.PrevOrder.ProjectName,
        ClientName : this.PrevOrder.ClientName,
        Location : this.PrevOrder.Location,
        Architect : this.PrevOrder.Architect,
        Source : this.PrevOrder.Source,
        Solutions: this.PrevOrder.Solutions,
        Discount : this.PrevOrder.Discount,
        Advance : this.PrevOrder.Advance,
        FinalAmount : this.PrevOrder.FinalAmount,
        GrandTotal :this.PrevOrder.GrandTotal,
        Status : "Edited",
        Active : "InActive",
        Completed :  this.PrevOrder.Completed,
        CreationDate : this.PrevOrder.CreationDate,
        EditDate : EditDateFormat,
        WinDate : this.PrevOrder.WinDate,
        Associate : this.PrevOrder.Associate,
        ProjectManager : this.PrevOrder.ProjectManager,
        ProjectID : this.PrevOrder.ProjectID,
        OfficeID : OfficeID,
        TotalSquareFeet : this.PrevOrder.TotalSquareFeet,
        CSValue : this.PrevOrder.CSValue,
        CompletionDate : this.PrevOrder.CreationDate,
        DateCreated : this.PrevOrder.DateCreated,
        CommercialWinDate : this.PrevOrder.CommercialWinDate,
        HandOverDate : this.PrevOrder.HandOverDate,
        LedgerDetails : this.PrevOrder.LedgerDetails,
        ProPlan :  this.PrevOrder.ProPlan,
        ProValue :  this.PrevOrder.ProValue
      
      }

     
     
      this.http.put<{message : string, orders : Order}>(this.hostUrl+"/api/orders/updateold/"+ _id ,orderPrev).subscribe(responseData => {
       
        let OldOrder = responseData.orders
  
  
        let NewAndOldOrder = {
         NewOrder : order,
         OldOrder : OldOrder,
         User : Associate,
         UserID : userID,
         Profile :ActualProfile 
        }
  
        console.log(NewAndOldOrder)
  
  
        
        this.http.post<{message : string, orderId : string}>(this.hostUrl+"/api/orders/createnew",NewAndOldOrder).subscribe(responseData => {
    
          let id = responseData.orderId;
          this.Sdialog.closeAll()
          this.router.navigate(["/presentation/"+id]);
             
         })
      
      });
      

    }


    if(this.PrevOrder.ProjectID==="0")
    {

      const orderPrev : Order  = {
        _id : _id,
        OrderNo : this.PrevOrder.OrderNo,
        ProjectName : this.PrevOrder.ProjectName,
        ClientName : this.PrevOrder.ClientName,
        Location : this.PrevOrder.Location,
        Architect : this.PrevOrder.Architect,
        Source : this.PrevOrder.Source,
        Solutions: this.PrevOrder.Solutions,
        Discount : this.PrevOrder.Discount,
        Advance : this.PrevOrder.Advance,
        FinalAmount : this.PrevOrder.FinalAmount,
        GrandTotal :this.PrevOrder.GrandTotal,
        Status : "Edited",
        Active : "InActive",
        Completed :  this.PrevOrder.Completed,
        CreationDate : this.PrevOrder.CreationDate,
        EditDate : EditDateFormat,
        WinDate : this.PrevOrder.WinDate,
        Associate : this.PrevOrder.Associate,
        ProjectManager : this.PrevOrder.ProjectManager,
        ProjectID : this.PrevOrder.ProjectID,
        OfficeID : OfficeID,
        TotalSquareFeet : this.PrevOrder.TotalSquareFeet,
        CSValue : this.PrevOrder.CSValue,
        CompletionDate : this.PrevOrder.CreationDate,
        DateCreated : this.PrevOrder.DateCreated,
        CommercialWinDate : this.PrevOrder.CommercialWinDate,
        HandOverDate : this.PrevOrder.HandOverDate,
        LedgerDetails : this.PrevOrder.LedgerDetails,
        ProPlan :  this.PrevOrder.ProPlan,
        ProValue :  this.PrevOrder.ProValue
      
      }

   
     
      this.http.put<{message : string, orders : Order}>(this.hostUrl+"/api/orders/updateold/"+ _id ,orderPrev).subscribe(responseData => {
       
        let OldOrder = responseData.orders
  
  
        let NewAndOldOrder = {
         NewOrder : order,
         OldOrder : OldOrder,
         User : Associate,
         UserID : userID,
         Profile :ActualProfile 
        }
  
        console.log(NewAndOldOrder)
  
  
        
        this.http.post<{message : string, orderId : string}>(this.hostUrl+"/api/orders/createnew",NewAndOldOrder).subscribe(responseData => {
    
          let id = responseData.orderId;
          this.Sdialog.closeAll()
          this.router.navigate(["/presentation/"+id]);
             
         })
      
      });
      

    }




    if(this.PrevOrder.ProjectID)
    {
       
      const dialogConfig2 = new MatDialogConfig();
      dialogConfig2.disableClose =true;
      dialogConfig2.autoFocus =true; 
      this.Sdialog.open(LoaderComponent,dialogConfig2)


      const orderPrev : Order  = {
        _id : _id,
        OrderNo : this.PrevOrder.OrderNo,
        ProjectName : this.PrevOrder.ProjectName,
        ClientName : this.PrevOrder.ClientName,
        Location : this.PrevOrder.Location,
        Architect : this.PrevOrder.Architect,
        Source : this.PrevOrder.Source,
        Solutions: this.PrevOrder.Solutions,
        Discount : this.PrevOrder.Discount,
        Advance : this.PrevOrder.Advance,
        FinalAmount : this.PrevOrder.FinalAmount,
        GrandTotal :this.PrevOrder.GrandTotal,
        Status : "Edited",
        Active : "InActive",
        Completed :  this.PrevOrder.Completed,
        CreationDate : this.PrevOrder.CreationDate,
        EditDate : EditDateFormat,
        WinDate : this.PrevOrder.WinDate,
        Associate : this.PrevOrder.Associate,
        ProjectManager : this.PrevOrder.ProjectManager,
        ProjectID : this.PrevOrder.ProjectID,
        OfficeID : OfficeID,
        TotalSquareFeet : this.PrevOrder.TotalSquareFeet,
        CSValue : this.PrevOrder.CSValue,
        CompletionDate : this.PrevOrder.CreationDate,
        DateCreated : this.PrevOrder.DateCreated,
        CommercialWinDate : this.PrevOrder.CommercialWinDate,
        HandOverDate : this.PrevOrder.HandOverDate,
        LedgerDetails : this.PrevOrder.LedgerDetails,
        ProPlan :  this.PrevOrder.ProPlan,
        ProValue :  this.PrevOrder.ProValue
      
      }


     



      this.procoreService.UpdateProcoreProject(order).subscribe((response)=>{

        if(!response.ProjectID)
        {
            
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose =true;
          dialogConfig.autoFocus =true;
          this.Edialog.open(ErrorComponent,dialogConfig)
          this.Edialog.closeAll()

        }

        if(response.ProjectID)
        {

          var projectID = response.ProjectID
          var NewOrder = response.Order

          this.http.put<{message : string, orders : Order}>(this.hostUrl+"/api/orders/updateold/"+ _id ,orderPrev).subscribe(responseData => {
       
            let OldOrder = responseData.orders
      
      
            let NewAndOldOrder = {
             NewOrder : order,
             OldOrder : OldOrder,
             User : Associate,
             UserID : userID,
             Profile :ActualProfile 
            }
      
         
      
      
            
            this.http.post<{message : string, orderId : string}>(this.hostUrl+"/api/orders/createnew",NewAndOldOrder).subscribe(responseData => {
        
              let id = responseData.orderId;
              this.Sdialog.closeAll();
              this.router.navigate(["/presentation/"+id]);
                 
             })
          
          });

    
        }


      



      })


      /*
     
      this.http.put<{message : string, orders : Order}>(this.hostUrl+"/api/orders/updateold/"+ _id ,orderPrev).subscribe(responseData => {
       
        let OldOrder = responseData.orders
  
  
        let NewAndOldOrder = {
         NewOrder : order,
         OldOrder : OldOrder,
         User : Associate,
         UserID : userID,
         Profile :ActualProfile 
        }
  
      
  
  
        
        this.http.post<{message : string, orderId : string}>(this.hostUrl+"/api/orders/createnew",NewAndOldOrder).subscribe(responseData => {
    
          let id = responseData.orderId;
          this.router.navigate(["/presentation/"+id]);
             
         })
      
      });

      */

    }
   
   
   
   

   
  }
 }

 

  
  
  
  








}






getCurrentDateTime() {
  this.http.get('http://worldtimeapi.org/api/timezone/UTC').subscribe((response : any)=>{
    this.currentDateTime = new Date(response.datetime);
  })
   
}


}


