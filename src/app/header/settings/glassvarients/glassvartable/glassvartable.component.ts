import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlassvariantsService } from 'src/app/services/glassvariants.service';
import { Glassvariant } from 'src/app/shared/glassvariant.model';


@Component({
  selector: 'app-glassvartable',
  templateUrl: './glassvartable.component.html',
  styleUrls: ['./glassvartable.component.css']
})
export class GlassvartableComponent implements OnInit ,OnDestroy{

  glassvariants : Glassvariant[] = [];
  private glassvariantsSub : Subscription;


  constructor(public glassvariantService : GlassvariantsService) { }

  ngOnInit(): void {

    this.glassvariantService.getGlassvariants();

    this.glassvariantsSub = this.glassvariantService.getGlassvariantUpdateListener().subscribe((glassvariants:Glassvariant[])=>{

    this.glassvariants = glassvariants;

    });
  }

  ngOnDestroy(){

    this.glassvariantsSub.unsubscribe();
   }


   //===============================Deleting Subsystem=============================================

   OnDeleteGlassvariant(glassvariantId:string){

     this.glassvariantService.deleteGlassvariant(glassvariantId);

     }



}
