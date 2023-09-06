import { Order } from "./order.model";

export interface ProcoreResponse {
    AccessToken : string,
    Floor : string,
    Order : Order,
    ProjectID : string,
    PunchID : string,
    SolutionNo : string,
    Space : string,
    Type : string   
    }