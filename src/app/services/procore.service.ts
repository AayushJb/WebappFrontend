import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { LedgerDetail } from '../shared/ledgerdetail.model';
import { Order } from '../shared/order.model';
import { PunchItem } from '../shared/punchitem.model';
import { Solution } from '../shared/solution.model';


@Injectable({
  providedIn: 'root'
})
export class ProcoreService {

public code : string;

constructor(private http : HttpClient) { }


hostUrl = environment.hostURL;
currentDateTime : any;


UpdateProcoreProject(WinOrder : Order)
{
  return this.http.post<{ProjectID : string , Order : Order}>(this.hostUrl+"/api/updatewinproject",WinOrder)
}



getProcoreCompanyVendors()
{
  return this.http.get(this.hostUrl+"/api/procorecompanyvendors")
}



getAllProcoreUsers()
{
  return this.http.get(this.hostUrl+"/api/allprocoreusers")
}




//==============Not able to figure out what this is for, removing shows error===========================

UpdateWinProcoreProject(order : Order)
{
  return this.http.post<any>(this.hostUrl+"/api/updatewinproject",order)
}

//=======================================================================================================

UpdateProcoreSource(order : Order)
{
  return this.http.post<any>(this.hostUrl+"/api/updateprocoresource",order)
  
}


SaveCustomerFeedBackForm(Quality : string,Schedule : string,Installation: string,Professionalism: string,Overall:string,image : File,OrderNumber :string,ProjectName : string,ProjectID : string)
{


  this.getCurrentDateTime()

  const currentDate = this.currentDateTime
  const ISTDateString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });



  let now = new Date(ISTDateString);
  let nowDate = now.getDate();
  let nowMonth = now.getMonth()+1;
  let nowYear = now.getFullYear();
 
  var  DateFormat = nowDate + "-" + nowMonth + "-" + nowYear;


  const feedBackData = new FormData();
  feedBackData.append("Quality", Quality);
  feedBackData.append("Schedule", Schedule);
  feedBackData.append("Installation", Installation);
  feedBackData.append("Professionalism", Professionalism);
  feedBackData.append("Overall", Overall);
  feedBackData.append("image", image, ProjectName.toUpperCase());
  feedBackData.append("ProcoreHandOverDate",DateFormat);
  feedBackData.append("ProjectID",ProjectID);


  this.http.post<any>(this.hostUrl+"/api/savecustomerfeedback",feedBackData)
  .subscribe((responseData)=>{


   if(responseData.id)
   {
    alert("Customer Feedback Form is Submitted")
   }

  });



}


  
getCurrentDateTime() {
  this.http.get('http://worldtimeapi.org/api/timezone/UTC').subscribe((response : any)=>{
    this.currentDateTime = new Date(response.datetime);
  })
   
}
 





}
