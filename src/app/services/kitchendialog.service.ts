import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KitchenHandlePosition } from '../shared/kitchenhandleposition.model';
import {environment} from '../../environments/environment';
import { KitchenHandle } from '../shared/kitchenhandle.model';
import { KitchenType } from '../shared/kitchentype.model';
import { Hinge } from '../shared/hinge.model';
import { Drawing } from '../shared/drawing.model';
import { WqgformService } from './wqgform.service';
import { Glasssubcat } from '../shared/glasssubcat.model';
import { KitchenSpecs } from '../shared/kitchenspecs.model';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class KitchendialogService {

  hostUrl = environment.hostURL;
  kitchenType : string;
  GlassFinish : string;
  FrameFinish : string;
  GlassSubcat : string;
  Matte : string;
  public KitchenSpecs : KitchenSpecs[] = [];
  public KitchenSpec : KitchenSpecs

  private KitchenSpecsUpdated = new Subject<KitchenSpecs[]>()

 
  


  constructor( public http : HttpClient,public wqgformService : WqgformService ) { }

  
  getKitchenHandles(){

    return this.http.get<{message: string, kitchenhandles : KitchenHandle[]}>(this.hostUrl+"/api/kitchenhandles");
  }

  getHinges(){

    return this.http.get<{message: string, hinges : Hinge[]}>(this.hostUrl+"/api/hinges");
  }
  
  getDrawings(){

    return this.http.get<{message: string, drawings : Drawing[]}>(this.hostUrl+"/api/drawings");
  }

  getKitchenTypes(){

    return this.http.get<{message: string, kitchentypes : KitchenType[]}>(this.hostUrl+"/api/kitchentypes");
  }

  getKitchenHandlePositions(){

    return this.http.get<{message: string, kitchenhandlepositions : KitchenHandlePosition[]}>(this.hostUrl+"/api/kitchenhandlepositions");
  }

 
  getKitchenFormData(KitchenTypeName:string,KGlassSubCat : string,KGlassFinish : string,FrameFinish : string, Kmatte : string, KitchenSpecs : KitchenSpecs)
  {
    this.kitchenType  = KitchenTypeName;
    this.GlassSubcat = KGlassSubCat;
    this.GlassFinish = KGlassFinish;
    this.FrameFinish = FrameFinish;
    this.Matte  = Kmatte; 
    this.KitchenSpec = KitchenSpecs;

  }

  getKitchenSpecsUpdateListener(){

    return this.KitchenSpecsUpdated.asObservable();
 
   }


  addAndUpdateKitchenSpecs( editmode : boolean,
    editindex : any,
    serial : any,
    width : any,
    height :any,
    quantity : any,
    drawing : Drawing,
    sqft : any,
    KitchenCost : any)
  {

     let sno = (this.KitchenSpecs.length+1).toString();
     let rate = Math.ceil(KitchenCost/quantity)

     

     var kitchenspec : KitchenSpecs = {
      SpecNo : sno,
      Sno :  sno,
      Width : width,
      Height : height,
      Quantity : quantity,
      Drawing : drawing,
      SquareFeet : sqft,
      Rate : rate.toString(),
      Cost : KitchenCost,
      CustomerCost : ""
     }


   if(editmode===false)
   {
     this.KitchenSpecs.push(kitchenspec)
     this.KitchenSpecsUpdated.next([...this.KitchenSpecs]);
   }

   if(editmode===true)
   {
    
    const updateKitchenSpecs = [...this.KitchenSpecs];
    updateKitchenSpecs[editindex] = kitchenspec;
    this.KitchenSpecs = updateKitchenSpecs;
    this.KitchenSpecsUpdated.next([...this.KitchenSpecs]);

   }

  

  }


  deleteKitchenSpec(index : any){
    const updatedkitchen = this.KitchenSpecs
  
    updatedkitchen.splice(index,1)  
  
 
    for(var i =0; i<updatedkitchen.length;i++)
    {
       updatedkitchen[i].Sno = (i+1).toString();
       updatedkitchen[i].SpecNo = (i+1).toString();
  
    }
    
 
     this.KitchenSpecs = updatedkitchen;
     this.KitchenSpecsUpdated.next([...this.KitchenSpecs]);


  }
}
