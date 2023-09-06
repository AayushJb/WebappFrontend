import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';
import { Hinge } from '../shared/hinge.model';

import { KitchenHandlePosition } from '../shared/kitchenhandleposition.model';

@Injectable({
  providedIn: 'root'
})
export class KitchenhandlepositionService {

  private kitchenhandlepositions : KitchenHandlePosition[] = [];
  private kitchenhandlepositionsUpdated = new Subject<KitchenHandlePosition[]>()

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  hostUrl = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }


  getaHinges(){

    return this.http.get<{message: string, hinges : Hinge[]}>(this.hostUrl+"/api/hinges");
  }

  getKitchenHandlePositions(){

    this.http.get<{message: string,kitchenhandlepositions : KitchenHandlePosition[]}>(this.hostUrl+"/api/kitchenhandlepositions")
    .subscribe((handleData)=>{
      this.kitchenhandlepositions = handleData.kitchenhandlepositions;
      this.kitchenhandlepositionsUpdated.next([...this.kitchenhandlepositions]);
    });
  }

  getKitchenhandlepositionsUpdateListener(){

   return this.kitchenhandlepositionsUpdated.asObservable();

  }




  addkitchenhandlepositions(KitchenHandlePosition:string,Hinge : string[],image : File){



    const kitchenhandlepositionsData = new FormData();
    kitchenhandlepositionsData.append("KitchenHandlePosition", KitchenHandlePosition);
    Hinge.forEach((item) =>kitchenhandlepositionsData.append("Hinge[]", item));
    kitchenhandlepositionsData.append("image", image, KitchenHandlePosition.toUpperCase());
    kitchenhandlepositionsData.append("DateCreated",this.DateFormat);

    this.http.post<{message: string, kitchenhandleposition: KitchenHandlePosition}>(this.hostUrl+"/api/kitchenhandlepositions",kitchenhandlepositionsData)
    .subscribe((responseData)=>{

      const kitchenhandleposition : KitchenHandlePosition = {
        _id : responseData.kitchenhandleposition._id,
        KitchenHandlePosition:KitchenHandlePosition.toUpperCase(),
        Hinge : Hinge,
        imagePath:responseData.kitchenhandleposition.imagePath,
        DateCreated:this.DateFormat
      }

      this.kitchenhandlepositions.push(kitchenhandleposition);
      this.kitchenhandlepositionsUpdated.next([...this.kitchenhandlepositions]);

    });


  }


  deleteKitchenHandlePosition(kitchenhandlepositionId: string){
    this.http.delete(this.hostUrl+"/api/kitchenhandlepositions/"+kitchenhandlepositionId)
    .subscribe(()=>{
     const updatedKitchenHandlePosition = this.kitchenhandlepositions.filter(position => position._id !== kitchenhandlepositionId);
     this.kitchenhandlepositions = updatedKitchenHandlePosition;
     this.kitchenhandlepositionsUpdated.next([...this.kitchenhandlepositions]);

    });


  }
//===================================For Edit============================================
 getKitchenHandlePosition(_id : string){

  return this.http.get<{_id:string,KitchenHandlePosition: string,Hinge : string[],imagePath: string,DateCreated:string}>(this.hostUrl+"/api/kitchenhandlepositions/"+ _id)
  
}

//======update Color=============

updateKitchenHandlePosition(_id :string, KitchenHandlePosition : string, Hinge : string[] ,image : File|string){
let kitchenData : KitchenHandlePosition | FormData | any;
  if(typeof(image)==='object'){

    kitchenData  = new FormData();
    kitchenData.append("_id",_id);
    kitchenData.append("KitchenHandlePosition",KitchenHandlePosition.toUpperCase());
    Hinge.forEach((item) =>kitchenData.append("Hinge[]", item));
    kitchenData.append("image",image,KitchenHandlePosition);
    kitchenData.append("DateCreated",this.DateFormat)

  }else
  {
    kitchenData = {
    _id : _id,
    KitchenHandlePosition : KitchenHandlePosition.toUpperCase(),
    Hinge : Hinge,
    imagePath : image,
    DateCreated : this.DateFormat
  }

  }


this.http.put(this.hostUrl+"/api/kitchenhandlepositions/"+ _id ,kitchenData).subscribe(response => {




   const updatePositions = [...this.kitchenhandlepositions];
   const oldPositionIndex = updatePositions.findIndex(p => p._id===_id);

   const kitchenhandleposition : KitchenHandlePosition = {
    _id : _id,
    KitchenHandlePosition : KitchenHandlePosition.toUpperCase(),
    Hinge : Hinge,
    imagePath : '',
    DateCreated : this.DateFormat
   }

   updatePositions[oldPositionIndex] = kitchenhandleposition;
   this.kitchenhandlepositions = updatePositions;
   this.kitchenhandlepositionsUpdated.next([...this.kitchenhandlepositions]);
   this.router.navigate(["/settings/kitchenhandlepositions"]);



})
}
}
