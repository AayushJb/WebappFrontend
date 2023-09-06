import { Injectable } from '@angular/core';
import { WqgformService } from './wqgform.service';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProjectsService } from './projects.service';
import { Order } from '../shared/order.model';

@Injectable({
  providedIn: 'root'
})
export class PunchserviceService {

  CSData : any;
  hostUrl = environment.hostURL;
  private dataUpdated = new Subject<any[]>()

  Order : Order
  Details  = [];

  constructor( public wqgformService : WqgformService,
    private http : HttpClient,
    private router :Router,
    public projectsService : ProjectsService) { }


  getOrderDetails(Order : Order)
  { 

     this.Order = Order;
  
  }


  getPunches()
  {
    
    return this.http.get<any>(this.hostUrl+"/api/punchitems")


  }

  getProjectDetailsUpdateListener()
  {

    return this.dataUpdated.asObservable()


  }

  GetPunchItems(ProjectID:string,ProjectRefNo : string)
  {

    let ProjectDetails = {
      ProjectID : ProjectID,
      OrderNo : ProjectRefNo 
    }

   return this.http.post<any>(this.hostUrl+"/api/procoreprojectDetails",ProjectDetails)
  }
}
