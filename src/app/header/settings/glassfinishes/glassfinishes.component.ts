import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlassfinishService } from 'src/app/services/glassfinish.service';
import { Glassfinish } from 'src/app/shared/glassfinish.model';
import { mimeType } from '../colors/mime-type.validator';
import { Glassvariant } from 'src/app/shared/glassvariant.model';

@Component({
  selector: 'app-glassfinishes',
  templateUrl: './glassfinishes.component.html',
  styleUrls: ['./glassfinishes.component.css']
})
export class GlassfinishesComponent implements OnInit {

  form : FormGroup;
  glassfinishes : Glassfinish[] = [];
  glassfinish : Glassfinish;
  glassvariants : Glassvariant[] = [];
  isLoading = false;
  imagePreview :string;
  private glassfinishesSub : Subscription;
  private mode = 'glassfinishes';
  private glassfinishId : string;


  constructor(public glassfinishService : GlassfinishService, public route : ActivatedRoute) { }

  ngOnInit(): void {



    this.form = new FormGroup({
      'GlassModel' : new FormControl(null,{validators:[Validators.required]}),
      'GlassPrintName' : new FormControl(null,{validators:[Validators.required]}),
      'MinThick' : new FormControl(null,{validators:[Validators.required]}),
      'MaxThick' : new FormControl(null,{validators:[Validators.required]}),
      'Matte' : new FormControl('NO',{validators:[Validators.required]}),
      'MatteCost' : new FormControl(null,{validators:[Validators.required]}),
      'MaxHeight' : new FormControl(null,{validators:[Validators.required]}),
      'MaxWidth' : new FormControl(null,{validators:[Validators.required]}),
      'Price' : new FormControl(null,{validators:[Validators.required]}),
      'Image' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'Temperable' : new FormControl('NO',{validators:[Validators.required]}),
      'Status' : new FormControl('ACTIVE',{validators:[Validators.required]}),
      'Label' : new FormControl(null),
      'GlassVariants' : new FormControl(null),
      'WriteUp' : new FormControl(null),
    });

//=========================Get Glass Variants =============================

this.glassfinishService.getGlassvariants().subscribe((glassvariantsData)=>{
  this.glassvariants = glassvariantsData.glassvariants;

});



//===========================================================================
this.route.paramMap.subscribe((paramMap:ParamMap)=>{
  if(paramMap.has('glassfinishId')) {

   this.mode = 'edit';
   this.glassfinishId = paramMap.get('glassfinishId');



   this.glassfinishService.getGlassfinish(this.glassfinishId).subscribe(glassfinishData=>{


     this.glassfinish = {
      _id:glassfinishData._id,
      GlassModel : glassfinishData.GlassModel,
      GlassPrintName : glassfinishData.GlassPrintName,
      MinThick : glassfinishData.MinThick,
      MaxThick : glassfinishData.MaxThick,
      Matte : glassfinishData.Matte,
      MatteCost : glassfinishData.MatteCost,
      MaxHeight : glassfinishData.MaxHeight,
      MaxWidth : glassfinishData.MaxWidth,
      Price : glassfinishData.Price,
      imagePath : glassfinishData.imagePath,
      Temperable : glassfinishData.Temperable,
      Status : glassfinishData.Status,
      Label : glassfinishData.Label,
      GlassVariants : glassfinishData.GlassVariants,
      WriteUp : glassfinishData.WriteUp,
      DateCreated : glassfinishData.DateCreated

    }

    this.imagePreview = this.glassfinish.imagePath;

     this.form.setValue({'GlassModel':this.glassfinish.GlassModel,
     'GlassPrintName':this.glassfinish.GlassPrintName,
     'MinThick':this.glassfinish.MinThick,
     'MaxThick':this.glassfinish.MaxThick,
     'Matte':this.glassfinish.Matte,
     'MatteCost':this.glassfinish.MatteCost,
     'MaxHeight':this.glassfinish.MaxHeight,
     'MaxWidth':this.glassfinish.MaxWidth,
     'Price':this.glassfinish.Price,
     'Image':this.glassfinish.imagePath,
     'Temperable':this.glassfinish.Temperable,
     'Status':this.glassfinish.Status,
     'Label':this.glassfinish.Label,
     'GlassVariants':this.glassfinish.GlassVariants,
     'WriteUp':this.glassfinish.WriteUp


     });

   });
  }else{

   this.mode = 'glassfinishes';
   this.glassfinishId = null;
  }


 });


  }




  //==============================Adding Subsystems========================================

  onSaveGlassfinish(){

    if(this.form.invalid){

      return;
    }


   if(this.mode === 'glassfinishes'){
      this.glassfinishService.addGlassfinishes(this.form.value.GlassModel,this.form.value.GlassPrintName,
      this.form.value.MinThick,this.form.value.MaxThick,this.form.value.Matte,this.form.value.MatteCost,
      this.form.value.MaxHeight,this.form.value.MaxWidth,this.form.value.Price,this.form.value.Image,
      this.form.value.Temperable,this.form.value.Status,this.form.value.Label,this.form.value.GlassVariants,this.form.value.WriteUp);

   }else{

      this.glassfinishService.updateGlassfinish(this.glassfinishId,this.form.value.GlassModel,this.form.value.GlassPrintName,
      this.form.value.MinThick,this.form.value.MaxThick,this.form.value.Matte,this.form.value.MatteCost,
      this.form.value.MaxHeight,this.form.value.MaxWidth,this.form.value.Price,this.form.value.Image,
      this.form.value.Temperable,this.form.value.Status,this.form.value.Label,this.form.value.GlassVariants,this.form.value.WriteUp)

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
