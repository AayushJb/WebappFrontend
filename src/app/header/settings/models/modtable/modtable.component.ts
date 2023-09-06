import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModelService } from 'src/app/services/model.service';
import { Model } from 'src/app/shared/model.model';

@Component({
  selector: 'app-modtable',
  templateUrl: './modtable.component.html',
  styleUrls: ['./modtable.component.css']
})
export class ModtableComponent implements OnInit , OnDestroy {

  models : Model[] = [];
  private modelsSub : Subscription;


  constructor(public modelService : ModelService) { }

  ngOnInit(): void {

    this.modelService.getModels();

    this.modelsSub = this.modelService.getModelUpdateListener().subscribe((models:Model[])=>{

    this.models = models;

    });
  }

  ngOnDestroy(){

    this.modelsSub.unsubscribe();
   }


   //===============================Deleting Subsystem=============================================

   OnDeleteModel(modelId:string){

     this.modelService.deleteModel(modelId);

     }



}
