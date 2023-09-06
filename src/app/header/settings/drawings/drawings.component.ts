import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrawingsService } from 'src/app/services/drawings.service';
import { Drawing } from 'src/app/shared/drawing.model';
import { Hinge } from 'src/app/shared/hinge.model';
import { KitchenHandle } from 'src/app/shared/kitchenhandle.model';
import { KitchenHandlePosition } from 'src/app/shared/kitchenhandleposition.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-drawings',
  templateUrl: './drawings.component.html',
  styleUrls: ['./drawings.component.css']
})
export class DrawingsComponent implements OnInit {

  form : FormGroup;
  drawings : Drawing[] = [];
  drawing : Drawing;
  isLoading = false;
  imagePreview :string;
  private drawingsSub : Subscription;
  private mode = 'drawings';
  private drawingId : string;

  kitchenhandles : KitchenHandle[] = [];
  kitchenhandlepositions : KitchenHandlePosition[] = [];
  hinges : Hinge[] = [];


  constructor(public drawingService : DrawingsService, public route : ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'DrawingName' : new FormControl(null,{validators:[Validators.required]}),
      'HandleType' : new FormControl(null,{validators:[Validators.required]}),
      'HandlePosition' : new FormControl(null,{validators:[Validators.required]}),
      'HingePosition' : new FormControl(null,{validators:[Validators.required]}),
      'Image' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'Price' : new FormControl(null,{validators:[Validators.required]}),
      'AdditionalPrice' : new FormControl(null,{validators:[Validators.required]}) 
     });


     this.drawingService.getKitchenHandles().subscribe((response)=>{
       this.kitchenhandles = response.kitchenhandles;
     });

     this.drawingService.getKitchenHandlePositions().subscribe((response)=>{
       this.kitchenhandlepositions = response.kitchenhandlepositions;
     });

     this.drawingService.getHinges().subscribe((response)=>{
       this.hinges = response.hinges;
     })

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('drawingId')) {
    
       this.mode = 'edit';
       this.drawingId = paramMap.get('drawingId');
    
    
    
       this.drawingService.getDrawing(this.drawingId).subscribe(drawingData=>{
    
    
         this.drawing = {
          _id:drawingData._id,
          DrawingName : drawingData.DrawingName,
          HandleType : drawingData.HandleType,
          HandlePosition : drawingData.HandlePosition,
          HingePosition : drawingData.HingePosition,
          imagePath : drawingData.imagePath,
          Price : drawingData.Price,
          AdditionalPrice : drawingData.AdditionalPrice,
          DateCreated : drawingData.DateCreated
        }
    
    
        this.imagePreview = this.drawing.imagePath;
         this.form.setValue({'DrawingName':this.drawing.DrawingName,'HandleType':this.drawing.HandleType,'HandlePosition': this.drawing.HandlePosition,'HingePosition':this.drawing.HingePosition,'Image':this.drawing.imagePath,'Price':this.drawing.Price,'AdditionalPrice':this.drawing.AdditionalPrice});
    
       });
      }else{
        
       this.mode = 'drawings';
       this.drawingId = null;
      }
    
    
     });
  


  }


  
  onSaveDrawing(){

    
    if(this.form.invalid){

      return;
    }


   if(this.mode === 'drawings'){
    this.drawingService.addDrawings(this.form.value.DrawingName,this.form.value.HandleType,this.form.value.HandlePosition,this.form.value.HingePosition,this.form.value.Image,this.form.value.Price,this.form.value.AdditionalPrice);

   }else{

    this.drawingService.updateDrawing(this.drawingId,this.form.value.DrawingName,this.form.value.HandleType,this.form.value.HandlePosition,this.form.value.HingePosition,this.form.value.Image,this.form.value.Price,this.form.value.AdditionalPrice)

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
