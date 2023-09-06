import { WardrobeSpecs } from "./wardrobespecs.model";

export interface WardrobeSol {
    _id : string;
     SolutionType : string;
     WardrobeId : string;
     WardrobeName : string;
     WardrobeType : string;
     FrameFinish : string;
     GlassCategory : string;
     GlassSubCategory : string;
     GlassFinish : string;
     Matte :string;
     WardrobeSpecs : WardrobeSpecs[];
     Amount : string;
     SquareFeet : string;
     TotalPieces : string;
     Remarks : string;
     
    }