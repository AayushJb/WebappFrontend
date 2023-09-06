import { ShelfSpecs } from "./shelfspecs.model";

export interface ShelfSol {
    _id : string;
     SolutionType : string;
     ShelfId : string;
     ShelfName : string;
     ShelfType : string;
     FrameFinish : string;
     GlassCategory : string;
     GlassSubCategory : string;
     GlassFinish : string;
     Matte :string;
     ShelfSpecs : ShelfSpecs[];
     Amount : string;
     SquareFeet : string;
     TotalPieces : string;
     Remarks : string;
     
    }