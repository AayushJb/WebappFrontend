import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DesignService } from 'src/app/services/design.service';
import { Design } from 'src/app/shared/design.model';

@Component({
  selector: 'app-designtable',
  templateUrl: './designtable.component.html',
  styleUrls: ['./designtable.component.css']
})
export class DesigntableComponent implements OnInit , OnDestroy {

  designs : Design[] = [];
  private designsSub : Subscription;

  constructor(public designsService : DesignService) { }

  ngOnInit(): void {
  
    this.designsService.getDesigns();

    this.designsSub = this.designsService.getDesignUpdateListener().subscribe((designs:Design[])=>{

    this.designs = designs;
    });


  }


  OnDeleteDesign(designId:string){

    this.designsService.deleteDesign(designId);
  
    }

  ngOnDestroy(){

    this.designsSub.unsubscribe();
   }

}
