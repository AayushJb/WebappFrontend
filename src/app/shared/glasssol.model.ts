import { GlassSpecs } from "./glassspec.model";

export interface GlassSol {
    _id : string;
     SolutionType : string;
     GlassId : string;
     GlassName : string;
     GlassCategory : string;
     GlassSubCategory : string;
     GlassFinish : string;
     Matte :string;
     GlassThickness : string;
     GlassSpecs : GlassSpecs[];
     Amount : string;
     SquareFeet : string;
     TotalPieces : string;
     Tempered : string; 
     Remarks : string;
    }