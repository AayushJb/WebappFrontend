import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  form : FormGroup;
  form2 : FormGroup;
  users : User[] = [];
  user : User;
  isLoading = false;
  private usersSub : Subscription;
  private mode = 'users';
  private userId : string;

  states : any =[]
  /*
  ProjectManager :  ProjectManager, 
    Freight :  Freight, 
    DealerDiscount :  DealerDiscount, 

*/

  constructor(public usersService : UsersService, public route : ActivatedRoute,private fb: FormBuilder) { }

  ngOnInit() {



//===================Reactive Form==========================================

  this.form = this.fb.group({

  'UserName' : new FormControl(null,{validators:[Validators.required]}),
  'Password' : new FormControl(null,{validators:[Validators.required]}),
  'UserFullName' : new FormControl(null,{validators:[Validators.required]}),
  'Profile' : new FormControl("USER",{validators:[Validators.required]}),
  'GlassOnly' : new FormControl("NO",{validators:[Validators.required]}),
  'Chargeable' : new FormControl("0",{validators:[Validators.required]}),
  'TempCharge' : new FormControl("0",{validators:[Validators.required]}),
  'Packing' : new FormControl("0",{validators:[Validators.required]}),
  'FreightGlass' : new FormControl("0",{validators:[Validators.required]}),
  'OtherCharge' : new FormControl("0",{validators:[Validators.required]}),
  'GST' : new FormControl(null,{validators:[Validators.required]}),
  'Associate' : new FormControl(null,{validators:[Validators.required]}),
  'Code' : new FormControl(null,{validators:[Validators.required]}),
  'AssociatedSince' : new FormControl(null,{validators:[Validators.required]}),
  'Address' : new FormControl(null,{validators:[Validators.required]}),
  'PhoneNo' : new FormControl(null,{validators:[Validators.required]}),
  'EmailId' : new FormControl(null,{validators:[Validators.required]}),
  'BeneficiaryName' : new FormControl(null,{validators:[Validators.required]}),
  'AccountNo' : new FormControl(null,{validators:[Validators.required]}),
  'IfscCode' : new FormControl(null,{validators:[Validators.required]}),
  'Swift' : new FormControl(null,{validators:[Validators.required]}),
  'MaxDiscount' : new FormControl(null,{validators:[Validators.required]}),
  'Status' : new FormControl("ACTIVE",{validators:[Validators.required]}),
  'ProjectManager' : new FormControl("NONE",{validators:[Validators.required]}),
  'Freight' : new FormControl("NO",{validators:[Validators.required]}),
  'DealerDiscount' : new FormControl("0",{validators:[Validators.required]}),
  'ProcoreOfficeID': new FormControl(null,{validators:[Validators.required]}),
 
});

this.form2 = this.fb.group({
  state: null,
  cities: this.fb.group({})
});





  this.usersService.getStates().subscribe((response)=>{
  
    this.states = response.states;

    console.log(this.states)
  })


//===========================================================================
  this.route.paramMap.subscribe((paramMap:ParamMap)=>{
   if(paramMap.has('userId')) {

    this.mode = 'edit';
    this.userId = paramMap.get('userId');



    this.usersService.getUser(this.userId).subscribe(userData=>{


      this.user = {
        _id:userData._id,
        UserName : userData.UserName,
        Password : userData.Password,
        UserFullName : userData.UserFullName,
        Profile : userData.Profile,
        GlassOnly : userData.GlassOnly,
        Chargeable : userData.Chargeable,
        TempCharge : userData.TempCharge,
        Packing : userData.Packing,
        FreightGlass : userData.FreightGlass,
        OtherCharge : userData.OtherCharge,
        GST : userData.GST,
        Associate : userData.Associate,
        Code : userData.Code,
        AssociatedSince : userData.AssociatedSince,
        Address :  userData.Address,
        PhoneNo : userData.PhoneNo,
        EmailId : userData.EmailId,
        BeneficiaryName : userData.BeneficiaryName,
        AccountNo : userData.AccountNo,
        IfscCode :userData.IfscCode,
        Swift : userData.Swift,
        MaxDiscount : userData.MaxDiscount,
        Status : userData.Status,
        ProjectManager :  userData.ProjectManager, 
        Freight :  userData.Freight, 
        DealerDiscount :  userData.DealerDiscount,
        ProcoreOfficeID : userData.ProcoreOfficeID, 
        DateCreated : userData.DateCreated
      }
      this.form.setValue({
      'UserName' :this.user.UserName,
      'Password' : this.user.Password,
      'UserFullName' : this.user.UserFullName,
      'Profile' : this.user.Profile,
      'GlassOnly' : this.user.GlassOnly,
      'Chargeable' : this.user.Chargeable ,
      'TempCharge' : this.user.TempCharge ,
      'Packing' : this.user.Packing,
      'FreightGlass' : this.user.FreightGlass,
      'OtherCharge' : this.user.OtherCharge,
      'GST' : this.user.GST,
      'Associate' : this.user.Associate,
      'Code' :  this.user.Code,
      'AssociatedSince' : this.user.AssociatedSince,
      'Address' : this.user.Address,
      'PhoneNo' : this.user.PhoneNo,
      'EmailId' : this.user.EmailId,
      'BeneficiaryName' : this.user.BeneficiaryName,
      'AccountNo' : this.user.AccountNo,
      'IfscCode' : this.user.IfscCode,
      'Swift' : this.user.Swift,
      'MaxDiscount' : this.user.MaxDiscount,
      'Status' : this.user.Status,
      'ProjectManager':  this.user.ProjectManager, 
      'Freight' :  this.user.Freight, 
      'DealerDiscount' :  this.user.DealerDiscount, 
      'ProcoreOfficeID' : this.user.ProcoreOfficeID

      });
    });
   }else{

    this.mode = 'users';
    this.userId = null;
   }


  });


  }


//==============================Adding Subsystems========================================

onSaveUser(){

    if(this.form.invalid){

      return;
    }


   if(this.mode === 'users'){
    this.usersService.addUsers(this.form.value.UserName,this.form.value.Password,this.form.value.UserFullName,this.form.value.Profile,
      this.form.value.GlassOnly,
      this.form.value.Chargeable,
      this.form.value.TempCharge,
      this.form.value.Packing,
      this.form.value.FreightGlass,
      this.form.value.OtherCharge,
      this.form.value.GST,
      this.form.value.Associate,this.form.value.Code,this.form.value.AssociatedSince,this.form.value.Address,this.form.value.PhoneNo,this.form.value.EmailId,this.form.value.BeneficiaryName,this.form.value.AccountNo,this.form.value.IfscCode,this.form.value.Swift,this.form.value.MaxDiscount,this.form.value.Status,this.form.value.ProjectManager,this.form.value.Freight,this.form.value.DealerDiscount,this.form.value.ProcoreOfficeID);

   }else{

    this.usersService.updateUser(this.userId,this.form.value.UserName,this.form.value.Password,this.form.value.UserFullName,this.form.value.Profile,
      this.form.value.GlassOnly,
      this.form.value.Chargeable,
      this.form.value.TempCharge,
      this.form.value.Packing,
      this.form.value.FreightGlass,
      this.form.value.OtherCharge,
      this.form.value.GST,
      this.form.value.Associate,this.form.value.Code,this.form.value.AssociatedSince,this.form.value.Address,this.form.value.PhoneNo,this.form.value.EmailId,this.form.value.BeneficiaryName,this.form.value.AccountNo,this.form.value.IfscCode,this.form.value.Swift,this.form.value.MaxDiscount,this.form.value.Status,this.form.value.ProjectManager,this.form.value.Freight,this.form.value.DealerDiscount,this.form.value.ProcoreOfficeID);

   }


  this.form.reset();

  }

  getSelectedCities(): { [key: string]: string[] } {
    const cities = this.form2.get('cities').value;
    const selectedCities = {};
    for (const city in cities) {
      if (cities[city]) {
        const state = this.form2.get('state').value.name;
        if (!selectedCities[state]) {
          selectedCities[state] = [];
        }
        selectedCities[state].push(city);
      }
    }
    return selectedCities;
  }


}
