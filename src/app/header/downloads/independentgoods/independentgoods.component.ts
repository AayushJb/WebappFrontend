import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SitedetailsService } from 'src/app/services/sitedetails.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Order } from 'src/app/shared/order.model';
import { User } from 'src/app/shared/user.model';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-independentgoods',
  templateUrl: './independentgoods.component.html',
  styleUrls: ['./independentgoods.component.css']
})
export class IndependentgoodsComponent implements OnInit {



users : User[] =[];

  ContactPerson : string;
  ContactPhone : string;
  AddressOne : string;
  AddressTwo : string;
  AddressThree : string;

  Associate : string ;
  Address :string ;
  PhoneNo : string ;
  EmailId : string ;

  Glasses : string;
  Panels : string;
  Boxes : string;
  InvoiceNumber : string;
  InvoiceDate : string;
  

  ProjectName : string ;
  Location : string ;
  OrderNumber : string ;
  Architect : string ;
  ClientName : string;


  constructor(public wqgformService : WqgformService,public sitedetailsservice : SitedetailsService,public route : ActivatedRoute) { }

  ngOnInit(): void {
 
    this.wqgformService.getUsers().subscribe((usersData)=>{
      this.users = usersData.users;     
     });

        
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      let Id = paramMap.get('orderId');



      this.wqgformService.getOrder(Id).subscribe((orderData:Order)=>{

      this.ProjectName = orderData.ProjectName;
      this.ClientName =  orderData.ClientName
      this.Location = orderData.Location;
      this.OrderNumber = orderData.OrderNo;
      this.Architect = orderData.Architect;
      this.Associate = orderData.Associate;
      })
      
      this.users.map(item =>{
        if(item.UserFullName===this.Associate)
        {
          this.Address  = item.Address;
          this.PhoneNo = item.PhoneNo;
          this.EmailId = item.EmailId; 
        }
      });

      //============================Getting Other details into the output array from Solutions array=================
      //=============================================================================================================



      this.sitedetailsservice.getSiteDetails().subscribe((response)=>{
     
        response.sitedetails.map((item)=>{

         if(item.OrderNumber===this.OrderNumber)
         {

          this.ContactPerson = item.ContactPerson;
          this.ContactPhone = item.Phone;
          this.AddressOne = item.AddressLineOne;
          this.AddressTwo = item.AddressLineTwo;
          this.AddressThree = item.AddressLineThree
          this.Glasses  =item.Glasses;
          this.Boxes = item.Boxes;
          this.Panels = item.Panels;
          this.InvoiceDate = item.DeliveryDate;
          this.InvoiceNumber = item.InvoiceNumber;
             
         }
     
        })
   
       })



   
     })


 


     

  }
}