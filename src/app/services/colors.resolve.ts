import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { WqgformService } from './wqgform.service';
import { Observable } from 'rxjs';
import { Color } from '../shared/color.model';



@Injectable({
  providedIn: 'root'
})
export class ColorResolve implements Resolve<any> {
   
 constructor(private  dataservice: WqgformService){}
 resolve(route:ActivatedRouteSnapshot, 
        state:RouterStateSnapshot,
       ): Observable<{message: string, colors : Color[]}> {
    return this.dataservice.getColors();  
  }
}