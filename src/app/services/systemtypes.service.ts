import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Systemtype } from '../shared/systemtype.model';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SystemtypesService {

  private systemtypes : Systemtype[] = [];
  private systemtypesUpdated = new Subject<Systemtype[]>()

  hostUrl = environment.hostURL;

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  constructor(private http : HttpClient , private router : Router) { }


  getSystemtypes(){
    this.http.get<{message: string, systemtypes : Systemtype[]}>(this.hostUrl+"/api/systemtypes")
    .subscribe((systemtypesData)=>{
      this.systemtypes = systemtypesData.systemtypes;
      this.systemtypesUpdated.next([...this.systemtypes]);

    });

  }


  getSystemtypeUpdateListener(){

    return this.systemtypesUpdated.asObservable()

   }




   addSystemtypes(SystemType:string){


    const systemtype : Systemtype = {_id:null,
      SystemType : SystemType.toUpperCase(), DateCreated:this.DateFormat
    }


    this.http.post<{message: string, systemtypeId: string}>(this.hostUrl+"/api/systemtypes",systemtype)
    .subscribe((responseData)=>{
      const Id = responseData.systemtypeId;
      systemtype._id = Id;




      this.systemtypes.push(systemtype);
      this.systemtypesUpdated.next([...this.systemtypes]);





    });


  }




//====================================Delete=======================================================

   deleteSystemtype(systemtypeId: string){
    this.http.delete(this.hostUrl+"/api/systemtypes/"+systemtypeId)
    .subscribe(()=>{
     const updatedSystemtype = this.systemtypes.filter(systemtype => systemtype._id !== systemtypeId);
     this.systemtypes = updatedSystemtype;
     this.systemtypesUpdated.next([...this.systemtypes]);

    });


  }

//===================================================================================================

getSystemtype(_id : string){

  return this.http.get<{_id:string,SystemType:string,DateCreated:string}>(this.hostUrl+"/api/systemtypes/"+ _id)

  }

  updateSystemtype(_id :string, SystemType : string){

  const systemtype : Systemtype  = {
  _id : _id,
  SystemType : SystemType.toUpperCase(),
  DateCreated : this.DateFormat

  }

  this.http.put(this.hostUrl+"/api/systemtypes/"+ _id ,systemtype).subscribe(response => {





     const updateSystemtypes = [...this.systemtypes];
     const oldSystemtypeIndex = updateSystemtypes.findIndex(p => p._id===systemtype._id);
     updateSystemtypes[oldSystemtypeIndex] = systemtype;
     this.systemtypes = updateSystemtypes;
     this.systemtypesUpdated.next([...this.systemtypes]);
     this.router.navigate(["/settings/systemtypes"]);

    

  });
  }




}
