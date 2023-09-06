import { GlassSolution } from "./glasssolution.model";


export interface GlassOrder {
  _id : string;
  WaltzOrderNo :string;
  OrderNo : string;
  ProjectName : string;
  ClientName : string;
  Location : string;
  Architect : string;
  GST :string;
  Source :string;
  Solutions: GlassSolution[];
  Discount : string;
  Advance : string;
  FinalAmount : string;
  GrandTotal : string;
  TempCharge: string;
  Packing : string;
  Freight : string;
  OtherCharges : string; 
  Status :string;
  Active : string;
  Completed : string;
  CreationDate : string;
  EditDate : string;
  WinDate : string;
  Associate : string;
  ProjectManager : string;
  TotalSquareFeet : string;
  CSValue : string;
  CompletionDate : string;
  DateCreated : string;
  CommercialWinDate : string;
  HandOverDate : string;
  LedgerDetails : string;
  ProPlan : string;
  ProValue : string;
  Pieces : string;
  DiscountPercent : string;
  FreightPercent : string;
  PackingPercent : string;
  OtherChargesPercent : string;
  Insurance  : string;
  InsuranceCost  : string;

  }