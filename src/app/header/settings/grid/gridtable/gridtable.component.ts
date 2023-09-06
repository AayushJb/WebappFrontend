import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridService } from 'src/app/services/grid.service';
import { Grid } from 'src/app/shared/grid.model';

@Component({
  selector: 'app-gridtable',
  templateUrl: './gridtable.component.html',
  styleUrls: ['./gridtable.component.css']
})
export class GridtableComponent implements OnInit {

  grids : Grid[] = [];
  private gridsSub : Subscription;

  constructor(public gridService : GridService) { }

  

  ngOnInit(): void {
 
    this.gridService.getGrids();

    this.gridsSub = this.gridService.getGridUpdateListener().subscribe((grids:Grid[])=>{

    this.grids = grids;

  });

  }


  ngOnDestroy(){

    this.gridsSub.unsubscribe();
   }
  
  
  OnDeleteGrid(gridId:string){
  
  this.gridService.deleteGrid(gridId);
  
  }

}
