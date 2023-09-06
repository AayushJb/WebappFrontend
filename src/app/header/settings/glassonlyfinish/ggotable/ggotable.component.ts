import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlassonlyfinishService } from 'src/app/services/glassonlyfinish.service';
import { Glassonlyfinish } from 'src/app/shared/glassonlyfinish.model';

@Component({
  selector: 'app-ggotable',
  templateUrl: './ggotable.component.html',
  styleUrls: ['./ggotable.component.css']
})
export class GgotableComponent {

  glassonlyfinishes : Glassonlyfinish[] = [];
  private glassfinishSub : Subscription;


  constructor(public glassonlyfinishService : GlassonlyfinishService) { }

  ngOnInit(): void {

    this.glassonlyfinishService.getGlassonlyfinishes();

    this.glassfinishSub = this.glassonlyfinishService.getglassonlyfinishUpdateListener().subscribe((glassonlyfinishes:Glassonlyfinish[])=>{

    this.glassonlyfinishes = glassonlyfinishes;

    });
  }

  ngOnDestroy(){

    this.glassfinishSub.unsubscribe();
   }


   //===============================Deleting Subsystem=============================================

   OnDeleteGlassfinish(glassfinishId:string){

     this.glassonlyfinishService.deleteGlassonlyfinish(glassfinishId);

     }



}
