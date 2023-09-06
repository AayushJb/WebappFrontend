import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Glasssubcat } from 'src/app/shared/glasssubcat.model';
import { GlasssubcatsService } from 'src/app/services/glasssubcats.service';

@Component({
  selector: 'app-glasssbtable',
  templateUrl: './glasssbtable.component.html',
  styleUrls: ['./glasssbtable.component.css']
})
export class GlasssbtableComponent implements OnInit {

  glasssubcats : Glasssubcat[] = [];
  private glasssubcatsSub : Subscription;


  constructor(public glasssubcatService : GlasssubcatsService) { }

  ngOnInit(): void {

    this.glasssubcatService.getGlasssubcats();

    this.glasssubcatsSub = this.glasssubcatService.getGlasssubcatUpdateListener().subscribe((glasssubcats:Glasssubcat[])=>{

    this.glasssubcats = glasssubcats;
    });

  }



ngOnDestroy(){

    this.glasssubcatsSub.unsubscribe();
   }


//=============================Editing Subsystem=========================================



//===============================Deleting Subsystem=============================================

OnDeleteGlasssubcats(glasssubcatId:string){

  this.glasssubcatService.deleteGlasssubcat(glasssubcatId);

  }
//===================



}
