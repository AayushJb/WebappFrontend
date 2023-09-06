import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
//import { Subscription } from 'rxjs/Subscription';
import { DesignpatternsService } from './designpatterns.service';
import { Observable } from 'rxjs';
import { Model } from '../shared/model.model';



@Injectable({
  providedIn: 'root'
})
export class DesignPatternResolve implements Resolve<any> {
   
 constructor(private  dataservice: DesignpatternsService){}
 resolve(route:ActivatedRouteSnapshot, 
        state:RouterStateSnapshot,
       ): Observable<{message: string, models : Model[]}> {
    return this.dataservice.getModels();  
  }
}