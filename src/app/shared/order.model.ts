import { Solution } from "./solution.model";

export interface Order {
  _id : string;
  OrderNo : string;
  ProjectName : string;
  ClientName : string;
  Location : string;
  Architect : string;
  Source :string;
  Solutions: Solution[];
  Discount : string;
  Advance : string;
  FinalAmount : string;
  GrandTotal : string;
  Status :string;
  Active : string;
  Completed : string;
  CreationDate : string;
  EditDate : string;
  WinDate : string;
  Associate : string;
  ProjectManager : string;
  ProjectID :string;
  OfficeID : string;
  TotalSquareFeet : string;
  CSValue : string;
  CompletionDate : string;
  DateCreated : string;
  CommercialWinDate : string;
  HandOverDate : string;
  LedgerDetails : string;
  ProPlan : string;
  ProValue : string;
  }
