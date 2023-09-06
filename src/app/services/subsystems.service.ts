import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import {environment} from '../../environments/environment';
import { Subsystem } from '../shared/subsystem.model';

@Injectable({
  providedIn: 'root'
})
export class SubsystemsService {

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  private subsystems : Subsystem[] = [];
  private subsystemsUpdated = new Subject<Subsystem[]>()

  hostUrl = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }

  getSubsystems(){

    this.http.get<{message: string,subsystems : Subsystem[]}>(this.hostUrl+"/api/subsystems")
    .subscribe((subsystemsData)=>{
      this.subsystems = subsystemsData.subsystems;
      this.subsystemsUpdated.next([...this.subsystems]);
    });
  }

  getSubsystemUpdateListener(){

   return this.subsystemsUpdated.asObservable()

  }




  addSubsystems(SubSystem:string){


    const subsystem : Subsystem = {_id:null,
      SubSystem : SubSystem.toUpperCase(), DateCreated:this.DateFormat
    }


    this.http.post<{message: string, subsystemId: string}>(this.hostUrl+"/api/subsystems",subsystem)
    .subscribe((responseData)=>{
      const Id = responseData.subsystemId;
      subsystem._id = Id;




      this.subsystems.push(subsystem);
      this.subsystemsUpdated.next([...this.subsystems]);





    });


  }


  deleteSubsystem(subsystemId: string){
    this.http.delete(this.hostUrl+"/api/subsystems/"+subsystemId)
    .subscribe(()=>{
     const updatedSubsystem = this.subsystems.filter(subsystem => subsystem._id !== subsystemId);
     this.subsystems = updatedSubsystem;
     this.subsystemsUpdated.next([...this.subsystems]);

    });


  }
//===================================For Edit============================================
 getSubsystem(_id : string){

return this.http.get<{_id:string,SubSystem:string,DateCreated:string}>(this.hostUrl+"/api/subsystems/"+ _id)

}

//======update Subsystem=============

updateSubsystem(_id :string, SubSystem : string){

const subsystem : Subsystem  = {
_id : _id,
SubSystem : SubSystem.toUpperCase(),
DateCreated : this.DateFormat

}

this.http.put(this.hostUrl+"/api/subsystems/"+ _id ,subsystem).subscribe(response => {




   const updateSubsystems = [...this.subsystems];
   const oldSubsystemIndex = updateSubsystems.findIndex(p => p._id===subsystem._id);
   updateSubsystems[oldSubsystemIndex] = subsystem;
   this.subsystems = updateSubsystems;
   this.subsystemsUpdated.next([...this.subsystems]);
   this.router.navigate(["/settings/subsystems"]);

  

})
}




}
