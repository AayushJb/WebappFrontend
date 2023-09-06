import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';
import { Color } from '../shared/color.model';
import { Glassfinish } from '../shared/glassfinish.model';
import { KitchenHandle } from '../shared/kitchenhandle.model';
import { KitchenType } from '../shared/kitchentype.model';

@Injectable({
  providedIn: 'root'
})
export class KitchentypeService {

  hostUrl = environment.hostURL;

  private kitchentypes : KitchenType[] = [];
  private kitchensUpdated = new Subject<KitchenType[]>()

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear


  constructor(private http : HttpClient, private router : Router) { }


  getKitchenTypes(){
    this.http.get<{message: string, kitchentypes : KitchenType[]}>(this.hostUrl+"/api/kitchentypes")
    .subscribe((kitchensData)=>{
      this.kitchentypes = kitchensData.kitchentypes;
      this.kitchensUpdated.next([...this.kitchentypes]);
    });
  
  }
  

  getKitchenTypesPublic(){

    return this.http.get<{message: string, kitchentypes : KitchenType[]}>(this.hostUrl+"/api/kitchentypes");
  }

  getKitchenHandles(){

    return this.http.get<{message: string, kitchenhandles : KitchenHandle[]}>(this.hostUrl+"/api/kitchenhandles");
  }

  getColors(){

    return this.http.get<{message: string, colors : Color[]}>(this.hostUrl+"/api/colors");
  }

 
  getGlassfinishes()
  {

   return this.http.get<{message: string, glassfinishes : Glassfinish[]}>(this.hostUrl+"/api/glassfinishes");

  }


  getKitchenUpdateListener(){

    return this.kitchensUpdated.asObservable()
  
   }
  
  //=======================================Adding Systems====================================================================
  
  
  addKitchenTypes(SolutionType:string,KitchenTypeName:string,KitchenHandles : string[] ,Colors:string[], GlassFinish:string[],image : File){
  
  

    const kitchentypeData = new FormData();
    kitchentypeData.append("SolutionType", SolutionType);
    kitchentypeData.append("KitchenTypeName", KitchenTypeName);
    KitchenHandles.forEach((item) =>kitchentypeData.append("KitchenHandles[]", item));
    Colors.forEach((item) =>kitchentypeData.append("Colors[]", item));
    GlassFinish.forEach((item) =>kitchentypeData.append("GlassFinish[]", item));
    kitchentypeData.append("image", image, KitchenTypeName.toUpperCase());
    kitchentypeData.append("DateCreated",this.DateFormat);



  
  
  
    this.http.post<{message: string, kitchentypes: KitchenType}>(this.hostUrl+"/api/kitchentypes",kitchentypeData)
    .subscribe((responseData)=>{
     

      const kitchentype : KitchenType = {
        _id : responseData.kitchentypes._id,
        SolutionType : SolutionType,
        KitchenTypeName : KitchenTypeName.toUpperCase(),
        KitchenHandles : KitchenHandles,
        Colors : Colors,
        GlassFinish : GlassFinish,
        imagePath:responseData.kitchentypes.imagePath,
        DateCreated:this.DateFormat
      }

  
      this.kitchentypes.push(kitchentype);
      this.kitchensUpdated.next([...this.kitchentypes]); 
  
    });
  
  
  }
  //==================================Deleting Systems======================
  
  deleteKitchenType(kitchentypeId: string){
    this.http.delete(this.hostUrl+"/api/kitchentypes/"+kitchentypeId)
    .subscribe(()=>{
     const updatedKitchenType = this.kitchentypes.filter(kitchen => kitchen._id !== kitchentypeId);
     this.kitchentypes = updatedKitchenType;
     this.kitchensUpdated.next([...this.kitchentypes]);
  
    });
  
  
  }
  
  //===================================Updating Systems=====================
  getKitchenType(_id : string){
  
  
    return this.http.get<{_id:string,SolutionType: string, KitchenTypeName:string, KitchenHandles : string[],Colors:string[], GlassFinish : string[],imagePath: string, DateCreated:string}>(this.hostUrl+"/api/kitchentypes/"+ _id)
  
    }
  
  
  //======update Subsystem=============
  
  updateKitchenType(_id :string, SolutionType : string, KitchenTypeName: string,KitchenHandles: string[], Colors : string[], GlassFinish : string[],image : File|string){

    let kitchentypeData : KitchenType | FormData | any;
  if(typeof(image)==='object'){

    
    const kitchentypeData = new FormData();
    kitchentypeData.append("_id",_id);
    kitchentypeData.append("SolutionType", SolutionType);
    kitchentypeData.append("KitchenTypeName", KitchenTypeName);
    KitchenHandles.forEach((item) =>kitchentypeData.append("KitchenHandles[]", item));
    Colors.forEach((item) =>kitchentypeData.append("Colors[]", item));
    GlassFinish.forEach((item) =>kitchentypeData.append("GlassFinish[]", item));
    kitchentypeData.append("image", image, KitchenTypeName.toUpperCase());
    kitchentypeData.append("DateCreated",this.DateFormat);


  }else
  {
    kitchentypeData = {
    _id : _id,
    SolutionType : SolutionType,
    KitchenTypeName : KitchenTypeName.toUpperCase(),
    KitchenHandles : KitchenHandles,
    Colors : Colors,
    GlassFinish : GlassFinish,
    imagePath: image,
    DateCreated:this.DateFormat
  }

  }
  
 
  this.http.put(this.hostUrl+"/api/kitchentypes/"+ _id ,kitchentypeData).subscribe(response => {
  
  
  
  
     const updateKitchenTypes = [...this.kitchentypes];
     const oldKitchenIndex = updateKitchenTypes.findIndex(p => p._id===kitchentype._id);
 
     const kitchentype : KitchenType = {
      _id : _id,
      SolutionType : SolutionType,
      KitchenTypeName : KitchenTypeName.toUpperCase(),
      KitchenHandles : KitchenHandles,
      Colors : Colors,
      GlassFinish : GlassFinish,
      imagePath: '',
      DateCreated:this.DateFormat
     }


     updateKitchenTypes[oldKitchenIndex] = kitchentype;
     this.kitchentypes = updateKitchenTypes;
     this.kitchensUpdated.next([...this.kitchentypes]);
     this.router.navigate(["/settings/kitchentypes"]);
  
  
  
  })
  }

}
