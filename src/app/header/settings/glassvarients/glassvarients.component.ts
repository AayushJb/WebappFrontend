import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlassvariantsService } from 'src/app/services/glassvariants.service';
import { Glassvariant } from 'src/app/shared/glassvariant.model';
import { mimeType }  from './mime-type.validator';

@Component({
  selector: 'app-glassvarients',
  templateUrl: './glassvarients.component.html',
  styleUrls: ['./glassvarients.component.css']
})
export class GlassvarientsComponent implements OnInit {

  form : FormGroup;
  glassvariants : Glassvariant[] = [];
  glassvariant : Glassvariant;
  isLoading = false;
  imagePreview :string;
  private glassvariantsSub : Subscription;
  private mode = 'glassvariants';
  private glassvariantId : string;


  constructor(public glassvariantService : GlassvariantsService, public route : ActivatedRoute) { }

  ngOnInit(): void {



    this.form = new FormGroup({
      'GlassVariantModel' : new FormControl(null,{validators:[Validators.required]}),
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
      'WriteUp' : new FormControl(null),
    });


//===========================================================================
this.route.paramMap.subscribe((paramMap:ParamMap)=>{
  if(paramMap.has('glassvariantId')) {

   this.mode = 'edit';
   this.glassvariantId = paramMap.get('glassvariantId');



   this.glassvariantService.getGlassvariant(this.glassvariantId).subscribe(glassvariantData=>{


     this.glassvariant = {
      _id:glassvariantData._id,
      GlassVariantModel : glassvariantData.GlassVariantModel,
      GlassPrintName : glassvariantData.GlassPrintName,
      MinThick : glassvariantData.MinThick,
      MaxThick : glassvariantData.MaxThick,
      Matte : glassvariantData.Matte,
      MatteCost : glassvariantData.MatteCost,
      MaxHeight : glassvariantData.MaxHeight,
      MaxWidth : glassvariantData.MaxWidth,
      Price : glassvariantData.Price,
      imagePath : glassvariantData.imagePath,
      Temperable : glassvariantData.Temperable,
      Status : glassvariantData.Status,
      Label : glassvariantData.Label,
      WriteUp : glassvariantData.WriteUp,
      DateCreated : glassvariantData.DateCreated

    }
    /*_id : string;
    GlassVarientModel : string,
    GlassPrintName : string,
    MinThick : string,
    MaxThick : string,
    Matte : string,
    MatteCost : string,
    MaxHeight : string,
    MaxWidth : string,
    Price : string,
    imagePath : string,
    Temperable : string,
    Status : string,
    Label : string,
    WriteUp : string,
    DateCreated : string */
    this.imagePreview = this.glassvariant.imagePath;
     this.form.setValue({'GlassVariantModel':this.glassvariant.GlassVariantModel,
     'GlassPrintName':this.glassvariant.GlassPrintName,
     'MinThick':this.glassvariant.MinThick,
     'MaxThick':this.glassvariant.MaxThick,
     'Matte':this.glassvariant.Matte,
     'MatteCost':this.glassvariant.MatteCost,
     'MaxHeight':this.glassvariant.MaxHeight,
     'MaxWidth':this.glassvariant.MaxWidth,
     'Price':this.glassvariant.Price,
     'Image':this.glassvariant.imagePath,
     'Temperable':this.glassvariant.Temperable,
     'Status':this.glassvariant.Status,
     'Label':this.glassvariant.Label,
     'WriteUp':this.glassvariant.WriteUp


     });

   });
  }else{

   this.mode = 'glassvariants';
   this.glassvariantId = null;
  }


 });


  }




  //==============================Adding Subsystems========================================

  onSaveGlassvariant(){

    if(this.form.invalid){

      return;
    }

/*_id : string;
    GlassVarientModel : string,
    GlassPrintName : string,
    MinThick : string,
    MaxThick : string,
    Matte : string,
    MatteCost : string,
    MaxHeight : string,
    MaxWidth : string,
    Price : string,
    imagePath : string,
    Temperable : string,
    Status : string,
    Label : string,
    WriteUp : string,
    DateCreated : string */
   if(this.mode === 'glassvariants'){
    this.glassvariantService.addGlassvariants(this.form.value.GlassVariantModel,this.form.value.GlassPrintName,
      this.form.value.MinThick,this.form.value.MaxThick,this.form.value.Matte,this.form.value.MatteCost,
      this.form.value.MaxHeight,this.form.value.MaxWidth,this.form.value.Price,this.form.value.Image,
      this.form.value.Temperable,this.form.value.Status,this.form.value.Label,this.form.value.WriteUp);

   }else{

    this.glassvariantService.updateGlassvariant(this.glassvariantId,this.form.value.GlassVariantModel,this.form.value.GlassPrintName,
      this.form.value.MinThick,this.form.value.MaxThick,this.form.value.Matte,this.form.value.MatteCost,
      this.form.value.MaxHeight,this.form.value.MaxWidth,this.form.value.Price,this.form.value.Image,
      this.form.value.Temperable,this.form.value.Status,this.form.value.Label,this.form.value.WriteUp)

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
