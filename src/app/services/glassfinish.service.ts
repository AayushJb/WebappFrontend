import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Glassfinish } from '../shared/glassfinish.model';
import { Glassvariant } from '../shared/glassvariant.model';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlassfinishService {

  private glassfinishes : Glassfinish[] = [];
  private glassfinishesUpdated = new Subject<Glassfinish[]>()
  private glassvariants : Glassvariant[] = [];

   now  = new Date()
   nowDate = this.now.getDate();
   nowMonth = this.now.getMonth()+1;
   nowYear = this.now.getFullYear();
   DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  hostUrl = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }


  getGlassvariants(){

    return this.http.get<{message: string,glassvariants : Glassvariant[]}>(this.hostUrl+"/api/glassvariants");
  }

  getGlassfinishes(){

    this.http.get<{message: string,glassfinishes : Glassfinish[]}>(this.hostUrl+"/api/glassfinishes")
    .subscribe((glassfinishesData)=>{
      this.glassfinishes = glassfinishesData.glassfinishes;
      this.glassfinishesUpdated.next([...this.glassfinishes]);
    });
  }

  getGlassfinishesUpdateListener(){

   return this.glassfinishesUpdated.asObservable();

  }




  addGlassfinishes(GlassModel:string,GlassPrintName:string,MinThick:string,MaxThick:string,Matte:string,MatteCost:string,MaxHeight:string,MaxWidth:string,Price:string,image : File,Temperable:string,Status:string,Label:string,GlassVariants:string[],WriteUp:string){

    if(!Label)
    {
      Label = "";
    }
    if(!WriteUp)
    {
      WriteUp = "";
    }
    const glassfinishData = new FormData();
    glassfinishData.append("GlassModel", GlassModel);
    glassfinishData.append("GlassPrintName", GlassPrintName);
    glassfinishData.append("MinThick", MinThick);
    glassfinishData.append("MaxThick", MaxThick);
    glassfinishData.append("Matte", Matte);
    glassfinishData.append("MatteCost", MatteCost);
    glassfinishData.append("MaxHeight", MaxHeight);
    glassfinishData.append("MaxWidth", MaxWidth);
    glassfinishData.append("Price", Price);
    glassfinishData.append("image", image, GlassModel);
    glassfinishData.append("Temperable",Temperable);
    glassfinishData.append("Status", Status);
    glassfinishData.append("Label", Label);
    if(GlassVariants){
    GlassVariants.forEach((item) => glassfinishData.append("GlassVariants[]", item));
    }
    glassfinishData.append("WriteUp", WriteUp);
    glassfinishData.append("DateCreated",this.DateFormat);

    this.http.post<{message: string, glassfinish: Glassfinish}>(this.hostUrl+"/api/glassfinishes",glassfinishData)
    .subscribe((responseData)=>{

      const glassfinish : Glassfinish = {
        _id:responseData.glassfinish._id,
        GlassModel:GlassModel,
        GlassPrintName : GlassPrintName,
        MinThick : MinThick,
        MaxThick : MaxThick,
        Matte :Matte,
        MatteCost : MatteCost,
        MaxHeight :MaxHeight,
        MaxWidth :MaxWidth,
        Price : Price,
        imagePath:responseData.glassfinish.imagePath,
        Temperable:Temperable,
        Status :Status,
        Label :Label,
        GlassVariants : GlassVariants,
        WriteUp :WriteUp,
        DateCreated:this.DateFormat
      }

      this.glassfinishes.push(glassfinish);
      this.glassfinishesUpdated.next([...this.glassfinishes]);

      alert(responseData.message)





    });


  }


  deleteGlassfinish(glassfinishId: string){
    this.http.delete(this.hostUrl+"/api/glassfinishes/"+glassfinishId)
    .subscribe(()=>{
     const updatedGlassfinish = this.glassfinishes.filter(glassfinish => glassfinish._id !== glassfinishId);
     this.glassfinishes = updatedGlassfinish;
     this.glassfinishesUpdated.next([...this.glassfinishes]);

    });


  }
//===================================For Edit============================================
 getGlassfinish(_id : string){

return this.http.get<Glassfinish>(this.hostUrl+"/api/glassfinishes/"+ _id)//=====check

}

//======update Color=============

updateGlassfinish(_id :string,GlassModel:string,GlassPrintName:string,MinThick:string,MaxThick:string,Matte:string,MatteCost:string,MaxHeight:string,MaxWidth:string,Price:string, image : File|string,Temperable:string,Status:string,Label:string,GlassVariants:string[],WriteUp:string){
let glassfinishData : Glassfinish | FormData | any;
  if(typeof(image)==='object'){

    if(!Label)
    {
      Label = "";
    }
    if(!WriteUp)
    {
      WriteUp = "";
    }

    glassfinishData  = new FormData();
    glassfinishData.append("_id",_id);
    glassfinishData.append("GlassModel", GlassModel);
    glassfinishData.append("GlassPrintName", GlassPrintName);
    glassfinishData.append("MinThick", MinThick);
    glassfinishData.append("MaxThick", MaxThick);
    glassfinishData.append("Matte", Matte);
    glassfinishData.append("MatteCost", MatteCost);
    glassfinishData.append("MaxHeight", MaxHeight);
    glassfinishData.append("MaxWidth", MaxWidth);
    glassfinishData.append("Price", Price);
    glassfinishData.append("image", image, GlassModel);
    glassfinishData.append("Temperable",Temperable);
    glassfinishData.append("Status", Status);
    glassfinishData.append("Label", Label);
    if(GlassVariants){
    GlassVariants.forEach((item) => glassfinishData.append("GlassVariants[]", item));
    }
    glassfinishData.append("WriteUp", WriteUp);
    glassfinishData.append("DateCreated",this.DateFormat)


  }else
  {
    glassfinishData = {
        _id : _id,
        GlassModel:GlassModel,
        GlassPrintName : GlassPrintName,
        MinThick : MinThick,
        MaxThick : MaxThick,
        Matte :Matte,
        MatteCost : MatteCost,
        MaxHeight :MaxHeight,
        MaxWidth :MaxWidth,
        Price : Price,
        imagePath : image,
        Temperable:Temperable,
        Status :Status,
        Label :Label,
        GlassVariants : GlassVariants,
        WriteUp :WriteUp,
        DateCreated : this.DateFormat
  }

  }



//=======================================================================================================
//=======================================================================================================


this.http.put(this.hostUrl+"/api/glassfinishes/"+ _id ,glassfinishData).subscribe(response => {


   const updateGlassfinishes = [...this.glassfinishes];
   const oldGlassfinishIndex = updateGlassfinishes.findIndex(p => p._id===_id);

   const glassfinish : Glassfinish = {
        _id : _id,
        GlassModel:GlassModel,
        GlassPrintName : GlassPrintName,
        MinThick : MinThick,
        MaxThick : MaxThick,
        Matte :Matte,
        MatteCost : MatteCost,
        MaxHeight :MaxHeight,
        MaxWidth :MaxWidth,
        Price : Price,
        imagePath : '',
        Temperable:Temperable,
        Status :Status,
        Label :Label,
        GlassVariants:GlassVariants,
        WriteUp :WriteUp,
        DateCreated : this.DateFormat
   }

   updateGlassfinishes[oldGlassfinishIndex] = glassfinish;
   this.glassfinishes = updateGlassfinishes;
   this.glassfinishesUpdated.next([...this.glassfinishes]);
   this.router.navigate(["/settings/glassfinishes"]);



})
}

}
