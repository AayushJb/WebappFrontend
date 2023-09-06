import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { KitchentypeService } from 'src/app/services/kitchentype.service';
import { Color } from 'src/app/shared/color.model';
import { Glassfinish } from 'src/app/shared/glassfinish.model';
import { KitchenHandle } from 'src/app/shared/kitchenhandle.model';
import { KitchenType } from 'src/app/shared/kitchentype.model';
import { mimeType } from '../colors/mime-type.validator';

@Component({
  selector: 'app-kitchentypes',
  templateUrl: './kitchentypes.component.html',
  styleUrls: ['./kitchentypes.component.css']
})
export class KitchentypesComponent implements OnInit {

  form : FormGroup;
  colors : Color[] = [];
  glassfinishes : Glassfinish[] = [];

  private mode = 'kitchentypes';
  private kitchentypeId : string;
  kitchentype : KitchenType;
  isLoading = false;
  imagePreview :string;

  kitchenhandles : KitchenHandle[] = [];

  constructor(public kitchenService : KitchentypeService , public route : ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'SolutionType' : new FormControl(null,{validators:[Validators.required]}),
      'KitchenTypeName' : new FormControl(null,{validators:[Validators.required]}),
      'KitchenHandles' : new FormControl(null,{validators:[Validators.required]}),
      'Colors' : new FormControl('',{validators:[Validators.required]}),
      'GlassFinish' : new FormControl('',{validators:[Validators.required]}),
      'Image' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]})
      })

   
    this.kitchenService.getKitchenHandles().subscribe((response)=>{
      this.kitchenhandles = response.kitchenhandles;
    })


    this.kitchenService.getColors().subscribe((colorData)=>{
      this.colors = colorData.colors;
    })

    this.kitchenService.getGlassfinishes().subscribe((finishData)=>{
      this.glassfinishes = finishData.glassfinishes;
    })




    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
     

      if(paramMap.has('kitchentypeId')) {
    
       this.mode = 'edit';
       this.kitchentypeId = paramMap.get('kitchentypeId');
    
    
    
       this.kitchenService.getKitchenType(this.kitchentypeId).subscribe(kitchenData=>{
    
    
         this.kitchentype = {_id:kitchenData._id,SolutionType : kitchenData.SolutionType, KitchenTypeName : kitchenData.KitchenTypeName, KitchenHandles : kitchenData.KitchenHandles,Colors : kitchenData.Colors, GlassFinish : kitchenData.GlassFinish, imagePath :kitchenData.imagePath, DateCreated : kitchenData.DateCreated}
    
         this.form.setValue({'SolutionType' : this.kitchentype.SolutionType,'KitchenTypeName':this.kitchentype.KitchenTypeName,'KitchenHandles': this.kitchentype.KitchenHandles,'Colors':this.kitchentype.Colors,'GlassFinish':this.kitchentype.GlassFinish,'Image':this.kitchentype.imagePath});
    
       });
    
      }else{
    
       this.mode = 'kitchentypes';
       this.kitchentypeId = null;
      }
    
    
     });

  }


  onSaveKitchentype()
  {

    if(this.form.invalid){

      return;
    }
  
  
  
   if(this.mode === 'kitchentypes'){
    this.kitchenService.addKitchenTypes(this.form.value.SolutionType,this.form.value.KitchenTypeName,this.form.value.KitchenHandles,this.form.value.Colors,this.form.value.GlassFinish,this.form.value.Image);
    this.form.reset();
    
   }else{
  
    this.kitchenService.updateKitchenType(this.kitchentypeId,this.form.value.SolutionType,this.form.value.KitchenTypeName,this.form.value.KitchenHandles,this.form.value.Colors,this.form.value.GlassFinish,this.form.value.Image)
  
   }


  }

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
