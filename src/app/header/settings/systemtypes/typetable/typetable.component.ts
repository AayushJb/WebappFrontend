import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { SystemtypesService } from 'src/app/services/systemtypes.service';
import { Systemtype } from 'src/app/shared/systemtype.model';


@Component({
  selector: 'app-typetable',
  templateUrl: './typetable.component.html',
  styleUrls: ['./typetable.component.css']
})
export class TypetableComponent implements OnInit, OnDestroy {

  systemtypes : Systemtype[] = [];
  private systemtypesSub : Subscription;

  constructor(public systemtypesService : SystemtypesService) { }

  ngOnInit(): void {

    this.systemtypesService.getSystemtypes();

    this.systemtypesSub = this.systemtypesService.getSystemtypeUpdateListener().subscribe((systemtypes:Systemtype[])=>{

    this.systemtypes = systemtypes;
    });

  }

  ngOnDestroy(){

    this.systemtypesSub.unsubscribe();
   }


 //===============================Deleting Subsystem=============================================

 OnDeleteSystemtype(systemtypeId:string){

  this.systemtypesService.deleteSystemtype(systemtypeId);

  }



}
