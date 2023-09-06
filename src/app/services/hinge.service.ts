import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';
import { Hinge } from '../shared/hinge.model';

@Injectable({
  providedIn: 'root'
})
export class HingeService {

  private hinges : Hinge[] = [];
  private hingesUpdated = new Subject<Hinge[]>()

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  hostUrl = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }

  getHinges(){

    this.http.get<{message: string,hinges : Hinge[]}>(this.hostUrl+"/api/hinges")
    .subscribe((hingesData)=>{
      this.hinges = hingesData.hinges;
      this.hingesUpdated.next([...this.hinges]);
    });
  }

  getHingesUpdateListener(){

   return this.hingesUpdated.asObservable();

  }




  addhinges(HingeName:string,image : File){



    const hingeData = new FormData();
    hingeData.append("HingeName", HingeName);
    hingeData.append("image", image, HingeName.toUpperCase());
    hingeData.append("DateCreated",this.DateFormat);

    this.http.post<{message: string, hinge: Hinge}>(this.hostUrl+"/api/hinges",hingeData)
    .subscribe((responseData)=>{



      const hinge : Hinge = {
        _id : responseData.hinge._id,
        HingeName:HingeName.toUpperCase(),
        imagePath:responseData.hinge.imagePath,
        DateCreated:this.DateFormat
      }

      this.hinges.push(hinge);
      this.hingesUpdated.next([...this.hinges]);

    });


  }


  deleteHinges(hingeId: string){
    this.http.delete(this.hostUrl+"/api/hinges/"+hingeId)
    .subscribe(()=>{
     const updatedHinge = this.hinges.filter(hinge => hinge._id !== hingeId);
     this.hinges = updatedHinge;
     this.hingesUpdated.next([...this.hinges]);

    });


  }
//===================================For Edit============================================
 getHinge(_id : string){

  return this.http.get<{_id:string,HingeName: string,imagePath: string,DateCreated:string}>(this.hostUrl+"/api/hinges/"+ _id)
  
}

//======update Color=============

updateHinge(_id :string, HingeName : string, image : File|string){
let hingeData : Hinge | FormData;
  if(typeof(image)==='object'){

    hingeData  = new FormData();
    hingeData.append("_id",_id);
    hingeData.append("HingeName",HingeName.toUpperCase());
    hingeData.append("image",image,HingeName);
    hingeData.append("DateCreated",this.DateFormat)

  }else
  {
    hingeData = {
    _id : _id,
    HingeName : HingeName.toUpperCase(),
    imagePath : image,
    DateCreated : this.DateFormat
  }

  }


this.http.put(this.hostUrl+"/api/hinges/"+ _id ,hingeData).subscribe(response => {




   const updateHinges = [...this.hinges];
   const oldHingeIndex = updateHinges.findIndex(p => p._id===_id);

   const hinge : Hinge = {
    _id : _id,
    HingeName : HingeName.toUpperCase(),
    imagePath : '',
    DateCreated : this.DateFormat
   }

   updateHinges[oldHingeIndex] = hinge;
   this.hinges = updateHinges;
   this.hingesUpdated.next([...this.hinges]);
   this.router.navigate(["/settings/hinges"]);



})
}
}
