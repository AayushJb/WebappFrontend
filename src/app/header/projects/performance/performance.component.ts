import { Component, Input, OnInit, Pipe, ViewEncapsulation } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ProjectsService } from 'src/app/services/projects.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Order } from 'src/app/shared/order.model';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
 // encapsulation: ViewEncapsulation.None
})
export class PerformanceComponent implements OnInit {

  @Input() parentSubject:Subject<string>;

  view : any;
  orders : Order[] =[];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Status';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Percent Achieved';
  test : string;

  colorScheme : any;

  //fill="#A8385D"
  
  multip : any;

  constructor(public wqgService : WqgformService,
    private Sdialog : MatDialog,
    public projectsService : ProjectsService
    ) { }

  ngOnInit(): void {
    this.view = [500, 200];

    
    this.parentSubject.subscribe(event => {
      this.projectsService.getProjects(event)
    
      this.projectsService.getOrderUpdateListener().subscribe(projectData =>{
   
        let TotalPipeline = 0;
        let LastMonthPipeline = 0;
        let PipelineTarget = 0;
   
        let TotalWin = 0;
        let LastMonthWin = 0;
        let WinTarget = 0;
   
        let TotalHandover = 0;
        let LastMonthHandover = 0;
        let HandoverTarget = 0;
   
         projectData.map(item=>{
           let today = new Date();
           let todayMonth = today.getMonth() + 1;
           let todayYear = today.getFullYear();
           let todayDate = todayMonth + "/1/" + todayYear
           let ThisMonthDateFormat = new Date(todayDate)
   
   
           let LastMonthDate =  new Date(today.getFullYear(), today.getMonth() - 4, 1);

          
   
          
           let CreationDate = item.CreationDate
           let CreateDate= CreationDate.split("-")[0];
           let CreateMonth = CreationDate.split("-")[1];
           let CreateYear = CreationDate.split("-")[2];
           let DateFormat = CreateMonth+ "/" + CreateDate + "/" + CreateYear;
           let PipelineCreationDate = new Date(DateFormat);  
           
   
           if(PipelineCreationDate>=ThisMonthDateFormat)
           {
            TotalPipeline = TotalPipeline + Number(item.FinalAmount)
           }
   
           if(PipelineCreationDate>=LastMonthDate&&PipelineCreationDate<ThisMonthDateFormat)
           {
             LastMonthPipeline = LastMonthPipeline + Number(item.FinalAmount)
           }
   
           if(item.Status ==="Win"&& item.WinDate)
           {
   
             let WinDate = item.WinDate.split("-")[0]
             let WinMonth = item.WinDate.split("-")[1]
             let WinYear = item.WinDate.split("-")[2]
             let WinDateFormat = WinMonth + "/" + WinDate + "/" + WinYear;
             let FormattedWinDate = new Date(WinDateFormat)
   
             if(FormattedWinDate>=ThisMonthDateFormat)
             {
              TotalWin = TotalWin + Number(item.FinalAmount)
             }
   
             if(FormattedWinDate>=LastMonthDate&&FormattedWinDate<ThisMonthDateFormat)
             {
               LastMonthWin = LastMonthWin + Number(item.FinalAmount)
             }
     
   
           }
   
   
           if(item.Status ==="Handover"&& item.HandOverDate)
           {
   
             let HODate = item.HandOverDate.split("-")[0]
             let HOMonth = item.HandOverDate.split("-")[1]
             let HOYear = item.HandOverDate.split("-")[2]
             let HODateFormat = HOMonth + "/" + HODate + "/" + HOYear;
             let FormattedHODate = new Date(HODateFormat)
   
             if(FormattedHODate>=ThisMonthDateFormat)
             {
              TotalHandover = TotalHandover + Number(item.FinalAmount)
             }
   
             if(FormattedHODate>=LastMonthDate&&FormattedHODate<ThisMonthDateFormat)
             {
               LastMonthHandover = LastMonthHandover + Number(item.FinalAmount)
             }
     
   
           }
   
        })
   
        
        TotalPipeline
        TotalWin
        TotalHandover
        PipelineTarget = (LastMonthPipeline/3)*1.2
        WinTarget = (LastMonthWin/3)*1.2
        HandoverTarget = (LastMonthHandover/3)*1.2
   
        
       
        let PipelinePercent = Number(((TotalPipeline/PipelineTarget)*100).toFixed(2))
        let WinPercent = Number(((TotalWin/WinTarget)*100).toFixed(2))
        let HandOverPercent = Number(((TotalHandover/HandoverTarget)*100).toFixed(2))
       
      
         //=================================
   
         let red = '#A8385D';
         let green = '#00FF7F';
   
         let PipelineColor
         let WinColor
         let HandoverColor
   
         if(PipelinePercent>=100)
         {
           PipelineColor = green
         }
         if(PipelinePercent<100)
         {
           PipelineColor = red
         }
         
   
         if(WinPercent>=100)
         {
           WinColor = green
         }
         if(WinPercent<100)
         {
           WinColor = red
         }
   
         if(HandOverPercent>=100)
         {
           HandoverColor = green
         }
         if(HandOverPercent<100)
         {
           HandoverColor = red
         }
         
   
         
         this.colorScheme = {
           domain: [PipelineColor, WinColor, HandoverColor]
         };
         
   
   
        
         //=================================
         this.multip =[
           {
             "name": "Pipeline",
             "value": PipelinePercent,
             "extra": (TotalPipeline/10000000).toFixed(2)+"Cr Target: "+(PipelineTarget/10000000).toFixed(2)+"Cr",
             "target" : PipelineTarget
             
           },
           {
             "name": "Win",
             "value": WinPercent,
             "extra": (TotalWin/10000000).toFixed(2)+"Cr Target: "+(WinTarget/10000000).toFixed(2)+"Cr",
             "target":WinTarget
             
   
           },
           {
             "name": "Handover",
             "value": 0,
             "extra": (TotalHandover/10000000).toFixed(2)+"Cr Target: ",
            
           }
         ]
   
         //=================================
   
     
    
        //=============================Calculations for Charts=============================================================
    
     
        //=================================================================================================
        
       })


    });
    

    
      
}

onSelect(event) { 
 console.log(event)
}

setLabelFormatting(model): string {
  return model + '%'
}

percentTickFormatting(val: any) {
  return val 
}


}
