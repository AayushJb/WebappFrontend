import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Glasscat } from '../shared/glasscat.model';
import { Glassfinish } from '../shared/glassfinish.model';
import { Glasssubcat } from '../shared/glasssubcat.model';
import { Glassvariant } from '../shared/glassvariant.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoaderComponent } from '../header/projects/loader/loader.component';
import { GeneralSetting } from '../shared/generalsetting.model';
import { GlassSolution } from '../shared/glasssolution.model';
import { GlassOrder } from '../shared/glassorder.model';
import { Glassonlyfinish } from '../shared/glassonlyfinish.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlassonlyService {

  hostUrl = environment.hostURL;
  GlassSolutions : GlassSolution[] = [];
  glassorders : GlassOrder;
  glasssizes : any[] = []
  public PrevOrder : GlassOrder;
  private glasssizesUpdated = new Subject<any[]>()
  

  constructor( private http : HttpClient, private router : Router ,
    private Sdialog : MatDialog
    ) { }





   

getGlassOrder(_id : string){

  return this.http.get<GlassOrder>(this.hostUrl+"/api/glassorders/"+ _id)//=====check
    
}



  getGeneralSetting(){
    let id = "621c77a42bad8bd8a55ae50b";
    return this.http.get<{_id:string, Counter:string, Prefix: string, Factor:string, GridCost:string, DoorCloserCost:string, DropSealCost:string,GlassFactor : string,GlassCounter :string}>(this.hostUrl+"/api/generalsettings/"+ id)
   }

   
  getUsers(){
    return this.http.get<{message: string, users : User[]}>(this.hostUrl+"/api/users");
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

  getGlassOnlyFinishes(){

    return this.http.get<{message: string, glassonlyfinish : Glassonlyfinish[]}>(this.hostUrl+"/api/glassonlyfinishes");

  }



 
  addAndUpdateSolutions( OrderCompleted : string,
    OrderStatus : string,
    orderId : string,
    EditSpace : number,
    Mode : string,
    SolutionName : string,
    GlassApplication : string,
    GlassCategory : string,
    GlassSubCategory : string,
    ThicknessFrom : string,
    ThicknessTo : string,
    GlassFinish : string,
    GlassVariant : string,
    Sizes : string[],
    Tempered : string,
    Matte : string,
    Amount : string,
    Squarefeet : string,
    Weight : string,
    Pieces : string,
    TempChargeSol : string
    )
  {

 

         
   

if(Mode ==="Addnew"||Mode ==="SaveAndAddnew"){
{ 
 
  var glasssolution : GlassSolution = {

    SolutionName : SolutionName,
    GlassApplication : GlassApplication,
    GlassCategory : GlassCategory,
    GlassSubCategory : GlassSubCategory,
    ThicknessFrom: ThicknessFrom,
    ThicknessTo: ThicknessTo,
    GlassFinish: GlassFinish,
    GlassVariant: GlassVariant,
    Sizes: Sizes,
    Tempered: Tempered,
    Matte: Matte,
    Amount: Amount,
    Squarefeet: Squarefeet,
    Weight: Weight,
    Pieces : Pieces,
    TempChargeSol : TempChargeSol

  }
    
  this.GlassSolutions.push(glasssolution)


 if(OrderCompleted!=="YES")
 {
/*
  this.http.post<{message : string,orders : Order}>(this.hostUrl+"/api/orders/pushsolutions/"+orderId,this.Solutions).subscribe(responseData => {
    console.log(responseData)
  })
*/
 } 

}

}

if(Mode==="UpdateSpace")
{      


{
  var updatedglasssolution : GlassSolution = {

    SolutionName : SolutionName,
    GlassApplication : GlassApplication,
    GlassCategory : GlassCategory,
    GlassSubCategory : GlassSubCategory,
    ThicknessFrom: ThicknessFrom,
    ThicknessTo: ThicknessTo,
    GlassFinish: GlassFinish,
    GlassVariant: GlassVariant,
    Sizes: Sizes,
    Tempered: Tempered,
    Matte: Matte,
    Amount: Amount,
    Squarefeet: Squarefeet,
    Weight: Weight,
    Pieces : Pieces,
    TempChargeSol : TempChargeSol
 
  }
   
  this.GlassSolutions[EditSpace]= updatedglasssolution; 

  if(OrderCompleted!=="YES")
  {  
    /*   
  this.http.post<{message : string,orders : Order}>(this.hostUrl+"/api/orders/pushsolutions/"+orderId,this.Solutions).subscribe(responseData => {
    
    this.Solutions[EditSpace]= updatedsolution
  
 
  })

  */
  }
}

if(OrderStatus==="Win"||OrderStatus==="Commercial Hold")
{  


     //=================Spinner Dialog================
     const dialogConfig2 = new MatDialogConfig();
     dialogConfig2.disableClose =true;
     dialogConfig2.autoFocus =true;
     this.Sdialog.open(LoaderComponent,dialogConfig2)
    //================================================= 

    var updatedWinGlassSolution : GlassSolution = {
   
      SolutionName : SolutionName,
      GlassApplication : GlassApplication,
      GlassCategory : GlassCategory,
      GlassSubCategory : GlassSubCategory,
      ThicknessFrom: ThicknessFrom,
      ThicknessTo: ThicknessTo,
      GlassFinish: GlassFinish,
      GlassVariant: GlassVariant,
      Sizes: Sizes,
      Tempered: Tempered,
      Matte: Matte,
      Amount: Amount,
      Squarefeet: Squarefeet,
      Weight: Weight,
      Pieces : Pieces,
      TempChargeSol : TempChargeSol
    
    }
      
    this.GlassSolutions[EditSpace]=  updatedWinGlassSolution;
    this.Sdialog.closeAll()
  

    
   

  
  
}
   
}
 
this.glasssizes = []

  }



  addOrders(
    WaltzOrderNo : string,
    ProjectName : string,
    ClientName : string,
    Location : string,
    Architect : string,
    GST : string,
    Source : string,
    UserFullName : string,
    Completed : string
        )

        {


           //=================Spinner Dialog================
           const dialogConfig2 = new MatDialogConfig();
           dialogConfig2.disableClose =true;
           dialogConfig2.autoFocus =true;
           this.Sdialog.open(LoaderComponent,dialogConfig2)
          //=================================================   

          let id = "621c77a42bad8bd8a55ae50b";

          
          this.http.put<{message : string,generalsettings :GeneralSetting}>(this.hostUrl+"/api/generalsettings/glasscounter/"+ id,id)
          .subscribe(GSData =>{

            let Counter = GSData.generalsettings.GlassCounter;
            let Prefix = GSData.generalsettings.Prefix;

            let now = new Date();
            let nowDate = now.getDate();
            let nowMonth = now.getMonth()+1;
            let nowYear = now.getFullYear();
            let Sour = Source.substring(0,3);
            let Loc = Location.substring(0,3);
            let CreationDate = nowDate + "-" + nowMonth + "-" + nowYear;

            let OrderNumber = Prefix+"/"+nowDate+"-"+nowMonth+"/"+Loc+"/"+Sour+"/"+Counter;


         
  


            this.GlassSolutions = [];

            const order: GlassOrder = {
              _id:null,
              WaltzOrderNo : WaltzOrderNo,
              OrderNo : OrderNumber,
              ProjectName : ProjectName.toUpperCase(),
              ClientName : ClientName.toUpperCase(),
              Location : Location.toUpperCase(),
              Architect : Architect.toUpperCase(),
              GST : GST,
              Source : Source,
              Solutions: this.GlassSolutions,
              Discount : "0",
              Advance : "100",
              FinalAmount : "0",
              GrandTotal :"0",
              TempCharge: "0",
              Packing : "0",
              Freight : "0",
              OtherCharges : "0", 
              Status : "Pipeline",
              Active : "Active",
              Completed : Completed,
              CreationDate : CreationDate,
              EditDate : "",
              WinDate : "",
              Associate : UserFullName,
              ProjectManager : "",
              TotalSquareFeet : "",
              CSValue : "",
              CompletionDate : "",
              DateCreated : "",
              CommercialWinDate : "",
              HandOverDate : "",
              LedgerDetails : "",
              ProPlan : "",
              ProValue : "",
              Pieces : "",
              DiscountPercent : "Percent",
              FreightPercent : "Percent",
              PackingPercent :  "Percent",
              OtherChargesPercent :  "Percent",
              Insurance : "NO",
              InsuranceCost: ""
            }
         
           
            this.http.post<{message: string, orderId: string}>(this.hostUrl+"/api/glassorders", order)
              .subscribe((responseData)=>{
              let id = responseData.orderId;
              this.router.navigate(["/glassproject/"+id]);
             });
            

            
           //  this.router.navigate(["/glassproject/"+id]);
           //this.router.navigate(["/glassproject"]);

             this.Sdialog.closeAll();







          })




}


updateOrder
( Insurance  : string,
  FreightPercent : string,
  PackingPercent :  string,
  OtherChargesPercent :  string,
  DiscountPercent : string,
  Packing : number,
  Freight : number,
  OtherCharges : number,
  formmode :string,
  _id :string,
  WaltzOrderNo : string,
  OrderNo : string,
  ProjectName : string,
  ClientName : string,
  Location : string,
  Architect : string,
  GST : string,
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
  DealerDiscount : string,
  DateCreated : string,
  userID : string,
  ActualProfile : string
)
{

 

 if(formmode==="newOrder")
 {
  
  
  let now = new Date();
  let nowDate = now.getDate();
  let nowMonth = now.getMonth()+1;
  let nowYear = now.getFullYear();
  let EditDateFormat :string = nowDate + "-" + nowMonth + "-" + nowYear;//nowYear +"-"+nowMonth +"-"+nowDate;

  let WebAppValue : number = 0 ;  
  let Pieces : number = 0;
  let TotalSquareFeet : number = 0;  
   
  let TempCharge1 = 0;
  let Packing1  = 0;
  let Freight1  = 0;
  let OtherCharges1 = 0; 



  this.GlassSolutions.map(item =>{
   WebAppValue = WebAppValue + Number(item.Amount);
   TotalSquareFeet = TotalSquareFeet + Number(item.Squarefeet);
   Pieces = Pieces  + Number(item.Pieces)
   TempCharge1 = TempCharge1 + Number(item.TempChargeSol)

  }) 

  
  let FinalTemp1 = WebAppValue + TempCharge1;
  let FinalTemp2 = 0
  
  if(DiscountPercent==="Percent")
  {
    FinalTemp2 = FinalTemp1 - FinalTemp1*Number(Discount)*0.01
  }
  if(DiscountPercent==="Value")
  {
    FinalTemp2 = FinalTemp1 - Number(Discount)
  }


  if(FreightPercent==="Percent")
  {
    Freight1 = FinalTemp2*Freight*0.01
  }
  if(FreightPercent==="Value")
  {
    Freight1 = Freight
  }

  if(PackingPercent==="Percent")
  {
    Packing1 = FinalTemp2*Packing*0.01
  }
  if(PackingPercent==="Value")
  {
    Packing1 = Packing
  }

  if(OtherChargesPercent==="Percent")
  {
    OtherCharges1 = FinalTemp2*OtherCharges*0.01
  }
  if(OtherChargesPercent==="Value")
  {
    OtherCharges1 = OtherCharges
  }

  if(Associate!=="AMIT PANDEY")
  {
    Packing1 = 0;
    Freight1 = 0;
    OtherCharges1 = 0;
    
  }
  



  let FinalTemp3 = Number(FinalTemp2) + Number(Packing1) + Number(Freight1) + Number(OtherCharges1)
  let FinalTemp4 =0
  let InsuranceCost = 0
  if(Insurance==="YES")
  {
   FinalTemp4 = Number(FinalTemp3) + Number(FinalTemp3)*0.026;
   InsuranceCost = Number(FinalTemp3)*0.026
  }
  if(Insurance==="NO")
  {
   FinalTemp4 = Number(FinalTemp3) + Number(FinalTemp3)*0
   InsuranceCost = 0
  }
  
  let FinalValue = Number(FinalTemp4)  +  Number(FinalTemp4)*0.18

 
  let CSValue : number;
  if(DealerDiscount==="0")
  {
   CSValue = FinalValue
  }
  if(DealerDiscount!=="0")
  {
   CSValue = Math.ceil(WebAppValue - WebAppValue*Number(DealerDiscount)*0.01);
  }
   
  


  const orderPrev : GlassOrder  = {
    _id : _id,
    WaltzOrderNo : this.PrevOrder.WaltzOrderNo,
    OrderNo : this.PrevOrder.OrderNo,
    ProjectName : ProjectName.toUpperCase(),
    ClientName : ClientName.toUpperCase(),
    Location : Location.toUpperCase(),
    Architect : Architect.toUpperCase(),
    GST : GST,
    Source : Source,
    Solutions: this.GlassSolutions,
    Discount : Discount,
    Advance : Advance,
    FinalAmount : FinalValue.toString(),
    GrandTotal : WebAppValue.toString(),
    TempCharge: TempCharge1.toFixed(2).toString(),
    Packing : Packing.toString(),
    Freight : Freight.toString(),
    OtherCharges : OtherCharges.toString(), 
    Status : "Pipeline",
    Active : "Active",
    Completed :  "YES",
    CreationDate :this.PrevOrder.CreationDate,
    EditDate : EditDateFormat,
    WinDate : WinDate,
    Associate : this.PrevOrder.Associate,
    ProjectManager : ProjectManager,
    TotalSquareFeet : TotalSquareFeet.toFixed(2).toString(),
    CSValue : CSValue.toString(),
    CompletionDate : CompletionDate,
    DateCreated : this.PrevOrder.CreationDate,
    CommercialWinDate : this.PrevOrder.CommercialWinDate,
    HandOverDate : this.PrevOrder.HandOverDate,
    LedgerDetails : this.PrevOrder.LedgerDetails,
    ProPlan :  this.PrevOrder.ProPlan,
    ProValue :  this.PrevOrder.ProValue,
    Pieces : Pieces.toString(),
    DiscountPercent : DiscountPercent,
    FreightPercent : FreightPercent,
    PackingPercent :  PackingPercent,
    OtherChargesPercent :  OtherChargesPercent,
    Insurance  : Insurance,
    InsuranceCost  : InsuranceCost.toString()
  
  }
  
 // this.procoreService.updateProcoreProject(orderPrev)

  this.http.put(this.hostUrl+"/api/glassorders/updateorder/"+ _id ,orderPrev).subscribe(responseData => {
   console.log(responseData)


    this.router.navigate(["/glasspresentation/"+_id]);
  });


 }



 if(formmode==="editOrder")
 {
 
  let now = new Date();
  let nowDate = now.getDate();
  let nowMonth = now.getMonth()+1;
  let nowYear = now.getFullYear();
  let EditDateFormat :string = nowDate + "-" + nowMonth + "-" + nowYear;
  
  //nowYear +"-"+nowMonth +"-"+nowDate;
  
  let WebAppValue : number = 0 ;  
  let TotalSquareFeet : number = 0;   
  let Pieces : number = 0;     
  let TempCharge1 = 0;
  let Packing1  = 0;
  let Freight1  = 0;
  let OtherCharges1 = 0; 




  this.GlassSolutions.map(item =>{

    WebAppValue = WebAppValue + Number(item.Amount);
    TotalSquareFeet = TotalSquareFeet + Number(item.Squarefeet);
    Pieces = Pieces  + Number(item.Pieces)
    TempCharge1 = TempCharge1 + Number(item.TempChargeSol)
 
   }) 

 
   
   let FinalTemp1 = WebAppValue + TempCharge1;
   let FinalTemp2 = 0
   
   if(DiscountPercent==="Percent")
   {
     FinalTemp2 = FinalTemp1 - FinalTemp1*Number(Discount)*0.01
   }
   if(DiscountPercent==="Value")
   {
     FinalTemp2 = FinalTemp1 - Number(Discount)
   }
 
 
   if(FreightPercent==="Percent")
   {
     Freight1 = FinalTemp2*Freight*0.01
   }
   if(FreightPercent==="Value")
   {
     Freight1 = Freight
   }
 
   if(PackingPercent==="Percent")
   {
     Packing1 = FinalTemp2*Packing*0.01
   }
   if(PackingPercent==="Value")
   {
     Packing1 = Packing
   }
 
   if(OtherChargesPercent==="Percent")
   {
     OtherCharges1 = FinalTemp2*OtherCharges*0.01
   }
   if(OtherChargesPercent==="Value")
   {
     OtherCharges1 = OtherCharges
   }
 
   if(Associate!=="AMIT PANDEY")
   {
     Packing1 = 0;
     Freight1 = 0;
     OtherCharges1 = 0;
     
   }
   
   
   let FinalTemp3 = Number(FinalTemp2) + Number(Packing1) + Number(Freight1) + Number(OtherCharges1)
   let FinalTemp4 =0
   let InsuranceCost = 0
   if(Insurance==="YES")
   {
    FinalTemp4 = Number(FinalTemp3) + Number(FinalTemp3)*0.026;
    InsuranceCost = Number(FinalTemp3)*0.026
   }
   if(Insurance==="NO")
   {
    FinalTemp4 = Number(FinalTemp3) + Number(FinalTemp3)*0
    InsuranceCost = 0
   }
   
   let FinalValue = Number(FinalTemp4)  +  Number(FinalTemp4)*0.18
 
  
  
 
 


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

  const orderPrev : GlassOrder  = {
    _id : _id,
    WaltzOrderNo : this.PrevOrder.WaltzOrderNo,
    OrderNo : this.PrevOrder.OrderNo,
    ProjectName : this.PrevOrder.ProjectName,
    ClientName : this.PrevOrder.ClientName,
    Location : this.PrevOrder.Location,
    Architect : this.PrevOrder.Architect,
    GST : this.PrevOrder.GST,
    Source : this.PrevOrder.Source,
    Solutions: this.PrevOrder.Solutions,
    Discount : this.PrevOrder.Discount,
    Advance : this.PrevOrder.Advance,
    FinalAmount : this.PrevOrder.FinalAmount,
    GrandTotal :this.PrevOrder.GrandTotal,
    TempCharge: this.PrevOrder.TempCharge,
    Packing : this.PrevOrder.Packing,
    Freight : this.PrevOrder.Freight,
    OtherCharges : this.PrevOrder.OtherCharges, 
    Status :this.PrevOrder.Status,
    Active : "InActive",
    Completed :  this.PrevOrder.Completed,
    CreationDate : this.PrevOrder.CreationDate,
    EditDate : this.PrevOrder.EditDate,
    WinDate : this.PrevOrder.WinDate,
    Associate : this.PrevOrder.Associate,
    ProjectManager : this.PrevOrder.ProjectManager,
    TotalSquareFeet : this.PrevOrder.TotalSquareFeet,
    CSValue : this.PrevOrder.CSValue,
    CompletionDate : this.PrevOrder.CreationDate,
    DateCreated : this.PrevOrder.DateCreated,
    CommercialWinDate : this.PrevOrder.CommercialWinDate,
    HandOverDate : this.PrevOrder.HandOverDate,
    LedgerDetails : this.PrevOrder.LedgerDetails,
    ProPlan :  this.PrevOrder.ProPlan,
    ProValue :  this.PrevOrder.ProValue,
    Pieces : this.PrevOrder.Pieces,
    DiscountPercent : this.PrevOrder.DiscountPercent,
    FreightPercent : this.PrevOrder.FreightPercent,
    PackingPercent :  this.PrevOrder.PackingPercent,
    OtherChargesPercent : this.PrevOrder.OtherChargesPercent,
    Insurance  : this.PrevOrder.Insurance,
    InsuranceCost  : this.PrevOrder.InsuranceCost
    
    
  }
  

   
  this.http.put(this.hostUrl+"/api/glassorders/updateold/"+ _id ,orderPrev).subscribe(responseData => {

  });
  


  const order : GlassOrder  = {
    _id : _id,
    WaltzOrderNo : this.PrevOrder.WaltzOrderNo,
    OrderNo : newOrderNumber,
    ProjectName : ProjectName.toUpperCase(),
    ClientName : ClientName.toUpperCase(),
    Location : Location.toUpperCase(),
    Architect : Architect.toUpperCase(),
    GST : GST,
    Source : Source,
    Solutions: this.GlassSolutions,
    Discount : Discount,
    Advance : Advance,
    FinalAmount : FinalValue.toString(),
    GrandTotal : WebAppValue.toString(),
    TempCharge: TempCharge1.toFixed(2).toString(),
    Packing :  Packing.toString(),
    Freight :  Freight.toString(),
    OtherCharges : OtherCharges.toString(), 
    Status : this.PrevOrder.Status,
    Active : "Active",
    Completed :  this.PrevOrder.Completed,
    CreationDate : this.PrevOrder.CreationDate,
    EditDate : EditDateFormat,
    WinDate : this.PrevOrder.WinDate,
    Associate : this.PrevOrder.Associate,
    ProjectManager : ProjectManager,
    TotalSquareFeet : TotalSquareFeet.toFixed(2).toString(),
    CSValue : CSValue.toString(),
    CompletionDate : CompletionDate,  
    DateCreated : this.PrevOrder.DateCreated,
    CommercialWinDate : this.PrevOrder.CommercialWinDate,
    HandOverDate : this.PrevOrder.HandOverDate,
    LedgerDetails : this.PrevOrder.LedgerDetails,
    ProPlan :  this.PrevOrder.ProPlan,
    ProValue :  this.PrevOrder.ProValue,
    Pieces  : Pieces.toString(),
    DiscountPercent : DiscountPercent,
    FreightPercent : FreightPercent,
    PackingPercent :  PackingPercent,
    OtherChargesPercent : OtherChargesPercent,
    Insurance  : Insurance,
    InsuranceCost  : InsuranceCost.toString()
    
    

  
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
   

    

    this.http.post<{message : string, orderId : string}>(this.hostUrl+"/api/glassorders/createnew",NewAndOldOrder2).subscribe(responseData => {
  
  
  
    let id = responseData.orderId;

   

     this.router.navigate(["/glasspresentation/"+id]);
  
   })
  }

  if(this.PrevOrder.Status==="Win"||this.PrevOrder.Status==="Commercial Hold"||this.PrevOrder.Status==="Old Win") 
  {



    
    
      const orderPrev : GlassOrder  = {
        _id : _id,
        WaltzOrderNo : this.PrevOrder.WaltzOrderNo,
        OrderNo : this.PrevOrder.OrderNo,
        ProjectName : this.PrevOrder.ProjectName,
        ClientName : this.PrevOrder.ClientName,
        Location : this.PrevOrder.Location,
        Architect : this.PrevOrder.Architect,
        GST : this.PrevOrder.GST,
        Source : this.PrevOrder.Source,
        Solutions: this.PrevOrder.Solutions,
        Discount : this.PrevOrder.Discount,
        Advance : this.PrevOrder.Advance,
        FinalAmount : this.PrevOrder.FinalAmount,
        GrandTotal :this.PrevOrder.GrandTotal,
        TempCharge: this.PrevOrder.TempCharge,
        Packing : this.PrevOrder.Packing,
        Freight : this.PrevOrder.Freight,
        OtherCharges : this.PrevOrder.OtherCharges, 
        Status : "Edited",
        Active : "InActive",
        Completed :  this.PrevOrder.Completed,
        CreationDate : this.PrevOrder.CreationDate,
        EditDate : EditDateFormat,
        WinDate : this.PrevOrder.WinDate,
        Associate : this.PrevOrder.Associate,
        ProjectManager : this.PrevOrder.ProjectManager,
        TotalSquareFeet : this.PrevOrder.TotalSquareFeet,
        CSValue : this.PrevOrder.CSValue,
        CompletionDate : this.PrevOrder.CreationDate,
        DateCreated : this.PrevOrder.DateCreated,
        CommercialWinDate : this.PrevOrder.CommercialWinDate,
        HandOverDate : this.PrevOrder.HandOverDate,
        LedgerDetails : this.PrevOrder.LedgerDetails,
        ProPlan :  this.PrevOrder.ProPlan,
        ProValue :  this.PrevOrder.ProValue,
        Pieces : this.PrevOrder.Pieces,
        DiscountPercent : this.PrevOrder.DiscountPercent,
        FreightPercent : this.PrevOrder.FreightPercent,
        PackingPercent :  this.PrevOrder.PackingPercent,
        OtherChargesPercent : this.PrevOrder.OtherChargesPercent,
        Insurance  : this.PrevOrder.Insurance,
        InsuranceCost  : this.PrevOrder.InsuranceCost
        
      
      }

     
     
      this.http.put<{message : string, orders : GlassOrder}>(this.hostUrl+"/api/glassorders/updateold/"+ _id ,orderPrev).subscribe(responseData => {
       
        let OldOrder = responseData.orders
  
  
        let NewAndOldOrder = {
         NewOrder : order,
         OldOrder : OldOrder,
         User : Associate,
         UserID : userID,
         Profile :ActualProfile 
        }
  
        console.log(NewAndOldOrder)
  
  
        
        this.http.post<{message : string, orderId : string}>(this.hostUrl+"/api/glassorders/createnew",NewAndOldOrder).subscribe(responseData => {
    
          let id = responseData.orderId;
          this.Sdialog.closeAll()
          this.router.navigate(["/glasspresentation/"+id]);
             
         })
      
      });
      

    


  




   
   
   

   
  }
 }

 

  
  
  
  








}


getSizesUpdateListener(){

  this.glasssizesUpdated.next(this.glasssizes);

  return this.glasssizesUpdated.asObservable();

 }


 deleteGlassSolution(index)
 {
  this.GlassSolutions.splice(index, 1);
 
 }


 getAnalyticsOrderNew()
 {
   return this.http.get<{message: string, orders : GlassOrder[]}>(this.hostUrl+"/api/glassorders/allanalyticsorders");

 }



}
