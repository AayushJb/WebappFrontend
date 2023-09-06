import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';
import { Drawing } from '../shared/drawing.model';
import { Hinge } from '../shared/hinge.model';
import { KitchenHandle } from '../shared/kitchenhandle.model';
import { KitchenHandlePosition } from '../shared/kitchenhandleposition.model';

@Injectable({
  providedIn: 'root'
})
export class DrawingsService {

  private drawings : Drawing[] = [];
  private drawingsUpdated = new Subject<Drawing[]>()
  kitchenhandles : KitchenHandle[] = [];
  kitchenhandlepositions : KitchenHandlePosition[] = [];
  hinges : Hinge[] = [];



  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear

  hostUrl = environment.hostURL;

  constructor(private http : HttpClient, private router : Router) { }

  getDrawings(){

    this.http.get<{message: string,drawings : Drawing[]}>(this.hostUrl+"/api/drawings")
    .subscribe((drawingsData)=>{
      this.drawings = drawingsData.drawings;
      this.drawingsUpdated.next([...this.drawings]);
    });
  }

  getKitchenHandles(){

    return this.http.get<{message: string, kitchenhandles : KitchenHandle[]}>(this.hostUrl+"/api/kitchenhandles");
  }

  getKitchenHandlePositions(){
    
    return this.http.get<{message: string, kitchenhandlepositions : KitchenHandlePosition[]}>(this.hostUrl+"/api/kitchenhandlepositions");
  }

  getHinges(){

    return this.http.get<{message: string, hinges : Hinge[]}>(this.hostUrl+"/api/hinges");
  }


  getDrawingssUpdateListener(){

    return this.drawingsUpdated.asObservable();
 
   }
 
 
 
 
   addDrawings(DrawingName:string,HandleType:string,HandlePosition:string,HingePosition: string,image : File,Price:string,AdditionalPrice: string){
 
 
 
     const drawingData = new FormData();
     drawingData.append("DrawingName", DrawingName);
     drawingData.append("HandleType", HandleType);
     drawingData.append("HandlePosition", HandlePosition);
     drawingData.append("HingePosition", HingePosition);
     drawingData.append("image", image, DrawingName.toUpperCase());
     drawingData.append("Price", Price);
     drawingData.append("AdditionalPrice", AdditionalPrice);
     drawingData.append("DateCreated",this.DateFormat);
 
     this.http.post<{message: string, drawings: Drawing}>(this.hostUrl+"/api/drawings",drawingData)
     .subscribe((responseData)=>{
 
 
 
       const drawing : Drawing = {
         _id : responseData.drawings._id,
         DrawingName: DrawingName.toUpperCase(),
         HandleType : HandleType,
         HandlePosition : HandlePosition,
         HingePosition : HingePosition,
         imagePath:responseData.drawings.imagePath,
         Price : Price,
         AdditionalPrice : AdditionalPrice,
         DateCreated:this.DateFormat
       }
 
       this.drawings.push(drawing);
       this.drawingsUpdated.next([...this.drawings]);
 
     });
 
 
   }
 
 
   deleteDrawings(drawingId: string){
     this.http.delete(this.hostUrl+"/api/drawings/"+drawingId)
     .subscribe(()=>{
      const updatedDrawing = this.drawings.filter(drawing => drawing._id !== drawingId);
      this.drawings = updatedDrawing;
      this.drawingsUpdated.next([...this.drawings]);
 
     });
 
 
   }
 //===================================For Edit============================================
  getDrawing(_id : string){
 
   return this.http.get<{_id:string,DrawingName:string,HandleType:string,HandlePosition:string,HingePosition: string,imagePath: string,Price:string, AdditionalPrice : string, DateCreated:string}>(this.hostUrl+"/api/drawings/"+ _id)
   
 }
 
 //======update Color=============
 
 updateDrawing(_id :string,DrawingName:string,HandleType:string,HandlePosition:string,HingePosition: string,image : File|string,Price:string, AdditionalPrice : string){
 let drawingData : Drawing | FormData;
   if(typeof(image)==='object'){
 
    const drawingData = new FormData();
     drawingData.append("DrawingName", DrawingName);
     drawingData.append("HandleType", HandleType);
     drawingData.append("HandlePosition", HandlePosition);
     drawingData.append("HingePosition", HingePosition);
     drawingData.append("image", image, DrawingName.toUpperCase());
     drawingData.append("Price", Price);
     drawingData.append("AdditionalPrice", AdditionalPrice);
     drawingData.append("DateCreated",this.DateFormat);
 
   }else
   {
     drawingData = {
     _id : _id,
     DrawingName: DrawingName.toUpperCase(),
     HandleType : HandleType,
     HandlePosition : HandlePosition,
     HingePosition : HingePosition,
     imagePath : image,
     Price : Price,
     AdditionalPrice : AdditionalPrice,
     DateCreated:this.DateFormat
   }
 
   }
 
 
 this.http.put(this.hostUrl+"/api/drawings/"+ _id ,drawingData).subscribe(response => {
 
 
 
 
    const updateDrawings = [...this.drawings];
    const oldDrawingIndex = updateDrawings.findIndex(p => p._id===_id);
 
    const drawing : Drawing = {
     _id : _id,
     DrawingName: DrawingName.toUpperCase(),
     HandleType : HandleType,
     HandlePosition : HandlePosition,
     HingePosition : HingePosition,
     imagePath : '',
     Price : Price,
     AdditionalPrice : AdditionalPrice,
     DateCreated:this.DateFormat
    }
 
    updateDrawings[oldDrawingIndex] = drawing;
    this.drawings = updateDrawings;
    this.drawingsUpdated.next([...this.drawings]);
    this.router.navigate(["/settings/drawings"]);
 
 
 
 })
 }
  

}
