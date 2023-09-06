import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { WqgformService } from './wqgform.service';
import { Observable } from 'rxjs';
import { Color } from '../shared/color.model';
import { GlassonlyService } from './glassonly.service';
import { Glassonlyfinish } from '../shared/glassonlyfinish.model';



@Injectable({
  providedIn: 'root'
})
export class GlassOnlyResolve implements Resolve<any> {
   
 constructor(private  dataservice: GlassonlyService){}
 resolve(route:ActivatedRouteSnapshot, 
        state:RouterStateSnapshot,
       ): Observable<{message: string, glassonlyfinish : Glassonlyfinish[]}> {
    return this.dataservice.getGlassOnlyFinishes();  
  }
}