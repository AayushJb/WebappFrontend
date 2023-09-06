import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LedgerdetailsService } from 'src/app/services/ledgerdetails.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UsersService } from 'src/app/services/user.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { CommercialWin } from 'src/app/shared/commericalwin.model';
import { Handover } from 'src/app/shared/handover.model';
import { LedgerDetail } from 'src/app/shared/ledgerdetail.model';
import { Order } from 'src/app/shared/order.model';
import { User } from 'src/app/shared/user.model';
import { LoaderComponent } from '../../projects/loader/loader.component';
import { Observable, Subscription,combineLatest } from 'rxjs';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-proplusreport',
  templateUrl: './proplusreport.component.html',
  styleUrls: ['./proplusreport.component.css']
})
export class ProplusreportComponent {


  form : FormGroup;

  users : User[] = [];

  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;
  Profile : string;
  commercialwins : CommercialWin[] = [];
  handovers: Handover[] = [];

  procoreProjects : any
  ProcoreArchitects : any
  User : any

  Month : any

  ledgerdetails : LedgerDetail[] = [];

  observable1: Observable<any>
  observable2: Observable<any> 
  observable3: Observable<any>
  observable4: Observable<any> 



  constructor(private Sdialog : MatDialog, 
    public wqgformService : WqgformService,
    private userService : UsersService,
    private snackbar : MatSnackBar,
    public reportsService : ReportsService,
    public ledgerService : LedgerdetailsService
    
    ){}


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
     
      
      var today  = new Date()
      var month = today.getMonth() +1;
      var year = today.getFullYear();


     this.form = new FormGroup({
      'ToDate' : new FormControl(month.toString(),{validators:[Validators.required]}),
      'User' : new FormControl(null,{validators:[Validators.required]})
      });
       

     
       
      combineLatest({

        subscription1 : this.reportsService.ListAllProcoreProjects(),
  
        subscription2 : this.reportsService.ListProcoreCompanyVendors(),
        
        subscription3 : this.reportsService.getLedgerDetails(),

        subscription4 : this.wqgformService.getUsers()

      }).subscribe((response)=>{
  
        this.procoreProjects = response.subscription1;
        this.ProcoreArchitects = response.subscription2;
        this.ledgerdetails = response.subscription3.ledgerdetails
        this.users = response.subscription4.users
        

        this.Sdialog.closeAll()

    
      })
     
     
     

 
      

      

    }


    onProplusReport()
    {

      const dialogConfig2 = new MatDialogConfig();
      dialogConfig2.disableClose =true;
      dialogConfig2.autoFocus =true;
      this.Sdialog.open(LoaderComponent,dialogConfig2)


      
      let ArchitectTemp = []



      this.ProcoreArchitects.map((item)=>{

       let Trades = ""
  
      if(item.trades.length>0)
      {
        Trades = item.trades[0].name
      }
    
    
      if(item.project_ids.length>0)
      {
        if(Trades==="Pro Plus Architect"||Trades==="Pro Architect"||Trades==="PMC"||Trades==="Self")
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

  

 



      this.reportsService.getOrdersAndSalesData(this.form.value.ToDate,this.form.value.User).subscribe((response)=>{
        let DataCS : any = [response]
        let Orders = response.Orders
        let CSData =  JSON.parse(response.CSData);

        var Associatelist = this.form.value.User

   

        var EndDate = new Date(this.form.value.ToDate)

        var ProPlusReport = [];


        
   
         
          for(var i=0;i<Orders.length;i++)
          {

            if(!Associatelist.includes("ALL"))
            {
              if(Orders[i].CommercialWinDate)
              {
                var WinDate = Number(Orders[i].CommercialWinDate.split('-')[0])
                var WinMonth = Number(Orders[i].CommercialWinDate.split('-')[1])
                var WinYear = Number(Orders[i].CommercialWinDate.split('-')[2])
    
                var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
                
                var winDatetest = new Date(DateFormat)
    
    
                if(winDatetest<=EndDate&&Associatelist.includes(Orders[i].Associate))
                {
    
                  let OrderProjectRefNo = ""
    
                  if(Orders[i].OrderNo.includes("/V-"))
                  {
                   let hyphen = Orders[i].OrderNo.lastIndexOf("/V-");
                   let tempproref = Orders[i].OrderNo.substring(0, hyphen);
                   let slash = tempproref.lastIndexOf("/");
                   let proref = tempproref.substring(slash + 1, hyphen); 
                   OrderProjectRefNo = proref
                  }
               
                  if(!Orders[i].OrderNo.includes("/V-"))
                  {
                   let slash = Orders[i].OrderNo.lastIndexOf("/");
                   let proref = Orders[i].OrderNo.substring(slash+ 1, Orders[i].OrderNo.length);
                   OrderProjectRefNo = proref
                  }
    

                  let CommercialWinDate = Orders[i].CommercialWinDate
                  let ProjectName = Orders[i].ProjectName
                  let OrderNo =  OrderProjectRefNo
                  let SalesHead =  Orders[i].Associate
                  let Source = Orders[i].Source
                  let GrandTotal = Orders[i].GrandTotal
                  let ClientDiscount = Orders[i].Discount
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


                   var temp = {
                    "WAName" : SalesHead,
                    "ArchitectFirm": ArchitectFirm,
                    "ProjectName": ProjectName,
                    "OrderNumber": OrderNo,
                    "CommercialWinDate":CommercialWinDate,
                    "ProPlusPercent":ProPlusValue,
                    "Collection": Collection,
                    "CreditNote": CreditNote,
                    "WriteOff" : WriteOff,
                    "NetCollection": NetCollection,
                    "Due" : Due,
                    "Booked" : Booked,
                    "BillRequired" : BillRequired,
                    "ReportTagging" : ReportTagging,
                    "WA Comments" : "",
                    "Sorting" : Sorting
                  }
    
                  ProPlusReport.push(temp)






    
                }
    
    
    
    
              }
            }


            if(Associatelist.includes("ALL"))
            {
              if(Orders[i].CommercialWinDate)
              {
                var WinDate = Number(Orders[i].CommercialWinDate.split('-')[0])
                var WinMonth = Number(Orders[i].CommercialWinDate.split('-')[1])
                var WinYear = Number(Orders[i].CommercialWinDate.split('-')[2])
    
                var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
                
                var winDatetest = new Date(DateFormat)
    
    
                if(winDatetest<=EndDate)
                {
    
                  let OrderProjectRefNo = ""
    
                  if(Orders[i].OrderNo.includes("/V-"))
                  {
                   let hyphen = Orders[i].OrderNo.lastIndexOf("/V-");
                   let tempproref = Orders[i].OrderNo.substring(0, hyphen);
                   let slash = tempproref.lastIndexOf("/");
                   let proref = tempproref.substring(slash + 1, hyphen); 
                   OrderProjectRefNo = proref
                  }
               
                  if(!Orders[i].OrderNo.includes("/V-"))
                  {
                   let slash = Orders[i].OrderNo.lastIndexOf("/");
                   let proref = Orders[i].OrderNo.substring(slash+ 1, Orders[i].OrderNo.length);
                   OrderProjectRefNo = proref
                  }
    

                  let CommercialWinDate = Orders[i].CommercialWinDate
                  let ProjectName = Orders[i].ProjectName
                  let OrderNo =  OrderProjectRefNo
                  let SalesHead =  Orders[i].Associate
                  let Source = Orders[i].Source
                  let GrandTotal = Orders[i].GrandTotal
                  let ClientDiscount = Orders[i].Discount
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


                   var temp = {
                    "WAName" : SalesHead,
                    "ArchitectFirm": ArchitectFirm,
                    "ProjectName": ProjectName,
                    "OrderNumber": OrderNo,
                    "CommercialWinDate":CommercialWinDate,
                    "ProPlusPercent":ProPlusValue,
                    "Collection": Collection,
                    "CreditNote": CreditNote,
                    "WriteOff" : WriteOff,
                    "NetCollection": NetCollection,
                    "Due" : Due,
                    "Booked" : Booked,
                    "BillRequired" : BillRequired,
                    "ReportTagging" : ReportTagging,
                    "WA Comments" : "",
                    "Sorting" : Sorting
                  }
    
                  ProPlusReport.push(temp)






    
                }
    
    
    
    
              }
            }

            

          }

  

      

          ProPlusReport.sort((a, b) => {
            if (a.Sorting < b.Sorting) {
              return -1;
            }
            if (a.Sorting > b.Sorting) {
              return 1;
            }
            return 0;
          })
  
  
  
          var SortedArchitects = []
  
          for(var i =0; i<ProPlusReport.length; i++)
          {
            if(!SortedArchitects.includes(ProPlusReport[i].Sorting))
            {
              if(Number(ProPlusReport[i].ProPlusPercent)>0)
              {
              SortedArchitects.push(ProPlusReport[i].Sorting)
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
  
  
         
  
            for(j = 0; j <ProPlusReport.length; j++)
            {
  
              if(SortedArchitects[i]===ProPlusReport[j].Sorting&&Number(ProPlusReport[j].ProPlusPercent)>0)
              {   
                totalDue = totalDue + Number(ProPlusReport[j].Due)
                totalBooked = totalBooked + Number(ProPlusReport[j].Booked)
                totalBillRequired = totalBillRequired + Number(ProPlusReport[j].BillRequired)
  
  
                let NetCol = ProPlusReport[j].NetCollection
  
                var Temp = { "WAName" :ProPlusReport[j].WAName ,"ArchitectFirm" : ProPlusReport[j].ArchitectFirm,"ProjectName" : ProPlusReport[j].ProjectName ,"ProRefNo" : ProPlusReport[j].OrderNumber , "Collection" :ProPlusReport[j].Collection , "CreditNote" :ProPlusReport[j].CreditNote ,"WriteOff" :ProPlusReport[j].WriteOff , "NetCollection" : NetCol ,"Proplus": ProPlusReport[j].ProPlusPercent,"Due" : ProPlusReport[j].Due, "Booked" : ProPlusReport[j].Booked, "BillRequired":ProPlusReport[j].BillRequired,"ReportTagging" :ProPlusReport[j].ReportTagging ,"WAComments" :""}
               
                
               
                FinalReportTemp.push(Temp)
                 
  
              }
  
           
   
            }
  
            var Temp2 = { "WAName" :"" ,"ArchitectFirm" : "","ProjectName" : "" ,"ProRefNo" : "" , "Collection" :"" , "CreditNote" :"" ,"WriteOff" :"", "NetCollection" : "" ,"Proplus": "TOTAL","Due" : totalDue, "Booked" : totalBooked, "BillRequired": totalBillRequired,"ReportTagging" :""}  
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
              "WAName",
              "ArchitectFirm",
              "ProjectName",
              "ProRefNo", 
              "Collection", 
              "CreditNote",
              "WriteOff", 
              "NetCollection",
              "Proplus",
              "Due",
              "Booked",
              "BillRequired",
              "ReportTagging"
           ] 
            
          };
  
 


       this.Sdialog.closeAll()

       new ngxCsv(FinalReportTemp, "ProPlusDetailedForAll",options);
 


      })
    }



    GetArchitectsLifeTime()
    {
            
      let ArchitectTemp = []


      const dialogConfig2 = new MatDialogConfig();
      dialogConfig2.disableClose =true;
      dialogConfig2.autoFocus =true;
      this.Sdialog.open(LoaderComponent,dialogConfig2)



      this.ProcoreArchitects.map((item)=>{

       let Trades = ""
  
      if(item.trades.length>0)
      {
        Trades = item.trades[0].name
      }
    
    
      if(item.project_ids.length>0)
      {
        if(Trades==="Pro Plus Architect"||Trades==="Pro Architect"||Trades==="PMC"||Trades==="Self")
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

  

 



      this.reportsService.getOrdersAndSalesData(this.form.value.ToDate,this.form.value.User).subscribe((response)=>{
        let DataCS : any = [response]
        let Orders = response.Orders
        let CSData =  JSON.parse(response.CSData);

        var Associatelist = this.form.value.User

   

        var EndDate = new Date(this.form.value.ToDate)

        var ProPlusReport = [];


        
   
         
          for(var i=0;i<Orders.length;i++)
          {

            if(!Associatelist.includes("ALL"))
            {
              if(Orders[i].CommercialWinDate)
              {
                var WinDate = Number(Orders[i].CommercialWinDate.split('-')[0])
                var WinMonth = Number(Orders[i].CommercialWinDate.split('-')[1])
                var WinYear = Number(Orders[i].CommercialWinDate.split('-')[2])
    
                var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
                
                var winDatetest = new Date(DateFormat)
    
    
                if(winDatetest<=EndDate&&Associatelist.includes(Orders[i].Associate))
                {
    
                  let OrderProjectRefNo = ""
    
                  if(Orders[i].OrderNo.includes("/V-"))
                  {
                   let hyphen = Orders[i].OrderNo.lastIndexOf("/V-");
                   let tempproref = Orders[i].OrderNo.substring(0, hyphen);
                   let slash = tempproref.lastIndexOf("/");
                   let proref = tempproref.substring(slash + 1, hyphen); 
                   OrderProjectRefNo = proref
                  }
               
                  if(!Orders[i].OrderNo.includes("/V-"))
                  {
                   let slash = Orders[i].OrderNo.lastIndexOf("/");
                   let proref = Orders[i].OrderNo.substring(slash+ 1, Orders[i].OrderNo.length);
                   OrderProjectRefNo = proref
                  }
    

                  let CommercialWinDate = Orders[i].CommercialWinDate
                  let ProjectName = Orders[i].ProjectName
                  let OrderNo =  OrderProjectRefNo
                  let SalesHead =  Orders[i].Associate
                  let Source = Orders[i].Source
                  let GrandTotal = Orders[i].GrandTotal
                  let ClientDiscount = Orders[i].Discount
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


                   var temp = {
                    "WAName" : SalesHead,
                    "ArchitectFirm": ArchitectFirm,
                    "ProjectName": ProjectName,
                    "OrderNumber": OrderNo,
                    "CommercialWinDate":CommercialWinDate,
                    "ProPlusPercent":ProPlusValue,
                    "Collection": Collection,
                    "CreditNote": CreditNote,
                    "WriteOff" : WriteOff,
                    "NetCollection": NetCollection,
                    "Due" : Due,
                    "Booked" : Booked,
                    "BillRequired" : BillRequired,
                    "ReportTagging" : ReportTagging,
                    "WA Comments" : "",
                    "Sorting" : Sorting
                  }
    
                  ProPlusReport.push(temp)






    
                }
    
    
    
    
              }
            }


            if(Associatelist.includes("ALL"))
            {
              if(Orders[i].CommercialWinDate)
              {
                var WinDate = Number(Orders[i].CommercialWinDate.split('-')[0])
                var WinMonth = Number(Orders[i].CommercialWinDate.split('-')[1])
                var WinYear = Number(Orders[i].CommercialWinDate.split('-')[2])
    
                var DateFormat = WinMonth+ "/" + WinDate + "/" + WinYear   
                
                var winDatetest = new Date(DateFormat)
    
    
                if(winDatetest<=EndDate)
                {
    
                  let OrderProjectRefNo = ""
    
                  if(Orders[i].OrderNo.includes("/V-"))
                  {
                   let hyphen = Orders[i].OrderNo.lastIndexOf("/V-");
                   let tempproref = Orders[i].OrderNo.substring(0, hyphen);
                   let slash = tempproref.lastIndexOf("/");
                   let proref = tempproref.substring(slash + 1, hyphen); 
                   OrderProjectRefNo = proref
                  }
               
                  if(!Orders[i].OrderNo.includes("/V-"))
                  {
                   let slash = Orders[i].OrderNo.lastIndexOf("/");
                   let proref = Orders[i].OrderNo.substring(slash+ 1, Orders[i].OrderNo.length);
                   OrderProjectRefNo = proref
                  }
    

                  let CommercialWinDate = Orders[i].CommercialWinDate
                  let ProjectName = Orders[i].ProjectName
                  let OrderNo =  OrderProjectRefNo
                  let SalesHead =  Orders[i].Associate
                  let Source = Orders[i].Source
                  let GrandTotal = Orders[i].GrandTotal
                  let ClientDiscount = Orders[i].Discount
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


                   var temp = {
                    "WAName" : SalesHead,
                    "ArchitectFirm": ArchitectFirm,
                    "ProjectName": ProjectName,
                    "OrderNumber": OrderNo,
                    "CommercialWinDate":CommercialWinDate,
                    "ProPlusPercent":ProPlusValue,
                    "Collection": Collection,
                    "CreditNote": CreditNote,
                    "WriteOff" : WriteOff,
                    "NetCollection": NetCollection,
                    "Due" : Due,
                    "Booked" : Booked,
                    "BillRequired" : BillRequired,
                    "ReportTagging" : ReportTagging,
                    "WA Comments" : "",
                    "Sorting" : Sorting
                  }
    
                  ProPlusReport.push(temp)






    
                }
    
    
    
    
              }
            }

            

          }

  

      

          ProPlusReport.sort((a, b) => {
            if (a.Sorting < b.Sorting) {
              return -1;
            }
            if (a.Sorting > b.Sorting) {
              return 1;
            }
            return 0;
          })
  
  
  
          var SortedArchitects = []
  
          for(var i =0; i<ProPlusReport.length; i++)
          {
            if(!SortedArchitects.includes(ProPlusReport[i].Sorting))
            {
              if(Number(ProPlusReport[i].ProPlusPercent)>0)
              {
              SortedArchitects.push(ProPlusReport[i].Sorting)
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
  
  
         
  
            for(j = 0; j <ProPlusReport.length; j++)
            {
  
              if(SortedArchitects[i]===ProPlusReport[j].Sorting&&Number(ProPlusReport[j].ProPlusPercent)>0)
              {   
                totalDue = totalDue + Number(ProPlusReport[j].Due)
                totalBooked = totalBooked + Number(ProPlusReport[j].Booked)
                totalBillRequired = totalBillRequired + Number(ProPlusReport[j].BillRequired)
  
  
                let NetCol = ProPlusReport[j].NetCollection
  
                var Temp = { "WAName" :ProPlusReport[j].WAName ,"ArchitectFirm" : ProPlusReport[j].ArchitectFirm,"ProjectName" : ProPlusReport[j].ProjectName ,"ProRefNo" : ProPlusReport[j].OrderNumber , "Collection" :ProPlusReport[j].Collection , "CreditNote" :ProPlusReport[j].CreditNote ,"WriteOff" :ProPlusReport[j].WriteOff , "NetCollection" : NetCol ,"Proplus": ProPlusReport[j].ProPlusPercent,"Due" : ProPlusReport[j].Due, "Booked" : ProPlusReport[j].Booked, "BillRequired":ProPlusReport[j].BillRequired,"ReportTagging" :ProPlusReport[j].ReportTagging ,"WAComments" :""}
               
                
               
                FinalReportTemp.push(Temp)
                 
  
              }
  
           
   
            }
  
            var Temp2 = { "WAName" :"" ,"ArchitectFirm" : "","ProjectName" : "" ,"ProRefNo" : "" , "Collection" :"" , "CreditNote" :"" ,"WriteOff" :"", "NetCollection" : "" ,"Proplus": "TOTAL","Due" : totalDue, "Booked" : totalBooked, "BillRequired": totalBillRequired,"ReportTagging" :""}  
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
   
          
  
  
  
          var options2 = { 
 
            headers:  [
              "Sno.", 
              "ArchitectFirm",
              "Due",
              "Booked", 
              "BillRequired" 
            ]
            
           
            
           };
    
    
            this.Sdialog.closeAll()
    
    
           new ngxCsv(ArchitectsSummary, "ArchitectsSummary" ,options2);
 


      })

    }

}
