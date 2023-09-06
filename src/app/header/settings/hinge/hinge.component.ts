import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { HingeService } from 'src/app/services/hinge.service';
import { Hinge } from 'src/app/shared/hinge.model';
import { mimeType } from '../colors/mime-type.validator';

@Component({
  selector: 'app-hinge',
  templateUrl: './hinge.component.html',
  styleUrls: ['./hinge.component.css']
})
export class HingeComponent implements OnInit {

  form : FormGroup;
  hinges : Hinge[] = [];
  hinge : Hinge;
  isLoading = false;
  imagePreview :string;
  private hingesSub : Subscription;
  private mode = 'hinges';
  private hingeId : string;

  constructor(public hingeService : HingeService, public route : ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'HingeName' : new FormControl(null,{validators:[Validators.required]}),
      'Image' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]})
    });


    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('hingeId')) {
    
       this.mode = 'edit';
       this.hingeId = paramMap.get('hingeId');
    
    
    
       this.hingeService.getHinge(this.hingeId).subscribe(hingeData=>{
    
    
         this.hinge = {
          _id:hingeData._id,
          HingeName : hingeData.HingeName,
          imagePath : hingeData.imagePath,
          DateCreated : hingeData.DateCreated
        }
    
    
        this.imagePreview = this.hinge.imagePath;
         this.form.setValue({'HingeName':this.hinge.HingeName,'Image':this.hinge.imagePath});
    
       });
      }else{
        
       this.mode = 'hinges';
       this.hingeId = null;
      }
    
    
     });


  }

  onSaveHinge(){

    
    if(this.form.invalid){

      return;
    }


   if(this.mode === 'hinges'){
    this.hingeService.addhinges(this.form.value.HingeName,this.form.value.Image);

   }else{

    this.hingeService.updateHinge(this.hingeId,this.form.value.HingeName,this.form.value.Image)

   }


  this.form.reset();

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
