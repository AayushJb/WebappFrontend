import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { SystemtypesService } from 'src/app/services/systemtypes.service';
import { Systemtype } from 'src/app/shared/systemtype.model'

@Component({
  selector: 'app-systemtypes',
  templateUrl: './systemtypes.component.html',
  styleUrls: ['./systemtypes.component.css']
})
export class SystemtypesComponent implements OnInit {

  form : FormGroup;
  systemtypes : Systemtype[] = [];
  systemtype : Systemtype;
  isLoading = false;
  private systemtypesSub : Subscription;
  private mode = 'systemtypes';
  private systemtypeId : string;



  constructor(public systemtypesService: SystemtypesService, public route : ActivatedRoute) { }

  ngOnInit(): void {

   //===================Reactive Form==========================================

this.form = new FormGroup({
  'SystemType' : new FormControl(null,{validators:[Validators.required]})
});



//===========================================================================
  this.route.paramMap.subscribe((paramMap:ParamMap)=>{
   if(paramMap.has('systemtypeId')) {

    this.mode = 'edit';
    this.systemtypeId = paramMap.get('systemtypeId');



    this.systemtypesService.getSystemtype(this.systemtypeId).subscribe(systemtypeData=>{


      this.systemtype = {_id:systemtypeData._id,SystemType : systemtypeData.SystemType,DateCreated : systemtypeData.DateCreated}
      this.form.setValue({'SystemType':this.systemtype.SystemType});
    });
   }else{

    this.mode = 'systemtypes';
    this.systemtypeId = null;
   }


  });


  }



  //==============================Adding Subsystems========================================

  onSaveSystemtype(){

    if(this.form.invalid){

      return;
    }


   if(this.mode === 'systemtypes'){
    this.systemtypesService.addSystemtypes(this.form.value.SystemType);

   }else{

    this.systemtypesService.updateSystemtype(this.systemtypeId,this.form.value.SystemType)
   }


  this.form.reset();

  }



}
