import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Handle } from '../shared/handle.model';
import { Handlevariant } from '../shared/handlevariant.model';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HandleService {

  private handles : Handle[] = [];
  private handlesUpdated = new Subject<Handle[]>()
  private handlevariants : Handlevariant[] = [];

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  hostUrl = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }


  getHandlevariants(){

    return this.http.get<{message: string,handlevariants : Handlevariant[]}>(this.hostUrl+"/api/handlevariants");
  }

  getHandles(){

    this.http.get<{message: string,handles : Handle[]}>(this.hostUrl+"/api/handles")
    .subscribe((handlesData)=>{
      this.handles = handlesData.handles;
      this.handlesUpdated.next([...this.handles]);
    });
  }

  getHandlesUpdateListener(){

   return this.handlesUpdated.asObservable();

  }




  addHandles(Handle:string, Price:string, Color:string, HandleVariant:string[], image : File){

    const handleData = new FormData();
    handleData.append("Handle", Handle.toUpperCase());
    handleData.append("Price", Price);
    handleData.append("Color", Color);
    if(HandleVariant){
    HandleVariant.forEach((item) => handleData.append("HandleVariant[]", item));
    }
    handleData.append("image", image, Handle.toUpperCase());
    handleData.append("DateCreated",this.DateFormat);

    this.http.post<{message: string, handle: Handle}>(this.hostUrl+"/api/handles",handleData)
    .subscribe((responseData)=>{





      const handle : Handle = {
        _id:responseData.handle._id,
        Handle: Handle.toUpperCase(),
        Price : Price,
        Color : Color,
        HandleVariant : HandleVariant,
        imagePath:responseData.handle.imagePath,
        DateCreated:this.DateFormat
      }

      this.handles.push(handle);
      this.handlesUpdated.next([...this.handles]);





    });


  }


  deleteHandle(handleId: string){
    this.http.delete(this.hostUrl+"/api/handles/"+ handleId)
    .subscribe(()=>{
     const updatedHandle = this.handles.filter(handle => handle._id !== handleId);
     this.handles = updatedHandle;
     this.handlesUpdated.next([...this.handles]);

    });


  }
//===================================For Edit============================================
 getHandle(_id : string){

return this.http.get<Handle>(this.hostUrl+"/api/handles/"+ _id)//=====check

}

//======update Color=============

updateHandle(_id :string,Handle:string,Price:string,Color:string,HandleVariant:string[],image : File|string){
let handleData : Handle | FormData | any;
  if(typeof(image)==='object'){

    handleData  = new FormData();
    handleData.append("_id",_id);
    handleData.append("Handle", Handle.toUpperCase());
    handleData.append("Price", Price);
    handleData.append("Color", Color);
    if(HandleVariant){
    HandleVariant.forEach((item) => handleData.append("HandleVariant[]", item));
    }
    handleData.append("image", image, Handle.toUpperCase());
    handleData.append("DateCreated",this.DateFormat)


  }else
  {
    handleData = {
        _id : _id,
        Handle : Handle.toUpperCase(),
        Price : Price,
        Color : Color,
        imagePath : image,
        HandleVariant : HandleVariant,
        DateCreated : this.DateFormat
  }

  }


this.http.put(this.hostUrl+"/api/handles/"+ _id ,handleData).subscribe(response => {





   const updateHandles = [...this.handles];
   const oldHandleIndex = updateHandles.findIndex(p => p._id===_id);

   const handle : Handle = {
        _id : _id,
        Handle:Handle.toUpperCase(),
        Price : Price,
        Color : Color,
        HandleVariant : HandleVariant,
        imagePath : '',
        DateCreated : this.DateFormat
   }

   updateHandles[oldHandleIndex] = handle;
   this.handles = updateHandles;
   this.handlesUpdated.next([...this.handles]);
   this.router.navigate(["/settings/handles"]);



})
}


}
