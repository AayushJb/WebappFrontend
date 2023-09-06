import { KitchenSpecs } from "./kitchenspecs.model";

export interface KitchenSol {
    _id : string;
     SolutionType : string;
     KitchenId : string;
     KitchenName : string;
     KitchenType : string;
     FrameFinish : string;
     GlassCategory : string;
     GlassSubCategory : string;
     GlassFinish : string;
     Matte :string;
     KitchenSpecs : KitchenSpecs[];
     Amount : string;
     SquareFeet : string;
     TotalPieces : string;
     Remarks : string;
     
    }