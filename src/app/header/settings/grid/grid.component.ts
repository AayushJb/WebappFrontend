import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { GridService } from 'src/app/services/grid.service';
import { Design } from 'src/app/shared/design.model';
import { Grid } from 'src/app/shared/grid.model';
import { mimeType } from '../colors/mime-type.validator';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  form : FormGroup;
  designs : Design[] = [];
  grids : Grid[] = [];
  grid : Grid;
  private mode = 'grids';
  private gridId : string;
  private gridsSub : Subscription;
  imagePreview : string

  constructor(public gridsService : GridService, public route : ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'GridName' : new FormControl(null,{validators:[Validators.required]}),
      'Design' : new FormControl('',{validators:[Validators.required]}),
      'Price' : new FormControl('',{validators:[Validators.required]}),
      'Status' : new FormControl('ACTIVE',{validators:[Validators.required]}),
      'GlassNumber' : new FormControl('ONE',{validators:[Validators.required]}),
      'GLOnePercent' : new FormControl('',{validators:[Validators.required]}),
      'Image' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]})
      })


      
//=======================Get Subsystems

    this.gridsService.getDesigns().subscribe((designsData)=>{
      this.designs = designsData.designs;
    });


//========================


 

//============================
this.route.paramMap.subscribe((paramMap:ParamMap)=>{

  if(paramMap.has('gridId')) {

   this.mode = 'edit';
   this.gridId = paramMap.get('gridId');



   this.gridsService.getGrid(this.gridId).subscribe(gridData=>{


     this.grid = {
      _id:gridData._id, 
      GridName : gridData.GridName, 
      Design : gridData.Design,
      Price : gridData.Price,
      Status : gridData.Status,
      GlassNumber : gridData.GlassNumber,
      GLOnePercent : gridData.GLOnePercent,
      imagePath : gridData.imagePath,
      DateCreated : gridData.DateCreated}

     this.form.setValue({'GridName':this.grid.GridName,'Design':this.grid.Design,'Price' : this.grid.Price,'Status' : this.grid.Status,'GlassNumber' : this.grid.GlassNumber,'GLOnePercent' : this.grid.GLOnePercent,'Image':this.grid.imagePath});
     this.imagePreview = gridData.imagePath


   });

  }else{

   this.mode = 'grids';
   this.gridId = null;
  }


 });

    
  }


  
onSaveGrid(){

  if(this.form.invalid){

    return;
  }



 if(this.mode === 'grids'){
  this.gridsService.addGrids(this.form.value.GridName,this.form.value.Design,this.form.value.Price,this.form.value.Status,this.form.value.GlassNumber,this.form.value.GLOnePercent,this.form.value.Image);
 }
 else{
  this.gridsService.updateGrid(this.gridId,this.form.value.GridName,this.form.value.Design,this.form.value.Price,this.form.value.Status,this.form.value.GlassNumber,this.form.value.GLOnePercent,this.form.value.Image)
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
