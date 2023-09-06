import { Injectable } from '@angular/core';

import { Glasscat } from '../shared/glasscat.model';
import { Glasssubcat } from '../shared/glasssubcat.model';
import { Glassfinish } from '../shared/glassfinish.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { System } from '../shared/system.model';
import { Subsystem } from '../shared/subsystem.model';
import { Systemtype } from '../shared/systemtype.model';
import { Handle } from '../shared/handle.model';
import { Color } from '../shared/color.model';
import { Model } from '../shared/model.model';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ModelService {

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  private models : Model[] = [];
  private modelsUpdated = new Subject<Model[]>()

  hostUrl = environment.hostURL;

  private glassfinishes : Glassfinish[] = [];
  private glasssubcats : Glasssubcat[] = [];
  private glasscats : Glasscat[] = [];
  private systems : System[] = [];
  private subsystems : Subsystem[] =[];
  private systemtypes  : Systemtype[] = [];

  constructor(private http : HttpClient, private router : Router) { }

  getGlasssubcats(){

    return this.http.get<{message: string, glasssubcats : Glasssubcat[]}>(this.hostUrl+"/api/glasssubcats");
  }

  getGlasscats(){

    return this.http.get<{message: string, glasscats : Glasscat[]}>(this.hostUrl+"/api/glasscats");
  }

  getGlassfinishes(){

    return this.http.get<{message: string,glassfinishes : Glassfinish[]}>(this.hostUrl+"/api/glassfinishes");
    
  }

  getSystems(){

    return this.http.get<{message: string, systems : System[]}>(this.hostUrl+"/api/systems");
  }

  getSubsystems(){

    return this.http.get<{message: string, subsystems : Subsystem[]}>(this.hostUrl+"/api/subsystems");
  }

  getSystemtypes(){

    return this.http.get<{message: string, systemtypes : Systemtype[]}>(this.hostUrl+"/api/systemtypes");
  }


  getHandles(){

    return this.http.get<{message : string, handles : Handle[]}>(this.hostUrl+"/api/handles");

  }

  getColors() {

    return this.http.get<{message : string, colors : Color[]}>(this.hostUrl+"/api/colors");
  }


  getModels(){

    this.http.get<{message: string,models : Model[]}>(this.hostUrl+"/api/models")
    .subscribe((modelsData)=>{
      this.models = modelsData.models;
      this.modelsUpdated.next([...this.models]);
    });
  }

  getModelUpdateListener(){

   return this.modelsUpdated.asObservable();

  }




  addModels(
  System  : string,
  SubSystem  : string,
  SystemType  : string,
  SOFlag  : string,
  PrintName : string,
  SubOrientation : string,
  Orientation : string,
  GlassFinishes : string[],
  Colors : string[],
  Handles : string[],
  Grid : string,
  DoorCloser : string,
  DropSeal : string,
  Temperable : string,
  Status : string,
  Code : string,
  MinThick : string,
  MaxThick : string,
  MinWidth : string,
  MaxWidth : string,
  MinHeight : string,
  MaxHeight : string,
  ProfileCost : string,
  HardwareCost : string,
  FCost : string,
  Dcost : string,
  Lock : string,
  image1 : File,
  image2 : File,
  image3 : File,
  image4 : File,
  image5 : File,
  image6 : File
    )

    {

    const modelData = new FormData();
    modelData.append("System", System);
    modelData.append("SubSystem", SubSystem);
    modelData.append("SystemType", SystemType);
    modelData.append("SOFlag", SOFlag);
    modelData.append("SubOrientation", SubOrientation);
    modelData.append("PrintName", PrintName);
    modelData.append("Orientation", Orientation);
    GlassFinishes.forEach((item) => modelData.append("GlassFinishes[]", item));
    Colors.forEach((item) => modelData.append("Colors[]", item));
    Handles.forEach((item) => modelData.append("Handles[]", item));
    modelData.append("Grid", Grid);
    modelData.append("DoorCloser", DoorCloser);
    modelData.append("DropSeal", DropSeal);
    modelData.append("Temperable", Temperable);
    modelData.append("Status", Status);
    modelData.append("Code", Code);
    modelData.append("MinThick", MinThick);
    modelData.append("MaxThick", MaxThick);
    modelData.append("MinWidth", MinWidth);
    modelData.append("MaxWidth", MaxWidth);
    modelData.append("MinHeight", MinHeight);
    modelData.append("MaxHeight", MaxHeight);
    modelData.append("ProfileCost", ProfileCost);
    modelData.append("HardwareCost", HardwareCost);
    modelData.append("FCost", FCost);
    modelData.append("Dcost", Dcost);
    modelData.append("Lock", Lock);
    modelData.append("image1", image1, SubOrientation);
    modelData.append("image2", image2, SubOrientation);
    modelData.append("image3", image3, SubOrientation);
    modelData.append("image4", image4, SubOrientation);
    modelData.append("image5", image5, SubOrientation);
    modelData.append("image6", image6, SubOrientation);
    modelData.append("DateCreated",this.DateFormat);

    this.http.post<{message: string, model: Model}>(this.hostUrl+"/api/models",modelData)
    .subscribe((responseData)=>{



      const model : Model = {
        _id:responseData.model._id,
        System  : System,
        SubSystem  : SubSystem,
        SystemType  : SystemType,
        SOFlag  : SOFlag,
        PrintName : PrintName,
        SubOrientation : SubOrientation,
        Orientation : Orientation,
        GlassFinishes : GlassFinishes,
        Colors :  Colors,
        Handles : Handles,
        Grid : Grid,
        DoorCloser : DoorCloser,
        DropSeal : DropSeal,
        Temperable : Temperable,
        Status : Status,
        Code : Code,
        MinThick : MinThick,
        MaxThick : MaxThick,
        MinWidth : MinWidth,
        MaxWidth : MaxWidth,
        MinHeight : MinHeight,
        MaxHeight : MaxHeight,
        ProfileCost : ProfileCost,
        HardwareCost : HardwareCost,
        FCost : FCost,
        Dcost : Dcost,
        Lock : Lock,
        imageMRIpath:responseData.model.imageMRIpath,
        imageSORIpath:responseData.model.imageSORIpath,
        imageRIpath:responseData.model.imageRIpath,
        imagePSEpath:responseData.model.imagePSEpath,
        imageExpath:responseData.model.imageExpath,
        imageMSpath:responseData.model.imageMSpath,
        DateCreated:this.DateFormat
      }

      this.models.push(model);
      this.modelsUpdated.next([...this.models]);





    });


  }


  deleteModel(modelId: string){
    this.http.delete(this.hostUrl+"/api/models/"+modelId)
    .subscribe(()=>{
     const updatedModel = this.models.filter(model => model._id !== modelId);
     this.models = updatedModel;
     this.modelsUpdated.next([...this.models]);

    });


  }
//===================================For Edit============================================
 getModel(_id : string){

return this.http.get<Model>(this.hostUrl+"/api/models/"+ _id)//=====check

}

//======update Color=============

updateModel(
  _id : string,
  System  : string,
  SubSystem  : string,
  SystemType  : string,
  SOFlag  : string,
  PrintName : string,
  SubOrientation : string,
  Orientation : string,
  GlassFinishes : string[],
  Colors : string[],
  Handles : string[],
  Grid : string,
  DoorCloser : string,
  DropSeal : string,
  Temperable : string,
  Status : string,
  Code : string,
  MinThick : string,
  MaxThick : string,
  MinWidth : string,
  MaxWidth : string,
  MinHeight : string,
  MaxHeight : string,
  ProfileCost : string,
  HardwareCost : string,
  FCost : string,
  Dcost : string,
  Lock : string,
  image1 : File | string,
  image2 : File | string,
  image3 : File | string,
  image4 : File | string,
  image5 : File | string,
  image6 : File | string
  ){
let modelData : Model | FormData | any;
  if(typeof(image1)==='object'&&typeof(image2)==='object'&&typeof(image3)==='object'&&typeof(image4)==='object'&&typeof(image5)==='object'&&typeof(image6)==='object'){

    modelData  = new FormData();
    modelData.append("_id",_id);
    modelData.append("System", System);
    modelData.append("SubSystem", SubSystem);
    modelData.append("SystemType", SystemType);
    modelData.append("SOFlag", SOFlag);
    modelData.append("SubOrientation", SubOrientation);
    modelData.append("PrintName", PrintName);
    modelData.append("Orientation", Orientation);
    GlassFinishes.forEach((item) => modelData.append("GlassFinishes[]", item));
    Colors.forEach((item) => modelData.append("Colors[]", item));
    Handles.forEach((item) => modelData.append("Handles[]", item));
    modelData.append("Grid", Grid);
    modelData.append("DoorCloser", DoorCloser);
    modelData.append("DropSeal", DropSeal);
    modelData.append("Temperable", Temperable);
    modelData.append("Status", Status);
    modelData.append("Code", Code);
    modelData.append("MinThick", MinThick);
    modelData.append("MaxThick", MaxThick);
    modelData.append("MinWidth", MinWidth);
    modelData.append("MaxWidth", MaxWidth);
    modelData.append("MinHeight", MinHeight);
    modelData.append("MaxHeight", MaxHeight);
    modelData.append("ProfileCost", ProfileCost);
    modelData.append("HardwareCost", HardwareCost);
    modelData.append("FCost", FCost);
    modelData.append("Dcost", Dcost);
    modelData.append("Lock", Lock);
    modelData.append("image1", image1, SubOrientation);
    modelData.append("image2", image2, SubOrientation);
    modelData.append("image3", image3, SubOrientation);
    modelData.append("image4", image4, SubOrientation);
    modelData.append("image5", image5, SubOrientation);
    modelData.append("image6", image6, SubOrientation);
    modelData.append("DateCreated",this.DateFormat)

  }else
  {
    modelData = {

        _id : _id,
        System  : System,
        SubSystem  : SubSystem,
        SystemType  : SystemType,
        SOFlag  : SOFlag,
        PrintName : PrintName,
        SubOrientation : SubOrientation,
        Orientation : Orientation,
        GlassFinishes : GlassFinishes,
        Colors :  Colors,
        Handles : Handles,
        Grid : Grid,
        DoorCloser : DoorCloser,
        DropSeal : DropSeal,
        Temperable : Temperable,
        Status : Status,
        Code : Code,
        MinThick : MinThick,
        MaxThick : MaxThick,
        MinWidth : MinWidth,
        MaxWidth : MaxWidth,
        MinHeight : MinHeight,
        MaxHeight : MaxHeight,
        ProfileCost : ProfileCost,
        HardwareCost : HardwareCost,
        FCost : FCost,
        Dcost : Dcost,
        Lock : Lock,
        imageMRIpath : image1,
        imageSORIpath : image2,
        imageRIpath : image3,
        imagePSEpath : image4,
        imageExpath : image5,
        imageMSpath : image6,
        DateCreated : this.DateFormat

  }

  }


this.http.put(this.hostUrl+"/api/models/"+ _id ,modelData).subscribe(response => {





   const updateModels = [...this.models];
   const oldModelIndex = updateModels.findIndex(p => p._id===_id);

   const model : Model = {
        _id : _id,
        System  : System,
        SubSystem  : SubSystem,
        SystemType  : SystemType,
        SOFlag  : SOFlag,
        PrintName : PrintName,
        SubOrientation : SubOrientation,
        Orientation : Orientation,
        GlassFinishes : GlassFinishes,
        Colors :  Colors,
        Handles : Handles,
        Grid : Grid,
        DoorCloser : DoorCloser,
        DropSeal : DropSeal,
        Temperable : Temperable,
        Status : Status,
        Code : Code,
        MinThick : MinThick,
        MaxThick : MaxThick,
        MinWidth : MinWidth,
        MaxWidth : MaxWidth,
        MinHeight : MinHeight,
        MaxHeight : MaxHeight,
        ProfileCost : ProfileCost,
        HardwareCost : HardwareCost,
        FCost : FCost,
        Dcost : Dcost,
        Lock : Lock,
        imageMRIpath:'',
        imageSORIpath:'',
        imageRIpath:'',
        imagePSEpath:'',
        imageExpath:'',
        imageMSpath:'',
        DateCreated : this.DateFormat
   }

   updateModels[oldModelIndex] = model;
   this.models = updateModels;
   this.modelsUpdated.next([...this.models]);
   this.router.navigate(["/settings/models"]);



})
}





}
