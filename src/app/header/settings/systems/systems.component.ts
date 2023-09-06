import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';

import { SystemService } from 'src/app/services/system.service';
import { Subsystem } from 'src/app/shared/subsystem.model';
import { System } from 'src/app/shared/system.model';
import { Systemtype } from 'src/app/shared/systemtype.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.css']
})
export class SystemsComponent implements OnInit {

  form : FormGroup;
  subsystems : Subsystem[] = [];
  systemtypes : Systemtype[] = [];
  systems : System[] = [];
  system : System;
  private mode = 'systems';
  private systemId : string;
  private systemsSub : Subscription;




  constructor(public systemsService : SystemService, public route : ActivatedRoute) { }

  ngOnInit(): void {

//==========================Form========

this.form = new FormGroup({
  'System' : new FormControl(null,{validators:[Validators.required]}),
  'SubSystem' : new FormControl('',{validators:[Validators.required]}),
  'SystemTypes' : new FormControl('',{validators:[Validators.required]}),
  })






//=======================Get Subsystems

    this.systemsService.getSubsystems().subscribe((subsystemsData)=>{
      this.subsystems = subsystemsData.subsystems;
      this.form.controls['SubSystem'].setValue(this.subsystems[0].SubSystem)
    });

//========================Get SystemTypes
    this.systemsService.getSystemTypes() .subscribe((systemtypesData)=>{
    this.systemtypes = systemtypesData.systemtypes;
    });
//========================




//============================
this.route.paramMap.subscribe((paramMap:ParamMap)=>{

  if(paramMap.has('systemId')) {

   this.mode = 'edit';
   this.systemId = paramMap.get('systemId');



   this.systemsService.getSystem(this.systemId).subscribe(systemData=>{


     this.system = {_id:systemData._id, System : systemData.System, SubSystem : systemData.SubSystem, SystemType : systemData.SystemType, DateCreated : systemData.DateCreated}

     this.form.setValue({'System':this.system.System,'SubSystem':this.system.SubSystem,'SystemTypes':this.system.SystemType});

   });

  }else{

   this.mode = 'systems';
   this.systemId = null;
  }


 });

//=======================Multiselect Dropdowm







}

//=============================Save System=======================================

onSaveSystem(){

  if(this.form.invalid){

    return;
  }



 if(this.mode === 'systems'){
  this.systemsService.addSystems(this.form.value.System,this.form.value.SubSystem,this.form.value.SystemTypes);
  this.form.reset();
  this.form.patchValue({'SubSystem':this.subsystems[0].SubSystem})

 }else{

  this.systemsService.updateSystem(this.systemId,this.form.value.System,this.form.value.SubSystem,this.form.value.SystemTypes)

 }


}



}

