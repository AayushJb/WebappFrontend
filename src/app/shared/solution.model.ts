import { Locations } from "./Locations.model";
import { PunchItem } from "./punchitem.model";


export interface Solution {

  SolutionNo : string;
  Floor : string;
  Space : string;
  System : string;
  SubSystem : string;
  SystemType : string;
  Orientation : string;
  SubOrientation : string;
  Grid  : string;
  Width : string;
  Height : string;
  Quantity : string;
  Color : string;
  GlassCategory : string;
  GlassSubCategory : string;
  GlassFinish : string;
  GlassVariant : string;
  Matte : string;
  OuterGlassCategory : string;
  OuterGlassSubCategory : string;
  OuterGlassFinish : string;
  OuterGlassVariant : string;
  OuterMatte : string;
  Handle : string;
  HandleVariant : string;
  DoorCloser : string;
  DropSeal : string;
  Lock : string;
  Remarks : string;
  SystemRemarks : string;
  Amount : string;
  SquareFeet : string;
  ProcoreLocationID : string;
  ProcorePunchItemID : PunchItem[];
  ProcoreStatus : Array<object>;
  ProcoreBIC : string;
  ProcoreField :string;

  }
