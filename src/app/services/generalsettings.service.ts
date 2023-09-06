import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GeneralSetting } from '../shared/generalsetting.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralsettingsService {

  private generalsettings : GeneralSetting[] = [];
  private generalsettingsUpdated = new Subject<GeneralSetting[]>()
  hostURL = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }

//===================================For Edit============================================
 getGeneralSetting(){
   let id = "621c77a42bad8bd8a55ae50b";
   return this.http.get<{_id:string, Counter:string, Prefix: string, Factor:string, GridCost:string, DoorCloserCost:string, DropSealCost:string,GlassFactor:string,GlassCounter:string}>(this.hostURL+"/api/generalsettings/"+ id)

  }

//======update general settings =============

updateGeneralSetting(Counter:string, Prefix: string, Factor:string, GridCost:string, DoorCloserCost:string, DropSealCost:string,GlassFactor:string,GlassCounter:string){

  let id = "621c77a42bad8bd8a55ae50b";

  const generalsetting : GeneralSetting  = {
  _id : id,
  Counter : Counter,
  Prefix : Prefix,
  Factor : Factor,
  GridCost :GridCost,
  DoorCloserCost : DoorCloserCost,
  DropSealCost :DropSealCost,
  GlassFactor : GlassFactor,
  GlassCounter : GlassCounter,
 

  }  

  this.http.put(this.hostURL+"/api/generalsettings/"+ id ,generalsetting).subscribe(response => {
    console.log(response)
  });
  }




}
 