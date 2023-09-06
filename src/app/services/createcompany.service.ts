import { Injectable } from '@angular/core';
import { Company } from '../shared/company.model';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CreatecompanyService {

  hostUrl = environment.hostURL;

  constructor(private http : HttpClient) { }



  addNewCompany( CompanyName : string, Profile: string, AddressLine : string,Location : string,AddressLineThree: string,City :string,State: string, Country : string, Source :string, Associate : string )
  { 
   
   let User : string[]
   
   if(Associate==="")
   {
    User = [];
   }

   if(Associate!=="")
   {
    User = [Associate]
   }
  


   let company : Company = {
   _id : null,  
   CompanyName : CompanyName,
   Profile : Profile,
   AddressLine : AddressLine,
   Location : Location,
   AddressLineThree : AddressLineThree,
   City : City,
   State : State,
   Country : Country,
   Source : Source,
   Associate : User

   }

  
   this.http.post<{message: string, companyId: string}>(this.hostUrl+"/api/companies",company)
   .subscribe((responseData)=>{
     console.log(responseData.companyId);
    });
 
     


  }


  getCompanies()
  {
    return this.http.get<{message: string, companies: Company[]}>(this.hostUrl+"/api/companies")
  }
}
