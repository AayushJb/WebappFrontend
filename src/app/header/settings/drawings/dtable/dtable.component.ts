import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawingsService } from 'src/app/services/drawings.service';
import { Drawing } from 'src/app/shared/drawing.model';

@Component({
  selector: 'app-dtable',
  templateUrl: './dtable.component.html',
  styleUrls: ['./dtable.component.css']
})
export class DtableComponent implements OnInit ,OnDestroy {

  drawings : Drawing[] = [];
  private drawingsSub : Subscription;

  constructor(public drawingService : DrawingsService) { }


  ngOnInit(): void {

    this.drawingService.getDrawings();

    this.drawingsSub = this.drawingService.getDrawingssUpdateListener().subscribe((drawings:Drawing[])=>{

    this.drawings =drawings;
  });
}


ngOnDestroy(){

  this.drawingsSub.unsubscribe();
 }


 //===============================Deleting Subsystem=============================================

 OnDeleteDrawings(drawingId:string){

   this.drawingService.deleteDrawings(drawingId);
   }


}
