import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { Handover } from '../shared/handover.model';
import { Order } from '../shared/order.model';
import { SpecialRequest } from '../shared/specialrequest.model';
import { User } from '../shared/user.model';
import { ProjectsService } from './projects.service';
import { WqgformService } from './wqgform.service';


@Injectable({
  providedIn: 'root'
})
export class HandoverService {

  OrderNumber: string;
  OrderId: string;
  ProjectName : string;
  Userfullname : string;
  FinalAmount : string;
  hostUrl = environment.hostURL;
  users : User[] = [];

  currentDateTime : any;


 
  constructor(public wqgformService : WqgformService,
    private http : HttpClient,
    private router :Router,
    public projectsService : ProjectsService) { }

  getOrderDetails(OrderNo:string,id:string,ProjectName : string,UserFullName : string,FinalAmount : string)
  { 
    this.OrderNumber = OrderNo;
    this.OrderId = id;
    this.ProjectName = ProjectName;
    this.Userfullname = UserFullName;
    this.FinalAmount = FinalAmount;
  }


  addHandoverDetails(HandoverDetails : Handover)
  {
    this.getCurrentDateTime()
    HandoverDetails.OrderId = this.OrderId;
    HandoverDetails.OrderNo = this.OrderNumber;

   


    let OrderId = this.OrderId;
      
    this.wqgformService.getUsers().subscribe((userData)=>{


      this.wqgformService.getOrder(OrderId).subscribe((OrderData)=>{


        const currentDate = this.currentDateTime
        const ISTDateString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
   
        let now  =  new Date(ISTDateString);
        let nowDate = now.getDate();
        let nowMonth = now.getMonth()+1;
        let nowYear = now.getFullYear()
        let WinDate =  nowDate + '-' + nowMonth + '-' +nowYear ;
  
        var myNewDate = new Date(now);
        myNewDate.setDate(now.getDate() + 90);
      
        let myNewDateDate = myNewDate.getDate();
        let myNewDateMonth = myNewDate.getMonth()+1;
        let newDatYear = myNewDate.getFullYear()
  
        let CompletionDate = myNewDateDate  + '-' + myNewDateMonth +'-' + newDatYear ;
  
           
       const newOrder :Order = {
  
        _id : OrderData._id,
          OrderNo : OrderData.OrderNo,
          ProjectName : OrderData.ProjectName,
          ClientName : OrderData.ClientName,
          Location : OrderData.Location,
          Architect : OrderData.Architect,
          Source : OrderData.Source,
          Solutions: OrderData.Solutions,
          Discount : OrderData.Discount,
          Advance : OrderData.Advance,
          FinalAmount : OrderData.FinalAmount,
          GrandTotal : OrderData.GrandTotal,
          Status : "Handover",
          Active : OrderData.Active,
          Completed : OrderData.Completed,
          CreationDate : OrderData.CreationDate,
          EditDate : OrderData.EditDate,
          WinDate : OrderData.WinDate,
          Associate : OrderData.Associate,
          ProjectManager : OrderData.ProjectManager,
          ProjectID : "",
          OfficeID : OrderData.OfficeID,
          TotalSquareFeet : OrderData.TotalSquareFeet,
          CSValue : OrderData.CSValue,
          CompletionDate : CompletionDate,
          DateCreated : OrderData.DateCreated,
          CommercialWinDate : OrderData.WinDate,
          HandOverDate : WinDate,
          LedgerDetails : OrderData.LedgerDetails,
          ProPlan :  OrderData.ProPlan,
          ProValue :  OrderData.ProValue
      }
  
       let WinRequirements = {
        Order : newOrder,
        Users : userData.users
       }
          
       this.http.put<{message : string, orders : Order}>(this.hostUrl+"/api/orders/handoverorder/"+ OrderId,WinRequirements).subscribe(responseWin => {


        this.http.post<{message: string,handoverId:string}>(this.hostUrl+"/api/handovers",HandoverDetails).subscribe(response=>{
          this.projectsService.getProjects("ALL");
          alert("Order is Handover")  
        })
       
         
     
       })
  
    
  
       })



     })

  }
 

  getSpecialRequests()
  {
    return this.http.get<{message: string; specialrequests : SpecialRequest[] }>(this.hostUrl+"/api/specialrequests")
  }
 

  getCurrentDateTime() {
    this.http.get('http://worldtimeapi.org/api/timezone/UTC').subscribe((response : any)=>{
      this.currentDateTime = new Date(response.datetime);
    })
     
  }


}
