import { Component, OnInit ,OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CreatecompanyService } from 'src/app/services/createcompany.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-companydir',
  templateUrl: './companydir.component.html',
  styleUrls: ['./companydir.component.css']
})
export class CompanydirComponent implements OnInit, OnDestroy {

  form : FormGroup;
  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;


  constructor(public dialogRef : MatDialogRef<CompanydirComponent>,
     public companyService : CreatecompanyService,
     public userService : UsersService) { }

  ngOnInit(): void {

    this.form = new FormGroup({

      'CompanyName' : new FormControl(null,{validators:[Validators.required]}),
      'Profile' : new FormControl(null,{validators:[Validators.required]}),
      'AddressLine' : new FormControl(null,{validators:[Validators.required]}),
      'Location' : new FormControl(null,{validators:[Validators.required]}),
      'AddressLineThree' : new FormControl(null,{validators:[Validators.required]}),
      'City' : new FormControl(null,{validators:[Validators.required]}),
      'State' : new FormControl(null,{validators:[Validators.required]}),
      'Country' : new FormControl(null,{validators:[Validators.required]}),
      'Source' : new FormControl(null,{validators:[Validators.required]})
    });


      //===============Getting the User and MaxDiscount Value==========================================
      this.userIsAuthenticated = this.userService.getIsAuth();
      this.UserFullName = this.userService.getUserFullName();
      this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
      this.UserFullName = this.userService.getUserFullName();
      
      });

  }


  

  onSaveCompany()
  {

    let company = {
    ...this.form.value
    }

     this.companyService.addNewCompany(this.form.value.CompanyName,
      this.form.value.Profile,
      this.form.value.AddressLine,
      this.form.value.Location,
      this.form.value.AddressLineThree,
      this.form.value.City,
      this.form.value.State,
      this.form.value.Country,
      this.form.value.Source,
      this.UserFullName
      )

    this.dialogRef.close();
    
  }

  closeForm()
  {
    this.dialogRef.close();
  }

  ngOnDestroy(){

  
    this.authListenerSubs.unsubscribe();
  }

}
