import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LedgerdetailsService } from 'src/app/services/ledgerdetails.service';
import { ProcoreService } from 'src/app/services/procore.service';
import { LedgerDetail } from 'src/app/shared/ledgerdetail.model';
import { LoaderComponent } from '../loader/loader.component';


@Component({
  selector: 'app-ledgerdetails',
  templateUrl: './ledgerdetails.component.html',
  styleUrls: ['./ledgerdetails.component.css']
})
export class LedgerdetailsComponent implements OnInit,OnDestroy {

  form : FormGroup;
  OrderNumber : string;
  ProjectName : string;
  subscription : Subscription[] = [];
  ProPlusFlag : boolean = false;
  ArchitectList : any = [];
  UserList : any = [];
  spinner : boolean = false;
  newArchitect : boolean = false;
  


  constructor(public dialogRef : MatDialogRef<LedgerdetailsComponent>,
    public ledgerdetailsService : LedgerdetailsService,
    private Sdialog : MatDialog,
    private procoreService : ProcoreService
    
    ) { }

  ngOnInit(): void {



    this.ledgerdetailsService.getCurrentDateTime();

    this.OrderNumber = this.ledgerdetailsService.OrderNumber;
    this.ProjectName = this.ledgerdetailsService.ProjectName;
  
   // this.ledgerdetailsService.getProcoreInfo()

    this.form = new FormGroup({

      'BillingName' : new FormControl(null,{validators:[Validators.required]}),
      'AddressLine1' : new FormControl(null,{validators:[Validators.required]}),
      'AddressLine2' : new FormControl(null),
      'AddressLine3' : new FormControl(null),
      'City' : new FormControl(null,{validators:[Validators.required]}),
      'State' : new FormControl('None',{validators:[Validators.required]}),
      'Pincode' : new FormControl(null,{validators:[Validators.required]}),
      'CDProfile1' : new FormControl('Direct Client',{validators:[Validators.required]}),
      'CDName1' : new FormControl(null,{validators:[Validators.required]}),
      'CDMobile1' : new FormControl(null,{validators:[Validators.required]}),
      'CDEmail1' : new FormControl(null,{validators:[Validators.email]}),
      'CDProfile2' : new FormControl('Site Person',{validators:[Validators.required]}),
      'CDName2' : new FormControl(null,{validators:[Validators.required]}),
      'CDMobile2' : new FormControl(null,{validators:[Validators.required]}),
      'CDEmail2' : new FormControl(null,{validators:[Validators.email]}),
      'CDProfile3' : new FormControl('Account'),
      'CDName3' : new FormControl(null),
      'CDMobile3' : new FormControl(null),
      'CDEmail3' : new FormControl(null,{validators:[Validators.email]}),
      'CompanyName' :  new FormControl(null,{validators:[Validators.required]}),
      'Website' : new FormControl(null),
      'AddressLine1Con' : new FormControl(null,{validators:[Validators.required]}),
      'AddressLine2Con' : new FormControl(null),
      'AddressLine3Con' : new FormControl(null),
      'CityCon' : new FormControl(null,{validators:[Validators.required]}),
      'StateCon' : new FormControl('None',{validators:[Validators.required]}),
      'PincodeCon' : new FormControl(null,{validators:[Validators.required]}),
      'ConProfile1' : new FormControl('Principle Architect',{validators:[Validators.required]}),
      'ConName1' : new FormControl(null,{validators:[Validators.required]}),
      'ConPhone1' : new FormControl(null,{validators:[Validators.required]}),
      'ConEmail1' : new FormControl(null,{validators:[Validators.required,Validators.email]}),
      'ConProfile2' : new FormControl('Associate'),
      'ConName2' : new FormControl(null),
      'ConPhone2' : new FormControl(null),
      'ConEmail2' : new FormControl(null,{validators:[Validators.email]}),
      'ProPlus': new FormControl("Pro",{validators:[Validators.required]}),
      'ProPlusCost': new FormControl(null,{validators:[Validators.required]})
      

    });

    this.form.get('ProPlusCost').disable();


   


  this.OnProValueChanges();
 

  }


  OnProValueChanges(){

   

    this.subscription.push(this.form.get('ProPlus').valueChanges.subscribe(response=>{
     
    if(response ==="ProPlus")
    {
     this.ProPlusFlag = true;
     this.form.get('ProPlusCost').enable();
     this.form.patchValue({'ProPlusCost':null});


    }
    if(response !=="ProPlus")
    {
     this.ProPlusFlag = false;
     this.form.get('ProPlusCost').disable();
     this.form.patchValue({'ProPlusCost':null});
    }
  
    }))
  
  }

  onSaveLedgerDetails()
  {


    this.ledgerdetailsService.getCurrentDateTime();
    
    if(this.form.invalid){

      alert("Enter the mandatory fields with asterisks. Thanks!")

      return;
    }
    
 

  const ledgerdetail : LedgerDetail = {
    _id :null,
    OrderId : "",
    OrderNumber :"",
    ...this.form.value
  }

 
   

    this.form.reset({'CDProfile1':'Direct Client','CDProfile2':'Site Person', 'CDProfile3':'Account','State':'None','StateCon':'None','ConProfile1':'Principle Architect','ConProfile2':'Associate','ProPlus':'Pro','ProPlusCost':null});

    this.ledgerdetailsService.addLedgerDetails(ledgerdetail);
   
    this.OnCloseDialog();

  }

  OnCloseDialog()
  {
    this.dialogRef.close();
  }




  ngOnDestroy(){

    this.subscription.forEach(item =>{
      if(item) item.unsubscribe()
    })

  
  }

}
