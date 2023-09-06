import { Injectable } from '@angular/core';
import { SiteDetail } from '../shared/sitedetail.model';
import {environment} from '../../environments/environment';
import { HttpClient,HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class SitedetailsService {

  mode : string = ''
  OrderNumber : string = ''
  modeOrder: boolean = false;
  OrderID : string 

  hostUrl = environment.hostURL;


  constructor(private http : HttpClient, private router : Router, private handler: HttpBackend) { this.http = new HttpClient(handler);}

  getOrder(mode: string,OrderNumber :string,orderID : string)
  {
    this.mode = mode;
    this.OrderNumber = OrderNumber;
    this.OrderID = orderID;

  }

  getSiteDetails()
  {
    return this.http.get<{message: string,sitedetails : SiteDetail[]}>(this.hostUrl+"/api/sitedetails");
  }



  addAndUpdateSiteDetails(
    editmode : boolean,
    sitedetailid : string,
    ordernumber : string,
    ContactPerson : string,
    Phone : string,
    AddressLineOne : string,
    AddressLineTwo : string,
    AddressLineThree : string,
    City : string,
    State : string,
    Pincode : string,
    DeliveryDate : string,
    InvoiceNumber : string,
    Panels : string,
    Boxes : string,
    Glasses : string,
    Remarks : string
  )
  {

    if(!editmode)
    {

      const sitedetails : SiteDetail  = {
        _id : null,
        OrderNumber : ordernumber,
        ContactPerson : ContactPerson,
        Phone : Phone,
        AddressLineOne : AddressLineOne,
        AddressLineTwo : AddressLineTwo,
        AddressLineThree : AddressLineThree,
        City : City,
        State : State,
        Pincode : Pincode,
        DeliveryDate : DeliveryDate,
        InvoiceNumber : InvoiceNumber,
        Panels : Panels,
        Boxes : Boxes,
        Glasses : Glasses,
        Remarks : Remarks
        
        }
    
    
      this.http.post<{message: string, sitedetailsId: string}>(this.hostUrl+"/api/sitedetails",sitedetails)
      .subscribe((responseData)=>{
        const Id = responseData.sitedetailsId; 
      });
    

    }

    if(editmode)
    {
      const sitedetails : SiteDetail  = {
        _id : sitedetailid,
        OrderNumber : ordernumber,
        ContactPerson : ContactPerson,
        Phone : Phone,
        AddressLineOne : AddressLineOne,
        AddressLineTwo : AddressLineTwo,
        AddressLineThree : AddressLineThree,
        City : City,
        State : State,
        Pincode : Pincode,
        DeliveryDate : DeliveryDate,
        InvoiceNumber : InvoiceNumber,
        Panels : Panels,
        Boxes : Boxes,
        Glasses : Glasses,
        Remarks : Remarks
        
        }
       
        let _id =sitedetailid

        
      
        this.http.put(this.hostUrl+"/api/sitedetails/"+ _id ,sitedetails).subscribe(response => {
        
          // this.router.navigate(["/settings/systems"]);

          
        
        })


    }

  }
}
