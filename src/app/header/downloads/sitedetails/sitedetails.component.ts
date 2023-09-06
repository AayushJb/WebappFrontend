import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SitedetailsService } from 'src/app/services/sitedetails.service';
import { Order } from 'src/app/shared/order.model';
import { SiteDetail } from 'src/app/shared/sitedetail.model';

@Component({
  selector: 'app-sitedetails',
  templateUrl: './sitedetails.component.html',
  styleUrls: ['./sitedetails.component.css']
})
export class SitedetailsComponent implements OnInit {

  form : FormGroup;
  mode : string = '';
  editmode : boolean =  false;
  ordernumber : string ='';
  sitedetails : SiteDetail[] = [];
  sitedetailsid : string;
  orderID : string;

  constructor(public dialogRef : MatDialogRef<SitedetailsComponent>,
    public sitedetailsservice : SitedetailsService,
    public router : Router,
    private snackbar : MatSnackBar
    ) { }

  ngOnInit(): void {

     
    this.form = new FormGroup({
      'ContactPerson' : new FormControl(null,{validators:[Validators.required]}),
      'Phone' : new FormControl(null,{validators:[Validators.required]}),
      'AddressLineOne' : new FormControl(null,{validators:[Validators.required]}),
      'AddressLineTwo' : new FormControl(null,{validators:[Validators.required]}),
      'AddressLineThree' : new FormControl(null),
      'City' : new FormControl(null,{validators:[Validators.required]}),
      'State' : new FormControl(null,{validators:[Validators.required]}),
      'Pincode' : new FormControl(null,{validators:[Validators.required]}),
      'DeliveryDate' : new FormControl(null,{validators:[Validators.required]}),
      'InvoiceNumber' : new FormControl(null,{validators:[Validators.required]}),
      'Panels' : new FormControl(0,{validators:[Validators.required]}),
      'Boxes' : new FormControl(0,{validators:[Validators.required]}),
      'Glasses' : new FormControl(0,{validators:[Validators.required]}),
      'Remarks' : new FormControl(null)
    });

    
    


     this.mode = this.sitedetailsservice.mode;
     this.ordernumber = this.sitedetailsservice.OrderNumber;
     this.orderID = this.sitedetailsservice.OrderID;

  
    
     let orderNumberfromService : string

     if(this.ordernumber.includes("/V-"))
     {
      let hyphen = this.ordernumber.lastIndexOf("/V-");
      let tempproref = this.ordernumber.substring(0, hyphen);
      let slash = tempproref.lastIndexOf("/");
      let proref = tempproref.substring(slash + 1, hyphen); 
      orderNumberfromService = proref
      
     }
  
     if(!this.ordernumber.includes("/V-"))
     {
      
      let slash = this.ordernumber.lastIndexOf("/");
      let proref = this.ordernumber.substring(slash+ 1, this.ordernumber.length);
      orderNumberfromService = proref
     }




    this.sitedetailsservice.getSiteDetails().subscribe((response)=>{
     this.sitedetails = response.sitedetails;

     this.editmode = false;
        this.form.patchValue({'ContactPerson':null});
        this.form.patchValue({'Phone':null});
        this.form.patchValue({'AddressLineOne':null});
        this.form.patchValue({'AddressLineTwo':null});
        this.form.patchValue({'AddressLineThree':null});
        this.form.patchValue({'City':null});
        this.form.patchValue({'State':null});
        this.form.patchValue({'Pincode':null});
        this.form.patchValue({'DeliveryDate':null});
        this.form.patchValue({'InvoiceNumber':null});
        this.form.patchValue({'Panels':0});
        this.form.patchValue({'Boxes': 0});
        this.form.patchValue({'Glasses': 0});
        this.form.patchValue({'Remarks':null});
      
    

     response.sitedetails.map((item)=>{
      let OrderDataNumber : string;

      
      if(item.OrderNumber.includes("/V-"))
      {
       let hyphen = item.OrderNumber.lastIndexOf("/V-");
       let tempproref = item.OrderNumber.substring(0, hyphen);
       let slash = tempproref.lastIndexOf("/");
       let proref = tempproref.substring(slash + 1, hyphen); 
       OrderDataNumber = proref
       
      }
   
      if(!item.OrderNumber.includes("/V-"))
      {
       
       let slash = item.OrderNumber.lastIndexOf("/");
       let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
       OrderDataNumber = proref
      }

  

      //====================
    
     
    

      if(OrderDataNumber===orderNumberfromService)
      {
        console.log()

        this.editmode = true;
        this.sitedetailsid = item._id
        this.form.patchValue({'ContactPerson':item.ContactPerson});
        this.form.patchValue({'Phone':item.Phone});
        this.form.patchValue({'AddressLineOne':item.AddressLineOne});
        this.form.patchValue({'AddressLineTwo':item.AddressLineThree});
        this.form.patchValue({'AddressLineThree':item.AddressLineThree});
        this.form.patchValue({'City':item.City});
        this.form.patchValue({'State':item.State});
        this.form.patchValue({'Pincode':item.Pincode});
        this.form.patchValue({'DeliveryDate':item.DeliveryDate});
        this.form.patchValue({'InvoiceNumber':item.InvoiceNumber});
        this.form.patchValue({'Panels':item.Panels});
        this.form.patchValue({'Boxes':item.Boxes});
        this.form.patchValue({'Glasses':item.Glasses});
        this.form.patchValue({'Remarks':item.Remarks});
        
      }
      
     })


    
    })


   
   

    if(this.mode==="Measurement")
    { 
      this.form.get('DeliveryDate').disable();
      this.form.get('InvoiceNumber').disable();
      this.form.get('Boxes').disable();
      this.form.get('Panels').disable();
      this.form.get('Glasses').disable();
    }

    if(this.mode==="GoodsDelivery")
    {
      this.form.get('DeliveryDate').enable();
      this.form.get('InvoiceNumber').enable();
      this.form.get('Boxes').enable();
      this.form.get('Panels').enable();
      this.form.get('Glasses').enable();
      
    }
    
    if(this.mode==="WorkCompletion")
    {
      this.form.get('DeliveryDate').disable();
      this.form.get('InvoiceNumber').disable();
      this.form.get('Boxes').disable();
      this.form.get('Panels').disable();
      this.form.get('Glasses').disable();
    }


    


  }


  onSiteDetails()
  {
    if(this.form.invalid){

      const invalid = [];
   const controls = this.form.controls;
   for (const name in controls) {
     if (controls[name].invalid) {
       invalid.push(name);
     }
   }
 
   let message : string = "";
 
   for (var i = 0; i<invalid.length; i++)
   {
     if(i===0)
     {
      message = invalid[i]
     }
     if(i>0)
     {
      message = message + ", "+invalid[i]
     }
   }
  
 
     
       let action = "Dismiss"
       this.snackbar.open(message + " IS MISSING!!!!!", action, {
         duration: 10000,
       })
 
     return;
   } 



   this.sitedetailsservice.addAndUpdateSiteDetails(
   this.editmode,
   this.sitedetailsid,
   this.ordernumber,
   this.form.value.ContactPerson,
   this.form.value.Phone,
   this.form.value.AddressLineOne,
   this.form.value.AddressLineTwo,
   this.form.value.AddressLineThree,
   this.form.value.City,
   this.form.value.State,
   this.form.value.Pincode,
   this.form.value.DeliveryDate,
   this.form.value.InvoiceNumber,
   this.form.value.Panels,
   this.form.value.Boxes,
   this.form.value.Glasses,
   this.form.value.Remarks

    )



  this.form.reset();
  this.form.patchValue({'Glasses': 0});
  this.form.patchValue({'Boxes': 0});
  this.form.patchValue({'Panels' : 0});
  
  this.dialogRef.close();

  if(this.mode==="Measurement")
  { 
    this.router.navigate(["/measurement/"+this.orderID]);
    
  }

  if(this.mode==="GoodsDelivery")
  {
    this.router.navigate(["/goodsdelivery/"+this.orderID]);
   
  }
  
  if(this.mode==="WorkCompletion")
  {

    this.router.navigate(["/workcompletion/"+this.orderID]);
  
  }


  }

  OnCancel()
  {
    this.dialogRef.close();
  }

}
