import { Component , OnInit , OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LedgerdetailsService } from 'src/app/services/ledgerdetails.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UsersService } from 'src/app/services/user.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/shared/order.model';
import { User } from 'src/app/shared/user.model';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { CommercialWin } from 'src/app/shared/commericalwin.model';
import { Handover } from 'src/app/shared/handover.model';
import { LoaderComponent } from '../../projects/loader/loader.component';
import { LedgerDetail } from 'src/app/shared/ledgerdetail.model';
import { forkJoin } from 'rxjs';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-incentives',
  templateUrl: './incentives.component.html',
  styleUrls: ['./incentives.component.css']
})
export class IncentivesComponent implements OnInit, OnDestroy {

  form : FormGroup;
  orders : Order[] = [];
  users : User[] = [];

  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;
  Profile : string;
  commercialwins : CommercialWin[] = [];
  handovers: Handover[] = [];
  subscription : Subscription[] = [];

  procoreProjects : any
  ProcoreArchitects : any
  User : any

  Month : any

  ledgerdetails : LedgerDetail[] = [];

  observable1: Observable<any>
  observable2: Observable<any> 
  observable3: Observable<any> 
  Toggle : boolean = false;


 Third= []
 ThirdEffectiveDiscount : any
 ThirdIncentive : any
 ThirdCollection : any
 ThirdProjectCount : any

 Second= []
 SecondEffectiveDiscount : any
 SecondIncentive : any
 SecondCollection : any
 SecondProjectCount : any

 First= []
 FirstEffectiveDiscount : any
 FirstIncentive : any
 FirstCollection : any
 FirstProjectCount : any

 FirstMonthWinCount = 0
 SecondMonthWinCount = 0
 ThirdMonthWinCount = 0

 FirstMonthWinAmount = 0
 SecondMonthWinAmount = 0
 ThirdMonthWinAmount = 0

 Sales = []

 FirstSales : any
 SecondSales : any
 ThirdSales : any
 SalesEffectiveFirst : any


 FirstMonth : any
 SecondMonth : any
 ThirdMonth : any
 AsOnDate : any

 dataloaded : boolean = false;
 social : boolean = false;
 socialArray = [];

 socialdue = []





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

      'Toggle' : new FormControl(null,{validators:[Validators.required]}),
      'FromDate' : new FormControl(null,{validators:[Validators.required]}),
      'ToDate' :  new FormControl(null,{validators:[Validators.required]}),
      'Month' : new FormControl(month.toString(),{validators:[Validators.required]}),
      'Year' : new FormControl(year.toString(),{validators:[Validators.required]}),
      'User' : new FormControl("NONE",{validators:[Validators.required]}),
      'UserTo' : new FormControl("NONE",{validators:[Validators.required]})
      });
       

     
       
      combineLatest({

        subscription1 : this.reportsService.ListAllProcoreProjects(),
  
        subscription2 : this.reportsService.ListProcoreCompanyVendors(),
        
        subscription3 : this.reportsService.getLedgerDetails()

      }).subscribe((response)=>{
  
        this.procoreProjects = response.subscription1;
        this.ProcoreArchitects = response.subscription2;
        this.ledgerdetails = response.subscription3.ledgerdetails
        

        this.Sdialog.closeAll()

    
      })
     
     
     

     this.OnToggleChanges()
      

      

    }


    onIncentivesReport()
    {
      
      if(this.form.value.User==="NONE")
      {
        alert("Please select the user")

        return
      }
 
    


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
  
 
 
      



       this.reportsService.getIncentiveData(this.form.value.Month,this.form.value.Year,this.form.value.User).subscribe((response)=>{
          
        let DataCS :any = [response]
        let Orders = response.Orders
        let FirstMonthData =  JSON.parse(response.FirstMonthData);
        let SecondMonthData =  JSON.parse(response.SecondMonthData);
        let ThirdMonthData =  JSON.parse(response.ThirdMonthData);

        var FullSalesData = []

 
        if(this.form.value.User ==="SOCIAL")
        {
          FullSalesData = JSON.parse(response.FullData);
        }
  


       

        if(this.form.value.User==="SOCIAL")
        {
          this.social = true
        }

        if(this.form.value.User!=="SOCIAL")
        {
          this.social = false
        }



        this.FirstMonth = response.FirstDate.split("-")[1]
        this.SecondMonth = response.SecondDate.split("-")[1]
        this.ThirdMonth = response.ThirdDate.split("-")[1]


        var today = new Date();
        var todayDate = today.getDate();
        var todayMonth = today.getMonth() + 1;
        var todayYear = today.getFullYear()




        this.AsOnDate  = todayDate + "-" + todayMonth + "-" + todayYear



        var FirstMonthArray = [];
        var FirstMonthSalesArray = [];
        var FirstAvgEffectiveDiscount =0;
        var FirstMonthIncentive =0;
        var FirstMonthCollection =0;
        var FirstMonthProjectCount =0;
        var FirstMonthSales = 0;
        var SalesEffective = 0;


      
  
        var Tmonth = Number(this.form.value.Month )+1
        var TDate = Tmonth.toString() + "/01/"+this.form.value.Year
  
        var today = new Date(TDate)

        
   var lastmonthFirst = new Date(today.getFullYear(), today.getMonth() - 1, 1);
   var lastmonthlast = new Date(today.getFullYear(), today.getMonth(), 0);


   
   lastmonthFirst.setHours(0);
   lastmonthFirst.setMinutes(0);
   lastmonthFirst.setSeconds(0);
   lastmonthFirst.setMilliseconds(0); 

   
   lastmonthlast.setHours(0);
   lastmonthlast.setMinutes(0);
   lastmonthlast.setSeconds(0);
   lastmonthlast.setMilliseconds(0); 

 

 
   

   var SlastmonthFirst = new Date(today.getFullYear(), today.getMonth() - 2, 1);
   var Slastmonthlast = new Date(today.getFullYear(), today.getMonth()-1, 0);


    
   SlastmonthFirst.setHours(0);
   SlastmonthFirst.setMinutes(0);
   SlastmonthFirst.setSeconds(0);
   SlastmonthFirst.setMilliseconds(0); 

   
   Slastmonthlast.setHours(0);
   Slastmonthlast.setMinutes(0);
   Slastmonthlast.setSeconds(0);
   Slastmonthlast.setMilliseconds(0); 



  


   var TlastmonthFirst = new Date(today.getFullYear(), today.getMonth() -3, 1);
   var Tlastmonthlast = new Date(today.getFullYear(), today.getMonth()-2, 0);


   TlastmonthFirst.setHours(0);
   TlastmonthFirst.setMinutes(0);
   TlastmonthFirst.setSeconds(0);
   TlastmonthFirst.setMilliseconds(0); 

   
   Tlastmonthlast.setHours(0);
   Tlastmonthlast.setMinutes(0);
   Tlastmonthlast.setSeconds(0);
   Tlastmonthlast.setMilliseconds(0); 



    this.FirstMonthWinCount = 0
    this.SecondMonthWinCount = 0
    this.ThirdMonthWinCount = 0

    this.FirstMonthWinAmount = 0
    this.SecondMonthWinAmount = 0
    this.ThirdMonthWinAmount = 0

        
for(var i = 0 ; i < Orders.length; i++)
{
  if(Orders[i].CommercialWinDate!=="")
  {
   let Wdate = Orders[i].CommercialWinDate.split("-")[0]
   let WMonth = Orders[i].CommercialWinDate.split("-")[1]
   let WYear = Orders[i].CommercialWinDate.split("-")[2]


   var winDateFormat = WMonth + "/"+ Wdate + "/" +  WYear

   var WinDate = new Date(winDateFormat)

   WinDate.setHours(0);
   WinDate.setMinutes(0);
   WinDate.setSeconds(0);
   WinDate.setMilliseconds(0); 


   if(WinDate>=lastmonthFirst&&WinDate<=lastmonthlast)
   {


     this.FirstMonthWinCount = this.FirstMonthWinCount + 1
     this.FirstMonthWinAmount =  this.FirstMonthWinAmount  + Number(Orders[i].FinalAmount)

   }

   if(WinDate>=SlastmonthFirst&&WinDate<=Slastmonthlast)
   {
     this.SecondMonthWinCount = this.SecondMonthWinCount + 1
     this.SecondMonthWinAmount =  this.SecondMonthWinAmount  + Number(Orders[i].FinalAmount)

   }

   if(WinDate>=TlastmonthFirst&&WinDate<=Tlastmonthlast)
   {
     this.ThirdMonthWinCount = this.ThirdMonthWinCount + 1
     this.ThirdMonthWinAmount =  this.ThirdMonthWinAmount  + Number(Orders[i].FinalAmount)

   }





  }

}


        for(var a=0; a<FirstMonthData.length; a++)
       {

        for(var i =0 ; i < Orders.length ; i++)
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


       if(this.form.value.User!=="SOCIAL")
       {
          if(Orders[i].Associate===this.form.value.User)
          {

            if(FirstMonthData[a].PROJREFNO===OrderProjectRefNo)
            {
  
              FirstMonthProjectCount =FirstMonthProjectCount + 1;
  
              let ArchitectFirm = "";
  
              for(var p= 0;p<ArchProList.length; p++)
              { 
               if(OrderProjectRefNo ===ArchProList[p].OrderNo)
               {
                 ArchitectFirm = ArchProList[p].ArchitectFirm
               }
         
              }
  
              let PlanValue = 0
              let Plan = "Basic"
             
              
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
                  PlanValue = Number(item.ProPlusCost)
                }
               
               }
    
               })
  
               let Collection = FirstMonthData[a].Collection;
               let PdcCollection = FirstMonthData[a].PdcCollection;
               let Sales = FirstMonthData[a].Sales;

               let Incentive = 0;
                if(Orders[i].Associate!=="ANKIT AGGARWAL")
                {
                  Incentive = (Number(Collection)*(100-Number(PlanValue))/118)*0.02
                }
               
                if(Orders[i].Associate ==="ANKIT AGGARWAL")
                {
                  let Type1Due = (Number(Collection)*(100-Number(PlanValue))/118)*0.10

                  let Type2Due = 0;
 
                  if(Number(Orders[i].Discount)<43)
                  {

                    let A = 43-Number(Orders[i].Discount)
    
                    let B = Number(Collection)/((100-Number(Orders[i].Discount))*0.01)

                    let C = Number(Collection)*Number(PlanValue)*0.01

         
                    Type2Due = ((B*A*.01)-(C))/1.18
         

                  }

                  var number1 = Type1Due
                  var number2 = Type2Due
                  var maximum

                  if (number1 > number2) {
                     maximum = number1;
                   } else {
                   maximum = number2;
                   }

                  Incentive = maximum
                }

              if(Number(Collection)>0)
              {
               var temp = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Collection: Collection,
                Due : Incentive.toFixed(0)      
               }
               
             


               FirstMonthIncentive =FirstMonthIncentive  + Number(Incentive)
               FirstMonthCollection = FirstMonthCollection + Number(Collection)
               let EffectiveDiscount = Number(Orders[i].Discount) + Number(PlanValue)
               FirstAvgEffectiveDiscount = FirstAvgEffectiveDiscount + Number(EffectiveDiscount)
               

               FirstMonthArray.push(temp)
               
               }


               if(Number(Sales)>0)
              {
               var temp2 = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Sales : Sales,  
                Collection: Collection
                  
               }
               
             


               FirstMonthSales = FirstMonthSales + Number(Sales)

               let EffectiveDiscount2 = Number(Orders[i].Discount) + Number(PlanValue)
               SalesEffective = SalesEffective + Number(EffectiveDiscount2)

               

               FirstMonthSalesArray.push(temp2)
               
               }
               
  
  
  
            }



          }
       }

       if(this.form.value.User==="SOCIAL")
       {
     
          if(Orders[i].Source==="SOCIAL")
          {


            if(FirstMonthData[a].PROJREFNO===OrderProjectRefNo)
            {
  
              FirstMonthProjectCount =FirstMonthProjectCount + 1;
  
              let ArchitectFirm = "";
  
              for(var p= 0;p<ArchProList.length; p++)
              { 
               if(OrderProjectRefNo ===ArchProList[p].OrderNo)
               {
                 ArchitectFirm = ArchProList[p].ArchitectFirm
               }
         
              }
  
              let PlanValue = 0
              let Plan = "Basic"
             
              
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
                  PlanValue = Number(item.ProPlusCost)
                }
               
               }
    
               })
  
               let Collection = FirstMonthData[a].Collection;
               let PdcCollection = FirstMonthData[a].PdcCollection;
               let Sales = FirstMonthData[a].Sales;

               let Incentive = 0;
                if(Orders[i].Source ==="SOCIAL")
                {
                  Incentive = (Number(Collection)*(100-Number(PlanValue))/118)*0.015
                }
               
              if(Number(Collection)>0)
              {
               var temp = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Collection: Collection,
                Due : Incentive.toFixed(0)    

               
                          
               }

               var temp45 = {
                 WinDate : Orders[i].CommercialWinDate,
                 WAName :  Orders[i].Associate,
                 OrderNo : Orders[i].OrderNo,
                 ProjectName : Orders[i].ProjectName,
                 ArchitectFirmName : ArchitectFirm,
                 ProjectCount : "",
                 PlanValue : PlanValue,
                 Collection : Collection,
                 Due : Incentive.toFixed(0)
            
               }

               this.socialdue.push(temp45)
               


               FirstMonthIncentive =FirstMonthIncentive  + Number(Incentive)
               FirstMonthCollection = FirstMonthCollection + Number(Collection)
               let EffectiveDiscount = Number(Orders[i].Discount) + Number(PlanValue)
               FirstAvgEffectiveDiscount = FirstAvgEffectiveDiscount + Number(EffectiveDiscount)

               FirstMonthArray.push(temp)
               }


               if(Number(Sales)>0)
              {
               var temp2 = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Sales : Sales,
                Collection: Collection


               
                          
               }
               


               FirstMonthSales = FirstMonthSales + Number(Sales)
               
               let EffectiveDiscount2 = Number(Orders[i].Discount) + Number(PlanValue)
               SalesEffective = SalesEffective + Number(EffectiveDiscount2)

               

               FirstMonthSalesArray.push(temp2)
               }
  
  
  
            }



          }
       }


        }

        }

//====================================================================================================================================
//====================================================================================================================================



        var SecondMonthArray = [];
        var SecondMonthSalesArray = [];
        var SecondAvgEffectiveDiscount =0;
        var SecondMonthIncentive =0;
        var SecondMonthCollection =0;
        var SecondMonthProjectCount =0;
        var SecondMonthSales = 0



        

for(var a=0; a<SecondMonthData.length; a++)
{

for(var i =0 ; i < Orders.length ; i++)
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


if(this.form.value.User!=="SOCIAL")
{
  if(Orders[i].Associate===this.form.value.User)
  {

    if(SecondMonthData[a].PROJREFNO===OrderProjectRefNo)
    {

     

      SecondMonthProjectCount =SecondMonthProjectCount + 1;

      let ArchitectFirm = "";

      for(var p= 0;p<ArchProList.length; p++)
      { 
       if(OrderProjectRefNo ===ArchProList[p].OrderNo)
       {
         ArchitectFirm = ArchProList[p].ArchitectFirm
       }
 
      }

      let PlanValue = 0
      let Plan = "Basic"
     
      
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
          PlanValue = Number(item.ProPlusCost)
        }
       
       }

       })

       let Collection = SecondMonthData[a].Collection;


       let PdcCollection = SecondMonthData[a].PdcCollection;
       let Sales = SecondMonthData[a].Sales;

       let Incentive = 0;
       
        if(Orders[i].Associate!=="ANKIT AGGARWAL")
        {
          Incentive = (Number(Collection)*(100-Number(PlanValue))/118)*0.02
         
        }
       
        if(Orders[i].Associate ==="ANKIT AGGARWAL")
        {
          let Type1Due = (Number(Collection)*(100-Number(PlanValue))/118)*0.10

          let Type2Due = 0;

          if(Number(Orders[i].Discount)<43)
          {

            let A = 43-Number(Orders[i].Discount)

            let B = Number(Collection)/((100-Number(Orders[i].Discount))*0.01)

            let C = Number(Collection)*Number(PlanValue)*0.01

 
            Type2Due = ((B*A*.01)-(C))/1.18
 

          }

          var number1 = Type1Due
          var number2 = Type2Due
          var maximum

          if (number1 > number2) {
             maximum = number1;
           } else {
           maximum = number2;
           }

          Incentive = maximum
        }


      

      if(Number(Collection)>0)
      {
       var temp = {
        ProjectRefNo : FirstMonthData[a].PROJREFNO,
        ProjectName: Orders[i].ProjectName,
        ArchitectFirm : ArchitectFirm,
        ClientDiscount : Orders[i].Discount,
        ProPlusDiscount : PlanValue,
        EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
        Collection: Collection,
        Due : Incentive.toFixed(0)    
                  
       }
       


       SecondMonthIncentive =SecondMonthIncentive  + Number(Incentive)
       SecondMonthCollection = SecondMonthCollection + Number(Collection)

       let EffectiveDiscount = Number(Orders[i].Discount) + Number(PlanValue)
       SecondAvgEffectiveDiscount = SecondAvgEffectiveDiscount + Number(EffectiveDiscount)
       

       SecondMonthArray.push(temp)
       }


       if(Number(Sales)>0)
       {
        var temp2 = {
         ProjectRefNo : FirstMonthData[a].PROJREFNO,
         ProjectName: Orders[i].ProjectName,
         ArchitectFirm : ArchitectFirm,
         ClientDiscount : Orders[i].Discount,
         ProPlusDiscount : PlanValue,
         EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
         Sales :Sales,
         Collection: Collection
        
                   
        }
        
 
 
        SecondMonthSales = SecondMonthSales + Number(Sales)
        
 
        SecondMonthSalesArray.push(temp2)
        }



    }



  }
}

if(this.form.value.User==="SOCIAL")
{

  if(Orders[i].Source==="SOCIAL")
  {


    if(SecondMonthData[a].PROJREFNO===OrderProjectRefNo)
    {

      SecondMonthProjectCount =SecondMonthProjectCount + 1;

      let ArchitectFirm = "";

      for(var p= 0;p<ArchProList.length; p++)
      { 
       if(OrderProjectRefNo ===ArchProList[p].OrderNo)
       {
         ArchitectFirm = ArchProList[p].ArchitectFirm
       }
 
      }

      let PlanValue = 0
      let Plan = "Basic"
     
      
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
          PlanValue = Number(item.ProPlusCost)
        }
       
       }

       })

       let Collection = SecondMonthData[a].Collection;
       let PdcCollection = SecondMonthData[a].PdcCollection;
       let Sales = SecondMonthData[a].Sales;

       let Incentive = 0;
        if(Orders[i].Source ==="SOCIAL")
        {
          Incentive = (Number(Collection)*(100-Number(PlanValue))/118)*0.015
        }
       
      if(Number(Collection)>0)
      {
       var temp = {
        ProjectRefNo : FirstMonthData[a].PROJREFNO,
        ProjectName: Orders[i].ProjectName,
        ArchitectFirm : ArchitectFirm,
        ClientDiscount : Orders[i].Discount,
        ProPlusDiscount : PlanValue,
        EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
        Collection: Collection,
        Due : Incentive.toFixed(0)    
                  
       }
       
       let EffectiveDiscount = Number(Orders[i].Discount) + Number(PlanValue)
       SecondAvgEffectiveDiscount = SecondAvgEffectiveDiscount + Number(EffectiveDiscount)

       SecondMonthIncentive =SecondMonthIncentive  + Number(Incentive)
       SecondMonthCollection = SecondMonthCollection + Number(Collection)
       

       SecondMonthArray.push(temp)
       }


       if(Number(Sales)>0)
       {
        var temp2 = {
         ProjectRefNo : FirstMonthData[a].PROJREFNO,
         ProjectName: Orders[i].ProjectName,
         ArchitectFirm : ArchitectFirm,
         ClientDiscount : Orders[i].Discount,
         ProPlusDiscount : PlanValue,
         EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
         Sales : Sales,
         Collection: Collection  
                   
        }
       
        SecondMonthSales =  SecondMonthSales + Number(Sales)
 
        SecondMonthSalesArray.push(temp2)
        }



    }



  }
}


}

}






//====================================================================================================================================
//====================================================================================================================================

var ThirdMonthArray = [];
var ThirdMonthSalesArray = [];
var ThirdAvgEffectiveDiscount =0;
var ThirdMonthIncentive =0;
var ThirdMonthCollection =0;
var ThirdMonthProjectCount =0;
var ThirdMonthSales = 0





 


for(var a=0; a<ThirdMonthData.length; a++)
{

 

for(var i =0 ; i < Orders.length ; i++)
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


if(this.form.value.User!=="SOCIAL")
{
  if(Orders[i].Associate===this.form.value.User)
  {

    if(ThirdMonthData[a].PROJREFNO===OrderProjectRefNo)
    {
   
      ThirdMonthProjectCount =ThirdMonthProjectCount + 1;

      let ArchitectFirm = "";

      for(var p=0;p<ArchProList.length; p++)
      { 
       if(OrderProjectRefNo ===ArchProList[p].OrderNo)
       {
         ArchitectFirm = ArchProList[p].ArchitectFirm
       }
 
      }

      let PlanValue = 0
      let Plan = "Basic"
     
      
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
          PlanValue = Number(item.ProPlusCost)
        }
       
       }

       })

       let Collection = ThirdMonthData[a].Collection;
       let PdcCollection = ThirdMonthData[a].PdcCollection;
       let Sales = ThirdMonthData[a].Sales;

       let Incentive = 0;
        if(Orders[i].Associate!=="ANKIT AGGARWAL")
        {
          Incentive = (Number(Collection)*(100-Number(PlanValue))/118)*0.02
        }
       
        if(Orders[i].Associate ==="ANKIT AGGARWAL")
        {
          let Type1Due = (Number(Collection)*(100-Number(PlanValue))/118)*0.10

          let Type2Due = 0;

          if(Number(Orders[i].Discount)<43)
          {

            let A = 43-Number(Orders[i].Discount)

            let B = Number(Collection)/((100-Number(Orders[i].Discount))*0.01)

            let C = Number(Collection)*Number(PlanValue)*0.01

 
            Type2Due = ((B*A*.01)-(C))/1.18
 

          }

          var number1 = Type1Due
          var number2 = Type2Due
          var maximum

          if (number1 > number2) {
             maximum = number1;
           } else {
           maximum = number2;
           }

          Incentive = maximum
        }

      if(Number(Collection)>0)
      {
       var temp = {
        ProjectRefNo : FirstMonthData[a].PROJREFNO,
        ProjectName: Orders[i].ProjectName,
        ArchitectFirm : ArchitectFirm,
        ClientDiscount : Orders[i].Discount,
        ProPlusDiscount : PlanValue,
        EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
        Collection: Collection,
        Due : Incentive.toFixed(0)    
                  
       }
       
 
       let EffectiveDiscount = Number(Orders[i].Discount) + Number(PlanValue)
       ThirdAvgEffectiveDiscount = ThirdAvgEffectiveDiscount + Number(EffectiveDiscount)

       ThirdMonthIncentive =ThirdMonthIncentive  + Number(Incentive)
       ThirdMonthCollection = ThirdMonthCollection + Number(Collection)
       

       ThirdMonthArray.push(temp)
       }


       if(Number(Sales)>0)
       {
        var temp2 = {
         ProjectRefNo : FirstMonthData[a].PROJREFNO,
         ProjectName: Orders[i].ProjectName,
         ArchitectFirm : ArchitectFirm,
         ClientDiscount : Orders[i].Discount,
         ProPlusDiscount : PlanValue,
         EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
         Sales : Sales,
         Collection: Collection
        
                   
        }
        
  
        ThirdMonthSales = ThirdMonthSales + Number(Sales)
        
 
        ThirdMonthSalesArray.push(temp2)
        }



    }



  }
}

if(this.form.value.User==="SOCIAL")
{

  if(Orders[i].Source==="SOCIAL")
  {


    if(ThirdMonthData[a].PROJREFNO===OrderProjectRefNo)
    {

      ThirdMonthProjectCount =ThirdMonthProjectCount + 1;

      let ArchitectFirm = "";

      for(var p= 0;p<ArchProList.length; p++)
      { 
       if(OrderProjectRefNo ===ArchProList[p].OrderNo)
       {
         ArchitectFirm = ArchProList[p].ArchitectFirm
       }
 
      }

      let PlanValue = 0
      let Plan = "Basic"
     
      
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
          PlanValue = Number(item.ProPlusCost)
        }
       
       }

       })

       let Collection = ThirdMonthData[a].Collection;
       let PdcCollection = ThirdMonthData[a].PdcCollection;
       let Sales = ThirdMonthData[a].Sales;

       let Incentive = 0;
        if(Orders[i].Source ==="SOCIAL")
        {
          Incentive = (Number(Collection)*(100-Number(PlanValue))/118)*0.015
        }
       
      if(Number(Collection)>0)
      {
       var temp = {
        ProjectRefNo : FirstMonthData[a].PROJREFNO,
        ProjectName: Orders[i].ProjectName,
        ArchitectFirm : ArchitectFirm,
        ClientDiscount : Orders[i].Discount,
        ProPlusDiscount : PlanValue,
        EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
        Collection: Collection,
        Due : Incentive.toFixed(0)    
                  
       }
       


       let EffectiveDiscount = Number(Orders[i].Discount) + Number(PlanValue)
       ThirdAvgEffectiveDiscount = ThirdAvgEffectiveDiscount + Number(EffectiveDiscount)

       ThirdMonthIncentive =ThirdMonthIncentive  + Number(Incentive)
       ThirdMonthCollection = ThirdMonthCollection + Number(Collection)
       

       ThirdMonthArray.push(temp)
       }


         
      if(Number(Sales)>0)
      {
       var temp2 = {
        ProjectRefNo : FirstMonthData[a].PROJREFNO,
        ProjectName: Orders[i].ProjectName,
        ArchitectFirm : ArchitectFirm,
        ClientDiscount : Orders[i].Discount,
        ProPlusDiscount : PlanValue,
        EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
        Sales : Sales,
        Collection: Collection   
                  
       }
       


       ThirdMonthSales = ThirdMonthSales + Number(Sales)
       

       ThirdMonthSalesArray.push(temp2)
       }



    }



  }
}


}

}

//====================================================================================================================================
//====================================================================================================================================


 let ArchitectDataforSocial = []
/*
 if(this.form.value.User==="SOCIAL")
 {
   for(var i = 0; i<FirstMonthArray.length; i++)
   {
     for(var j =0; j<this.ProcoreArchitects.length;j++)
     {
      if(this.ProcoreArchitects[j].name===FirstMonthArray[i].ArchitectFirm)
      {
        if(this.ProcoreArchitects[j].project_ids.length>1)
        {
          
          let ProcoreProjs = this.ProcoreArchitects[j].project_ids

          for(var k = 0 ; k<ProcoreProjs.length; k++ )
          {

            for(var l = 0; l < this.procoreProjects.length; l++)
            {
              if(ProcoreProjs[k]===this.procoreProjects[l].id)
              {
                
              

                let ProcoreRefNo ="";
    
                if(this.procoreProjects[l].project_number.includes("/V-"))
                {
                 ProcoreRefNo = this.procoreProjects[l].project_number.toString().split("/V-")[0]
                }
                if(!this.procoreProjects[l].project_number.includes("/V-"))
                {
                 ProcoreRefNo = this.procoreProjects[l].project_number
                }

                let TotalCol = 0

                for(var m=0;m<FullSalesData.length; m++ )
                {
                  if(FullSalesData[m].PROJREFNO===ProcoreRefNo)
                  {
                       TotalCol = TotalCol + Number(FullSalesData[m].Collection)
                  }
                }

    

                var temp1 = { ArchitectFirm : FirstMonthArray[i].ArchitectFirm, ProcoreRefNo : ProcoreRefNo,ProjectCount : this.ProcoreArchitects[j].project_ids.length, ProjectName :this.procoreProjects[l].name, FinalAmount :this.procoreProjects[l].total_value , TotalCollection : TotalCol }
                ArchitectDataforSocial.push(temp1)

              
   
              }
            }

          }
   

        
        
        }

       
      }
     }
   }
   
 }
*/



if(this.form.value.User==="SOCIAL")
{
 
  var TempArray = [];

  for(var a=0 ; a < Orders.length ; a++)
  {


    let OrderProjectRefNo = ""

    if(Orders[a].OrderNo.includes("/V-"))
    {
     let hyphen = Orders[a].OrderNo.lastIndexOf("/V-");
     let tempproref = Orders[a].OrderNo.substring(0, hyphen);
     let slash = tempproref.lastIndexOf("/");
     let proref = tempproref.substring(slash + 1, hyphen); 
     OrderProjectRefNo = proref
    }
 
    if(!Orders[a].OrderNo.includes("/V-"))
    {
     let slash = Orders[a].OrderNo.lastIndexOf("/");
     let proref = Orders[a].OrderNo.substring(slash+ 1, Orders[a].OrderNo.length);
     OrderProjectRefNo = proref
    }


    let PlanValue = 0;


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
        PlanValue = Number(item.ProPlusCost)
      }
     
     }

     })

    for(var b=0; b<ArchProList.length ; b++)
    {
      if(ArchProList[b].OrderNo===OrderProjectRefNo)
      {
        var Collection = 0;
        var Sales = 0;
        var Due = 0; 


        for(var c=0; c<FullSalesData.length;c++)
        {
          if(FullSalesData[c].PROJREFNO===OrderProjectRefNo)
          {
            if(Number(FullSalesData[c].Collection)>0)
            {
              Collection = Collection + Number(FullSalesData[c].Collection)
              Sales = Sales +  Number(FullSalesData[c].Sales)
              Due = (Number(Collection)*(100-Number(PlanValue))/118)*0.015
            }

            
          }
        }


        var Temp44 = {
          
          WinDate : Orders[a].CommercialWinDate,
          WAName : Orders[a].Associate,
          OrderNo : Orders[a].OrderNo,
          ProjectName : Orders[a].ProjectName,
          ArchitectFirmName : ArchProList[b].ArchitectFirm,
          ProjectCount : "",
          PlanValue : PlanValue,
          Collection : Collection,
          Sales : Sales,
          Due : Due

        }

        TempArray.push(Temp44)
        
       
      }
    }
    


    
  }


   for(var e =0;e<TempArray.length;e++ )
   {
    var count = 0

    
    for(var d=0;d<TempArray.length;d++)
    {
       if(TempArray[e].ArchitectFirmName===TempArray[d].ArchitectFirmName)
       {
        count = count + 1;
       }
    }

     TempArray[e].ProjectCount = count


   }


  

   for(var f=0 ; f<FirstMonthArray.length;f++)
   {
    for(var g=0;g<TempArray.length; g++)
    {


      if(FirstMonthArray[f].ArchitectFirm===TempArray[g].ArchitectFirmName)
      {

      

        if(Number(TempArray[g].ProjectCount)>1)
        { 
          this.socialArray.push(TempArray[g])
        }
        
      }
    }
   }



   for(var h =0;h<this.socialdue.length; h++)
   {
     var Count = 0;
    for(var i =0;i< TempArray.length;i++)
    {

      if(TempArray[i].ArchitectFirmName === this.socialdue[h].ArchitectFirmName)
      {
        
        Count = Count + 1
      }

      

    }

    this.socialdue[h].ProjectCount = Count

   }


   this.socialdue.sort((a, b) => {
    if (Number(a.Due) > Number(b.Due)) {
      return -1;
    }
    if (Number(a.Due) < Number(b.Due)) {
      return 1;
    }
    return 0;
  })
  
   
}
 
/*
 for(var  j =0; j<ArchitectDataforSocial.length; j++ )
 {
  for(var i = 0;i<Orders.length; i++)
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


    let PlanValue = 0
    let Plan = "Basic"
   
    
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
        PlanValue = Number(item.ProPlusCost)
      }
     
     }

     })


    if(OrderProjectRefNo===ArchitectDataforSocial[j].ProcoreRefNo&&ArchitectDataforSocial[j].ArchitectFirm!=="Self Company")
    {

     let  Incentive = (Number(ArchitectDataforSocial[j].TotalCollection)*(100-Number(PlanValue))/118)*0.02

      var temp6= {WinDate :Orders[i].CommercialWinDate, 
        WAName : Orders[i].Associate, 
        OrderNo : OrderProjectRefNo,
        ProjectName : Orders[i].ProjectName,
        ArchitectFirmName :ArchitectDataforSocial[j].ArchitectFirm,
        ProjectCount : ArchitectDataforSocial[j].ProjectCount,
        PlanValue : PlanValue,
        Collection : ArchitectDataforSocial[j].TotalCollection,
        Due : Incentive.toFixed(0)

      }


      this.socialArray.push(temp6)
    }

  }
 }

*/





 this.User = this.form.value.User
 this.Month = this.form.value.Month


 FirstMonthArray.sort((a, b) => {
  if (a.Due < b.Due) {
    return -1;
  }
  if (a.Due > b.Due) {
    return 1;
  }
  return 0;
})

SecondMonthArray.sort((a, b) => {
  if (a.Due < b.Due) {
    return -1;
  }
  if (a.Due > b.Due) {
    return 1;
  }
  return 0;
})

ThirdMonthArray.sort((a, b) => {
  if (a.Due < b.Due) {
    return -1;
  }
  if (a.Due > b.Due) {
    return 1;
  }
  return 0;
})



 
 this.First= FirstMonthArray
 this.FirstEffectiveDiscount  = (FirstAvgEffectiveDiscount/FirstMonthArray.length).toFixed(2)
 this.FirstIncentive  = FirstMonthIncentive.toFixed(0)
 this.FirstCollection = FirstMonthCollection.toFixed(0)
 this.FirstProjectCount =  FirstMonthArray.length
 
  this.SalesEffectiveFirst = SalesEffective


 this.Second= SecondMonthArray
 this.SecondEffectiveDiscount  = (SecondAvgEffectiveDiscount/SecondMonthArray.length).toFixed(2)
 this.SecondIncentive  = SecondMonthIncentive.toFixed(0)
 this.SecondCollection = SecondMonthCollection.toFixed(0)
 this.SecondProjectCount =  SecondMonthArray.length

   
 this.Third= ThirdMonthArray
 this.ThirdEffectiveDiscount  = (ThirdAvgEffectiveDiscount/ThirdMonthArray.length).toFixed(2)
 this.ThirdIncentive  = ThirdMonthIncentive.toFixed(0)
 this.ThirdCollection = ThirdMonthCollection.toFixed(0)
 this.ThirdProjectCount =  ThirdMonthArray.length


 this.Sales = FirstMonthSalesArray

 this.FirstSales  =  FirstMonthSales
 this.SecondSales  = SecondMonthSales
 this.ThirdSales  = ThirdMonthSales

 this.dataloaded  =true;

        
 this.Sdialog.closeAll()
       

       
       })

    }
    

    GetFirstMonth()
    {


      if(this.form.value.User!=="SOCIAL")
      {
        var options = { 
 
          headers:  ["SNo","OrderNumber","ProjectName","ArchitectFirmName","ClientDiscount","ProPlusDiscount","EffectiveDiscount","Collection","Due"] 
          
        };
        
        let FileName = "Incentive Report"
        this.First.sort((a, b) => {
          if (Number(a.Due) > Number(b.Due)) {
            return -1;
          }
          if (Number(a.Due) < Number(b.Due)) {
            return 1;
          }
          return 0;
        })
  
        var Output = []
  
        for(var i =0; i< this.First.length; i++)
        {
          var Sno = i + 1
          var temp = {"SNo" : Sno,
          "OrderNumber":this.First[i].ProjectRefNo,
          "ProjectName":this.First[i].ProjectName,
          "ArchitectFirmName":this.First[i].ArchitectFirm,
          "ClientDiscount":this.First[i].ClientDiscount,
          "ProPlusDiscount":this.First[i].ProPlusDiscount,
          "EffectiveDiscount":this.First[i].EffectiveDiscount,
          "Collection":this.First[i].Collection,
          "Due":this.First[i].Due
        }
  
        Output.push(temp)
        }
  
        var temp2 = {"SNo" :"Count",
        "OrderNumber": Output.length,
        "ProjectName":"",
        "ArchitectFirmName":"",
        "ClientDiscount":"",
        "ProPlusDiscount": "TOTAL",
        "EffectiveDiscount": this.FirstEffectiveDiscount ,
        "Collection": this.FirstCollection  ,
        "Due": this.FirstIncentive
      }
      
        
       Output.push(temp2)
  
      
  
           
        new ngxCsv(Output, FileName, options);

      }


      if(this.form.value.User==="SOCIAL")
      {
        var options = { 
 
          headers:  ["SNo","WinDate","WAName","OrderNumber","ProjectName","ArchitectFirmName","ProjectCount","PlanValue","Collection","Due"] 
          
        };


      
        
        let FileName = "Incentive Report"
        this.socialdue.sort((a, b) => {
          if (Number(a.Due) > Number(b.Due)) {
            return -1;
          }
          if (Number(a.Due) < Number(b.Due)) {
            return 1;
          }
          return 0;
        })
  
        var Output = []
  
        for(var i =0; i< this.socialdue.length; i++)
        {
          var Sno = i + 1
          var temp3 = {
            "SNo" : Sno,
            "WinDate" :this.socialdue[i].WinDate ,
            "WAName" :this.socialdue[i].WAName,
            "OrderNo" :this.socialdue[i].OrderNo ,
            "ProjectName" :this.socialdue[i].ProjectName ,
            "ArchitectFirmName" :this.socialdue[i].ArchitectFirmName ,
            "ProjectCount" :this.socialdue[i].ProjectCount ,
            "PlanValue" :this.socialdue[i].PlanValue ,
            "Collection" :this.socialdue[i].Collection ,
            "Due" :this.socialdue[i].Due 
     
        }
  
        Output.push(temp3)
        }
  
        var temp4 = {
          
          "SNo" :"Count",
          "WinDate" :Output.length ,
          "WAName" :"",
          "OrderNo" :"",
          "ProjectName" :"" ,
          "ArchitectFirmName" :"" ,
          "ProjectCount" :"",
          "PlanValue" :"TOTAL" ,
          "Collection" :this.FirstCollection ,
          "Due" :this.FirstIncentive
          
  
      }
      
        
       Output.push(temp4)
  
      
  
           
        new ngxCsv(Output, FileName, options);

      }


  
      
      
     
    }

    GetSales()
    {

      var options = { 
 
        headers:  ["SNo","OrderNumber","ProjectName","ArchitectFirmName","ClientDiscount","ProPlusDiscount","EffectiveDiscount","Sales"] 
        
      };
      
      let FileName = "Sales Report"
      this.Sales.sort((a, b) => {
        if (Number(a.Sales) > Number(b.Sales)) {
          return -1;
        }
        if (Number(a.Sales) < Number(b.Sales)) {
          return 1;
        }
        return 0;
      })

      var Output = []

      for(var i =0; i< this.Sales.length; i++)
      {

      
        var Sno = i + 1
        var temp = {"SNo" : Sno,
        "OrderNumber":this.Sales[i].ProjectRefNo,
        "ProjectName":this.Sales[i].ProjectName,
        "ArchitectFirmName":this.Sales[i].ArchitectFirm,
        "ClientDiscount":this.Sales[i].ClientDiscount,
        "ProPlusDiscount":this.Sales[i].ProPlusDiscount,
        "EffectiveDiscount":this.Sales[i].EffectiveDiscount,
        "Sales" : this.Sales[i].Sales,
       
      }

      Output.push(temp)
      }

      var temp2 = {"SNo" :"Count",
      "OrderNumber": Output.length,
      "ProjectName":"",
      "ArchitectFirmName":"",
      "ClientDiscount":"",
      "ProPlusDiscount": "TOTAL",
      "EffectiveDiscount": (Number(this.SalesEffectiveFirst)/Output.length).toFixed(2),
      "Sales" : this.FirstSales
     
      
    }
    
      
     Output.push(temp2)

    

         
      new ngxCsv(Output, FileName, options);
      
      

    }


    OnToggleChanges()
    {
      this.subscription.push(this.form.get('Toggle').valueChanges.subscribe((response)=>{

        if(response==true)
        {
          this.Toggle = true 
        }
        if(response==false)
        {
          this.Toggle = false
        }
       
      }))
    }


    ngOnDestroy(){

      this.subscription.forEach(item =>{
        if(item) item.unsubscribe()
      })
  
      this.authListenerSubs.unsubscribe();
    
    }


    OnDateRangeReport()
    {


      if(this.form.value.UserTo==="NONE")
      {
        alert("Please select the user")

        return
      }
 

      var InFromDate = this.form.value.FromDate;
      var InToDate = this.form.value.ToDate;
      var User = this.form.value.UserTo;


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


      this.reportsService.getIncentivesDateRangeReport(InFromDate, InToDate, User).subscribe(response=>{

      
        var Orders = response.Orders





        let FirstMonthData =  JSON.parse(response.SalesData);


       



        
      



      





        var FirstMonthArray = [];
        var FirstMonthSalesArray = [];
        var FirstAvgEffectiveDiscount =0;
        var FirstMonthIncentive =0;
        var FirstMonthCollection =0;
        var FirstMonthProjectCount =0;
        var FirstMonthSales = 0;
        var SalesEffective = 0;
        



        for(var a=0; a<FirstMonthData.length; a++)
       {

       
        for(var i =0 ; i < Orders.length ; i++)
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


          

       if(User!=="SOCIAL")
       {
       
          if(Orders[i].Associate===User)
          {
            
            if(FirstMonthData[a].PROJREFNO===OrderProjectRefNo)
            {
  
              FirstMonthProjectCount =FirstMonthProjectCount + 1;
  
              let ArchitectFirm = "";
  
              for(var p= 0;p<ArchProList.length; p++)
              { 
               if(OrderProjectRefNo ===ArchProList[p].OrderNo)
               {
                 ArchitectFirm = ArchProList[p].ArchitectFirm
               }
         
              }
  
              let PlanValue = 0
              let Plan = "Basic"
             
              
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
                  PlanValue = Number(item.ProPlusCost)
                }
               
               }
    
               })
  
               let Collection = FirstMonthData[a].Collection;
               let PdcCollection = FirstMonthData[a].PdcCollection;
               let Sales = FirstMonthData[a].Sales;

               let Incentive = 0;
                if(Orders[i].Associate!=="ANKIT AGGARWAL")
                {
                  Incentive = (Number(Collection)*(100-Number(PlanValue))/118)*0.02
                }
               
                if(Orders[i].Associate ==="ANKIT AGGARWAL")
                {
                  let Type1Due = (Number(Collection)*(100-Number(PlanValue))/118)*0.10

                  let Type2Due = 0;
 
                  if(Number(Orders[i].Discount)<43)
                  {

                    let A = 43-Number(Orders[i].Discount)
    
                    let B = Number(Collection)/((100-Number(Orders[i].Discount))*0.01)

                    let C = Number(Collection)*Number(PlanValue)*0.01

         
                    Type2Due = ((B*A*.01)-(C))/1.18
         

                  }

                  var number1 = Type1Due
                  var number2 = Type2Due
                  var maximum

                  if (number1 > number2) {
                     maximum = number1;
                   } else {
                   maximum = number2;
                   }

                  Incentive = maximum
                }

              if(Number(Collection)>0)
              {
               var temp = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Collection: Collection,
                Due : Incentive.toFixed(0)      
               }
               
             


               FirstMonthIncentive =FirstMonthIncentive  + Number(Incentive)
               FirstMonthCollection = FirstMonthCollection + Number(Collection)
               let EffectiveDiscount = Number(Orders[i].Discount) + Number(PlanValue)
               FirstAvgEffectiveDiscount = FirstAvgEffectiveDiscount + Number(EffectiveDiscount)
               

               FirstMonthArray.push(temp)
               
               }


               if(Number(Sales)>0)
              {
               var temp2 = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Sales : Sales,  
                Collection: Collection
                  
               }
               
             


               FirstMonthSales = FirstMonthSales + Number(Sales)

               let EffectiveDiscount2 = Number(Orders[i].Discount) + Number(PlanValue)
               SalesEffective = SalesEffective + Number(EffectiveDiscount2)

               

               FirstMonthSalesArray.push(temp2)
               
               }
               
  
  
  
            }



          }
       }

       if(User==="SOCIAL")
       {
     
          if(Orders[i].Source==="SOCIAL")
          {


            if(FirstMonthData[a].PROJREFNO===OrderProjectRefNo)
            {
  
              FirstMonthProjectCount =FirstMonthProjectCount + 1;
  
              let ArchitectFirm = "";
  
              for(var p= 0;p<ArchProList.length; p++)
              { 
               if(OrderProjectRefNo ===ArchProList[p].OrderNo)
               {
                 ArchitectFirm = ArchProList[p].ArchitectFirm
               }
         
              }
  
              let PlanValue = 0
              let Plan = "Basic"
             
              
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
                  PlanValue = Number(item.ProPlusCost)
                }
               
               }
    
               })
  
               let Collection = FirstMonthData[a].Collection;
               let PdcCollection = FirstMonthData[a].PdcCollection;
               let Sales = FirstMonthData[a].Sales;

               let Incentive = 0;
                if(Orders[i].Source ==="SOCIAL")
                {
                  Incentive = (Number(Collection)*(100-Number(PlanValue))/118)*0.015
                }
               
              if(Number(Collection)>0)
              {
               var temp = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Collection: Collection,
                Due : Incentive.toFixed(0)    
                          
               }
               


               FirstMonthIncentive =FirstMonthIncentive  + Number(Incentive)
               FirstMonthCollection = FirstMonthCollection + Number(Collection)
               let EffectiveDiscount = Number(Orders[i].Discount) + Number(PlanValue)
               FirstAvgEffectiveDiscount = FirstAvgEffectiveDiscount + Number(EffectiveDiscount)

               FirstMonthArray.push(temp)
               }


               if(Number(Sales)>0)
              {
               var temp2 = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Sales : Sales,
                Collection: Collection
               
                          
               }
               


               FirstMonthSales = FirstMonthSales + Number(Sales)
               
               let EffectiveDiscount2 = Number(Orders[i].Discount) + Number(PlanValue)
               SalesEffective = SalesEffective + Number(EffectiveDiscount2)

               

               FirstMonthSalesArray.push(temp2)
               }
  
  
  
            }



          }
       }


        }

        }




        var options = { 
 
          headers:  ["SNo","OrderNumber","ProjectName","ArchitectFirmName","ClientDiscount","ProPlusDiscount","EffectiveDiscount","Collection","Due"] 
          
        };
        
        let FileName = "Incentive Report"
        FirstMonthArray.sort((a, b) => {
          if (Number(a.Due) > Number(b.Due)) {
            return -1;
          }
          if (Number(a.Due) < Number(b.Due)) {
            return 1;
          }
          return 0;
        })
  
        var Output = []
  
        for(var i =0; i< FirstMonthArray.length; i++)
        {
          var Sno = i + 1
          var temp4= {"SNo" : Sno,
          "OrderNumber":FirstMonthArray[i].ProjectRefNo,
          "ProjectName":FirstMonthArray[i].ProjectName,
          "ArchitectFirmName":FirstMonthArray[i].ArchitectFirm,
          "ClientDiscount":FirstMonthArray[i].ClientDiscount,
          "ProPlusDiscount":FirstMonthArray[i].ProPlusDiscount,
          "EffectiveDiscount":FirstMonthArray[i].EffectiveDiscount,
          "Collection":FirstMonthArray[i].Collection,
          "Due":FirstMonthArray[i].Due
        }
  
        Output.push(temp4)
        }
  
        var temp5 = {"SNo" :"Count",
        "OrderNumber": Output.length,
        "ProjectName":"",
        "ArchitectFirmName":"",
        "ClientDiscount":"",
        "ProPlusDiscount": "TOTAL",
        "EffectiveDiscount": (FirstAvgEffectiveDiscount/Output.length).toFixed(2) ,
        "Collection": FirstMonthCollection  ,
        "Due": FirstMonthIncentive 
      }
      
   
        
       Output.push(temp5)
  
      
  
           
        new ngxCsv(Output, FileName, options);



      
      })









    }


    OnSalesRangeReport()
    {
      
      if(this.form.value.UserTo==="NONE")
      {
        alert("Please select the user")

        return
      }
 

      var InFromDate = this.form.value.FromDate;
      var InToDate = this.form.value.ToDate;
      var User = this.form.value.UserTo;


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


      this.reportsService.getIncentivesDateRangeReport(InFromDate, InToDate, User).subscribe(response=>{

      
        var Orders = response.Orders





        let FirstMonthData =  JSON.parse(response.SalesData);


       



        
      



      





        var FirstMonthArray = [];
        var FirstMonthSalesArray = [];
        var FirstAvgEffectiveDiscount =0;
        var FirstMonthIncentive =0;
        var FirstMonthCollection =0;
        var FirstMonthProjectCount =0;
        var FirstMonthSales = 0;
        var SalesEffective = 0;
        



        for(var a=0; a<FirstMonthData.length; a++)
       {

       
        for(var i =0 ; i < Orders.length ; i++)
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


          

       if(User!=="SOCIAL")
       {
       
          if(Orders[i].Associate===User)
          {
            
            if(FirstMonthData[a].PROJREFNO===OrderProjectRefNo)
            {
  
              FirstMonthProjectCount =FirstMonthProjectCount + 1;
  
              let ArchitectFirm = "";
  
              for(var p= 0;p<ArchProList.length; p++)
              { 
               if(OrderProjectRefNo ===ArchProList[p].OrderNo)
               {
                 ArchitectFirm = ArchProList[p].ArchitectFirm
               }
         
              }
  
              let PlanValue = 0
              let Plan = "Basic"
             
              
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
                  PlanValue = Number(item.ProPlusCost)
                }
               
               }
    
               })
  
               let Collection = FirstMonthData[a].Collection;
               let PdcCollection = FirstMonthData[a].PdcCollection;
               let Sales = FirstMonthData[a].Sales;

               let Incentive = 0;
                if(Orders[i].Associate!=="ANKIT AGGARWAL")
                {
                  Incentive = (Number(Collection)*(100-Number(PlanValue))/118)*0.02
                }
               
                if(Orders[i].Associate ==="ANKIT AGGARWAL")
                {
                  let Type1Due = (Number(Collection)*(100-Number(PlanValue))/118)*0.10

                  let Type2Due = 0;
 
                  if(Number(Orders[i].Discount)<43)
                  {

                    let A = 43-Number(Orders[i].Discount)
    
                    let B = Number(Collection)/((100-Number(Orders[i].Discount))*0.01)

                    let C = Number(Collection)*Number(PlanValue)*0.01

         
                    Type2Due = ((B*A*.01)-(C))/1.18
         

                  }

                  var number1 = Type1Due
                  var number2 = Type2Due
                  var maximum

                  if (number1 > number2) {
                     maximum = number1;
                   } else {
                   maximum = number2;
                   }

                  Incentive = maximum
                }

              if(Number(Collection)>0)
              {
               var temp = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Collection: Collection,
                Due : Incentive.toFixed(0)      
               }
               
             


               FirstMonthIncentive =FirstMonthIncentive  + Number(Incentive)
               FirstMonthCollection = FirstMonthCollection + Number(Collection)
               let EffectiveDiscount = Number(Orders[i].Discount) + Number(PlanValue)
               FirstAvgEffectiveDiscount = FirstAvgEffectiveDiscount + Number(EffectiveDiscount)
               

               FirstMonthArray.push(temp)
               
               }


               if(Number(Sales)>0)
              {
               var temp2 = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Sales : Sales,  
                Collection: Collection
                  
               }
               
             


               FirstMonthSales = FirstMonthSales + Number(Sales)

               let EffectiveDiscount2 = Number(Orders[i].Discount) + Number(PlanValue)
               SalesEffective = SalesEffective + Number(EffectiveDiscount2)

               

               FirstMonthSalesArray.push(temp2)
               
               }
               
  
  
  
            }



          }
       }

       if(User==="SOCIAL")
       {
     
          if(Orders[i].Source==="SOCIAL")
          {


            if(FirstMonthData[a].PROJREFNO===OrderProjectRefNo)
            {
  
              FirstMonthProjectCount =FirstMonthProjectCount + 1;
  
              let ArchitectFirm = "";
  
              for(var p= 0;p<ArchProList.length; p++)
              { 
               if(OrderProjectRefNo ===ArchProList[p].OrderNo)
               {
                 ArchitectFirm = ArchProList[p].ArchitectFirm
               }
         
              }
  
              let PlanValue = 0
              let Plan = "Basic"
             
              
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
                  PlanValue = Number(item.ProPlusCost)
                }
               
               }
    
               })
  
               let Collection = FirstMonthData[a].Collection;
               let PdcCollection = FirstMonthData[a].PdcCollection;
               let Sales = FirstMonthData[a].Sales;

               let Incentive = 0;
                if(Orders[i].Source ==="SOCIAL")
                {
                  Incentive = (Number(Collection)*(100-Number(PlanValue))/118)*0.015
                }
               
              if(Number(Collection)>0)
              {
               var temp = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Collection: Collection,
                Due : Incentive.toFixed(0)    
                          
               }
               


               FirstMonthIncentive =FirstMonthIncentive  + Number(Incentive)
               FirstMonthCollection = FirstMonthCollection + Number(Collection)
               let EffectiveDiscount = Number(Orders[i].Discount) + Number(PlanValue)
               FirstAvgEffectiveDiscount = FirstAvgEffectiveDiscount + Number(EffectiveDiscount)

               FirstMonthArray.push(temp)
               }


               if(Number(Sales)>0)
              {
               var temp2 = {
                ProjectRefNo : FirstMonthData[a].PROJREFNO,
                ProjectName: Orders[i].ProjectName,
                ArchitectFirm : ArchitectFirm,
                ClientDiscount : Orders[i].Discount,
                ProPlusDiscount : PlanValue,
                EffectiveDiscount : Number(Orders[i].Discount) + Number(PlanValue),
                Sales : Sales,
                Collection: Collection
               
                          
               }
               


               FirstMonthSales = FirstMonthSales + Number(Sales)
               
               let EffectiveDiscount2 = Number(Orders[i].Discount) + Number(PlanValue)
               SalesEffective = SalesEffective + Number(EffectiveDiscount2)

               

               FirstMonthSalesArray.push(temp2)
               }
  
  
  
            }



          }
       }


        }

        }




        var options = { 
 
          headers:  ["SNo","OrderNumber","ProjectName","ArchitectFirmName","ClientDiscount","ProPlusDiscount","EffectiveDiscount","Sales"] 
          
        };
        
        let FileName = "Sales Report"
        FirstMonthSalesArray.sort((a, b) => {
          if (Number(a.Sales) > Number(b.Sales)) {
            return -1;
          }
          if (Number(a.Sales) < Number(b.Sales)) {
            return 1;
          }
          return 0;
        })
  
        var Output = []
  
        for(var i =0; i< FirstMonthSalesArray.length; i++)
        {
          var Sno = i + 1
          var temp4= {"SNo" : Sno,
          "OrderNumber":FirstMonthSalesArray[i].ProjectRefNo,
          "ProjectName":FirstMonthSalesArray[i].ProjectName,
          "ArchitectFirmName":FirstMonthSalesArray[i].ArchitectFirm,
          "ClientDiscount":FirstMonthSalesArray[i].ClientDiscount,
          "ProPlusDiscount":FirstMonthSalesArray[i].ProPlusDiscount,
          "EffectiveDiscount":FirstMonthSalesArray[i].EffectiveDiscount,
          "Sales":FirstMonthSalesArray[i].Sales
         
        }
  
        Output.push(temp4)
        }
  
        var temp5 = {"SNo" :"Count",
        "OrderNumber": Output.length,
        "ProjectName":"",
        "ArchitectFirmName":"",
        "ClientDiscount":"",
        "ProPlusDiscount": "TOTAL",
        "EffectiveDiscount": (FirstAvgEffectiveDiscount/Output.length).toFixed(2) ,
        "Sales": FirstMonthSales  
       
      }
      
   
        
       Output.push(temp5)
  
      
  
           
        new ngxCsv(Output, FileName, options);



      
      })








    }

    
}
