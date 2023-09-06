import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlassfinishService } from 'src/app/services/glassfinish.service';
import { Glassfinish } from 'src/app/shared/glassfinish.model';

@Component({
  selector: 'app-glassfintable',
  templateUrl: './glassfintable.component.html',
  styleUrls: ['./glassfintable.component.css']
})
export class GlassfintableComponent implements OnInit, OnDestroy {

  glassfinishes : Glassfinish[] = [];
  private glassfinishSub : Subscription;


  constructor(public glassfinishService : GlassfinishService) { }

  ngOnInit(): void {

    this.glassfinishService.getGlassfinishes();

    this.glassfinishSub = this.glassfinishService.getGlassfinishesUpdateListener().subscribe((glassfinishes:Glassfinish[])=>{

    this.glassfinishes = glassfinishes;

    });
  }

  ngOnDestroy(){

    this.glassfinishSub.unsubscribe();
   }


   //===============================Deleting Subsystem=============================================

   OnDeleteGlassfinish(glassfinishId:string){

     this.glassfinishService.deleteGlassfinish(glassfinishId);

     }


}
