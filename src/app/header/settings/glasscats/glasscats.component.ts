import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlasscatsService } from 'src/app/services/glasscats.service';

import { Glasscat } from 'src/app/shared/glasscat.model';
import { Glasssubcat } from 'src/app/shared/glasssubcat.model';

@Component({
  selector: 'app-glasscats',
  templateUrl: './glasscats.component.html',
  styleUrls: ['./glasscats.component.css']
})
export class GlasscatsComponent implements OnInit {

  form : FormGroup;
  glasssubcats : Glasssubcat[] = [];
  glasscats : Glasscat[] = [];
  glasscat : Glasscat;
  private mode = 'glasscats';
  private glasscatId : string;
  private glasscatsSub : Subscription;




  constructor(public glasscatsService : GlasscatsService, public route : ActivatedRoute) { }

  ngOnInit(): void {

//==========================Form========

this.form = new FormGroup({
  'GlassCategory' : new FormControl(null,{validators:[Validators.required]}),
  'GlassSubCategory' : new FormControl('',{validators:[Validators.required]}),
  })






//=======================Get Subsystems

    this.glasscatsService.getGlasssubcats().subscribe((glasssubcatsData)=>{
      this.glasssubcats = glasssubcatsData.glasssubcats;
     //this.form.controls['GlassSubCategory'].setValue(this.glasssubcats[0].GlassSubCategory)
    });



//============================
this.route.paramMap.subscribe((paramMap:ParamMap)=>{

  if(paramMap.has('glasscatId')) {

   this.mode = 'edit';
   this.glasscatId = paramMap.get('glasscatId');



   this.glasscatsService.getGlasscat(this.glasscatId).subscribe(glasscatData=>{


     this.glasscat = {_id:glasscatData._id, GlassCategory : glasscatData.GlassCategory, GlassSubCategory : glasscatData.GlassSubCategory, DateCreated : glasscatData.DateCreated}

     this.form.setValue({'GlassCategory':this.glasscat.GlassCategory,'GlassSubCategory':this.glasscat.GlassSubCategory});

   });

  }else{

   this.mode = 'glasscats';
   this.glasscatId = null;
  }


 });

//=======================Multiselect Dropdowm







}

//=============================Save System=======================================

onSaveGlasscat(){

  if(this.form.invalid){

    return;
  }



 if(this.mode === 'glasscats'){
  this.glasscatsService.addGlasscats(this.form.value.GlassCategory,this.form.value.GlassSubCategory);

 }else{

  this.glasscatsService.updateGlasscat(this.glasscatId,this.form.value.GlassCategory,this.form.value.GlassSubCategory)

 }


}




}
