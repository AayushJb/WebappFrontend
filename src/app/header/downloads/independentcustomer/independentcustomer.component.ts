import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Order } from 'src/app/shared/order.model';
import { User } from 'src/app/shared/user.model';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-independentcustomer',
  templateUrl: './independentcustomer.component.html',
  styleUrls: ['./independentcustomer.component.css']
})
export class IndependentcustomerComponent implements OnInit {
  users :User[] = [];
  
  ProjectName : string ;
  Location : string ;
  OrderNumber : string ;
  Architect : string ;
  ClientName : string;

  Associate : string ;
  Address :string ;
  PhoneNo : string ;
  EmailId : string ;

  constructor(public wqgformService : WqgformService, public route : ActivatedRoute) { }

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

     })

  }

}
