import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { System } from '../shared/system.model'
import { Subsystem } from '../shared/subsystem.model';
import { Systemtype } from '../shared/systemtype.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  hostUrl = environment.hostURL;

  private subsystems : Subsystem[] = [];
  private systemtypes : Systemtype[] = [];
  private systems : System[] = [];
  private systemsUpdated = new Subject<System[]>()

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear



  constructor(private http : HttpClient, private router : Router) { }


//===================================Get Subsytems=======================================================
  getSubsystems(){

    return this.http.get<{message: string,subsystems : Subsystem[]}>(this.hostUrl+"/api/subsystems");
  }

//==================================Get System Types=====================================================

getSystemTypes(){

  return this.http.get<{message: string,systemtypes : Systemtype[]}>(this.hostUrl+"/api/systemtypes");
}

//======================================Get Systems ======================================================
getSystems(){
  this.http.get<{message: string, systems : System[]}>(this.hostUrl+"/api/systems")
  .subscribe((systemsData)=>{
    this.systems = systemsData.systems;
    this.systemsUpdated.next([...this.systems]);

  });

}

getSystemUpdateListener(){

  return this.systemsUpdated.asObservable()

 }

//=======================================Adding Systems====================================================================


addSystems(System:string ,Subsystem:string, Systemtype:string[]){


  const system : System = {_id:null,
    System : System.toUpperCase(),
    SubSystem : Subsystem,
    SystemType : Systemtype,
    DateCreated: this.DateFormat
  }


  this.http.post<{message: string, systemId: string}>(this.hostUrl+"/api/systems",system)
  .subscribe((responseData)=>{
    const Id = responseData.systemId;
    system._id = Id;

 


    this.systems.push(system);
    this.systemsUpdated.next([...this.systems]);

    

  });


}
//==================================Deleting Systems======================

deleteSystem(systemId: string){
  this.http.delete(this.hostUrl+"/api/systems/"+systemId)
  .subscribe(()=>{
   const updatedSystem = this.systems.filter(system => system._id !== systemId);
   this.systems = updatedSystem;
   this.systemsUpdated.next([...this.systems]);

  });


}

//===================================Updating Systems=====================
getSystem(_id : string){


  return this.http.get<{_id:string, System:string, SubSystem:string, SystemType : string[], DateCreated:string}>(this.hostUrl+"/api/systems/"+ _id)

  }


//======update Subsystem=============

updateSystem(_id :string, System: string, SubSystem : string, SystemType : string[]){

const system : System  = {
_id : _id,
System : System,
SubSystem : SubSystem.toUpperCase(),
SystemType : SystemType,
DateCreated : this.DateFormat

}

this.http.put(this.hostUrl+"/api/systems/"+ _id ,system).subscribe(response => {




   const updateSystems = [...this.systems];
   const oldSystemIndex = updateSystems.findIndex(p => p._id===system._id);
   updateSystems[oldSystemIndex] = system;
   this.systems = updateSystems;
   this.systemsUpdated.next([...this.systems]);
   this.router.navigate(["/settings/systems"]);



})
}






}
