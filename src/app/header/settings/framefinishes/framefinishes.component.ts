import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Framefinish } from 'src/app/shared/framefinish.model';
import { Color } from 'src/app/shared/color.model';
import { Subscription } from 'rxjs';
import { FramefinishService } from 'src/app/services/framefinish.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-framefinishes',
  templateUrl: './framefinishes.component.html',
  styleUrls: ['./framefinishes.component.css']
})
export class FramefinishesComponent implements OnInit {

  form : FormGroup;
  colors : Color[] = [];
  framefinishes : Framefinish[] = [];
  framefinish : Framefinish;
  private mode = 'framefinishes';
  private framefinishId : string;
  private framefinishesSub : Subscription;




  constructor(public framefinishService : FramefinishService, public route : ActivatedRoute) { }

  ngOnInit(): void {

//==========================Form========

this.form = new FormGroup({
  'FrameFinish' : new FormControl(null,{validators:[Validators.required]}),
  'Color' : new FormControl('',{validators:[Validators.required]}),
  })






//=======================Get Subsystems

    this.framefinishService.getColors().subscribe((colorsData)=>{
      this.colors = colorsData.colors;
    });



//============================
this.route.paramMap.subscribe((paramMap:ParamMap)=>{

  if(paramMap.has('framefinishId')) {

   this.mode = 'edit';
   this.framefinishId = paramMap.get('framefinishId');



   this.framefinishService.getFramefinish(this.framefinishId).subscribe(framefinishData=>{


     this.framefinish = {_id:framefinishData._id, FrameFinish : framefinishData.FrameFinish, Color : framefinishData.Color, DateCreated : framefinishData.DateCreated}

     this.form.setValue({'FrameFinish':this.framefinish.FrameFinish,'Color':this.framefinish.Color});

   });

  }else{

   this.mode = 'framefinishes';
   this.framefinishId = null;
  }


 });

//=======================Multiselect Dropdowm







}

//=============================Save System=======================================

onSaveFramefinish(){

  if(this.form.invalid){

    return;
  }



 if(this.mode === 'framefinishes'){
  this.framefinishService.addFramefinishes(this.form.value.FrameFinish,this.form.value.Color);

 }else{

  this.framefinishService.updateFramefinish(this.framefinishId,this.form.value.FrameFinish,this.form.value.Color)

 }


}



}
