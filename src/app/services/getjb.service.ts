import { Injectable } from '@angular/core';
import { Order } from '../shared/order.model';
import {environment} from '../../environments/environment';
import { User } from '../shared/user.model';
import { WqgformService } from './wqgform.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectsService } from './projects.service';
import { Subject } from 'rxjs';
import { SpecialRequest } from '../shared/specialrequest.model';

@Injectable({
  providedIn: 'root'
})
export class GetjbService {

 
  CSData : any;
  hostUrl = environment.hostURL;
  users : User[] = [];
  private dataUpdated = new Subject<any[]>()

  Order : Order

  constructor(public wqgformService : WqgformService,
    private http : HttpClient,
    private router :Router,
    public projectsService : ProjectsService) { }

  getOrderDetails(Order : Order)
  { 

   let ProjectRefNo = ''

   if(Order.OrderNo.includes("/V-"))
   {
    let hyphen = Order.OrderNo.lastIndexOf("/V-");
    let tempproref = Order.OrderNo.substring(0, hyphen);
    let slash = tempproref.lastIndexOf("/");
    let proref = tempproref.substring(slash + 1, hyphen); 
    ProjectRefNo = proref
    
   }

   if(!Order.OrderNo.includes("/V-"))
   {
    
    let slash = Order.OrderNo.lastIndexOf("/");
    let proref = Order.OrderNo.substring(slash+ 1, Order.OrderNo.length);
    ProjectRefNo = proref
   }


       this.http.get(this.hostUrl+"/api/getjb?prorefno="+ProjectRefNo).subscribe((res)=>{
        
        let DataCS = [{Order : Order,CSData : res}]
        this.dataUpdated.next(DataCS);
       
       })
   



  
  }

  getCSDataUpdateListener()
  {

    return this.dataUpdated.asObservable()


  }

  getSpecialRequests()
{
  return this.http.get<{message: string; specialrequests : SpecialRequest[] }>(this.hostUrl+"/api/specialrequests")
}

}
