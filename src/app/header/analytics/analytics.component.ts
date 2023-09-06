import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Order } from 'src/app/shared/order.model';
import { User } from 'src/app/shared/user.model';
import { LoaderComponent } from '../projects/loader/loader.component';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ReportsService } from 'src/app/services/reports.service';
import { CommercialWin } from 'src/app/shared/commericalwin.model';
import { Handover } from 'src/app/shared/handover.model';
import { LedgerdetailsService } from 'src/app/services/ledgerdetails.service';
import { LedgerDetail } from 'src/app/shared/ledgerdetail.model';
import { SpecialRequest } from 'src/app/shared/specialrequest.model';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { GlassOrder } from 'src/app/shared/glassorder.model';
import { GlassonlyService } from 'src/app/services/glassonly.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;  

//test

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})


export class AnalyticsComponent implements OnInit {


  glassorders : GlassOrder[] = [];
  orders : any[] = [];
  form : FormGroup;
  users : User[] = [];

  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;
  Profile : string;
  commercialwins : CommercialWin[] = [];
  handovers: Handover[] = [];

  ledgerdetails : LedgerDetail[] = [];

  procoreProjects = [];
  

  salesreportflag : boolean = false;


  WinOrdersList : string[] = [];

  specialrequests : SpecialRequest[]= [];


  WaltzAssociate  :string =''
  Sales : number = 0;
  SalesCollection : number = 0;
  PDCCollection : number = 0 ; 

  ComWinCount : number = 0;
  ComWinVal : number = 0;
  BeforeDiscount : number = 0;
  PipeCount : number = 0;
  PipeCsValue : number = 0;
  ProcoreArchitects :any 
  
 



  constructor(private Sdialog : MatDialog, 
    public wqgformService : WqgformService,
    private userService : UsersService,
    private snackbar : MatSnackBar,
    public reportsService : ReportsService,
    public ledgerService : LedgerdetailsService,
    public glassonlyService : GlassonlyService
    
    ) { }

  ngOnInit(): void {

    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.disableClose =true;
    dialogConfig2.autoFocus =true;
    this.Sdialog.open(LoaderComponent,dialogConfig2)

    this.userIsAuthenticated = this.userService.getIsAuth();
    this.UserFullName = this.userService.getUserFullName();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
    this.userIsAuthenticated = isAuthenticated;
    this.UserFullName = this.userService.getUserFullName();
    
    });
   
    
   this.form = new FormGroup({
      'User' : new FormControl(this.UserFullName,{validators:[Validators.required]}),
      'Status' : new FormControl(null,{validators:[Validators.required]}),
      'FromDate' : new FormControl(null,{validators:[Validators.required]}),
      'ToDate' : new FormControl(null,{validators:[Validators.required]}),
    });
     
  
    

   

  


  
    this.reportsService.ListAllProcoreProjects().subscribe((response)=>{

    

     this.procoreProjects = response

 


    })


    this.reportsService.ListProcoreCompanyVendors().subscribe((response)=>{
      this.ProcoreArchitects = response 

    })



    this.wqgformService.getUsers().subscribe((usersdata)=>{
   
      usersdata.users.map(item=>{
        if(item.UserFullName===this.UserFullName)
        {
          this.Profile = item.Profile;
        }
      })

      if(this.Profile!=="USER")
      { this.users = [];
        this.users = usersdata.users
      }

      if(this.Profile==="USER")
      {
        this.users = [];
        usersdata.users.map(item=>{
          if(item.UserFullName===this.UserFullName)
          {
            this.users.push(item)
          }
        })

        
      }

    

    })

    this.wqgformService.getAnalyticsOrderNew().subscribe((ordersData)=>{
      

      this.glassonlyService.getAnalyticsOrderNew().subscribe((glassData)=>{

        for(var i = 0; i < glassData.orders.length; i++)
      {
   
 

       
 

      

      let TempGO = {
        _id : glassData.orders[i]._id,
        OrderType : "GLASS ONLY",
        WaltzOrderNo :glassData.orders[i].WaltzOrderNo,
        OrderNo : glassData.orders[i].OrderNo,
        ProjectName : glassData.orders[i].ProjectName,
        ClientName : glassData.orders[i].ClientName,
        Location : glassData.orders[i].Location,
        Architect : glassData.orders[i].Architect,
        Source : glassData.orders[i].Source,
        Solutions: glassData.orders[i].Solutions,
        Discount : glassData.orders[i].Discount,
        Advance : glassData.orders[i].Advance,
        FinalAmount : glassData.orders[i].FinalAmount,
        GrandTotal : glassData.orders[i].GrandTotal,
        Status : glassData.orders[i].Status,
        Active : glassData.orders[i].Active,
        Completed : glassData.orders[i].Completed,
        CreationDate : glassData.orders[i].CreationDate,
        EditDate : glassData.orders[i].EditDate,
        WinDate : glassData.orders[i].WinDate,
        Associate : glassData.orders[i].Associate,
        ProjectManager : glassData.orders[i].ProjectManager,
        TotalSquareFeet : glassData.orders[i].TotalSquareFeet,
        CSValue : glassData.orders[i].CSValue,
        CompletionDate : glassData.orders[i].CompletionDate,
        DateCreated : glassData.orders[i].DateCreated,
        CommercialWinDate : glassData.orders[i].CommercialWinDate,
        HandOverDate : glassData.orders[i].HandOverDate,
        LedgerDetails : glassData.orders[i].LedgerDetails,
        ProPlan : glassData.orders[i].ProPlan,
        ProValue : glassData.orders[i].ProValue

      }




      this.orders.push(TempGO)
    
  
  
 
}

      })
      


      for(var i = 0; i < ordersData.orders.length; i++)
      {
         
       
        if(ordersData.orders[i].Associate!=="AAYUSH PANDEY")
        {
          if(ordersData.orders[i].Associate!=="SOCIAL")
          {


            let TempWO = {
              _id : ordersData.orders[i]._id,
              OrderType : "WALTZ",
              WaltzOrderNo : "",
              OrderNo : ordersData.orders[i].OrderNo,
              ProjectName : ordersData.orders[i].ProjectName,
              ClientName : ordersData.orders[i].ClientName,
              Location : ordersData.orders[i].Location,
              Architect : ordersData.orders[i].Architect,
              Source : ordersData.orders[i].Source,
              Solutions: ordersData.orders[i].Solutions,
              Discount : ordersData.orders[i].Discount,
              Advance : ordersData.orders[i].Advance,
              FinalAmount : ordersData.orders[i].FinalAmount,
              GrandTotal : ordersData.orders[i].GrandTotal,
              Status : ordersData.orders[i].Status,
              Active : ordersData.orders[i].Active,
              Completed : ordersData.orders[i].Completed,
              CreationDate : ordersData.orders[i].CreationDate,
              EditDate : ordersData.orders[i].EditDate,
              WinDate : ordersData.orders[i].WinDate,
              Associate : ordersData.orders[i].Associate,
              ProjectManager : ordersData.orders[i].ProjectManager,
              ProjectID :ordersData.orders[i].ProjectID,
              OfficeID : ordersData.orders[i].OfficeID,
              TotalSquareFeet : ordersData.orders[i].TotalSquareFeet,
              CSValue : ordersData.orders[i].CSValue,
              CompletionDate : ordersData.orders[i].CompletionDate,
              DateCreated : ordersData.orders[i].DateCreated,
              CommercialWinDate : ordersData.orders[i].CommercialWinDate,
              HandOverDate : ordersData.orders[i].HandOverDate,
              LedgerDetails : ordersData.orders[i].LedgerDetails,
              ProPlan : ordersData.orders[i].ProPlan,
              ProValue : ordersData.orders[i].ProValue

            }


            


            this.orders.push(TempWO)
          
        
        
          }
        }

      }



      
     
 
      this.reportsService.getCommercialWin().subscribe(commdata =>{
        this.commercialwins = commdata.commercialwins
        
      })

      this.reportsService.getHandover().subscribe(commdata =>{
        this.handovers = commdata.handovers
       
      })


      this.reportsService.ListProcoreCompanyVendors().subscribe((response)=>{
        this.ProcoreArchitects = response 
      })




      this.Sdialog.closeAll();
 




     
    })

   


    this.reportsService.getLedgerDetails().subscribe((ledgerData)=>{
      this.ledgerdetails = ledgerData.ledgerdetails

    })


    
  this.reportsService.getSpecialRequests().subscribe((specialReqs)=>{

    this.specialrequests = specialReqs.specialrequests;

  })
     
  }

  onGetReport()
  {


    if(this.form.invalid){

      const invalid = [];
   const controls = this.form.controls;
   for (const name in controls) {
     if (controls[name].invalid) {
       invalid.push(name);
     }
   }
 
   let message : string = "";
 
     for (var i = 0; i<invalid.length; i++)
   {
     if(i===0)
     {
      message = invalid[i]
     }
     if(i>0)
     {
      message = message + ", "+invalid[i]
     }
   }
  
 
     
       let action = "Dismiss"
       this.snackbar.open(message + " IS MISSING!!!!!", action, {
         duration: 10000,
       })
 
     return;
   }
 

  

    let SDate = new Date(this.form.value.FromDate)
    let EDate = new Date(this.form.value.ToDate)

    
    let SDateDate = SDate.getDate();
    let SMonth = SDate.getMonth()+1;
    let SYear = SDate.getFullYear();





    let SMonthFormat='';
    if(SMonth==1)
    {
      SMonthFormat = "Jan"
    }
    if(SMonth==2)
    {
      SMonthFormat = "Feb"
    }
    if(SMonth==3)
    {
      SMonthFormat = "Mar"
    }
    if(SMonth==4)
    {
      SMonthFormat = "Apr"
    }
    if(SMonth==5)
    {
      SMonthFormat = "May"
    }
    if(SMonth==6)
    {
      SMonthFormat = "Jun"
    }
    if(SMonth==7)
    {
      SMonthFormat = "Jul"
    }
    if(SMonth==8)
    {
      SMonthFormat = "Aug"
    }
    if(SMonth==9)
    {
      SMonthFormat = "Sep"
    }
    if(SMonth==10)
    {
      SMonthFormat = "Oct"
    }
    if(SMonth==11)
    {
      SMonthFormat = "Nov"
    }
    if(SMonth==12)
    {
      SMonthFormat = "Dec"
    }


    let StartDate = SDateDate+"-" +  SMonthFormat+"-"+SYear;
    
  
  
    
    let EDateDate = EDate.getDate();
    let EMonth = EDate.getMonth()+1;
    let EYear = EDate.getFullYear();


    let EMonthFormat='';
    if(EMonth==1)
    {
      EMonthFormat = "Jan"
    }
    if(EMonth==2)
    {
      EMonthFormat = "Feb"
    }
    if(EMonth==3)
    {
      EMonthFormat = "Mar"
    }
    if(EMonth==4)
    {
      EMonthFormat = "Apr"
    }
    if(EMonth==5)
    {
      EMonthFormat = "May"
    }
    if(EMonth==6)
    {
      EMonthFormat = "Jun"
    }
    if(EMonth==7)
    {
      EMonthFormat = "Jul"
    }
    if(EMonth==8)
    {
      EMonthFormat = "Aug"
    }
    if(EMonth==9)
    {
      EMonthFormat = "Sep"
    }
    if(EMonth==10)
    {
      EMonthFormat = "Oct"
    }
    if(EMonth==11)
    {
      EMonthFormat = "Nov"
    }
    if(EMonth==12)
    {
      EMonthFormat = "Dec"
    }


    let EndDate = EDateDate+"-" +  EMonthFormat+"-"+EYear;


  
    let Statuses = this.form.value.Status;
    let User = this.form.value.User;
    var From = new Date(this.form.value.FromDate)
    From.setHours(0);
    From.setMinutes(0);
    From.setSeconds(0);
    From.setMilliseconds(0); 


    var FromDate = From.getDate()
    var FromMonth = From.getMonth()+ 1;
    var FromYear = From.getFullYear();
    
    var To = new Date(this.form.value.ToDate)
    var ToDate = To.getDate();
    var ToMonth = To.getMonth() + 1;
    var ToYear = To.getFullYear();

   
/*
 if(this.Profile==="USER") 
 {  
  

    var FilteredOrdersUser = [] 
  

    for(var i = 0; i<Statuses.length; i++)
    {

       if(User!=="ALL")
      {
        
           for(var j = 0 ; j < this.orders.length ; j ++)
           {

            if(this.orders[j].Status ==="Win")
            {
            var WinDate = Number(this.orders[j].CommercialWinDate.split('-')[0])
            var WinMonth = Number(this.orders[j].CommercialWinDate.split('-')[1])
            var WinYear = Number(this.orders[j].CommercialWinDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear           
 
  

            var winDatetest = new Date(DateFormat)

            winDatetest.setHours(0);
            winDatetest.setMinutes(0);
            winDatetest.setSeconds(0);
            winDatetest.setMilliseconds(0); 
        


          
          
              
            if(winDatetest>=From&&winDatetest<=To&&this.orders[j].Status==="Win"&&this.orders[j].Associate===this.form.value.User)
            {
              var temp = {
                "OrderNumber" : this.orders[j].OrderNo,
                "CreationDate" : this.orders[j].CreationDate,
                "EditDate" : this.orders[j].EditDate,
                "WinDate" : this.orders[j].CommercialWinDate,
                "ProjectName" : this.orders[j].ProjectName,
                "ClientName" : this.orders[j].ClientName,
                "Location" : this.orders[j].Location,
                "ArchitectName" : this.orders[j].Architect,
                "GrandTotal" : this.orders[j].GrandTotal,
                "Discount" : this.orders[j].Discount,
                "FinalAmount" : this.orders[j].FinalAmount,
                "TotalSolutions" : this.orders[j].Solutions.length,
                "WaltzAssociate" : this.orders[j].Associate,
                "Source" : this.orders[j].Source,
                "Status" : this.orders[j].Status,
                "TotalSquarefeet" : this.orders[j].TotalSquareFeet
              
                
              }
              FilteredOrdersUser.push(temp)
            }
             }

             
            if(this.orders[j].Status ==="Old Win")
            {
            var WinDate = Number(this.orders[j].CommercialWinDate.split('-')[0])
            var WinMonth = Number(this.orders[j].CommercialWinDate.split('-')[1])
            var WinYear = Number(this.orders[j].CommercialWinDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear           
 
  

            var winDatetest = new Date(DateFormat)

            winDatetest.setHours(0);
            winDatetest.setMinutes(0);
            winDatetest.setSeconds(0);
            winDatetest.setMilliseconds(0); 


          
          
              
            if(winDatetest>=From&&winDatetest<=To&&this.orders[j].Status==="Old Win"&&this.orders[j].Associate===this.form.value.User)
            {
              var temp = {
                "OrderNumber" : this.orders[j].OrderNo,
                "CreationDate" : this.orders[j].CreationDate,
                "EditDate" : this.orders[j].EditDate,
                "WinDate" : this.orders[j].WinDate,
                "ProjectName" : this.orders[j].ProjectName,
                "ClientName" : this.orders[j].ClientName,
                "Location" : this.orders[j].Location,
                "ArchitectName" : this.orders[j].Architect,
                "GrandTotal" : this.orders[j].GrandTotal,
                "Discount" : this.orders[j].Discount,
                "FinalAmount" : this.orders[j].FinalAmount,
                "TotalSolutions" : this.orders[j].Solutions.length,
                "WaltzAssociate" : this.orders[j].Associate,
                "Source" : this.orders[j].Source,
                "Status" : this.orders[j].Status,
                "TotalSquarefeet" : this.orders[j].TotalSquareFeet
              
                
              }
              FilteredOrdersUser.push(temp)
            }
             }

             if(this.orders[j].Status ==="Commercial Hold")
             {
             var WinDate = Number(this.orders[j].WinDate.split('-')[0])
             var WinMonth = Number(this.orders[j].WinDate.split('-')[1])
             var WinYear = Number(this.orders[j].WinDate.split('-')[2])
             var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear           
  
   
 
             var winDatetest = new Date(DateFormat)
             
             winDatetest.setHours(0);
             winDatetest.setMinutes(0);
             winDatetest.setSeconds(0);
             winDatetest.setMilliseconds(0); 
 
               
             if(winDatetest>=From&&winDatetest<=To&&this.orders[j].Status==="Commercial Hold"&&this.orders[j].Associate===this.form.value.User)
             {
               var temp = {
                 "OrderNumber" : this.orders[j].OrderNo,
                 "CreationDate" : this.orders[j].CreationDate,
                 "EditDate" : this.orders[j].EditDate,
                 "WinDate" : this.orders[j].WinDate,
                 "ProjectName" : this.orders[j].ProjectName,
                 "ClientName" : this.orders[j].ClientName,
                 "Location" : this.orders[j].Location,
                 "ArchitectName" : this.orders[j].Architect,
                 "GrandTotal" : this.orders[j].GrandTotal,
                 "Discount" : this.orders[j].Discount,
                 "FinalAmount" : this.orders[j].FinalAmount,
                 "TotalSolutions" : this.orders[j].Solutions.length,
                 "WaltzAssociate" : this.orders[j].Associate,
                 "Source" : this.orders[j].Source,
                 "Status" : this.orders[j].Status,
                 "TotalSquarefeet" : this.orders[j].TotalSquareFeet
               
                 
               }
               FilteredOrdersUser.push(temp)
             }
              }
              
              if(this.orders[j].Status ==="Handover")
              {
              var WinDate = Number(this.orders[j].HandOverDate.split('-')[0])
              var WinMonth = Number(this.orders[j].HandOverDate.split('-')[1])
              var WinYear = Number(this.orders[j].HandOverDate.split('-')[2])
              var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear           
   
    
  
              var winDatetest = new Date(DateFormat)

              winDatetest.setHours(0);
              winDatetest.setMinutes(0);
              winDatetest.setSeconds(0);
              winDatetest.setMilliseconds(0); 
  
  
            
            
                
              if(winDatetest>=From&&winDatetest<=To&&this.orders[j].Status==="Handover"&&this.orders[j].Associate===this.form.value.User)
              {
                var temp = {
                  "OrderNumber" : this.orders[j].OrderNo,
                  "CreationDate" : this.orders[j].CreationDate,
                  "EditDate" : this.orders[j].EditDate,
                  "WinDate" : this.orders[j].WinDate,
                  "ProjectName" : this.orders[j].ProjectName,
                  "ClientName" : this.orders[j].ClientName,
                  "Location" : this.orders[j].Location,
                  "ArchitectName" : this.orders[j].Architect,
                  "GrandTotal" : this.orders[j].GrandTotal,
                  "Discount" : this.orders[j].Discount,
                  "FinalAmount" : this.orders[j].FinalAmount,
                  "TotalSolutions" : this.orders[j].Solutions.length,
                  "WaltzAssociate" : this.orders[j].Associate,
                  "Source" : this.orders[j].Source,
                  "Status" : this.orders[j].Status,
                  "TotalSquarefeet" : this.orders[j].TotalSquareFeet
                
                  
                }
                FilteredOrdersUser.push(temp)
              }
               }  

           }
        
        if(Statuses[i]==="Pipeline" )
        {  

          for(var j = 0 ; j < this.orders.length ; j ++)
          {
            if(this.orders[j].Status ==="Pipeline")
            {
            var EditDate = Number(this.orders[j].EditDate.split('-')[0])
            var EditMonth = Number(this.orders[j].EditDate.split('-')[1])
            var EditYear = Number(this.orders[j].EditDate.split('-')[2])
            var DateFormatEdit = EditMonth+ "/" + EditDate + "/" + EditYear        
            
            var EditDateTest=new Date(DateFormatEdit)

            EditDateTest.setHours(0);
            EditDateTest.setMinutes(0);
            EditDateTest.setSeconds(0);
            EditDateTest.setMilliseconds(0); 
  
  
            if(EditDateTest<=To&&EditDateTest>=From&&this.orders[j].Status===Statuses[i]&&this.orders[j].Associate===this.form.value.User)
            {
              var temp2 = {
                "OrderNumber" : this.orders[j].OrderNo,
                "CreationDate" : this.orders[j].CreationDate,
                "EditDate" : this.orders[j].EditDate,
                "WinDate" : this.orders[j].WinDate,
                "ProjectName" : this.orders[j].ProjectName,
                "ClientName" : this.orders[j].ClientName,
                "Location" : this.orders[j].Location,
                "ArchitectName" : this.orders[j].Architect,
                "GrandTotal" : this.orders[j].GrandTotal,
                "Discount" : this.orders[j].Discount,
                "FinalAmount" : this.orders[j].FinalAmount,
                "TotalSolutions" : this.orders[j].Solutions.length,
                "WaltzAssociate" : this.orders[j].Associate,
                "Source" : this.orders[j].Source,
                "Status" : this.orders[j].Status,
                "TotalSquarefeet" : this.orders[j].TotalSquareFeet
              
              }

              FilteredOrdersUser.push(temp2)
            }
          }
          }

        
        }
      }





      if(User==="ALL")
      {
        if(Statuses[i]==="Win"||Statuses[i]==="Commercial Hold"||Statuses[i]==="Old Win")
        {
           for(var j = 0 ; j < this.orders.length ; j ++)
           {

            if(this.orders[j].Status ==="Win"||this.orders[j].Status ==="Old Win"||this.orders[j].Status ==="Commercial Hold")
            {
            var WinDate = Number(this.orders[j].WinDate.split('-')[0])
            var WinMonth = Number(this.orders[j].WinDate.split('-')[1])
            var WinYear = Number(this.orders[j].WinDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear           
 
  

            var winDatetest = new Date(DateFormat)

            winDatetest.setHours(0);
            winDatetest.setMinutes(0);
            winDatetest.setSeconds(0);
            winDatetest.setMilliseconds(0); 

            
          
            
              
            if(winDatetest>=From&&winDatetest<=To&&this.orders[j].Status===Statuses[i])
            {
              var temp = {
                "OrderNumber" : this.orders[j].OrderNo,
                "CreationDate" : this.orders[j].CreationDate,
                "EditDate" : this.orders[j].EditDate,
                "WinDate" : this.orders[j].WinDate,
                "ProjectName" : this.orders[j].ProjectName,
                "ClientName" : this.orders[j].ClientName,
                "Location" : this.orders[j].Location,
                "ArchitectName" : this.orders[j].Architect,
                "GrandTotal" : this.orders[j].GrandTotal,
                "Discount" : this.orders[j].Discount,
                "FinalAmount" : this.orders[j].FinalAmount,
                "TotalSolutions" : this.orders[j].Solutions.length,
                "WaltzAssociate" : this.orders[j].Associate,
                "Source" : this.orders[j].Source,
                "Status" : this.orders[j].Status,
                "TotalSquarefeet" : this.orders[j].TotalSquareFeet

              }
              FilteredOrdersUser.push(temp)
            }
          }

           }
        }
        if(Statuses[i]==="Pipeline" )
        {  

          for(var j = 0 ; j < this.orders.length ; j ++)
          {
            if(this.orders[j].Status ==="Pipeline")
            {
            var EditDate = Number(this.orders[j].EditDate.split('-')[0])
            var EditMonth = Number(this.orders[j].EditDate.split('-')[1])
            var EditYear = Number(this.orders[j].EditDate.split('-')[2])
            var DateFormatEdit = EditMonth+ "/" + EditDate + "/" + EditYear     
            
            
            
            var EditDateTest=new Date(DateFormatEdit)

            EditDateTest.setHours(0);
            EditDateTest.setMinutes(0);
            EditDateTest.setSeconds(0);
            EditDateTest.setMilliseconds(0); 
  
  
            if(EditDateTest<=To&&EditDateTest>=From&&this.orders[j].Status===Statuses[i])
            {
              var temp2 = {
                "OrderNumber" : this.orders[j].OrderNo,
                "CreationDate" : this.orders[j].CreationDate,
                "EditDate" : this.orders[j].EditDate,
                "WinDate" : this.orders[j].WinDate,
                "ProjectName" : this.orders[j].ProjectName,
                "ClientName" : this.orders[j].ClientName,
                "Location" : this.orders[j].Location,
                "ArchitectName" : this.orders[j].Architect,
                "GrandTotal" : this.orders[j].GrandTotal,
                "Discount" : this.orders[j].Discount,
                "FinalAmount" : this.orders[j].FinalAmount,
                "TotalSolutions" : this.orders[j].Solutions.length,
                "WaltzAssociate" : this.orders[j].Associate,
                "Source" : this.orders[j].Source,
                "Status" : this.orders[j].Status,
                "TotalSquarefeet" : this.orders[j].TotalSquareFeet
                
              }

              FilteredOrdersUser.push(temp2)
            }
          }
          }

        
        }
      }
    
      

    }

  
  

   
var options = { 
 
  headers:  ["OrderNumber","CreationDate","EditDate","WinDate","ProjectName","ClientName","Location",
  "ArchitectName",
  "GrandTotal",
  "Discount",
  "FinalAmount",
  "TotalSolutions",
  "WaltzAssociate" ,
  "Source" ,
  "Status",
  "TotalSquarefeet"
] 
	
};

let FileName = "Order Report"
   
new ngxCsv(FilteredOrdersUser, FileName, options);


 }

*/




 //=============================================================
 //=============================================================


 
 if(this.Profile==="ACCOUNTS"||this.Profile==="ADMIN") 
 { 


  var ArchitectTemp = []



  this.ProcoreArchitects.map((item)=>{
   
    let Trades = ""

    if(item.trades.length>0)
    {
      Trades = item.trades[0].name
    }


    
    if(item.project_ids.length>0)
    {
      if(Trades==="Pro Plus Architect"||Trades==="Pro Architect"||Trades==="Self"||Trades==="PMC")
      {
        for(var i=0; i<item.project_ids.length;i++)
        {
          let temp = {ArchitectFirm : item.name,ProjectID :item.project_ids[i] }
          ArchitectTemp.push(temp)
        }
      }
      
    }

 
  

  })

  var ArchProList =[]

  for(var j=0;j<this.procoreProjects.length;j++)
  {
    for(var k=0;k<ArchitectTemp.length;k++)
    {
      if(ArchitectTemp[k].ProjectID===this.procoreProjects[j].id)
      {
 
        let ProcoreRefNo ="";

             if(this.procoreProjects[j].project_number.includes("/V-"))
             {
              ProcoreRefNo = this.procoreProjects[j].project_number.toString().split("/V-")[0]
             }
             if(!this.procoreProjects[j].project_number.includes("/V-"))
             {
              ProcoreRefNo = this.procoreProjects[j].project_number
             }


            
         let temp = {ArchitectFirm :ArchitectTemp[k].ArchitectFirm, OrderNo : ProcoreRefNo  }
         ArchProList.push(temp)

      }
    }
  }

  
  
  this.reportsService.getCSDataBulk(StartDate,EndDate).subscribe((response)=>{

    let DataCS :any = [{Order : this.orders,CSData : response}]
    let CSData = JSON.parse(DataCS[0].CSData);

    var FilteredOrders = [] 


  //for(var i = 0; i < Statuses.length;i++)
  {
   

    if(User==="ALL")
    {
       
      if(Statuses==="Pipeline" )
      {  

        for(var j = 0 ; j < this.orders.length ; j ++)
        {
       

          if(this.orders[j].CreationDate&&this.orders[j].Status==="Pipeline")
          {
          var EditDate = Number(this.orders[j].CreationDate.split('-')[0])
          var EditMonth = Number(this.orders[j].CreationDate.split('-')[1])
          var EditYear = Number(this.orders[j].CreationDate.split('-')[2])
          var DateFormatEdit = EditMonth+ "/" + EditDate + "/" + EditYear        
          
          var EditDateTest=new Date(DateFormatEdit)

          
          EditDateTest.setHours(0);
          EditDateTest.setMinutes(0);
          EditDateTest.setSeconds(0);
          EditDateTest.setMilliseconds(0);

      
 

          if(EditDateTest<=To&&EditDateTest>=From)
          {


           

            let OrderProjectRefNo = ""

            if(this.orders[j].OrderNo.includes("/V-"))
            {
             let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
             let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
             let slash = tempproref.lastIndexOf("/");
             let proref = tempproref.substring(slash + 1, hyphen); 
             OrderProjectRefNo = proref
            }
         
            if(!this.orders[j].OrderNo.includes("/V-"))
            {
             let slash = this.orders[j].OrderNo.lastIndexOf("/");
             let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
             OrderProjectRefNo = proref
            }
         
             
            let DealerDiscount = '';

            this.users.map((item)=>{
              if(item.UserFullName===this.orders[j].Associate)
              {
                DealerDiscount = item.DealerDiscount
              }
            })


            this.specialrequests.map((item)=>{
              if(item.OrderNo===OrderProjectRefNo)
              {
                DealerDiscount = item.NewDealerDiscount
              }
            })
            
            let CSValue = "";

            if(DealerDiscount!=="0")
            {
             CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
            }
            if(DealerDiscount==="0")
            {
              CSValue = this.orders[j].FinalAmount
            }


             let CommercialWinDate = this.orders[j].CommercialWinDate
             let CommercialWinAmount = "";
             let CommercialWinPercent = "";
             let CommercialType = "";
             let HandoverDate = "";
             let CommercialRemark = "";
             let Party = "";
             let Expense = "";
             let ExpensePercent = "";
             let Outstanding = 0;
             let Billed = "";
             let SpecialDiscount = "";
             let ReceiptAdvance = "";
             let ChequeRequired = "";
             let Type = ""
             let Remark = ""
             let Plan = ""
             let PlanValue = "";
             let PROJECTNAME ="";
             let PR_DT =""
             let PROJECTTYPE =""
             let JT =""
             let PROSTDATE =""
             let PROENDDATE =""
             let PROJECTSQM =""
             let PROJECTVALUE =""
             let EXPENDITURE =""
             let PIR_ID =""
             let NOOBPI =""
             let PIBASICVALUE=""
             let PITOTALVALUE =""
             let CONFIRMPIBASICVALUE =""
             let CONFIRMPITOTALVALUE =""
             let ADVPIAMT =""
             let COLLECTIONOFPI =""
             let  CONFIRMPISQM =""
             let  DISPATCHPISQM =""
             let  BILLTO_PNAME =""
             let  ACC_REP =""
             let  HO_REP=""
             let  PDCCOLLECTION =""
             let  INVOICECOLLECTION =""
             let  DISPATCHPIVALUE =""
             let  POBASICAMT =""
             let  PURCHASEVALUE =""
             let  REJECTIONSQM =""
             let  REJECTIONVALUE =""
             let  PROJREFNO =""
             let  PROJWINDTSTR =""
             let  PROJ_WIN_DT =""
             let  WIPQTY =""
             let  RFDQTY =""
             let  ProcoreStatus = "";
             let  BadDebt = 0;
             let  StatusCs = "";
             let  ShortClose = "";
             let  Sales = "";
             let  CreditNote = "";
             let  DebitNote = "";
             let  WriteOff = "";
             let  DispatchValue = "";
             let  RFDValue = "";
             let  WIPValue = "";
             let ExpenseArray = []
             let ARCHITECT_EXPENSES = 0
             let COMMISSION_EXPENSE = 0
             let COMMISSION_ON_SALESB = 0
             let CONTRACT_LABOUR_CHARGES = 0
             let FREIGHT_EXPENSE_ON_SALE = 0
             let ONSITE_EXPENSES = 0
             let PERFORMANCE_BONUS = 0
             let SOCIAL_FEE = 0
             let SOCIAL_FEEB = 0
             let TRAVELLING_AND_CONVEYANCE_EXPENSES = 0;
             let ProcorePresent = "NO";
             let CSPresent = "NO";

             let ArchitectFirm = ""

             ArchProList.map((item)=>{

              if(item.OrderNo===OrderProjectRefNo)
              {
                ArchitectFirm = item.ArchitectFirm
              }

             })

             this.procoreProjects.map((item)=>{
           
             let ProcoreRefNo ="";

             if(item.project_number.includes("/V-"))
             {
              ProcoreRefNo = item.project_number.toString().split("/V-")[0]
             }
             if(!item.project_number.includes("/V-"))
             {
              ProcoreRefNo = item.project_number
             }


             if(OrderProjectRefNo===ProcoreRefNo)
             {
              ProcoreStatus = item.project_stage.name
              ProcorePresent = "YES"
             }
      


             })

            
             let TotalExpenditure = 0;     

             CSData.map((item)=>{

              if(OrderProjectRefNo===item.PROJREFNO)
              {

               
                 CSPresent = "YES"
                 PROJECTNAME =item.PROJECTNAME
                 PR_DT =item.PR_DT
                 PROJECTTYPE =item.PROJECTTYPE
                 JT =item.JT
                 PROSTDATE =item.PROSTDATE
                 PROENDDATE =item.PROENDDATE
                 PROJECTSQM =item.PROJECTSQM
                 PROJECTVALUE =item.PROJECTVALUE
                 EXPENDITURE =item.EXPENDITURE
                 PIR_ID =item.PIR_ID
                 NOOBPI =item.NOOBPI
                 PIBASICVALUE=item.PIBASICVALUE
                 PITOTALVALUE =item.PITOTALVALUE
                 CONFIRMPIBASICVALUE =item.CONFIRMPIBASICVALUE
                 CONFIRMPITOTALVALUE =item.CONFIRMPITOTALVALUE
                 ADVPIAMT =item.ADVPIAMT
                 COLLECTIONOFPI =item.COLLECTIONOFPI
                  CONFIRMPISQM =item.CONFIRMPISQM
                  DISPATCHPISQM =item.DISPATCHPISQM
                  BILLTO_PNAME =item.BILLTO_PNAME
                  ACC_REP =item.ACC_REP
                  HO_REP=item.HO_REP
                  PDCCOLLECTION =item.PDCCOLLECTION
                  INVOICECOLLECTION =item.INVOICECOLLECTION
                  DISPATCHPIVALUE =item.DISPATCHPIVALUE
                  POBASICAMT =item.POBASICAMT
                  PURCHASEVALUE =item.PURCHASEVALUE
                  REJECTIONSQM =item.REJECTIONSQM
                  REJECTIONVALUE =item.REJECTIONVALUE
                  PROJREFNO =item.PROJREFNO
                  PROJWINDTSTR =item.PROJWINDTSTR
                  PROJ_WIN_DT =item.PROJ_WIN_DT
                  WIPQTY =item.WIPQTY
                  RFDQTY =item.RFDQTY
                  StatusCs = item.status;
                  ShortClose = item.Short_close;
                  Sales = item.sales;
                  CreditNote = item.credit_note;
                  DebitNote = item.debit_note;
                  WriteOff = item.wriite_off;
                  DispatchValue = item.DISPATCH_VALUE;
                  RFDValue = item.rfd_value;
                  WIPValue = item.wip_value;
                  

                  if(item.EXPENDITURE)
                  {
                    ExpenseArray = item.EXPENDITURE.split(",")
                  }

                  if(ExpenseArray.length>0)
                  {
                    for(var i =0; i<ExpenseArray.length;i++)
                    {
                      let Field = ExpenseArray[i].split("~")[0]
                      if(Field==="ARCHITECT EXPENSES")
                      {
                        ARCHITECT_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION EXPENSE")
                      {
                        COMMISSION_EXPENSE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION ON SALES-B")
                      {
                        COMMISSION_ON_SALESB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="CONTRACT LABOUR CHARGES")
                      {
                        CONTRACT_LABOUR_CHARGES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                      {
                        FREIGHT_EXPENSE_ON_SALE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="ONSITE EXPENSES")
                      {
                        ONSITE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="PERFORMANCE BONUS")
                      {
                        PERFORMANCE_BONUS = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE")
                      {
                        SOCIAL_FEE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE - B")
                      {
                        SOCIAL_FEEB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                      {
                        TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }



                    }

                    TotalExpenditure = Number(ARCHITECT_EXPENSES) + Number(COMMISSION_EXPENSE) + Number(COMMISSION_ON_SALESB) + Number(CONTRACT_LABOUR_CHARGES) + Number(FREIGHT_EXPENSE_ON_SALE) + Number(ONSITE_EXPENSES)  + Number(PERFORMANCE_BONUS) + Number(SOCIAL_FEE) + Number(SOCIAL_FEEB) + Number(TRAVELLING_AND_CONVEYANCE_EXPENSES)

                  }

                
        
              }

             })
             


             this.ledgerdetails.map((item)=>{

              let LedRefno = ""
              

              
              if(item.OrderNumber.includes("/V-"))
              {
               let hyphen = item.OrderNumber.lastIndexOf("/V-");
               let tempproref = item.OrderNumber.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               LedRefno = proref
              }
       
             if(!item.OrderNumber.includes("/V-"))
             {
               let slash = item.OrderNumber.lastIndexOf("/");
               let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
               LedRefno = proref
             }

             if(LedRefno===OrderProjectRefNo)
             {
              Plan = item.ProPlus
             }
             if(LedRefno===OrderProjectRefNo)
             {
              if(item.ProPlusCost)
              {
                PlanValue = item.ProPlusCost
              }
             
             }

             })
            


             this.commercialwins.map((item)=>{
              let CommRefNo = ""
              
                if(item.OrderNo.includes("/V-"))
                {
                 let hyphen = item.OrderNo.lastIndexOf("/V-");
                 let tempproref = item.OrderNo.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 CommRefNo = proref
                }
         
               if(!item.OrderNo.includes("/V-"))
               {
                 let slash = item.OrderNo.lastIndexOf("/");
                 let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
                 CommRefNo = proref
               }
                
               if(CommRefNo===OrderProjectRefNo)
               {
                CommercialWinDate = this.orders[j].CommercialWinDate
                CommercialWinAmount = item.Amount
                CommercialWinPercent = item.Percent
                CommercialType = item.Type
                CommercialRemark = item.Remark

               }

             })




             this.handovers.map((item)=>{

              let HandRefNo = ""
              
              if(item.OrderNo.includes("/V-"))
              {
               let hyphen = item.OrderNo.lastIndexOf("/V-");
               let tempproref = item.OrderNo.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               HandRefNo = proref
              }
       
             if(!item.OrderNo.includes("/V-"))
             {
               let slash = item.OrderNo.lastIndexOf("/");
               let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
               HandRefNo = proref
             }
              
             if(HandRefNo===OrderProjectRefNo)
             {
              HandoverDate = this.orders[j].HandOverDate
              Party = item.Party
              Expense = item.Expense
              ExpensePercent = item.ExpensePercent
              BadDebt = Number(item.BadDebt)           
              Outstanding = (Number(item.OutStanding)-Number(item.BadDebt))
              Billed = item.Billed
              SpecialDiscount = item.SpecialDiscount
              ReceiptAdvance = item.ReceiptAdvance
              ChequeRequired = item.ChequeRequired
              Type = item.ChequeRequired
              Remark = item.Remark
            
             }


             })





            var temp11 = {
              "OrderType": this.orders[j].OrderType,
              "WaltzOrderNo":this.orders[j].WaltzOrderNo,
              "OrderNumber" : this.orders[j].OrderNo,
              "CreationDate" : this.orders[j].CreationDate,
              "EditDate" : this.orders[j].EditDate,
              "WinDate" : this.orders[j].WinDate,
              "ProjectName" : this.orders[j].ProjectName,
              "ClientName" : this.orders[j].ClientName,
              "Location" : this.orders[j].Location,
              "ArchitectName" : this.orders[j].Architect,
              "GrandTotal" : this.orders[j].GrandTotal,
              "Discount" : this.orders[j].Discount,
              "FinalAmount" : this.orders[j].FinalAmount,
              "TotalSolutions" : this.orders[j].Solutions.length,
              "WaltzAssociate" : this.orders[j].Associate,
              "Source" : this.orders[j].Source,
              "Status" : this.orders[j].Status,
              "TotalSquarefeet" : this.orders[j].TotalSquareFeet,
              "CSValue" : CSValue,
              "DealerDiscount" : DealerDiscount,
              "Plan" : Plan,
              "PlanValue" : PlanValue,
              "CommercialWinDate":CommercialWinDate,
              "CommercialWinAmount":CommercialWinAmount,
              "CommercialWinPercent":CommercialWinPercent,
              "CommercialType":CommercialType,
              "CommercialRemark": CommercialRemark,
              "HandoverDate":HandoverDate,
              "Party": Party,
              "Expense": Expense,
              "ExpensePercent": ExpensePercent,
              "Outstanding" : Outstanding,
              "Billed" : Billed,
              "SpecialDiscount": SpecialDiscount,
              "BadDebt" : BadDebt,
              "ReceiptAdvance": ReceiptAdvance,
              "ChequeRequired": ChequeRequired,
              "Type": Type,
              "Remark": Remark,
              "ProcoreProjectStatus" : ProcoreStatus,
              "ArchitectFirm" : ArchitectFirm,
              "PROJECTNAME": PROJECTNAME,
              "PR_DT": PR_DT,
              "PROJECTTYPE": PROJECTTYPE,
              "JT": JT,
              "PROSTDATE": PROSTDATE,
              "PROENDDATE": PROENDDATE,
              "PROJECTSQM": PROJECTSQM,
              "PROJECTVALUE": PROJECTVALUE,
              "EXPENDITURE": EXPENDITURE,
              "PIR_ID": PIR_ID,
              "NOOBPI": NOOBPI,
              "PIBASICVALUE": PIBASICVALUE,
              "PITOTALVALUE": PITOTALVALUE,
              "CONFIRMPIBASICVALUE": CONFIRMPIBASICVALUE,
              "CONFIRMPITOTALVALUE": CONFIRMPITOTALVALUE,
              "ADVPIAMT": ADVPIAMT,
              "COLLECTIONOFPI": COLLECTIONOFPI,
              "CONFIRMPISQM": CONFIRMPISQM,
              "DISPATCHPISQM": DISPATCHPISQM,
              "BILLTO_PNAME": BILLTO_PNAME,
              "ACC_REP": ACC_REP,
              "HO_REP": HO_REP,
              "PDCCOLLECTION": PDCCOLLECTION,
              "INVOICECOLLECTION": INVOICECOLLECTION,
              "DISPATCHPIVALUE": DISPATCHPIVALUE,
              "POBASICAMT": POBASICAMT,
              "PURCHASEVALUE": PURCHASEVALUE,
              "REJECTIONSQM": REJECTIONSQM,
              "REJECTIONVALUE": REJECTIONVALUE,
              "PROJREFNO": PROJREFNO,
              "PROJWINDTSTR": PROJWINDTSTR,
              "PROJ_WIN_DT": PROJ_WIN_DT,
              "WIPQTY": WIPQTY,
              "RFDQTY": RFDQTY,
              "CSSTATUS" : StatusCs,
              "SHORT CLOSE" : ShortClose,
              "SALES" : Sales,
              "CREDIT NOTE" : CreditNote,
              "DEBIT NOTE" : DebitNote,
              "WRITE OFF":  WriteOff,
              "DISPATCH VALUE": DispatchValue,
              "RFD VALUE" : RFDValue,
              "WIP VALUE" : WIPValue,
              "ARCHITECT_EXPENSES" :ARCHITECT_EXPENSES,
              "COMMISSION_EXPENSE" :COMMISSION_EXPENSE,
              "COMMISSION_ON_SALESB": COMMISSION_ON_SALESB,
              "CONTRACT_LABOUR_CHARGES":CONTRACT_LABOUR_CHARGES,
              "FREIGHT_EXPENSE_ON_SALE" : FREIGHT_EXPENSE_ON_SALE,
              "ONSITE_EXPENSES":ONSITE_EXPENSES,
              "PERFORMANCE_BONUS":PERFORMANCE_BONUS,
              "SOCIAL_FEE" : SOCIAL_FEE,
              "SOCIAL_FEEB" : SOCIAL_FEEB,
              "TRAVELLING_AND_CONVEYANCE_EXPENSES" : TRAVELLING_AND_CONVEYANCE_EXPENSES,
              "TOTAL EXPENDITURE" : TotalExpenditure,
              "PROCOREPRESENT": ProcorePresent,
              "CSPRESENT" : CSPresent
              
            }

            FilteredOrders.push(temp11)
          }
        }
        }

      }

      if(Statuses==="Win")
      {
        for(var j = 0 ; j < this.orders.length ; j ++)
        {

          if(this.orders[j].CommercialWinDate)
          {

            var WinDate = Number(this.orders[j].CommercialWinDate.split('-')[0])
            var WinMonth = Number(this.orders[j].CommercialWinDate.split('-')[1])
            var WinYear = Number(this.orders[j].CommercialWinDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
            
            var winDatetest = new Date(DateFormat)

            
            winDatetest.setHours(0);
            winDatetest.setMinutes(0);
            winDatetest.setSeconds(0);
            winDatetest.setMilliseconds(0);

            if(winDatetest>=From&&winDatetest<=To)
            {

                  

            let OrderProjectRefNo = ""

            if(this.orders[j].OrderNo.includes("/V-"))
            {
             let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
             let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
             let slash = tempproref.lastIndexOf("/");
             let proref = tempproref.substring(slash + 1, hyphen); 
             OrderProjectRefNo = proref
            }
         
            if(!this.orders[j].OrderNo.includes("/V-"))
            {
             let slash = this.orders[j].OrderNo.lastIndexOf("/");
             let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
             OrderProjectRefNo = proref
            }
         
             
            let DealerDiscount = '';

            this.users.map((item)=>{
              if(item.UserFullName===this.orders[j].Associate)
              {
                DealerDiscount = item.DealerDiscount
              }
            })


            this.specialrequests.map((item)=>{
              if(item.OrderNo===OrderProjectRefNo)
              {
                DealerDiscount = item.NewDealerDiscount
              }
            })
            
            let CSValue = "";

            if(DealerDiscount!=="0")
            {
             CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
            }
            if(DealerDiscount==="0")
            {
              CSValue = this.orders[j].FinalAmount
            }


             let CommercialWinDate = this.orders[j].CommercialWinDate
             let CommercialWinAmount = ""
             let CommercialWinPercent = ""
             let CommercialType = ""
             let HandoverDate = ""
             let CommercialRemark = ""
             let Party = ""
             let Expense = ""
             let ExpensePercent = ""
             let Outstanding = 0
             let Billed = ""
             let SpecialDiscount = ""
             let ReceiptAdvance = ""
             let ChequeRequired = ""
             let Type = ""
             let Remark = ""
             let Plan = ""
             let PlanValue = "";
             let PROJECTNAME ="";
             let PR_DT =""
             let PROJECTTYPE =""
             let JT =""
             let PROSTDATE =""
             let PROENDDATE =""
             let PROJECTSQM =""
             let PROJECTVALUE =""
             let EXPENDITURE =""
             let PIR_ID =""
             let NOOBPI =""
             let PIBASICVALUE=""
             let PITOTALVALUE =""
             let CONFIRMPIBASICVALUE =""
             let CONFIRMPITOTALVALUE =""
             let ADVPIAMT =""
             let COLLECTIONOFPI =""
             let  CONFIRMPISQM =""
             let  DISPATCHPISQM =""
             let  BILLTO_PNAME =""
             let  ACC_REP =""
             let  HO_REP=""
             let  PDCCOLLECTION =""
             let  INVOICECOLLECTION =""
             let  DISPATCHPIVALUE =""
             let  POBASICAMT =""
             let  PURCHASEVALUE =""
             let  REJECTIONSQM =""
             let  REJECTIONVALUE =""
             let  PROJREFNO =""
             let  PROJWINDTSTR =""
             let  PROJ_WIN_DT =""
             let  WIPQTY =""
             let  RFDQTY =""
             let ProcoreStatus = "";
             let BadDebt = 0;
             let  StatusCs = "";
             let  ShortClose = "";
             let  Sales = "";
             let  CreditNote = "";
             let  DebitNote = "";
             let  WriteOff = "";
             let  DispatchValue = "";
             let  RFDValue = "";
             let  WIPValue = "";
             let ExpenseArray = []
             let ARCHITECT_EXPENSES = 0
             let COMMISSION_EXPENSE = 0
             let COMMISSION_ON_SALESB = 0
             let CONTRACT_LABOUR_CHARGES = 0
             let FREIGHT_EXPENSE_ON_SALE = 0
             let ONSITE_EXPENSES = 0
             let PERFORMANCE_BONUS = 0
             let SOCIAL_FEE = 0
             let SOCIAL_FEEB = 0
             let TRAVELLING_AND_CONVEYANCE_EXPENSES = 0
             let ProcorePresent = "NO";
             let CSPresent = "NO";
             let ArchitectFirm = ""

             ArchProList.map((item)=>{

              if(item.OrderNo===OrderProjectRefNo)
              {
                ArchitectFirm = item.ArchitectFirm
              }

             })


             this.procoreProjects.map((item)=>{
           
             let ProcoreRefNo ="";

             if(item.project_number.includes("/V-"))
             {
              ProcoreRefNo = item.project_number.toString().split("/V-")[0]
             }
             if(!item.project_number.includes("/V-"))
             {
              ProcoreRefNo = item.project_number
             }


             if(OrderProjectRefNo===ProcoreRefNo)
             {
              ProcoreStatus = item.project_stage.name
              ProcorePresent = "YES"
             }
      


             })

            
                  

             let TotalExpenditure = 0;     

             CSData.map((item)=>{

              if(OrderProjectRefNo===item.PROJREFNO)
              {

               
                 CSPresent = "YES"
                 PROJECTNAME =item.PROJECTNAME
                 PR_DT =item.PR_DT
                 PROJECTTYPE =item.PROJECTTYPE
                 JT =item.JT
                 PROSTDATE =item.PROSTDATE
                 PROENDDATE =item.PROENDDATE
                 PROJECTSQM =item.PROJECTSQM
                 PROJECTVALUE =item.PROJECTVALUE
                 EXPENDITURE =item.EXPENDITURE
                 PIR_ID =item.PIR_ID
                 NOOBPI =item.NOOBPI
                 PIBASICVALUE=item.PIBASICVALUE
                 PITOTALVALUE =item.PITOTALVALUE
                 CONFIRMPIBASICVALUE =item.CONFIRMPIBASICVALUE
                 CONFIRMPITOTALVALUE =item.CONFIRMPITOTALVALUE
                 ADVPIAMT =item.ADVPIAMT
                 COLLECTIONOFPI =item.COLLECTIONOFPI
                  CONFIRMPISQM =item.CONFIRMPISQM
                  DISPATCHPISQM =item.DISPATCHPISQM
                  BILLTO_PNAME =item.BILLTO_PNAME
                  ACC_REP =item.ACC_REP
                  HO_REP=item.HO_REP
                  PDCCOLLECTION =item.PDCCOLLECTION
                  INVOICECOLLECTION =item.INVOICECOLLECTION
                  DISPATCHPIVALUE =item.DISPATCHPIVALUE
                  POBASICAMT =item.POBASICAMT
                  PURCHASEVALUE =item.PURCHASEVALUE
                  REJECTIONSQM =item.REJECTIONSQM
                  REJECTIONVALUE =item.REJECTIONVALUE
                  PROJREFNO =item.PROJREFNO
                  PROJWINDTSTR =item.PROJWINDTSTR
                  PROJ_WIN_DT =item.PROJ_WIN_DT
                  WIPQTY =item.WIPQTY
                  RFDQTY =item.RFDQTY
                  StatusCs = item.status;
                  ShortClose = item.Short_close;
                  Sales = item.sales;
                  CreditNote = item.credit_note;
                  DebitNote = item.debit_note;
                  WriteOff = item.wriite_off;
                  DispatchValue = item.DISPATCH_VALUE;
                  RFDValue = item.rfd_value;
                  WIPValue = item.wip_value;
                  

                  if(item.EXPENDITURE)
                  {
                    ExpenseArray = item.EXPENDITURE.split(",")
                  }

                  if(ExpenseArray.length>0)
                  {
                    for(var i =0; i<ExpenseArray.length;i++)
                    {
                      let Field = ExpenseArray[i].split("~")[0]
                      if(Field==="ARCHITECT EXPENSES")
                      {
                        ARCHITECT_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION EXPENSE")
                      {
                        COMMISSION_EXPENSE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION ON SALES-B")
                      {
                        COMMISSION_ON_SALESB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="CONTRACT LABOUR CHARGES")
                      {
                        CONTRACT_LABOUR_CHARGES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                      {
                        FREIGHT_EXPENSE_ON_SALE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="ONSITE EXPENSES")
                      {
                        ONSITE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="PERFORMANCE BONUS")
                      {
                        PERFORMANCE_BONUS = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE")
                      {
                        SOCIAL_FEE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE - B")
                      {
                        SOCIAL_FEEB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                      {
                        TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }



                    }

                    TotalExpenditure = Number(ARCHITECT_EXPENSES) + Number(COMMISSION_EXPENSE) + Number(COMMISSION_ON_SALESB) + Number(CONTRACT_LABOUR_CHARGES) + Number(FREIGHT_EXPENSE_ON_SALE) + Number(ONSITE_EXPENSES) + Number(PERFORMANCE_BONUS) + Number(SOCIAL_FEE) + Number(SOCIAL_FEEB) + Number(TRAVELLING_AND_CONVEYANCE_EXPENSES)

                  }

                
        
              }

             })
             


             this.ledgerdetails.map((item)=>{

              let LedRefno = ""
              

              
              if(item.OrderNumber.includes("/V-"))
              {
               let hyphen = item.OrderNumber.lastIndexOf("/V-");
               let tempproref = item.OrderNumber.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               LedRefno = proref
              }
       
             if(!item.OrderNumber.includes("/V-"))
             {
               let slash = item.OrderNumber.lastIndexOf("/");
               let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
               LedRefno = proref
             }

             if(LedRefno===OrderProjectRefNo)
             {
              Plan = item.ProPlus
             }
             if(LedRefno===OrderProjectRefNo)
             {
              if(item.ProPlusCost)
              {
                PlanValue = item.ProPlusCost
              }
             
             }

             })
            


             this.commercialwins.map((item)=>{
              let CommRefNo = ""
              
                if(item.OrderNo.includes("/V-"))
                {
                 let hyphen = item.OrderNo.lastIndexOf("/V-");
                 let tempproref = item.OrderNo.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 CommRefNo = proref
                }
         
               if(!item.OrderNo.includes("/V-"))
               {
                 let slash = item.OrderNo.lastIndexOf("/");
                 let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
                 CommRefNo = proref
               }
                
               if(CommRefNo===OrderProjectRefNo)
               {
                CommercialWinDate = this.orders[j].CommercialWinDate
                CommercialWinAmount = item.Amount
                CommercialWinPercent = item.Percent
                CommercialType = item.Type
                CommercialRemark = item.Remark

               }

             })




             this.handovers.map((item)=>{

              let HandRefNo = ""
              
              if(item.OrderNo.includes("/V-"))
              {
               let hyphen = item.OrderNo.lastIndexOf("/V-");
               let tempproref = item.OrderNo.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               HandRefNo = proref
              }
       
             if(!item.OrderNo.includes("/V-"))
             {
               let slash = item.OrderNo.lastIndexOf("/");
               let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
               HandRefNo = proref
             }
              
             if(HandRefNo===OrderProjectRefNo)
             {
              HandoverDate = this.orders[j].HandOverDate
              Party = item.Party
              Expense = item.Expense
              ExpensePercent = item.ExpensePercent
              BadDebt = Number(item.BadDebt)           
              Outstanding = (Number(item.OutStanding)-Number(item.BadDebt))
              Billed = item.Billed
              SpecialDiscount = item.SpecialDiscount
              ReceiptAdvance = item.ReceiptAdvance
              ChequeRequired = item.ChequeRequired
              Type = item.ChequeRequired
              Remark = item.Remark
            
             }


             })



               var temp56 = {
                "OrderType": this.orders[j].OrderType,
                "WaltzOrderNo":this.orders[j].WaltzOrderNo,
                "OrderNumber" : this.orders[j].OrderNo,
              "CreationDate" : this.orders[j].CreationDate,
              "EditDate" : this.orders[j].EditDate,
              "WinDate" : this.orders[j].WinDate,
              "ProjectName" : this.orders[j].ProjectName,
              "ClientName" : this.orders[j].ClientName,
              "Location" : this.orders[j].Location,
              "ArchitectName" : this.orders[j].Architect,
              "GrandTotal" : this.orders[j].GrandTotal,
              "Discount" : this.orders[j].Discount,
              "FinalAmount" : this.orders[j].FinalAmount,
              "TotalSolutions" : this.orders[j].Solutions.length,
              "WaltzAssociate" : this.orders[j].Associate,
              "Source" : this.orders[j].Source,
              "Status" : this.orders[j].Status,
              "TotalSquarefeet" : this.orders[j].TotalSquareFeet,
              "CSValue" : CSValue,
              "DealerDiscount" : DealerDiscount,
              "Plan" : Plan,
              "PlanValue" : PlanValue,
              "CommercialWinDate":CommercialWinDate,
              "CommercialWinAmount":CommercialWinAmount,
              "CommercialWinPercent":CommercialWinPercent,
              "CommercialType":CommercialType,
              "CommercialRemark": CommercialRemark,
              "HandoverDate":HandoverDate,
              "Party": Party,
              "Expense": Expense,
              "ExpensePercent": ExpensePercent,
              "Outstanding" : Outstanding,
              "Billed" : Billed,
              "SpecialDiscount": SpecialDiscount,
              "BadDebt" : BadDebt,
              "ReceiptAdvance": ReceiptAdvance,
              "ChequeRequired": ChequeRequired,
              "Type": Type,
              "Remark": Remark,
              "ProcoreProjectStatus" : ProcoreStatus,
              "ArchitectFirm" : ArchitectFirm,
              "PROJECTNAME": PROJECTNAME,
              "PR_DT": PR_DT,
              "PROJECTTYPE": PROJECTTYPE,
              "JT": JT,
              "PROSTDATE": PROSTDATE,
              "PROENDDATE": PROENDDATE,
              "PROJECTSQM": PROJECTSQM,
              "PROJECTVALUE": PROJECTVALUE,
              "EXPENDITURE": EXPENDITURE,
              "PIR_ID": PIR_ID,
              "NOOBPI": NOOBPI,
              "PIBASICVALUE": PIBASICVALUE,
              "PITOTALVALUE": PITOTALVALUE,
              "CONFIRMPIBASICVALUE": CONFIRMPIBASICVALUE,
              "CONFIRMPITOTALVALUE": CONFIRMPITOTALVALUE,
              "ADVPIAMT": ADVPIAMT,
              "COLLECTIONOFPI": COLLECTIONOFPI,
              "CONFIRMPISQM": CONFIRMPISQM,
              "DISPATCHPISQM": DISPATCHPISQM,
              "BILLTO_PNAME": BILLTO_PNAME,
              "ACC_REP": ACC_REP,
              "HO_REP": HO_REP,
              "PDCCOLLECTION": PDCCOLLECTION,
              "INVOICECOLLECTION": INVOICECOLLECTION,
              "DISPATCHPIVALUE": DISPATCHPIVALUE,
              "POBASICAMT": POBASICAMT,
              "PURCHASEVALUE": PURCHASEVALUE,
              "REJECTIONSQM": REJECTIONSQM,
              "REJECTIONVALUE": REJECTIONVALUE,
              "PROJREFNO": PROJREFNO,
              "PROJWINDTSTR": PROJWINDTSTR,
              "PROJ_WIN_DT": PROJ_WIN_DT,
              "WIPQTY": WIPQTY,
              "RFDQTY": RFDQTY,
              "CSSTATUS" : StatusCs,
              "SHORT CLOSE" : ShortClose,
              "SALES" : Sales,
              "CREDIT NOTE" : CreditNote,
              "DEBIT NOTE" : DebitNote,
              "WRITE OFF":  WriteOff,
              "DISPATCH VALUE": DispatchValue,
              "RFD VALUE" : RFDValue,
              "WIP VALUE" : WIPValue,
              "ARCHITECT_EXPENSES" :ARCHITECT_EXPENSES,
              "COMMISSION_EXPENSE" :COMMISSION_EXPENSE,
              "COMMISSION_ON_SALESB": COMMISSION_ON_SALESB,
              "CONTRACT_LABOUR_CHARGES":CONTRACT_LABOUR_CHARGES,
              "FREIGHT_EXPENSE_ON_SALE" : FREIGHT_EXPENSE_ON_SALE,
              "ONSITE_EXPENSES":ONSITE_EXPENSES,
              "PERFORMANCE_BONUS":PERFORMANCE_BONUS,
              "SOCIAL_FEE" : SOCIAL_FEE,
              "SOCIAL_FEEB" : SOCIAL_FEEB,
              "TRAVELLING_AND_CONVEYANCE_EXPENSES" : TRAVELLING_AND_CONVEYANCE_EXPENSES,
              "TOTAL EXPENDITURE" : TotalExpenditure,
              "PROCOREPRESENT": ProcorePresent,
              "CSPRESENT" : CSPresent
              }

              FilteredOrders.push(temp56)

            }

          }

        }

      }
   
      if(Statuses==="Commercial Hold")
      {
        for(var j = 0 ; j < this.orders.length ; j ++)
        {

          if(this.orders[j].Status ==="Commercial Hold" )
          {

            var WinDate = Number(this.orders[j].WinDate.split('-')[0])
            var WinMonth = Number(this.orders[j].WinDate.split('-')[1])
            var WinYear = Number(this.orders[j].WinDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
            
            var winDatetest = new Date(DateFormat)
            winDatetest.setHours(0);
            winDatetest.setMinutes(0);
            winDatetest.setSeconds(0);
            winDatetest.setMilliseconds(0);

            if(winDatetest>=From&&winDatetest<=To&&this.orders[j].Status==="Commercial Hold")
            {

              let OrderProjectRefNo = ""

              if(this.orders[j].OrderNo.includes("/V-"))
              {
               let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
               let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               OrderProjectRefNo = proref
              }
           
              if(!this.orders[j].OrderNo.includes("/V-"))
              {
               let slash = this.orders[j].OrderNo.lastIndexOf("/");
               let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
               OrderProjectRefNo = proref
              }
           
              
 

 
               let CommercialWinDate = ""
               let CommercialWinAmount = ""
               let CommercialWinPercent = ""
               let CommercialType = ""
               let HandoverDate = ""
               let CommercialRemark = ""
               let Party = ""
               let Expense = ""
               let ExpensePercent = ""
               let Outstanding = ""
               let Billed = ""
               let SpecialDiscount = ""
               let ReceiptAdvance = ""
               let ChequeRequired = ""
               let Type = ""
               let Remark = ""
               let Plan = ""
               let PlanValue = "";

               let DealerDiscount = '';

               let Expenditure = "";
               let PROJECTNAME =""
               let PR_DT =""
               let PROJECTTYPE =""
               let JT =""
               let PROSTDATE =""
               let PROENDDATE =""
               let PROJECTSQM =""
               let PROJECTVALUE =""
               let EXPENDITURE =""
               let PIR_ID =""
               let NOOBPI =""
               let PIBASICVALUE=""
               let PITOTALVALUE =""
               let CONFIRMPIBASICVALUE =""
               let CONFIRMPITOTALVALUE =""
               let ADVPIAMT =""
               let COLLECTIONOFPI =""
               let  CONFIRMPISQM =""
               let  DISPATCHPISQM =""
               let  BILLTO_PNAME =""
               let  ACC_REP =""
               let  HO_REP=""
               let  PDCCOLLECTION =""
               let  INVOICECOLLECTION =""
               let  DISPATCHPIVALUE =""
               let  POBASICAMT =""
               let  PURCHASEVALUE =""
               let  REJECTIONSQM =""
               let  REJECTIONVALUE =""
               let  PROJREFNO =""
               let  PROJWINDTSTR =""
               let  PROJ_WIN_DT =""
               let  WIPQTY =""
               let  RFDQTY =""
               let ProcoreStatus = "";

               let  StatusCs = "";
               let  ShortClose = "";
               let  Sales = "";
               let  CreditNote = "";
               let  DebitNote = "";
               let  WriteOff = "";
               let  DispatchValue = "";
               let  RFDValue = "";
               let  WIPValue = "";
               let ExpenseArray = []
               let ARCHITECT_EXPENSES = 0
               let COMMISSION_EXPENSE = 0
               let COMMISSION_ON_SALESB = 0
               let CONTRACT_LABOUR_CHARGES = 0
               let FREIGHT_EXPENSE_ON_SALE = 0
               let ONSITE_EXPENSES = 0
               let PERFORMANCE_BONUS = 0
               let SOCIAL_FEE = 0
               let SOCIAL_FEEB = 0
               let TRAVELLING_AND_CONVEYANCE_EXPENSES = 0
               let ProcorePresent = "NO";
               let CSPresent = "NO";
               let ArchitectFirm = ""

               ArchProList.map((item)=>{
  
                if(item.OrderNo===OrderProjectRefNo)
                {
                  ArchitectFirm = item.ArchitectFirm
                }
  
               })


               this.procoreProjects.map((item)=>{
             
               let ProcoreRefNo ="";

               if(item.project_number.includes("/V-"))
               {
                ProcoreRefNo = item.project_number.toString().split("/V-")[0]
               }
               if(!item.project_number.includes("/V-"))
               {
                ProcoreRefNo = item.project_number
               }


               if(OrderProjectRefNo===ProcoreRefNo)
               {
                ProcoreStatus = item.project_stage.name
                ProcorePresent = "YES"
               }
        


               })


              
               
            
           

               let TotalExpenditure = 0;     

             CSData.map((item)=>{

              if(OrderProjectRefNo===item.PROJREFNO)
              {

               
                 CSPresent = "YES"
                 PROJECTNAME =item.PROJECTNAME
                 PR_DT =item.PR_DT
                 PROJECTTYPE =item.PROJECTTYPE
                 JT =item.JT
                 PROSTDATE =item.PROSTDATE
                 PROENDDATE =item.PROENDDATE
                 PROJECTSQM =item.PROJECTSQM
                 PROJECTVALUE =item.PROJECTVALUE
                 EXPENDITURE =item.EXPENDITURE
                 PIR_ID =item.PIR_ID
                 NOOBPI =item.NOOBPI
                 PIBASICVALUE=item.PIBASICVALUE
                 PITOTALVALUE =item.PITOTALVALUE
                 CONFIRMPIBASICVALUE =item.CONFIRMPIBASICVALUE
                 CONFIRMPITOTALVALUE =item.CONFIRMPITOTALVALUE
                 ADVPIAMT =item.ADVPIAMT
                 COLLECTIONOFPI =item.COLLECTIONOFPI
                  CONFIRMPISQM =item.CONFIRMPISQM
                  DISPATCHPISQM =item.DISPATCHPISQM
                  BILLTO_PNAME =item.BILLTO_PNAME
                  ACC_REP =item.ACC_REP
                  HO_REP=item.HO_REP
                  PDCCOLLECTION =item.PDCCOLLECTION
                  INVOICECOLLECTION =item.INVOICECOLLECTION
                  DISPATCHPIVALUE =item.DISPATCHPIVALUE
                  POBASICAMT =item.POBASICAMT
                  PURCHASEVALUE =item.PURCHASEVALUE
                  REJECTIONSQM =item.REJECTIONSQM
                  REJECTIONVALUE =item.REJECTIONVALUE
                  PROJREFNO =item.PROJREFNO
                  PROJWINDTSTR =item.PROJWINDTSTR
                  PROJ_WIN_DT =item.PROJ_WIN_DT
                  WIPQTY =item.WIPQTY
                  RFDQTY =item.RFDQTY
                  StatusCs = item.status;
                  ShortClose = item.Short_close;
                  Sales = item.sales;
                  CreditNote = item.credit_note;
                  DebitNote = item.debit_note;
                  WriteOff = item.wriite_off;
                  DispatchValue = item.DISPATCH_VALUE;
                  RFDValue = item.rfd_value;
                  WIPValue = item.wip_value;
                  

                  if(item.EXPENDITURE)
                  {
                    ExpenseArray = item.EXPENDITURE.split(",")
                  }

                  if(ExpenseArray.length>0)
                  {
                    for(var i =0; i<ExpenseArray.length;i++)
                    {
                      let Field = ExpenseArray[i].split("~")[0]
                      if(Field==="ARCHITECT EXPENSES")
                      {
                        ARCHITECT_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION EXPENSE")
                      {
                        COMMISSION_EXPENSE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION ON SALES-B")
                      {
                        COMMISSION_ON_SALESB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="CONTRACT LABOUR CHARGES")
                      {
                        CONTRACT_LABOUR_CHARGES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                      {
                        FREIGHT_EXPENSE_ON_SALE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="ONSITE EXPENSES")
                      {
                        ONSITE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="PERFORMANCE BONUS")
                      {
                        PERFORMANCE_BONUS = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE")
                      {
                        SOCIAL_FEE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE - B")
                      {
                        SOCIAL_FEEB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                      {
                        TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }



                    }

                    TotalExpenditure = Number(ARCHITECT_EXPENSES) + Number(COMMISSION_EXPENSE) + Number(COMMISSION_ON_SALESB) + Number(CONTRACT_LABOUR_CHARGES) + Number(FREIGHT_EXPENSE_ON_SALE) + Number(ONSITE_EXPENSES) + Number(PERFORMANCE_BONUS) + Number(SOCIAL_FEE) + Number(SOCIAL_FEEB) + Number(TRAVELLING_AND_CONVEYANCE_EXPENSES)

                  }

                
        
              }

             })

               this.users.map((item)=>{
                 if(item.UserFullName===this.orders[j].Associate)
                 {
                   DealerDiscount = item.DealerDiscount
                 }
               })

               this.specialrequests.map((item)=>{
                if(item.OrderNo===OrderProjectRefNo)
                {
                  DealerDiscount = item.NewDealerDiscount
                }
              })


               this.ledgerdetails.map((item)=>{

                let LedRefno = ""

                
                if(item.OrderNumber.includes("/V-"))
                {
                 let hyphen = item.OrderNumber.lastIndexOf("/V-");
                 let tempproref = item.OrderNumber.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 LedRefno = proref
                }
         
               if(!item.OrderNumber.includes("/V-"))
               {
                 let slash = item.OrderNumber.lastIndexOf("/");
                 let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
                 LedRefno = proref
               }

               if(LedRefno===OrderProjectRefNo)
               {
                Plan = item.ProPlus
               }
               if(LedRefno===OrderProjectRefNo)
               {
                if(item.ProPlusCost)
                {
                  PlanValue = item.ProPlusCost
                }
               }

               })

               let CSValue = "";

               if(DealerDiscount!=="0")
               {
                CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
               }
               if(DealerDiscount==="0")
               {
                 CSValue = this.orders[j].FinalAmount
               }
              
              
 
 
             


               var temp5 = {
                "OrderType": this.orders[j].OrderType,
                "WaltzOrderNo":this.orders[j].WaltzOrderNo,
                "OrderNumber" : this.orders[j].OrderNo,
                "CreationDate" : this.orders[j].CreationDate,
                "EditDate" : this.orders[j].EditDate,
                "WinDate" : this.orders[j].WinDate,
                "ProjectName" : this.orders[j].ProjectName,
                "ClientName" : this.orders[j].ClientName,
                "Location" : this.orders[j].Location,
                "ArchitectName" : this.orders[j].Architect,
                "GrandTotal" : this.orders[j].GrandTotal,
                "Discount" : this.orders[j].Discount,
                "FinalAmount" : this.orders[j].FinalAmount,
                "TotalSolutions" : this.orders[j].Solutions.length,
                "WaltzAssociate" : this.orders[j].Associate,
                "Source" : this.orders[j].Source,
                "Status" : this.orders[j].Status,
                "TotalSquarefeet" : this.orders[j].TotalSquareFeet,
                "CSValue" : CSValue,
                "DealerDiscount" : DealerDiscount,
                "Plan" : Plan,
                "PlanValue" : PlanValue,
                "CommercialWinDate": "",
                "CommercialWinAmount": "",
                "CommercialWinPercent": "",
                "CommercialType": "",
                "CommercialRemark": "",
                "HandoverDate":"",
                "Party": "",
                "Expense": "",
                "ExpensePercent": "",
                "Outstanding" : "",
                "Billed" : "",
                "SpecialDiscount": "",
                "BadDebt" : "",
                "ReceiptAdvance": "",
                "ChequeRequired": "",
                "Type": "",
                "Remark": "",
                "ProcoreProjectStatus" : ProcoreStatus,
                "ArchitectFirm" : ArchitectFirm,
                "PROJECTNAME": PROJECTNAME,
                "PR_DT": PR_DT,
                "PROJECTTYPE": PROJECTTYPE,
                "JT": JT,
                "PROSTDATE": PROSTDATE,
                "PROENDDATE": PROENDDATE,
                "PROJECTSQM": PROJECTSQM,
                "PROJECTVALUE": PROJECTVALUE,
                "EXPENDITURE": EXPENDITURE,
                "PIR_ID": PIR_ID,
                "NOOBPI": NOOBPI,
                "PIBASICVALUE": PIBASICVALUE,
                "PITOTALVALUE": PITOTALVALUE,
                "CONFIRMPIBASICVALUE": CONFIRMPIBASICVALUE,
                "CONFIRMPITOTALVALUE": CONFIRMPITOTALVALUE,
                "ADVPIAMT": ADVPIAMT,
                "COLLECTIONOFPI": COLLECTIONOFPI,
                "CONFIRMPISQM": CONFIRMPISQM,
                "DISPATCHPISQM": DISPATCHPISQM,
                "BILLTO_PNAME": BILLTO_PNAME,
                "ACC_REP": ACC_REP,
                "HO_REP": HO_REP,
                "PDCCOLLECTION": PDCCOLLECTION,
                "INVOICECOLLECTION": INVOICECOLLECTION,
                "DISPATCHPIVALUE": DISPATCHPIVALUE,
                "POBASICAMT": POBASICAMT,
                "PURCHASEVALUE": PURCHASEVALUE,
                "REJECTIONSQM": REJECTIONSQM,
                "REJECTIONVALUE": REJECTIONVALUE,
                "PROJREFNO": PROJREFNO,
                "PROJWINDTSTR": PROJWINDTSTR,
                "PROJ_WIN_DT": PROJ_WIN_DT,
                "WIPQTY": WIPQTY,
                "RFDQTY": RFDQTY,
                "CSSTATUS" : StatusCs,
                "SHORT CLOSE" : ShortClose,
                "SALES" : Sales,
                "CREDIT NOTE" : CreditNote,
                "DEBIT NOTE" : DebitNote,
                "WRITE OFF":  WriteOff,
                "DISPATCH VALUE": DispatchValue,
                "RFD VALUE" : RFDValue,
                "WIP VALUE" : WIPValue,
                "ARCHITECT_EXPENSES" :ARCHITECT_EXPENSES,
                "COMMISSION_EXPENSE" :COMMISSION_EXPENSE,
                "COMMISSION_ON_SALESB": COMMISSION_ON_SALESB,
                "CONTRACT_LABOUR_CHARGES":CONTRACT_LABOUR_CHARGES,
                "FREIGHT_EXPENSE_ON_SALE" : FREIGHT_EXPENSE_ON_SALE,
                "ONSITE_EXPENSES":ONSITE_EXPENSES,
                "PERFORMANCE_BONUS":PERFORMANCE_BONUS,
                "SOCIAL_FEE" : SOCIAL_FEE,
                "SOCIAL_FEEB" : SOCIAL_FEEB,
                "TRAVELLING_AND_CONVEYANCE_EXPENSES" : TRAVELLING_AND_CONVEYANCE_EXPENSES,
                "TOTAL EXPENDITURE" : TotalExpenditure,
                "PROCOREPRESENT": ProcorePresent,
                "CSPRESENT" : CSPresent
 
              }

              FilteredOrders.push(temp5)

            }

          }

        }

      }

      if(Statuses==="Handover")
      {
        for(var j = 0 ; j < this.orders.length ; j ++)
        {

          if(this.orders[j].HandOverDate)
          {

            var WinDate = Number(this.orders[j].HandOverDate.split('-')[0])
            var WinMonth = Number(this.orders[j].HandOverDate.split('-')[1])
            var WinYear = Number(this.orders[j].HandOverDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
            
            var winDatetest = new Date(DateFormat)
            
            winDatetest.setHours(0);
            winDatetest.setMinutes(0);
            winDatetest.setSeconds(0);
            winDatetest.setMilliseconds(0);
 

            if(winDatetest>=From&&winDatetest<=To)
            {

              let OrderProjectRefNo = ""

              if(this.orders[j].OrderNo.includes("/V-"))
              {
               let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
               let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               OrderProjectRefNo = proref
              }
           
              if(!this.orders[j].OrderNo.includes("/V-"))
              {
               let slash = this.orders[j].OrderNo.lastIndexOf("/");
               let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
               OrderProjectRefNo = proref
              }
           
              
              let DealerDiscount = '';

              this.users.map((item)=>{
                if(item.UserFullName===this.orders[j].Associate)
                {
                  DealerDiscount = item.DealerDiscount
                }
              })


              this.specialrequests.map((item)=>{
                if(item.OrderNo===OrderProjectRefNo)
                {
                  DealerDiscount = item.NewDealerDiscount
                }
              })
 
               let CommercialWinDate = this.orders[j].CommercialWinDate
               let CommercialWinAmount = ""
               let CommercialWinPercent = ""
               let CommercialType = ""
               let HandoverDate = ""
               let CommercialRemark = ""
               let Party = ""
               let Expense = ""
               let ExpensePercent = ""
               let Outstanding = ""
               let Billed = ""
               let SpecialDiscount = ""
               let ReceiptAdvance = ""
               let ChequeRequired = ""
               let Type = ""
               let Remark = ""
               let Plan = ""
               let PlanValue = "";
               let BadDebt = 0;
               
               let PROJECTNAME =""
               let PR_DT =""
               let PROJECTTYPE =""
               let JT =""
               let PROSTDATE =""
               let PROENDDATE =""
               let PROJECTSQM =""
               let PROJECTVALUE =""
               let EXPENDITURE =""
               let PIR_ID =""
               let NOOBPI =""
               let PIBASICVALUE=""
               let PITOTALVALUE =""
               let CONFIRMPIBASICVALUE =""
               let CONFIRMPITOTALVALUE =""
               let ADVPIAMT =""
               let COLLECTIONOFPI =""
               let  CONFIRMPISQM =""
               let  DISPATCHPISQM =""
               let  BILLTO_PNAME =""
               let  ACC_REP =""
               let  HO_REP=""
               let  PDCCOLLECTION =""
               let  INVOICECOLLECTION =""
               let  DISPATCHPIVALUE =""
               let  POBASICAMT =""
               let  PURCHASEVALUE =""
               let  REJECTIONSQM =""
               let  REJECTIONVALUE =""
               let  PROJREFNO =""
               let  PROJWINDTSTR =""
               let  PROJ_WIN_DT =""
               let  WIPQTY =""
               let  RFDQTY =""
               let ProcoreStatus = "";
               let  StatusCs = "";
               let  ShortClose = "";
               let  Sales = "";
               let  CreditNote = "";
               let  DebitNote = "";
               let  WriteOff = "";
               let  DispatchValue = "";
               let  RFDValue = "";
               let  WIPValue = "";
               let ExpenseArray = []
               let ARCHITECT_EXPENSES = 0
               let COMMISSION_EXPENSE = 0
               let COMMISSION_ON_SALESB = 0
               let CONTRACT_LABOUR_CHARGES = 0
               let FREIGHT_EXPENSE_ON_SALE = 0
               let ONSITE_EXPENSES = 0
               let PERFORMANCE_BONUS = 0
               let SOCIAL_FEE = 0
               let SOCIAL_FEEB = 0
               let TRAVELLING_AND_CONVEYANCE_EXPENSES = 0;
               let ProcorePresent = "NO";
               let CSPresent = "NO";
               let ArchitectFirm = ""

               ArchProList.map((item)=>{
  
                if(item.OrderNo===OrderProjectRefNo)
                {
                  ArchitectFirm = item.ArchitectFirm
                }
  
               })


               this.procoreProjects.map((item)=>{
             
               let ProcoreRefNo ="";

               if(item.project_number.includes("/V-"))
               {
                ProcoreRefNo = item.project_number.toString().split("/V-")[0]
               }
               if(!item.project_number.includes("/V-"))
               {
                ProcoreRefNo = item.project_number
               }


               if(OrderProjectRefNo===ProcoreRefNo)
               {
                ProcorePresent = "YES"
                ProcoreStatus = item.project_stage.name
               }
        


               })


              
               
            
           

               let TotalExpenditure = 0;     

               CSData.map((item)=>{
  
                if(OrderProjectRefNo===item.PROJREFNO)
                {
  
                 
                   CSPresent = "YES"
                   PROJECTNAME =item.PROJECTNAME
                   PR_DT =item.PR_DT
                   PROJECTTYPE =item.PROJECTTYPE
                   JT =item.JT
                   PROSTDATE =item.PROSTDATE
                   PROENDDATE =item.PROENDDATE
                   PROJECTSQM =item.PROJECTSQM
                   PROJECTVALUE =item.PROJECTVALUE
                   EXPENDITURE =item.EXPENDITURE
                   PIR_ID =item.PIR_ID
                   NOOBPI =item.NOOBPI
                   PIBASICVALUE=item.PIBASICVALUE
                   PITOTALVALUE =item.PITOTALVALUE
                   CONFIRMPIBASICVALUE =item.CONFIRMPIBASICVALUE
                   CONFIRMPITOTALVALUE =item.CONFIRMPITOTALVALUE
                   ADVPIAMT =item.ADVPIAMT
                   COLLECTIONOFPI =item.COLLECTIONOFPI
                    CONFIRMPISQM =item.CONFIRMPISQM
                    DISPATCHPISQM =item.DISPATCHPISQM
                    BILLTO_PNAME =item.BILLTO_PNAME
                    ACC_REP =item.ACC_REP
                    HO_REP=item.HO_REP
                    PDCCOLLECTION =item.PDCCOLLECTION
                    INVOICECOLLECTION =item.INVOICECOLLECTION
                    DISPATCHPIVALUE =item.DISPATCHPIVALUE
                    POBASICAMT =item.POBASICAMT
                    PURCHASEVALUE =item.PURCHASEVALUE
                    REJECTIONSQM =item.REJECTIONSQM
                    REJECTIONVALUE =item.REJECTIONVALUE
                    PROJREFNO =item.PROJREFNO
                    PROJWINDTSTR =item.PROJWINDTSTR
                    PROJ_WIN_DT =item.PROJ_WIN_DT
                    WIPQTY =item.WIPQTY
                    RFDQTY =item.RFDQTY
                    StatusCs = item.status;
                    ShortClose = item.Short_close;
                    Sales = item.sales;
                    CreditNote = item.credit_note;
                    DebitNote = item.debit_note;
                    WriteOff = item.wriite_off;
                    DispatchValue = item.DISPATCH_VALUE;
                    RFDValue = item.rfd_value;
                    WIPValue = item.wip_value;
                    
  
                    if(item.EXPENDITURE)
                    {
                      ExpenseArray = item.EXPENDITURE.split(",")
                    }
  
                    if(ExpenseArray.length>0)
                    {
                      for(var i =0; i<ExpenseArray.length;i++)
                      {
                        let Field = ExpenseArray[i].split("~")[0]
                        if(Field==="ARCHITECT EXPENSES")
                        {
                          ARCHITECT_EXPENSES = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="COMMISSION EXPENSE")
                        {
                          COMMISSION_EXPENSE = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="COMMISSION ON SALES-B")
                        {
                          COMMISSION_ON_SALESB = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="CONTRACT LABOUR CHARGES")
                        {
                          CONTRACT_LABOUR_CHARGES = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                        {
                          FREIGHT_EXPENSE_ON_SALE = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="ONSITE EXPENSES")
                        {
                          ONSITE_EXPENSES = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="PERFORMANCE BONUS")
                        {
                          PERFORMANCE_BONUS = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="SOCIAL FEE")
                        {
                          SOCIAL_FEE = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="SOCIAL FEE - B")
                        {
                          SOCIAL_FEEB = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                        {
                          TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[i].split("~")[1]
                        }
  
  
  
                      }
  
                      TotalExpenditure = Number(ARCHITECT_EXPENSES) + Number(COMMISSION_EXPENSE) + Number(COMMISSION_ON_SALESB) + Number(CONTRACT_LABOUR_CHARGES) + Number(FREIGHT_EXPENSE_ON_SALE) + Number(ONSITE_EXPENSES) + Number(PERFORMANCE_BONUS) + Number(SOCIAL_FEE) + Number(SOCIAL_FEEB) + Number(TRAVELLING_AND_CONVEYANCE_EXPENSES)
  
                    }
  
                  
          
                }
  
               })

               this.ledgerdetails.map((item)=>{

                let LedRefno = ""

                
                if(item.OrderNumber.includes("/V-"))
                {
                 let hyphen = item.OrderNumber.lastIndexOf("/V-");
                 let tempproref = item.OrderNumber.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 LedRefno = proref
                }
         
               if(!item.OrderNumber.includes("/V-"))
               {
                 let slash = item.OrderNumber.lastIndexOf("/");
                 let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
                 LedRefno = proref
               }

               if(LedRefno===OrderProjectRefNo)
               {
                Plan = item.ProPlus
               }
               if(LedRefno===OrderProjectRefNo)
               {
                if(item.ProPlusCost)
                {
                  PlanValue = item.ProPlusCost
                }
               }

               })
              
              
 
 
               this.commercialwins.map((item)=>{
                let CommRefNo = ""
                
                  if(item.OrderNo.includes("/V-"))
                  {
                   let hyphen = item.OrderNo.lastIndexOf("/V-");
                   let tempproref = item.OrderNo.substring(0, hyphen);
                   let slash = tempproref.lastIndexOf("/");
                   let proref = tempproref.substring(slash + 1, hyphen); 
                   CommRefNo = proref
                  }
           
                 if(!item.OrderNo.includes("/V-"))
                 {
                   let slash = item.OrderNo.lastIndexOf("/");
                   let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
                   CommRefNo = proref
                 }
                  
                 if(CommRefNo===OrderProjectRefNo)
                 {
                  CommercialWinDate = this.orders[j].CommercialWinDate
                  CommercialWinAmount = item.Amount
                  CommercialWinPercent = item.Percent
                  CommercialType = item.Type
                  CommercialRemark = item.Remark
 
                 }
 
               })

               this.handovers.map((item)=>{

                let HandRefNo = ""
                
                if(item.OrderNo.includes("/V-"))
                {
                 let hyphen = item.OrderNo.lastIndexOf("/V-");
                 let tempproref = item.OrderNo.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 HandRefNo = proref
                }
         
               if(!item.OrderNo.includes("/V-"))
               {
                 let slash = item.OrderNo.lastIndexOf("/");
                 let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
                 HandRefNo = proref
               }
                
               if(HandRefNo===OrderProjectRefNo)
               {
                HandoverDate = this.orders[j].HandOverDate
                Party = item.Party
                Expense = item.Expense
                ExpensePercent = item.ExpensePercent
                BadDebt = Number(item.BadDebt)           
                Outstanding = (Number(item.OutStanding)-Number(item.BadDebt)).toString()
                Billed = item.Billed
                SpecialDiscount = item.SpecialDiscount
                ReceiptAdvance = item.ReceiptAdvance
                ChequeRequired = item.ChequeRequired
                Type = item.ChequeRequired
                Remark = item.Remark
              
               }
 
 
               })

               let CSValue = "";

               if(DealerDiscount!=="0")
               {
                CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
               }
               if(DealerDiscount==="0")
               {
                 CSValue = this.orders[j].FinalAmount
               }



               var temp7 = {
                "OrderType": this.orders[j].OrderType,
                "WaltzOrderNo":this.orders[j].WaltzOrderNo,
                "OrderNumber" : this.orders[j].OrderNo,
                "CreationDate" : this.orders[j].CreationDate,
                "EditDate" : this.orders[j].EditDate,
                "WinDate" : this.orders[j].WinDate,
                "ProjectName" : this.orders[j].ProjectName,
                "ClientName" : this.orders[j].ClientName,
                "Location" : this.orders[j].Location,
                "ArchitectName" : this.orders[j].Architect,
                "GrandTotal" : this.orders[j].GrandTotal,
                "Discount" : this.orders[j].Discount,
                "FinalAmount" : this.orders[j].FinalAmount,
                "TotalSolutions" : this.orders[j].Solutions.length,
                "WaltzAssociate" : this.orders[j].Associate,
                "Source" : this.orders[j].Source,
                "Status" : this.orders[j].Status,
                "TotalSquarefeet" : this.orders[j].TotalSquareFeet,
                "CSValue" : CSValue,
                "DealerDiscount" : DealerDiscount,
                "Plan" : Plan,
                "PlanValue" : PlanValue,
                "CommercialWinDate":CommercialWinDate,
                "CommercialWinAmount":CommercialWinAmount,
                "CommercialWinPercent":CommercialWinPercent,
                "CommercialType":CommercialType,
                "CommercialRemark": CommercialRemark,
                "HandoverDate":HandoverDate,
                "Party": Party,
                "Expense": Expense,
                "ExpensePercent": ExpensePercent,
                "Outstanding" : Outstanding,
                "Billed" : Billed,
                "SpecialDiscount": SpecialDiscount,
                "BadDebt" : BadDebt,
                "ReceiptAdvance": ReceiptAdvance,
                "ChequeRequired": ChequeRequired,
                "Type": Type,
                "Remark": Remark,
                "ProcoreProjectStatus" : ProcoreStatus,
                "ArchitectFirm" : ArchitectFirm,
                "PROJECTNAME": PROJECTNAME,
                "PR_DT": PR_DT,
                "PROJECTTYPE": PROJECTTYPE,
                "JT": JT,
                "PROSTDATE": PROSTDATE,
                "PROENDDATE": PROENDDATE,
                "PROJECTSQM": PROJECTSQM,
                "PROJECTVALUE": PROJECTVALUE,
                "EXPENDITURE": EXPENDITURE,
                "PIR_ID": PIR_ID,
                "NOOBPI": NOOBPI,
                "PIBASICVALUE": PIBASICVALUE,
                "PITOTALVALUE": PITOTALVALUE,
                "CONFIRMPIBASICVALUE": CONFIRMPIBASICVALUE,
                "CONFIRMPITOTALVALUE": CONFIRMPITOTALVALUE,
                "ADVPIAMT": ADVPIAMT,
                "COLLECTIONOFPI": COLLECTIONOFPI,
                "CONFIRMPISQM": CONFIRMPISQM,
                "DISPATCHPISQM": DISPATCHPISQM,
                "BILLTO_PNAME": BILLTO_PNAME,
                "ACC_REP": ACC_REP,
                "HO_REP": HO_REP,
                "PDCCOLLECTION": PDCCOLLECTION,
                "INVOICECOLLECTION": INVOICECOLLECTION,
                "DISPATCHPIVALUE": DISPATCHPIVALUE,
                "POBASICAMT": POBASICAMT,
                "PURCHASEVALUE": PURCHASEVALUE,
                "REJECTIONSQM": REJECTIONSQM,
                "REJECTIONVALUE": REJECTIONVALUE,
                "PROJREFNO": PROJREFNO,
                "PROJWINDTSTR": PROJWINDTSTR,
                "PROJ_WIN_DT": PROJ_WIN_DT,
                "WIPQTY": WIPQTY,
                "RFDQTY": RFDQTY,
                "CSSTATUS" : StatusCs,
                "SHORT CLOSE" : ShortClose,
                "SALES" : Sales,
                "CREDIT NOTE" : CreditNote,
                "DEBIT NOTE" : DebitNote,
                "WRITE OFF":  WriteOff,
                "DISPATCH VALUE": DispatchValue,
                "RFD VALUE" : RFDValue,
                "WIP VALUE" : WIPValue,
                "ARCHITECT_EXPENSES" :ARCHITECT_EXPENSES,
                "COMMISSION_EXPENSE" :COMMISSION_EXPENSE,
                "COMMISSION_ON_SALESB": COMMISSION_ON_SALESB,
                "CONTRACT_LABOUR_CHARGES":CONTRACT_LABOUR_CHARGES,
                "FREIGHT_EXPENSE_ON_SALE" : FREIGHT_EXPENSE_ON_SALE,
                "ONSITE_EXPENSES":ONSITE_EXPENSES,
                "PERFORMANCE_BONUS":PERFORMANCE_BONUS,
                "SOCIAL_FEE" : SOCIAL_FEE,
                "SOCIAL_FEEB" : SOCIAL_FEEB,
                "TRAVELLING_AND_CONVEYANCE_EXPENSES" : TRAVELLING_AND_CONVEYANCE_EXPENSES,
                "TOTAL EXPENDITURE" : TotalExpenditure,
                "PROCOREPRESENT": ProcorePresent,
                "CSPRESENT" : CSPresent
 
              }

              FilteredOrders.push(temp7)

            }

          }

        }

      }

    }

    if(User!=="ALL")
    {
       
      if(Statuses==="Pipeline")
      {  

        for(var j = 0 ; j < this.orders.length ; j ++)
        {
          if(this.orders[j].CreationDate&&this.orders[j].Status==="Pipeline")
          {
          var EditDate = Number(this.orders[j].CreationDate.split('-')[0])
          var EditMonth = Number(this.orders[j].CreationDate.split('-')[1])
          var EditYear = Number(this.orders[j].CreationDate.split('-')[2])
          var DateFormatEdit = EditMonth+ "/" + EditDate + "/" + EditYear        
          
          var EditDateTest=new Date(DateFormatEdit)

          EditDateTest.setHours(0);
          EditDateTest.setMinutes(0);
          EditDateTest.setSeconds(0);
          EditDateTest.setMilliseconds(0);


          if(EditDateTest<=To&&EditDateTest>=From&& this.orders[j].Associate===this.form.value.User)
          {
              

            let OrderProjectRefNo = ""

            if(this.orders[j].OrderNo.includes("/V-"))
            {
             let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
             let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
             let slash = tempproref.lastIndexOf("/");
             let proref = tempproref.substring(slash + 1, hyphen); 
             OrderProjectRefNo = proref
            }
         
            if(!this.orders[j].OrderNo.includes("/V-"))
            {
             let slash = this.orders[j].OrderNo.lastIndexOf("/");
             let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
             OrderProjectRefNo = proref
            }
         
             
            let DealerDiscount = '';

            this.users.map((item)=>{
              if(item.UserFullName===this.orders[j].Associate)
              {
                DealerDiscount = item.DealerDiscount
              }
            })


            this.specialrequests.map((item)=>{
              if(item.OrderNo===OrderProjectRefNo)
              {
                DealerDiscount = item.NewDealerDiscount
              }
            })
            
            let CSValue = "";

            if(DealerDiscount!=="0")
            {
             CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
            }
            if(DealerDiscount==="0")
            {
              CSValue = this.orders[j].FinalAmount
            }


             let CommercialWinDate = this.orders[j].CommercialWinDate
             let CommercialWinAmount = ""
             let CommercialWinPercent = ""
             let CommercialType = ""
             let HandoverDate = ""
             let CommercialRemark = ""
             let Party = ""
             let Expense = ""
             let ExpensePercent = ""
             let Outstanding = ""
             let Billed = ""
             let SpecialDiscount = ""
             let ReceiptAdvance = ""
             let ChequeRequired = ""
             let Type = ""
             let Remark = ""
             let Plan = ""
             let PlanValue = "";
             let PROJECTNAME ="";
             let PR_DT =""
             let PROJECTTYPE =""
             let JT =""
             let PROSTDATE =""
             let PROENDDATE =""
             let PROJECTSQM =""
             let PROJECTVALUE =""
             let EXPENDITURE =""
             let PIR_ID =""
             let NOOBPI =""
             let PIBASICVALUE=""
             let PITOTALVALUE =""
             let CONFIRMPIBASICVALUE =""
             let CONFIRMPITOTALVALUE =""
             let ADVPIAMT =""
             let COLLECTIONOFPI =""
             let  CONFIRMPISQM =""
             let  DISPATCHPISQM =""
             let  BILLTO_PNAME =""
             let  ACC_REP =""
             let  HO_REP=""
             let  PDCCOLLECTION =""
             let  INVOICECOLLECTION =""
             let  DISPATCHPIVALUE =""
             let  POBASICAMT =""
             let  PURCHASEVALUE =""
             let  REJECTIONSQM =""
             let  REJECTIONVALUE =""
             let  PROJREFNO =""
             let  PROJWINDTSTR =""
             let  PROJ_WIN_DT =""
             let  WIPQTY =""
             let  RFDQTY =""
             let ProcoreStatus = "";
             let BadDebt = 0;
             let  StatusCs = "";
             let  ShortClose = "";
             let  Sales = "";
             let  CreditNote = "";
             let  DebitNote = "";
             let  WriteOff = "";
             let  DispatchValue = "";
             let  RFDValue = "";
             let  WIPValue = "";
             let ExpenseArray = []
             let ARCHITECT_EXPENSES = 0
             let COMMISSION_EXPENSE = 0
             let COMMISSION_ON_SALESB = 0
             let CONTRACT_LABOUR_CHARGES = 0
             let FREIGHT_EXPENSE_ON_SALE = 0
             let ONSITE_EXPENSES = 0
             let PERFORMANCE_BONUS = 0
             let SOCIAL_FEE = 0
             let SOCIAL_FEEB = 0
             let TRAVELLING_AND_CONVEYANCE_EXPENSES = 0
             let ProcorePresent = "NO";
             let CSPresent = "NO";
             let ArchitectFirm = ""

             ArchProList.map((item)=>{

              if(item.OrderNo===OrderProjectRefNo)
              {
                ArchitectFirm = item.ArchitectFirm
              }

             })
             


             this.procoreProjects.map((item)=>{
           
             let ProcoreRefNo ="";

             if(item.project_number.includes("/V-"))
             {
              ProcoreRefNo = item.project_number.toString().split("/V-")[0]
             }
             if(!item.project_number.includes("/V-"))
             {
              ProcoreRefNo = item.project_number
             }


             if(OrderProjectRefNo===ProcoreRefNo)
             {
              ProcoreStatus = item.project_stage.name
              ProcorePresent = "YES"
             }
      


             })

            
                  

             let TotalExpenditure = 0;     

             CSData.map((item)=>{

              if(OrderProjectRefNo===item.PROJREFNO)
              {

               
                 CSPresent = "YES"
                 PROJECTNAME =item.PROJECTNAME
                 PR_DT =item.PR_DT
                 PROJECTTYPE =item.PROJECTTYPE
                 JT =item.JT
                 PROSTDATE =item.PROSTDATE
                 PROENDDATE =item.PROENDDATE
                 PROJECTSQM =item.PROJECTSQM
                 PROJECTVALUE =item.PROJECTVALUE
                 EXPENDITURE =item.EXPENDITURE
                 PIR_ID =item.PIR_ID
                 NOOBPI =item.NOOBPI
                 PIBASICVALUE=item.PIBASICVALUE
                 PITOTALVALUE =item.PITOTALVALUE
                 CONFIRMPIBASICVALUE =item.CONFIRMPIBASICVALUE
                 CONFIRMPITOTALVALUE =item.CONFIRMPITOTALVALUE
                 ADVPIAMT =item.ADVPIAMT
                 COLLECTIONOFPI =item.COLLECTIONOFPI
                  CONFIRMPISQM =item.CONFIRMPISQM
                  DISPATCHPISQM =item.DISPATCHPISQM
                  BILLTO_PNAME =item.BILLTO_PNAME
                  ACC_REP =item.ACC_REP
                  HO_REP=item.HO_REP
                  PDCCOLLECTION =item.PDCCOLLECTION
                  INVOICECOLLECTION =item.INVOICECOLLECTION
                  DISPATCHPIVALUE =item.DISPATCHPIVALUE
                  POBASICAMT =item.POBASICAMT
                  PURCHASEVALUE =item.PURCHASEVALUE
                  REJECTIONSQM =item.REJECTIONSQM
                  REJECTIONVALUE =item.REJECTIONVALUE
                  PROJREFNO =item.PROJREFNO
                  PROJWINDTSTR =item.PROJWINDTSTR
                  PROJ_WIN_DT =item.PROJ_WIN_DT
                  WIPQTY =item.WIPQTY
                  RFDQTY =item.RFDQTY
                  StatusCs = item.status;
                  ShortClose = item.Short_close;
                  Sales = item.sales;
                  CreditNote = item.credit_note;
                  DebitNote = item.debit_note;
                  WriteOff = item.wriite_off;
                  DispatchValue = item.DISPATCH_VALUE;
                  RFDValue = item.rfd_value;
                  WIPValue = item.wip_value;
                  

                  if(item.EXPENDITURE)
                  {
                    ExpenseArray = item.EXPENDITURE.split(",")
                  }

                  if(ExpenseArray.length>0)
                  {
                    for(var i =0; i<ExpenseArray.length;i++)
                    {
                      let Field = ExpenseArray[i].split("~")[0]
                      if(Field==="ARCHITECT EXPENSES")
                      {
                        ARCHITECT_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION EXPENSE")
                      {
                        COMMISSION_EXPENSE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION ON SALES-B")
                      {
                        COMMISSION_ON_SALESB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="CONTRACT LABOUR CHARGES")
                      {
                        CONTRACT_LABOUR_CHARGES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                      {
                        FREIGHT_EXPENSE_ON_SALE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="ONSITE EXPENSES")
                      {
                        ONSITE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="PERFORMANCE BONUS")
                      {
                        PERFORMANCE_BONUS = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE")
                      {
                        SOCIAL_FEE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE - B")
                      {
                        SOCIAL_FEEB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                      {
                        TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }



                    }

                    TotalExpenditure = Number(ARCHITECT_EXPENSES) + Number(COMMISSION_EXPENSE) + Number(COMMISSION_ON_SALESB) + Number(CONTRACT_LABOUR_CHARGES) + Number(FREIGHT_EXPENSE_ON_SALE) + Number(ONSITE_EXPENSES) + Number(PERFORMANCE_BONUS) + Number(SOCIAL_FEE) + Number(SOCIAL_FEEB) + Number(TRAVELLING_AND_CONVEYANCE_EXPENSES)

                  }

                
        
              }

             })
             


             this.ledgerdetails.map((item)=>{

              let LedRefno = ""
              

              
              if(item.OrderNumber.includes("/V-"))
              {
               let hyphen = item.OrderNumber.lastIndexOf("/V-");
               let tempproref = item.OrderNumber.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               LedRefno = proref
              }
       
             if(!item.OrderNumber.includes("/V-"))
             {
               let slash = item.OrderNumber.lastIndexOf("/");
               let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
               LedRefno = proref
             }

             if(LedRefno===OrderProjectRefNo)
             {
              Plan = item.ProPlus
             }
             if(LedRefno===OrderProjectRefNo)
             {
              if(item.ProPlusCost)
              {
                PlanValue = item.ProPlusCost
              }
             
             }

             })
            


             this.commercialwins.map((item)=>{
              let CommRefNo = ""
              
                if(item.OrderNo.includes("/V-"))
                {
                 let hyphen = item.OrderNo.lastIndexOf("/V-");
                 let tempproref = item.OrderNo.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 CommRefNo = proref
                }
         
               if(!item.OrderNo.includes("/V-"))
               {
                 let slash = item.OrderNo.lastIndexOf("/");
                 let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
                 CommRefNo = proref
               }
                
               if(CommRefNo===OrderProjectRefNo)
               {
                CommercialWinDate = this.orders[j].CommercialWinDate
                CommercialWinAmount = item.Amount
                CommercialWinPercent = item.Percent
                CommercialType = item.Type
                CommercialRemark = item.Remark

               }

             })




             this.handovers.map((item)=>{

              let HandRefNo = ""
              
              if(item.OrderNo.includes("/V-"))
              {
               let hyphen = item.OrderNo.lastIndexOf("/V-");
               let tempproref = item.OrderNo.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               HandRefNo = proref
              }
       
             if(!item.OrderNo.includes("/V-"))
             {
               let slash = item.OrderNo.lastIndexOf("/");
               let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
               HandRefNo = proref
             }
              
             if(HandRefNo===OrderProjectRefNo)
             {
              HandoverDate = this.orders[j].HandOverDate
              Party = item.Party
              Expense = item.Expense
              ExpensePercent = item.ExpensePercent
              BadDebt = Number(item.BadDebt)           
              Outstanding = (Number(item.OutStanding)-Number(item.BadDebt)).toString()
              Billed = item.Billed
              SpecialDiscount = item.SpecialDiscount
              ReceiptAdvance = item.ReceiptAdvance
              ChequeRequired = item.ChequeRequired
              Type = item.ChequeRequired
              Remark = item.Remark
            
             }


             })




      

 

            var temp12 = {
              "OrderType": this.orders[j].OrderType,
              "WaltzOrderNo":this.orders[j].WaltzOrderNo,
              "OrderNumber" : this.orders[j].OrderNo,
              "CreationDate" : this.orders[j].CreationDate,
              "EditDate" : this.orders[j].EditDate,
              "WinDate" : this.orders[j].WinDate,
              "ProjectName" : this.orders[j].ProjectName,
              "ClientName" : this.orders[j].ClientName,
              "Location" : this.orders[j].Location,
              "ArchitectName" : this.orders[j].Architect,
              "GrandTotal" : this.orders[j].GrandTotal,
              "Discount" : this.orders[j].Discount,
              "FinalAmount" : this.orders[j].FinalAmount,
              "TotalSolutions" : this.orders[j].Solutions.length,
              "WaltzAssociate" : this.orders[j].Associate,
              "Source" : this.orders[j].Source,
              "Status" : this.orders[j].Status,
              "TotalSquarefeet" : this.orders[j].TotalSquareFeet,
              "CSValue" : CSValue,
              "DealerDiscount" : DealerDiscount,
              "Plan" : Plan,
              "PlanValue" : PlanValue,
              "CommercialWinDate":CommercialWinDate,
              "CommercialWinAmount":CommercialWinAmount,
              "CommercialWinPercent":CommercialWinPercent,
              "CommercialType":CommercialType,
              "CommercialRemark": CommercialRemark,
              "HandoverDate":HandoverDate,
              "Party": Party,
              "Expense": Expense,
              "ExpensePercent": ExpensePercent,
              "Outstanding" : Outstanding,
              "Billed" : Billed,
              "SpecialDiscount": SpecialDiscount,
              "BadDebt" : BadDebt,
              "ReceiptAdvance": ReceiptAdvance,
              "ChequeRequired": ChequeRequired,
              "Type": Type,
              "Remark": Remark,
              "ProcoreProjectStatus" : ProcoreStatus,
              "ArchitectFirm" : ArchitectFirm,
              "PROJECTNAME": PROJECTNAME,
              "PR_DT": PR_DT,
              "PROJECTTYPE": PROJECTTYPE,
              "JT": JT,
              "PROSTDATE": PROSTDATE,
              "PROENDDATE": PROENDDATE,
              "PROJECTSQM": PROJECTSQM,
              "PROJECTVALUE": PROJECTVALUE,
              "EXPENDITURE": EXPENDITURE,
              "PIR_ID": PIR_ID,
              "NOOBPI": NOOBPI,
              "PIBASICVALUE": PIBASICVALUE,
              "PITOTALVALUE": PITOTALVALUE,
              "CONFIRMPIBASICVALUE": CONFIRMPIBASICVALUE,
              "CONFIRMPITOTALVALUE": CONFIRMPITOTALVALUE,
              "ADVPIAMT": ADVPIAMT,
              "COLLECTIONOFPI": COLLECTIONOFPI,
              "CONFIRMPISQM": CONFIRMPISQM,
              "DISPATCHPISQM": DISPATCHPISQM,
              "BILLTO_PNAME": BILLTO_PNAME,
              "ACC_REP": ACC_REP,
              "HO_REP": HO_REP,
              "PDCCOLLECTION": PDCCOLLECTION,
              "INVOICECOLLECTION": INVOICECOLLECTION,
              "DISPATCHPIVALUE": DISPATCHPIVALUE,
              "POBASICAMT": POBASICAMT,
              "PURCHASEVALUE": PURCHASEVALUE,
              "REJECTIONSQM": REJECTIONSQM,
              "REJECTIONVALUE": REJECTIONVALUE,
              "PROJREFNO": PROJREFNO,
              "PROJWINDTSTR": PROJWINDTSTR,
              "PROJ_WIN_DT": PROJ_WIN_DT,
              "WIPQTY": WIPQTY,
              "RFDQTY": RFDQTY,
              "CSSTATUS" : StatusCs,
              "SHORT CLOSE" : ShortClose,
              "SALES" : Sales,
              "CREDIT NOTE" : CreditNote,
              "DEBIT NOTE" : DebitNote,
              "WRITE OFF":  WriteOff,
              "DISPATCH VALUE": DispatchValue,
              "RFD VALUE" : RFDValue,
              "WIP VALUE" : WIPValue,
              "ARCHITECT_EXPENSES" :ARCHITECT_EXPENSES,
              "COMMISSION_EXPENSE" :COMMISSION_EXPENSE,
              "COMMISSION_ON_SALESB": COMMISSION_ON_SALESB,
              "CONTRACT_LABOUR_CHARGES":CONTRACT_LABOUR_CHARGES,
              "FREIGHT_EXPENSE_ON_SALE" : FREIGHT_EXPENSE_ON_SALE,
              "ONSITE_EXPENSES":ONSITE_EXPENSES,
              "PERFORMANCE_BONUS":PERFORMANCE_BONUS,
              "SOCIAL_FEE" : SOCIAL_FEE,
              "SOCIAL_FEEB" : SOCIAL_FEEB,
              "TRAVELLING_AND_CONVEYANCE_EXPENSES" : TRAVELLING_AND_CONVEYANCE_EXPENSES,
              "TOTAL EXPENDITURE" : TotalExpenditure,
              "PROCOREPRESENT": ProcorePresent,
              "CSPRESENT" : CSPresent
              
              
            }

            FilteredOrders.push(temp12)
          }
        }
        }

      }

      if(Statuses==="Win")
      {
        for(var j = 0 ; j < this.orders.length ; j ++)
        {

          if(this.orders[j].CommercialWinDate)
          {

            var WinDate = Number(this.orders[j].CommercialWinDate.split('-')[0])
            var WinMonth = Number(this.orders[j].CommercialWinDate.split('-')[1])
            var WinYear = Number(this.orders[j].CommercialWinDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
            
            var winDatetest = new Date(DateFormat)

            winDatetest.setHours(0);
            winDatetest.setMinutes(0);
            winDatetest.setSeconds(0);
            winDatetest.setMilliseconds(0);

            if(winDatetest>=From&&winDatetest<=To&& this.orders[j].Associate===this.form.value.User)
            {

           
              let OrderProjectRefNo = ""

              if(this.orders[j].OrderNo.includes("/V-"))
              {
               let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
               let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               OrderProjectRefNo = proref
              }
           
              if(!this.orders[j].OrderNo.includes("/V-"))
              {
               let slash = this.orders[j].OrderNo.lastIndexOf("/");
               let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
               OrderProjectRefNo = proref
              }
           
               
              let DealerDiscount = '';
  
              this.users.map((item)=>{
                if(item.UserFullName===this.orders[j].Associate)
                {
                  DealerDiscount = item.DealerDiscount
                }
              })
  
  
              this.specialrequests.map((item)=>{
                if(item.OrderNo===OrderProjectRefNo)
                {
                  DealerDiscount = item.NewDealerDiscount
                }
              })
              
              let CSValue = "";
  
              if(DealerDiscount!=="0")
              {
               CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
              }
              if(DealerDiscount==="0")
              {
                CSValue = this.orders[j].FinalAmount
              }
  
  
               let CommercialWinDate = this.orders[j].CommercialWinDate
               let CommercialWinAmount = ""
               let CommercialWinPercent = ""
               let CommercialType = ""
               let HandoverDate = ""
               let CommercialRemark = ""
               let Party = ""
               let Expense = ""
               let ExpensePercent = ""
               let Outstanding = ""
               let Billed = ""
               let SpecialDiscount = ""
               let ReceiptAdvance = ""
               let ChequeRequired = ""
               let Type = ""
               let Remark = ""
               let Plan = ""
               let PlanValue = "";
               let PROJECTNAME ="";
               let PR_DT =""
               let PROJECTTYPE =""
               let JT =""
               let PROSTDATE =""
               let PROENDDATE =""
               let PROJECTSQM =""
               let PROJECTVALUE =""
               let EXPENDITURE =""
               let PIR_ID =""
               let NOOBPI =""
               let PIBASICVALUE=""
               let PITOTALVALUE =""
               let CONFIRMPIBASICVALUE =""
               let CONFIRMPITOTALVALUE =""
               let ADVPIAMT =""
               let COLLECTIONOFPI =""
               let  CONFIRMPISQM =""
               let  DISPATCHPISQM =""
               let  BILLTO_PNAME =""
               let  ACC_REP =""
               let  HO_REP=""
               let  PDCCOLLECTION =""
               let  INVOICECOLLECTION =""
               let  DISPATCHPIVALUE =""
               let  POBASICAMT =""
               let  PURCHASEVALUE =""
               let  REJECTIONSQM =""
               let  REJECTIONVALUE =""
               let  PROJREFNO =""
               let  PROJWINDTSTR =""
               let  PROJ_WIN_DT =""
               let  WIPQTY =""
               let  RFDQTY =""
               let ProcoreStatus = "";
               let BadDebt = 0;
               let  StatusCs = "";
               let  ShortClose = "";
               let  Sales = "";
               let  CreditNote = "";
               let  DebitNote = "";
               let  WriteOff = "";
               let  DispatchValue = "";
               let  RFDValue = "";
               let  WIPValue = "";
               let ExpenseArray = []
               let ARCHITECT_EXPENSES = 0
               let COMMISSION_EXPENSE = 0
               let COMMISSION_ON_SALESB = 0
               let CONTRACT_LABOUR_CHARGES = 0
               let FREIGHT_EXPENSE_ON_SALE = 0
               let ONSITE_EXPENSES = 0
               let PERFORMANCE_BONUS = 0
               let SOCIAL_FEE = 0
               let SOCIAL_FEEB = 0
               let TRAVELLING_AND_CONVEYANCE_EXPENSES = 0;
               let ProcorePresent = "NO";
               let CSPresent = "NO";

               let ArchitectFirm = ""

               ArchProList.map((item)=>{
  
                if(item.OrderNo===OrderProjectRefNo)
                {
                  ArchitectFirm = item.ArchitectFirm
                }
  
               })
  
  
               this.procoreProjects.map((item)=>{
             
               let ProcoreRefNo ="";
  
               if(item.project_number.includes("/V-"))
               {
                ProcoreRefNo = item.project_number.toString().split("/V-")[0]
               }
               if(!item.project_number.includes("/V-"))
               {
                ProcoreRefNo = item.project_number
               }
  
  
               if(OrderProjectRefNo===ProcoreRefNo)
               {
                ProcoreStatus = item.project_stage.name
                ProcorePresent = "YES"
               }
        
  
  
               })
  
              
                    
  
               let TotalExpenditure = 0;     

               CSData.map((item)=>{
  
                if(OrderProjectRefNo===item.PROJREFNO)
                {
  
                 
                   CSPresent = "YES"
                   PROJECTNAME =item.PROJECTNAME
                   PR_DT =item.PR_DT
                   PROJECTTYPE =item.PROJECTTYPE
                   JT =item.JT
                   PROSTDATE =item.PROSTDATE
                   PROENDDATE =item.PROENDDATE
                   PROJECTSQM =item.PROJECTSQM
                   PROJECTVALUE =item.PROJECTVALUE
                   EXPENDITURE =item.EXPENDITURE
                   PIR_ID =item.PIR_ID
                   NOOBPI =item.NOOBPI
                   PIBASICVALUE=item.PIBASICVALUE
                   PITOTALVALUE =item.PITOTALVALUE
                   CONFIRMPIBASICVALUE =item.CONFIRMPIBASICVALUE
                   CONFIRMPITOTALVALUE =item.CONFIRMPITOTALVALUE
                   ADVPIAMT =item.ADVPIAMT
                   COLLECTIONOFPI =item.COLLECTIONOFPI
                    CONFIRMPISQM =item.CONFIRMPISQM
                    DISPATCHPISQM =item.DISPATCHPISQM
                    BILLTO_PNAME =item.BILLTO_PNAME
                    ACC_REP =item.ACC_REP
                    HO_REP=item.HO_REP
                    PDCCOLLECTION =item.PDCCOLLECTION
                    INVOICECOLLECTION =item.INVOICECOLLECTION
                    DISPATCHPIVALUE =item.DISPATCHPIVALUE
                    POBASICAMT =item.POBASICAMT
                    PURCHASEVALUE =item.PURCHASEVALUE
                    REJECTIONSQM =item.REJECTIONSQM
                    REJECTIONVALUE =item.REJECTIONVALUE
                    PROJREFNO =item.PROJREFNO
                    PROJWINDTSTR =item.PROJWINDTSTR
                    PROJ_WIN_DT =item.PROJ_WIN_DT
                    WIPQTY =item.WIPQTY
                    RFDQTY =item.RFDQTY
                    StatusCs = item.status;
                    ShortClose = item.Short_close;
                    Sales = item.sales;
                    CreditNote = item.credit_note;
                    DebitNote = item.debit_note;
                    WriteOff = item.wriite_off;
                    DispatchValue = item.DISPATCH_VALUE;
                    RFDValue = item.rfd_value;
                    WIPValue = item.wip_value;
                    
  
                    if(item.EXPENDITURE)
                    {
                      ExpenseArray = item.EXPENDITURE.split(",")
                    }
  
                    if(ExpenseArray.length>0)
                    {
                      for(var i =0; i<ExpenseArray.length;i++)
                      {
                        let Field = ExpenseArray[i].split("~")[0]
                        if(Field==="ARCHITECT EXPENSES")
                        {
                          ARCHITECT_EXPENSES = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="COMMISSION EXPENSE")
                        {
                          COMMISSION_EXPENSE = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="COMMISSION ON SALES-B")
                        {
                          COMMISSION_ON_SALESB = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="CONTRACT LABOUR CHARGES")
                        {
                          CONTRACT_LABOUR_CHARGES = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                        {
                          FREIGHT_EXPENSE_ON_SALE = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="ONSITE EXPENSES")
                        {
                          ONSITE_EXPENSES = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="PERFORMANCE BONUS")
                        {
                          PERFORMANCE_BONUS = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="SOCIAL FEE")
                        {
                          SOCIAL_FEE = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="SOCIAL FEE - B")
                        {
                          SOCIAL_FEEB = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                        {
                          TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[i].split("~")[1]
                        }
  
  
  
                      }
  
                      TotalExpenditure = Number(ARCHITECT_EXPENSES) + Number(COMMISSION_EXPENSE) + Number(COMMISSION_ON_SALESB) + Number(CONTRACT_LABOUR_CHARGES) + Number(FREIGHT_EXPENSE_ON_SALE) + Number(ONSITE_EXPENSES) + Number(PERFORMANCE_BONUS) + Number(SOCIAL_FEE) + Number(SOCIAL_FEEB) + Number(TRAVELLING_AND_CONVEYANCE_EXPENSES)
  
                    }
  
                  
          
                }
  
               })
               
  
  
               this.ledgerdetails.map((item)=>{
  
                let LedRefno = ""
                
  
                
                if(item.OrderNumber.includes("/V-"))
                {
                 let hyphen = item.OrderNumber.lastIndexOf("/V-");
                 let tempproref = item.OrderNumber.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 LedRefno = proref
                }
         
               if(!item.OrderNumber.includes("/V-"))
               {
                 let slash = item.OrderNumber.lastIndexOf("/");
                 let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
                 LedRefno = proref
               }
  
               if(LedRefno===OrderProjectRefNo)
               {
                Plan = item.ProPlus
               }
               if(LedRefno===OrderProjectRefNo)
               {
                if(item.ProPlusCost)
                {
                  PlanValue = item.ProPlusCost
                }
               
               }
  
               })
              
  
  
               this.commercialwins.map((item)=>{
                let CommRefNo = ""
                
                  if(item.OrderNo.includes("/V-"))
                  {
                   let hyphen = item.OrderNo.lastIndexOf("/V-");
                   let tempproref = item.OrderNo.substring(0, hyphen);
                   let slash = tempproref.lastIndexOf("/");
                   let proref = tempproref.substring(slash + 1, hyphen); 
                   CommRefNo = proref
                  }
           
                 if(!item.OrderNo.includes("/V-"))
                 {
                   let slash = item.OrderNo.lastIndexOf("/");
                   let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
                   CommRefNo = proref
                 }
                  
                 if(CommRefNo===OrderProjectRefNo)
                 {
                  CommercialWinDate = this.orders[j].CommercialWinDate
                  CommercialWinAmount = item.Amount
                  CommercialWinPercent = item.Percent
                  CommercialType = item.Type
                  CommercialRemark = item.Remark
  
                 }
  
               })
  
  
  
  
               this.handovers.map((item)=>{
  
                let HandRefNo = ""
                
                if(item.OrderNo.includes("/V-"))
                {
                 let hyphen = item.OrderNo.lastIndexOf("/V-");
                 let tempproref = item.OrderNo.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 HandRefNo = proref
                }
         
               if(!item.OrderNo.includes("/V-"))
               {
                 let slash = item.OrderNo.lastIndexOf("/");
                 let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
                 HandRefNo = proref
               }
                
               if(HandRefNo===OrderProjectRefNo)
               {
                HandoverDate = this.orders[j].HandOverDate
                Party = item.Party
                Expense = item.Expense
                ExpensePercent = item.ExpensePercent
                BadDebt = Number(item.BadDebt)           
                Outstanding = (Number(item.OutStanding)-Number(item.BadDebt)).toString()
                Billed = item.Billed
                SpecialDiscount = item.SpecialDiscount
                ReceiptAdvance = item.ReceiptAdvance
                ChequeRequired = item.ChequeRequired
                Type = item.ChequeRequired
                Remark = item.Remark
              
               }
  
  
               })
  
  


           

               var temp57 = {
                "OrderType": this.orders[j].OrderType,
                "WaltzOrderNo":this.orders[j].WaltzOrderNo,
                "OrderNumber" : this.orders[j].OrderNo,
              "CreationDate" : this.orders[j].CreationDate,
              "EditDate" : this.orders[j].EditDate,
              "WinDate" : this.orders[j].WinDate,
              "ProjectName" : this.orders[j].ProjectName,
              "ClientName" : this.orders[j].ClientName,
              "Location" : this.orders[j].Location,
              "ArchitectName" : this.orders[j].Architect,
              "GrandTotal" : this.orders[j].GrandTotal,
              "Discount" : this.orders[j].Discount,
              "FinalAmount" : this.orders[j].FinalAmount,
              "TotalSolutions" : this.orders[j].Solutions.length,
              "WaltzAssociate" : this.orders[j].Associate,
              "Source" : this.orders[j].Source,
              "Status" : this.orders[j].Status,
              "TotalSquarefeet" : this.orders[j].TotalSquareFeet,
              "CSValue" : CSValue,
              "DealerDiscount" : DealerDiscount,
              "Plan" : Plan,
              "PlanValue" : PlanValue,
              "CommercialWinDate":CommercialWinDate,
              "CommercialWinAmount":CommercialWinAmount,
              "CommercialWinPercent":CommercialWinPercent,
              "CommercialType":CommercialType,
              "CommercialRemark": CommercialRemark,
              "HandoverDate":HandoverDate,
              "Party": Party,
              "Expense": Expense,
              "ExpensePercent": ExpensePercent,
              "Outstanding" : Outstanding,
              "Billed" : Billed,
              "SpecialDiscount": SpecialDiscount,
              "BadDebt" : BadDebt,
              "ReceiptAdvance": ReceiptAdvance,
              "ChequeRequired": ChequeRequired,
              "Type": Type,
              "Remark": Remark,
              "ProcoreProjectStatus" : ProcoreStatus,
              "ArchitectFirm" : ArchitectFirm,
              "PROJECTNAME": PROJECTNAME,
              "PR_DT": PR_DT,
              "PROJECTTYPE": PROJECTTYPE,
              "JT": JT,
              "PROSTDATE": PROSTDATE,
              "PROENDDATE": PROENDDATE,
              "PROJECTSQM": PROJECTSQM,
              "PROJECTVALUE": PROJECTVALUE,
              "EXPENDITURE": EXPENDITURE,
              "PIR_ID": PIR_ID,
              "NOOBPI": NOOBPI,
              "PIBASICVALUE": PIBASICVALUE,
              "PITOTALVALUE": PITOTALVALUE,
              "CONFIRMPIBASICVALUE": CONFIRMPIBASICVALUE,
              "CONFIRMPITOTALVALUE": CONFIRMPITOTALVALUE,
              "ADVPIAMT": ADVPIAMT,
              "COLLECTIONOFPI": COLLECTIONOFPI,
              "CONFIRMPISQM": CONFIRMPISQM,
              "DISPATCHPISQM": DISPATCHPISQM,
              "BILLTO_PNAME": BILLTO_PNAME,
              "ACC_REP": ACC_REP,
              "HO_REP": HO_REP,
              "PDCCOLLECTION": PDCCOLLECTION,
              "INVOICECOLLECTION": INVOICECOLLECTION,
              "DISPATCHPIVALUE": DISPATCHPIVALUE,
              "POBASICAMT": POBASICAMT,
              "PURCHASEVALUE": PURCHASEVALUE,
              "REJECTIONSQM": REJECTIONSQM,
              "REJECTIONVALUE": REJECTIONVALUE,
              "PROJREFNO": PROJREFNO,
              "PROJWINDTSTR": PROJWINDTSTR,
              "PROJ_WIN_DT": PROJ_WIN_DT,
              "WIPQTY": WIPQTY,
              "RFDQTY": RFDQTY,
              "CSSTATUS" : StatusCs,
              "SHORT CLOSE" : ShortClose,
              "SALES" : Sales,
              "CREDIT NOTE" : CreditNote,
              "DEBIT NOTE" : DebitNote,
              "WRITE OFF":  WriteOff,
              "DISPATCH VALUE": DispatchValue,
              "RFD VALUE" : RFDValue,
              "WIP VALUE" : WIPValue,
              "ARCHITECT_EXPENSES" :ARCHITECT_EXPENSES,
              "COMMISSION_EXPENSE" :COMMISSION_EXPENSE,
              "COMMISSION_ON_SALESB": COMMISSION_ON_SALESB,
              "CONTRACT_LABOUR_CHARGES":CONTRACT_LABOUR_CHARGES,
              "FREIGHT_EXPENSE_ON_SALE" : FREIGHT_EXPENSE_ON_SALE,
              "ONSITE_EXPENSES":ONSITE_EXPENSES,
              "PERFORMANCE_BONUS":PERFORMANCE_BONUS,
              "SOCIAL_FEE" : SOCIAL_FEE,
              "SOCIAL_FEEB" : SOCIAL_FEEB,
              "TRAVELLING_AND_CONVEYANCE_EXPENSES" : TRAVELLING_AND_CONVEYANCE_EXPENSES,
              "TOTAL EXPENDITURE" : TotalExpenditure,
              "PROCOREPRESENT": ProcorePresent,
              "CSPRESENT" : CSPresent
 
              }

              FilteredOrders.push(temp57)

            }

          }

        }

      }
  
      if(Statuses==="Commercial Hold")
      {
        for(var j = 0 ; j < this.orders.length ; j ++)
        {

          if(this.orders[j].Status ==="Commercial Hold")
          {

            var WinDate = Number(this.orders[j].WinDate.split('-')[0])
            var WinMonth = Number(this.orders[j].WinDate.split('-')[1])
            var WinYear = Number(this.orders[j].WinDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
            
            var winDatetest = new Date(DateFormat)

            winDatetest.setHours(0);
            winDatetest.setMinutes(0);
            winDatetest.setSeconds(0);
            winDatetest.setMilliseconds(0);

            if(winDatetest>=From&&winDatetest<=To&&this.orders[j].Status==="Commercial Hold"&& this.orders[j].Associate===this.form.value.User)
            {

              let OrderProjectRefNo = ""

              if(this.orders[j].OrderNo.includes("/V-"))
              {
               let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
               let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               OrderProjectRefNo = proref
              }
           
              if(!this.orders[j].OrderNo.includes("/V-"))
              {
               let slash = this.orders[j].OrderNo.lastIndexOf("/");
               let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
               OrderProjectRefNo = proref
              }
           
              
              let DealerDiscount = '';

              this.users.map((item)=>{
                if(item.UserFullName===this.orders[j].Associate)
                {
                  DealerDiscount = item.DealerDiscount
                }
              })

              this.specialrequests.map((item)=>{
                if(item.OrderNo===OrderProjectRefNo)
                {
                  DealerDiscount = item.NewDealerDiscount
                }
              })
 
 
               let CommercialWinDate = ""
               let CommercialWinAmount = ""
               let CommercialWinPercent = ""
               let CommercialType = ""
               let HandoverDate = ""
               let CommercialRemark = ""
               let Party = ""
               let Expense = ""
               let ExpensePercent = ""
               let Outstanding = ""
               let Billed = ""
               let SpecialDiscount = ""
               let ReceiptAdvance = ""
               let ChequeRequired = ""
               let Type = ""
               let Remark = ""
               let Plan = ""
               let PlanValue = "";
               let PROJECTNAME ="";
               let PR_DT =""
               let PROJECTTYPE =""
               let JT =""
               let PROSTDATE =""
               let PROENDDATE =""
               let PROJECTSQM =""
               let PROJECTVALUE =""
               let EXPENDITURE =""
               let PIR_ID =""
               let NOOBPI =""
               let PIBASICVALUE=""
               let PITOTALVALUE =""
               let CONFIRMPIBASICVALUE =""
               let CONFIRMPITOTALVALUE =""
               let ADVPIAMT =""
               let COLLECTIONOFPI =""
               let  CONFIRMPISQM =""
               let  DISPATCHPISQM =""
               let  BILLTO_PNAME =""
               let  ACC_REP =""
               let  HO_REP=""
               let  PDCCOLLECTION =""
               let  INVOICECOLLECTION =""
               let  DISPATCHPIVALUE =""
               let  POBASICAMT =""
               let  PURCHASEVALUE =""
               let  REJECTIONSQM =""
               let  REJECTIONVALUE =""
               let  PROJREFNO =""
               let  PROJWINDTSTR =""
               let  PROJ_WIN_DT =""
               let  WIPQTY =""
               let  RFDQTY =""
               let ProcoreStatus = "";
               let  StatusCs = "";
               let  ShortClose = "";
               let  Sales = "";
               let  CreditNote = "";
               let  DebitNote = "";
               let  WriteOff = "";
               let  DispatchValue = "";
               let  RFDValue = "";
               let  WIPValue = "";
               let ExpenseArray = []
               let ARCHITECT_EXPENSES = 0
               let COMMISSION_EXPENSE = 0
               let COMMISSION_ON_SALESB = 0
               let CONTRACT_LABOUR_CHARGES = 0
               let FREIGHT_EXPENSE_ON_SALE = 0
               let ONSITE_EXPENSES = 0
               let PERFORMANCE_BONUS = 0
               let SOCIAL_FEE = 0
               let SOCIAL_FEEB = 0
               let TRAVELLING_AND_CONVEYANCE_EXPENSES = 0;
               let ProcorePresent = "NO";
               let CSPresent = "NO";
               let ArchitectFirm = ""

               ArchProList.map((item)=>{
  
                if(item.OrderNo===OrderProjectRefNo)
                {
                  ArchitectFirm = item.ArchitectFirm
                }
  
               })


               this.procoreProjects.map((item)=>{
             
               let ProcoreRefNo ="";

               if(item.project_number.includes("/V-"))
               {
                ProcoreRefNo = item.project_number.toString().split("/V-")[0]
               }
               if(!item.project_number.includes("/V-"))
               {
                ProcoreRefNo = item.project_number
               }


               if(OrderProjectRefNo===ProcoreRefNo)
               {
                ProcoreStatus = item.project_stage.name
                ProcorePresent = "YES"
               }
        


               })


              
               
            
           
               let TotalExpenditure = 0;     

               CSData.map((item)=>{
  
                if(OrderProjectRefNo===item.PROJREFNO)
                {
  
                 
                   CSPresent = "YES"
                   PROJECTNAME =item.PROJECTNAME
                   PR_DT =item.PR_DT
                   PROJECTTYPE =item.PROJECTTYPE
                   JT =item.JT
                   PROSTDATE =item.PROSTDATE
                   PROENDDATE =item.PROENDDATE
                   PROJECTSQM =item.PROJECTSQM
                   PROJECTVALUE =item.PROJECTVALUE
                   EXPENDITURE =item.EXPENDITURE
                   PIR_ID =item.PIR_ID
                   NOOBPI =item.NOOBPI
                   PIBASICVALUE=item.PIBASICVALUE
                   PITOTALVALUE =item.PITOTALVALUE
                   CONFIRMPIBASICVALUE =item.CONFIRMPIBASICVALUE
                   CONFIRMPITOTALVALUE =item.CONFIRMPITOTALVALUE
                   ADVPIAMT =item.ADVPIAMT
                   COLLECTIONOFPI =item.COLLECTIONOFPI
                    CONFIRMPISQM =item.CONFIRMPISQM
                    DISPATCHPISQM =item.DISPATCHPISQM
                    BILLTO_PNAME =item.BILLTO_PNAME
                    ACC_REP =item.ACC_REP
                    HO_REP=item.HO_REP
                    PDCCOLLECTION =item.PDCCOLLECTION
                    INVOICECOLLECTION =item.INVOICECOLLECTION
                    DISPATCHPIVALUE =item.DISPATCHPIVALUE
                    POBASICAMT =item.POBASICAMT
                    PURCHASEVALUE =item.PURCHASEVALUE
                    REJECTIONSQM =item.REJECTIONSQM
                    REJECTIONVALUE =item.REJECTIONVALUE
                    PROJREFNO =item.PROJREFNO
                    PROJWINDTSTR =item.PROJWINDTSTR
                    PROJ_WIN_DT =item.PROJ_WIN_DT
                    WIPQTY =item.WIPQTY
                    RFDQTY =item.RFDQTY
                    StatusCs = item.status;
                    ShortClose = item.Short_close;
                    Sales = item.sales;
                    CreditNote = item.credit_note;
                    DebitNote = item.debit_note;
                    WriteOff = item.wriite_off;
                    DispatchValue = item.DISPATCH_VALUE;
                    RFDValue = item.rfd_value;
                    WIPValue = item.wip_value;
                    
  
                    if(item.EXPENDITURE)
                    {
                      ExpenseArray = item.EXPENDITURE.split(",")
                    }
  
                    if(ExpenseArray.length>0)
                    {
                      for(var i =0; i<ExpenseArray.length;i++)
                      {
                        let Field = ExpenseArray[i].split("~")[0]
                        if(Field==="ARCHITECT EXPENSES")
                        {
                          ARCHITECT_EXPENSES = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="COMMISSION EXPENSE")
                        {
                          COMMISSION_EXPENSE = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="COMMISSION ON SALES-B")
                        {
                          COMMISSION_ON_SALESB = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="CONTRACT LABOUR CHARGES")
                        {
                          CONTRACT_LABOUR_CHARGES = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                        {
                          FREIGHT_EXPENSE_ON_SALE = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="ONSITE EXPENSES")
                        {
                          ONSITE_EXPENSES = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="PERFORMANCE BONUS")
                        {
                          PERFORMANCE_BONUS = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="SOCIAL FEE")
                        {
                          SOCIAL_FEE = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="SOCIAL FEE - B")
                        {
                          SOCIAL_FEEB = ExpenseArray[i].split("~")[1]
                        }
                        if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                        {
                          TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[i].split("~")[1]
                        }
  
  
  
                      }
  
                      TotalExpenditure = Number(ARCHITECT_EXPENSES) + Number(COMMISSION_EXPENSE) + Number(COMMISSION_ON_SALESB) + Number(CONTRACT_LABOUR_CHARGES) + Number(FREIGHT_EXPENSE_ON_SALE) + Number(ONSITE_EXPENSES) + Number(PERFORMANCE_BONUS) + Number(SOCIAL_FEE) + Number(SOCIAL_FEEB) + Number(TRAVELLING_AND_CONVEYANCE_EXPENSES)
  
                    }
  
                  
          
                }
  
               })
               

 
 
               this.ledgerdetails.map((item)=>{
 
                let LedRefno = ""
 
                
                if(item.OrderNumber.includes("/V-"))
                {
                 let hyphen = item.OrderNumber.lastIndexOf("/V-");
                 let tempproref = item.OrderNumber.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 LedRefno = proref
                }
         
               if(!item.OrderNumber.includes("/V-"))
               {
                 let slash = item.OrderNumber.lastIndexOf("/");
                 let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
                 LedRefno = proref
               }
 
               if(LedRefno===OrderProjectRefNo)
               {
                Plan = item.ProPlus
               }
               if(LedRefno===OrderProjectRefNo)
               {
                 if(item.ProPlusCost)
                 {
                   PlanValue = item.ProPlusCost
                 }
               }
 
               })
              
 
               let CSValue = "";

               if(DealerDiscount!=="0")
               {
                CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
               }
               if(DealerDiscount==="0")
               {
                 CSValue = this.orders[j].FinalAmount
               }
             


               var temp5 = {
                "OrderType": this.orders[j].OrderType,
                "WaltzOrderNo":this.orders[j].WaltzOrderNo,
                "OrderNumber" : this.orders[j].OrderNo,
                "CreationDate" : this.orders[j].CreationDate,
                "EditDate" : this.orders[j].EditDate,
                "WinDate" : this.orders[j].WinDate,
                "ProjectName" : this.orders[j].ProjectName,
                "ClientName" : this.orders[j].ClientName,
                "Location" : this.orders[j].Location,
                "ArchitectName" : this.orders[j].Architect,
                "GrandTotal" : this.orders[j].GrandTotal,
                "Discount" : this.orders[j].Discount,
                "FinalAmount" : this.orders[j].FinalAmount,
                "TotalSolutions" : this.orders[j].Solutions.length,
                "WaltzAssociate" : this.orders[j].Associate,
                "Source" : this.orders[j].Source,
                "Status" : this.orders[j].Status,
                "TotalSquarefeet" : this.orders[j].TotalSquareFeet,
                "CSValue" : CSValue,
                "DealerDiscount" : DealerDiscount,
                "Plan" : Plan,
                "PlanValue" : PlanValue,
                "CommercialWinDate": "",
                "CommercialWinAmount": "",
                "CommercialWinPercent": "",
                "CommercialType": "",
                "CommercialRemark": "",
                "HandoverDate":"",
                "Party": "",
                "Expense": "",
                "ExpensePercent": "",
                "Outstanding" : "",
                "Billed" : "",
                "SpecialDiscount": "",
                "BadDebt" : "",
                "ReceiptAdvance": "",
                "ChequeRequired": "",
                "Type": "",
                "Remark": "",
                "ProcoreProjectStatus" : ProcoreStatus,
                "ArchitectFirm" : ArchitectFirm,
                "PROJECTNAME": PROJECTNAME,
                "PR_DT": PR_DT,
                "PROJECTTYPE": PROJECTTYPE,
                "JT": JT,
                "PROSTDATE": PROSTDATE,
                "PROENDDATE": PROENDDATE,
                "PROJECTSQM": PROJECTSQM,
                "PROJECTVALUE": PROJECTVALUE,
                "EXPENDITURE": EXPENDITURE,
                "PIR_ID": PIR_ID,
                "NOOBPI": NOOBPI,
                "PIBASICVALUE": PIBASICVALUE,
                "PITOTALVALUE": PITOTALVALUE,
                "CONFIRMPIBASICVALUE": CONFIRMPIBASICVALUE,
                "CONFIRMPITOTALVALUE": CONFIRMPITOTALVALUE,
                "ADVPIAMT": ADVPIAMT,
                "COLLECTIONOFPI": COLLECTIONOFPI,
                "CONFIRMPISQM": CONFIRMPISQM,
                "DISPATCHPISQM": DISPATCHPISQM,
                "BILLTO_PNAME": BILLTO_PNAME,
                "ACC_REP": ACC_REP,
                "HO_REP": HO_REP,
                "PDCCOLLECTION": PDCCOLLECTION,
                "INVOICECOLLECTION": INVOICECOLLECTION,
                "DISPATCHPIVALUE": DISPATCHPIVALUE,
                "POBASICAMT": POBASICAMT,
                "PURCHASEVALUE": PURCHASEVALUE,
                "REJECTIONSQM": REJECTIONSQM,
                "REJECTIONVALUE": REJECTIONVALUE,
                "PROJREFNO": PROJREFNO,
                "PROJWINDTSTR": PROJWINDTSTR,
                "PROJ_WIN_DT": PROJ_WIN_DT,
                "WIPQTY": WIPQTY,
                "RFDQTY": RFDQTY,
                "CSSTATUS" : StatusCs,
                "SHORT CLOSE" : ShortClose,
                "SALES" : Sales,
                "CREDIT NOTE" : CreditNote,
                "DEBIT NOTE" : DebitNote,
                "WRITE OFF":  WriteOff,
                "DISPATCH VALUE": DispatchValue,
                "RFD VALUE" : RFDValue,
                "WIP VALUE" : WIPValue,
                "ARCHITECT_EXPENSES" :ARCHITECT_EXPENSES,
                "COMMISSION_EXPENSE" :COMMISSION_EXPENSE,
                "COMMISSION_ON_SALESB": COMMISSION_ON_SALESB,
                "CONTRACT_LABOUR_CHARGES":CONTRACT_LABOUR_CHARGES,
                "FREIGHT_EXPENSE_ON_SALE" : FREIGHT_EXPENSE_ON_SALE,
                "ONSITE_EXPENSES":ONSITE_EXPENSES,
                "PERFORMANCE_BONUS":PERFORMANCE_BONUS,
                "SOCIAL_FEE" : SOCIAL_FEE,
                "SOCIAL_FEEB" : SOCIAL_FEEB,
                "TRAVELLING_AND_CONVEYANCE_EXPENSES" : TRAVELLING_AND_CONVEYANCE_EXPENSES,
                "TOTAL EXPENDITURE" : TotalExpenditure,
                "PROCOREPRESENT": ProcorePresent,
                "CSPRESENT" : CSPresent
              }

              FilteredOrders.push(temp5)

            }

          }

        }

      }

      if(Statuses==="Handover")
      {
        for(var j = 0 ; j < this.orders.length ; j ++)
        {

          if(this.orders[j].HandOverDate)
          {

            var WinDate = Number(this.orders[j].HandOverDate.split('-')[0])
            var WinMonth = Number(this.orders[j].HandOverDate.split('-')[1])
            var WinYear = Number(this.orders[j].HandOverDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
            
            var winDatetest = new Date(DateFormat)
            winDatetest.setHours(0);
            winDatetest.setMinutes(0);
            winDatetest.setSeconds(0);
            winDatetest.setMilliseconds(0);

            if(winDatetest>=From&&winDatetest<=To&&this.orders[j].Status==="Handover"&& this.orders[j].Associate===this.form.value.User)
            {

              let OrderProjectRefNo = ""

              if(this.orders[j].OrderNo.includes("/V-"))
              {
               let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
               let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               OrderProjectRefNo = proref
              }
           
              if(!this.orders[j].OrderNo.includes("/V-"))
              {
               let slash = this.orders[j].OrderNo.lastIndexOf("/");
               let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
               OrderProjectRefNo = proref
              }
           
              
 
 
               let CommercialWinDate = this.orders[j].CommercialWinDate
               let CommercialWinAmount = ""
               let CommercialWinPercent = ""
               let CommercialType = ""
               let HandoverDate = ""
               let CommercialRemark = ""
               let Party = ""
               let Expense = ""
               let ExpensePercent = ""
               let Outstanding = ""
               let Billed = ""
               let SpecialDiscount = ""
               let ReceiptAdvance = ""
               let ChequeRequired = ""
               let Type = ""
               let Remark = ""
               let Plan = ""
               let PlanValue = "";
               let BadDebt = 0;

               let DealerDiscount = '';
               let PROJECTNAME ="";
               let PR_DT =""
               let PROJECTTYPE =""
               let JT =""
               let PROSTDATE =""
               let PROENDDATE =""
               let PROJECTSQM =""
               let PROJECTVALUE =""
               let EXPENDITURE =""
               let PIR_ID =""
               let NOOBPI =""
               let PIBASICVALUE=""
               let PITOTALVALUE =""
               let CONFIRMPIBASICVALUE =""
               let CONFIRMPITOTALVALUE =""
               let ADVPIAMT =""
               let COLLECTIONOFPI =""
               let  CONFIRMPISQM =""
               let  DISPATCHPISQM =""
               let  BILLTO_PNAME =""
               let  ACC_REP =""
               let  HO_REP=""
               let  PDCCOLLECTION =""
               let  INVOICECOLLECTION =""
               let  DISPATCHPIVALUE =""
               let  POBASICAMT =""
               let  PURCHASEVALUE =""
               let  REJECTIONSQM =""
               let  REJECTIONVALUE =""
               let  PROJREFNO =""
               let  PROJWINDTSTR =""
               let  PROJ_WIN_DT =""
               let  WIPQTY =""
               let  RFDQTY =""
               let ProcoreStatus = "";
               let  StatusCs = "";
               let  ShortClose = "";
               let  Sales = "";
               let  CreditNote = "";
               let  DebitNote = "";
               let  WriteOff = "";
               let  DispatchValue = "";
               let  RFDValue = "";
               let  WIPValue = "";
               let ExpenseArray = []
               let ARCHITECT_EXPENSES = 0
               let COMMISSION_EXPENSE = 0
               let COMMISSION_ON_SALESB = 0
               let CONTRACT_LABOUR_CHARGES = 0
               let FREIGHT_EXPENSE_ON_SALE = 0
               let ONSITE_EXPENSES = 0
               let PERFORMANCE_BONUS = 0
               let SOCIAL_FEE = 0
               let SOCIAL_FEEB = 0
               let TRAVELLING_AND_CONVEYANCE_EXPENSES = 0
               let ProcorePresent = "NO";
               let CSPresent = "NO";
               let ArchitectFirm = ""

               ArchProList.map((item)=>{
  
                if(item.OrderNo===OrderProjectRefNo)
                {
                  ArchitectFirm = item.ArchitectFirm
                }
  
               })


               this.procoreProjects.map((item)=>{
             
               let ProcoreRefNo ="";

               if(item.project_number.includes("/V-"))
               {
                ProcoreRefNo = item.project_number.toString().split("/V-")[0]
               }
               if(!item.project_number.includes("/V-"))
               {
                ProcoreRefNo = item.project_number
               }


               if(OrderProjectRefNo===ProcoreRefNo)
               {
                ProcoreStatus = item.project_stage.name
                ProcorePresent = "YES"
               }
        


               })


              
               
            
           

               let TotalExpenditure = 0;     

             CSData.map((item)=>{

              if(OrderProjectRefNo===item.PROJREFNO)
              {

               
                 CSPresent = "YES"
                 PROJECTNAME =item.PROJECTNAME
                 PR_DT =item.PR_DT
                 PROJECTTYPE =item.PROJECTTYPE
                 JT =item.JT
                 PROSTDATE =item.PROSTDATE
                 PROENDDATE =item.PROENDDATE
                 PROJECTSQM =item.PROJECTSQM
                 PROJECTVALUE =item.PROJECTVALUE
                 EXPENDITURE =item.EXPENDITURE
                 PIR_ID =item.PIR_ID
                 NOOBPI =item.NOOBPI
                 PIBASICVALUE=item.PIBASICVALUE
                 PITOTALVALUE =item.PITOTALVALUE
                 CONFIRMPIBASICVALUE =item.CONFIRMPIBASICVALUE
                 CONFIRMPITOTALVALUE =item.CONFIRMPITOTALVALUE
                 ADVPIAMT =item.ADVPIAMT
                 COLLECTIONOFPI =item.COLLECTIONOFPI
                  CONFIRMPISQM =item.CONFIRMPISQM
                  DISPATCHPISQM =item.DISPATCHPISQM
                  BILLTO_PNAME =item.BILLTO_PNAME
                  ACC_REP =item.ACC_REP
                  HO_REP=item.HO_REP
                  PDCCOLLECTION =item.PDCCOLLECTION
                  INVOICECOLLECTION =item.INVOICECOLLECTION
                  DISPATCHPIVALUE =item.DISPATCHPIVALUE
                  POBASICAMT =item.POBASICAMT
                  PURCHASEVALUE =item.PURCHASEVALUE
                  REJECTIONSQM =item.REJECTIONSQM
                  REJECTIONVALUE =item.REJECTIONVALUE
                  PROJREFNO =item.PROJREFNO
                  PROJWINDTSTR =item.PROJWINDTSTR
                  PROJ_WIN_DT =item.PROJ_WIN_DT
                  WIPQTY =item.WIPQTY
                  RFDQTY =item.RFDQTY
                  StatusCs = item.status;
                  ShortClose = item.Short_close;
                  Sales = item.sales;
                  CreditNote = item.credit_note;
                  DebitNote = item.debit_note;
                  WriteOff = item.wriite_off;
                  DispatchValue = item.DISPATCH_VALUE;
                  RFDValue = item.rfd_value;
                  WIPValue = item.wip_value;
                  

                  if(item.EXPENDITURE)
                  {
                    ExpenseArray = item.EXPENDITURE.split(",")
                  }

                  if(ExpenseArray.length>0)
                  {
                    for(var i =0; i<ExpenseArray.length;i++)
                    {
                      let Field = ExpenseArray[i].split("~")[0]
                      if(Field==="ARCHITECT EXPENSES")
                      {
                        ARCHITECT_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION EXPENSE")
                      {
                        COMMISSION_EXPENSE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION ON SALES-B")
                      {
                        COMMISSION_ON_SALESB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="CONTRACT LABOUR CHARGES")
                      {
                        CONTRACT_LABOUR_CHARGES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                      {
                        FREIGHT_EXPENSE_ON_SALE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="ONSITE EXPENSES")
                      {
                        ONSITE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="PERFORMANCE BONUS")
                      {
                        PERFORMANCE_BONUS = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE")
                      {
                        SOCIAL_FEE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE - B")
                      {
                        SOCIAL_FEEB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                      {
                        TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }



                    }

                    TotalExpenditure = Number(ARCHITECT_EXPENSES) + Number(COMMISSION_EXPENSE) + Number(COMMISSION_ON_SALESB) + Number(CONTRACT_LABOUR_CHARGES) + Number(FREIGHT_EXPENSE_ON_SALE) + Number(ONSITE_EXPENSES) + Number(PERFORMANCE_BONUS) + Number(SOCIAL_FEE) + Number(SOCIAL_FEEB) + Number(TRAVELLING_AND_CONVEYANCE_EXPENSES)

                  }

                
        
              }

             })
              
               
            
          

               this.users.map((item)=>{
                 if(item.UserFullName===this.orders[j].Associate)
                 {
                   DealerDiscount = item.DealerDiscount
                 }
               })


               this.specialrequests.map((item)=>{
                if(item.OrderNo===OrderProjectRefNo)
                {
                  DealerDiscount = item.NewDealerDiscount
                }
              })
 
 
               this.ledgerdetails.map((item)=>{
 
                let LedRefno = ""
 
                
                if(item.OrderNumber.includes("/V-"))
                {
                 let hyphen = item.OrderNumber.lastIndexOf("/V-");
                 let tempproref = item.OrderNumber.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 LedRefno = proref
                }
         
               if(!item.OrderNumber.includes("/V-"))
               {
                 let slash = item.OrderNumber.lastIndexOf("/");
                 let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
                 LedRefno = proref
               }
 
               if(LedRefno===OrderProjectRefNo)
               {
                Plan = item.ProPlus
               }
               if(LedRefno===OrderProjectRefNo)
               {
                 if(item.ProPlusCost)
                 {
                   PlanValue = item.ProPlusCost
                 }
               }
 
               })
              
 
 
               this.commercialwins.map((item)=>{
                let CommRefNo = ""
                
                  if(item.OrderNo.includes("/V-"))
                  {
                   let hyphen = item.OrderNo.lastIndexOf("/V-");
                   let tempproref = item.OrderNo.substring(0, hyphen);
                   let slash = tempproref.lastIndexOf("/");
                   let proref = tempproref.substring(slash + 1, hyphen); 
                   CommRefNo = proref
                  }
           
                 if(!item.OrderNo.includes("/V-"))
                 {
                   let slash = item.OrderNo.lastIndexOf("/");
                   let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
                   CommRefNo = proref
                 }
                  
                 if(CommRefNo===OrderProjectRefNo)
                 {
                  CommercialWinDate = this.orders[j].CommercialWinDate
                  CommercialWinAmount = item.Amount
                  CommercialWinPercent = item.Percent
                  CommercialType = item.Type
                  CommercialRemark = item.Remark
 
                 }
 
               })

               this.handovers.map((item)=>{

                let HandRefNo = ""
                
                if(item.OrderNo.includes("/V-"))
                {
                 let hyphen = item.OrderNo.lastIndexOf("/V-");
                 let tempproref = item.OrderNo.substring(0, hyphen);
                 let slash = tempproref.lastIndexOf("/");
                 let proref = tempproref.substring(slash + 1, hyphen); 
                 HandRefNo = proref
                }
         
               if(!item.OrderNo.includes("/V-"))
               {
                 let slash = item.OrderNo.lastIndexOf("/");
                 let proref = item.OrderNo.substring(slash+ 1, item.OrderNo.length);
                 HandRefNo = proref
               }
                
               if(HandRefNo===OrderProjectRefNo)
               {
                HandoverDate = this.orders[j].HandOverDate
                Party = item.Party
                Expense = item.Expense
                ExpensePercent = item.ExpensePercent
                BadDebt = Number(item.BadDebt)
                Outstanding = (Number(item.OutStanding)-Number(item.BadDebt)).toString()
                Billed = item.Billed
                SpecialDiscount = item.SpecialDiscount
                ReceiptAdvance = item.ReceiptAdvance
                ChequeRequired = item.ChequeRequired
                Type = item.ChequeRequired

                Remark = item.Remark
              
               }
 
 
               })


               let CSValue = "";

               if(DealerDiscount!=="0")
               {
                CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
               }
               if(DealerDiscount==="0")
               {
                 CSValue = this.orders[j].FinalAmount
               }


               var temp7 = {
                "OrderType": this.orders[j].OrderType,
                "WaltzOrderNo":this.orders[j].WaltzOrderNo,
                "OrderNumber" : this.orders[j].OrderNo,
                "CreationDate" : this.orders[j].CreationDate,
                "EditDate" : this.orders[j].EditDate,
                "WinDate" : this.orders[j].WinDate,
                "ProjectName" : this.orders[j].ProjectName,
                "ClientName" : this.orders[j].ClientName,
                "Location" : this.orders[j].Location,
                "ArchitectName" : this.orders[j].Architect,
                "GrandTotal" : this.orders[j].GrandTotal,
                "Discount" : this.orders[j].Discount,
                "FinalAmount" : this.orders[j].FinalAmount,
                "TotalSolutions" : this.orders[j].Solutions.length,
                "WaltzAssociate" : this.orders[j].Associate,
                "Source" : this.orders[j].Source,
                "Status" : this.orders[j].Status,
                "TotalSquarefeet" : this.orders[j].TotalSquareFeet,
                "CSValue" : CSValue,
                "DealerDiscount" : DealerDiscount,
                "Plan" : Plan,
                "PlanValue" : PlanValue,
                "CommercialWinDate":CommercialWinDate,
                "CommercialWinAmount":CommercialWinAmount,
                "CommercialWinPercent":CommercialWinPercent,
                "CommercialType":CommercialType,
                "CommercialRemark": CommercialRemark,
                "HandoverDate":HandoverDate,
                "Party": Party,
                "Expense": Expense,
                "ExpensePercent": ExpensePercent,
                "Outstanding" : Outstanding,
                "Billed" : Billed,
                "SpecialDiscount": SpecialDiscount,
                "BadDebt": BadDebt,
                "ReceiptAdvance": ReceiptAdvance,
                "ChequeRequired": ChequeRequired,
                "Type": Type,
                "Remark": Remark,
                "ProcoreProjectStatus" : ProcoreStatus,
                "ArchitectFirm" : ArchitectFirm,
                "PROJECTNAME": PROJECTNAME,
                "PR_DT": PR_DT,
                "PROJECTTYPE": PROJECTTYPE,
                "JT": JT,
                "PROSTDATE": PROSTDATE,
                "PROENDDATE": PROENDDATE,
                "PROJECTSQM": PROJECTSQM,
                "PROJECTVALUE": PROJECTVALUE,
                "EXPENDITURE": EXPENDITURE,
                "PIR_ID": PIR_ID,
                "NOOBPI": NOOBPI,
                "PIBASICVALUE": PIBASICVALUE,
                "PITOTALVALUE": PITOTALVALUE,
                "CONFIRMPIBASICVALUE": CONFIRMPIBASICVALUE,
                "CONFIRMPITOTALVALUE": CONFIRMPITOTALVALUE,
                "ADVPIAMT": ADVPIAMT,
                "COLLECTIONOFPI": COLLECTIONOFPI,
                "CONFIRMPISQM": CONFIRMPISQM,
                "DISPATCHPISQM": DISPATCHPISQM,
                "BILLTO_PNAME": BILLTO_PNAME,
                "ACC_REP": ACC_REP,
                "HO_REP": HO_REP,
                "PDCCOLLECTION": PDCCOLLECTION,
                "INVOICECOLLECTION": INVOICECOLLECTION,
                "DISPATCHPIVALUE": DISPATCHPIVALUE,
                "POBASICAMT": POBASICAMT,
                "PURCHASEVALUE": PURCHASEVALUE,
                "REJECTIONSQM": REJECTIONSQM,
                "REJECTIONVALUE": REJECTIONVALUE,
                "PROJREFNO": PROJREFNO,
                "PROJWINDTSTR": PROJWINDTSTR,
                "PROJ_WIN_DT": PROJ_WIN_DT,
                "WIPQTY": WIPQTY,
                "RFDQTY": RFDQTY,
                "CSSTATUS" : StatusCs,
                "SHORT CLOSE" : ShortClose,
                "SALES" : Sales,
                "CREDIT NOTE" : CreditNote,
                "DEBIT NOTE" : DebitNote,
                "WRITE OFF":  WriteOff,
                "DISPATCH VALUE": DispatchValue,
                "RFD VALUE" : RFDValue,
                "WIP VALUE" : WIPValue,
                "ARCHITECT_EXPENSES" :ARCHITECT_EXPENSES,
                "COMMISSION_EXPENSE" :COMMISSION_EXPENSE,
                "COMMISSION_ON_SALESB": COMMISSION_ON_SALESB,
                "CONTRACT_LABOUR_CHARGES":CONTRACT_LABOUR_CHARGES,
                "FREIGHT_EXPENSE_ON_SALE" : FREIGHT_EXPENSE_ON_SALE,
                "ONSITE_EXPENSES":ONSITE_EXPENSES,
                "PERFORMANCE_BONUS":PERFORMANCE_BONUS,
                "SOCIAL_FEE" : SOCIAL_FEE,
                "SOCIAL_FEEB" : SOCIAL_FEEB,
                "TRAVELLING_AND_CONVEYANCE_EXPENSES" : TRAVELLING_AND_CONVEYANCE_EXPENSES,
                "TOTAL EXPENDITURE" : TotalExpenditure,
                "PROCOREPRESENT": ProcorePresent,
                "CSPRESENT" : CSPresent
 
              }

              FilteredOrders.push(temp7)

            }

          }

        }

      }

    }


  }










  
  

   
var options = { 
 
  headers:  ["OrderType","WaltzOrderNo","OrderNumber","CreationDate","EditDate","WinDate","ProjectName","ClientName","Location",
  "ArchitectName",
  "GrandTotal",
  "Discount",
  "FinalAmount",
  "TotalSolutions",
  "WaltzAssociate" ,
  "Source" ,
  "Status",
  "TotalSquarefeet",
  "CSValue",
  "DealerDiscount",
  "Plan",
  "PlanValue",
  "CommercialWinDate",
  "CommercialWinAmount",
  "CommercialWinPercent",
  "CommercialType",
  "CommercialRemark",
  "HandoverDate",
  "Party",
  "Expense",
  "ExpensePercent",
  "Outstanding",
  "Billed",
  "SpecialDiscount",
  "BadDebt",
  "ReceiptAdvance",
  "ChequeRequired",
  "Type",
  "Remark",
  "ProcoreProjectStatus",
  "ArchitectFirm",
  "PROJECTNAME",
  "PR_DT",
  "PROJECTTYPE",
  "JT",
  "PROSTDATE",
  "PROENDDATE",
  "PROJECTSQM",
  "PROJECTVALUE",
  "EXPENDITURE",
  "PIR_ID",
  "NOOBPI",
  "PIBASICVALUE",
  "PITOTALVALUE",
  "CONFIRMPIBASICVALUE",
  "CONFIRMPITOTALVALUE",
  "ADVPIAMT",
  "COLLECTIONOFPI",
  "CONFIRMPISQM",
  "DISPATCHPISQM",
  "BILLTO_PNAME",
  "ACC_REP",
  "HO_REP",
  "PDCCOLLECTION",
  "INVOICECOLLECTION",
  "DISPATCHPIVALUE",
  "POBASICAMT",
  "PURCHASEVALUE",
  "REJECTIONSQM",
  "REJECTIONVALUE",
  "PROJREFNO",
  "PROJWINDTSTR",
  "PROJ_WIN_DT",
  "WIPQTY",
  "RFDQTY",
  "CSSTATUS",
  "SHORT CLOSE",
  "SALES",
  "CREDIT NOTE",
  "DEBIT NOTE",
  "WRITE OFF",
  "DISPATCH VALUE",
  "RFD VALUE",
  "WIP VALUE",
  "ARCHITECT_EXPENSES",
  "COMMISSION_EXPENSE",
  "COMMISSION_ON_SALESB",
  "CONTRACT_LABOUR_CHARGES",
  "FREIGHT_EXPENSE_ON_SALE",
  "ONSITE_EXPENSES",
  "PERFORMANCE_BONUS",
  "SOCIAL_FEE",
  "SOCIAL_FEEB",
  "TRAVELLING_AND_CONVEYANCE_EXPENSES",
  "TOTAL EXPENDITURE",
  "PROCOREPRESENT",
  "CSPRESENT"
  
] 
	
};

let FileName = "Order Report"


  


this.WinOrdersList = [];


   
new ngxCsv(FilteredOrders, FileName, options);
})

 }

  }




//===========================================================================================================================


  OnSalesReport()
  {
    if(this.Profile==="ACCOUNTS"||this.Profile==="ADMIN")  
  {
    let SDate = new Date(this.form.value.FromDate)
    let EDate = new Date(this.form.value.ToDate)

    let SDateDate = SDate.getDate();
    let SMonth = SDate.getMonth()+1;
    let SYear = SDate.getFullYear();

    let SMonthFormat='';
    {
    if(SMonth==1)
    {
      SMonthFormat = "Jan"
    }
    if(SMonth==2)
    {
      SMonthFormat = "Feb"
    }
    if(SMonth==3)
    {
      SMonthFormat = "Mar"
    }
    if(SMonth==4)
    {
      SMonthFormat = "Apr"
    }
    if(SMonth==5)
    {
      SMonthFormat = "May"
    }
    if(SMonth==6)
    {
      SMonthFormat = "Jun"
    }
    if(SMonth==7)
    {
      SMonthFormat = "Jul"
    }
    if(SMonth==8)
    {
      SMonthFormat = "Aug"
    }
    if(SMonth==9)
    {
      SMonthFormat = "Sep"
    }
    if(SMonth==10)
    {
      SMonthFormat = "Oct"
    }
    if(SMonth==11)
    {
      SMonthFormat = "Nov"
    }
    if(SMonth==12)
    {
      SMonthFormat = "Dec"
    }
    
    
    } 

    let StartDate = SDateDate+"-" +  SMonthFormat+"-"+SYear;
    
  
    let EDateDate = EDate.getDate();
    let EMonth = EDate.getMonth()+1;
    let EYear = EDate.getFullYear();


    let EMonthFormat='';
    {

    if(EMonth==1)
    {
      EMonthFormat = "Jan"
    }
    if(EMonth==2)
    {
      EMonthFormat = "Feb"
    }
    if(EMonth==3)
    {
      EMonthFormat = "Mar"
    }
    if(EMonth==4)
    {
      EMonthFormat = "Apr"
    }
    if(EMonth==5)
    {
      EMonthFormat = "May"
    }
    if(EMonth==6)
    {
      EMonthFormat = "Jun"
    }
    if(EMonth==7)
    {
      EMonthFormat = "Jul"
    }
    if(EMonth==8)
    {
      EMonthFormat = "Aug"
    }
    if(EMonth==9)
    {
      EMonthFormat = "Sep"
    }
    if(EMonth==10)
    {
      EMonthFormat = "Oct"
    }
    if(EMonth==11)
    {
      EMonthFormat = "Nov"
    }
    if(EMonth==12)
    {
      EMonthFormat = "Dec"
    }

    } 

    let EndDate = EDateDate+"-" +  EMonthFormat+"-"+EYear;


  
    let Statuses = this.form.value.Status;
    let User = this.form.value.User;
    var From = new Date(this.form.value.FromDate)
    From.setHours(0);
    From.setMinutes(0);
    From.setSeconds(0);
    From.setMilliseconds(0); 


    var FromDate = From.getDate()
    var FromMonth = From.getMonth()+ 1;
    var FromYear = From.getFullYear();
    
    var To = new Date(this.form.value.ToDate)
  
    var ToDate = To.getDate();
    var ToMonth = To.getMonth() + 1;
    var ToYear = To.getFullYear();




    let ArchitectTemp = []



    this.ProcoreArchitects.map((item)=>{
      let Trades = ""
      if(item.trades.length>0)
      {
        Trades = item.trades[0].name
      }
      
      
      if(item.project_ids.length>0)
      {
        if(Trades ==="Pro Plus Architect"||Trades==="Pro Architect"||Trades==="PMC"||Trades==="Self")
        {
          for(var i=0; i<item.project_ids.length;i++)
          {  

           let Tradestemp = "";
           let CostCodetemp = ""

           if(item.trades.length>0)
           {
            Tradestemp = item.trades[0].name
           }
           if(item.standard_cost_codes.length>0)
           {

           
            CostCodetemp = item.standard_cost_codes[0].code
           }

           
            let temp = {ArchitectFirm : item.name,ProjectID :item.project_ids[i],Trade :Tradestemp ,CostCode : CostCodetemp }
            ArchitectTemp.push(temp)
          }
        }
        
      }
  
   
    
  
    })

  
  
    var ArchProList =[]


   
  
    for(var j=0;j<this.procoreProjects.length;j++)
    {
      for(var k=0;k<ArchitectTemp.length;k++)
      {
        if(ArchitectTemp[k].ProjectID===this.procoreProjects[j].id)
        {
   
          let ProcoreRefNo ="";
  
               if(this.procoreProjects[j].project_number.includes("/V-"))
               {
                ProcoreRefNo = this.procoreProjects[j].project_number.toString().split("/V-")[0]
               }
               if(!this.procoreProjects[j].project_number.includes("/V-"))
               {
                ProcoreRefNo = this.procoreProjects[j].project_number
               }
  
              
           let temp = {ArchitectFirm :ArchitectTemp[k].ArchitectFirm, OrderNo : ProcoreRefNo ,CostCode : ArchitectTemp[k].CostCode , Trade : ArchitectTemp[k].Trade }
           ArchProList.push(temp)

         
           
  
        }
      }
    }


    for(var j = 0;j<this.orders.length; j++)
    {

   if(this.orders[j].Status!=="Pipeline")
   {

    let OrderProjectRefNo = ""

    if(this.orders[j].OrderNo.includes("/V-"))
    {
     let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
     let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
     let slash = tempproref.lastIndexOf("/");
     let proref = tempproref.substring(slash + 1, hyphen); 
     OrderProjectRefNo = proref
    }
 
    if(!this.orders[j].OrderNo.includes("/V-"))
    {
     let slash = this.orders[j].OrderNo.lastIndexOf("/");
     let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
     OrderProjectRefNo = proref
    }

   

    for(var k =0; k<ArchProList.length; k++)
    {


      if(Number(ArchProList[k].OrderNo)==Number(OrderProjectRefNo))
      {

        this.orders[j].ProjectManager = ArchProList[k].CostCode
        this.orders[j].Completed = ArchProList[k].ArchitectFirm
        this.orders[j].Active = ArchProList[k].Trade 
      }
    }



   }
     

    }



    this.reportsService.GetOrdersForSR(StartDate,EndDate).subscribe((response)=>{

      let DataCS :any = [{Order : this.orders,CSData : response}]
      let CSData = JSON.parse(DataCS[0].CSData);


      let Report = []
      let Breakup = []
    
  
     
    

  

     
      
     for(var i = 0;i<CSData.length;i++)
     {
     
     let SalesPerson1 = "";
     let Source1 = "";
     let CostCode1 = "";
     let ArchitectFirm1 = "";
     let Trade1 = "";
     var ExpenseArray = [];
   

     
    
  

     for(var j = 0;j<this.orders.length; j++)
     {

      if(this.orders[j].Status!=="Pipeline")
      {

        let OrderProjectRefNo = ""

        if(this.orders[j].OrderNo.includes("/V-"))
        {
         let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
         let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         OrderProjectRefNo = proref
        }
     
        if(!this.orders[j].OrderNo.includes("/V-"))
        {
         let slash = this.orders[j].OrderNo.lastIndexOf("/");
         let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
         OrderProjectRefNo = proref
        }
  
       
  
         if(Number(OrderProjectRefNo)==Number(CSData[i].PROJREFNO))
         {
  
              SalesPerson1 = this.orders[j].Associate  
              Source1 = this.orders[j].Source
              CostCode1 = this.orders[j].ProjectManager
              ArchitectFirm1 = this.orders[j].Completed
              Trade1 = this.orders[j].Active
  
              let TotalExpenditure = 0;
              
              let ARCHITECT_EXPENSES =0
              let COMMISSION_EXPENSE =0 
              let COMMISSION_ON_SALESB =0 
              let CONTRACT_LABOUR_CHARGES =0 
              let FREIGHT_EXPENSE_ON_SALE =0  
              let ONSITE_EXPENSES =0
              let PERFORMANCE_BONUS =0 
              let SOCIAL_FEE =0
              let SOCIAL_FEEB =0 
              let TRAVELLING_AND_CONVEYANCE_EXPENSES =0
              let WALTZ_ARCHITECT_EXPENSES =0
              let WALTZ_CONTRACTUAL_FEE =0
              let WALTZ_OTHER_COMMISSION_CHARGES =0
              let OTHER_COMMISSION_EXPENSES = 0;
              
              
              if(CSData[i].EXPENSE_DET)
              {
                ExpenseArray = CSData[i].EXPENSE_DET.split(",")
              }
  
              console.log(CSData[i].EXPENSE_DET)
  
              if(ExpenseArray.length>0)
              {
                for(var k =0; k<ExpenseArray.length;k++)
                {
                  let Field = ExpenseArray[k].split("~")[0]
                  if(Field==="ARCHITECT EXPENSES")
                  {
                    ARCHITECT_EXPENSES = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="COMMISSION EXPENSE")
                  {
                    COMMISSION_EXPENSE = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="COMMISSION ON SALES-B")
                  {
                    COMMISSION_ON_SALESB = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="CONTRACT LABOUR CHARGES")
                  {
                    CONTRACT_LABOUR_CHARGES = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                  {
                    FREIGHT_EXPENSE_ON_SALE = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="ONSITE EXPENSES")
                  {
                    ONSITE_EXPENSES = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="PERFORMANCE BONUS")
                  {
                    PERFORMANCE_BONUS = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="SOCIAL FEE")
                  {
                    SOCIAL_FEE = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="SOCIAL FEE - B")
                  {
                    SOCIAL_FEEB = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                  {
                    TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="WALTZ ARCHITECT EXPENSES")
                  {
                    WALTZ_ARCHITECT_EXPENSES = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="WALTZ CONTRACTUAL FEE")
                  {
                    WALTZ_CONTRACTUAL_FEE = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="WALTZ OTHER COMMISSION CHARGES")
                  {
                    WALTZ_OTHER_COMMISSION_CHARGES = ExpenseArray[k].split("~")[1]
                  }
                  if(Field==="OTHER_COMMISSION_EXPENSES")
                  {
                    OTHER_COMMISSION_EXPENSES = ExpenseArray[k].split("~")[1]
                  }
  
  
                }
  
                TotalExpenditure = Number(ARCHITECT_EXPENSES) + Number(COMMISSION_EXPENSE) + Number(COMMISSION_ON_SALESB) + Number(CONTRACT_LABOUR_CHARGES) + Number(FREIGHT_EXPENSE_ON_SALE) + Number(ONSITE_EXPENSES) + Number(PERFORMANCE_BONUS) + Number(SOCIAL_FEE) + Number(SOCIAL_FEEB) + Number(TRAVELLING_AND_CONVEYANCE_EXPENSES) + Number(WALTZ_ARCHITECT_EXPENSES)+Number(WALTZ_CONTRACTUAL_FEE)   + Number(OTHER_COMMISSION_EXPENSES)
  
              }
  
  
  
  
              var temp = {
                ProjectRefNo : CSData[i].PROJREFNO,
                ProjectName:CSData[i].PROJECTNAME,
                Collection: CSData[i].Collection,
                PDCCollection : CSData[i].PdcCollection,
                Sales : CSData[i].Sales,
                WAAssociate : this.orders[j].Associate,  
                Source : this.orders[j].Source,
                ArchitectFirm : this.orders[j].Completed,
                Trade : this.orders[j].Active,
                CostCode  : this.orders[j].ProjectManager,
                COMMISSION_EXPENSE  : COMMISSION_EXPENSE,
                COMMISSION_ON_SALESB  : COMMISSION_ON_SALESB ,
                CONTRACT_LABOUR_CHARGES : CONTRACT_LABOUR_CHARGES, 
                FREIGHT_EXPENSE_ON_SALE : FREIGHT_EXPENSE_ON_SALE,  
                ONSITE_EXPENSES : ONSITE_EXPENSES,
                PERFORMANCE_BONUS : PERFORMANCE_BONUS,
                SOCIAL_FEE : SOCIAL_FEE,
                SOCIAL_FEEB :SOCIAL_FEEB ,
                TRAVELLING_AND_CONVEYANCE_EXPENSES : TRAVELLING_AND_CONVEYANCE_EXPENSES,
                OTHER_COMMISSION_EXPENSES :  OTHER_COMMISSION_EXPENSES,
                WALTZ_ARCHITECT_EXPENSES :  WALTZ_ARCHITECT_EXPENSES,
                WALTZ_CONTRACTUAL_FEE : WALTZ_CONTRACTUAL_FEE,
                WALTZ_OTHER_COMMISSION_CHARGES : WALTZ_OTHER_COMMISSION_CHARGES,
                TOTAL_EXPENDITURE : TotalExpenditure
             
                
        
              }
          
         
              Report.push(temp)
  
         }

      }
     

     
    


      
     }



    




   
 


  

    


     

  




    }






   



    this.WaltzAssociate
    this.Sales = 0;
    this.SalesCollection = 0;
    this.PDCCollection = 0 ; 

    this.ComWinCount = 0;
    this.ComWinVal = 0;
    this.BeforeDiscount = 0;
    this.PipeCount = 0;
    this.PipeCsValue = 0;
    

    
    if(User!=="ALL")
    { 
      
      
      this.WaltzAssociate = this.form.value.User
      for(var j = 0 ; j < this.orders.length ; j ++)
      {

         if(this.orders[j].CreationDate&&this.orders[j].Status==="Pipeline")
         {
        if(this.orders[j].Associate===this.form.value.User)
        {
        var EditDate = Number(this.orders[j].CreationDate.split('-')[0])
        var EditMonth = Number(this.orders[j].CreationDate.split('-')[1])
        var EditYear = Number(this.orders[j].CreationDate.split('-')[2])
        var DateFormatEdit = EditMonth+ "/" + EditDate + "/" + EditYear        
        
        var EditDateTest=new Date(DateFormatEdit)
        EditDateTest.setHours(0);
        EditDateTest.setMinutes(0);
        EditDateTest.setSeconds(0);
        EditDateTest.setMilliseconds(0);
        
        
        let DealerDiscount = '';

        this.users.map((item)=>{
          if(item.UserFullName===this.orders[j].Associate)
          {
            DealerDiscount = item.DealerDiscount
          }
        })

        let CSValue = "";

        if(DealerDiscount!=="0")
        {
         CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
        }
        if(DealerDiscount==="0")
        {
          CSValue = this.orders[j].FinalAmount
        }


     

        if(EditDateTest<=To&&EditDateTest>=From)
        {
         console.log("EditDateTest"+EditDateTest)
         console.log("To"+To)
         console.log("From"+From)

         


          this.PipeCount = this.PipeCount + 1;

          console.log(this.orders[j].OrderNo)
          this.PipeCsValue = this.PipeCsValue + Number(CSValue)
        }
         }
         }
         if(this.orders[j].CommercialWinDate)
         {
          if(this.orders[j].Associate===this.form.value.User)
        {

        var WinDate = Number(this.orders[j].CommercialWinDate.split('-')[0])
        var WinMonth = Number(this.orders[j].CommercialWinDate.split('-')[1])
        var WinYear = Number(this.orders[j].CommercialWinDate.split('-')[2])
        
        var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear  
        
      
        
        var winDatetest = new Date(DateFormat)

        winDatetest.setHours(0);
        winDatetest.setMinutes(0);
        winDatetest.setSeconds(0);
        winDatetest.setMilliseconds(0);

        if(winDatetest>=From&&winDatetest<=To)
        {

          let OrderProjectRefNo = ""

          if(this.orders[j].OrderNo.includes("/V-"))
          {
           let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
           let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
           let slash = tempproref.lastIndexOf("/");
           let proref = tempproref.substring(slash + 1, hyphen); 
           OrderProjectRefNo = proref
          }
       
          if(!this.orders[j].OrderNo.includes("/V-"))
          {
           let slash = this.orders[j].OrderNo.lastIndexOf("/");
           let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
           OrderProjectRefNo = proref
          }
       
           
          let DealerDiscount = '';

          this.users.map((item)=>{
            if(item.UserFullName===this.orders[j].Associate)
            {
              DealerDiscount = item.DealerDiscount
            }
          })


          this.specialrequests.map((item)=>{
            if(item.OrderNo===OrderProjectRefNo)
            {
              DealerDiscount = item.NewDealerDiscount
            }
          })
          
          let CSValue = "";

          if(DealerDiscount!=="0")
          {
           CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
          }
          if(DealerDiscount==="0")
          {
            CSValue = this.orders[j].FinalAmount
          }


          this.ComWinCount = this.ComWinCount + 1;
          this.ComWinVal = this.ComWinVal + Number(CSValue)
          this.BeforeDiscount = this.BeforeDiscount  + Number(this.orders[j].GrandTotal)
           
        }

          }
         }

      }

    
      for(var i = 0; i< Report.length; i++)
      {


       
      if(Report[i].WAAssociate===this.form.value.User)
      {

        this.Sales = this.Sales + Number(Report[i].Sales)
        this.SalesCollection = this.SalesCollection  + Number(Report[i].Collection)
        this.PDCCollection = this.PDCCollection + Number(Report[i].PDCCollection)

        Breakup.push(Report[i])

      }

       
      }

      var options2 = { 
        headers:  [
          "ProjectRefNo",
          "ProjectName",
          "Collection",
          "PDCCollection",
          "Sales",
          "WAAssociate",
          "Source",
          "ArchitectFirm",
          "Trade",
          "CostCode",
          "COMMISSION_EXPENSE",
          "COMMISSION_ON_SALESB",
          "CONTRACT_LABOUR_CHARGES", 
          "FREIGHT_EXPENSE_ON_SALE",  
          "ONSITE_EXPENSES",
          "PERFORMANCE_BONUS",
          "SOCIAL_FEE",
          "SOCIAL_FEEB",
          "TRAVELLING_AND_CONVEYANCE_EXPENSES",
          "OTHER_COMMISSION_EXPENSES",
          "WALTZ_ARCHITECT_EXPENSES" ,
          "WALTZ_CONTRACTUAL_FEE" ,
          "WALTZ_OTHER_COMMISSION_CHARGES",
          "TOTAL_EXPENDITURE"
          
      ]
        
      };
  
      
      new ngxCsv(Breakup, "SalesCollectionBreakUp", options2);







    }

    if(User==="ALL")
    {

      this.WaltzAssociate = "ALL"
        

        for(var j = 0 ; j < this.orders.length ; j ++)
        {



          if(this.orders[j].CreationDate&&this.orders[j].Status==="Pipeline")
          {
          var EditDate = Number(this.orders[j].CreationDate.split('-')[0])
          var EditMonth = Number(this.orders[j].CreationDate.split('-')[1])
          var EditYear = Number(this.orders[j].CreationDate.split('-')[2])
          var DateFormatEdit = EditMonth+ "/" + EditDate + "/" + EditYear        
          
          var EditDateTest=new Date(DateFormatEdit)

          
          EditDateTest.setHours(0);
          EditDateTest.setMinutes(0);
          EditDateTest.setSeconds(0);
          EditDateTest.setMilliseconds(0);

          
          let DealerDiscount = '';

          this.users.map((item)=>{
            if(item.UserFullName===this.orders[j].Associate)
            {
              DealerDiscount = item.DealerDiscount
            }
          })

          let CSValue = "";

          if(DealerDiscount!=="0")
          {
           CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
          }
          if(DealerDiscount==="0")
          {
            CSValue = this.orders[j].FinalAmount
          }


       

          if(EditDateTest<=To&&EditDateTest>=From)
          {
           
            this.PipeCount = this.PipeCount + 1;
            this.PipeCsValue = this.PipeCsValue + Number(CSValue)
          }
           }



           if(this.orders[j].CommercialWinDate)
        {

          var WinDate = Number(this.orders[j].CommercialWinDate.split('-')[0])
          var WinMonth = Number(this.orders[j].CommercialWinDate.split('-')[1])
          var WinYear = Number(this.orders[j].CommercialWinDate.split('-')[2])
          var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
          
          var winDatetest = new Date(DateFormat)

          winDatetest.setHours(0);
          winDatetest.setMinutes(0);
          winDatetest.setSeconds(0);
          winDatetest.setMilliseconds(0);

          

          if(winDatetest>=From&&winDatetest<=To)
          {

            let OrderProjectRefNo = ""

            if(this.orders[j].OrderNo.includes("/V-"))
            {
             let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
             let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
             let slash = tempproref.lastIndexOf("/");
             let proref = tempproref.substring(slash + 1, hyphen); 
             OrderProjectRefNo = proref
            }
         
            if(!this.orders[j].OrderNo.includes("/V-"))
            {
             let slash = this.orders[j].OrderNo.lastIndexOf("/");
             let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
             OrderProjectRefNo = proref
            }
         
             
            let DealerDiscount = '';

            this.users.map((item)=>{
              if(item.UserFullName===this.orders[j].Associate)
              {
                DealerDiscount = item.DealerDiscount
              }
            })


            this.specialrequests.map((item)=>{
              if(item.OrderNo===OrderProjectRefNo)
              {
                DealerDiscount = item.NewDealerDiscount
              }
            })
            
            let CSValue = "";

            if(DealerDiscount!=="0")
            {
             CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
            }
            if(DealerDiscount==="0")
            {
              CSValue = this.orders[j].FinalAmount
            }


            this.ComWinCount = this.ComWinCount + 1;
            this.ComWinVal = this.ComWinVal + Number(CSValue)
            this.BeforeDiscount = this.BeforeDiscount  + Number(this.orders[j].GrandTotal)


         
             
          }

          }

  
        }

      
        for(var i = 0; i< Report.length; i++)
        {



          
          this.Sales = this.Sales + Number(Report[i].Sales)
          this.SalesCollection = this.SalesCollection  + Number(Report[i].Collection)
          this.PDCCollection = this.PDCCollection + Number(Report[i].PDCCollection)

          
        }

      
        var options2 = { 
          headers:  [
            "ProjectRefNo",
            "ProjectName",
            "Collection",
            "PDCCollection",
            "Sales",
            "WAAssociate",
            "Source",
            "ArchitectFirm",
            "Trade",
            "CostCode",
            "COMMISSION_EXPENSE",
            "COMMISSION_ON_SALESB",
            "CONTRACT_LABOUR_CHARGES", 
            "FREIGHT_EXPENSE_ON_SALE",  
            "ONSITE_EXPENSES",
            "PERFORMANCE_BONUS",
            "SOCIAL_FEE",
            "SOCIAL_FEEB",
            "TRAVELLING_AND_CONVEYANCE_EXPENSES",
            "OTHER_COMMISSION_EXPENSES",
            "WALTZ_ARCHITECT_EXPENSES",
            "WALTZ_CONTRACTUAL_FEE",
            "WALTZ_OTHER_COMMISSION_CHARGES",
            "TOTAL_EXPENDITURE"
        ]
          
        };

     
        new ngxCsv(Report, "SalesCollectionBreakUp", options2);
   
      
    }
    

    let ExcelSalesReport =[]

    let temp1 = ["Waltz Associate" , this.WaltzAssociate]
    ExcelSalesReport.push(temp1)

    let temp2 = ["Sales" , this.Sales]
    ExcelSalesReport.push(temp2)

    let temp3 = ["Collection" , this.SalesCollection]
    ExcelSalesReport.push(temp3)

    let temp4 = ["PDC Collection" , this.PDCCollection]
    ExcelSalesReport.push(temp4)

    let temp5 = ["Commercial Win Count" , this.ComWinCount ]
    ExcelSalesReport.push(temp5)
    
    let temp6 = ["Commercial Win Value" , this.ComWinVal]
    ExcelSalesReport.push(temp6)

    let temp7 = ["Before Discount Value" , this.BeforeDiscount]
    ExcelSalesReport.push(temp7)

    let temp8 = ["Pipeline Count" , this.PipeCount]
    ExcelSalesReport.push(temp8)

    let temp9 =  ["Pipeline Value" , this.PipeCsValue]
    ExcelSalesReport.push(temp9)


   
    var options = { 
      
    };
    
    new ngxCsv(ExcelSalesReport, "Sales", options);

  



    this.salesreportflag = true;

    })






  }

  }



//=======================================================GET PRO PLUS REPORT=================================================

 GetProPlusReport()
{
 let ArchitectTemp = []



  this.ProcoreArchitects.map((item)=>{

    let Trades = ""
   
    if(item.trades.length>0)
    {
      Trades = item.trades[0].name
    }
    
    
    if(item.project_ids.length>0)
    {
      if(Trades==="Pro Plus Architect"||Trades==="Pro Architect")
      {
        for(var i=0; i<item.project_ids.length;i++)
        {
          let temp = {ArchitectFirm : item.name,ProjectID :item.project_ids[i] }
          ArchitectTemp.push(temp)
        }
      }
      
    }

 
  

  })

  let ArchProList =[]

  for(var j=0;j<this.procoreProjects.length;j++)
  {
    for(var k=0;k<ArchitectTemp.length;k++)
    {
      if(ArchitectTemp[k].ProjectID===this.procoreProjects[j].id)
      {
 
        let ProcoreRefNo ="";

             if(this.procoreProjects[j].project_number.includes("/V-"))
             {
              ProcoreRefNo = this.procoreProjects[j].project_number.toString().split("/V-")[0]
             }
             if(!this.procoreProjects[j].project_number.includes("/V-"))
             {
              ProcoreRefNo = this.procoreProjects[j].project_number
             }


            
         let temp = {ArchitectFirm :ArchitectTemp[k].ArchitectFirm, OrderNo : ProcoreRefNo  }
         ArchProList.push(temp)

      }
    }
  }

  

  

  let SDate = new Date(this.form.value.FromDate)
  let EDate = new Date(this.form.value.ToDate)

  
  let SDateDate = SDate.getDate();
  let SMonth = SDate.getMonth()+1;
  let SYear = SDate.getFullYear();





  let SMonthFormat='';
  if(SMonth==1)
  {
    SMonthFormat = "Jan"
  }
  if(SMonth==2)
  {
    SMonthFormat = "Feb"
  }
  if(SMonth==3)
  {
    SMonthFormat = "Mar"
  }
  if(SMonth==4)
  {
    SMonthFormat = "Apr"
  }
  if(SMonth==5)
  {
    SMonthFormat = "May"
  }
  if(SMonth==6)
  {
    SMonthFormat = "Jun"
  }
  if(SMonth==7)
  {
    SMonthFormat = "Jul"
  }
  if(SMonth==8)
  {
    SMonthFormat = "Aug"
  }
  if(SMonth==9)
  {
    SMonthFormat = "Sep"
  }
  if(SMonth==10)
  {
    SMonthFormat = "Oct"
  }
  if(SMonth==11)
  {
    SMonthFormat = "Nov"
  }
  if(SMonth==12)
  {
    SMonthFormat = "Dec"
  }


  let StartDate = SDateDate+"-" +  SMonthFormat+"-"+SYear;
  


  
  let EDateDate = EDate.getDate();
  let EMonth = EDate.getMonth()+1;
  let EYear = EDate.getFullYear();


  let EMonthFormat='';
  if(EMonth==1)
  {
    EMonthFormat = "Jan"
  }
  if(EMonth==2)
  {
    EMonthFormat = "Feb"
  }
  if(EMonth==3)
  {
    EMonthFormat = "Mar"
  }
  if(EMonth==4)
  {
    EMonthFormat = "Apr"
  }
  if(EMonth==5)
  {
    EMonthFormat = "May"
  }
  if(EMonth==6)
  {
    EMonthFormat = "Jun"
  }
  if(EMonth==7)
  {
    EMonthFormat = "Jul"
  }
  if(EMonth==8)
  {
    EMonthFormat = "Aug"
  }
  if(EMonth==9)
  {
    EMonthFormat = "Sep"
  }
  if(EMonth==10)
  {
    EMonthFormat = "Oct"
  }
  if(EMonth==11)
  {
    EMonthFormat = "Nov"
  }
  if(EMonth==12)
  {
    EMonthFormat = "Dec"
  }


  let EndDate = EDateDate+"-" +  EMonthFormat+"-"+EYear;



  let Statuses = this.form.value.Status;
  let User = this.form.value.User;
  var From = new Date(this.form.value.FromDate)

  
  var To = new Date(this.form.value.ToDate)




  this.reportsService.getCSDataBulk(StartDate,EndDate).subscribe((response)=>{


    let ProPlusReportTemp = []

    let DataCS :any = [{Order : this.orders,CSData : response}]
    let CSData = JSON.parse(DataCS[0].CSData);



    
        for(var j = 0 ; j < this.orders.length ; j ++)
        {

          if(User==="ALL")
          {
          if(this.orders[j].CommercialWinDate)
          {

               

            var WinDate = Number(this.orders[j].CommercialWinDate.split('-')[0])
            var WinMonth = Number(this.orders[j].CommercialWinDate.split('-')[1])
            var WinYear = Number(this.orders[j].CommercialWinDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
            
            var winDatetest = new Date(DateFormat)

            if(winDatetest>=From&&winDatetest<=To)
            {

             
            
            let OrderProjectRefNo = ""

            if(this.orders[j].OrderNo.includes("/V-"))
            {
             let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
             let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
             let slash = tempproref.lastIndexOf("/");
             let proref = tempproref.substring(slash + 1, hyphen); 
             OrderProjectRefNo = proref
            }
         
            if(!this.orders[j].OrderNo.includes("/V-"))
            {
             let slash = this.orders[j].OrderNo.lastIndexOf("/");
             let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
             OrderProjectRefNo = proref
            }
         
             
            let DealerDiscount = '';

            this.users.map((item)=>{
              if(item.UserFullName===this.orders[j].Associate)
              {
                DealerDiscount = item.DealerDiscount
              }
            })


            this.specialrequests.map((item)=>{
              if(item.OrderNo===OrderProjectRefNo)
              {
                DealerDiscount = item.NewDealerDiscount
              }
            })
            
            let CSValue = "";

            if(DealerDiscount!=="0")
            {
             CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
            }
            if(DealerDiscount==="0")
            {
              CSValue = this.orders[j].FinalAmount
            }



             let CommercialWinDate = this.orders[j].CommercialWinDate
             let ProjectName = this.orders[j].ProjectName
             let OrderNo =  OrderProjectRefNo
             let SalesHead =  this.orders[j].Associate
             let Source = this.orders[j].Source
             let GrandTotal = this.orders[j].GrandTotal
             let ClientDiscount = this.orders[j].Discount
             let CSStatus = ""
             let ArchitectFirm = ""
             let ProPlusValue = 0
             let PartyName = "";
             let Collection = 0;
             let CreditNote = 0;
             let NetCollection = 0;
             let Basic = 0;
             let ArchitectCommisionDue = 0;
             let AlreadyPaid = 0;
             let TobePaid = 0;
             let Sorting =""
             let Plan = ""
             let WriteOff = 0;
             let Due = 0;
             let Booked = 0;
             let BillRequired = 0;
             let ReportTagging ="";

             for(var p= 0;p<ArchProList.length; p++)
             {
              if(OrderProjectRefNo ===ArchProList[p].OrderNo)
              {
                ArchitectFirm = ArchProList[p].ArchitectFirm
              }

             }
             
             

             this.ledgerdetails.map((item)=>{

              let LedRefno = ""
              

              
              if(item.OrderNumber.includes("/V-"))
              {
               let hyphen = item.OrderNumber.lastIndexOf("/V-");
               let tempproref = item.OrderNumber.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               LedRefno = proref
              }
       
             if(!item.OrderNumber.includes("/V-"))
             {
               let slash = item.OrderNumber.lastIndexOf("/");
               let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
               LedRefno = proref
             }
  
             if(LedRefno===OrderProjectRefNo)
             {
              if(item.ProPlusCost)
              {
                ProPlusValue = Number(item.ProPlusCost)
              }
             
             }

             })
   


             Sorting = SalesHead +"_"+ ArchitectFirm
           
             let ExpenseArray = []
             let ARCHITECT_EXPENSES = 0
             let COMMISSION_EXPENSE = 0
             let COMMISSION_ON_SALESB = 0
             let CONTRACT_LABOUR_CHARGES = 0
             let FREIGHT_EXPENSE_ON_SALE = 0
             let ONSITE_EXPENSES = 0
             let PERFORMANCE_BONUS = 0
             let SOCIAL_FEE = 0
             let SOCIAL_FEEB = 0
             let TRAVELLING_AND_CONVEYANCE_EXPENSES = 0


                 

             CSData.map((item)=>{

              if(OrderProjectRefNo===item.PROJREFNO)
              {
                 
              
                  
                  if(item.EXPENDITURE)
                  {
                    ExpenseArray = item.EXPENDITURE.split(",")
                  }
                  

                  if(ExpenseArray.length>0)
                  {
                    for(var i =0; i<ExpenseArray.length;i++)
                    {
                      let Field = ExpenseArray[i].split("~")[0]
                      if(Field==="ARCHITECT EXPENSES")
                      {
                        ARCHITECT_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION EXPENSE")
                      {
                        COMMISSION_EXPENSE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION ON SALES-B")
                      {
                        COMMISSION_ON_SALESB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="CONTRACT LABOUR CHARGES")
                      {
                        CONTRACT_LABOUR_CHARGES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                      {
                        FREIGHT_EXPENSE_ON_SALE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="ONSITE EXPENSES")
                      {
                        ONSITE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="PERFORMANCE BONUS")
                      {
                        PERFORMANCE_BONUS = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE")
                      {
                        SOCIAL_FEE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE - B")
                      {
                        SOCIAL_FEEB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                      {
                        TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }



                    }
                  }

                  CSStatus = item.status
                  WriteOff = Number(item.wriite_off)
                  PartyName = item.BILLTO_PNAME;
                  Collection = Number(item.DISPATCHPIVALUE) + Number(item.PDCCOLLECTION);
                  CreditNote = Number(item.credit_note);
                  NetCollection = Collection - CreditNote-WriteOff;
                  Due = 100*(NetCollection*Number(ProPlusValue)*0.01)/118
                  Basic = 100*NetCollection/118;
                  ArchitectCommisionDue = Number(ProPlusValue)*Basic*0.01;
                  Booked = Number(ARCHITECT_EXPENSES);
                  BillRequired = Due - Booked;
                  if(BillRequired>1)
                  {
                    ReportTagging = "Due"
                  }

                  if(BillRequired<-1)
                  {
                    ReportTagging = "OverBooked"
                  }

                  if(BillRequired>-1&&BillRequired<1)
                  {
                    ReportTagging = "Nil"
                  }
                  

                
        
              }

             })
             


          


           




       
             


               var temp57 = {
                "WAName" : SalesHead,
                "ArchitectFirm": ArchitectFirm,
                "ProjectName": ProjectName,
                "OrderNumber": OrderNo,
                "CommercialWinDate":CommercialWinDate,
                "Collection": Collection,
                "CreditNote": CreditNote,
                "WriteOff" : WriteOff,
                "NetCollection": NetCollection,
                "ProPlusPercent":ProPlusValue,
                "Due" : Due,
                "Booked" : Booked,
                "BillRequired" : BillRequired,
                "ReportTagging" : ReportTagging,
                "WA Comments" : "",
                "Sorting" : Sorting


                
              
              }

              ProPlusReportTemp.push(temp57)

            }

          }

          }


          if(User!=="ALL")
          {
          if(this.orders[j].CommercialWinDate&&this.orders[j].Associate===User)
          {

               

            var WinDate = Number(this.orders[j].CommercialWinDate.split('-')[0])
            var WinMonth = Number(this.orders[j].CommercialWinDate.split('-')[1])
            var WinYear = Number(this.orders[j].CommercialWinDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
            
            var winDatetest = new Date(DateFormat)

            if(winDatetest>=From&&winDatetest<=To)
            {

             
            
            let OrderProjectRefNo = ""

            if(this.orders[j].OrderNo.includes("/V-"))
            {
             let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
             let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
             let slash = tempproref.lastIndexOf("/");
             let proref = tempproref.substring(slash + 1, hyphen); 
             OrderProjectRefNo = proref
            }
         
            if(!this.orders[j].OrderNo.includes("/V-"))
            {
             let slash = this.orders[j].OrderNo.lastIndexOf("/");
             let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
             OrderProjectRefNo = proref
            }
         
             
            let DealerDiscount = '';

            this.users.map((item)=>{
              if(item.UserFullName===this.orders[j].Associate)
              {
                DealerDiscount = item.DealerDiscount
              }
            })


            this.specialrequests.map((item)=>{
              if(item.OrderNo===OrderProjectRefNo)
              {
                DealerDiscount = item.NewDealerDiscount
              }
            })
            
            let CSValue = "";

            if(DealerDiscount!=="0")
            {
             CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
            }
            if(DealerDiscount==="0")
            {
              CSValue = this.orders[j].FinalAmount
            }



             let CommercialWinDate = this.orders[j].CommercialWinDate
             let ProjectName = this.orders[j].ProjectName
             let OrderNo =  OrderProjectRefNo
             let SalesHead =  this.orders[j].Associate
             let Source = this.orders[j].Source
             let GrandTotal = this.orders[j].GrandTotal
             let ClientDiscount = this.orders[j].Discount
             let CSStatus = ""
             let ArchitectFirm = ""
             let ProPlusValue = 0
             let PartyName = "";
             let Collection = 0;
             let CreditNote = 0;
             let NetCollection = 0;
             let Basic = 0;
             let ArchitectCommisionDue = 0;
             let AlreadyPaid = 0;
             let TobePaid = 0;
             let Sorting =""
             let Plan = ""
             let WriteOff = 0;
             let Due = 0;
             let Booked = 0;
             let BillRequired = 0;
             let ReportTagging ="";

             for(var p= 0;p<ArchProList.length; p++)
             {
              if(OrderProjectRefNo ===ArchProList[p].OrderNo)
              {
                ArchitectFirm = ArchProList[p].ArchitectFirm
              }

             }
             
             

             this.ledgerdetails.map((item)=>{

              let LedRefno = ""
              

              
              if(item.OrderNumber.includes("/V-"))
              {
               let hyphen = item.OrderNumber.lastIndexOf("/V-");
               let tempproref = item.OrderNumber.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               LedRefno = proref
              }
       
             if(!item.OrderNumber.includes("/V-"))
             {
               let slash = item.OrderNumber.lastIndexOf("/");
               let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
               LedRefno = proref
             }
  
             if(LedRefno===OrderProjectRefNo)
             {
              if(item.ProPlusCost)
              {
                ProPlusValue = Number(item.ProPlusCost)
              }
             
             }

             })
   


             Sorting = SalesHead +"_"+ ArchitectFirm
           
             let ExpenseArray = []
             let ARCHITECT_EXPENSES = 0
             let COMMISSION_EXPENSE = 0
             let COMMISSION_ON_SALESB = 0
             let CONTRACT_LABOUR_CHARGES = 0
             let FREIGHT_EXPENSE_ON_SALE = 0
             let ONSITE_EXPENSES = 0
             let PERFORMANCE_BONUS = 0
             let SOCIAL_FEE = 0
             let SOCIAL_FEEB = 0
             let TRAVELLING_AND_CONVEYANCE_EXPENSES = 0



           

            
                  

             CSData.map((item)=>{

              if(OrderProjectRefNo===item.PROJREFNO)
              {
                 
              
                  
                  if(item.EXPENDITURE)
                  {
                    ExpenseArray = item.EXPENDITURE.split(",")
                  }
                  

                  if(ExpenseArray.length>0)
                  {
                    for(var i =0; i<ExpenseArray.length;i++)
                    {
                      let Field = ExpenseArray[i].split("~")[0]
                      if(Field==="ARCHITECT EXPENSES")
                      {
                        ARCHITECT_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION EXPENSE")
                      {
                        COMMISSION_EXPENSE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="COMMISSION ON SALES-B")
                      {
                        COMMISSION_ON_SALESB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="CONTRACT LABOUR CHARGES")
                      {
                        CONTRACT_LABOUR_CHARGES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="FREIGHT EXPENSE ON SALE (OUTWARD)")
                      {
                        FREIGHT_EXPENSE_ON_SALE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="ONSITE EXPENSES")
                      {
                        ONSITE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="PERFORMANCE BONUS")
                      {
                        PERFORMANCE_BONUS = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE")
                      {
                        SOCIAL_FEE = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="SOCIAL FEE - B")
                      {
                        SOCIAL_FEEB = ExpenseArray[i].split("~")[1]
                      }
                      if(Field==="TRAVELLING AND CONVEYANCE EXPENSES")
                      {
                        TRAVELLING_AND_CONVEYANCE_EXPENSES = ExpenseArray[i].split("~")[1]
                      }



                    }
                  }

                  CSStatus = item.status
                  WriteOff = Number(item.wriite_off)
                  PartyName = item.BILLTO_PNAME;
                  Collection = Number(item.DISPATCHPIVALUE) + Number(item.PDCCOLLECTION);
                  CreditNote = Number(item.credit_note);
                  NetCollection = Collection - CreditNote-WriteOff;
                  Due = 100*(NetCollection*Number(ProPlusValue)*0.01)/118
                  Basic = 100*NetCollection/118;
                  ArchitectCommisionDue = Number(ProPlusValue)*Basic*0.01;
                  Booked = Number(ARCHITECT_EXPENSES);
                  BillRequired = Due - Booked;
                  if(BillRequired>1)
                  {
                    ReportTagging = "Due"
                  }

                  if(BillRequired<-1)
                  {
                    ReportTagging = "OverBooked"
                  }

                  if(BillRequired>-1&&BillRequired<1)
                  {
                    ReportTagging = "Nil"
                  }
                  

                
        
              }

             })
             


          


           




       
             


               var temp57 = {
                "WAName" : SalesHead,
                "ArchitectFirm": ArchitectFirm,
                "ProjectName": ProjectName,
                "OrderNumber": OrderNo,
                "CommercialWinDate":CommercialWinDate,
                "Collection": Collection,
                "CreditNote": CreditNote,
                "WriteOff" : WriteOff,
                "NetCollection": NetCollection,
                "ProPlusPercent":ProPlusValue,
                "Due" : Due,
                "Booked" : Booked,
                "BillRequired" : BillRequired,
                "ReportTagging" : ReportTagging,
                "WA Comments" : "",
                "Sorting" : Sorting


                
              
              }

              ProPlusReportTemp.push(temp57)

            }

          }

          }
        


        }




        ProPlusReportTemp.sort((a, b) => {
          if (a.Sorting < b.Sorting) {
            return -1;
          }
          if (a.Sorting > b.Sorting) {
            return 1;
          }
          return 0;
        })



        var SortedArchitects = []

        for(var i =0; i<ProPlusReportTemp.length; i++)
        {
          if(!SortedArchitects.includes(ProPlusReportTemp[i].Sorting))
          {
            if(Number(ProPlusReportTemp[i].ProPlusPercent)>0)
            {
            SortedArchitects.push(ProPlusReportTemp[i].Sorting)
            }
          }
        }



        var FinalReportTemp = [];
        var SummaryAll = [];
        var ArchitectsSummary = [];

        var StudioCount = 0;
        var TotalAmountDue = 0;
        var TotalBillBooked = 0;
        var TotalBillToBeBooked = 0;


        for(var i =0; i<SortedArchitects.length ; i++ )
        {
           
          var totalDue = 0;
          var totalBooked = 0;
          var totalBillRequired = 0;


       

          for(j = 0; j <ProPlusReportTemp.length; j++)
          {

            if(SortedArchitects[i]===ProPlusReportTemp[j].Sorting&&Number(ProPlusReportTemp[j].ProPlusPercent)>0)
            {   
              totalDue = totalDue + Number(ProPlusReportTemp[j].Due)
              totalBooked = totalBooked + Number(ProPlusReportTemp[j].Booked)
              totalBillRequired = totalBillRequired + Number(ProPlusReportTemp[j].BillRequired)


              let NetCol = ProPlusReportTemp[j].NetCollection

              var Temp = { "WAName" :ProPlusReportTemp[j].WAName ,"ArchitectFirm" : ProPlusReportTemp[j].ArchitectFirm,"ProjectName" : ProPlusReportTemp[j].ProjectName ,"ProRefNo" : ProPlusReportTemp[j].OrderNumber , "Collection" :ProPlusReportTemp[j].Collection , "CreditNote" :ProPlusReportTemp[j].CreditNote ,"WriteOff" :ProPlusReportTemp[j].WriteOff , "NetCollection" : NetCol ,"Proplus": ProPlusReportTemp[j].ProPlusPercent,"Due" : ProPlusReportTemp[j].Due, "Booked" : ProPlusReportTemp[j].Booked, "BillRequired":ProPlusReportTemp[j].BillRequired,"ReportTagging" :ProPlusReportTemp[j].ReportTagging ,"WAComments" :""}
             
              
             
              FinalReportTemp.push(Temp)
               

            }

         
 
          }

          var Temp2 = { "WAName" :"" ,"ArchitectFirm" : "","ProjectName" : "" ,"ProRefNo" : "" , "Collection" :"" , "CreditNote" :"" ,"WriteOff" :"", "NetCollection" : "" ,"Proplus": "","Due" : totalDue, "Booked" : totalBooked, "BillRequired": totalBillRequired,"ReportTagging" :"","WAComments" :""}  
          FinalReportTemp.push(Temp2)

          let Sno = i+1

          var Temp3 = {"Sno." : Sno, "ArchitectFirm": SortedArchitects[i].split("_")[1],"Due" : totalDue, "Booked" : totalBooked, "BillRequired": totalBillRequired }
          ArchitectsSummary.push(Temp3)


          StudioCount = SortedArchitects.length;
          TotalAmountDue = TotalAmountDue + totalDue;
          TotalBillBooked = TotalBillBooked + totalBooked;
          TotalBillToBeBooked = TotalBillToBeBooked + totalBillRequired;

          
        }


        var Temp6 = {"Sno." : "StudioCount", "ArchitectFirm": StudioCount,"Due" :  TotalAmountDue, "Booked" : TotalBillBooked, "BillRequired": TotalBillToBeBooked  }
        ArchitectsSummary.push(Temp6)
 
        



        var options = { 
 
          headers:  [
            "WA Name",
            "ArchitectFirm",
            "ProjectName",
            "OrderNumber",
            "Collection", 
            "CreditNote",
            "WriteOff",
            "NetCollection",
            "ProPlusPercent",
            "Due",
            "Booked",
            "BillRequired",
            "ReportTagging",
            "WA Comments",
          
         ] 
          
        };

       new ngxCsv(FinalReportTemp, "ProPlusDetailedForAll",options);

       var options2 = { 
 
        headers:  [
          "Sno.", 
          "ArchitectFirm",
          "Due",
          "Booked", 
          "BillRequired" 
        ]
        
       
        
       };


     



       new ngxCsv(ArchitectsSummary, "ArchitectsSummaryForAll" ,options2);
     


  })






 }



 GetIncentiveReport()
{
  

  let ArchitectTemp = []



  this.ProcoreArchitects.map((item)=>{

   

    let Trades = ""

    if(item.trades.length>0)
    {
      Trades = item.trades[0].name
    }
    
    if(item.project_ids.length>0)
    {
      if(Trades==="Pro Plus Architect"||Trades==="Pro Architect")
      {
        for(var i=0; i<item.project_ids.length;i++)
        {
          let temp = {ArchitectFirm : item.name,ProjectID :item.project_ids[i] }
          ArchitectTemp.push(temp)
        }
      }
      
    }

 
  

  })

  let ArchProList =[]

  for(var j=0;j<this.procoreProjects.length;j++)
  {
    for(var k=0;k<ArchitectTemp.length;k++)
    {
      if(ArchitectTemp[k].ProjectID===this.procoreProjects[j].id)
      {
 
        let ProcoreRefNo ="";

             if(this.procoreProjects[j].project_number.includes("/V-"))
             {
              ProcoreRefNo = this.procoreProjects[j].project_number.toString().split("/V-")[0]
             }
             if(!this.procoreProjects[j].project_number.includes("/V-"))
             {
              ProcoreRefNo = this.procoreProjects[j].project_number
             }


            
         let temp = {ArchitectFirm :ArchitectTemp[k].ArchitectFirm, OrderNo : ProcoreRefNo  }
         ArchProList.push(temp)

      }
    }
   }


  

  let SDate = new Date(this.form.value.FromDate)
  let EDate = new Date(this.form.value.ToDate)

  
  let SDateDate = SDate.getDate();
  let SMonth = SDate.getMonth()+1;
  let SYear = SDate.getFullYear();





  let SMonthFormat='';
  if(SMonth==1)
  {
    SMonthFormat = "Jan"
  }
  if(SMonth==2)
  {
    SMonthFormat = "Feb"
  }
  if(SMonth==3)
  {
    SMonthFormat = "Mar"
  }
  if(SMonth==4)
  {
    SMonthFormat = "Apr"
  }
  if(SMonth==5)
  {
    SMonthFormat = "May"
  }
  if(SMonth==6)
  {
    SMonthFormat = "Jun"
  }
  if(SMonth==7)
  {
    SMonthFormat = "Jul"
  }
  if(SMonth==8)
  {
    SMonthFormat = "Aug"
  }
  if(SMonth==9)
  {
    SMonthFormat = "Sep"
  }
  if(SMonth==10)
  {
    SMonthFormat = "Oct"
  }
  if(SMonth==11)
  {
    SMonthFormat = "Nov"
  }
  if(SMonth==12)
  {
    SMonthFormat = "Dec"
  }


  let StartDate = SDateDate+"-" +  SMonthFormat+"-"+SYear;
  


  
  let EDateDate = EDate.getDate();
  let EMonth = EDate.getMonth()+1;
  let EYear = EDate.getFullYear();


  let EMonthFormat='';
  if(EMonth==1)
  {
    EMonthFormat = "Jan"
  }
  if(EMonth==2)
  {
    EMonthFormat = "Feb"
  }
  if(EMonth==3)
  {
    EMonthFormat = "Mar"
  }
  if(EMonth==4)
  {
    EMonthFormat = "Apr"
  }
  if(EMonth==5)
  {
    EMonthFormat = "May"
  }
  if(EMonth==6)
  {
    EMonthFormat = "Jun"
  }
  if(EMonth==7)
  {
    EMonthFormat = "Jul"
  }
  if(EMonth==8)
  {
    EMonthFormat = "Aug"
  }
  if(EMonth==9)
  {
    EMonthFormat = "Sep"
  }
  if(EMonth==10)
  {
    EMonthFormat = "Oct"
  }
  if(EMonth==11)
  {
    EMonthFormat = "Nov"
  }
  if(EMonth==12)
  {
    EMonthFormat = "Dec"
  }


  let EndDate = EDateDate+"-" +  EMonthFormat+"-"+EYear;



  let Statuses = this.form.value.Status;
  let User = this.form.value.User;
  var From = new Date(this.form.value.FromDate)

  
  var To = new Date(this.form.value.ToDate)


//=================================

this.reportsService.GetOrdersForSR(StartDate,EndDate).subscribe((response)=>{

  let DataCS :any = [{Order : this.orders,CSData : response}]
  let CSData = JSON.parse(DataCS[0].CSData);

 

  let Report = []
  

  for(var i = 0;i<CSData.length;i++)
  {
  
 

    var ProPlusDiscount = 0; 
    var SalesPerson = "";
    var Source = "";
    var ClientDiscount = 0;
    var ArchitectFirm = "";
 
 

  for(var j = 0;j<this.orders.length; j++)
  {
 

   let OrderProjectRefNo = ""

   if(this.orders[j].OrderNo.includes("/V-"))
   {
    let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
    let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
    let slash = tempproref.lastIndexOf("/");
    let proref = tempproref.substring(slash + 1, hyphen); 
    OrderProjectRefNo = proref
   }

   if(!this.orders[j].OrderNo.includes("/V-"))
   {
    let slash = this.orders[j].OrderNo.lastIndexOf("/");
    let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
    OrderProjectRefNo = proref
   }

    if(OrderProjectRefNo===CSData[i].PROJREFNO)
    {
         SalesPerson = this.orders[j].Associate  
         Source = this.orders[j].Source
         ClientDiscount = Number(this.orders[j].Discount)


   

    this.ledgerdetails.map((item)=>{

          let LedRefno = ""
          
    
          
          if(item.OrderNumber.includes("/V-"))
          {
           let hyphen = item.OrderNumber.lastIndexOf("/V-");
           let tempproref = item.OrderNumber.substring(0, hyphen);
           let slash = tempproref.lastIndexOf("/");
           let proref = tempproref.substring(slash + 1, hyphen); 
           LedRefno = proref
          }
    
         if(!item.OrderNumber.includes("/V-"))
         {
           let slash = item.OrderNumber.lastIndexOf("/");
           let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
           LedRefno = proref
         }
    
         if(LedRefno===OrderProjectRefNo)
         {
          if(item.ProPlusCost)
          {
            ProPlusDiscount = Number(item.ProPlusCost)
          }
         
         }
    
     })


     for(var p= 0;p<ArchProList.length; p++)
     {
      if(OrderProjectRefNo ===ArchProList[p].OrderNo)
      {
        ArchitectFirm = ArchProList[p].ArchitectFirm
      }

     }


    }
 
  }



   var temp = {
     ProjectRefNo : CSData[i].PROJREFNO,
     ProjectName:CSData[i].PROJECTNAME,
     Collection: CSData[i].Collection,
     PDCCollection : CSData[i].PdcCollection,
     Sales : CSData[i].Sales,
     WAAssociate : SalesPerson,
     Source : Source,
     ClientDiscount : ClientDiscount,
     ProPlusDiscount : ProPlusDiscount,
     ArchitectFirm : ArchitectFirm,

   }


   Report.push(temp)

 }
 


//=======================REPORT MAKING=============================================


var ProPlusReportTemp = []
var countsocial = 0;
var countshashank = 0;
var countankit = 0; 

 for(var i =0; i< Report.length; i++)
 {


  
  

  
  if(Number(Report[i].Collection)>0)
  {

     
    
    var ProjectName = Report[i].ProjectName
    var OrderNo =  Report[i].ProjectRefNo
    var SalesHead =  Report[i].WAAssociate
    var ClientDiscount = Number(Report[i].ClientDiscount)
    let ArchitectFirm =Report[i].ArchitectFirm
    var ProPlusValue = Number(Report[i].ProPlusDiscount)
    var Due = 0;
    var InvoiceCollection = Number(Report[i].Collection)
    var Social = Report[i].Source



    if(User==="ALL")
    {
      alert("Please Select a User")
    }
  
    if(User!=="ALL")
    {
  
      if(User!=="ANUJ JAIN")
      {
        if(User==="SHASHANK SINGH")
        {
        
          if(SalesHead==="SHASHANK SINGH")
          {

            Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.02

            countshashank = countshashank + 1

            var temp77 = {
              "Sno" : "1",
              "OrderNumber": OrderNo,
              "ProjectName": ProjectName,
              "ArchitectFirm": ArchitectFirm,
              "ProPlusPercent":ProPlusValue,
              "Discount" :  ClientDiscount,
              "InvoiceCollection" : InvoiceCollection,
              "Due" : Due.toFixed(2) ,
                  
            }
    
            ProPlusReportTemp.push(temp77)

          }

        

        }

        if(User==="ANKIT AGGARWAL")
        {
          if(SalesHead==="ANKIT AGGARWAL")
          {

          let Type1Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.10

          let Type2Due = 0;
 
          if(Number(ClientDiscount)<43)
          {

            let A = 43-Number(ClientDiscount)
    
            let B = InvoiceCollection/((100-Number(ClientDiscount))*0.01)

            let C = InvoiceCollection*ProPlusValue*0.01

         
             Type2Due = ((B*A*.01)-(C))/1.18
          // Type2Due =  ((B*A)-C)/(118*0.01)/100 //now using this formula


             // Type2Due = ((B-C)/(118*0.01))*A*0.01 earlier using this formula 



          }

          var number1 = Type1Due
          var number2 = Type2Due
          var maximum

          if (number1 > number2) {
           maximum = number1;
          } else {
          maximum = number2;
          }

          Due = maximum

          countankit = countankit +1

          var temp69 = {
            "Sno" : countankit,
            "OrderNumber": OrderNo,
            "ProjectName": ProjectName,
            "ArchitectFirm": ArchitectFirm,
            "ProPlusPercent":ProPlusValue,
            "Discount" :  ClientDiscount,
            "InvoiceCollection" : InvoiceCollection,
            "Due" : Due.toFixed(2) ,  
                     
          }
  
          ProPlusReportTemp.push(temp69)
         
         }

        }



        


       
  
      }
  
      if(User==="ANUJ JAIN")
      {
        if(Social==="SOCIAL")
        {
          
          Due = (InvoiceCollection*(100-ProPlusValue)/118)*0.015;

          countsocial = countsocial +1

          var temp62 = {
            "Sno" : countsocial,
            "OrderNumber": OrderNo,
            "ProjectName": ProjectName,
            "ArchitectFirm": ArchitectFirm,
            "ProPlusPercent":ProPlusValue,
            "Discount" :  ClientDiscount,
            "InvoiceCollection" : InvoiceCollection,
            "Due" : Due.toFixed(2)                
          }
  
          ProPlusReportTemp.push(temp62)
  
        }
      }
  
    }

  }


 

 }












var options2 = { 

  headers:  [
    "Sno",
    "OrderNumber",
    "ProjectName",
    "ArchitectFirm",
    "ProPlusPercent",
    "ClientDiscount" ,
    "InvoiceCollection",
    "Due" 
  ]
  
 
  
 };






 new ngxCsv(ProPlusReportTemp, "Incentive Report" ,options2);








})




/*

  var dd = {
      
     pageSize: 'A4',
    content: [
      {
        layout: 'headerLineOnly',
        table: {
          widths: ['auto',12,'*'],
          body: [
            [
              {
                text: "Waltz Incentive summary report_Sanchit \n WA shashank Singh \n for April'23 \n\n",
                alignment: 'left', fillColor: 'black',color: 'white'
              },
              {
                text: '',
                alignment: 'left', fillColor: 'black',color: 'white',
                font:'Helvetica Neue Light'
              },
              {
                image: 'data:image/png;base64,/9j/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQIBAQICAgECAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/wAARCABUAK4DAREAAhEBAxEB/8QAkAAAAgEFAQEBAAAAAAAAAAAAAAkGAQQFBwgKAwIBAQAAAAAAAAAAAAAAAAAAAAAQAAAGAQMBBQIHDAQLCQAAAAECAwQFBgcAEQgSITETFAlBIlFhgTIjFRaRodEk1FaWF7cZOXlx1VcY8MFSstJUlMQ4eLglhbXWlyhYmAoRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APAU0j3z8VQYs3TwUG6ztcGqCrgUWrYgqOHKoJFOKbdBMomOcdilKG4iAaC0Hs7B7w0BoDQX4xUmEcEuMe+CKFz5IJLyq/kPOeH4vlPOeH5fzPhe94fV19PbttoLDQGgNt+wO0dBcuWTxkdNN41cNVFUUXCSblFRE6jdymVZuumVQpTHRXSOBiGD3TlEBARAdB9V4uSatGj9zHvW7F/43kXi7VZJq98scEnHlHByFSc+AoYCn6BN0GHYdh0FjoLpZk8bpNl3DVwgi8SMuzVWRUTTdokVUQOs2OcoFXSKukcgmKIgBiiHeAhoLXQShpSLo/bIvGNQtD1o4ICjd00gJVy2XTN3HRXRaHSUIPwgIhoLj9Xl/wDzHuH6MzX5FoD9Xl//ADGuH6MzX5FoKhjvIA91FuI/0VmbH/cdBUcdZBANxolyAPhGsTYB93yOg/P6vL/+Y9w/Rma/ItAfq8v/AOY9w/Rma/ItB8XFEu7RBZy6p1qbNm6Z1l3DivS6KCCKZRMoqssozKmkkQoCImMIAAB26CLdI79O3b8GgYl6VV5plR5y4UgcmMo5/jLMD6wcf8gJyqKKzNlWM8ViYxW8nDeOUxEVK2tak5FNQNjJqNQEBAQ0HG+ZcaWHDWWcl4mtjUzKzY1vttok+0OAlFvL1Sdewkgl27dhXTM23whoNaaCoAIiAB2iI7AHxjoPVO9x1QlPTYkvTdb0+uKZ5h+DUH6miloBg2+1hcjq3txf5ejC6Kn9YCJOIky2eeV3EAO3E3TuOg8rBiiUwlMGwlEQEPgENBTQbawLiydzjmzE+G6wl49hylkOoUGGTEBMAyFrnmEK1McA7k01XgGMPcBQEdB2Xz4GK5A+o1kvHWAoJB1XEMn1njjhqHgEE/Cl4PGraBwtSnLQjYoFWc2JCtoulFA7VFXJjCIiIjoGhcxo7E+dOP3JnhRhqv1pad9KmJxvZseWqCjmac5k6t1dm0xvzJk3b9AoLy6CmUpptYm4iY4JxzNYwbFAdB5mBDYdh7w0DOOb8PFR/E30qJBjHMmb2c4lZPfTDls3SSXkniPMrkpHounypClO5cJMWiSRTHERBNMpe4A0Cx9B3ljz1LOYWLKVXMe0nJiMTVapGoxMJHDV6y7Fqxb7gkkLl3FrOFhL1fOOYTfHoJn+9r51/wBryH6HVH+ptAx+y+ohypaelFijN7e8RSWT5vm/mHG8pay06q+fd02Aw7iWwxUKp/2T0eWaS846WL2b9So6BdCHq6c725utPLrbftAOqm1EwBvtv2fU/t20Fwt6vvPRdIUVMutBIIbCAUuoAPYID3/U/wAWgsP3tfOv+1xv+h9S/qfQH72vnX/a43/Q6pf1PoGhznMfPOCvT5vN55V2SHvWXebdAnce8fsSzNWrbRzSMRy5DR1tzxPN2sa2eM3kyn1sK4BhKJwFVyHugQdB5mesevr2Dfffbbs+5oL6Ik3kLKR0xHrqNn0W9av2bhEwkVQctFiLoKpHAQEqiaiYCUfYIaBpXq7t2t2z/jfldDNUEIDmxx+xRyNVMzS6GieRJWD+xOa2QGKHQLptmKlzZ1QDtDxSiPztAqTQdKcOsFveTPKXAeBWRjJDlPKlNqL94AdkZCyc01TnphUe4jeHhQXcqGHsKRIRHsDQMvg+dVdJ62w8lxM3/UhM57eYjcxoAH1aXi3LsVcB/UINx+iMxZ4VWKkQg+6Apl+DQLF5b4Ol+NfJzO+BpsinncVZSuVMI4OmKZZCPhpt42iZVAB+c1losiLlEwdh0lSmDsHQc7aBqHpORyFPzJmDlfKAgnE8MOOGWM6xq7sPxccnOogmMsJtyGH3fOFy1foh0iHeItREO4dBnvTEYFxzYeRfqBWxqRzD8OsYy1vpCsiQFm0tyUygq5pOCo76bscPIiySbixGANzAlBnN8eg0L6fvI9rhPmdjnI+Q11ZPH16nZ7Hmdmzsxly2HFOZGEhSsoIvynEfMnNX7E5cpibcQcpEP84AHQae5gcfJrixyYzRgOcV82vja+zkFHShSgCE/WxcC9qtlZCG5DsLHXHTV6gYoiBklyiHfoOtudX/AAg+kn/yf5S/61uTmgVtoDQGgbNbv4JWEv5jGef2B4P0CmdAaA0DMPT74yUW3q3XlbyVItH8TONqLedupBHy7vKt9UEVqRhKrHOJQdTNxfol84Ym/k40qqp9vd3DmTllycvXLfNdqzLezpNXEwqjH1ysx5Ab1+k02JRIwq9MrTAnSjHwddiEEm6CRCgHSTqHcwiOg5q0BoGz2tQc8+kLjSd2M9tnBbkvYscSYkICizXDPKCCWvFPUcKdqhGEPk/HdgTDf3CKy5ADtPsIKY0DZvTBZoYvr3Nbmg/OZqfjNxct8Bjt8UQKdLN/JBQmCsfi0Ee0X8TDWybl0un30xixUD5m4AqBJdQjkjkDmBYixVwU3EDAoU4KAffvAevt30Da/VS6suMeG3NpqmK5OVHGGmMb9JlEDA5zlx8A2D8n+ZEvzX8mhUoqXU6veMEqBh36t9Ao0O3sDvHQNXg0DYN9JC2z3imaW3nDygiKOxQEvSs7w1xcr5LVZDEN2GGPmcpZKhQHb3Trwnwk0El5ZlHi5wB4k8SGiwtL/wAggU5u8gmhdiOmzOzNXVS45VOREogqUIygN3874CgB0HsBTbdw6BQyZzJnKoQdjFHco/APsEPjDQN853IJcjuIHCbnNFlF3aUKo54dcjXRA61C5PwTHMRxlYpZbcVDvLphR/GkBU/aqrDr9oiU2ghXOr/hA9JL/k/yl/1q8nNArXQGgNA2a3fwSsJfzGM8/sDwfoFM6A0HQvFvjdkDldmumYXx01SNK2V+Y8pMvjihB1KsxyZn1jt9jfCHgx0BXIhFV06WOIFKmmPtEAEOuPUI5HY/l0KRw84yO1UOKnG1R5GQsimUGrjM+UFSg2vObLMkkP4y6sT5MyUYRQTCzjE00y7bm3BYWgNAaBrPpcPRyM55a8NnhDvEOWXFvIMZS43q9xTNWEUks84pOgQewZGUkaA6hkNveMMsYgfOEBBVayJ0VTonD30zGIYPaBimEpgEPYICGgbJkoqGBfSS4/UIoEbXHmvyBvHIS0ETP4b0+JcDMXOIsUoPU9wOaPkr3PXFylv7pjNSmDtKA6BS2gbpjU5uQPpFZzx2oUju18HOQVP5BVoxhFV8niHkCzb4myezZl94ycdF5Agam6U290pnpzD3joFIIpnVXSSSAwqKKpppgAbmE5zgUgAHtMJh0HobvvHJDL3M708/TjcuVYqhcY+P2OpHkA73FNnVXNsiZLlVyfsb84fRt3lbg7SpFqnP73XEpJD2lANAqbnfn6S5X8r8zZvQhnkXXrPbXTKiQJWaqaFZxvWUkKzjustUSE8JBvAU2IZNSlIAF+jEfboORPq6Q/1F5/sy3+hoHH+mQ3d8g8RcyvT0lmDhzI5yxWpm3AaKzZQyjbkVxvYytzh4yKBUoJoPb7jlSfhzCHvKqKol7ezQay55IKtuJHpMN1yGTWQ4h5WRVTOAlORRLmzyeTOUxR7QEpi6BWOgNAaBs1u/glYS/mMZ5/YHg/QKZ0F9GxzyWfNY6PbrPHz1dFq0aNkzrOHLlwoVFFBBJMDHVVVUOAFKACIiO2gdTmV4z9Mvi654w1Vym15ocmqvGS3KaxMzpjJYYxHLJIStb4/sHaYiswstnQOi/swFMU6aYotDdygaBJJjCYwmMO5jCIiPwiI7joKaA0BoN/cVs3S/G3khg7PMGUVZDE2UaXeiNeoSkft69Osn72MX2EAM2k2SSiCpR7DJqCA9g6De/PHj4jjHnzmTDWPmgvK1ZcooTmIEWCYqBK48y+LC7YpUZEKH0oSNPtseJALvuJ9tBtf1epyHjOVbPjrVHzZ/TeGGJcY8T4VZmIeWXn8WVxEuVJEpSiJPFmMwy1gdKGD5xld9ArPQNR9IG0MnXKx7xysT1BpSuamI8ncTLAd2BTtUJrKleVTxfKHIoIJeJCZfjIB2U47CTwhEBAdBqPgpxyUyfz5w5hHITJaKg65ldWUzCi+J4J4SgYjXf3HLCr4FQAG4xdRqciJ+vYCmJsOgahj3lJcsBYc51+rALOE/XfzXz5aeOnHhtZ4qPn2jCozMwOSOQM2nBzCLhm+hI6rKQlYT+jMkUkiql3FENBwSPq9cn9xEtR43gAiI7f3dMTiPyiNZ3EdBT971yg/NLjf/APXTE/8A5Z0GwsT+txyyxdkil5Aiq7gNk9qthjJUFobBONYORO0RcphJM0JWMgGz9kEjGmVQMdI5TgRQdhDQdS//AKF6ri6tTnAN5hJ0g5xNkDifac0UJNqBAQia3nTk7nXMUdWilT3ImaroXcI8xOwSC2EBABAdB5ytAaA0DZrd/BKwl/MYzz+wPB+gU0ACYdgAREe4A+7oHE8K6JUOH+GHvqRZ0hI2anUJCRqfCvFNiRIZPIeXmaXQ9yvKRq5RO8x9iIyxV+oS+E9lvBQA2xFNAqfIV/tuU7taMiXubf2O43ObkbFZJ2TcqOn8rLyrpR48eOVlTGMY6iyo9ncAdgdgaCG6A0BoDQVARAQEOwQHcB+MNB6ieOlMrvIC1emnz/uLZOQqPFvjdmFTkQ58Eqjda0+nEwVtuMmkyoYBIqtcaZa8fRCZVNzODCYoAO2g80V+uM3kO83K+2V6rJWG62metc5IrmE676XsEo6lZB2scwiJlHDt0c5hEe0R0ES0Evx/cpvHV5p9+rT5aLsVKssJaoGSbmEi7CYgJJtKRrxI5RAxTtnjUhwEO3cNB6eMz4oPScneoFzsxxCeBFcwePGD23GdmzT8RR/kr1MSNAyDB10EQ61XtZr8BkaHMmkHWmoQu+3YAgtT1drHD49yDhbgbR5JB7SOB2JorFVgVj1yLRs3yCtKgXfkPZiGTAAUcmv0qaIETbmKjDpF32KGgUHoDQGg9MfMXDNbzB6Dnpw5lglHD7MnGCiW8+R0Tm8V25wHmPlHnql0yVE5zGXUjKRfseAwAoB0NwnEwHYDF0Hmc0BoDQNmt38ErCX8xjPP7A8H6DQvA3ia05K5HmrDkaaVonGvCEErkrkVk4wFKjWaJFqABYWJOrsm9ul1kBJGQ7MvUou6XA3SJCHEAwfOXlg95X5fCah4VKj4cx3Dtcc4ExawMJYjHWK68YzeAiUUw9xeXfkAXkk6H6R2+XUUMPaAAHF+gNAaA2Hu2Hf4NAaA0HbGKeemcsPcSM9cNKm5hy4q5CS0LK21w7ZCrYooY5/XX0ozrkmChTxrK1hUo1KSTABBykzTKPYGg4oEdxEfhER+7oKaA0DQ6V6svJGm4t4fYg8hR7BT+FeRxyhi5vOwp3biVsjGWs85Uwtzkq5FZlhRZS4yCsSiYQI38wYuwlEQ0C5LtcbBkO42m+WyRcS9nuVgl7RYZV2oKrmRmp1+vJyb5wobcx1nT1yc5hHvE2gi+gNAaBx2AvWdzPgbj7W+OCeDOO2SqPXcZ2HEBnOSaOvPy81jyxZOmMvuKzNOPrBFJ5HMr7MqPm5BIAJqlKYO0N9BGzeqoyEd/wC4TwUD+jDZf8cloKfvU2X/AMCuCn/o2X+sdBavvVKZPWbtn/cR4NtRdNnDcHLXDxU3DcV0jpAugf6x2KskJuoo7DsIaDiOV5H3eW4217i6s3iU8dVnMFrzXGHSbGJLFttwq1bqMomo58QSGjixdXbeGmBQEp+od+3QdMcRPUjyBxGw5kvBcTh/CGWse5Wt9eutqhsvU4bSgvLVZg6YQhSp+abpmasQfLKEIcDAVU4mDYdBuM3q1JHHceAfAfcd9xDB7cO//vDQfEfVjbjv/wCwPgUG/tDCaQD/AOI6D5D6rzUw7jwF4G/JhYgf5skGgwk/6obKehpaI/uK8IIoZWNexoSMViEWsjH+dbKN/OsFwkzeC8beJ1pn2HpOUB0CsPMF815jwibeJ4nhbe5379O3+Tv7Pg0H0jo93Kv2UYxS8d7IOm7Joj1FKKzlyqRFBMDHEpSidQ4BuIgAaDo7KXELOuHmM5I3Ktw52tWnDVu1/Za5066OKpNA9GNBlaGVUnJd7XxUkw8sRR2mkkdz9EBhU93Qfi38Rc5UesTFon67EkSrLJnI22BYW2rStxqDF8u3apubTT42YdWODI2du0kXQOGxDMl1CpuASOYC6D9q8Qs5o1A9wUrcWCSdSLfFaz9q6sN+SppmQSgWI9BCYG2ljywxvPm/FOssd+NiUG4CroMmHCvkApXULEhXa45K5oLXJzevN8gURa7LUd7Vkru3nEaQSxDaVUz1FYsj4RWgreUHxOjp7dBrbFeAcp5pCdHHNcLO/Z0rIkh4srDxIqP5Pzv1TCRoS79iMvYpgI5x5SPa+K8cggfw0zdBtgx2K8M3zMs1NwVHYxizyuQDmzzricsEHV4uKhGkhHxSz19L2KQjI1uX6ylW6JSmVAx1FSlKAiOg2UTh3yCc5IreKIqkp2C53GqSd3qratWGt2KJsNYh284vIycPYoaWewL4G61betRTI4FUXqItgL44gmIYLG3GTK2Va3JW6rtKs1r0VYU6q5krZe6ZSUVJ9Rp576tZ/aydhzPV02mxz+EBgIAh1CG+gnde4N8hrIte2rWCqMa9xoo+LdmFiyXjyuPoNrHu4hirLLtZqzMlloJdzPMyt3yQHaOQcEFJQ4GAdBaU3hRn++2yo0mtQFZc2LIG/wBg2jzINFi0boP6wLFi5ItWeyVhas507m71R8yRBsdQVRSA5d0zkMYIlN8XcywpnpU69H2MGFtodEXUpdlrt0RNcMmNbe8pVebrVeUlU3UpNoUSUEiSYmMQW2x+kTkAwZO2cSM205ozfPoOCl2zmyRlQdKVK51G4FhbLMqmbxMTYBrU1JlhFZJchk0FHApoqqEOUpxMQwAETtvHfMFEsmXqjbaZIwdjwQ2F5lGLfHapL1pn9qoGmJPD/TiR+0c2GzMUkVGwqkVI4KoQTJj1aCRULinmrJVTjrjVa9FuI6eGYCqxz+01iHsly+oBOnKfY+syssznLJ4LpI7ZPyiCvmHaZ26PiLEOQAwDPjrl6QsdNqzKpOHMrfqkF7q5k3ceMc/qCbGQkZGfPLea+rWcdBN4h4EiosqmEeozXI48M6RygEoW4k5uQo4348BEfVZKuxvC0QW21U1vbUuTBsoxtTqnBMDZUINwzeougXM1AAYqldDs3MCghKZbg1yAh4yqyy0dQ3rW8TEfA1FOGyxjSbfWKVk59nWWzaJj4q0u3jwSTT9NJUxCCVHcTKCUpTCAfBpwg5ASlzqmPK/EUy03W6zjivV6t1TJ2OrJKupRpGyEs5ScNoazPTMEkWUYsJlV/DTAxQL1dQgAhqOqYKyrda1lS4VuoSEhW8KR0PJ5MlN0G6FWb2C0R9OhkngOVUjqvZCwyaaCaCQHWEAOfp6EzmKEyyPxTzRiqtyNouEBFN2UC/j4q1MYy1VicnqZJShFBZsbhX4eWezFacGVSMgcHaKXgug8up0LfR6DnHQSelPW0bcatIPVgQZsbDDvHS4gYwJN2z9BZZQSlATGAiZBHYAER0DYLflPDWGMrcwMwwuYaBnEnIS1uxo1CpTe4KNW8SvyToOaTSmQT26q1hs0BCApR2qLdqDsxnboDCcpEzAoEPXtmG8bZL5A8kI/OtXyc0yxTM8QlQxgi1toZFXf59q9oqbQ2R0pOusqvHKURK1nlF1GsjIApIx7cqRffFRIMs/yBhhXkpYebjfNdTPFTbyxZFb4EMwtY5ERs1ghHyRcPqMhgC077AMJx+EX5kJb3q2QDg3BQfLgF425bYhJl+v9UHTW0Otw4rGIFMtFjJcLbVb8HD+Oxsqs0UATEKrBX1P6uMqVsYBapmEg9oKaDD8Csu4gxZTra1tt+q1QfXO4EiMlK2hCxL2JDFpa69QiLRgpSHhJqOi8w1awP3zps8ei0MRQGqJFytnD4hw1JVcgYJxBlLmINYTibti200S21jEMPPHsBmtjjHuXsf2Krxcs5bDGzCUiyq0OosscyiZRctTFE5gEOoNoYy5rUymY/f22ZrybG4x6dNxLiWh40fuqsfHOMq1fX2cLPPmn37OVdPH9kyctHgkoddVyokm7TUEqIplMH7y7yN4+xddupcYU2kWuKyDyBbZtjaDZYyXUZ48YXXHFflZ6oMFkjRya6FOt755CFUAR8dJiVUodJwHQQ6+ZxxxM5Y5s21jZUzRGasGM4mhtUmj0rVpMylyw1aQoMemduQ7SPpUZAvI1uKgAmVCOKUDm3KJgyGKM74yr2X/SisszZSNoXjm7pquXXpmj04VZKL5lZTyi960iICq+BGk2No8/FwU3BXoD3wEoBguJnIPHmIaHbELdKPCPnvLXjVkFBlGNjrTJKPUaJyirlytEIc4EaJzNVcZIi12hFFCGM6UTEvYU4lCR4zmsScaYjKCqmdqVltzmVTG9RiI2jNrgYlUha5m/GuXZa93E9nrUGRpLNI2hfVrdsz88Y5pJyPilKmALhs3IvK/DOWcVc1VrdPuk80SsEGN8ST4sHDhHLmLXPJLHGRYWPmXXhgswn8dQVVcEZrOQEXMSum2MYgsUSHDDcbcg4VUx7gaNypljFrig0R5MGyDRsh160MsyU5FW6TU/IkwFd6NW1ZAWEjCuEHzBo7mWCBLEu58UoIqCoYNC1fkbHQ3EDMmKWs0CN0XytR4fGSrtqZSzMsI3CKyNLZthGU6miBGUXKWmn0sV0OsoiKzgEw6HLoDh0E/v+EJ7GBn18yzi26R7DjYjUKg0LA2mu8oIG/xuMUq3XKlJTVdrEZVrXTq/cGyMemaVl3if2TRJ0pFXKRIgc947y1Q4aU4GrSU+i3JiDJa85kA6rZ0oSDij5bYWMrlYEkDmdphDoHWEqIKD0httv2aDfQ5EpeOssxOTSZe4ySDZo0zEhHKYKrNyg7aykrRiu9RlZezK8hjmppnbjOPWqACRwqdJwsU3T0gY5QmV35T4GNijNVXpFmdMpHk5j6Ly7lxozi14/wAHOLrKeG3jnHrBArcWQs6cSt2+ai1yiDcGlgKiP0ifToIVyOv+FLbjzPU/O5TxZk6+XBeDeYkslAr1opuXZ1+4usRKSb/kBFJVqu0OWcOKWR+rJOCrSb01iM3OkqZMyxxBSWgNAaCo7+3fv9u/f+HbQAb+zf4tvv6Cg7+3f5f8Ph0FQ6vZv8W2/wAugB39u/x7/e0B27e3b72gO3b27fe7vwaAHq9u/t79/l0B73x93x934NABv7N9t/Zv3/h0B723t2+XbQU0FQ39m/xbff0FA39m+/xaCo7+3fbf279/4dAdu/t3+Xf8OgO3b27fe0B73x/f+H8OgB39u/y6Cmg//9k=',
                alignment: 'right',
                fillColor: 'black',color: 'white',
                width: 120,
                height: 60
              },
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ],
            [
              '','',''
            ]
          ],
          
        },
        
      },
      
      {
          table: {
            widths: ['*','*','*','*'],
            body: [
              [{text:'Particulars',fillColor: 'black',color: 'white'},
              {text:"April'23", fillColor: 'black',color: 'white'},
              {text:"March'23", fillColor: 'black',color: 'white'},
              {text:"Feb'23",fillColor: 'black',color: 'white'}
            ],
              ['Incentive', '654654654645', '6546546464', '4564646464654'],
              ['Collection', '54564654654', '65456464646','5534564654645'],
              ['Proj count_col', '20', '24','15']
            ]
          }
        },

        {
          text: '\n\n'
        }
        ,

    ],

    footer: (currentPage: any, pageCount: any)=>{
      if (currentPage == pageCount){
      console.log("currentPage-2->",currentPage);
      let z:any={};
      z={
        layout: 'headerLineOnly',
        table: {
          widths: ['*','*','*','*','*'],
          body: [
            [
              {
                text: ''
              },
              {
                text: 'Prepared By',
                bold: true
              },
              {
                text: 'Checked By',
                bold: true
              },
              {
                text: 'Approved By',
                bold: true
              },
              {
                text: ''
              },
            ],
              [
                {
                  text: ''
                },
                {
                  text: 'Sanchit'
                },
                {
                  text: 'Sanchit'
                },
                {
                  text: 'Gaurav'
                },
                {
                  text: ''
                },
              ],
            ],
      }
    }
      return z;
      }},
      
    style: {
    headerText: {
    fontSize: 16,
    font:'Helvetica Neue Light',
    bold: true,
    alignment: 'left'

  },
    }
     
  }
  pdfMake.createPdf(dd).download('Waltz')


*/


 }










}




















/*
      if(Statuses[i]==="Old Win")
      {
        for(var j = 0 ; j < this.orders.length ; j ++)
        {

          if(this.orders[j].Status ==="Old Win")
          {

            var WinDate = Number(this.orders[j].WinDate.split('-')[0])
            var WinMonth = Number(this.orders[j].WinDate.split('-')[1])
            var WinYear = Number(this.orders[j].WinDate.split('-')[2])
            var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
            
            var winDatetest = new Date(DateFormat)

            if(winDatetest>=From&&winDatetest<=To&&this.orders[j].Status==="Old Win")
            {

              let OrderProjectRefNo = ""

              if(this.orders[j].OrderNo.includes("/V-"))
              {
               let hyphen = this.orders[j].OrderNo.lastIndexOf("/V-");
               let tempproref = this.orders[j].OrderNo.substring(0, hyphen);
               let slash = tempproref.lastIndexOf("/");
               let proref = tempproref.substring(slash + 1, hyphen); 
               OrderProjectRefNo = proref
              }
           
              if(!this.orders[j].OrderNo.includes("/V-"))
              {
               let slash = this.orders[j].OrderNo.lastIndexOf("/");
               let proref = this.orders[j].OrderNo.substring(slash+ 1, this.orders[j].OrderNo.length);
               OrderProjectRefNo = proref
              }


              let Plan = ""
              let PlanValue = "";


              this.ledgerdetails.map((item)=>{

               let LedRefno = ""

               
               if(item.OrderNumber.includes("/V-"))
               {
                let hyphen = item.OrderNumber.lastIndexOf("/V-");
                let tempproref = item.OrderNumber.substring(0, hyphen);
                let slash = tempproref.lastIndexOf("/");
                let proref = tempproref.substring(slash + 1, hyphen); 
                LedRefno = proref
               }
        
              if(!item.OrderNumber.includes("/V-"))
              {
                let slash = item.OrderNumber.lastIndexOf("/");
                let proref = item.OrderNumber.substring(slash+ 1, item.OrderNumber.length);
                LedRefno = proref
              }

              if(LedRefno===OrderProjectRefNo)
              {
               Plan = item.ProPlus
              }
              if(LedRefno===OrderProjectRefNo)
              {
                if(item.ProPlusCost)
                {
                  PlanValue = item.ProPlusCost
                }
              }

              })
             
              
              let DealerDiscount = '';

              this.users.map((item)=>{
                if(item.UserFullName===this.orders[j].Associate)
                {
                  DealerDiscount = item.DealerDiscount
                }
              })
              

              this.specialrequests.map((item)=>{
                if(item.OrderNo===OrderProjectRefNo)
                {
                  DealerDiscount = item.NewDealerDiscount
                }
              })
               
              let CSValue = "";

              if(DealerDiscount!=="0")
              {
               CSValue = (Math.ceil(Number(this.orders[j].GrandTotal)-Number(this.orders[j].GrandTotal)*0.01*Number(DealerDiscount))).toString()
              }
              if(DealerDiscount==="0")
              {
                CSValue = this.orders[j].FinalAmount
              }

              let PROJECTNAME =""
              let PR_DT =""
              let PROJECTTYPE =""
              let JT =""
              let PROSTDATE =""
              let PROENDDATE =""
              let PROJECTSQM =""
              let PROJECTVALUE =""
              let EXPENDITURE =""
              let PIR_ID =""
              let NOOBPI =""
              let PIBASICVALUE=""
              let PITOTALVALUE =""
              let CONFIRMPIBASICVALUE =""
              let CONFIRMPITOTALVALUE =""
              let ADVPIAMT =""
              let COLLECTIONOFPI =""
              let  CONFIRMPISQM =""
              let  DISPATCHPISQM =""
              let  BILLTO_PNAME =""
              let  ACC_REP =""
              let  HO_REP=""
              let  PDCCOLLECTION =""
              let  INVOICECOLLECTION =""
              let  DISPATCHPIVALUE =""
              let  POBASICAMT =""
              let  PURCHASEVALUE =""
              let  REJECTIONSQM =""
              let  REJECTIONVALUE =""
              let  PROJREFNO =""
              let  PROJWINDTSTR =""
              let  PROJ_WIN_DT =""
              let  WIPQTY =""
              let  RFDQTY =""
              let ProcoreStatus = "";


              this.procoreProjects.map((item)=>{
            
              let ProcoreRefNo ="";

              if(item.project_number.includes("/V-"))
              {
               ProcoreRefNo = item.project_number.toString().split("/V-")[0]
              }
              if(!item.project_number.includes("/V-"))
              {
               ProcoreRefNo = item.project_number
              }


              if(OrderProjectRefNo===ProcoreRefNo)
              {
               ProcoreStatus = item.project_stage.name
              }
       


              })


             
              
           
          

              CSData.map((item)=>{

               if(OrderProjectRefNo===item.PROJREFNO)
               {
                 PROJECTNAME =item.PROJECTNAME
                 PR_DT =item.PR_DT
                  PROJECTTYPE =item.PROJECTTYPE
                  JT =item.JT
                  PROSTDATE =item.PROSTDATE
                  PROENDDATE =item.PROENDDATE
                  PROJECTSQM =item.PROJECTSQM
                  PROJECTVALUE =item.PROJECTVALUE
                  EXPENDITURE =item.EXPENDITURE
                  PIR_ID =item.PIR_ID
                  NOOBPI =item.NOOBPI
                  PIBASICVALUE=item.PIBASICVALUE
                  PITOTALVALUE =item.PITOTALVALUE
                  CONFIRMPIBASICVALUE =item.CONFIRMPIBASICVALUE
                  CONFIRMPITOTALVALUE =item.CONFIRMPITOTALVALUE
                  ADVPIAMT =item.ADVPIAMT
                  COLLECTIONOFPI =item.COLLECTIONOFPI
                   CONFIRMPISQM =item.CONFIRMPISQM
                   DISPATCHPISQM =item.DISPATCHPISQM
                   BILLTO_PNAME =item.BILLTO_PNAME
                   ACC_REP =item.ACC_REP
                   HO_REP=item.HO_REP
                   PDCCOLLECTION =item.PDCCOLLECTION
                   INVOICECOLLECTION =item.INVOICECOLLECTION
                   DISPATCHPIVALUE =item.DISPATCHPIVALUE
                   POBASICAMT =item.POBASICAMT
                   PURCHASEVALUE =item.PURCHASEVALUE
                   REJECTIONSQM =item.REJECTIONSQM
                   REJECTIONVALUE =item.REJECTIONVALUE
                   PROJREFNO =item.PROJREFNO
                   PROJWINDTSTR =item.PROJWINDTSTR
                   PROJ_WIN_DT =item.PROJ_WIN_DT
                   WIPQTY =item.WIPQTY
                   RFDQTY =item.RFDQTY
               }

              })


               var temp6 = {
                "OrderNumber" : this.orders[j].OrderNo,
                "CreationDate" : this.orders[j].CreationDate,
                "EditDate" : this.orders[j].EditDate,
                "WinDate" : this.orders[j].WinDate,
                "ProjectName" : this.orders[j].ProjectName,
                "ClientName" : this.orders[j].ClientName,
                "Location" : this.orders[j].Location,
                "ArchitectName" : this.orders[j].Architect,
                "GrandTotal" : this.orders[j].GrandTotal,
                "Discount" : this.orders[j].Discount,
                "FinalAmount" : this.orders[j].FinalAmount,
                "TotalSolutions" : this.orders[j].Solutions.length,
                "WaltzAssociate" : this.orders[j].Associate,
                "Source" : this.orders[j].Source,
                "Status" : this.orders[j].Status,
                "TotalSquarefeet" : this.orders[j].TotalSquareFeet,
                "CSValue" : CSValue,
                "DealerDiscount" : DealerDiscount,
                "Plan" : Plan,
                "PlanValue" :PlanValue,
                "CommercialWinDate": this.orders[j].WinDate,
                "CommercialWinAmount": "",
                "CommercialWinPercent": "",
                "CommercialType": "",
                "CommercialRemark": "",
                "HandoverDate":"",
                "Party": "",
                "Expense": "",
                "ExpensePercent": "",
                "Outstanding" : "",
                "Billed" : "",
                "SpecialDiscount": "",
                "BadDebt" : "",
                "ReceiptAdvance": "",
                "ChequeRequired": "",
                "Type": "",
                "Remark": "",
                "ProcoreProjectStatus" : ProcoreStatus,
                "PROJECTNAME": PROJECTNAME,
                "PR_DT": PR_DT,
                "PROJECTTYPE": PROJECTTYPE,
                "JT": JT,
                "PROSTDATE": PROSTDATE,
                "PROENDDATE": PROENDDATE,
                "PROJECTSQM": PROJECTSQM,
                "PROJECTVALUE": PROJECTVALUE,
                "EXPENDITURE": EXPENDITURE,
                "PIR_ID": PIR_ID,
                "NOOBPI": NOOBPI,
                "PIBASICVALUE": PIBASICVALUE,
                "PITOTALVALUE": PITOTALVALUE,
                "CONFIRMPIBASICVALUE": CONFIRMPIBASICVALUE,
                "CONFIRMPITOTALVALUE": CONFIRMPITOTALVALUE,
                "ADVPIAMT": ADVPIAMT,
                "COLLECTIONOFPI": COLLECTIONOFPI,
                "CONFIRMPISQM": CONFIRMPISQM,
                "DISPATCHPISQM": DISPATCHPISQM,
                "BILLTO_PNAME": BILLTO_PNAME,
                "ACC_REP": ACC_REP,
                "HO_REP": HO_REP,
                "PDCCOLLECTION": PDCCOLLECTION,
                "INVOICECOLLECTION": INVOICECOLLECTION,
                "DISPATCHPIVALUE": DISPATCHPIVALUE,
                "POBASICAMT": POBASICAMT,
                "PURCHASEVALUE": PURCHASEVALUE,
                "REJECTIONSQM": REJECTIONSQM,
                "REJECTIONVALUE": REJECTIONVALUE,
                "PROJREFNO": PROJREFNO,
                "PROJWINDTSTR": PROJWINDTSTR,
                "PROJ_WIN_DT": PROJ_WIN_DT,
                "WIPQTY": WIPQTY,
                "RFDQTY": RFDQTY
 
              }

              FilteredOrders.push(temp6)

            }

          }

        }

      }
  */