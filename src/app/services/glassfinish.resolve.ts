import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { WqgformService } from './wqgform.service';
import { Observable } from 'rxjs';
import { Model } from '../shared/model.model';
import { Glassfinish } from '../shared/glassfinish.model';



@Injectable({
  providedIn: 'root'
})
export class GlassResolve implements Resolve<any> {
   
 constructor(private  dataservice: WqgformService){}
 resolve(route:ActivatedRouteSnapshot, 
        state:RouterStateSnapshot,
       ): Observable<{message: string, glassfinishes : Glassfinish[]}> {
    return this.dataservice.getGlassfinishes();  
  }
}