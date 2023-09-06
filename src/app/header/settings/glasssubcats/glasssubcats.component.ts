import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { Glasssubcat } from 'src/app/shared/glasssubcat.model';
import { GlasssubcatsService } from 'src/app/services/glasssubcats.service';
import { Glassfinish } from 'src/app/shared/glassfinish.model';

@Component({
  selector: 'app-glasssubcats',
  templateUrl: './glasssubcats.component.html',
  styleUrls: ['./glasssubcats.component.css']
})
export class GlasssubcatsComponent implements OnInit {

  form : FormGroup;
  glasssubcats : Glasssubcat[] = [];
  glasssubcat : Glasssubcat;
  glassfinishes : Glassfinish[] = [];
  isLoading = false;
  private glasssubcatsSub : Subscription;
  private mode = 'glasssubcats';
  private glasssubcatId : string;


  constructor(public glasssubcatService : GlasssubcatsService, public route : ActivatedRoute) { }

  ngOnInit(): void {

  //=====================Get Glassfinish===========================================
    this.glasssubcatService.getGlassfinishes().subscribe((glassfinishesData)=>{
      this.glassfinishes = glassfinishesData.glassfinishes;

    })



  //===============================================================================
    this.form = new FormGroup({
    'GlassSubCategory' : new FormControl(null,{validators:[Validators.required]}),
    'GlassFinish' : new FormControl(null,{validators:[Validators.required]}),
    'GlassSubCategoryCost' : new FormControl(null,{validators:[Validators.required]})
    

  });


  //===========================================================================
  this.route.paramMap.subscribe((paramMap:ParamMap)=>{
    if(paramMap.has('glasssubcatId')) {

     this.mode = 'edit';
     this.glasssubcatId = paramMap.get('glasssubcatId');



     this.glasssubcatService.getGlasssubcat(this.glasssubcatId).subscribe(glasssubcatData=>{

       this.glasssubcat = {_id:glasssubcatData._id, GlassSubCategory : glasssubcatData.GlassSubCategory,GlassFinish: glasssubcatData.GlassFinish, GlassSubCategoryCost :glasssubcatData.GlassSubCategoryCost,DateCreated : glasssubcatData.DateCreated}
       this.form.setValue({'GlassSubCategory':this.glasssubcat.GlassSubCategory,'GlassFinish':this.glasssubcat.GlassFinish,'GlassSubCategoryCost' : this.glasssubcat.GlassSubCategoryCost});
     });
    }else{

     this.mode = 'glasssubcats';
     this.glasssubcatId = null;
    }


   });


}

onSaveGlasssubcat(){

  if(this.form.invalid){

    return;
  }


 if(this.mode === 'glasssubcats'){
  this.glasssubcatService.addGlasssubcats(this.form.value.GlassSubCategory,this.form.value.GlassFinish,this.form.value.GlassSubCategoryCost);

 }else{

  this.glasssubcatService.updateGlasssubcat(this.glasssubcatId,this.form.value.GlassSubCategory,this.form.value.GlassFinish,this.form.value.GlassSubCategoryCost)

 }


this.form.reset();

}



}
