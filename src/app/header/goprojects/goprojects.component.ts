import { Component, OnInit , OnDestroy,ViewChild} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { environment } from '../../../environments/environment';
import { MatCard } from '@angular/material/card';
import { WqgformService } from 'src/app/services/wqgform.service';
import { UsersService } from 'src/app/services/user.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { User } from 'src/app/shared/user.model';
import { Order } from 'src/app/shared/order.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LedgerdetailsService } from 'src/app/services/ledgerdetails.service';
import { stringify } from 'querystring';
import { HttpClient } from '@angular/common/http';
import { ProcoreService } from 'src/app/services/procore.service';
import { LoaderService } from 'src/app/services/loader.service';
import { CommercialwinService } from 'src/app/services/commercialwin.service';
import { HandoverService } from 'src/app/services/handover.service';
import { GetjbService } from 'src/app/services/getjb.service';
import { ReportsService } from 'src/app/services/reports.service';
import { GetjbproserviceService } from 'src/app/services/getjbproservice.service';
import { SpecialrequestsService } from 'src/app/services/specialrequests.service';
import { LoaderComponent } from '../projects/loader/loader.component';
import { LedgerdetailsComponent } from '../projects/ledgerdetails/ledgerdetails.component';
import { RequestsComponent } from '../projects/requests/requests.component';
import { ErrorComponent } from '../projects/error/error.component';
import { CommercialwinComponent } from '../projects/commercialwin/commercialwin.component';
import { GetjbComponent } from '../projects/getjb/getjb.component';
import { GetjbproComponent } from '../projects/getjbpro/getjbpro.component';
import { HandoverComponent } from '../projects/handover/handover.component';
import { GlassOrder } from 'src/app/shared/glassorder.model';
import { GlassledgerdetailsComponent } from '../glassonly/glassledgerdetails/glassledgerdetails.component';
import { GlassledgerdetailsService } from 'src/app/services/glassledgerdetails.service';
import { GlasscommercialwinComponent } from '../glassonly/glasscommercialwin/glasscommercialwin.component';
import { GlasscommercialwinService } from 'src/app/services/glasscommercialwin.service';
import { GlasshandoverComponent } from '../glassonly/glasshandover/glasshandover.component';
import { GlasshandoverService } from 'src/app/services/glasshandover.service';



@Component({
  selector: 'app-goprojects',
  templateUrl: './goprojects.component.html',
  styleUrls: ['./goprojects.component.css']
})

export class GoprojectsComponent implements OnInit , OnDestroy {


  
 


  CSData : any;
  private csdataSub : Subscription;

  OrderNumber : string;
  ProjectName : string;
  Party : string;
  SalesHead : string;
  WinDate : string;
  Webappvalue : string;
  Discount : string;
  FinalValue : string;
  Billed : string;
  SpecialDiscount : string;
  ReceiptAdvance : string;
  DiscountValue : string;
  TotalOutstanding : string;
  ChequeRequired : string;
  spinner : boolean = false;
  Dealerdiscount : string;
  DealerDiscountValue : string;
  ClientDiscount : string;
  CSValue : string;
  ClientDiscountValue : string;
  AsonDate : string;
  Status : string;

  

  

  
  SelectedOrderNumber :string;

  ProjectManagerOrders = [];

  keyword = 'OrderNo';


  users : User[] = [];
  orders : GlassOrder[] = [];
  subscription : Subscription[] = [];
  UserData :string;

  userList : string[] = []

  spinnerStatus: boolean = false;

  DisplayedColumns : string[] = ['Order Number','Project Name','Status','Discount','Final Amount','Win Date','Edit Date','actions']
  DisplayedRows : MatTableDataSource<any>;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  searchKey:string = "";


  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;
  Profile : string;
  EditDate:string;
  WinDateGJB : string
  CommercialWinDate: string;
  HandOverDate: string;
  CreationDate :string;

  Plan :string;
  PlanValue : string;


  AssociatedSince : string;
  Code :string;

  hostUrl = environment.hostURL;

  endpoint = "https://login.procore.com/oauth/authorize?response_type=code&client_id=12c3dcd740c1e0a78e2a70e60e27413f0de6dda178de86069f2fda447a949960&redirect_uri=http://3.109.31.86/projects/projects"


  code :string;
  project : any = [];

  form : FormGroup;
  formpro : FormGroup;


  notloaded : boolean = false;

 


  //===================================================

 


  //====================================================

  

  constructor(
    public projectsService : ProjectsService,
    public wqgformService : WqgformService,
    public glassledgerdetailsService : GlassledgerdetailsService,
    public glasshandoverservice :GlasshandoverService,
    public glasscommericialwinservice : GlasscommercialwinService,
    public ledgerdetailsService : LedgerdetailsService,
    public router : Router,
    private userService : UsersService,
    private dialog : MatDialog,
    private Sdialog : MatDialog,
    private Edialog : MatDialog,
    private CWdialog : MatDialog,
    private HOdialog : MatDialog,
    private GJBdialog : MatDialog,
    private SRdialog : MatDialog,
    private GJBProdialog : MatDialog,
    private overlay: Overlay,
    private route : ActivatedRoute,
    private http : HttpClient,
    public procoreService : ProcoreService,
    public loaderService  :LoaderService,
    public commericialwinservice : CommercialwinService,
    public handoverservice : HandoverService,
    public getjbservice : GetjbService,
    public getjbproservice : GetjbproserviceService,
    public specialrequestsservice : SpecialrequestsService,
    public reportsService : ReportsService

    
    ) {}

  ngOnInit(): void {


   this.form = new FormGroup({
      'Search' : new FormControl(null),
      'Status' : new FormControl("Pipeline"),
      'User' : new FormControl(null)
    });


    this.formpro = new FormGroup({
      'GetJBOrders' : new FormControl(null)
    })

    this.notloaded = false;


  //  this.form.patchValue({'Status': "Pipeline"});
  
  
   

    //===============Getting the User and MaxDiscount Value==========================================
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.UserFullName = this.userService.getUserFullName();
    this.UserData = this.UserFullName
  

    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
      this.UserFullName = this.userService.getUserFullName();
      this.UserData = this.UserFullName;  
   });

   

//===========================AVINASH=================



//===================================================

   this.projectsService.getGlassProjects(this.UserFullName)
  //=====================GET USERS==================================================================
   this.wqgformService.getUsers().subscribe(usersData =>{
     this.users = usersData.users;
  
     this.users.map(item =>{
       if(item.UserFullName===this.UserFullName)
       {
         this.Profile = item.Profile;
         this.AssociatedSince = item.AssociatedSince;
         this.Code = item.Code;
       }
     })
     
    

     if(this.Profile==="ADMIN")
     {
      this.userList = [];
      this.users.map(item =>{
        this.userList.push(item.UserFullName)
      })
      
      this.userList.push("ALL");
      this.form.patchValue({'User':this.UserFullName});
      this.form.patchValue({'Status': "All"});
      
     }
     
     if(this.Profile==="USER")
     {
      this.userList = [];
      this.userList.push(this.UserFullName)
      this.form.patchValue({'User':this.UserFullName});
      this.form.patchValue({'Status': "All"});
     }

     if(this.Profile==="ACCOUNTS")
     {
      this.userList = ["ALL"];
      this.form.patchValue({'User': "ALL"});
      this.form.patchValue({'Status': "Commercial Hold"});
     }

     if(this.Profile==="PRE PRODUCTION")
     {
      this.userList = ["SHASHANK SINGH","VIKAS SINGHAL","ANKIT AGGARWAL","GAURAV SINGHAL","ANUJ JAIN","VIPIN KUMAR"];
      this.form.patchValue({'User': "SHASHANK SINGH"});
      this.form.patchValue({'Status': "Win"});
     }
     
     
     if(this.Profile==="BACKEND")
     {
      this.userList = ["ALL"];
      this.form.patchValue({'User': "ALL"});
      this.form.patchValue({'Status': "Win"});
     }




     if(this.Profile==="PROJECT MANAGER")
     {

      this.spinnerStatus =true;
      this.projectsService.getProjectManagerOrders().subscribe((response)=>{

        this.ProjectManagerOrders = response.orders
        this.spinnerStatus =false;

      })
     }
     
     

   })   

  
  //====================GET ORDERS==================================================================
 
   this.projectsService.getGlassOrderUpdateListener().subscribe(projectData =>{ 


     this.orders = [];
     projectData.map(item=>{
      
       this.orders.push(item)
      
    })




    //=============================Calculations for Charts=============================================================

 
    //=================================================================================================
     this.DisplayedRows = new MatTableDataSource(this.orders)
     this.DisplayedRows.sort = this.sort; 
     this.DisplayedRows.paginator = this.paginator;

     this.notloaded = true;
   })

   
  

 
   this.userValuechanges();
   this.statusValuechanges();

  }












  applyFilter()
  {
  this.DisplayedRows.filter = this.form.value.Search.trim().toLowerCase();
  }


  OnEditOrder(row:Order)
  {

  let id = row._id;
  this.router.navigate(["/project/"]);

  }

  OnPreviewOrder(row:Order)
  {
    let id = row._id;

   
    this.router.navigate(["/glasspresentation/"+id]);

  }

  
  OpenLedgerForm(row:Order)
  {
    
     //===============Ledger Dialog===============
     this.glassledgerdetailsService.getOrderDetails(row.OrderNo,row._id,row.ProjectName,row.Associate);
     const scrollStrategy = this.overlay.scrollStrategies.reposition();
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose =true;
     dialogConfig.autoFocus =true;
     dialogConfig.width = "90%";
     dialogConfig.height= "90%";
     dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
     this.Sdialog.closeAll()
     this.dialog.open(GlassledgerdetailsComponent,dialogConfig)

    //========================================== 
    

  }


  ngOnDestroy(): void {
   this.authListenerSubs.unsubscribe();
   

    this.subscription.forEach(item =>{
      if(item) item.unsubscribe()
    })

  }





  //================================TEST PROCORE=========================================================


  OpenSpecialRequest(row : Order)
  {

     //===============Ledger Dialog===============
     this.specialrequestsservice.setOrderDetails(row)
     const scrollStrategy = this.overlay.scrollStrategies.reposition();
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose =true;
     dialogConfig.autoFocus =true;
     dialogConfig.width = "50%";
     dialogConfig.height= "70%";
     dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
    // this.SRdialog.closeAll()
     this.SRdialog.open(RequestsComponent,dialogConfig)

    //========================================== 
    

  }



  userValuechanges(){

    this.notloaded = true;

     this.subscription.push(this.form.get('User').valueChanges.subscribe((response)=>{
     

   
      if(response==="ALL")
      {
        this.form.patchValue({'Status': "Win"});
      }
      
      
      this.subscription.push(this.form.get('User').valueChanges.subscribe((response)=>{
       this.projectsService.getGlassProjects(response)
        this.projectsService.getGlassOrderUpdateListener().subscribe(projectData =>{
          this.orders = [];
          projectData.map(item=>{if(item.Status===this.form.value.Status)
          {
            this.orders.push(item)
          }
         
         })
          this.DisplayedRows = new MatTableDataSource(this.orders)
          this.DisplayedRows.sort = this.sort;
          this.DisplayedRows.paginator =this.paginator;
        })
         
       }))
     
       this.notloaded = false; 
     
      }))

  }




   statusValuechanges(){

    this.notloaded = true;

    this.subscription.push(this.form.get('Status').valueChanges.subscribe((response)=>{
      this.projectsService.getGlassProjects(this.form.value.User)

   

      this.projectsService.getGlassOrderUpdateListener().subscribe(projectData =>{
        this.orders = [];
        projectData.map(item=>{
        if(response!=="All")
        {
        if(item.Status===response)
        {
          this.orders.push(item)
        }
        }
 
        if(response==="All")
        {
          if(item.Status!=="Edited")
          {
            this.orders.push(item)
          }
        }
 
   

       })
        this.DisplayedRows = new MatTableDataSource(this.orders)
        this.DisplayedRows.sort = this.sort;
        this.DisplayedRows.paginator =this.paginator;
      })

      this.notloaded = false;
       
     }))



 }


 RefreshEdits(row:Order)
 {

    //=================Spinner Dialog================
     const dialogConfig2 = new MatDialogConfig();
     dialogConfig2.disableClose =true;
     dialogConfig2.autoFocus =true;
     this.Sdialog.open(LoaderComponent,dialogConfig2)
    //=================================================   

  this.procoreService.UpdateWinProcoreProject(row).subscribe((response)=>{


    this.http.post<{message : string,orders : Order}>(this.hostUrl+"/api/orders/pushsolutions/"+response._id, response.Solutions).subscribe(responseData => {
      this.Sdialog.closeAll()

     //=================Spinner Dialog================
     const dialogConfig3 = new MatDialogConfig();
     dialogConfig3.disableClose =true;
     dialogConfig3.autoFocus =true;
     this.Edialog.open(ErrorComponent,dialogConfig3)
    //=================================================  
      
  
    })




  })
 }


 OnAdvanceReceived(row :Order)
 {
  

 


  this.getjbservice.getOrderDetails(row)
  this.glasscommericialwinservice.getOrderDetails(row.OrderNo,row._id,row.ProjectName,this.UserFullName,row.FinalAmount);
  const scrollStrategy = this.overlay.scrollStrategies.reposition();
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose =true;
  dialogConfig.autoFocus =true;
  dialogConfig.width = "30%";
  dialogConfig.height= "60%";
  dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
  this.CWdialog.open(GlasscommercialwinComponent,dialogConfig)

    
  

 }


 
 OnHandOverOrder(row :Order)
 {
  
  this.getjbservice.getOrderDetails(row);
  this.glasshandoverservice.getOrderDetails(row.OrderNo,row._id,row.ProjectName,this.UserFullName,row.FinalAmount)
  const scrollStrategy = this.overlay.scrollStrategies.reposition();
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose =true;
  dialogConfig.autoFocus =true;
  dialogConfig.width = "30%";
  dialogConfig.height= "55%";
  dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
  this.HOdialog.open(GlasshandoverComponent,dialogConfig)

 }
 

OnGetJB(row : Order)
{

  this.getjbservice.getOrderDetails(row)
  const scrollStrategy = this.overlay.scrollStrategies.reposition();
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose =true;
  dialogConfig.autoFocus =true;
  dialogConfig.width = "40%";
  dialogConfig.height= "80%";
  dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
  this.GJBdialog.open(GetjbComponent,dialogConfig)


}



selectEvent(item) {

  this.SelectedOrderNumber = item.OrderNo
 
}


onChangeSearch(val: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e){
  // do something when input is focused
}


OnGetProManJB()
{
  let SelectedOrder = this.formpro.value.GetJBOrders.OrderNo;
  

 
  




  this.getjbservice.getOrderDetails(this.formpro.value.GetJBOrders)
  
  this.getjbservice.getSpecialRequests().subscribe((specialReqs)=>{

  this.reportsService.getLedgerDetails().subscribe((ledgerData)=>{
      let ledgerdetails = ledgerData.ledgerdetails

      this.Plan = ""
      this.PlanValue = "";


      let OrderProjectRefNo = ""

      if(SelectedOrder.includes("/V-"))
      {
       let hyphen = SelectedOrder.lastIndexOf("/V-");
       let tempproref = SelectedOrder.substring(0, hyphen);
       let slash = tempproref.lastIndexOf("/");
       let proref = tempproref.substring(slash + 1, hyphen); 
       OrderProjectRefNo = proref
      }
   
      if(!SelectedOrder.includes("/V-"))
      {
       let slash = SelectedOrder.lastIndexOf("/");
       let proref = SelectedOrder.substring(slash+ 1, SelectedOrder.length);
       OrderProjectRefNo = proref
      }
      


      ledgerdetails.map((item)=>{

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
       this.Plan = item.ProPlus
      }
      if(LedRefno===OrderProjectRefNo)
      {
       if(item.ProPlusCost)
       {
         this.PlanValue = item.ProPlusCost
       }
      
      }

      })
     
 

   
      this.authListenerSubs = this.getjbservice.getCSDataUpdateListener().subscribe((CSDat)=>{


      var today = new Date()
      var todaydate = today.getDate();
      var todayMonth = today.getMonth()+1;
      var todayYear = today.getFullYear()

      this.AsonDate = todaydate + "-" + todayMonth + "-" + todayYear

    

      let FinalDis : number = 0
      let CSValue : number = 0;

      this.wqgformService.getUsers().subscribe((users)=>{
        users.users.map(item=>{
          if(item.UserFullName===CSDat[0].Order.Associate)
          {
            FinalDis = Number(item.DealerDiscount);
            this.Dealerdiscount = FinalDis.toString()
           }

        })

                

        let WinRefNo = ""

        if(CSDat[0].Order.OrderNo.includes("/V-"))
        {
         let hyphen = CSDat[0].Order.OrderNo.lastIndexOf("/V-");
         let tempproref = CSDat[0].Order.OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         WinRefNo = proref
        }
      
        if(!CSDat[0].Order.OrderNo.includes("/V-"))
        {
         let slash = CSDat[0].Order.OrderNo.lastIndexOf("/");
         let proref = CSDat[0].Order.OrderNo.substring(slash+ 1, CSDat[0].Order.OrderNo.length);
         WinRefNo = proref
        }


        specialReqs.specialrequests.map((item)=>{

          if(WinRefNo===item.OrderNo)
          {
            FinalDis = Number(item.NewDealerDiscount);
            this.Dealerdiscount = item.NewDealerDiscount.toString()
            
          }

        }) 




        if(FinalDis>0)
        {
          this.Discount = FinalDis.toString();
          this.DiscountValue =  (Math.ceil(Number(CSDat[0].Order.GrandTotal)*FinalDis*0.01)).toString()
          CSValue = (Math.ceil(Number(CSDat[0].Order.GrandTotal) -  Number(CSDat[0].Order.GrandTotal)*FinalDis*0.01))
        }
        if(FinalDis==0)
        {
          this.Discount = CSDat[0].Order.Discount
          this.DiscountValue =  (Math.ceil(Number(CSDat[0].Order.GrandTotal)*Number(this.Discount)*0.01)).toString()
          CSValue = (Math.ceil(Number(CSDat[0].Order.GrandTotal) -  Number(CSDat[0].Order.GrandTotal)*Number(this.Discount)*0.01))
        }
        

        let CSData = JSON.parse(CSDat[0].CSData);
        this.OrderNumber = CSDat[0].Order.OrderNo;
        this.ProjectName = CSDat[0].Order.ProjectName;
        this.SalesHead = CSDat[0].Order.Associate;
        this.Webappvalue = CSDat[0].Order.GrandTotal;
        this.WinDate = CSDat[0].Order.WinDate;
        this.CSValue = CSValue.toString();
        this.FinalValue = (Math.ceil(Number(CSDat[0].Order.FinalAmount))).toString();
        this.Party = CSData.BILLTO_PNAME
        this.Billed = CSData.DISPATCHPIVALUE
        this.ReceiptAdvance = CSData.INVOICECOLLECTION
        this.ClientDiscount = CSDat[0].Order.Discount;
        this.ClientDiscountValue = (Number(this.Webappvalue)*Number(this.ClientDiscount)*0.01).toFixed(2).toString()
        this.DealerDiscountValue  = (Number(this.Webappvalue)*Number(this.Dealerdiscount)*0.01).toFixed(2).toString()
     
        this.SpecialDiscount = CSData.PDCCOLLECTION
        this.TotalOutstanding = (Number(this.CSValue) - Number(CSData.INVOICECOLLECTION ) - Number(CSData.PDCCOLLECTION)).toString()
        this.ChequeRequired = (Number(this.Billed) -Number(this.ReceiptAdvance)).toString();




    //    new ngxCsv();


     let FileName = "Get JB Report"

     let ExcelData = []
     
     this.Status = this.formpro.value.GetJBOrders.Status
     this.EditDate = this.formpro.value.GetJBOrders.EditDate
     this.WinDateGJB = this.formpro.value.GetJBOrders.WinDate
     this.CommercialWinDate =  this.formpro.value.GetJBOrders.CommercialWinDate
     this.HandOverDate = this.formpro.value.HandOverDate
     this.CreationDate = this.formpro.value.GetJBOrders.CreationDate

     let temp0 = ["As On Date",this.AsonDate] 
     ExcelData.push(temp0)
     let temp1 = ["Order Number",this.OrderNumber] 
     ExcelData.push(temp1)
     let temp30 = ["Status", this.Status ] 
     ExcelData.push(temp30)
     let temp2 = ["Project Name",this.ProjectName] 
     ExcelData.push(temp2)
     let temp3 = ["WA Sales Head",this.SalesHead] 
     ExcelData.push(temp3)
     let temp4 = ["Grand Total",this.Webappvalue] 
     ExcelData.push(temp4)
     let temp7 = ["Client Discount",this.ClientDiscount] 
     ExcelData.push(temp7)
     let temp8 = ["Client Discount Value",this.ClientDiscountValue] 
     ExcelData.push(temp8)
     let temp9 = ["Dealer Discount",this.Dealerdiscount]
     ExcelData.push(temp9)
     let temp10 = ["Dealer Discount Value",this.DealerDiscountValue]
     ExcelData.push(temp10)
     let temp11 = ["Final Value",this.FinalValue]
     ExcelData.push(temp11)
     let temp6 =  ["CS Value",this.CSValue] 
     ExcelData.push(temp6)
     let temp22 = ["Pro Plus Value",this.DealerDiscountValue]
     ExcelData.push(temp22)
     let temp12 = ["Billed",this.Billed]
     ExcelData.push(temp12)
     let temp13 = ["Party",this.Party] 
     ExcelData.push(temp13)
     let temp14 = ["SpecialDiscount", this.SpecialDiscount] 
     ExcelData.push(temp14)
     let temp24 = ["ReceiptAdvance", this.ReceiptAdvance] 
     ExcelData.push(temp24)
     let temp15 = ["TotalOutstanding",this.TotalOutstanding] 
     ExcelData.push(temp15)
     let temp16 = ["ChequeRequired",this.ChequeRequired]
     ExcelData.push(temp16)
     let temp5 =  ["CreationDate",this.CreationDate] 
     ExcelData.push(temp5)
     let temp17 = ["LastEditDate",this.EditDate]
     ExcelData.push(temp17)
     let temp18 = ["WinDate",this.WinDateGJB]
     ExcelData.push(temp18)
     let temp19 = ["CommercialWinDate", this.CommercialWinDate]
     ExcelData.push(temp19)
     let temp20 = ["HandOverDate",this.HandOverDate ]
     ExcelData.push(temp20)
     let temp21 = ["Plan",this.Plan]
     ExcelData.push(temp21)
     let temp23 = ["PlanValue",this.PlanValue]
     ExcelData.push(temp23)





    this.getjbproservice.setOrderDetails(ExcelData)
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose =true;
    dialogConfig.autoFocus =true;
    dialogConfig.width = "40%";
    dialogConfig.height= "100%";
    dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
    this.GJBProdialog.open(GetjbproComponent,dialogConfig)



      })
    


     

     
  
    });







    })

  })





}



}
