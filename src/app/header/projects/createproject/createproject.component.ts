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
import { CompanydirComponent } from './companydir/companydir.component';
import { Company } from 'src/app/shared/company.model';
import { CreatecompanyService } from 'src/app/services/createcompany.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {

  formOr : FormGroup;

  filteredOptions: Observable<string[]>;


  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;
  companies : Company[]= [];
  showSpinner : boolean = true;
  CompanyList = [];
  ArchitectList : any = [];
  

  constructor(private userService : UsersService,
    private companyService : CreatecompanyService,
    private snackbar : MatSnackBar,
    private wqgformService : WqgformService,
    public procoreService : ProcoreService,
    private dialog : MatDialog,
    private Sdialog : MatDialog,
    private overlay: Overlay
    ) { }

  ngOnInit(): void {

    this.wqgformService.getCurrentDateTime();

    this.formOr = new FormGroup({

      ProjectName : new FormControl('',{validators:[Validators.required]}),
      ClientName : new FormControl('',{validators:[Validators.required]}),
      Location : new FormControl('',{validators:[Validators.required]}),
      Architect :new FormControl('',{validators:[Validators.required]}),
      Source :new FormControl('SOCIAL',{validators:[Validators.required]}),
     

    });


/*
    this.procoreService.getProcoreCompanyVendors().subscribe((response)=>{
      console.log(response)

      this.ArchitectList = response
      this.Sdialog.closeAll()
    })

*/

     //===============Getting the User and MaxDiscount Value==========================================
     this.userIsAuthenticated = this.userService.getIsAuth();
     this.UserFullName = this.userService.getUserFullName();
     this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
     this.userIsAuthenticated = isAuthenticated;
     this.UserFullName = this.userService.getUserFullName();
     
     });




     

      //=====================GET PROCORE CLIENTS========================================================
    this.companyService.getCompanies().subscribe((response)=>{
     this.companies = response.companies;
  
     this.companies.map(item =>{
     if(item.Associate[0]===this.UserFullName)
     {
       let option = item.CompanyName + " " + item.Associate[0];
       this.CompanyList.push(option)
     }else{

      this.CompanyList.push(item.CompanyName)
     }
     })

     this.showSpinner = false;
   })


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

    let ProjectManager : string;
    let OfficeID : string;

    this.wqgformService.getUsers().subscribe((response)=>{
  
      response.users.map(item=>{
       if(item.UserFullName===this.UserFullName)
       {
         ProjectManager =item.ProjectManager;
         OfficeID = item.ProcoreOfficeID

       }
         
      })  
    
    })
    

    let Completed = "NO";

    this.wqgformService.addOrders(
     this.formOr.value.ProjectName,
     this.formOr.value.ClientName,
     this.formOr.value.Location,
     this.formOr.value.Architect,
     this.formOr.value.Source,
     this.UserFullName,
     ProjectManager,
     OfficeID,
     Completed
    );

    this.showSpinner = false;
 
  }



  OpenCompanyForm()
  {
  
   const scrollStrategy = this.overlay.scrollStrategies.reposition();
   const dialogConfig = new MatDialogConfig();

   dialogConfig.disableClose =true;
   dialogConfig.autoFocus =true;
   dialogConfig.width = "90%";
   dialogConfig.height= "90%";
   dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
   this.dialog.open(CompanydirComponent,dialogConfig)

  }


}
