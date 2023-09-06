import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from 'src/app/services/projects.service';
import { Order } from 'src/app/shared/order.model';
import { User } from 'src/app/shared/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WqgformService } from 'src/app/services/wqgform.service';
import {environment} from '../../../environments/environment';
import { LoaderComponent } from '../projects/loader/loader.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  users : User[] = [];
  orders : Order[] = [];
  subscription : Subscription[] = [];
  UserData :string;
  hostUrl = environment.hostURL;

  orderID : string;
  
  userList : string[] = []

  SelectedOrderNumber :string;

  keyword = 'OrderNo';

 


  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string ="BACKEND";
  Profile : string;
  Status : string;
  AssociatedSince : string;
  Code :string;

  form : FormGroup;

  
  constructor( public projectsService : ProjectsService, public router : Router,private http : HttpClient,
    public wqgformService : WqgformService,
    private Sdialog : MatDialog,
    public overlay : Overlay,
    private dialog : MatDialog,
    ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'Order' : new FormControl(null,{validators:[Validators.required]})  
    });


    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.disableClose =true;
    dialogConfig2.autoFocus =true;
    this.Sdialog.open(LoaderComponent,dialogConfig2)

    this.projectsService.getProjects(this.UserFullName)

    this.wqgformService.getAllUserWinsOrder().subscribe(data=>{

      this.orders = [];
  
     
      data.orders.map(item=>{if(item.Status==="Win"||item.Status==="Old Win"||item.Status==="Handover")
      {  
        this.orders.push(item)
      
      }
     
     })
  
     this.Sdialog.closeAll()

     })  
    
   
  }

  WinOrder()
  {

    if(!this.SelectedOrderNumber)
    {
      alert("Please select order number")
      return
    }
  
      let OrderId: string;
  
      this.orders.map(item=>{
      if(item.OrderNo===this.SelectedOrderNumber)
       {
    
         OrderId =item._id;
      
  
       }
  
      })
  
      this.wqgformService.getUsers().subscribe((userData)=>{


        this.wqgformService.getOrder(OrderId).subscribe((OrderData)=>{
     
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
          Status : "Win",
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
          CommercialWinDate : OrderData.CommercialWinDate,
          HandOverDate : OrderData.HandOverDate,
          LedgerDetails : OrderData.LedgerDetails,
          ProPlan :  OrderData.ProPlan,
          ProValue : OrderData.ProValue
    
        }
    
         let WinRequirements = {
          Order : newOrder,
          Users : userData.users
         }
            
         this.http.put<{message : string, orders : Order}>(this.hostUrl+"/api/orders/wincommercial/"+ OrderId,WinRequirements).subscribe(responseWin => {
        alert("Order is Win")    
        this.router.navigate(["/projects"]);    
        
        })
    
      
    
         })
  
  
  
       })
   

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



WinCSProject()
{

  if(!this.SelectedOrderNumber)
  {
   alert("Please Select The Order Number") 
   return
  }

    let Order : Order

    this.orders.map(item=>{
    if(item.OrderNo===this.SelectedOrderNumber)
     {
  
       Order=item
    

     }

    })


    this.projectsService.UpdateOldProjectOrders(Order).subscribe((response)=>{
      console.log(response)
      let resCs = JSON.stringify(response)
      if(resCs.includes("Project Updated."))
      {
        alert("Project is Updated in CS")
      }
     

    })


  //  



   
} 


}
