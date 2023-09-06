import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { HandleService } from 'src/app/services/handle.service';
import { Handle } from 'src/app/shared/handle.model';
import { Handlevariant } from 'src/app/shared/handlevariant.model';
import { mimeType } from '../colors/mime-type.validator';

@Component({
  selector: 'app-handles',
  templateUrl: './handles.component.html',
  styleUrls: ['./handles.component.css']
})
export class HandlesComponent implements OnInit {

  form : FormGroup;
  handles : Handle[] = [];
  handle : Handle;
  handlevariants : Handlevariant[] = [];
  isLoading = false;
  imagePreview :string;
  private handlesSub : Subscription;
  private mode = 'handles';
  private handleId : string;


  constructor(public handleService : HandleService, public route : ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'Handle' : new FormControl(null,{validators:[Validators.required]}),
      'Price' : new FormControl(null,{validators:[Validators.required]}),
      'Color' : new FormControl(null,{validators:[Validators.required]}),
      'HandleVariant' : new FormControl(null),
      'Image' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]})
    });

//=========================Get Glass Variants =============================

this.handleService.getHandlevariants().subscribe((handlevariantsData)=>{
  this.handlevariants = handlevariantsData.handlevariants;

});



//===========================================================================
this.route.paramMap.subscribe((paramMap:ParamMap)=>{
  if(paramMap.has('handleId')) {

   this.mode = 'edit';
   this.handleId = paramMap.get('handleId');



   this.handleService.getHandle(this.handleId).subscribe(handleData=>{


     this.handle = {
      _id:handleData._id,
      Handle : handleData.Handle,
      Price : handleData.Price,
      Color : handleData.Color,
      HandleVariant : handleData.HandleVariant,
      imagePath : handleData.imagePath,
      DateCreated : handleData.DateCreated

    }

    this.imagePreview = this.handle.imagePath;

     this.form.setValue({'Handle':this.handle.Handle,
     'Price':this.handle.Price,
     'Color':this.handle.Color,
     'HandleVariant':this.handle.HandleVariant,
     'Image':this.handle.imagePath

     });

   });
  }else{

   this.mode = 'handles';
   this.handleId = null;
  }


 });


  }




  //==============================Adding Subsystems========================================

  onSaveHandle(){

    if(this.form.invalid){

      return;
    }


   if(this.mode === 'handles'){
    this.handleService.addHandles(this.form.value.Handle,this.form.value.Price,
      this.form.value.Color,this.form.value.HandleVariant,this.form.value.Image);

   }else{

    this.handleService.updateHandle(this.handleId,this.form.value.Handle,this.form.value.Price,
      this.form.value.Color,this.form.value.HandleVariant,this.form.value.Image)

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
