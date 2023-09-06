import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Glassonlyfinish } from 'src/app/shared/glassonlyfinish.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { mimeType } from '../colors/mime-type.validator';
import { Glasscat } from 'src/app/shared/glasscat.model';
import { Glasssubcat } from 'src/app/shared/glasssubcat.model';
import { GlassonlyService } from 'src/app/services/glassonly.service';
import { GlassonlyfinishService } from 'src/app/services/glassonlyfinish.service';

@Component({
  selector: 'app-glassonlyfinish',
  templateUrl: './glassonlyfinish.component.html',
  styleUrls: ['./glassonlyfinish.component.css']
})
export class GlassonlyfinishComponent {

  
  form : FormGroup;
  glasscats : Glasscat[] =[]
  glasssubcats : Glasssubcat[]=[]
  glassonlyfinishes : Glassonlyfinish[] = [];
  glassonlyfinish : Glassonlyfinish;
  private glassfinishesSub : Subscription;
  private mode = 'glassonlyfinishes';
  private glassonlyfinishId : string;
  subscription : Subscription[] = [];

  imagethumbnailpathpreview : string;
  imageorientationpathpreview : string;
  imageapplicationpathpreview : string;
  imagepotraitpathpreview :  string;

  selectedglasscats = [];
  selectedglasssubcats = [];
 



  constructor( public glassonlyfinishService : GlassonlyfinishService, public route : ActivatedRoute, private overlay: Overlay, private dialog : MatDialog) { }

  ngOnInit(): void {


    this.form = new FormGroup({
 
      'GlassCategory' :new FormControl(null,{validators:[Validators.required]}),
      'GlassSubCategory' :new FormControl(null,{validators:[Validators.required]}),
      'GlassFinish' :new FormControl(null,{validators:[Validators.required]}),
      'GlassVariantModel' : new FormControl(null,{validators:[Validators.required]}),
      'GlassVariantModelWithThickness' : new FormControl(null,{validators:[Validators.required]}),
      'Thickness' : new FormControl(null,{validators:[Validators.required]}),
      'GlassPrintName' : new FormControl(null,{validators:[Validators.required]}),
      'MinThick' : new FormControl(null,{validators:[Validators.required]}),
      'MaxThick' : new FormControl(null,{validators:[Validators.required]}),
      'Matte' : new FormControl(null,{validators:[Validators.required]}),
      'MatteCost' : new FormControl(null,{validators:[Validators.required]}),
      'MaxHeight' : new FormControl(null,{validators:[Validators.required]}),
      'MaxWidth' : new FormControl(null,{validators:[Validators.required]}),
      'Price' : new FormControl(null,{validators:[Validators.required]}),
      'Temperable' : new FormControl(null,{validators:[Validators.required]}),
      'TemperableCost' : new FormControl(null,{validators:[Validators.required]}),
      'Status' : new FormControl("ACTIVE",{validators:[Validators.required]}),
      'Label' : new FormControl(null,{validators:[Validators.required]}),
      'Lamination':new FormControl(null,{validators:[Validators.required]}),
      'Weigth' :new FormControl(null,{validators:[Validators.required]}),
      'LeadTime' :new FormControl(null,{validators:[Validators.required]}),
      'Imagethumbnailpath' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'Imageorientationpath' : new FormControl(null),
      'Imageapplicationpath' : new FormControl(null),
      'Imagepotraitpath' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'WriteUp' : new FormControl(null,{validators:[Validators.required]})

    });


    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('glassfinishId')) {
    
    
       this.mode = 'edit';
       this.glassonlyfinishId = paramMap.get('glassfinishId');
    
    
       this.glassonlyfinishService.getGlassonlyfinish(this.glassonlyfinishId).subscribe(glassonlyfinishData=>{
        
       
    
        this.glassonlyfinish = {
          _id: glassonlyfinishData._id,
          GlassCategory :glassonlyfinishData.GlassCategory,
          GlassSubCategory :glassonlyfinishData.GlassSubCategory,	 
          GlassFinish :glassonlyfinishData.GlassFinish,
          GlassVariantModel : glassonlyfinishData.GlassVariantModel,
          GlassVariantModelWithThickness : glassonlyfinishData.GlassVariantModelWithThickness,
          Thickness :glassonlyfinishData.Thickness,
          GlassPrintName : glassonlyfinishData.GlassPrintName,
          MinThick : glassonlyfinishData.MinThick,
          MaxThick : glassonlyfinishData.MaxThick,
          Matte : glassonlyfinishData.Matte,
          MatteCost : glassonlyfinishData.MatteCost,
          MaxHeight : glassonlyfinishData.MaxHeight,
          MaxWidth : glassonlyfinishData.MaxWidth,
          Price : glassonlyfinishData.Price,
          Temperable : glassonlyfinishData.Temperable,
          TemperableCost : glassonlyfinishData.TemperableCost,
          Status : glassonlyfinishData.Status,
          Label : glassonlyfinishData.Label,
          Lamination:glassonlyfinishData.Lamination,
          Weigth :glassonlyfinishData.Weigth, 
          LeadTime : "0",
          imagethumbnailpath :glassonlyfinishData.imagethumbnailpath,
          imageorientationpath :glassonlyfinishData.imageorientationpath,
          imageapplicationpath :glassonlyfinishData.imageapplicationpath,
          imagepotraitpath :glassonlyfinishData.imagepotraitpath,
          WriteUp : glassonlyfinishData.WriteUp,
          DateCreated : glassonlyfinishData.DateCreated
    
        }
    
    
        this.imagethumbnailpathpreview  = glassonlyfinishData.imagethumbnailpath
        this.imageorientationpathpreview  = glassonlyfinishData.imageorientationpath
        this.imageapplicationpathpreview  = glassonlyfinishData.imageapplicationpath
        this.imagepotraitpathpreview  = glassonlyfinishData.imagepotraitpath
    
    
    
       
    
        
    
         this.form.setValue({
    
          'GlassCategory' :this.glassonlyfinish.GlassCategory,
          'GlassSubCategory' :this.glassonlyfinish.GlassSubCategory,	 
          'GlassFinish' :this.glassonlyfinish.GlassFinish,
          'GlassVariantModel' : this.glassonlyfinish.GlassVariantModel,
          'GlassVariantModelWithThickness' : this.glassonlyfinish.GlassVariantModelWithThickness,
          'Thickness' :this.glassonlyfinish.Thickness,
          'GlassPrintName' : this.glassonlyfinish.GlassPrintName,
          'MinThick' : this.glassonlyfinish.MinThick,
          'MaxThick' : this.glassonlyfinish.MaxThick,
          'Matte' : this.glassonlyfinish.Matte,
          'MatteCost' : this.glassonlyfinish.MatteCost,
          'MaxHeight' : this.glassonlyfinish.MaxHeight,
          'MaxWidth' : this.glassonlyfinish.MaxWidth,
          'Price' : this.glassonlyfinish.Price,
          'Temperable' : this.glassonlyfinish.Temperable,
          'TemperableCost' : this.glassonlyfinish.TemperableCost,
          'Status' : this.glassonlyfinish.Status,
          'Label' : this.glassonlyfinish.Label,
          'Lamination': this.glassonlyfinish.Lamination,
          'Weigth' : this.glassonlyfinish.Weigth, 
          'LeadTime' :this.glassonlyfinish.LeadTime,
          'Imagethumbnailpath' :this.glassonlyfinish.imagethumbnailpath,
          'Imageorientationpath' :this.glassonlyfinish.imageorientationpath,
          'Imageapplicationpath' :this.glassonlyfinish.imageapplicationpath,
          'Imagepotraitpath' :this.glassonlyfinish.imagepotraitpath,
          'WriteUp' : this.glassonlyfinish.WriteUp
     
         });
    
       
    
     
       });
      }else{
    
       this.mode = 'glassonlyfinishes';
       this.glassonlyfinishId = null;
      }
    
    
     });

  //=============get Glass Categories==========
    this.glassonlyfinishService.getGlasscats().subscribe((glasscatsData)=>{
      this.glasscats = glasscatsData.glasscats;
      this.glasscats.map(item=>
        {
        
            this.selectedglasscats.push(item.GlassCategory)
  
          
        })
      this.form.patchValue({'GlassCategory':this.glasscats[0].GlassCategory });
      this.form.patchValue({'GlassSubCategory':this.glasscats[0].GlassSubCategory[0]});

    });

 //=================get Glass Sub Categories=============
    this.glassonlyfinishService.getGlasssubcats().subscribe((glasssubcatsData)=>{
      this.glasssubcats = glasssubcatsData.glasssubcats;
    });


//=========================================================
 
    this.glasscatValueChanges();
   







  //===========================================================================







  }




  glasscatValueChanges(){

    this.subscription.push(this.form.get('GlassCategory').valueChanges.subscribe((response)=>{
    this.selectedglasscats = [];
    this.selectedglasssubcats = [];

    this.glasscats.map(item=>
      {
        if(item.GlassCategory===response)
        {

          for(var i =0;i<item.GlassSubCategory.length;i++ )
          {
            this.selectedglasssubcats.push(item.GlassSubCategory[i])
          }
          

        }
      })

    this.form.patchValue({'GlassSubCategory':this.selectedglasssubcats[0]});





    }));

    }
    //==============================Subsystem Value changes ===================

  //===============================On Change glass categories==================




ngOnDestroy(){

  this.subscription.forEach(item =>{
    if(item) item.unsubscribe()
  })
}


//===================================Adding glasses in multi dropdowns===================



//=======================================================================IMAGES PREVIEW CODE================
//======================MRI====
OnImagethumbnailpath(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'Imagethumbnailpath': file});
  this.form.get('Imagethumbnailpath').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imagethumbnailpathpreview = reader.result as string;
  }
  reader.readAsDataURL(file);
}


//======================SORI====
OnImageorientationpath(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'Imageorientationpath': file});
  this.form.get('Imageorientationpath').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imageorientationpathpreview = reader.result as string;
  }
  reader.readAsDataURL(file);
}


//======================SORI====
OnImageapplicationpath(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'Imageapplicationpath': file});
  this.form.get('Imageapplicationpath').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imageapplicationpathpreview = reader.result as string;
  }
  reader.readAsDataURL(file);
}



//======================PSE====
OnImagepotraitpath(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'Imagepotraitpath': file});
  this.form.get('Imagepotraitpath').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imagepotraitpathpreview = reader.result as string;
  }
  reader.readAsDataURL(file);
}



//====================================On save Model================================
onSaveGlassOnlyFinish(){


  if(this.form.invalid){

    return;
  }


 if(this.mode === 'glassonlyfinishes'){
 


  this.glassonlyfinishService.addGlassonlyfinishes(

    this.form.value.GlassCategory,
    this.form.value.GlassSubCategory,	 
    this.form.value.GlassFinish,
    this.form.value.GlassVariantModel,
    this.form.value.GlassVariantModelWithThickness,
    this.form.value.Thickness,
    this.form.value.GlassPrintName,
    this.form.value.MinThick,
    this.form.value.MaxThick,
    this.form.value.Matte,
    this.form.value.MatteCost,
    this.form.value.MaxHeight,
    this.form.value.MaxWidth,
    this.form.value.Price,
    this.form.value.Temperable,
    this.form.value.TemperableCost,
    this.form.value.Status,
    this.form.value.Label,
    this.form.value.Lamination,
    this.form.value.Weigth, 
    this.form.value.LeadTime,
    this.form.value.Imagethumbnailpath,
    this.form.value.Imageorientationpath,
    this.form.value.Imageapplicationpath,
    this.form.value.Imagepotraitpath,
    this.form.value.WriteUp);
 }else{

  this.glassonlyfinishService.updateGlassonlyfinish(
    this.glassonlyfinishId,
    this.form.value.GlassCategory,
    this.form.value.GlassSubCategory,	 
    this.form.value.GlassFinish,
    this.form.value.GlassVariantModel,
    this.form.value.GlassVariantModelWithThickness,
    this.form.value.Thickness,
    this.form.value.GlassPrintName,
    this.form.value.MinThick,
    this.form.value.MaxThick,
    this.form.value.Matte,
    this.form.value.MatteCost,
    this.form.value.MaxHeight,
    this.form.value.MaxWidth,
    this.form.value.Price,
    this.form.value.Temperable,
    this.form.value.TemperableCost,
    this.form.value.Status,
    this.form.value.Label,
    this.form.value.Lamination,
    this.form.value.Weigth, 
    this.form.value.LeadTime,
    this.form.value.Imagethumbnailpath,
    this.form.value.Imageorientationpath,
    this.form.value.Imageapplicationpath,
    this.form.value.Imagepotraitpath,
    this.form.value.WriteUp
)

 }


this.form.reset();

}





}
