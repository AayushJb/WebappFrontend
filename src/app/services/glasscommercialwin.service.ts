import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { LoaderComponent } from '../header/projects/loader/loader.component';
import { ProcorewinComponent } from '../header/projects/procorewin/procorewin.component';
import { CommercialWin } from '../shared/commericalwin.model';
import { LedgerDetail } from '../shared/ledgerdetail.model';
import { Order } from '../shared/order.model';
import { User } from '../shared/user.model';
import { ProcorewinService } from './procorewin.service';
import { ProjectsService } from './projects.service';
import { WqgformService } from './wqgform.service';
import { pipe } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { ErrorComponent } from '../header/projects/error/error.component';
import { GlassonlyService } from './glassonly.service';
import { GlassOrder } from '../shared/glassorder.model';

@Injectable({
  providedIn: 'root'
})
export class GlasscommercialwinService {

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
    private Sdialog : MatDialog,
    private Wdialog : MatDialog,
    private EDialog : MatDialog,
    private overlay: Overlay,
    private procorewinservice : ProcorewinService,
    private glassonlyService : GlassonlyService
    ) { }

  getOrderDetails(OrderNo:string,id:string,ProjectName : string,UserFullName : string,FinalAmount : string)
  {
    

    this.OrderNumber = OrderNo;
    this.OrderId = id;
    this.ProjectName = ProjectName;
    this.Userfullname = UserFullName;
    this.FinalAmount = FinalAmount;




  }



  addCommercialWinDetails(CommercialWin:CommercialWin)
  {

  
   
   //=================Spinner Dialog================
   const dialogConfig2 = new MatDialogConfig();
   dialogConfig2.disableClose =true;
   dialogConfig2.autoFocus =true; 
   this.Sdialog.open(LoaderComponent,dialogConfig2)
   //================================================= 
  
    CommercialWin.OrderId = this.OrderId;
    CommercialWin.OrderNo = this.OrderNumber;

   
    let error = ""

    let OrderId = this.OrderId;
      
    this.wqgformService.getUsers().subscribe((userData)=>{

      




      this.glassonlyService.getGlassOrder(OrderId).subscribe((OrderData)=>{


     
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
        Status : "Win",
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
        CommercialWinDate : WinDate,
        HandOverDate : OrderData.HandOverDate,
        LedgerDetails : OrderData.LedgerDetails,
        ProPlan :   OrderData.ProPlan,
        ProValue :  OrderData.ProValue,
        Pieces :OrderData.Pieces,
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
       
       this.http.put<{message : string, orders : GlassOrder}>(this.hostUrl+"/api/glassorders/wincommercial/"+ OrderId,WinRequirements).subscribe(responseWin => {


        this.http.post<{message: string,commercialwinId:string}>(this.hostUrl+"/api/commercialwins",CommercialWin).subscribe(response=>{
        

          this.http.post(this.hostUrl+"/api/updateglasscommercialwinproject",WinRequirements).subscribe(response=>{


            this.projectsService.getGlassProjects("ALL");
         

          })

        


 

           
          alert("Order is Win")  

          this.Sdialog.closeAll();
        })
       
         
     
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
