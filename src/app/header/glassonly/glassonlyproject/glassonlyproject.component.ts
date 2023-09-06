
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WqgformService } from 'src/app/services/wqgform.service';
import { ProcoreService } from 'src/app/services/procore.service';
import { map, startWith } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { Company } from 'src/app/shared/company.model';
import { CreatecompanyService } from 'src/app/services/createcompany.service';
import { GlassonlyService } from 'src/app/services/glassonly.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { LoaderComponent } from '../../projects/loader/loader.component';
import { Order } from 'src/app/shared/order.model';


@Component({
  selector: 'app-glassonlyproject',
  templateUrl: './glassonlyproject.component.html',
  styleUrls: ['./glassonlyproject.component.css']
})
export class GlassonlyprojectComponent  implements OnInit {

  
  formOr : FormGroup;
  orders : Order[] =[];
  keyword = 'OrderNo';

  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;
  companies : Company[]= [];
  showSpinner : boolean = true;
  CompanyList = [];
  ArchitectList : any = [];
  SelectedOrderNumber : string

  constructor(private userService : UsersService,
    private companyService : CreatecompanyService,
    private snackbar : MatSnackBar,
    private glassOnlyservice : GlassonlyService,
    private dialog : MatDialog,
    private Sdialog : MatDialog,
    private overlay: Overlay,
    public wqgformService : WqgformService,
    public projectsService : ProjectsService
    ) { }



  ngOnInit(): void {

    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.disableClose =true;
    dialogConfig2.autoFocus =true;
    this.Sdialog.open(LoaderComponent,dialogConfig2)

  

    this.formOr = new FormGroup({

      WaltzOrderNo : new FormControl(''),
      ProjectName : new FormControl('',{validators:[Validators.required]}),
      ClientName : new FormControl('',{validators:[Validators.required]}),
      Location : new FormControl('',{validators:[Validators.required]}),
      Architect :new FormControl('',{validators:[Validators.required]}),
      GST :new FormControl(''),
      Source :new FormControl('SOCIAL',{validators:[Validators.required]}),
     
    });




     //===============Getting the User and MaxDiscount Value==========================================
     this.userIsAuthenticated = this.userService.getIsAuth();
     this.UserFullName = this.userService.getUserFullName();
     this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
     this.userIsAuthenticated = isAuthenticated;
     this.UserFullName = this.userService.getUserFullName();
     
     });


   

     this.wqgformService.getDownloadsOrders(this.UserFullName).subscribe(data=>{

      this.orders = [];
  
     
      data.orders.map(item=>{if(item.Status==="Win"||item.Status==="Old Win"||item.Status==="Handover")
      {  
        this.orders.push(item)
        this.Sdialog.closeAll()
      }
     
     })
      
     })



     this.showSpinner = false;
     


  }


   
  onSaveOrder()
  {

    if(this.formOr.invalid){

      const invalid = [];
      const controls = this.formOr.controls;
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
  
    this.showSpinner = true;

   

    

    let Completed = "NO";

    this.glassOnlyservice.addOrders(
     this.SelectedOrderNumber , 
     this.formOr.value.ProjectName,
     this.formOr.value.ClientName,
     this.formOr.value.Location,
     this.formOr.value.Architect,
     this.formOr.value.GST,
     this.formOr.value.Source,
     this.UserFullName,
     Completed
    );

    this.showSpinner = false;
 
  }


  
selectEvent(item) {

  this.SelectedOrderNumber = item.OrderNo
 
  console.log(item)

  this.formOr.patchValue({'ProjectName':item.ProjectName});
  this.formOr.patchValue({'ClientName':item.ClientName});
  this.formOr.patchValue({'Location':item.Location});
  this.formOr.patchValue({'Architect':item.Architect});
  this.formOr.patchValue({'Source':item.Source});
 
}

onChangeSearch(val: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e){
  // do something when input is focused
}



}
