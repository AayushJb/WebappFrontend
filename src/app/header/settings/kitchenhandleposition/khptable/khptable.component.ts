import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KitchenhandlepositionService } from 'src/app/services/kitchenhandleposition.service';
import { KitchenHandlePosition } from 'src/app/shared/kitchenhandleposition.model';

@Component({
  selector: 'app-khptable',
  templateUrl: './khptable.component.html',
  styleUrls: ['./khptable.component.css']
})
export class KhptableComponent implements OnInit {

  kitchenhandlepositions : KitchenHandlePosition[] = [];
  private kitchenhandlepositionsSub : Subscription;

  constructor(public kitchenhandlepositionService : KitchenhandlepositionService) { }


  ngOnInit(): void {

    this.kitchenhandlepositionService.getKitchenHandlePositions();

    this.kitchenhandlepositionsSub = this.kitchenhandlepositionService.getKitchenhandlepositionsUpdateListener().subscribe((kitchenhandlepositions:KitchenHandlePosition[])=>{

    this.kitchenhandlepositions =kitchenhandlepositions;

    });

  }

  ngOnDestroy(){

    this.kitchenhandlepositionsSub.unsubscribe();
   }


   //===============================Deleting Subsystem=============================================

   OnDeleteKitchenHandlePosition(kitchenhandlepositionId:string){

     this.kitchenhandlepositionService.deleteKitchenHandlePosition(kitchenhandlepositionId);

     }

}
