import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';
import { KitchenHandle } from '../shared/kitchenhandle.model';
import { KitchenHandlePosition } from '../shared/kitchenhandleposition.model';

@Injectable({
  providedIn: 'root'
})
export class KitchenhandleService {

  private kitchenhandles : KitchenHandle[] = [];
  private kitchenhandlesUpdated = new Subject<KitchenHandle[]>()

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  hostUrl = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }

  getKitchenHandlePositions(){

    return this.http.get<{message: string, kitchenhandlepositions : KitchenHandlePosition[]}>(this.hostUrl+"/api/kitchenhandlepositions");
  }

    getKitchenHandles(){

    this.http.get<{message: string,kitchenhandles : KitchenHandle[]}>(this.hostUrl+"/api/kitchenhandles")
    .subscribe((handleData)=>{
      this.kitchenhandles = handleData.kitchenhandles;
      this.kitchenhandlesUpdated.next([...this.kitchenhandles]);
    });
  }

  getKitchenhandlesUpdateListener(){

   return this.kitchenhandlesUpdated.asObservable();

  }




  addkitchenhandles(HandleName:string, HandlePositions : string[],image : File){



    const kitchenhandlesData = new FormData();
    kitchenhandlesData.append("HandleName", HandleName);
    HandlePositions.forEach((item) =>kitchenhandlesData.append("HandlePositions[]", item));
    kitchenhandlesData.append("image", image, HandleName.toUpperCase());
    kitchenhandlesData.append("DateCreated",this.DateFormat);

    this.http.post<{message: string, kitchenhandles: KitchenHandle}>(this.hostUrl+"/api/kitchenhandles",kitchenhandlesData)
    .subscribe((responseData)=>{

      const kitchenhandle : KitchenHandle = {
        _id : responseData.kitchenhandles._id,
        HandleName:HandleName.toUpperCase(),
        HandlePositions : HandlePositions,
        imagePath:responseData.kitchenhandles.imagePath,
        DateCreated:this.DateFormat
      }

      this.kitchenhandles.push(kitchenhandle);
      this.kitchenhandlesUpdated.next([...this.kitchenhandles]);

    });


  }


  deleteKitchenHandle(kitchenhandleId: string){
    this.http.delete(this.hostUrl+"/api/kitchenhandles/"+kitchenhandleId)
    .subscribe(()=>{
     const updatedKitchenHandle = this.kitchenhandles.filter(position => position._id !== kitchenhandleId);
     this.kitchenhandles = updatedKitchenHandle;
     this.kitchenhandlesUpdated.next([...this.kitchenhandles]);

    });


  }
//===================================For Edit============================================
 getKitchenHandle(_id : string){

  return this.http.get<{_id:string,HandleName: string,HandlePositions : string[],imagePath: string,DateCreated:string}>(this.hostUrl+"/api/kitchenhandles/"+ _id)
  
}

//======update Color=============

updateKitchenHandle(_id :string, HandleName : string, HandlePositions: string[] ,image : File|string){
let kitchenData : KitchenHandle | FormData | any;
  if(typeof(image)==='object'){

    kitchenData  = new FormData();
    kitchenData.append("_id",_id);
    kitchenData.append("HandleName",HandleName.toUpperCase());
    HandlePositions.forEach((item) =>kitchenData.append("HandlePositions[]", item));
    kitchenData.append("image",image,HandleName);
    kitchenData.append("DateCreated",this.DateFormat)

  }else
  {
    kitchenData = {
    _id : _id,
    HandleName: HandleName.toUpperCase(),
    HandlePositions : HandlePositions,
    imagePath : image,
    DateCreated : this.DateFormat
  }

  }


this.http.put(this.hostUrl+"/api/kitchenhandles/"+ _id ,kitchenData).subscribe(response => {




   const updateHandles = [...this.kitchenhandles];
   const oldHandleIndex = updateHandles.findIndex(p => p._id===_id);
   const kitchenhandle : KitchenHandle = {
    _id : _id,
    HandleName : HandleName.toUpperCase(),
    HandlePositions : HandlePositions,
    imagePath : '',
    DateCreated : this.DateFormat
   }

   updateHandles[oldHandleIndex] = kitchenhandle;
   this.kitchenhandles = updateHandles;
   this.kitchenhandlesUpdated.next([...this.kitchenhandles]);
   this.router.navigate(["/settings/kitchenhandles"]);



})
}




}
