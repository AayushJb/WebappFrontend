import { HttpClient } from '@angular/common/http';
import { Component ,OnInit , OnDestroy  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GetjbService } from 'src/app/services/getjb.service';
import { SpecialrequestsService } from 'src/app/services/specialrequests.service';
import { UsersService } from 'src/app/services/user.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Order } from 'src/app/shared/order.model';
import { SpecialRequest } from 'src/app/shared/specialrequest.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {


    form : FormGroup;
    spinner : boolean = false;
    ClientDiscountFlag : boolean = false;
    DealerDiscountFlag : boolean = false;
    SourceFlag : boolean = false;
    ProjectNameFlag : boolean = false;
    ArchitectNameFlag : boolean = false;
    subscription : Subscription[] = [];
    users : User[]= [];
    maxDiscount : number;
    DealerDiscount : string;
    ActualProfile : string;
 
    private authListenerSubs : Subscription;
    userIsAuthenticated = false;
    UserFullName : string;
    UserData :string;
    order : Order




  constructor(public dialogRef : MatDialogRef<RequestsComponent>,
    public specialRequestService : SpecialrequestsService,
    private http : HttpClient,
    private Sdialog : MatDialog,
    public wqgformservice : WqgformService,
    public userService : UsersService
    
    ) { }


    ngOnInit(): void {


      this.form = new FormGroup({

        'RequestType' : new FormControl("None",{validators:[Validators.required]}),
        'ClientDiscount' : new FormControl(null,{validators:[Validators.required]}),
        'DealerDiscount' : new FormControl(null,{validators:[Validators.required]}),
        'Source' : new FormControl(null,{validators:[Validators.required]}),
        'ProjectName'  : new FormControl(null,{validators:[Validators.required]}),
        'ArchitectName' :  new FormControl(null,{validators:[Validators.required]}),
        'Remark' : new FormControl(null)
      });


         //===============Getting the User and MaxDiscount Value==========================================
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.UserFullName = this.userService.getUserFullName();
    this.UserData = this.UserFullName
  

    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
      this.UserFullName = this.userService.getUserFullName();
      this.UserData = this.UserFullName;  
   });

   

     this.order = this.specialRequestService.order

     
      this.wqgformservice.getUsers().subscribe((response)=>{
       
        this.users = response.users
        this.users.map(item =>{
         
          if(item.UserFullName===this.UserFullName)
          {
           this.maxDiscount = Number(item.MaxDiscount)
           this.DealerDiscount = (item.DealerDiscount);
           this.ActualProfile = item.Profile;
           
          }
          /*
          if(item.UserFullName=== this.ActualUserFullName)
          {
           this.userID  =item.EmailId; 
          
          }
          */
   
         });
 
 

        this.spinner = true;
        
      })



    

 
      this.OnRequestChanges()
      this.OnDiscountChanges()

    }


    onSubmitRequest()
    {
    
     this.specialRequestService.getCurrentDateTime()

     let RequestType = this.form.value.RequestType
     let ClientDis = ""
     let DealerDis = ""
     let Sour = ""
     let ProjName = ""
     let ArchName = ""
     let Rem = this.form.value.Remark
     if(this.form.value.ClientDiscount)
     {
      ClientDis = this.form.value.ClientDiscount
     }
     if(this.form.value.DealerDiscount)
     {
      DealerDis = this.form.value.DealerDiscount
     }
     if(this.form.value.Source)
     {
      Sour = this.form.value.Source
     }
     if(this.form.value.ProjectName)
     {
      ProjName = this.form.value.ProjectName
     }
     if(this.form.value.ArchitectName)
     {
      ArchName = this.form.value.ArchitectName
     }

    this.specialRequestService.SaveRequestsData(RequestType,ClientDis,DealerDis,Sour,ProjName,ArchName,Rem,this.order).subscribe((response)=>{
      if(response.requestId)
      {
        alert("Your request have been forwarded. Changes will reflect once approved. Thanks!!")
        this.OnCloseDialog();
      }
    })

    }


    OnRequestChanges()
    {
      this.subscription.push(this.form.get('RequestType').valueChanges.subscribe(response=>{



        if(response ==="Other")
       {
        this.form.get('ClientDiscount').disable();
        this.form.get('DealerDiscount').disable();
        this.form.get('Source').disable();
        this.form.get('ProjectName').disable();
        this.form.get('ArchitectName').disable();


        this.ClientDiscountFlag = false;
        this.DealerDiscountFlag = false;
        this.SourceFlag = false;
        this.ProjectNameFlag = false;
        this.ArchitectNameFlag = false;


      


       }
       if(response ==="ClientDiscount")
       {
        this.form.get('ClientDiscount').enable();
        this.form.get('DealerDiscount').disable();
        this.form.get('Source').disable();
        this.form.get('ProjectName').disable();
        this.form.get('ArchitectName').disable();


        this.ClientDiscountFlag = true;
        this.DealerDiscountFlag = false;
        this.SourceFlag = false;
        this.ProjectNameFlag = false;
        this.ArchitectNameFlag = false;


        this.form.patchValue({'ClientDiscount':this.order.Discount})



       }
       if(response ==="DealerDiscount")
       {

        this.form.get('ClientDiscount').disable();
        this.form.get('DealerDiscount').enable();
        this.form.get('Source').disable();
        this.form.get('ProjectName').disable();
        this.form.get('ArchitectName').disable();

        this.form.patchValue({'DealerDiscount':this.DealerDiscount})


        this.ClientDiscountFlag = false;
        this.DealerDiscountFlag = true;
        this.SourceFlag = false;
        this.ProjectNameFlag = false;
        this.ArchitectNameFlag = false;

        
       }
       if(response ==="Source")
       {

        
        this.form.get('ClientDiscount').disable();
        this.form.get('DealerDiscount').disable();
        this.form.get('Source').enable();
        this.form.get('ProjectName').disable();
        this.form.get('ArchitectName').disable();


        this.ClientDiscountFlag = false;
        this.DealerDiscountFlag = false;
        this.SourceFlag = true;
        this.ProjectNameFlag = false;
        this.ArchitectNameFlag = false;

        this.form.patchValue({'Source':this.order.Source})
        
       }
       if(response ==="ProjectName")
       {

        this.form.get('ClientDiscount').disable();
        this.form.get('DealerDiscount').disable();
        this.form.get('Source').disable();
        this.form.get('ProjectName').enable();
        this.form.get('ArchitectName').disable();

        this.ClientDiscountFlag = false;
        this.DealerDiscountFlag = false;
        this.SourceFlag = false;
        this.ProjectNameFlag = true;
        this.ArchitectNameFlag = false;

        this.form.patchValue({'ProjectName':this.order.ProjectName})

        
       }
       if(response ==="ArchitectName")
       {

        this.form.get('ClientDiscount').disable();
        this.form.get('DealerDiscount').disable();
        this.form.get('Source').disable();
        this.form.get('ProjectName').disable();
        this.form.get('ArchitectName').enable();

        this.ClientDiscountFlag = false;
        this.DealerDiscountFlag = false;
        this.SourceFlag = false;
        this.ProjectNameFlag = false;
        this.ArchitectNameFlag = true;

        this.form.patchValue({'ArchitectName':this.order.Architect})
        
       }
        
   
    
    
       
    
   
      
    
       
      }));
    }






    OnDiscountChanges()
    {
    
      this.subscription.push(this.form.get('ClientDiscount').valueChanges.subscribe(response=>{    
        
       
      if(response>this.maxDiscount)
      {
     
       this.form.patchValue({'ClientDiscount':""});
      }
    
      }));
    
    }





    ngOnDestroy(): void {

      this.subscription.forEach(item =>{
        if(item) item.unsubscribe()
      })
  
      
    }


    OnCloseDialog()
    {
      this.dialogRef.close();
    }

}
