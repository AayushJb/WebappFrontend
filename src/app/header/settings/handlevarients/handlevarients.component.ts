import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { HandlevariantService } from 'src/app/services/handlevariant.service';

import { Handlevariant } from 'src/app/shared/handlevariant.model';
import { mimeType } from '../colors/mime-type.validator';

@Component({
  selector: 'app-handlevarients',
  templateUrl: './handlevarients.component.html',
  styleUrls: ['./handlevarients.component.css']
})
export class HandlevarientsComponent implements OnInit {

  form : FormGroup;
  handlevariants : Handlevariant[] = [];
  handlevariant : Handlevariant;
  isLoading = false;
  imagePreview :string;
  private handlevariantsSub : Subscription;
  private mode = 'handlevariants';
  private handlevariantId : string;


  constructor(public handlevariantService : HandlevariantService, public route : ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'HandleVariant' : new FormControl(null,{validators:[Validators.required]}),
      'Price' : new FormControl(null,{validators:[Validators.required]}),
      'Color' : new FormControl(null,{validators:[Validators.required]}),
      'Image' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]})
    });


//===========================================================================
this.route.paramMap.subscribe((paramMap:ParamMap)=>{
  if(paramMap.has('handlevariantId')) {

   this.mode = 'edit';
   this.handlevariantId = paramMap.get('handlevariantId');



   this.handlevariantService.getHandlevariant(this.handlevariantId).subscribe(handlevariantData=>{


     this.handlevariant = {
      _id:handlevariantData._id,
      HandleVariant : handlevariantData.HandleVariant,
      Price : handlevariantData.Price,
      Color : handlevariantData.Color,
      imagePath : handlevariantData.imagePath,
      DateCreated : handlevariantData.DateCreated
    }


    this.imagePreview = this.handlevariant.imagePath;
     this.form.setValue({'HandleVariant':this.handlevariant.HandleVariant,'Price':this.handlevariant.Price,'Color':this.handlevariant.Color,'Image':this.handlevariant.imagePath});

   });
  }else{

   this.mode = 'handlevariants';
   this.handlevariantId = null;
  }


 });


  }




  //==============================Adding Subsystems========================================

  onSaveHandlevariant(){

    if(this.form.invalid){

      return;
    }


   if(this.mode === 'handlevariants'){
    this.handlevariantService.addhandlevariants(this.form.value.HandleVariant,this.form.value.Price,this.form.value.Color,this.form.value.Image);

   }else{

    this.handlevariantService.updateHandlevariant(this.handlevariantId,this.form.value.HandleVariant,this.form.value.Price,this.form.value.Color,this.form.value.Image)

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
