import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';


import { Order } from '../shared/order.model';
import {environment} from '../../environments/environment';
import { Solution } from '../shared/solution.model';
import { GlassOrder } from '../shared/glassorder.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  hostUrl = environment.hostURL;
  orders: Order[] =[];
  glassorders : GlassOrder[] = [];
  downloads : boolean = false;
  updatedOrder = new Subject<Order[]>();
  updatedGlassOrder = new Subject<GlassOrder[]>();
  Userfullname : string;

  constructor(private http : HttpClient, private router : Router) { }
  

  getProjects(UserFullName:string)
  {
   
    this.http.get< {message: string, orders : Order[]}>(this.hostUrl+"/api/orders?user="+UserFullName).subscribe((orderData)=>{
      this.orders = orderData.orders
     
      this.updatedOrder.next(this.orders)
    })
  }


  getGlassProjects(UserFullName:string)
  {
   
    this.http.get< {message: string, orders : GlassOrder[]}>(this.hostUrl+"/api/glassorders?user="+UserFullName).subscribe((orderData)=>{
    
    
    
       this.glassorders= orderData.orders
     
      this.updatedGlassOrder.next(this.glassorders)
    })
  }

  





  getOrder(orderId:string)
  {
    return this.http.get<Order>(this.hostUrl+"/api/orders/"+orderId);
  }

  
  getGlassOrder(orderId:string)
  {
    return this.http.get<GlassOrder>(this.hostUrl+"/api/glassorders/"+orderId);
  }



  getAllorders()
  {
    return this.http.get<{message : string,orders : Order[]}>(this.hostUrl+"/api/orders/allordersatonce");
  }


  
  getProjectManagerOrders()
  {
    return this.http.get<{message : string,orders : Order[]}>(this.hostUrl+"/api/orders/projectmanagerorders");
  }
 
  

  


  getOrderUpdateListener(){

    return this.updatedOrder.asObservable()
  
   }

   getGlassOrderUpdateListener(){

    return this.updatedGlassOrder.asObservable()
  
   }

 
   UpdateOldProjectOrders(Order : Order)
   {
     return this.http.post<any>(this.hostUrl+"/api/updatecsoldproject",Order)
   }
  
   


 

   


}
