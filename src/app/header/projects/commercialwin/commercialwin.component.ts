import { JsonPipe } from '@angular/common';
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CommercialwinService } from 'src/app/services/commercialwin.service';
import { GetjbService } from 'src/app/services/getjb.service';
import { ReportsService } from 'src/app/services/reports.service';
import { CommercialWin } from 'src/app/shared/commericalwin.model';

@Component({
  selector: 'app-commercialwin',
  templateUrl: './commercialwin.component.html',
  styleUrls: ['./commercialwin.component.css']
})
export class CommercialwinComponent implements OnInit,OnDestroy {

  form : FormGroup;
  OrderNumber : string;
  ProjectName : string;
  FinalAmount : string;
  OrderId : string;
  Percent : string;
  Associate : string;
  
  spinner : boolean = false;



  subscription : Subscription[] = [];
  ProPlusFlag : boolean = false;
  AdvanceZero : boolean = false;

  private csdataSub : Subscription;

  constructor(public dialogRef : MatDialogRef<CommercialwinComponent>,
    public commercialwinService : CommercialwinService,
    public getjbservice : GetjbService
    ) { }

  ngOnInit(): void {

    this.commercialwinService.getCurrentDateTime();
  
    this.form = new FormGroup({

      'Invoice' : new FormControl(null),
      'Amount' : new FormControl(null),
      'Type' : new FormControl("A",{validators:[Validators.required]}),
      'Remark' : new FormControl(null)

    });

    this.ProjectName = this.commercialwinService.ProjectName;
    this.OrderNumber = this.commercialwinService.OrderNumber;
    this.FinalAmount = this.commercialwinService.FinalAmount;
    this.OrderId = this.commercialwinService.Userfullname

    this.spinner = false;

  

   this.csdataSub = this.getjbservice.getCSDataUpdateListener().subscribe((CSDat)=>{
   
    let CSData = JSON.parse(CSDat[0].CSData);

    this.Associate = CSDat[0].Order.Associate;

    console.log(CSData.COLLECTIONOFPI)
    console.log("ADVPIAMT : " +CSData.INVOICECOLLECTION)
    console.log("PDC COLLECTION : " + CSData.PDCCOLLECTION)
   
    let BillToparty = CSData.BILLTO_PNAME
    let AdvanceReceived = CSData.COLLECTIONOFPI
    let PDCCollection = CSData.PDCCOLLECTION
    let AdvAmount = CSData.INVOICECOLLECTION
    
   


    this.form.patchValue({"Amount": AdvanceReceived})
    this.form.patchValue({"Invoice": BillToparty})

    if( AdvanceReceived>0)
    {
      if(PDCCollection>AdvAmount)
      {
        this.form.patchValue({"Type": "B"})
      }

      if(AdvAmount>PDCCollection)
      {
        this.form.patchValue({"Type": "A"})
      }
    }


    if(AdvanceReceived<1)
    {
      this.AdvanceZero = true;
      this.form.patchValue({"Type": "FOC"})
    }



   
    this.Percent = (Number(this.form.value.Amount)/Number(this.FinalAmount)*100).toFixed(2).toString();

   

   })



this.spinner = true;

  }


  onSaveCommericialDetails()
  {
  
    if(this.form.invalid){

      alert("Enter the mandatory fields with asterisks. Thanks!")

      return;
    }
  
  


    this.commercialwinService.getCurrentDateTime();

    
    let Percent = (Number(this.form.value.Amount)/Number(this.FinalAmount)*100).toFixed(2).toString()

    const commercialDetails : CommercialWin = {
      _id :null,
      OrderId : this.OrderId,
      OrderNo :this.OrderNumber,
      Invoice : this.form.value.Invoice,
      Amount : this.form.value.Amount,
      Percent : Percent,
      Type : this.form.value.Type,
      Remark : this.form.value.Remark
    }

   

    this.commercialwinService.addCommercialWinDetails(commercialDetails);
    this.OnCloseDialog();

  }

  OnCloseDialog()
  {
    this.dialogRef.close();
  }


  ngOnDestroy(){

    this.csdataSub.unsubscribe();
   }

}
