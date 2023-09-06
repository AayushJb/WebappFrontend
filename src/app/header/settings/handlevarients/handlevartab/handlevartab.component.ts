import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HandlevariantService } from 'src/app/services/handlevariant.service';
import { Handlevariant } from 'src/app/shared/handlevariant.model';

@Component({
  selector: 'app-handlevartab',
  templateUrl: './handlevartab.component.html',
  styleUrls: ['./handlevartab.component.css']
})
export class HandlevartabComponent implements OnInit , OnDestroy {

  handlevariants : Handlevariant[] = [];
  private handlevariantsSub : Subscription;


  constructor(public handlevariantService : HandlevariantService) { }

  ngOnInit(): void {

    this.handlevariantService.getHandlevariants();

    this.handlevariantsSub = this.handlevariantService.getHandlevariantsUpdateListener().subscribe((handlevariants:Handlevariant[])=>{

    this.handlevariants = handlevariants;

    });
  }

  ngOnDestroy(){

    this.handlevariantsSub.unsubscribe();
   }


   //===============================Deleting Subsystem=============================================

   OnDeleteHandlevariant(handlevariantId:string){

     this.handlevariantService.deleteHandlevariants(handlevariantId);

     }


}
