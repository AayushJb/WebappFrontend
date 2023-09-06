import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { GetjbproserviceService } from 'src/app/services/getjbproservice.service';

@Component({
  selector: 'app-getjbpro',
  templateUrl: './getjbpro.component.html',
  styleUrls: ['./getjbpro.component.css']
})
export class GetjbproComponent implements OnInit {

  exceldata : string[]
  AsonDate : string
  OrderNumber : string
  Status: string
  ProjectName: string
  SalesHead: string
  Webappvalue: string
  ClientDiscount: string
  ClientDiscountValue: string
  Dealerdiscount: string
  DealerDiscountValue: string
  FinalValue: string
  CSValue: string
  Billed: string = "0"
  Party: string
  SpecialDiscount: string = "0"
  TotalOutstanding: string = "0"
  ChequeRequired: string = "0"
  CreationDate: string
  EditDate: string 
  WinDateGJB: string 
  CommercialWinDate: string
  HandOverDate: string = "Not Handover"
  Plan: string = "NA"
  PlanValue: string = '0'
  ReceiptAdvance : string = '0'

  constructor(public dialogRef : MatDialogRef<GetjbproComponent>,
    public getJbproservice : GetjbproserviceService) { }

  ngOnInit(): void {
   
   

    this.exceldata = this.getJbproservice.ExcelData
   
    for(var i = 0; i < this.exceldata.length;i++)
    {
      if(this.exceldata[i][0]==="As On Date")
      {
        this.AsonDate = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Order Number")
      {
        this.OrderNumber = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Status")
      {
        this.Status = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Project Name")
      {
        this.ProjectName = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="WA Sales Head")
      {
        this.SalesHead = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Grand Total")
      {
        this.Webappvalue = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Client Discount")
      {
        this.ClientDiscount = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Client Discount Value")
      {
        this.ClientDiscountValue = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Dealer Discount")
      {
        this.Dealerdiscount = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Dealer Discount Value")
      {
        this.DealerDiscountValue = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Final Value")
      {
        this.FinalValue = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="CS Value")
      {
        this.CSValue = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Billed")
      {
        this.Billed = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Party")
      {
        this.Party = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="SpecialDiscount")
      {
        this.SpecialDiscount = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="TotalOutstanding")
      {
        this.TotalOutstanding = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="ChequeRequired")
      {
        this.ChequeRequired = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="CreationDate")
      {
        this.CreationDate = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="LastEditDate")
      {
        this.EditDate = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="WinDate")
      {
        this.WinDateGJB = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="CommercialWinDate")
      {
        this.CommercialWinDate = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="HandOverDate")
      {
        this.HandOverDate = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="Plan")
      {
        this.Plan = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="PlanValue")
      {
        this.PlanValue = this.exceldata[i][1]
      }
      if(this.exceldata[i][0]==="ReceiptAdvance")
      {
        this.ReceiptAdvance = this.exceldata[i][1]
      }

    }
  
  }

  OnClickExcel()
  {
    var options = { 
 
      headers:  ["Field","Value"] 
      
    };

     new ngxCsv(this.exceldata, "GetJB", options);
  }

  OnClose()
  {
    this.dialogRef.close();
  }

}
