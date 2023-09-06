import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit , OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GetjbService } from 'src/app/services/getjb.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Order } from 'src/app/shared/order.model';
import { LoaderComponent } from '../loader/loader.component';


@Component({
  selector: 'app-getjb',
  templateUrl: './getjb.component.html',
  styleUrls: ['./getjb.component.css']
})
export class GetjbComponent implements OnInit, OnDestroy {

  Order : Order;
  CSData : any;
  private csdataSub : Subscription;

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

  

  constructor(public dialogRef : MatDialogRef<GetjbComponent>,
    public getjbservice : GetjbService,
    private http : HttpClient,
    public wqgService : WqgformService,
    private Sdialog : MatDialog,
    
    ) { }

  ngOnInit(): void {


    /*
    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.disableClose =true;
    dialogConfig2.autoFocus =true;
    this.Sdialog.open(LoaderComponent,dialogConfig2)
   */


   this.getjbservice.getSpecialRequests().subscribe((specialReqs)=>{

    this.csdataSub = this.getjbservice.getCSDataUpdateListener().subscribe((CSDat)=>{

      let FinalDis : number = 0
      let CSValue : number = 0;

      this.wqgService.getUsers().subscribe((users)=>{
        users.users.map(item=>{
          if(item.UserFullName===CSDat[0].Order.Associate)
          {
            FinalDis = Number(item.DealerDiscount);
            this.Dealerdiscount = FinalDis.toString()
           }

        })

                

        let WinRefNo = ""

        if(CSDat[0].Order.OrderNo.includes("/V-"))
        {
         let hyphen = CSDat[0].Order.OrderNo.lastIndexOf("/V-");
         let tempproref = CSDat[0].Order.OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         WinRefNo = proref
        }
      
        if(!CSDat[0].Order.OrderNo.includes("/V-"))
        {
         let slash = CSDat[0].Order.OrderNo.lastIndexOf("/");
         let proref = CSDat[0].Order.OrderNo.substring(slash+ 1, CSDat[0].Order.OrderNo.length);
         WinRefNo = proref
        }


        specialReqs.specialrequests.map((item)=>{

          if(WinRefNo===item.OrderNo)
          {
            FinalDis = Number(item.NewDealerDiscount);
            this.Dealerdiscount = item.NewDealerDiscount.toString()
            
          }

        }) 




        if(FinalDis>0)
        {
          this.Discount = FinalDis.toString();
          this.DiscountValue =  (Math.ceil(Number(CSDat[0].Order.GrandTotal)*FinalDis*0.01)).toString()
          CSValue = (Math.ceil(Number(CSDat[0].Order.GrandTotal) -  Number(CSDat[0].Order.GrandTotal)*FinalDis*0.01))
        }
        if(FinalDis==0)
        {
          this.Discount = CSDat[0].Order.Discount
          this.DiscountValue =  (Math.ceil(Number(CSDat[0].Order.GrandTotal)*Number(this.Discount)*0.01)).toString()
          CSValue = (Math.ceil(Number(CSDat[0].Order.GrandTotal) -  Number(CSDat[0].Order.GrandTotal)*Number(this.Discount)*0.01))
        }
        

        let CSData = JSON.parse(CSDat[0].CSData);
        
        

        this.OrderNumber = CSDat[0].Order.OrderNo;
        this.ProjectName = CSDat[0].Order.ProjectName;
        this.SalesHead = CSDat[0].Order.Associate;
        this.Webappvalue = CSDat[0].Order.GrandTotal;
        this.WinDate = CSDat[0].Order.WinDate;
        this.CSValue = CSValue.toString();
        this.FinalValue = CSDat[0].Order.FinalAmount;
        this.Party = CSData.BILLTO_PNAME
        this.Billed = (Number(CSData.DISPATCHPIVALUE) - Number(CSData.credit_note)).toString();
        this.ReceiptAdvance = CSData.INVOICECOLLECTION
        this.ClientDiscount = CSDat[0].Order.Discount;

        this.ClientDiscountValue = (Number(this.Webappvalue)*Number(this.ClientDiscount)*0.01).toFixed(2).toString()

        this.DealerDiscountValue  = (Number(this.Webappvalue)*Number(this.Dealerdiscount)*0.01).toFixed(2).toString()
     
       
        

        this.SpecialDiscount = CSData.PDCCOLLECTION
        this.TotalOutstanding = (Number(this.CSValue) - Number(CSData.INVOICECOLLECTION ) - Number(CSData.PDCCOLLECTION)).toString()
        this.ChequeRequired = (Number(this.Billed) -Number(this.ReceiptAdvance)).toString();

        this.spinner =true;
 

     //  this.Sdialog.closeAll()

      })
    


     

     
  
    });


    })



   

  
  }


  OnCloseDialog()
  {
    this.dialogRef.close();
  }

  ngOnDestroy(){

    this.csdataSub.unsubscribe();
   }

}
