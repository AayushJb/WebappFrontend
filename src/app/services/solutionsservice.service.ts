import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solution } from '../shared/solution.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionsserviceService {

   public id : string;
   public ProjectName : string;
   public mode : string;
   public Solutions : Solution[] = [];
   public index : number 

   
  constructor(private http : HttpClient) { }

 
  getOrderDetails(id:string,ProjectName:string, mode:string,index :number)
  {
    this.id = id;
    this.ProjectName = ProjectName;
    this.mode = mode;
    this.index = index;
   
  }


  addAndUpdateSolutions(
    EditSpace:number,
    Mode : string,
    Floor : string,
    Space : string,
    System : string,
    SubSystem : string,
    SystemType : string,
    Orientation : string,
    SubOrientation : string,
    Grid  : string,
    Width : string,
    Height : string,
    Quantity : string,
    Color : string,
    GlassCategory : string,
    GlassSubCategory : string,
    GlassFinish : string,
    GlassVariant : string,
    Matte : string,
    OuterGlassCategory : string,
    OuterGlassSubCategory : string,
    OuterGlassFinish : string,
    OuterGlassVariant : string,
    OuterMatte : string,
    Handle : string,
    HandleVariant : string,
    DoorCloser : string,
    DropSeal : string,
    Amount : string,
    Remarks : string
  
        )
  
        {
  
        
        let SolutionNo : string= "1";
  
        const solution : Solution = {
  
          SolutionNo : SolutionNo,
          Floor : Floor,
          Space : Space,
          System : System,
          SubSystem : SubSystem,
          SystemType : SystemType,
          Orientation : Orientation,
          SubOrientation : SubOrientation,
          Grid  : Grid,
          Width : Width,
          Height : Height,
          Quantity : Quantity,
          Color : Color,
          GlassCategory :  GlassCategory,
          GlassSubCategory : GlassSubCategory,
          GlassFinish : GlassFinish,
          GlassVariant : GlassVariant,
          Matte : Matte,
          OuterGlassCategory : OuterGlassCategory,
          OuterGlassSubCategory : OuterGlassSubCategory,
          OuterGlassFinish : OuterGlassFinish,
          OuterGlassVariant : OuterGlassVariant,
          OuterMatte : OuterMatte,
          Handle : Handle,
          HandleVariant : HandleVariant,
          DoorCloser : DoorCloser,
          DropSeal : DropSeal,
          Remarks :Remarks,
          SystemRemarks : Remarks,
          Amount : Amount,
          ProcoreLocationID : "",
          ProcorePunchItemID : "",
          ProcoreStatus : "",
          ProcoreBIC : "",
          ProcoreField : ""
  
        }
  
        if(Mode ==="Addnew"||Mode ==="SaveAndAddnew"){
        this.Solutions.push(solution)
         }
  
         if(Mode==="UpdateSpace")
         {
          this.Solutions[EditSpace]=solution
         }
  
      }
  

  
}
