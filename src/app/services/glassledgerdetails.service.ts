import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LedgerDetail } from '../shared/ledgerdetail.model';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';
import { ProcoreService } from './procore.service';
import { Order } from '../shared/order.model';
import { WqgformService } from './wqgform.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoaderComponent } from '../header/projects/loader/loader.component';
import { ProjectsService } from './projects.service';
import { WinComponent } from '../header/projects/win/win.component';
import { User } from '../shared/user.model';

import { ErrorComponent } from '../header/projects/error/error.component';
import { ProcorewinComponent } from '../header/projects/procorewin/procorewin.component';
import { ProcorewinService } from './procorewin.service';
import { ProcoreResponse } from '../shared/responseProcore.model';
import { GlassOrder } from '../shared/glassorder.model';
import { GlassonlyService } from './glassonly.service';

@Injectable({
  providedIn: 'root'
})
export class GlassledgerdetailsService {

  OrderNumber: string;
  OrderId: string;
  ProjectName : string;
  Userfullname : string;
  hostUrl = environment.hostURL;
  users : User[] = [];
  currentDateTime : any


 
  constructor(private http : HttpClient,private router :Router, 
    public procoreService : ProcoreService,
    public projectsService : ProjectsService,
     public wqgformService : WqgformService,
     public projectService : ProjectsService,
     public procorewinservice : ProcorewinService,
     private Sdialog : MatDialog,
     private Wdialog : MatDialog,
     private Edialog : MatDialog,
     public glassonlyservice : GlassonlyService
     ) { }

     



  getOrderDetails(OrderNo:string,id:string,ProjectName : string,UserFullName : string)
  {
    this.OrderNumber = OrderNo;
    this.OrderId = id;
    this.ProjectName = ProjectName;
    this.Userfullname = UserFullName;
  }

  addLedgerDetails(LedgerDetail:any)
  {
    let ProPlusCost = 0



 
  if(LedgerDetail.ProPlusCost)
   {
      ProPlusCost = LedgerDetail.ProPlusCost
   }
 

  let LedgerRemark = "BillingName:"+LedgerDetail.BillingName+"|Add1:"+LedgerDetail.AddressLine1+"|Add2:"+LedgerDetail.AddressLine2
    +"|Add3:"+LedgerDetail.AddressLine3 + "|City:" + LedgerDetail.City + "|State:"+LedgerDetail.State
    +"|Pincode:"+LedgerDetail.Pincode+"|"+LedgerDetail.CDProfile1+"|"+LedgerDetail.CDName1+"|"+LedgerDetail.CDMobile1+"|"+LedgerDetail.CDEmail1
    +"|"+LedgerDetail.CDProfile2+"|"+LedgerDetail.CDName2+"|"+LedgerDetail.CDMobile2+"|"+LedgerDetail.CDEmail2
    +"|"+LedgerDetail.CDProfile3+"|"+LedgerDetail.CDName3+"|"+LedgerDetail.CDMobile3+"|"+LedgerDetail.CDEmail3  
    +"|Architect:"+LedgerDetail.CompanyName + "|Website:"+LedgerDetail.Website + "|Add1:"+LedgerDetail.AddressLine1Con
    +"|Add2:"+LedgerDetail.AddressLine2Con  + "|Add3:"+LedgerDetail.AddressLine3Con + "|City:"+LedgerDetail.CityCon
    +"|State:"+LedgerDetail.StateCon + "|Pincode:"+LedgerDetail.PincodeCon
    +"|"+LedgerDetail.ConProfile1+"|"+LedgerDetail.ConName1+"|"+LedgerDetail.ConPhone1+"|"+LedgerDetail.ConEmail1
    +"|"+LedgerDetail.ConProfile2+"|"+LedgerDetail.ConName2+"|"+LedgerDetail.ConPhone2+"|"+LedgerDetail.ConEmail2




    let Plan = LedgerDetail.ProPlus 
   
    //=================Spinner Dialog================
    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.disableClose =true;
    dialogConfig2.autoFocus =true;
    this.Sdialog.open(LoaderComponent,dialogConfig2)
   //=================================================   

   


     LedgerDetail.OrderId = this.OrderId;
     LedgerDetail.OrderNumber = this.OrderNumber

     this.wqgformService.getUsers().subscribe((userData)=>{ 
     

      
      

      this.glassonlyservice.getGlassOrder(this.OrderId).subscribe((OrderData)=>{
          

          const currentDate = this.currentDateTime;
       //   const ISTDateString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        
   
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
          WaltzOrderNo :OrderData.WaltzOrderNo,
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
          Status : "Commercial Hold",
          Active : OrderData.Active,
          Completed : OrderData.Completed,
          CreationDate : OrderData.CreationDate,
          EditDate : OrderData.EditDate,
          WinDate : WinDate,
          Associate : OrderData.Associate,
          ProjectManager : OrderData.ProjectManager,
          TotalSquareFeet : OrderData.TotalSquareFeet,
          CSValue : OrderData.CSValue,
          CompletionDate : CompletionDate,
          DateCreated : OrderData.DateCreated,
          CommercialWinDate : OrderData.CommercialWinDate,
          HandOverDate : OrderData.HandOverDate,
          LedgerDetails : LedgerRemark,
          ProPlan :  Plan,
          ProValue :  ProPlusCost.toString(),
          Pieces : OrderData.Pieces,
          DiscountPercent : OrderData.DiscountPercent,
          FreightPercent : OrderData.FreightPercent,
          PackingPercent : OrderData.PackingPercent,
          OtherChargesPercent : OrderData.OtherChargesPercent,
          Insurance : OrderData.Insurance,
          InsuranceCost : OrderData.InsuranceCost
    
        }
    
         var WinRequirements = {
          Order : newOrder,
          Users : userData.users,
          LedgerDetail : LedgerDetail
         }

         

         this.http.post(this.hostUrl+"/api/makeglassproject",WinRequirements).subscribe((response)=>{

          console.log(response)
         

          if(response==="Error Occured")
          {
 
           this.Sdialog.closeAll();
           const dialogConfig = new MatDialogConfig();
           dialogConfig.disableClose =true;
           dialogConfig.autoFocus =true;
           this.Edialog.open(ErrorComponent,dialogConfig)
 
          }

          
          this.http.put<{message : string, orders : GlassOrder}>(this.hostUrl+"/api/glassorders/win/"+ WinRequirements.Order._id,WinRequirements).subscribe(responseWin => {
             
            this.http.post<{message: string, ledgerId: string}>(this.hostUrl+"/api/ledgerdetails",WinRequirements.LedgerDetail).subscribe(response => {
              
              this.projectsService.getGlassProjects(WinRequirements.Order.Associate)
             
                this.Sdialog.closeAll()
       
               
                 
       
             });
            
          })        
   
       
 
         }, (error) => {
            
        
           this.Sdialog.closeAll();
        
          

        




          
         })






     
    
         })

      


    



     })
     
  }


  getCurrentDateTime() {
    this.http.get('http://worldtimeapi.org/api/timezone/UTC').subscribe((response : any)=>{
      this.currentDateTime = new Date(response.datetime);
    })
     
  }


}
