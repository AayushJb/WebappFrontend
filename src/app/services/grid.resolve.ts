import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
//import { Subscription } from 'rxjs/Subscription';
import { WqgformService } from './wqgform.service';
import { Observable } from 'rxjs';
import { Grid } from '../shared/grid.model';



@Injectable({
  providedIn: 'root'
})
export class GridResolve implements Resolve<any> {
   
 constructor(private  dataservice: WqgformService){}
 resolve(route:ActivatedRouteSnapshot, 
        state:RouterStateSnapshot,
       ): Observable<{message: string, grids : Grid[]}> {
    return this.dataservice.getGrids();  
  }
}