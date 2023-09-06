import { Overlay } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModelService } from 'src/app/services/model.service';
import { Color } from 'src/app/shared/color.model';
import { Glasscat } from 'src/app/shared/glasscat.model';
import { Glassfinish } from 'src/app/shared/glassfinish.model';
import { Glasssubcat } from 'src/app/shared/glasssubcat.model';
import { Handle } from 'src/app/shared/handle.model';
import { Model } from 'src/app/shared/model.model';
import { Subsystem } from 'src/app/shared/subsystem.model';
import { System } from 'src/app/shared/system.model';
import { mimeType } from '../colors/mime-type.validator';
import { SelectfinishesComponent } from './selectfinishes/selectfinishes.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']    
})
export class ModelsComponent implements OnInit,OnDestroy {

  form : FormGroup;
  models : Model[] = [];
  model : Model;
  private modelsSub : Subscription;
  private mode = 'models';
  private modelId : string;
  glassfinishes : Glassfinish[] = [];
  glasssubcats : Glasssubcat[] = [];
  glasscats :  Glasscat[] = [];
  systems : System[] = [];
  subsystems : Subsystem[] = [];
  colors : Color[];
  handles : Handle[];
  subscription : Subscription[] = [];
  selectedSystems = [];
  selectedGlassSubcats = [];
  selectedSubsystems = [];
  selectedSystemTypes = [];
  imagePreviewMRI : string;
  imagePreviewSORI : string;
  imagePreviewRI : string;
  imagePreviewPSE : string;
  imagePreviewMS : string;
  imagePreviewEx : string;
  selectedGlassfinishes = [];


  constructor( public modelService : ModelService , public route : ActivatedRoute, private overlay: Overlay, private dialog : MatDialog) { }

  ngOnInit(): void {


    this.form = new FormGroup({
      'System' : new FormControl(null,{validators:[Validators.required]}),
      'SubSystem' : new FormControl(null,{validators:[Validators.required]}),
      'SystemType' : new FormControl(null,{validators:[Validators.required]}),
      'SOFlag' : new FormControl('NO',{validators:[Validators.required]}),
      'PrintName' : new FormControl(null,{validators:[Validators.required]}),
      'SubOrientation' : new FormControl(null,{validators:[Validators.required]}),
      'Orientation' : new FormControl(null,{validators:[Validators.required]}),
      'GlassFinishes' : new FormControl(null,{validators:[Validators.required]}),
      'Colors' : new FormControl(null,{validators:[Validators.required]}),
      'Handles' : new FormControl(null),
      'Grid' : new FormControl('NO',{validators:[Validators.required]}),
      'DoorCloser' : new FormControl('NO',{validators:[Validators.required]}),
      'DropSeal' : new FormControl('NO',{validators:[Validators.required]}),
      'Temperable' : new FormControl('NO',{validators:[Validators.required]}),
      'Status' : new FormControl('ACTIVE',{validators:[Validators.required]}),
      'Code' : new FormControl(null),
      'MinThick' : new FormControl(null,{validators:[Validators.required]}),
      'MaxThick' : new FormControl(null,{validators:[Validators.required]}),
      'MinWidth' : new FormControl(null,{validators:[Validators.required]}),
      'MaxWidth' : new FormControl(null,{validators:[Validators.required]}),
      'MinHeight' : new FormControl(null,{validators:[Validators.required]}),
      'MaxHeight' : new FormControl(null,{validators:[Validators.required]}),
      'ProfileCost' : new FormControl(null,{validators:[Validators.required]}),
      'HardwareCost':new FormControl(null,{validators:[Validators.required]}),
      'FCost': new FormControl(null,{validators:[Validators.required]}),
      'Dcost' : new FormControl(null,{validators:[Validators.required]}),
      'Lock' : new FormControl("NO",{validators:[Validators.required]}),
      'ImageMRI' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'ImageSORI' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'ImageRI' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'ImagePSE' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'ImageEx' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'ImageMS' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),


      //'' : new FormControl(null,{validators:[Validators.required]}),


    });

  //=============get Glass Categories==========
    this.modelService.getGlasscats().subscribe((glasscatsData)=>{
      this.glasscats = glasscatsData.glasscats;
      this.form.patchValue({'GlassCategory':this.glasscats[0].GlassCategory });
      this.form.patchValue({'GlassSubCategory':this.glasscats[0].GlassSubCategory[0]});

    });

 //=================get Glass Sub Categories=============
    this.modelService.getGlasssubcats().subscribe((glasssubcatsData)=>{
      this.glasssubcats = glasssubcatsData.glasssubcats;
    });

//===================get glass finishes===================
 this.modelService.getGlassfinishes().subscribe((glassdata)=>{
  
  this.selectedGlassfinishes =  glassdata.glassfinishes;
 
 })
  

//=======================get Systems=====================

   this.modelService.getSystems().subscribe((systemsData)=>{
     this.systems = systemsData.systems;
     systemsData.systems.map(item=>{if(!this.selectedSystems.includes(item.System)){
       this.selectedSystems.push(item.System);
     }});
    this.form.patchValue({'System':this.selectedSystems[0]});
   })

//=========================================================
 
    this.systemValueChanges();
    this.subsystemValuechanges();

  //===================================Adding colors in multi dropdowns=========

  this.modelService.getColors().subscribe((colorsData)=>{
    this.colors = colorsData.colors;
  })


  //===================================Adding handles in multi dropdowns=========
  this.modelService.getHandles().subscribe((handlesData)=>{
    this.handles = handlesData.handles;
  })


  //===========================================================================
this.route.paramMap.subscribe((paramMap:ParamMap)=>{
  if(paramMap.has('modelId')) {


   this.mode = 'edit';
   this.modelId = paramMap.get('modelId');


   this.modelService.getModel(this.modelId).subscribe(modelData=>{


    this.model = {
      _id: modelData._id,
      System : modelData.System,
      SubSystem : modelData.SubSystem,
      SystemType : modelData.SystemType,
      SOFlag : modelData.SOFlag,
      PrintName : modelData.PrintName,
      SubOrientation : modelData.SubOrientation,
      Orientation : modelData.Orientation,
      GlassFinishes : modelData.GlassFinishes,
      Colors : modelData.Colors,
      Handles : modelData.Handles,
      Grid : modelData.Grid,
      DoorCloser : modelData.DoorCloser,
      DropSeal : modelData.DropSeal,
      Temperable : modelData.Temperable,
      Status : modelData.Status,
      Code : modelData.Code,
      MinThick : modelData.MinThick,
      MaxThick : modelData.MaxThick,
      MinWidth : modelData.MinWidth,
      MaxWidth : modelData.MaxWidth,
      MinHeight : modelData.MinHeight,
      MaxHeight : modelData.MaxHeight,
      ProfileCost : modelData.ProfileCost,
      HardwareCost : modelData.HardwareCost,
      FCost : modelData.FCost,
      Dcost : modelData.Dcost,
      Lock : modelData.Lock,
      imageMRIpath : modelData.imageMRIpath,
      imageSORIpath : modelData.imageSORIpath,
      imageRIpath : modelData.imageRIpath,
      imagePSEpath : modelData.imagePSEpath,
      imageExpath : modelData.imageExpath,
      imageMSpath : modelData.imageMSpath,
      DateCreated : modelData.DateCreated


    }

    //this.imagePreview = this.glassfinish.imagePath;


    this.imagePreviewMRI  = modelData.imageMRIpath;
    this.imagePreviewSORI  = modelData.imageSORIpath;
    this.imagePreviewRI  = modelData.imageRIpath;
    this.imagePreviewPSE  = modelData.imagePSEpath;
    this.imagePreviewMS  = modelData.imageMSpath;
    this.imagePreviewEx  = modelData.imageExpath;

    

     this.form.setValue({

      'System' : this.model.System,
      'SubSystem' : this.model.SubSystem,
      'SystemType' : this.model.SystemType,
      'SOFlag' : this.model.SOFlag,
      'PrintName' :this.model.PrintName,
      'SubOrientation' : this.model.SubOrientation,
      'Orientation' : this.model.Orientation,
      'GlassFinishes' : this.model.GlassFinishes,
      'Colors' : this.model.Colors,
      'Handles' : this.model.Handles,
      'Grid' : this.model.Grid,
      'DoorCloser' : this.model.DoorCloser,
      'DropSeal' : this.model.DropSeal,
      'Temperable' : this.model.Temperable,
      'Status' : this.model.Status,
      'Code' : this.model.Code,
      'MinThick' : this.model.MinThick,
      'MaxThick' : this.model.MaxThick,
      'MinWidth' : this.model.MinWidth,
      'MaxWidth' : this.model.MaxWidth,
      'MinHeight' : this.model.MinHeight,
      'MaxHeight' : this.model.MaxHeight,
      'ProfileCost' : this.model.ProfileCost,
      'HardwareCost': this.model.HardwareCost,
      'FCost': this.model.FCost,
      'Dcost' : this.model.Dcost,
      'Lock' : this.model.Lock,
      'ImageMRI' : this.model.imageMRIpath,
      'ImageSORI' : this.model.imageSORIpath,
      'ImageRI' : this.model.imageRIpath,
      'ImagePSE' : this.model.imagePSEpath,
      'ImageEx' : this.model.imageExpath,
      'ImageMS' : this.model.imageMSpath


     });

     this.form.patchValue({'System':this.model.System});

     this.form.patchValue({'SubSystem':this.model.SubSystem});
     this.form.patchValue({'SystemType':this.model.SystemType});

 
   });
  }else{

   this.mode = 'models';
   this.modelId = null;
  }


 });






  }




  systemValueChanges(){

    this.subscription.push(this.form.get('System').valueChanges.subscribe((response)=>{
    this.selectedSubsystems = [];
    this.selectedSystemTypes = [];

    this.systems.map(item=>{if(item.System===response&&(!this.selectedSubsystems.includes(item.SubSystem))){this.selectedSubsystems.push(item.SubSystem)

    }})

    this.form.patchValue({'SubSystem':this.selectedSubsystems[0]});

    this.systems.map(item => {if(item.System===response&& item.SubSystem ===this.selectedSubsystems[0]){

      this.selectedSystemTypes = item.SystemType;

    }})


    this.form.patchValue({'SystemType':this.selectedSystemTypes[0]});



    }));

    }
    //==============================Subsystem Value changes ===================
    subsystemValuechanges(){

       this.subscription.push(this.form.get('SubSystem').valueChanges.subscribe((response)=>{
        this.selectedSystemTypes = [];
        this.systems.map(item => {if(item.System===this.form.value.System && item.SubSystem===response){
        this.selectedSystemTypes = item.SystemType;

        }})

        this.form.patchValue({'SystemType':this.selectedSystemTypes[0]});
       }))

    }

  //===============================On Change glass categories==================




ngOnDestroy(){

  this.subscription.forEach(item =>{
    if(item) item.unsubscribe()
  })
}


//===================================Adding glasses in multi dropdowns===================

onclickAddglass()
{



  let Glasssubcategory = this.form.value.GlassSubCategory;


  this.glasssubcats.map(item => {if(item.GlassSubCategory===Glasssubcategory){

  item.GlassFinish.map(ite => {if(!this.selectedGlassfinishes.includes(ite)){
    this.selectedGlassfinishes.push(ite);
  }})

  }
});


}


//=======================================================================IMAGES PREVIEW CODE================
//======================MRI====
OnImagePickedMRI(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'ImageMRI': file});
  this.form.get('ImageMRI').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imagePreviewMRI = reader.result as string;
  }
  reader.readAsDataURL(file);
}


//======================SORI====
OnImagePickedSORI(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'ImageSORI': file});
  this.form.get('ImageSORI').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imagePreviewSORI = reader.result as string;
  }
  reader.readAsDataURL(file);
}


//======================SORI====
OnImagePickedRI(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'ImageRI': file});
  this.form.get('ImageRI').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imagePreviewRI = reader.result as string;
  }
  reader.readAsDataURL(file);
}



//======================PSE====
OnImagePickedPSE(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'ImagePSE': file});
  this.form.get('ImagePSE').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imagePreviewPSE = reader.result as string;
  }
  reader.readAsDataURL(file);
}

//======================RI====
OnImagePickedMS(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'ImageMS': file});
  this.form.get('ImageMS').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imagePreviewMS = reader.result as string;
  }
  reader.readAsDataURL(file);
}


//======================EX====
OnImagePickedEx(event :Event){
  const file =(event.target as HTMLInputElement).files[0];
  this.form.patchValue({'ImageEx': file});
  this.form.get('ImageEx').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = ()=>{
   this.imagePreviewEx = reader.result as string;
  }
  reader.readAsDataURL(file);
}


//====================================On save Model================================
onSaveModel(){


  if(this.form.invalid){

    return;
  }

console.log(this.form.value.GlassFinishes)
 if(this.mode === 'models'){
 


  this.modelService.addModels(
    this.form.value.System,
    this.form.value.SubSystem ,
    this.form.value.SystemType ,
    this.form.value.SOFlag ,
    this.form.value.PrintName ,
    this.form.value.SubOrientation ,
    this.form.value.Orientation ,
    this.form.value.GlassFinishes ,
    this.form.value.Colors ,
    this.form.value.Handles ,
    this.form.value.Grid ,
    this.form.value.DoorCloser ,
    this.form.value.DropSeal ,
    this.form.value.Temperable ,
    this.form.value.Status ,
    this.form.value.Code ,
    this.form.value.MinThick,
    this.form.value.MaxThick,
    this.form.value.MinWidth ,
    this.form.value.MaxWidth ,
    this.form.value.MinHeight ,
    this.form.value.MaxHeight,
    this.form.value.ProfileCost,
    this.form.value.HardwareCost,
    this.form.value.FCost,
    this.form.value.Dcost,
    this.form.value.Lock,
    this.form.value.ImageMRI,
    this.form.value.ImageSORI,
    this.form.value.ImageRI,
    this.form.value.ImagePSE,
    this.form.value.ImageEx,
    this.form.value.ImageMS);
 }else{

  this.modelService.updateModel(
    this.modelId,
    this.form.value.System,
    this.form.value.SubSystem ,
    this.form.value.SystemType ,
    this.form.value.SOFlag ,
    this.form.value.PrintName ,
    this.form.value.SubOrientation ,
    this.form.value.Orientation ,
    this.form.value.GlassFinishes ,
    this.form.value.Colors ,
    this.form.value.Handles ,
    this.form.value.Grid ,
    this.form.value.DoorCloser ,
    this.form.value.DropSeal ,
    this.form.value.Temperable ,
    this.form.value.Status ,
    this.form.value.Code ,
    this.form.value.MinThick,
    this.form.value.MaxThick,
    this.form.value.MinWidth ,
    this.form.value.MaxWidth ,
    this.form.value.MinHeight ,
    this.form.value.MaxHeight,
    this.form.value.ProfileCost,
    this.form.value.HardwareCost,
    this.form.value.FCost,
    this.form.value.Dcost,
    this.form.value.Lock,
    this.form.value.ImageMRI,
    this.form.value.ImageSORI,
    this.form.value.ImageRI,
    this.form.value.ImagePSE,
    this.form.value.ImageEx,
    this.form.value.ImageMS
)

 }


this.form.reset();

}



OpenLedgerForm()
{
// this.ledgerdetailsService.getOrderDetails(row.OrderNo,row._id);
 const scrollStrategy = this.overlay.scrollStrategies.reposition();
 const dialogConfig = new MatDialogConfig();

 dialogConfig.disableClose =true;
 dialogConfig.autoFocus =true;
 dialogConfig.width = "90%";
 dialogConfig.height= "90%";
 dialogConfig.scrollStrategy =  this.overlay.scrollStrategies.reposition();
 this.dialog.open(SelectfinishesComponent,dialogConfig)

}



}
