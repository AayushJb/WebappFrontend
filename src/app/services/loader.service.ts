import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  Error : boolean 
  Spinner : boolean 
  public statusUpdated= new Subject<boolean[]>()
  public spinnerUpdated= new Subject<boolean>()


  constructor() { }
 
  setValuesLoader(Error : boolean,Spinner:boolean)
  {
   this.Error = Error;
   this.Spinner = Spinner;

   let Status = [this.Spinner,this.Error]

   this.statusUpdated.next(Status)

  }
 
  getStatusUpdateListener(){

    return this.statusUpdated.asObservable()
   }

}
