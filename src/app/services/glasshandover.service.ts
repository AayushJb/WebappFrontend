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
import { GlassonlyService } from './glassonly.service';
import { GlassOrder } from '../shared/glassorder.model';

@Injectable({
  providedIn: 'root'
})
export class GlasshandoverService {

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
    public projectsService : ProjectsService,
    public glassonlyservice : GlassonlyService
    ) { }

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
    
    HandoverDetails.OrderId = this.OrderId;
    HandoverDetails.OrderNo = this.OrderNumber;

    console.log("here")

   


    let OrderId = this.OrderId;
      
    this.wqgformService.getUsers().subscribe((userData)=>{


      this.glassonlyservice.getGlassOrder(OrderId).subscribe((OrderData)=>{


      
        let now  =  new Date();
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
  
           
       const newOrder :GlassOrder = {
  
        _id : OrderData._id,
        WaltzOrderNo : OrderData.WaltzOrderNo,
          OrderNo : OrderData.OrderNo,
          ProjectName : OrderData.ProjectName,
          ClientName : OrderData.ClientName,
          Location : OrderData.Location,
          Architect : OrderData.Architect,
          GST : OrderData.GST,
          Source : OrderData.Source,
          Solutions: OrderData.Solutions,
          Discount : OrderData.Discount,
          Advance : OrderData.Advance,
          FinalAmount : OrderData.FinalAmount,
          GrandTotal : OrderData.GrandTotal,
          TempCharge: OrderData.TempCharge,
          Packing : OrderData.Packing,
          Freight : OrderData.Freight,
          OtherCharges : OrderData.OtherCharges, 
          Status : "Handover",
          Active : OrderData.Active,
          Completed : OrderData.Completed,
          CreationDate : OrderData.CreationDate,
          EditDate : OrderData.EditDate,
          WinDate : OrderData.WinDate,
          Associate : OrderData.Associate,
          ProjectManager : OrderData.ProjectManager,
          TotalSquareFeet : OrderData.TotalSquareFeet,
          CSValue : OrderData.CSValue,
          CompletionDate : CompletionDate,
          DateCreated : OrderData.DateCreated,
          CommercialWinDate : OrderData.WinDate,
          HandOverDate : WinDate,
          LedgerDetails : OrderData.LedgerDetails,
          ProPlan :  OrderData.ProPlan,
          ProValue :  OrderData.ProValue,
          Pieces : OrderData.Pieces,
          DiscountPercent : OrderData.DiscountPercent,
          FreightPercent : OrderData.FreightPercent,
          PackingPercent : OrderData.PackingPercent,
          OtherChargesPercent : OrderData.OtherChargesPercent,
          Insurance : OrderData.Insurance,
          InsuranceCost : OrderData.InsuranceCost
      }
  
       let WinRequirements = {
        Order : newOrder,
        Users : userData.users
       }
          
       this.http.put<{message : string, orders : GlassOrder}>(this.hostUrl+"/api/glassorders/handoverorder/"+ OrderId,WinRequirements).subscribe(responseWin => {


        this.http.post<{message: string,handoverId:string}>(this.hostUrl+"/api/handovers",HandoverDetails).subscribe(response=>{
          this.projectsService.getProjects("ALL");
          alert("Order is Handover")  

          this.http.post(this.hostUrl+"/api/updateglasscommercialwinproject",WinRequirements).subscribe(response=>{


           console.log(response)
         

          })
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
