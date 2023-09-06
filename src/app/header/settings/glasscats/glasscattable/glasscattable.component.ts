import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { GlasscatsService } from 'src/app/services/glasscats.service';

import { Glasscat } from 'src/app/shared/glasscat.model';

@Component({
  selector: 'app-glasscattable',
  templateUrl: './glasscattable.component.html',
  styleUrls: ['./glasscattable.component.css']
})
export class GlasscattableComponent implements OnInit {

  glasscats : Glasscat[] = [];
  private glasscatsSub : Subscription;

  constructor(public glasscatsService : GlasscatsService) { }

  ngOnInit(): void {

    this.glasscatsService.getGlasscats();

    this.glasscatsSub = this.glasscatsService.getGlasscatUpdateListener().subscribe((glasscats:Glasscat[])=>{

    this.glasscats = glasscats;

  });
}

ngOnDestroy(){

  this.glasscatsSub.unsubscribe();
 }


OnDeleteGlasscat(glasscatId:string){

this.glasscatsService.deleteGlasscat(glasscatId);

}


}
