import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import {environment} from '../../environments/environment';
import { Grid } from '../shared/grid.model';
import { Design } from '../shared/design.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GridService {


  hostUrl = environment.hostURL;
  private designs : Design[] = [];
  private grids : Grid[] = [];
  private gridsUpdated = new Subject<Grid[]>()

  now  = new Date()
  nowDate = this.now.getDate();
  nowMonth = this.now.getMonth()+1;
  nowYear = this.now.getFullYear();
  DateFormat = this.nowDate + "/"+this.nowMonth + "/" +this.nowYear




  constructor(private http : HttpClient, private router : Router) { }



  getDesigns(){

    return this.http.get<{message: string,designs : Design[]}>(this.hostUrl+"/api/designs");
  }


  getGrids(){
    this.http.get<{message: string, grids : Grid[]}>(this.hostUrl+"/api/grids")
    .subscribe((gridsData)=>{
      this.grids = gridsData.grids;
      this.gridsUpdated.next([...this.grids]);
    });
  
  }
  
  getGridUpdateListener(){
  
    return this.gridsUpdated.asObservable()
  
   }


   //=======================================Adding Systems====================================================================


   addGrids(GridName:string,Design : string, Price : string , Status : string, GlassNumber : string,GLOnePercent : string,image : File|string){

    const gridData = new FormData();
    gridData.append("GridName", GridName);
    gridData.append("Design", Design);
    gridData.append("Price", Price);
    gridData.append("Status", Status);
    gridData.append("GlassNumber", GlassNumber)
    gridData.append("GLOnePercent", GLOnePercent)
    gridData.append("image", image, Design.toUpperCase());
    gridData.append("DateCreated",this.DateFormat);

    this.http.post<{message: string, grids: Grid}>(this.hostUrl+"/api/grids",gridData)
    .subscribe((responseData)=>{
     

     const grid : Grid = {
        _id: responseData.grids._id,
        GridName: GridName.toUpperCase(),
        Design : Design,
        Price : Price,
        Status : Status,
        GlassNumber : GlassNumber,
        GLOnePercent : GLOnePercent,
        imagePath:responseData.grids.imagePath,
        DateCreated:this.DateFormat
      }

      this.grids.push(grid);
      this.gridsUpdated.next([...this.grids]);

      



    });


  }
//==================================Deleting Systems======================

deleteGrid(gridId: string){
  this.http.delete(this.hostUrl+"/api/grids/"+gridId)
  .subscribe(()=>{
   const updatedGrid = this.grids.filter(grid => grid._id !== gridId);
   this.grids = updatedGrid;
   this.gridsUpdated.next([...this.grids]);

  });


}

//===================================Updating Systems=====================
getGrid(_id : string){

  return this.http.get<{_id:string,GridName:string,Design : string,Price : string,Status : string,GlassNumber : string,GLOnePercent : string,imagePath: string,DateCreated:string}>(this.hostUrl+"/api/grids/"+ _id)
  
  }
  

//======update Subsystem=============

updateGrid(_id :string, GridName : string,Design : string, Price : string,Status : string,GlassNumber : string,GLOnePercent : string,image : File|string){
  let gridData : Grid | FormData;
    if(typeof(image)==='object'){
  
      gridData  = new FormData();
      gridData.append("_id",_id);
      gridData.append("GridName",GridName.toUpperCase());
      gridData.append("Design",Design);
      gridData.append("Price",Price);
      gridData.append("Status",Status);
      gridData.append("GlassNumber",GlassNumber);
      gridData.append("GLOnePercent",GLOnePercent);
      gridData.append("Status",Status);
      gridData.append("image",image,GridName);
      gridData.append("DateCreated",this.DateFormat)
  
    }else
    {
      gridData = {
      _id : _id,
      GridName : GridName.toUpperCase(),
      Design : Design,
      Price : Price,
      Status : Status,
      GlassNumber : GlassNumber,
      GLOnePercent : GLOnePercent,
      imagePath : image,
      DateCreated : this.DateFormat
    }
  
    }
  
  
  this.http.put(this.hostUrl+"/api/grids/" +_id ,gridData).subscribe(response => {
  
     const updateGrids = [...this.grids];
     const oldGridIndex = updateGrids.findIndex(p => p._id===_id);
  
     const grid : Grid = {
      _id : _id,
      GridName : GridName,
      Design : Design,
      Price : Price,
      Status : Status,
      GlassNumber : GlassNumber,
      GLOnePercent : GLOnePercent,
      imagePath : '',
      DateCreated : this.DateFormat
     }
  
     updateGrids[oldGridIndex] = grid;
     this.grids = updateGrids;
     this.gridsUpdated.next([...this.grids]);
     this.router.navigate(["/settings/grids"]);


  
  })
  }
  

}
