import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { SubsystemsService } from 'src/app/services/subsystems.service';
import { Subsystem } from 'src/app/shared/subsystem.model'

@Component({
  selector: 'app-subsystems',
  templateUrl: './subsystems.component.html',
  styleUrls: ['./subsystems.component.css']
})
export class SubsystemsComponent implements OnInit {

  form : FormGroup;
  subsystems : Subsystem[] = [];
  subsystem : Subsystem;
  isLoading = false;
  private subsystemsSub : Subscription;
  private mode = 'subsystems';
  private subsystemId : string;



  constructor(public subsystemsService :SubsystemsService, public route : ActivatedRoute) { }

  ngOnInit() {
//===================Reactive Form==========================================

this.form = new FormGroup({
  'SubSystem' : new FormControl(null,{validators:[Validators.required]})
});



//===========================================================================
  this.route.paramMap.subscribe((paramMap:ParamMap)=>{
   if(paramMap.has('subsystemId')) {

    this.mode = 'edit';
    this.subsystemId = paramMap.get('subsystemId');



    this.subsystemsService.getSubsystem(this.subsystemId).subscribe(subsystemData=>{


      this.subsystem = {_id:subsystemData._id,SubSystem : subsystemData.SubSystem,DateCreated : subsystemData.DateCreated}
      this.form.setValue({'SubSystem':this.subsystem.SubSystem});
    });
   }else{

    this.mode = 'subsystems';
    this.subsystemId = null;
   }


  });


  }


//==============================Adding Subsystems========================================

  onSaveSubsystem(){

    if(this.form.invalid){

      return;
    }


   if(this.mode === 'subsystems'){
    this.subsystemsService.addSubsystems(this.form.value.SubSystem);

   }else{

    this.subsystemsService.updateSubsystem(this.subsystemId,this.form.value.SubSystem)
    
   }


  this.form.reset();

  }


}
