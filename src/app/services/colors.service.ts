import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Color } from '../shared/color.model';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ColorsService {

  private colors : Color[] = [];
  private colorsUpdated = new Subject<Color[]>()
  hostURL = environment.hostURL;

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  constructor( private http : HttpClient, private router : Router) { }

  getColors(){

    this.http.get<{message: string,colors : Color[]}>(this.hostURL+"/api/colors")
    .subscribe((colorsData)=>{
      this.colors = colorsData.colors;
      this.colorsUpdated.next([...this.colors]);
    });
  }

  getColorUpdateListener(){

   return this.colorsUpdated.asObservable();

  }




  addColors(Color:string, image : File){

    const colorData = new FormData();
    colorData.append("Color", Color);
    colorData.append("image", image, Color.toUpperCase());
    colorData.append("DateCreated",this.DateFormat);

    this.http.post<{message: string, color: Color}>(this.hostURL+"/api/colors",colorData)
    .subscribe((responseData)=>{



      const color : Color = {
        _id:responseData.color._id,
        Color:Color.toUpperCase(),
        imagePath:responseData.color.imagePath,
        DateCreated:this.DateFormat
      }

      this.colors.push(color);
      this.colorsUpdated.next([...this.colors]);

      



    });


  }


  deleteColor(colorId: string){
    this.http.delete(this.hostURL+"/api/colors/"+colorId)
    .subscribe(()=>{
     const updatedColor = this.colors.filter(color => color._id !== colorId);
     this.colors = updatedColor;
     this.colorsUpdated.next([...this.colors]);

    });


  }
//===================================For Edit============================================
 getColor(_id : string){

return this.http.get<{_id:string,Color:string,imagePath: string,DateCreated:string}>(this.hostURL+"/api/colors/"+ _id)

}

//======update Color=============

updateColor(_id :string, Color : string, image : File|string){
let colorData : Color | FormData;
  if(typeof(image)==='object'){

    colorData  = new FormData();
    colorData.append("_id",_id);
    colorData.append("Color",Color.toUpperCase());
    colorData.append("image",image,Color);
    colorData.append("DateCreated",this.DateFormat)

  }else
  {
    colorData = {
    _id : _id,
    Color : Color.toUpperCase(),
    imagePath : image,
    DateCreated : this.DateFormat
  }

  }


this.http.put(this.hostURL+"/api/colors/"+ _id ,colorData).subscribe(response => {





   const updateColors = [...this.colors];
   const oldColorIndex = updateColors.findIndex(p => p._id===_id);

   const color : Color = {
    _id : _id,
    Color : Color,
    imagePath : '',
    DateCreated : this.DateFormat
   }

   updateColors[oldColorIndex] = color;
   this.colors = updateColors;
   this.colorsUpdated.next([...this.colors]);
   this.router.navigate(["/settings/colors"]);



})
}



}
