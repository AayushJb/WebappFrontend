import { Injectable } from '@angular/core';
import { Glassonlyfinish } from '../shared/glassonlyfinish.model';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Glasssubcat } from '../shared/glasssubcat.model';
import { Glasscat } from '../shared/glasscat.model';

@Injectable({
  providedIn: 'root'
})
export class GlassonlyfinishService {

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  private glassonlyfinishes : Glassonlyfinish[] = [];
  private glassonlyfinishUpdated = new Subject<Glassonlyfinish[]>()

  hostUrl = environment.hostURL;


  constructor(private http : HttpClient, private router : Router) { }


  getGlasssubcats(){

    return this.http.get<{message: string, glasssubcats : Glasssubcat[]}>(this.hostUrl+"/api/glasssubcats");
  }

  getGlasscats(){

    return this.http.get<{message: string, glasscats : Glasscat[]}>(this.hostUrl+"/api/glasscats");
  }


 
  addGlassonlyfinishes(
    GlassCategory :string,
    GlassSubCategory :string,	 
    GlassFinish :string,
    GlassVariantModel : string,
    GlassVariantModelWithThickness : string,
    Thickness :string,
    GlassPrintName : string,
    MinThick : string,
    MaxThick : string,
    Matte : string,
    MatteCost : string,
    MaxHeight : string,
    MaxWidth : string,
    Price : string,
    Temperable : string,
    TemperableCost : string,
    Status : string,
    Label : string,
    Lamination:string,
    Weigth :string, 
    LeadTime :string,
    image1 : File,
    image2 : File,
    image3 : File,
    image4 : File,
    WriteUp : string 
    )
  
      {
  
      const glassonlyfinishData = new FormData();
      glassonlyfinishData.append("GlassCategory", GlassCategory);
      glassonlyfinishData.append("GlassSubCategory", GlassSubCategory);
      glassonlyfinishData.append("GlassFinish", GlassFinish);
      glassonlyfinishData.append("GlassVariantModel", GlassVariantModel);
      glassonlyfinishData.append("GlassVariantModelWithThickness", GlassVariantModelWithThickness);
      glassonlyfinishData.append("Thickness", Thickness);
      glassonlyfinishData.append("GlassPrintName", GlassPrintName);
      glassonlyfinishData.append("MinThick", MinThick);
      glassonlyfinishData.append("Matte", Matte);
      glassonlyfinishData.append("MatteCost", MatteCost);
      glassonlyfinishData.append("MaxHeight", MaxHeight);
      glassonlyfinishData.append("MaxThick", MaxThick);
      glassonlyfinishData.append("MaxWidth", MaxWidth);
      glassonlyfinishData.append("Price", Price);
      glassonlyfinishData.append("Temperable", Temperable);
      glassonlyfinishData.append("TemperableCost", TemperableCost);
      glassonlyfinishData.append("Status", Status);
      glassonlyfinishData.append("Label", Label);
      glassonlyfinishData.append("Lamination", Lamination);
      glassonlyfinishData.append("Weigth", Weigth);
      glassonlyfinishData.append("image1", image1,GlassVariantModel);
      glassonlyfinishData.append("image2", image2,GlassVariantModel);
      glassonlyfinishData.append("image3", image3,GlassVariantModel);
      glassonlyfinishData.append("image4", image4,GlassVariantModel);
      glassonlyfinishData.append("WriteUp", WriteUp,);
      glassonlyfinishData.append("DateCreated", this.DateFormat);




    


  
      this.http.post<{message: string, glassonlyfinish: Glassonlyfinish}>(this.hostUrl+"/api/glassonlyfinishes",glassonlyfinishData)
      .subscribe((responseData)=>{
  
    
        
  
        const glassonlyfinish : Glassonlyfinish = {
          _id:responseData.glassonlyfinish._id,
          GlassCategory : GlassCategory,
          GlassSubCategory : GlassSubCategory,	 
          GlassFinish : GlassFinish,
          GlassVariantModel : GlassVariantModel,
          GlassVariantModelWithThickness : GlassVariantModelWithThickness,
          Thickness : Thickness,
          GlassPrintName : GlassPrintName,
          MinThick : MinThick,
          MaxThick : MaxThick,
          Matte : Matte,
          MatteCost : MatteCost,
          MaxHeight : MaxHeight,
          MaxWidth : MaxWidth,
          Price : Price,
          Temperable : Temperable,
          TemperableCost : TemperableCost,
          Status : Status,
          Label :  Label,
          Lamination: Lamination,
          Weigth : Weigth, 
          LeadTime : LeadTime,
          imagethumbnailpath :responseData.glassonlyfinish.imagethumbnailpath,
          imageorientationpath :responseData.glassonlyfinish.imageorientationpath,
          imageapplicationpath :responseData.glassonlyfinish.imageapplicationpath,
          imagepotraitpath :responseData.glassonlyfinish.imagepotraitpath,
          WriteUp : WriteUp,
          DateCreated : this.DateFormat 
        }
  
        this.glassonlyfinishes.push(glassonlyfinish);
        this.glassonlyfinishUpdated.next([...this.glassonlyfinishes]);
  
  
  
  
  
      });
  
  
    }
  
  
    deleteGlassonlyfinish(glassonlyfinishId: string){
      this.http.delete(this.hostUrl+"/api/glassonlyfinishes/"+glassonlyfinishId)
      .subscribe(()=>{
       const updatedglassonlyfinish = this.glassonlyfinishes.filter(glassonlyfinish => glassonlyfinish._id !== glassonlyfinishId);
       this.glassonlyfinishes = updatedglassonlyfinish;
       this.glassonlyfinishUpdated.next([...this.glassonlyfinishes]);
  
      });
  
  
    }
  //===================================For Edit============================================
   getGlassonlyfinish(_id : string){

  
  
  return this.http.get<any>(this.hostUrl+"/api/glassonlyfinishes/"+ _id)//=====check
  
  }

  getGlassonlyfinishes(){

    this.http.get<{message: string,glassonlyfinish : Glassonlyfinish[]}>(this.hostUrl+"/api/glassonlyfinishes")
    .subscribe((glassonlyfinishesData)=>{

     
      this.glassonlyfinishes = glassonlyfinishesData.glassonlyfinish;
      this.glassonlyfinishUpdated.next([...this.glassonlyfinishes]);
    });
  }

  getglassonlyfinishUpdateListener(){

   return this.glassonlyfinishUpdated.asObservable();

  }
  
  //======update Color=============
  
  updateGlassonlyfinish(
    _id : string,
    GlassCategory :string,
    GlassSubCategory :string,	 
    GlassFinish :string,
    GlassVariantModel : string,
    GlassVariantModelWithThickness : string,
    Thickness :string,
    GlassPrintName : string,
    MinThick : string,
    MaxThick : string,
    Matte : string,
    MatteCost : string,
    MaxHeight : string,
    MaxWidth : string,
    Price : string,
    Temperable : string,
    TemperableCost : string,
    Status : string,
    Label : string,
    Lamination:string,
    Weigth :string, 
    LeadTime :string,
    image1 : File | string,
    image2 : File | string,
    image3 : File | string,
    image4 : File | string,
    WriteUp : string 

    ){
  let glassonlyfinishData : Glassonlyfinish | FormData | any;
    if(typeof(image1)==='object'&&typeof(image2)==='object'&&typeof(image3)==='object'&&typeof(image4)==='object'){

      const glassonlyfinishData = new FormData();
      glassonlyfinishData.append("_id",_id);
      glassonlyfinishData.append("GlassCategory", GlassCategory);
      glassonlyfinishData.append("GlassSubCategory", GlassSubCategory);
      glassonlyfinishData.append("GlassFinish", GlassFinish);
      glassonlyfinishData.append("GlassVariantModel", GlassVariantModel);
      glassonlyfinishData.append("GlassVariantModelWithThickness", GlassVariantModelWithThickness);
      glassonlyfinishData.append("Thickness", Thickness);
      glassonlyfinishData.append("GlassPrintName", GlassPrintName);
      glassonlyfinishData.append("MinThick", MinThick);
      glassonlyfinishData.append("Matte", Matte);
      glassonlyfinishData.append("MatteCost", MatteCost);
      glassonlyfinishData.append("MaxHeight", MaxHeight);
      glassonlyfinishData.append("MaxThick", MaxThick);
      glassonlyfinishData.append("MaxWidth", MaxWidth);
      glassonlyfinishData.append("Price", Price);
      glassonlyfinishData.append("Temperable", Temperable);
      glassonlyfinishData.append("TemperableCost", TemperableCost);
      glassonlyfinishData.append("Status", Status);
      glassonlyfinishData.append("Label", Label);
      glassonlyfinishData.append("Lamination", Lamination);
      glassonlyfinishData.append("Weigth", Weigth);
      glassonlyfinishData.append("image1", image1,GlassVariantModel);
      glassonlyfinishData.append("image2", image2,GlassVariantModel);
      glassonlyfinishData.append("image3", image3,GlassVariantModel);
      glassonlyfinishData.append("image4", image4,GlassVariantModel);
      glassonlyfinishData.append("WriteUp", WriteUp,);
      glassonlyfinishData.append("DateCreated", this.DateFormat);
  
    }else
    {
      glassonlyfinishData = {
  
          _id : _id,
          GlassCategory : GlassCategory,
          GlassSubCategory : GlassSubCategory,	 
          GlassFinish : GlassFinish,
          GlassVariantModel : GlassVariantModel,
          GlassVariantModelWithThickness : GlassVariantModelWithThickness,
          Thickness : Thickness,
          GlassPrintName : GlassPrintName,
          MinThick : MinThick,
          MaxThick : MaxThick,
          Matte : Matte,
          MatteCost : MatteCost,
          MaxHeight : MaxHeight,
          MaxWidth : MaxWidth,
          Price : Price,
          Temperable : Temperable,
          TemperableCost : TemperableCost,
          Status : Status,
          Label :  Label,
          Lamination: Lamination,
          Weigth : Weigth, 
          LeadTime : LeadTime,
          imagethumbnailpath : image1,
          imageorientationpath : image2,
          imageapplicationpath : image3,
          imagepotraitpath : image4,
          WriteUp : WriteUp,
          DateCreated : this.DateFormat
  
    }
  
    }
  
  
  this.http.put(this.hostUrl+"/api/glassonlyfinishes/"+ _id ,glassonlyfinishData).subscribe(response => {
  
  
  
  
  
     const updateglassonlyfinish = [...this.glassonlyfinishes];
     const oldglassonlyfinishIndex = updateglassonlyfinish.findIndex(p => p._id===_id);
  
     const glassonlyfinish : Glassonlyfinish = {
          _id : _id,
          GlassCategory : GlassCategory,
          GlassSubCategory : GlassSubCategory,	 
          GlassFinish : GlassFinish,
          GlassVariantModel : GlassVariantModel,
          GlassVariantModelWithThickness : GlassVariantModelWithThickness,
          Thickness : Thickness,
          GlassPrintName : GlassPrintName,
          MinThick : MinThick,
          MaxThick : MaxThick,
          Matte : Matte,
          MatteCost : MatteCost,
          MaxHeight : MaxHeight,
          MaxWidth : MaxWidth,
          Price : Price,
          Temperable : Temperable,
          TemperableCost : TemperableCost,
          Status : Status,
          Label :  Label,
          Lamination: Lamination,
          Weigth : Weigth, 
          LeadTime : LeadTime,
          imagethumbnailpath : '',
          imageorientationpath : '',
          imageapplicationpath : '',
          imagepotraitpath : '',
          WriteUp : WriteUp,
          DateCreated : this.DateFormat
     }
  
     updateglassonlyfinish[oldglassonlyfinishIndex] = glassonlyfinish;
     this.glassonlyfinishes = updateglassonlyfinish;
     this.glassonlyfinishUpdated.next([...this.glassonlyfinishes]);
     this.router.navigate(["/settings/glassonlyfinishes"]);
  
  
  
  })
  }



}
