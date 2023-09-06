import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from '@swimlane/ngx-charts';
import { Subject } from 'rxjs';
import { System } from 'typescript';
import {environment} from '../../environments/environment';
import { Model } from '../shared/model.model';
import { Subsystem } from '../shared/subsystem.model';
import { Systemtype } from '../shared/systemtype.model';


@Injectable({
  providedIn: 'root'
})
export class DesignpatternsService {

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  private models : Model[] = [];
 
  hostUrl = environment.hostURL;


  private systems : System[] = [];
  private subsystems : Subsystem[] =[];
  private systemtypes  : Systemtype[] = [];

  constructor(private http : HttpClient, private router : Router) { }


  
  getSystems(){

    return this.http.get<{message: string, systems : System[]}>(this.hostUrl+"/api/systems");
  }

  getSubsystems(){

    return this.http.get<{message: string, subsystems : Subsystem[]}>(this.hostUrl+"/api/subsystems");
  }

  getSystemtypes(){

    return this.http.get<{message: string, systemtypes : Systemtype[]}>(this.hostUrl+"/api/systemtypes");
  }


  
  getModels(){

    return this.http.get<{message: string,models : Model[]}>(this.hostUrl+"/api/models")
  }

  getColors() {

    return this.http.get<{message : string, colors : Color[]}>(this.hostUrl+"/api/colors");
  }


  





}
