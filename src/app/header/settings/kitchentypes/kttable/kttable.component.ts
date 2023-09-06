import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KitchentypeService } from 'src/app/services/kitchentype.service';
import { KitchenType } from 'src/app/shared/kitchentype.model';

@Component({
  selector: 'app-kttable',
  templateUrl: './kttable.component.html',
  styleUrls: ['./kttable.component.css']
})
export class KttableComponent implements OnInit,OnDestroy {

  kitchentypes : KitchenType[] = [];
  private kitchentypesSub : Subscription;

  constructor(public kitchentypeService : KitchentypeService) { }

  ngOnInit(): void {

    this.kitchentypeService.getKitchenTypes();

    this.kitchentypesSub = this.kitchentypeService.getKitchenUpdateListener().subscribe((kitchentypes:KitchenType[])=>{

    this.kitchentypes = kitchentypes;

   });

  
  

}

ngOnDestroy(){

  this.kitchentypesSub.unsubscribe();
 }


 OnDeleteKitchenType(kitchentypeId:string){

this.kitchentypeService.deleteKitchenType(kitchentypeId);

}

}
