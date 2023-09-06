import { Injectable } from '@angular/core';
import { Order } from '../shared/order.model';
import { HttpClient } from '@angular/common/http';
import { SpecialRequest } from '../shared/specialrequest.model';
import {environment} from '../../environments/environment';
import { Subject } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class SpecialrequestsService {

  order : Order
  currentDateTime : any
  hostUrl = environment.hostURL;
  specialrequests : SpecialRequest[] = [];
  hostURL = environment.hostURL;

  updatedSpecialRequest = new Subject<SpecialRequest[]>();

  constructor(private http : HttpClient) { }

  setOrderDetails(row : Order)
  {
   this.order = row
  }

  
  SaveRequestsData(RequestType : string,ClientDiscount : string,DealerDiscount : string,Source : string,ProjectName : string,ArchitectName: string,Remark : string,Order : Order)
  {
     
    const currentDate = this.currentDateTime
    const ISTDateString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });



    let now = new Date(ISTDateString);
    let nowDate = now.getDate();
    let nowMonth = now.getMonth()+1;
    let nowYear = now.getFullYear();
   
    var  RequestDate = nowDate + "-" + nowMonth + "-" + nowYear;

    const Request: SpecialRequest = {
      _id : null,
      OrderNo : Order.OrderNo,
      ProjectName : Order.ProjectName,
      RequestDate : RequestDate,
      ResolveDate : "",
      RequestType : RequestType,
      NewClientDiscount : ClientDiscount,
      NewDealerDiscount : DealerDiscount,
      NewSource : Source,
      NewProjectName: ProjectName,
      NewArchitectName : ArchitectName,
      Remarks : Remark,
      Associate : Order.Associate,
      Status : "Open"
  
    }



   return  this.http.post<any>(this.hostUrl+"/api/specialrequests", Request)
 

  }



  GetRequests(UserFullName:string)
  {
    this.http.get< {message: string, specialrequests : SpecialRequest[]}>(this.hostUrl+"/api/specialrequests?user="+UserFullName).subscribe((reqData)=>{
      this.specialrequests = reqData.specialrequests
     
      this.updatedSpecialRequest.next(this.specialrequests)
    })
  }



  
  getRequestsUpdateListener(){

    return this.updatedSpecialRequest.asObservable()
  
   }


  
 

  
getCurrentDateTime() {
  this.http.get('http://worldtimeapi.org/api/timezone/UTC').subscribe((response : any)=>{
    this.currentDateTime = new Date(response.datetime);
  })
   
}
 

deleteRequest(requestId : string)
{
  return this.http.delete(this.hostURL+"/api/specialrequests/"+requestId)
}

rejectRequest(req : SpecialRequest)
{
  let reqID  = req._id

  this.getCurrentDateTime()

  const currentDate = this.currentDateTime
  const ISTDateString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });



  let now = new Date(ISTDateString);
  let nowDate = now.getDate();
  let nowMonth = now.getMonth()+1;
  let nowYear = now.getFullYear();
 
  var  RequestDate = nowDate + "-" + nowMonth + "-" + nowYear;

  let Details = { 
      Request : req,
      RejectDate : RequestDate
  }



  return this.http.put(this.hostURL+"/api/specialrequests/reject/"+reqID,Details)
}


approveOrder(Req : SpecialRequest)
{
  let reqID  = Req._id

  

  this.getCurrentDateTime()

  const currentDate = this.currentDateTime
  const ISTDateString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });



  let now = new Date(ISTDateString);
  let nowDate = now.getDate();
  let nowMonth = now.getMonth()+1;
  let nowYear = now.getFullYear();
 
  var  RequestDate = nowDate + "-" + nowMonth + "-" + nowYear;

  let Details = { 
      Request : Req,
      ApproveDate : RequestDate,
  }





    this.http.post(this.hostURL+"/api/specialrequests/edit/" +reqID,Details).subscribe((response)=>{
      console.log(response)
    })
}
 


}
