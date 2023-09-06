import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HandleService } from 'src/app/services/handle.service';
import { Handle } from 'src/app/shared/handle.model';

@Component({
  selector: 'app-handletab',
  templateUrl: './handletab.component.html',
  styleUrls: ['./handletab.component.css']
})
export class HandletabComponent implements OnInit ,OnDestroy{

  handles : Handle[] = [];
  private handleSub : Subscription;


  constructor(public handleService : HandleService) { }

  ngOnInit(): void {

    this.handleService.getHandles();

    this.handleSub = this.handleService.getHandlesUpdateListener().subscribe((handles:Handle[])=>{

    this.handles = handles;

    });
  }

  ngOnDestroy(){

    this.handleSub.unsubscribe();
   }


   //===============================Deleting Subsystem=============================================

   OnDeleteHandle(handleId:string){

     this.handleService.deleteHandle(handleId);

     }



}
