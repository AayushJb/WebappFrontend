import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { ColorsService } from 'src/app/services/colors.service';
import { Color } from 'src/app/shared/color.model';

@Component({
  selector: 'app-colortable',
  templateUrl: './colortable.component.html',
  styleUrls: ['./colortable.component.css']
})
export class ColortableComponent implements OnInit , OnDestroy{

  colors : Color[] = [];
  private colorsSub : Subscription;


  constructor(public colorService : ColorsService) { }

  ngOnInit(): void {

    this.colorService.getColors();

    this.colorsSub = this.colorService.getColorUpdateListener().subscribe((colors:Color[])=>{

    this.colors = colors;

    });
  }

  ngOnDestroy(){

    this.colorsSub.unsubscribe();
   }


   //===============================Deleting Subsystem=============================================

   OnDeleteColor(colorId:string){

     this.colorService.deleteColor(colorId);

     }


}
