import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';
import { CommercialWin } from '../shared/commericalwin.model';
import { Handover } from '../shared/handover.model';
import { LedgerDetail } from '../shared/ledgerdetail.model';
import { SpecialRequest } from '../shared/specialrequest.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  hostUrl = environment.hostURL;
 

  constructor(private http : HttpClient) { }


  getCommercialWin()
  {
    return this.http.get<{message: string, commercialwins : CommercialWin[]}>(this.hostUrl+"/api/commercialwins/")
  }

  getHandover()
  {
    return this.http.get<{message: string, handovers : Handover[]}>(this.hostUrl+"/api/handovers/")
  }


  getCSData(WinOrdersList : string[])
  {
    return this.http.post(this.hostUrl+"/api/getjbfulldata",WinOrdersList)
  }


  getCSProject(ProjectRefNo : string)
  {
     return this.http.get(this.hostUrl+"/api/getjb?prorefno="+ProjectRefNo)
  }


  getLedgerDetails()
  {
    return this.http.get<{message: string, ledgerdetails : LedgerDetail[]}>(this.hostUrl+"/api/ledgerdetails")
  }


  getCSDataBulk(StartDate:string,EndDate:string)
  {

   let Dates = {
    StartDate : StartDate,
    EndDate : EndDate
   }


    return this.http.post(this.hostUrl+"/api/getcsdaterangeprojects",Dates)
  }

  getSpecialRequests()
  {
  return this.http.get<{message: string; specialrequests : SpecialRequest[] }>(this.hostUrl+"/api/specialrequests?user=ALL")
  }
  

  ListAllProcoreProjects()
  {
    return this.http.get<any>(this.hostUrl+"/api/procoreprojectsanalytics")
  }


  ListSalesCsreport()
  {
    return this.http.get<any>(this.hostUrl+"/api/getsalesreportcs")
  }

  GetOrdersForSR(StartDate:string,EndDate:string)
  {

    let Dates = {
      StartDate : StartDate,
      EndDate : EndDate
     }
  
  
      return this.http.post(this.hostUrl+"/api/getsalesreportcs",Dates)

  }

  //   /api/getsalesreportcs


  ListProcoreCompanyVendors()
  {

    return this.http.get(this.hostUrl+"/api/getcompanyvendors")
  }



  getIncentiveData(Month : string,Year : string, User: string)
  {
    var FormatedDate  = Month+"/1/"+Year

    let Details = { StartDate : FormatedDate, Associate : User }
    
    return this.http.post<any>(this.hostUrl+"/api/analytics/getOrders",Details)
    
  }



  
GetDateFormat(StartDate : Date)
{

  var monthS = StartDate.getMonth()+1
 


  let SMonthFormat='';
  if(monthS===1)
  {
    SMonthFormat = "Jan"
  }
  if(monthS===2)
  {
    SMonthFormat = "Feb"
  }
  if(monthS===3)
  {
    SMonthFormat = "Mar"
  }
  if(monthS===4)
  {
    SMonthFormat = "Apr"
  }
  if(monthS===5)
  {
    SMonthFormat = "May"
  }
  if(monthS===6)
  {
    SMonthFormat = "Jun"
  }
  if(monthS===7)
  {
    SMonthFormat = "Jul"
  }
  if(monthS===8)
  {
    SMonthFormat = "Aug"
  }
  if(monthS===9)
  {
    SMonthFormat = "Sep"
  }
  if(monthS===10)
  {
    SMonthFormat = "Oct"
  }
  if(monthS===11)
  {
    SMonthFormat = "Nov"
  }
  if(monthS===12)
  {
    SMonthFormat = "Dec"
  }



  var DateS = StartDate.getDate()
  var YearS = StartDate.getFullYear()

  var NewDateFormat = DateS + "-" + SMonthFormat + "-"+ YearS

  return NewDateFormat

}


getOrdersAndSalesData(ToDate: string,Users : string[])
{

  
  let Details = { EndDate : ToDate, Associates : Users }
    
  return this.http.post<any>(this.hostUrl+"/api/analytics/getOrdersProPlus",Details)

}


getIncentivesDateRangeReport(StartDate : string, EndDate : string, User : string )
{
  let Details = { StartDate : StartDate, EndDate : EndDate, Associate : User }
    
  return this.http.post<any>(this.hostUrl+"/api/analytics/getdaterangeincentive",Details)
}



  

}























