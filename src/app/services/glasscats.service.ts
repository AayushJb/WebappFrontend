import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import {environment} from '../../environments/environment';


import { Glasscat } from '../shared/glasscat.model';
import { Glasssubcat } from '../shared/glasssubcat.model';


@Injectable({
  providedIn: 'root'
})
export class GlasscatsService {

  private glasssubcats : Glasssubcat[] = [];
  private glasscats : Glasscat[] = [];
  private glasscatsUpdated = new Subject<Glasscat[]>()

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  hostUrl = environment.hostURL;



  constructor(private http : HttpClient, private router : Router) { }


//===================================Get glass subcats=======================================================
  getGlasssubcats(){

    return this.http.get<{message: string,glasssubcats : Glasssubcat[]}>(this.hostUrl+"/api/glasssubcats");
  }


//======================================Get Glasscats======================================================
getGlasscats(){
  this.http.get<{message: string, glasscats : Glasscat[]}>(this.hostUrl+"/api/glasscats")
  .subscribe((glasscatsData)=>{
    this.glasscats = glasscatsData.glasscats;
    this.glasscatsUpdated.next([...this.glasscats]);

  });

}

getGlasscatUpdateListener(){

  return this.glasscatsUpdated.asObservable()

 }

//=======================================Addin Glass cats====================================================================


addGlasscats(GlassCategory:string , GlassSubCategory:string[]){


  const glasscat : Glasscat = {_id:null,
    GlassCategory : GlassCategory.toUpperCase(),
    GlassSubCategory : GlassSubCategory,
    DateCreated: this.DateFormat
  }


  this.http.post<{message: string, glasscatId: string}>(this.hostUrl+"/api/glasscats",glasscat)
  .subscribe((responseData)=>{
    const Id = responseData.glasscatId;
    glasscat._id = Id;

    this.glasscats.push(glasscat);
    this.glasscatsUpdated.next([...this.glasscats]);



  });


}
//==================================Deletin Glasscats======================

deleteGlasscat(glasscatId: string){
  this.http.delete(this.hostUrl+"/api/glasscats/"+glasscatId)
  .subscribe(()=>{
   const updatedGlasscat = this.glasscats.filter(glasscat => glasscat._id !== glasscatId);
   this.glasscats = updatedGlasscat;
   this.glasscatsUpdated.next([...this.glasscats]);

  });


}

//===================================Updatin Glasscats=====================
getGlasscat(_id : string){


  return this.http.get<{_id:string, GlassCategory:string, GlassSubCategory : string[], DateCreated:string}>(this.hostUrl+"/api/glasscats/"+ _id)

  }


//======update Glasscat============

updateGlasscat(_id :string, GlassCategory: string, GlassSubCategory : string[]){

const glasscat : Glasscat  = {
_id : _id,
GlassCategory : GlassCategory.toUpperCase(),
GlassSubCategory : GlassSubCategory,
DateCreated : this.DateFormat

}

this.http.put(this.hostUrl+"/api/glasscats/"+ _id ,glasscat).subscribe(response => {





   const updateGlasscats = [...this.glasscats];
   const oldGlasscatIndex = updateGlasscats.findIndex(p => p._id===glasscat._id);
   updateGlasscats[oldGlasscatIndex] = glasscat;
   this.glasscats = updateGlasscats;
   this.glasscatsUpdated.next([...this.glasscats]);
   this.router.navigate(["/settings/glasscats"]);

  

})
}





}
