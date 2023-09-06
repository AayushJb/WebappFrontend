import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { KitchenhandleService } from 'src/app/services/kitchenhandle.service';
import { KitchenHandle } from 'src/app/shared/kitchenhandle.model';
import { KitchenHandlePosition } from 'src/app/shared/kitchenhandleposition.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-kitchenhandle',
  templateUrl: './kitchenhandle.component.html',
  styleUrls: ['./kitchenhandle.component.css']
})
export class KitchenhandleComponent implements OnInit {

  form : FormGroup;
  kitchenhandlepositions : KitchenHandlePosition[] = [];
  kitchenhandles : KitchenHandle[] = [];
  kitchenhandle : KitchenHandle;
  isLoading = false;
  imagePreview :string;
  private kitchenhandlesSub : Subscription;
  private mode = 'kitchenhandles';
  private kitchenhandleId : string;

  constructor(public kitchenhandleService : KitchenhandleService, public route : ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'HandleName' : new FormControl(null,{validators:[Validators.required]}),
      'HandlePositions' : new FormControl(null,{validators:[Validators.required]}),
      'Image' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]})
    });



    this.kitchenhandleService.getKitchenHandlePositions().subscribe((response)=>{
      this.kitchenhandlepositions = response.kitchenhandlepositions
    })

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('kitchenhandleId')) {
    
       this.mode = 'edit';
       this.kitchenhandleId = paramMap.get('kitchenhandleId');
    
    
    
       this.kitchenhandleService.getKitchenHandle(this.kitchenhandleId).subscribe(positionData=>{
    
    
         this.kitchenhandle = {
          _id:positionData._id,
          HandleName : positionData.HandleName,
          HandlePositions : positionData.HandlePositions,
          imagePath : positionData.imagePath,
          DateCreated : positionData.DateCreated
        }
    
    
        this.imagePreview = this.kitchenhandle.imagePath;
         this.form.setValue({'HandleName':this.kitchenhandle.HandleName,'HandlePositions': this.kitchenhandle.HandlePositions,'Image':this.kitchenhandle.imagePath});
    
       });
      }else{
        
       this.mode = 'kitchenhandles';
       this.kitchenhandleId = null;
      }
    
    
     });
  

  }

 
  onSaveHandle(){

    
    if(this.form.invalid){

      return;
    }


   if(this.mode === 'kitchenhandles'){
    this.kitchenhandleService.addkitchenhandles(this.form.value.HandleName,this.form.value.HandlePositions,this.form.value.Image);

   }else{

    this.kitchenhandleService.updateKitchenHandle(this.kitchenhandleId,this.form.value.HandleName,this.form.value.HandlePositions,this.form.value.Image)

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
