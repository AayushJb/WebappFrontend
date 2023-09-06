import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Handlevariant } from '../shared/handlevariant.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HandlevariantService {

  private handlevariants : Handlevariant[] = [];
  private handlevariantsUpdated = new Subject<Handlevariant[]>()

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  hostUrl = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }

  getHandlevariants(){

    this.http.get<{message: string,handlevariants : Handlevariant[]}>(this.hostUrl+"/api/handlevariants")
    .subscribe((handlevariantsData)=>{
      this.handlevariants = handlevariantsData.handlevariants;
      this.handlevariantsUpdated.next([...this.handlevariants]);
    });
  }

  getHandlevariantsUpdateListener(){

   return this.handlevariantsUpdated.asObservable();

  }




  addhandlevariants(HandleVariant:string,Price :string,Color:string,image : File){



    const handlevariantData = new FormData();
    handlevariantData.append("HandleVariant", HandleVariant);
    handlevariantData.append("Price", Price);
    handlevariantData.append("Color", Color);
    handlevariantData.append("image", image, HandleVariant.toUpperCase());
    handlevariantData.append("DateCreated",this.DateFormat);

    this.http.post<{message: string, handlevariant: Handlevariant}>(this.hostUrl+"/api/handlevariants",handlevariantData)
    .subscribe((responseData)=>{



      const handlevariant : Handlevariant = {
        _id : responseData.handlevariant._id,
        HandleVariant:HandleVariant.toUpperCase(),
        Price : Price,
        Color : Color,
        imagePath:responseData.handlevariant.imagePath,
        DateCreated:this.DateFormat
      }

      this.handlevariants.push(handlevariant);
      this.handlevariantsUpdated.next([...this.handlevariants]);

      



    });


  }


  deleteHandlevariants(handlevariantId: string){
    this.http.delete(this.hostUrl+"/api/handlevariants/"+handlevariantId)
    .subscribe(()=>{
     const updatedHandleVariant = this.handlevariants.filter(handlevariant => handlevariant._id !== handlevariantId);
     this.handlevariants = updatedHandleVariant;
     this.handlevariantsUpdated.next([...this.handlevariants]);

    });


  }
//===================================For Edit============================================
 getHandlevariant(_id : string){

return this.http.get<{_id:string,HandleVariant : string, Price : string ,Color:string,imagePath: string,DateCreated:string}>(this.hostUrl+"/api/handlevariants/"+ _id)

}

//======update Color=============

updateHandlevariant(_id :string, HandleVariant : string,Price : string, Color :string ,image : File|string){
let handlevariantData : Handlevariant | FormData;
  if(typeof(image)==='object'){

    handlevariantData  = new FormData();
    handlevariantData.append("_id",_id);
    handlevariantData.append("HandleVariant",HandleVariant.toUpperCase());
    handlevariantData.append("Price",Price.toUpperCase());
    handlevariantData.append("Color",Color.toUpperCase());
    handlevariantData.append("image",image,HandleVariant);
    handlevariantData.append("DateCreated",this.DateFormat)

  }else
  {
    handlevariantData = {
    _id : _id,
    HandleVariant : HandleVariant.toUpperCase(),
    Price : Price,
    Color : Color,
    imagePath : image,
    DateCreated : this.DateFormat
  }

  }


this.http.put(this.hostUrl+"/api/handlevariants/"+ _id ,handlevariantData).subscribe(response => {




   const updateHandlevariants = [...this.handlevariants];
   const oldHandlevariantIndex = updateHandlevariants.findIndex(p => p._id===_id);

   const handlevariant : Handlevariant = {
    _id : _id,
    HandleVariant : HandleVariant.toUpperCase(),
    Price : Price,
    Color : Color,
    imagePath : '',
    DateCreated : this.DateFormat
   }

   updateHandlevariants[oldHandlevariantIndex] = handlevariant;
   this.handlevariants = updateHandlevariants;
   this.handlevariantsUpdated.next([...this.handlevariants]);
   this.router.navigate(["/settings/handlevariants"]);



})
}


}
