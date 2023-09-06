import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { SubsystemsService } from 'src/app/services/subsystems.service';
import { Subsystem } from 'src/app/shared/subsystem.model';

@Component({
  selector: 'app-substable',
  templateUrl: './substable.component.html',
  styleUrls: ['./substable.component.css']
})
export class SubstableComponent implements OnInit , OnDestroy{

  subsystems : Subsystem[] = [];
  private subsystemsSub : Subscription;



  constructor(public subsystemsService : SubsystemsService) { }

  ngOnInit(): void {

    this.subsystemsService.getSubsystems();

    this.subsystemsSub = this.subsystemsService.getSubsystemUpdateListener().subscribe((subsystems:Subsystem[])=>{

    this.subsystems = subsystems;
    });
    }




  ngOnDestroy(){

    this.subsystemsSub.unsubscribe();
   }


//=============================Editing Subsystem=========================================



//===============================Deleting Subsystem=============================================

OnDeleteSubsystem(subsystemId:string){

  this.subsystemsService.deleteSubsystem(subsystemId);

  }
//===============================================================================================

}
