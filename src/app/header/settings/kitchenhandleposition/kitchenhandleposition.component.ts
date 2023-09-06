import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { KitchenhandlepositionService } from 'src/app/services/kitchenhandleposition.service';
import { Hinge } from 'src/app/shared/hinge.model';
import { KitchenHandlePosition } from 'src/app/shared/kitchenhandleposition.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-kitchenhandleposition',
  templateUrl: './kitchenhandleposition.component.html',
  styleUrls: ['./kitchenhandleposition.component.css']
})
export class KitchenhandlepositionComponent implements OnInit {

  form : FormGroup;
  hinges : Hinge[] = [];
  kitchenhandlepositions : KitchenHandlePosition[] = [];
  kitchenhandleposition : KitchenHandlePosition;
  isLoading = false;
  imagePreview :string;
  private kitchenhandlepositionsSub : Subscription;
  private mode = 'kitchenhandlepositions';
  private kitchenhandlepositionId : string;

  constructor(public kitchenhandlepositionService : KitchenhandlepositionService, public route : ActivatedRoute) { }

  ngOnInit(): void {
  
    this.form = new FormGroup({
      'KitchenHandlePosition' : new FormControl(null,{validators:[Validators.required]}),
      'Hinge' : new FormControl(null,{validators:[Validators.required]}),
      'Image' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]})
    });


    this.kitchenhandlepositionService.getaHinges().subscribe((response)=>{
      this.hinges = response.hinges
    })

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('kitchenhandlepositionId')) {
    
       this.mode = 'edit';
       this.kitchenhandlepositionId = paramMap.get('kitchenhandlepositionId');
    
    
    
       this.kitchenhandlepositionService.getKitchenHandlePosition(this.kitchenhandlepositionId).subscribe(positionData=>{
    
    
         this.kitchenhandleposition = {
          _id:positionData._id,
          KitchenHandlePosition : positionData.KitchenHandlePosition,
          Hinge : positionData.Hinge,
          imagePath : positionData.imagePath,
          DateCreated : positionData.DateCreated
        }
    
    
        this.imagePreview = this.kitchenhandleposition.imagePath;
         this.form.setValue({'KitchenHandlePosition':this.kitchenhandleposition.KitchenHandlePosition,'Hinge': this.kitchenhandleposition.Hinge,'Image':this.kitchenhandleposition.imagePath});
    
       });
      }else{
        
       this.mode = 'kitchenhandlepositions';
       this.kitchenhandlepositionId = null;
      }
    
    
     });
  

  }


  onSaveHandlePosition(){

    
    if(this.form.invalid){

      return;
    }


   if(this.mode === 'kitchenhandlepositions'){
    this.kitchenhandlepositionService.addkitchenhandlepositions(this.form.value.KitchenHandlePosition,this.form.value.Hinge,this.form.value.Image);

   }else{

    this.kitchenhandlepositionService.updateKitchenHandlePosition(this.kitchenhandlepositionId,this.form.value.KitchenHandlePosition,this.form.value.Hinge,this.form.value.Image)

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
