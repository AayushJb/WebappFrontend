import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CommercialwinService } from 'src/app/services/commercialwin.service';
import { GetjbService } from 'src/app/services/getjb.service';
import { ProcorewinService } from 'src/app/services/procorewin.service';
import { Order } from 'src/app/shared/order.model';
import { CommercialwinComponent } from '../commercialwin/commercialwin.component';
import {environment} from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { CommercialWin } from 'src/app/shared/commericalwin.model';
import { WinComponent } from '../win/win.component';

@Component({
  selector: 'app-procorewin',
  templateUrl: './procorewin.component.html',
  styleUrls: ['./procorewin.component.css']
})
export class ProcorewinComponent implements OnInit {

  error : boolean = false;
  success : boolean = false;
  failedorder : Order;
  response : any;
  hostUrl = environment.hostURL;
  CommercialWin : CommercialWin;
  WinRequirements : any;


  constructor(
    public dialogRef : MatDialogRef<ProcorewinComponent>,
    public procorewinService : ProcorewinService,
    public getjbservice : GetjbService,
    public commericialwinservice : CommercialwinService,
    private CWdialog : MatDialog,
    private Wdialog : MatDialog,
    private Windialog : MatDialog,
    private overlay: Overlay,
    private http : HttpClient,
    private router :Router,
    public projectsService : ProjectsService,
    public Sdialog  : MatDialog
  ) { }

  ngOnInit(): void {

    this.error = this.procorewinService.error
    this.success = this.procorewinService.success
    this.failedorder = this.procorewinService.failedOrder
    this.response = this.procorewinService.response
    this.WinRequirements = this.procorewinService.WinRequirements
    this.CommercialWin = this.procorewinService.CommercialWin
  }


  OnRetry()
  {
       
       
    let ProcoreDetails = [];

    for(var i = 0; i < this.response.length; i++)
    {
       let temp = {
         SolutionNo : this.response[i].SolutionNo,
         PunchID : this.response[i].PunchID,
         Floor : this.response[i].Floor,
         Space : this.response[i].Space,
         Type : this.response[i].Type
       }
       ProcoreDetails.push(temp)
    }

   for(var i = 0 ; i <this.WinRequirements.Order.Solutions.length;i++ )
   {
     this.WinRequirements.Order.Solutions[i].ProcoreStatus =[];
     this.WinRequirements.Order.Solutions[i].ProcorePunchItemID =[];

     for(var j =0;j<ProcoreDetails.length;j++)
     {
       let SolutionNumber = ProcoreDetails[j].SolutionNo.toString().split('.')[0]

       if(SolutionNumber===(i+1).toString()&&ProcoreDetails[j].Floor===this.WinRequirements.Order.Solutions[i].Floor&&ProcoreDetails[j].Space===this.WinRequirements.Order.Solutions[i].Space)
       { 
         this.WinRequirements.Order.Solutions[i].ProcorePunchItemID.push(ProcoreDetails[j])
       }

       if(SolutionNumber==="147")
       {
         this.WinRequirements.Order.Solutions[i].ProcoreStatus.push(ProcoreDetails[j])
       }
     }

   }
    


   this.WinRequirements.Order.ProjectID = this.response[0].ProjectID
    
     
  


   this.http.put<{message : string, orders : Order}>(this.hostUrl+"/api/orders/win/"+ this.WinRequirements.Order._id,this.WinRequirements).subscribe(responseWin => {
             
     this.http.post<{message: string, ledgerId: string}>(this.hostUrl+"/api/ledgerdetails",this.WinRequirements.LedgerDetail).subscribe(response => {
       
       this.projectsService.getProjects(this.WinRequirements.Order.Associate)
         this.Sdialog.closeAll()

          //=================Spinner Dialog================
           const dialogConfig3 = new MatDialogConfig();
           dialogConfig3.disableClose =true;
           dialogConfig3.autoFocus =true;
           this.Windialog.open(WinComponent,dialogConfig3)
          //=================================================   

          

      });
     
   })
   


 

}
  
  OnSuccess()
  {
       
       
       let ProcoreDetails = [];

       for(var i = 0; i < this.response.length; i++)
       {
          let temp = {
            SolutionNo : this.response[i].SolutionNo,
            PunchID : this.response[i].PunchID,
            Floor : this.response[i].Floor,
            Space : this.response[i].Space,
            Type : this.response[i].Type
          }
          ProcoreDetails.push(temp)
       }

      for(var i = 0 ; i <this.WinRequirements.Order.Solutions.length;i++ )
      {
        this.WinRequirements.Order.Solutions[i].ProcoreStatus =[];
        this.WinRequirements.Order.Solutions[i].ProcorePunchItemID =[];

        for(var j =0;j<ProcoreDetails.length;j++)
        {
         
        
          
          let SolutionNumber = ProcoreDetails[j].SolutionNo.toString().split('.')[0]

          if(SolutionNumber===(i+1).toString()&&ProcoreDetails[j].Floor===this.WinRequirements.Order.Solutions[i].Floor&&ProcoreDetails[j].Space===this.WinRequirements.Order.Solutions[i].Space)
          { 
            this.WinRequirements.Order.Solutions[i].ProcorePunchItemID.push(ProcoreDetails[j])
          }

          if(SolutionNumber==="147")
          {
            this.WinRequirements.Order.Solutions[i].ProcoreStatus.push(ProcoreDetails[j])
          }
        }

      }
       


      this.WinRequirements.Order.ProjectID = this.response[0].ProjectID
      
       
        

     window.open("https://login.procore.com/", "_blank")


      this.http.put<{message : string, orders : Order}>(this.hostUrl+"/api/orders/win/"+ this.WinRequirements.Order._id,this.WinRequirements).subscribe(responseWin => {
                
        this.http.post<{message: string, ledgerId: string}>(this.hostUrl+"/api/ledgerdetails",this.WinRequirements.LedgerDetail).subscribe(response => {
          
          this.projectsService.getProjects(this.WinRequirements.Order.Associate)
            this.Sdialog.closeAll()
  
             //=================Spinner Dialog================
              const dialogConfig3 = new MatDialogConfig();
              dialogConfig3.disableClose =true;
              dialogConfig3.autoFocus =true;
              this.Windialog.open(WinComponent,dialogConfig3)
             //=================================================   

             
  
         });
        
      })
      


    

  }
}
