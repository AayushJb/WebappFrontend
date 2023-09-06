import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HingeService } from 'src/app/services/hinge.service';
import { Hinge } from 'src/app/shared/hinge.model';

@Component({
  selector: 'app-hingetable',
  templateUrl: './hingetable.component.html',
  styleUrls: ['./hingetable.component.css']
})
export class HingetableComponent implements OnInit, OnDestroy{

  hinges : Hinge[] = [];
  private hingesSub : Subscription;

  constructor(public hingeService : HingeService) { }

  ngOnInit(): void {

    this.hingeService.getHinges();

    this.hingesSub = this.hingeService.getHingesUpdateListener().subscribe((hinges:Hinge[])=>{

    this.hinges =hinges;

    });



    
  }

  ngOnDestroy(){

    this.hingesSub.unsubscribe();
   }


   //===============================Deleting Subsystem=============================================

   OnDeleteHinges(hingeId:string){

     this.hingeService.deleteHinges(hingeId);

     }

}
