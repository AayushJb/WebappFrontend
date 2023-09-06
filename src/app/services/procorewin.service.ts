import { Injectable } from '@angular/core';
import { CommercialWin } from '../shared/commericalwin.model';
import { Order } from '../shared/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProcorewinService {


  error : boolean = false;
  success : boolean = false;
  response : any;
  failedOrder : Order
  CommercialWin : CommercialWin
  WinRequirements : any

  constructor() { }

  getResponsewinData(responseData:any,FailedOrder : Order,WinRequirements : any)
  {
    if(responseData!=="Error Occured")
    {
      this.success = true;
      this.response = responseData;
      this.WinRequirements = WinRequirements;


    }

   

  }
}
