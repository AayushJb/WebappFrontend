import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GetjbService } from 'src/app/services/getjb.service';
import { HandoverService } from 'src/app/services/handover.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Handover } from 'src/app/shared/handover.model';
import { SpecialRequest } from 'src/app/shared/specialrequest.model';
import { User } from 'src/app/shared/user.model';
import { WqgformComponent } from '../wqgform/wqgform.component';

@Component({
  selector: 'app-handover',
  templateUrl: './handover.component.html',
  styleUrls: ['./handover.component.css']
})
export class HandoverComponent implements OnInit, OnDestroy {

  form : FormGroup;
  OrderNumber : string;
  ProjectName : string;
  subscription : Subscription[] = [];
  ProPlusFlag : boolean = false;
  FinalAmount: string;
  OrderId : string;
  Percent : string;
  PercentExpense : string;
  Associate : string;
  spinner : boolean = false
  AdvanceReceived : number;
  users : User[] = []
  party : string;
  SpecialRequest : SpecialRequest[] =[];
  BadDebtFlag : boolean = false;

  private csdataSub : Subscription;

  constructor(public dialogRef : MatDialogRef<HandoverComponent>,
    public handoverService : HandoverService,
    public getjbservice : GetjbService,
    public wqgService : WqgformService
    ) { }

  ngOnInit(): void {


    this.handoverService.getCurrentDateTime();

    this.form = new FormGroup({

      'Invoice' : new FormControl(null,{validators:[Validators.required]}),
      'Amount' : new FormControl(null),
      'Type' : new FormControl(null),
      'Billed' : new FormControl(null),
      'Party'  : new FormControl(null),
      'SpecialDiscount' :  new FormControl(null),
      'BadDebt' : new FormControl('0'),
      'ReceiptAdvance' : new FormControl(null),
      'ChequeRequired' : new FormControl(null),
      'Remark' : new FormControl(null)
    });
 

    this.ProjectName = this.handoverService.ProjectName;
    this.OrderNumber = this.handoverService.OrderNumber;
    this.FinalAmount = this.handoverService.FinalAmount;
    this.OrderId = this.handoverService.OrderId;

    this.form.get('BadDebt').disable();


  

   this.handoverService.getSpecialRequests().subscribe((specialresponse)=>{
       

    this.csdataSub = this.getjbservice.getCSDataUpdateListener().subscribe((CSDat)=>{

     this.SpecialRequest = specialresponse.specialrequests


    
     

      let CSData = JSON.parse(CSDat[0].CSData);
      this.Associate = CSDat[0].Order.Associate;


      console.log(CSData)
      
      let FinalDis : number = 0
      let CSValue : number = 0;

      this.wqgService.getUsers().subscribe((users)=>{
        users.users.map(item=>{
          if(item.UserFullName===CSDat[0].Order.Associate)
          {
            FinalDis = Number(item.DealerDiscount);
           
           }

        })


 
        let OrderProjectRefNo = ""

        if(CSDat[0].Order.OrderNo.includes("/V-"))
        {
         let hyphen = CSDat[0].Order.OrderNo.lastIndexOf("/V-");
         let tempproref = CSDat[0].Order.OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         OrderProjectRefNo = proref
        }
     
        if(!CSDat[0].Order.OrderNo.includes("/V-"))
        {
         let slash = CSDat[0].Order.OrderNo.lastIndexOf("/");
         let proref = CSDat[0].Order.OrderNo.substring(slash+ 1, CSDat[0].Order.OrderNo.length);
         OrderProjectRefNo = proref
        }
     

        this.SpecialRequest.map((item=>{
          if(item.OrderNo===OrderProjectRefNo)
          {
             FinalDis = Number(item.NewDealerDiscount);
          }

        }))







        if(FinalDis>0)
        {
          CSValue = (Math.ceil(Number(CSDat[0].Order.GrandTotal) -  Number(CSDat[0].Order.GrandTotal)*FinalDis*0.01))
        }
        if(FinalDis==0)
        {
          CSValue = (Math.ceil(Number(CSDat[0].Order.GrandTotal) -  Number(CSDat[0].Order.GrandTotal)*Number(CSDat[0].Order.Discount)*0.01))
        }
        
  
      
     
      let Expense = CSData.EXPENDITURE

     
     

      this.AdvanceReceived = Number(Number(CSValue) - Number(CSData.INVOICECOLLECTION ) - Number(CSData.PDCCOLLECTION))
      
                        
 
      this.Percent = (Number(this.AdvanceReceived)/Number(CSValue)*100).toFixed(2).toString();
      this.PercentExpense =  (Number(Expense)/Number(CSValue)*100).toFixed(2).toString();
      this.form.patchValue({"Invoice": Expense})
      this.form.patchValue({"Amount": this.AdvanceReceived.toFixed(2)})
      this.party = CSData.BILLTO_PNAME
      this.form.patchValue({"Party": this.party})



      if(this.AdvanceReceived==0)
      {
        this.form.patchValue({"Type": "NIL"})
      }
      if(this.AdvanceReceived!==0)
      {
        this.form.patchValue({"Type": "SANCHIT"})
      }


       let Billed = Number(CSData.DISPATCHPIVALUE)-Number(CSData.credit_note)
       this.form.patchValue({"Billed": Billed})

       let ReceiptAdvance = CSData.INVOICECOLLECTION
       this.form.patchValue({"ReceiptAdvance": ReceiptAdvance})

       let ChequeRequired = (Number(Billed) -Number(ReceiptAdvance)).toString();
       this.form.patchValue({"ChequeRequired": ChequeRequired})

       let SpecialDiscount = CSData.PDCCOLLECTION
       this.form.patchValue({"SpecialDiscount": SpecialDiscount})
       if(SpecialDiscount)
       {
        if(Number(SpecialDiscount)>0)
        {
          this.BadDebtFlag = true;
          this.form.get('BadDebt').enable();//=====
        }
       }


      this.spinner = true;
  
     })
    })
    })

  }

  onSaveHandOverDetails()
  {
   this.handoverService.getCurrentDateTime();

   

 


    let Percent = (Number(this.form.value.Amount)/Number(this.FinalAmount)*100).toFixed(2).toString()

    const HandoverDetails : Handover = {
      _id :null,
      OrderId : this.OrderId,
      OrderNo :this.OrderNumber,
      Party : this.form.value.Party,
      Expense : this.form.value.Invoice,
      ExpensePercent :  this.PercentExpense,
      OutStanding : this.form.value.Amount,
      OutStandingPercent : Percent,
      Billed : this.form.value.Billed,
      SpecialDiscount :  this.form.value.SpecialDiscount,
      BadDebt : this.form.value.BadDebt,
      ReceiptAdvance : this.form.value.ReceiptAdvance,
      ChequeRequired : this.form.value.ChequeRequired,
      Type : this.form.value.Type,
      Remark : this.form.value.Remark
    }

    this.handoverService.addHandoverDetails(HandoverDetails);
    this.OnCloseDialog();

  }

  OnCloseDialog()
  {
    this.dialogRef.close();
  }

  OnAmountChanges()
  {
    this.Percent = (Number(this.form.value.Amount)/Number(this.FinalAmount)*100).toFixed(2).toString();
  }

  ngOnDestroy(){

    this.csdataSub.unsubscribe();
   }

}
