import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { FramefinishService } from 'src/app/services/framefinish.service';

import { Framefinish } from 'src/app/shared/framefinish.model';

@Component({
  selector: 'app-fftable',
  templateUrl: './fftable.component.html',
  styleUrls: ['./fftable.component.css']
})
export class FftableComponent implements OnInit {

  framefinishes : Framefinish[] = [];
  private framefinishesSub : Subscription;

  constructor(public framefinishService : FramefinishService) { }

  ngOnInit(): void {

    this.framefinishService.getFramefinishes();

    this.framefinishesSub = this.framefinishService.getFramefinishUpdateListener().subscribe((framefinishes:Framefinish[])=>{

    this.framefinishes = framefinishes;

  });
}

ngOnDestroy(){

  this.framefinishesSub.unsubscribe();
 }


OnDeleteFramefinish(framefinishId:string){

this.framefinishService.deleteFramefinish(framefinishId);

}

}
