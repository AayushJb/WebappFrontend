import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup , NG_ASYNC_VALIDATORS, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { ColorsService } from 'src/app/services/colors.service';
import { Color } from 'src/app/shared/color.model';
import { mimeType }  from './mime-type.validator';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

  form : FormGroup;
  colors : Color[] = [];
  color : Color;
  isLoading = false;
  imagePreview :string;
  private colorsSub : Subscription;
  private mode = 'colors';
  private colorId : string;


  constructor(public colorService : ColorsService, public route : ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'Color' : new FormControl(null,{validators:[Validators.required]}),
      'Image' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]})
    });


//===========================================================================
this.route.paramMap.subscribe((paramMap:ParamMap)=>{
  if(paramMap.has('colorId')) {

   this.mode = 'edit';
   this.colorId = paramMap.get('colorId');



   this.colorService.getColor(this.colorId).subscribe(colorData=>{


     this.color = {
      _id:colorData._id,
      Color : colorData.Color,
      imagePath : colorData.imagePath,
      DateCreated : colorData.DateCreated
    }
     this.form.setValue({'Color':this.color.Color,'Image':this.color.imagePath});
     this.imagePreview = colorData.imagePath

   });
  }else{

   this.mode = 'colors';
   this.colorId = null;
  }


 });


  }




  //==============================Adding Subsystems========================================

  onSaveColor(){

    if(this.form.invalid){

      return;
    }


   if(this.mode === 'colors'){
    this.colorService.addColors(this.form.value.Color,this.form.value.Image);

   }else{

    this.colorService.updateColor(this.colorId,this.form.value.Color,this.form.value.Image)

   }


  this.form.reset();

  }


//=======================================================================

OnImagePicked(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'Image': file});
  this.form.get('Image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imagePreview = reader.result as string;
  }
  reader.readAsDataURL(file);
}

}
