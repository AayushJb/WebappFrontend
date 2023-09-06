import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatecompanyService } from 'src/app/services/createcompany.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  form : FormGroup;
 

  constructor(
    public companyService : CreatecompanyService) { }

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

  }


  onSaveCompany()
  {

    let UserFullName: string = ""

     this.companyService.addNewCompany(this.form.value.CompanyName,
      this.form.value.Profile,
      this.form.value.AddressLine,
      this.form.value.Location,
      this.form.value.AddressLineThree,
      this.form.value.City,
      this.form.value.State,
      this.form.value.Country,
      this.form.value.Source,
      UserFullName
      )

    this.form.reset();
    
  }

  
}
