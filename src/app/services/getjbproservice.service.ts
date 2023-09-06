import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetjbproserviceService {

  ExcelData :string[]

  constructor() { }

   setOrderDetails(ExcelData : string[])
   {
    this.ExcelData = ExcelData
   }
}
