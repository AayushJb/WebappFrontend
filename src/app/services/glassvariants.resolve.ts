import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { WqgformService } from './wqgform.service';
import { Observable } from 'rxjs';
import { Glassvariant } from '../shared/glassvariant.model';



@Injectable({
  providedIn: 'root'
})
export class VariantResolve implements Resolve<any> {
   
 constructor(private  dataservice: WqgformService){}
 resolve(route:ActivatedRouteSnapshot, 
        state:RouterStateSnapshot,
       ): Observable<{message: string, glassvariants : Glassvariant[]}> {
    return this.dataservice.getGlassVariants();  
  }
}




