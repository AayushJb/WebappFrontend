import { Injectable } from '@angular/core';
import { Design } from '../shared/design.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  private designs : Design[] = [];
  private designsUpdated = new Subject<Design[]>()

  hostUrl = environment.hostURL;

  constructor( private http : HttpClient, private router : Router) { }

  getDesigns(){

    this.http.get<{message: string,designs : Design[]}>(this.hostUrl+"/api/designs")
    .subscribe((designsData)=>{
      this.designs = designsData.designs;
      this.designsUpdated.next([...this.designs]);
    });
  }

  getDesignUpdateListener(){

   return this.designsUpdated.asObservable()

  }




  addDesigns(Design:string){


    const design : Design = {_id:null,
      Design : Design.toUpperCase(), 
      DateCreated:this.DateFormat
    }


    this.http.post<{message: string, designId: string}>(this.hostUrl+"/api/designs",design)
    .subscribe((responseData)=>{
      const Id = responseData.designId;
      design._id = Id;




      this.designs.push(design);
      this.designsUpdated.next([...this.designs]);





    });


  }


  deleteDesign(designId: string){
    this.http.delete(this.hostUrl+"/api/designs/"+designId)
    .subscribe(()=>{
     const updatedDesign = this.designs.filter(design => design._id !== designId);
     this.designs = updatedDesign;
     this.designsUpdated.next([...this.designs]);

    });


  }
//===================================For Edit============================================
 getDesign(_id : string){

return this.http.get<{_id:string,Design:string,DateCreated:string}>(this.hostUrl+"/api/designs/"+ _id)

}

//======update Design=============

updateDesign(_id :string, Design : string){

const design : Design  = {
_id : _id,
Design : Design.toUpperCase(),
DateCreated : this.DateFormat

}

this.http.put(this.hostUrl+"/api/designs/"+ _id ,design).subscribe(response => {


   const updateDesigns = [...this.designs];
   const oldDesignIndex = updateDesigns.findIndex(p => p._id===design._id);
   updateDesigns[oldDesignIndex] = design;
   this.designs = updateDesigns;
   this.designsUpdated.next([...this.designs]);
   this.router.navigate(["/settings/designs"]);

  

})
}

}
