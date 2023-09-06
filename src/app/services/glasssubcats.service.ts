import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GlassfinishesComponent } from '../header/settings/glassfinishes/glassfinishes.component';
import { Glassfinish } from '../shared/glassfinish.model';

import { Glasssubcat } from '../shared/glasssubcat.model';
import { GlassfinishService } from './glassfinish.service';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class GlasssubcatsService {
  private glasssubcats : Glasssubcat[] = [];
  private glassfinishes : Glassfinish[] = [];
  private glasssubcatsUpdated = new Subject<Glasssubcat[]>()

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  hostUrl = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }


  //=============Get Glass finishes=====

  getGlassfinishes()
  {

   return this.http.get<{message: string, glassfinishes : Glassfinish[]}>(this.hostUrl+"/api/glassfinishes");

  }


  //====================================

  getGlasssubcats(){

    this.http.get<{message: string,glasssubcats : Glasssubcat[]}>(this.hostUrl+"/api/glasssubcats")
    .subscribe((glasssubcatsData)=>{
      this.glasssubcats = glasssubcatsData.glasssubcats;
      
      this.glasssubcatsUpdated.next([...this.glasssubcats]);
    });
  }

  getGlasssubcatUpdateListener(){

   return this.glasssubcatsUpdated.asObservable()

  }



  addGlasssubcats(GlassSubCategory:string,GlassFinish:string[],GlassSubCategoryCost:string){


    const glasssubcat : Glasssubcat = {_id:null,
      GlassSubCategory : GlassSubCategory.toUpperCase(),
      GlassFinish : GlassFinish,
      GlassSubCategoryCost : GlassSubCategoryCost,
      DateCreated:this.DateFormat
    }

     
    this.http.post<{message: string, glasssubcatId: string}>(this.hostUrl+"/api/glasssubcats",glasssubcat)
    .subscribe((responseData)=>{
      const Id = responseData.glasssubcatId;
      glasssubcat._id = Id;


      this.glasssubcats.push(glasssubcat);
      this.glasssubcatsUpdated.next([...this.glasssubcats]);





    });


  }


  deleteGlasssubcat(glasssubcatId: string){
    this.http.delete(this.hostUrl+"/api/glasssubcats/"+glasssubcatId)
    .subscribe(()=>{
     const updatedGlasssubcat = this.glasssubcats.filter(glasssubcat => glasssubcat._id !== glasssubcatId);
     this.glasssubcats = updatedGlasssubcat;
     this.glasssubcatsUpdated.next([...this.glasssubcats]);

    });


  }
//===================================For Edit============================================
 getGlasssubcat(_id : string){
  //console.log(_id)
  console.log(this.http.get<{_id:string,GlassSubCategory:string,GlassFinish:string[],GlassSubCategoryCost:string,DateCreated:string}>(this.hostUrl+"/api/glasssubcats/"+ _id))
  return this.http.get<{_id:string,GlassSubCategory:string,GlassFinish:string[],GlassSubCategoryCost:string,DateCreated:string}>(this.hostUrl+"/api/glasssubcats/"+ _id)

}

//======update glass sub cat=============

updateGlasssubcat(_id :string, GlassSubCategory : string, GlassFinish : string[], GlassSubCategoryCost:string){

const glasssubcat : Glasssubcat  = {
_id : _id,
GlassSubCategory : GlassSubCategory.toUpperCase(),
GlassFinish : GlassFinish,
GlassSubCategoryCost : GlassSubCategoryCost,
DateCreated : this.DateFormat

}

this.http.put(this.hostUrl+"/api/glasssubcats/"+ _id ,glasssubcat).subscribe(response => {

   const updateGlasssubcats = [...this.glasssubcats];
   const oldGlasssubcatIndex = updateGlasssubcats.findIndex(p => p._id===glasssubcat._id);
   updateGlasssubcats[oldGlasssubcatIndex] = glasssubcat;
   this.glasssubcats = updateGlasssubcats;
   this.glasssubcatsUpdated.next([...this.glasssubcats]);
   this.router.navigate(["/settings/glasssubcats"]);

})
}



}
