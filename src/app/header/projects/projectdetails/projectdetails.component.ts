import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PunchserviceService } from 'src/app/services/punchservice.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Order } from 'src/app/shared/order.model';
import { Subscription } from 'rxjs';
import { GetjbService } from 'src/app/services/getjb.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css']
})
export class ProjectdetailsComponent  implements OnInit, OnDestroy {

  Order : Order;
  CSData : any;
  private csdataSub : Subscription;

  details  : any[] = []




  OrderNumber : string;
  ProjectName : string;
  Party : string;
  SalesHead : string;
  WinDate : string;
  Webappvalue : string;
  Discount : string;
  FinalValue : string;
  Billed : string;
  SpecialDiscount : string;
  ReceiptAdvance : string;
  DiscountValue : string;
  TotalOutstanding : string;
  ChequeRequired : string;
  spinner : boolean = false;
  Dealerdiscount : string;
  DealerDiscountValue : string;
  ClientDiscount : string;
  CSValue : string;
  ClientDiscountValue : string;

  SolutionDetailsTable :any[]= [];
 
  

  constructor(public dialogRef : MatDialogRef<ProjectdetailsComponent>,
    public punchService : PunchserviceService,
    private http : HttpClient,
    public wqgService : WqgformService,
    private Sdialog : MatDialog,
    public getjbservice : GetjbService,
    
    ) { }

  ngOnInit(): void {



    let Order = this.punchService.Order
    let ProjectRefNo = ''
    if(Order.OrderNo.includes("/V-"))
    {
     let hyphen = Order.OrderNo.lastIndexOf("/V-");
     let tempproref = Order.OrderNo.substring(0, hyphen);
     let slash = tempproref.lastIndexOf("/");
     let proref = tempproref.substring(slash + 1, hyphen); 
     ProjectRefNo = proref
     
    }
 
    if(!Order.OrderNo.includes("/V-"))
    {
     
     let slash = Order.OrderNo.lastIndexOf("/");
     let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
     ProjectRefNo = proref
    }

//==========================================================================
   

this.getjbservice.getSpecialRequests().subscribe((specialReqs)=>{
  this.punchService.GetPunchItems(Order.ProjectID,ProjectRefNo).subscribe((response)=>{


       
      let FinalDis : number = 0
      let CSValue : number = 0;

      this.wqgService.getUsers().subscribe((users)=>{
        users.users.map(item=>{
          if(item.UserFullName===Order.Associate)
          {
            FinalDis = Number(item.DealerDiscount);
            this.Dealerdiscount = FinalDis.toString()
           }

        })

                

       


        specialReqs.specialrequests.map((item)=>{

          if(ProjectRefNo===item.OrderNo)
          {
            FinalDis = Number(item.NewDealerDiscount);
            this.Dealerdiscount = item.NewDealerDiscount.toString()
            
          }

        }) 




        if(FinalDis>0)
        {
          this.Discount = FinalDis.toString();
          this.DiscountValue =  (Math.ceil(Number(Order.GrandTotal)*FinalDis*0.01)).toString()
          CSValue = (Math.ceil(Number(Order.GrandTotal) -  Number(Order.GrandTotal)*FinalDis*0.01))
        }
        if(FinalDis==0)
        {
          this.Discount = Order.Discount
          this.DiscountValue =  (Math.ceil(Number(Order.GrandTotal)*Number(this.Discount)*0.01)).toString()
          CSValue = (Math.ceil(Number(Order.GrandTotal) -  Number(Order.GrandTotal)*Number(this.Discount)*0.01))
        }
        

        let CSData = JSON.parse(response.CSData);
        
        

        this.OrderNumber = Order.OrderNo;
        this.ProjectName = Order.ProjectName;
        this.SalesHead = Order.Associate;
        this.Webappvalue = Order.GrandTotal;
        this.WinDate = Order.WinDate;
        this.CSValue = CSValue.toString();
        this.FinalValue = Order.FinalAmount;
        this.Party = CSData.BILLTO_PNAME
        this.Billed = (Number(CSData.DISPATCHPIVALUE) - Number(CSData.credit_note)).toString();
        this.ReceiptAdvance = CSData.INVOICECOLLECTION
        this.ClientDiscount = Order.Discount;
        this.ClientDiscountValue = (Number(this.Webappvalue)*Number(this.ClientDiscount)*0.01).toFixed(2).toString()
        this.DealerDiscountValue  = (Number(this.Webappvalue)*Number(this.Dealerdiscount)*0.01).toFixed(2).toString()
     
        this.SpecialDiscount = CSData.PDCCOLLECTION
        this.TotalOutstanding = (Number(this.CSValue) - Number(CSData.INVOICECOLLECTION ) - Number(CSData.PDCCOLLECTION)).toString()
        this.ChequeRequired = (Number(this.Billed) -Number(this.ReceiptAdvance)).toString();



//==============================PROCORE=========================================================
//==============================PROCORE=========================================================
//==============================PROCORE=========================================================

 
let PunchData  = response.PunchItemData


let StatusTableData = [];

let status = "";
let position ="";
let SolutionAmount = 0;
let Type = ""
let BIC = "";
let Floor = "";
let Space = "";


let System  = ""  
let SubSystem  = ""
let SystemType =""  
let Orientation = ""
let SubOrientation =""
let Grid  = ""  
let Design = ""
let Width  = "" 
let Height  = ""
let Quantity =""
let Color = ""
let GlassCategory  =""
let GlassSubCategory =""  
let GlassFinish =""  
let GlassVariant =""  
let Matte =""  
let OuterGlassCategory ="" 
let OuterGlassSubCategory ="" 
let OuterGlassFinish =""  
let OuterGlassVariant =""  
let OuterMatte =""  
let Handle =""  
let HandleVariant =""  
let DoorCloser =""  
let DropSeal =""
let Lock =""  
let Remarks =""     
let SquareFeet =""  



console.log(PunchData)

for (var i = 0 ; i < PunchData.length; i ++)
{

  position = PunchData[i].position;
  BIC = PunchData[i].ball_in_court[0].name;
  status = PunchData[i].workflow_status
  Type = (PunchData[i].punch_item_type).name


  for(var j = 0; j < Order.Solutions.length; j++)
  {
   let PositionOrder = Number(position) - 1
    if(PositionOrder == j)
    {
        Floor = Order.Solutions[j].Floor;
        Space = Order.Solutions[j].Space;

          System  = Order.Solutions[j].System
          SubSystem  = Order.Solutions[j].SubSystem
          SystemType = Order.Solutions[j].SystemType
          Orientation = Order.Solutions[j].Orientation
          if(Order.Solutions[j].SubOrientation)
          {
            SubOrientation =Order.Solutions[j].SubOrientation
          }
          if(Order.Solutions[j].Grid)
          {
            Grid  = Order.Solutions[j].Grid
          }

          if(Order.Solutions[j].ProcoreField)
          {
            Design  = Order.Solutions[j].ProcoreField
          }
          
          
          Width  = Order.Solutions[j].Width
          Height  = Order.Solutions[j].Height
          Quantity ="1"
          Color = Order.Solutions[j].Color
          GlassCategory  = Order.Solutions[j].GlassCategory
          GlassSubCategory =Order.Solutions[j].GlassSubCategory 
          GlassFinish =Order.Solutions[j].GlassFinish 
          if(Order.Solutions[j].GlassVariant)  
          {
            GlassVariant =Order.Solutions[j].GlassVariant
          }
          if(Order.Solutions[j].Matte)
          {
            Matte =Order.Solutions[j].Matte
          }
         
          if(Order.Solutions[j].OuterGlassCategory)
          {
            OuterGlassCategory =Order.Solutions[j].OuterGlassCategory
          }
          if(Order.Solutions[j].OuterGlassSubCategory)
          {
            OuterGlassSubCategory =Order.Solutions[j].OuterGlassSubCategory
          }
          if( Order.Solutions[j].OuterGlassFinish)
          {
            OuterGlassFinish =Order.Solutions[j].OuterGlassFinish
          }

          if(Order.Solutions[j].OuterGlassVariant)
          {
            OuterGlassVariant = Order.Solutions[j].OuterGlassVariant
          }

          if(Order.Solutions[j].OuterMatte)
          {
            OuterMatte =Order.Solutions[j].OuterMatte
          }
          if(Order.Solutions[j].Handle)
          {
            Handle =Order.Solutions[j].Handle 
          }

          if(Order.Solutions[j].DoorCloser)
          {
            DoorCloser =Order.Solutions[j].DoorCloser 
          }

          if(Order.Solutions[j].DropSeal)
          {
            DropSeal =Order.Solutions[j].DropSeal
          }


          if(Order.Solutions[j].Lock)
          {
            Lock =Order.Solutions[j].Lock 
          }

          if(Order.Solutions[j].Remarks)
          {
            Remarks =Order.Solutions[j].Remarks
          }
          
        
          
          
           
          SquareFeet =Order.Solutions[j].SquareFeet
  

        
        if(Type ==="Location Level")
        {
          SolutionAmount = ((Number(Order.Solutions[j].Amount) - Number(Order.Solutions[j].Amount)*Number(this.ClientDiscount)*0.01)/Number(Order.Solutions[j].Quantity))
        }
        if(Type ==="Project Level")
        {
          SolutionAmount = 0;
        }
        if(Type ==="Sub Track")
        {
          SolutionAmount = 0;
        }
        if(Type ==="Sub Frame")
        {
          SolutionAmount = 0;
        }



    }

  
  }

  
  let temp = {SolutionNumber: position, 
    Floor : Floor,
     Space : Space, 
     Type : Type,
     BIC : BIC, 
     status : status , 
     SolutionAmount : SolutionAmount.toFixed(0) ,
     System  :  System,
     SubSystem  : SubSystem,
     SystemType : SystemType,
     Orientation : Orientation,
     SubOrientation :SubOrientation,
     Grid : Grid,
     Design :Design,
     Width  : Width,
     Height  :Height,
     Quantity :"1",
     Color :Color,
     GlassCategory :GlassCategory,
     GlassSubCategory :GlassSubCategory,
     GlassFinish :GlassFinish,
     GlassVariant :GlassVariant,
     Matte :Matte,
     OuterGlassCategory : OuterGlassCategory,
     OuterGlassSubCategory :OuterGlassSubCategory,
     OuterGlassFinish : OuterGlassFinish,
     OuterGlassVariant :OuterGlassVariant,
     OuterMatte : OuterMatte,
     Handle:Handle,
     DoorCloser: DoorCloser,
     DropSeal:DropSeal,
     Lock :Lock,
     Remarks :Remarks,
     SquareFeet :SquareFeet

    }

  this.SolutionDetailsTable.push(temp)
}


this.SolutionDetailsTable.sort((a, b) => {return Number(a.SolutionNumber) - Number(b.SolutionNumber)});






//==============================PROCORE=========================================================
//==============================PROCORE=========================================================
//==============================PROCORE=========================================================















        this.spinner =true;
 

     //  this.Sdialog.closeAll()

      })
    
       
    })
  })
//=========================================================================== 
 
  
  }


  OnCloseDialog()
  {
    this.dialogRef.close();
  }

  ngOnDestroy(){
    
   }

   OnGetExel()
   {

    var options = { 
 
      headers:  [
        "SolutionNumber", "Floor", "Space", "Type","BIC", "Status", "SolutionAmount",
        "System" ,
        "SubSystem" ,
        "SystemType" ,
        "Orientation" ,
        "SubOrientation" ,
        "Grid" ,
        "Design",
        "Width" ,
        "Height" ,
        "Quantity",
        "Color" ,
        "GlassCategory" ,
        "GlassSubCategory" ,
        "GlassFinish",
        "GlassVariant" ,
        "Matte",
        "OuterGlassCategory" ,
       "OuterGlassSubCategory" ,
        "OuterGlassFinish",
        "OuterGlassVariant",
        "OuterMatte" ,
        "Handle",
        "DoorCloser",
        "DropSeal",
        "Lock",
        "Remarks" ,
        "SquareFeet" 
    ] 
      
    };
    
    let FileName = this.OrderNumber
       
    new ngxCsv(this.SolutionDetailsTable, FileName, options);
    
    
     }


   }




