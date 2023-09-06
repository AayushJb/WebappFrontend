import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit{


  private subscription : Subscription

  constructor(public dialogRef : MatDialogRef<LoaderComponent>,public loaderservice : LoaderService) { }

  ngOnInit(): void {
  }
 
 

}
