import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KitchenhandleService } from 'src/app/services/kitchenhandle.service';
import { KitchenHandle } from 'src/app/shared/kitchenhandle.model';

@Component({
  selector: 'app-khtable',
  templateUrl: './khtable.component.html',
  styleUrls: ['./khtable.component.css']
})
export class KhtableComponent implements OnInit {

  kitchenhandles : KitchenHandle[] = [];
  private kitchenhandlesSub : Subscription;

  constructor(public kitchenhandleService : KitchenhandleService) { }


  ngOnInit(): void {

    this.kitchenhandleService.getKitchenHandles();

    this.kitchenhandlesSub = this.kitchenhandleService.getKitchenhandlesUpdateListener().subscribe((kitchenhandles:KitchenHandle[])=>{

    this.kitchenhandles =kitchenhandles;

    });

  }

  ngOnDestroy(){

    this.kitchenhandlesSub.unsubscribe();
   }


   //===============================Deleting Subsystem=============================================

   OnDeleteKitchenHandle(kitchenhandleId:string){

     this.kitchenhandleService.deleteKitchenHandle(kitchenhandleId);

     }

}
