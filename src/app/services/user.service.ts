import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../shared/user.model';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})


export class UsersService {

  private token: string;
  private tokenTimer :any;
  public UserFullName :string;
  public MaxDiscount : string;
  public Profile : string;
  public isAuthenticated =false;
  private authStatusListener = new Subject<boolean>();



   loginerror = new Subject<boolean>()


  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  public users : User[] = [];
  private usersUpdated = new Subject<User[]>()
  hostUrl = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }

 

  getUsersData(){

    
    return this.http.get<{message: string,users : User[]}>(this.hostUrl+"/api/users")
    
  }


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getErrorListener() {
    return this.loginerror.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getUserFullName()
  {
    return this.UserFullName;
  }

 
  getMaxDiscount()
  {
    return this.MaxDiscount;
  }

  getProfile()
  {
    return this.Profile;
  }

  getUsers(){

    this.http.get<{message: string,users : User[]}>(this.hostUrl+"/api/users")
    .subscribe((usersData)=>{
      this.users = usersData.users;
      this.usersUpdated.next([...this.users]);
    });
  }


  getUserUpdateListener(){

   return this.usersUpdated.asObservable();

  }


  getStates()
  {

    return  this.http.get<any>(this.hostUrl+"/api/states")
    
  }







  addUsers(
    UserName:string,
    Password : string,
    UserFullName : string,
    Profile : string,
    GlassOnly : string,
    Chargeable : string,
    TempCharge : string,
    Packing : string,
    FreightGlass : string,
    OtherCharge : string,
    GST : string,
    Associate : string,
    Code : string,
    AssociatedSince : string,
    Address :  string,
    PhoneNo : string,
    EmailId : string,
    BeneficiaryName : string,
    AccountNo : string,
    IfscCode : string,
    Swift : string,
    MaxDiscount : string,
    Status : string,
    ProjectManager : string, 
    Freight :  string, 
    DealerDiscount :  string,
    ProcoreOfficeID : string
    )
    {


    const user : User ={
      _id : null,
      UserName: UserName.toUpperCase(),
      Password : Password,
      UserFullName : UserFullName.toUpperCase(),
      Profile : Profile.toUpperCase(),
      GlassOnly : GlassOnly,
      Chargeable : Chargeable,
      TempCharge : TempCharge,
      Packing : Packing,
      FreightGlass : FreightGlass,
      OtherCharge : OtherCharge,
      GST : GST,
      Associate : Associate.toUpperCase(),
      Code : Code.toUpperCase(),
      AssociatedSince : AssociatedSince.toUpperCase(),
      Address :  Address.toUpperCase(),
      PhoneNo : PhoneNo.toUpperCase(),
      EmailId : EmailId.toUpperCase(),
      BeneficiaryName : BeneficiaryName.toUpperCase(),
      AccountNo : AccountNo,
      IfscCode : IfscCode.toUpperCase(),
      Swift : Swift,
      MaxDiscount : MaxDiscount,
      Status : Status,
      ProjectManager : ProjectManager, 
      Freight :  Freight, 
      DealerDiscount :  DealerDiscount,
      ProcoreOfficeID : ProcoreOfficeID, 
      DateCreated :this.DateFormat
    }



    this.http.post<{message: string, userId: string}>(this.hostUrl+"/api/users",user)
    .subscribe((responseData)=>{
      const Id = responseData.userId;
      user._id = Id;

      this.users.push(user);
      this.usersUpdated.next([...this.users]);

    });


  }


  deleteUser(userId: string){
    this.http.delete(this.hostUrl+"/api/users/"+userId)
    .subscribe(()=>{
     const updatedUser = this.users.filter(user => user._id !== userId);
     this.users = updatedUser;
     this.usersUpdated.next([...this.users]);

    });


  }
//===================================For Edit============================================
 getUser(_id : string){

return this.http.get<User>(this.hostUrl+"/api/users/"+ _id)

}

//======update Color=============

updateUser(_id :string,
  UserName:string,
  Password : string,
  UserFullName : string,
  Profile : string,
  GlassOnly : string,
  Chargeable : string,
  TempCharge : string,
  Packing : string,
  FreightGlass : string,
  OtherCharge : string,
  GST : string,
  Associate : string,
  Code : string,
  AssociatedSince : string,
  Address :  string,
  PhoneNo : string,
  EmailId : string,
  BeneficiaryName : string,
  AccountNo : string,
  IfscCode : string,
  Swift : string,
  MaxDiscount : string,
  Status : string,
  ProjectManager :  string, 
  Freight :  string, 
  DealerDiscount :  string,
  ProcoreOfficeID : string,
  )
  {
   const userData = {
    _id : _id,
    UserName: UserName,
    Password : Password,
    UserFullName : UserFullName,
    Profile : Profile,
    GlassOnly : GlassOnly,
    Chargeable : Chargeable,
    TempCharge : TempCharge,
    Packing : Packing,
    FreightGlass : FreightGlass,
    OtherCharge : OtherCharge,
    GST : GST,
    Associate : Associate,
    Code : Code,
    AssociatedSince : AssociatedSince,
    Address :  Address,
    PhoneNo : PhoneNo,
    EmailId : EmailId,
    BeneficiaryName : BeneficiaryName,
    AccountNo : AccountNo,
    IfscCode : IfscCode,
    Swift : Swift,
    MaxDiscount : MaxDiscount,
    Status : Status,
    ProjectManager :  ProjectManager, 
    Freight :  Freight, 
    DealerDiscount :  DealerDiscount, 
    ProcoreOfficeID : ProcoreOfficeID,
    DateCreated : this.DateFormat


  }


this.http.put(this.hostUrl+"/api/users/"+ _id ,userData).subscribe(response => {


   const updateUsers = [...this.users];
   const oldUserIndex = updateUsers.findIndex(p => p._id===_id);

   const user : User = {

    _id : _id,
    UserName: UserName,
    Password : Password,
    UserFullName : UserFullName,
    Profile : Profile,
    GlassOnly : GlassOnly,
    Chargeable : Chargeable,
    TempCharge : TempCharge,
    Packing : Packing,
    FreightGlass : FreightGlass,
    OtherCharge : OtherCharge,
    GST : GST,
    Associate : Associate,
    Code : Code,
    AssociatedSince : AssociatedSince,
    Address :  Address,
    PhoneNo : PhoneNo,
    EmailId : EmailId,
    BeneficiaryName : BeneficiaryName,
    AccountNo : AccountNo,
    IfscCode : IfscCode,
    Swift : Swift,
    MaxDiscount : MaxDiscount,
    Status : Status,
    ProjectManager :  ProjectManager, 
    Freight :  Freight, 
    DealerDiscount :  DealerDiscount,
    ProcoreOfficeID : ProcoreOfficeID, 
    DateCreated : this.DateFormat
   }

   updateUsers[oldUserIndex] = user;
   this.users = updateUsers;
   this.usersUpdated.next([...this.users]);
   this.router.navigate(["/settings/users"]);



})
}


login(UserName : string, Password : string){
  const LoginData = {Username : UserName, Password : Password}

  this.http.get<{message: string,users : User[]}>(this.hostUrl+"/api/users").subscribe((userData)=>{
   
    userData.users.map(item=>{
      if(item.UserName===UserName&&item.Password===Password)
      {
        this.router.navigate(['/projects']);
        this.isAuthenticated = true;
        this.UserFullName = item.UserFullName;
        this.MaxDiscount = item.MaxDiscount;
        this.Profile =  item.Profile;
        this.authStatusListener.next(true);



        this.saveAuthData(this.UserFullName,this.MaxDiscount,this.Profile)
        
        
        //==================Auto Logout after token expiration======
       // const expiresInDuration = response.expiresIn;
       //  this.setAuthTimer(expiresInDuration)
    
        
    
        //============setting local storage to prevent reloading loss of token and data======
      //  const now = new Date();
      //  const expirationDate = new Date(now.getTime()+expiresInDuration*1000);
      //  this.saveAuthData(token,expirationDate,this.UserFullName,this.MaxDiscount,this.Profile)
       
      }
      
    })

  })


  /*
  this.http.post<{token : string, UserFullName :string, MaxDiscount : string, Profile :string,expiresIn:number}>(this.hostUrl+"/api/users/login" ,LoginData)
  .subscribe((response) =>{


     this.router.navigate(['/projects']);
      
     
    const token = response.token;
    this.token = token;
    if(token){
    //==================Auto Logout after token expiration======
    const expiresInDuration = response.expiresIn;
    this.setAuthTimer(expiresInDuration)

    this.isAuthenticated = true;
    this.UserFullName = response.UserFullName;
    this.MaxDiscount = response.MaxDiscount;
    this.Profile = response.Profile;
    this.authStatusListener.next(true);

    //============setting local storage to prevent reloading loss of token and data======
    const now = new Date();
    const expirationDate = new Date(now.getTime()+expiresInDuration*1000);
    this.saveAuthData(token,expirationDate,this.UserFullName,this.MaxDiscount,this.Profile)
   
   
 
      
    }
 
  })

  */
}

autoAuthUser(){
  const authInformation = this.getAuthData();
  if(!authInformation){
    return;
  }
  
   
    this.isAuthenticated = true;
    this.UserFullName = authInformation.UserFullName;
   
    this.MaxDiscount = authInformation.MaxDiscount;
    this.Profile = authInformation.Profile;
    this.authStatusListener.next(true);
  
}



logout(){

  this.isAuthenticated = false;
  this.authStatusListener.next(false);
  this.UserFullName = null;
  this.MaxDiscount = null;
  this.Profile = null;


  this.clearAuthData();
  this.router.navigate(['/login']);

}

/*
private setAuthTimer(duration: number)
{
  this.tokenTimer = setTimeout(()=>{
    this.logout();
  },duration*1000)

}
*/

private saveAuthData(UserFullName:string,MaxDiscount :string,Profile :string){

 localStorage.setItem('UserFullName',UserFullName);
 localStorage.setItem('MaxDiscount',MaxDiscount);
 localStorage.setItem('Profile',Profile);

}

  private clearAuthData() {
  localStorage.removeItem("UserFullName");
  localStorage.removeItem("MaxDiscount");
  localStorage.removeItem("Profile");

}

private getAuthData() {
 
  const UserFullName = localStorage.getItem("UserFullName");
  const MaxDiscount = localStorage.getItem("MaxDiscount");
  const Profile = localStorage.getItem("Profile");

  return {

    UserFullName :UserFullName,
    MaxDiscount : MaxDiscount,
    Profile : Profile

  }
}

}
