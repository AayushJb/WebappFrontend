import { Component, OnInit , OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { SystemService } from 'src/app/services/system.service';
import { SystemtypesService } from 'src/app/services/systemtypes.service';
import { System } from 'src/app/shared/system.model';


@Component({
  selector: 'app-systable',
  templateUrl: './systable.component.html',
  styleUrls: ['./systable.component.css']
})
export class SystableComponent implements OnInit,OnDestroy {

  systems : System[] = [];
  private systemsSub : Subscription;

  constructor(public systemService : SystemService) { }

  ngOnInit(): void {

    this.systemService.getSystems();

    this.systemsSub = this.systemService.getSystemUpdateListener().subscribe((systems:System[])=>{

    this.systems = systems;

  });
}

ngOnDestroy(){

  this.systemsSub.unsubscribe();
 }


OnDeleteSubsystem(systemId:string){

this.systemService.deleteSystem(systemId);

}


}
