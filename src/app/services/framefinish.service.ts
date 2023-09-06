import { Injectable } from '@angular/core';

import { Framefinish } from '../shared/framefinish.model';
import { Color } from '../shared/color.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FramefinishService {

  private colors : Color[] = [];
  private framefinishes : Framefinish[] = [];
  private framefinishesUpdated = new Subject<Framefinish[]>()
  hostURL = environment.hostURL;

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear



  constructor(private http : HttpClient, private router : Router) { }


//===================================Get glass subcats=======================================================
  getColors(){

    return this.http.get<{message: string, colors : Color[]}>(this.hostURL+"/api/colors");
  }


//======================================Get Glasscats======================================================
getFramefinishes(){
  this.http.get<{message: string, framefinishes : Framefinish[]}>(this.hostURL+"/api/framefinishes")
  .subscribe((framefinishesData)=>{
    this.framefinishes = framefinishesData.framefinishes;
    this.framefinishesUpdated.next([...this.framefinishes]);


  });

}

getFramefinishUpdateListener(){

  return this.framefinishesUpdated.asObservable()

 }

//=======================================Addin Glass cats====================================================================


addFramefinishes(FrameFinish:string , Color:string[]){


  const framefinish : Framefinish = {_id:null,
    FrameFinish : FrameFinish.toUpperCase(),
    Color : Color,
    DateCreated: this.DateFormat
  }


  this.http.post<{message: string, framefinishId: string}>(this.hostURL+"/api/framefinishes",framefinish)
  .subscribe((responseData)=>{
    const Id = responseData.framefinishId;
    framefinish._id = Id;




    this.framefinishes.push(framefinish);
    this.framefinishesUpdated.next([...this.framefinishes]);

    

  });


}
//==================================Deletin Glasscats======================

deleteFramefinish(framefinishId: string){
  this.http.delete(this.hostURL+"/api/framefinishes/"+framefinishId)
  .subscribe(()=>{
   const updatedFramefinish = this.framefinishes.filter(framefinish => framefinish._id !== framefinishId);
   this.framefinishes = updatedFramefinish;
   this.framefinishesUpdated.next([...this.framefinishes]);

  });


}

//===================================Updatin Glasscats=====================
getFramefinish(_id : string){


  return this.http.get<{_id:string, FrameFinish :string, Color : string[], DateCreated:string}>(this.hostURL+"/api/framefinishes/"+ _id)

  }


//======update Glasscat============

updateFramefinish(_id :string, FrameFinish: string, Color : string[]){

const framefinish : Framefinish  = {
_id : _id,
FrameFinish : FrameFinish.toUpperCase(),
Color : Color,
DateCreated : this.DateFormat

}

this.http.put(this.hostURL+"/api/framefinishes/"+ _id ,framefinish).subscribe(response => {





   const updateFramefinishes = [...this.framefinishes];
   const oldFramefinishIndex = updateFramefinishes.findIndex(p => p._id===framefinish._id);
   updateFramefinishes[oldFramefinishIndex] = framefinish;
   this.framefinishes = updateFramefinishes;
   this.framefinishesUpdated.next([...this.framefinishes]);
   this.router.navigate(["/settings/framefinishes"]);



})
}


}
