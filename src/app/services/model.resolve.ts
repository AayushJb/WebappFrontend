import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
//import { Subscription } from 'rxjs/Subscription';
import { WqgformService } from './wqgform.service';
import { Observable } from 'rxjs';
import { Model } from '../shared/model.model';



@Injectable({
  providedIn: 'root'
})
export class ModelResolve implements Resolve<any> {
   
 constructor(private  dataservice: WqgformService){}
 resolve(route:ActivatedRouteSnapshot, 
        state:RouterStateSnapshot,
       ): Observable<{message: string, models : Model[]}> {
    return this.dataservice.getModels();  
  }
}