import { Component,OnInit,OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpecialrequestsService } from 'src/app/services/specialrequests.service';
import { User } from 'src/app/shared/user.model';
import { Subject, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UsersService } from 'src/app/services/user.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { SpecialRequest } from 'src/app/shared/specialrequest.model';

@Component({
  selector: 'app-specialrequests',
  templateUrl: './specialrequests.component.html',
  styleUrls: ['./specialrequests.component.css']
})
export class SpecialrequestsComponent {

 form : FormGroup;

 

 specialrequeststemp  : SpecialRequest[] = [];

 users : User[] = [];
 UserData :string;

 userList : string[] = []

 spinnerStatus: boolean = false;

 DisplayedColumns : string[] = ['Order Number','Project Name','RequestType','NewValue','Status','Request Date','Actions']
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

 subscription : Subscription[] = [];

 Plan :string;
 PlanValue : string;
 specialrequests : SpecialRequest[]= [];
 

 notloaded :boolean = false;



 AssociatedSince : string;
 Code :string;

 hostUrl = environment.hostURL;


 constructor( 
 public specialrequestService : SpecialrequestsService,
 public userService: UsersService,
 public wqgService : WqgformService
 
 ) { }


 
 ngOnInit(): void {

  this.specialrequestService.getCurrentDateTime()
  this.notloaded = false;
   //===============Getting the User and MaxDiscount Value==========================================
   this.userIsAuthenticated = this.userService.getIsAuth();
   this.UserFullName = this.userService.getUserFullName();
   this.UserData = this.UserFullName
 

   this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
     this.userIsAuthenticated = isAuthenticated;
     this.UserFullName = this.userService.getUserFullName();
     this.UserData = this.UserFullName;  
  });



  this.form = new FormGroup({
    'Search' : new FormControl(null),
    'Status' : new FormControl("Open"),
    'User' : new FormControl(null)
  });


 this.wqgService.getUsers().subscribe((response)=>{

  
  
  this.users = response.users
  this.users.map(item =>{
    if(item.UserFullName===this.UserFullName)
    {
      this.Profile = item.Profile;
      this.AssociatedSince = item.AssociatedSince;
      this.Code = item.Code;
    }
  })
  
 

  if(this.Profile==="ADMIN"||this.Profile==="ACCOUNTS")
  {
   this.userList = [];
   this.users.map(item =>{
     this.userList.push(item.UserFullName)
   })
   
   this.userList.push("ALL");
   this.form.patchValue({'User':"ALL"});
   
  }
  
  if(this.Profile==="USER")
  {
   this.userList = [];
   this.userList.push(this.UserFullName)
   this.form.patchValue({'User':this.UserFullName});
   
  }


 
 })


 this.specialrequestService.GetRequests(this.UserFullName)

 this.specialrequestService.getRequestsUpdateListener().subscribe(reqData =>{ 


  this.specialrequests = reqData
  


  this.DisplayedRows = new MatTableDataSource(this.specialrequests)
  this.DisplayedRows.sort = this.sort; 
  this.DisplayedRows.paginator = this.paginator;

  this.notloaded = true;
})



  this.OnUserValueChanges()
  this.OnStatusValueChanges()

 }
 


 OnUserValueChanges()
 {

  this.notloaded = true;

  this.subscription.push(this.form.get('User').valueChanges.subscribe((response)=>{

    this.specialrequestService.GetRequests(response)
    this.specialrequestService.getRequestsUpdateListener().subscribe(reqData =>{
      this.specialrequests = [];
       reqData.map(item=>{if(item.Status===this.form.value.Status)
      {
        this.specialrequests.push(item)
      }
     
     })
      this.DisplayedRows = new MatTableDataSource(this.specialrequests)
      this.DisplayedRows.sort = this.sort;
      this.DisplayedRows.paginator =this.paginator;
    })
  




  
    this.notloaded = false; 
  
   }))


   this.form.patchValue({'Status':"Open"});

 }

 OnStatusValueChanges()
 {
  
  
  this.notloaded = true;

  this.subscription.push(this.form.get('Status').valueChanges.subscribe((response)=>{
 
    this.specialrequestService.GetRequests(this.form.value.User)

    this.specialrequestService.getRequestsUpdateListener().subscribe(reqData =>{
      this.specialrequests = [];
      reqData.map(item=>{
     
        if(item.Status===response)
        {
          this.specialrequests.push(item)
        }

     })
      this.DisplayedRows = new MatTableDataSource(this.specialrequests)
      this.DisplayedRows.sort = this.sort;
      this.DisplayedRows.paginator =this.paginator;
    })

    this.notloaded = false;
     
   }))


 }



 ngOnDestroy(): void {

 



 }


 OnDeleteRequest(Req : SpecialRequest)
 {
  
  this.specialrequestService.deleteRequest(Req._id).subscribe((response)=>{
    this.specialrequestService.GetRequests(this.form.value.User)
  })

 }

 OnRejectRequest(Req : SpecialRequest)
 {
  this.specialrequestService.getCurrentDateTime()
  this.specialrequestService.rejectRequest(Req).subscribe((response)=>{
    this.specialrequestService.GetRequests(this.form.value.User)
  })

 }

 OnApproveRequest(Req : SpecialRequest)
 {
   this.specialrequestService.getCurrentDateTime()  
   this.specialrequestService.approveOrder(Req)
   






 }


 


 






 applyFilter()
 {

 }

}
