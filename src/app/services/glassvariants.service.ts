import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import {environment} from '../../environments/environment';

import { Glassvariant } from '../shared/glassvariant.model';

@Injectable({
  providedIn: 'root'
})
export class GlassvariantsService {

  private glassvariants : Glassvariant[] = [];
  private glassvariantsUpdated = new Subject<Glassvariant[]>()
  hostUrl = environment.hostURL;

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  constructor( private http : HttpClient, private router : Router) { }

  getGlassvariants(){

    this.http.get<{message: string,glassvariants : Glassvariant[]}>(this.hostUrl+"/api/glassvariants")
    .subscribe((glassvariantsData)=>{
      this.glassvariants = glassvariantsData.glassvariants;
      this.glassvariantsUpdated.next([...this.glassvariants]);
    });
  }

  getGlassvariantUpdateListener(){

   return this.glassvariantsUpdated.asObservable();

  }



  addGlassvariants(GlassVariantModel:string,GlassPrintName:string,MinThick:string,MaxThick:string,Matte:string,MatteCost:string,MaxHeight:string,MaxWidth:string,Price:string,image : File,Temperable:string,Status:string,Label:string,WriteUp:string){

    const glassvariantData = new FormData();
    glassvariantData.append("GlassVariantModel", GlassVariantModel);
    glassvariantData.append("GlassPrintName", GlassPrintName);
    glassvariantData.append("MinThick", MinThick);
    glassvariantData.append("MaxThick", MaxThick);
    glassvariantData.append("Matte", Matte);
    glassvariantData.append("MatteCost", MatteCost);
    glassvariantData.append("MaxHeight", MaxHeight);
    glassvariantData.append("MaxWidth", MaxWidth);
    glassvariantData.append("Price", Price);
    glassvariantData.append("image", image, GlassVariantModel);
    glassvariantData.append("Temperable", Temperable);
    glassvariantData.append("Status", Status);
    glassvariantData.append("Label", Label);
    glassvariantData.append("WriteUp", WriteUp);
    glassvariantData.append("DateCreated",this.DateFormat);

    this.http.post<{message: string, glassvariant: Glassvariant}>(this.hostUrl+"/api/glassvariants",glassvariantData)
    .subscribe((responseData)=>{



      const glassvariant : Glassvariant = {
        _id:responseData.glassvariant._id,
        GlassVariantModel:GlassVariantModel,
        GlassPrintName : GlassPrintName,
        MinThick : MinThick,
        MaxThick : MaxThick,
        Matte :Matte,
        MatteCost : MatteCost,
        MaxHeight :MaxHeight,
        MaxWidth :MaxWidth,
        Price : Price,
        imagePath:responseData.glassvariant.imagePath,
        Temperable:Temperable,
        Status :Status,
        Label :Label,
        WriteUp :WriteUp,
        DateCreated:this.DateFormat
      }

      this.glassvariants.push(glassvariant);
      this.glassvariantsUpdated.next([...this.glassvariants]);





    });


  }


  deleteGlassvariant(glassvariantId: string){
    this.http.delete(this.hostUrl + "/api/glassvariants/"+glassvariantId)
    .subscribe(()=>{
     const updatedGlassvariant = this.glassvariants.filter(glassvariant => glassvariant._id !== glassvariantId);
     this.glassvariants = updatedGlassvariant;
     this.glassvariantsUpdated.next([...this.glassvariants]);

    });


  }
//===================================For Edit============================================
 getGlassvariant(_id : string){

return this.http.get<Glassvariant>(this.hostUrl+"/api/glassvariants/"+ _id)//=====check

}

//======update Color=============

updateGlassvariant(_id :string,GlassVariantModel:string,GlassPrintName:string,MinThick:string,MaxThick:string,Matte:string,MatteCost:string,MaxHeight:string,MaxWidth:string,Price:string, image : File|string,Temperable:string,Status:string,Label:string,WriteUp:string){
let glassvariantData : Glassvariant | FormData;
  if(typeof(image)==='object'){

    glassvariantData  = new FormData();
    glassvariantData.append("_id",_id);
    glassvariantData.append("GlassVariantModel", GlassVariantModel);
    glassvariantData.append("GlassPrintName", GlassPrintName);
    glassvariantData.append("MinThick", MinThick);
    glassvariantData.append("MaxThick", MaxThick);
    glassvariantData.append("Matte", Matte);
    glassvariantData.append("MatteCost", MatteCost);
    glassvariantData.append("MaxHeight", MaxHeight);
    glassvariantData.append("MaxWidth", MaxWidth);
    glassvariantData.append("Price", Price);
    glassvariantData.append("image", image, GlassVariantModel);
    glassvariantData.append("Temperable", Temperable);
    glassvariantData.append("Status", Status);
    glassvariantData.append("Label", Label);
    glassvariantData.append("WriteUp", WriteUp);
    glassvariantData.append("DateCreated",this.DateFormat)


  }else
  {
    glassvariantData = {
        _id : _id,
        GlassVariantModel:GlassVariantModel,
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
        WriteUp :WriteUp,
        DateCreated : this.DateFormat
  }

  }


this.http.put(this.hostUrl+"/api/glassvariants/"+ _id ,glassvariantData).subscribe(response => {





   const updateGlassvariants = [...this.glassvariants];
   const oldGlassvariantIndex = updateGlassvariants.findIndex(p => p._id===_id);

   const glassvariant : Glassvariant = {
        _id : _id,
        GlassVariantModel:GlassVariantModel,
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
        WriteUp :WriteUp,
        DateCreated : this.DateFormat
   }

   updateGlassvariants[oldGlassvariantIndex] = glassvariant;
   this.glassvariants = updateGlassvariants;
   this.glassvariantsUpdated.next([...this.glassvariants]);
   this.router.navigate(["/settings/glassvariants"]);

  

})
}


}
