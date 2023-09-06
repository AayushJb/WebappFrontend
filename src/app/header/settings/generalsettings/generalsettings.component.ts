import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralsettingsService } from 'src/app/services/generalsettings.service';

import { GeneralSetting } from 'src/app/shared/generalsetting.model';

@Component({
  selector: 'app-generalsettings',
  templateUrl: './generalsettings.component.html',
  styleUrls: ['./generalsettings.component.css']
})
export class GeneralsettingsComponent implements OnInit {
  form : FormGroup;
  generalsetting: GeneralSetting;


  constructor( public generalsettingsservice : GeneralsettingsService) { }

  ngOnInit(): void {


    this.form = new FormGroup({
      'Counter' : new FormControl(null,{validators:[Validators.required]}),
      'Prefix' : new FormControl(null,{validators:[Validators.required]}),
      'Factor' : new FormControl(null,{validators:[Validators.required]}),
      'GridCost' : new FormControl(null,{validators:[Validators.required]}),
      'DoorCloserCost' : new FormControl(null,{validators:[Validators.required]}),
      'DropSealCost' : new FormControl(null,{validators:[Validators.required]}),
      'GlassFactor' : new FormControl(null,{validators:[Validators.required]}),
      'GlassCounter' : new FormControl(null,{validators:[Validators.required]})
      })



     this.generalsettingsservice.getGeneralSetting().subscribe(gsData =>{
      this.form.setValue({
      'Counter':gsData.Counter,
      'Prefix':gsData.Prefix,
      'Factor':gsData.Factor,
      'GridCost': gsData.GridCost,
      'DoorCloserCost' : gsData.DoorCloserCost,
      'DropSealCost' : gsData.DropSealCost,
      'GlassFactor' : gsData.GlassFactor,
      'GlassCounter' : gsData.GlassCounter
      
       });



    })





  }


  onEditGeneralSettings()
  {
    this.generalsettingsservice.updateGeneralSetting(this.form.value.Counter,this.form.value.Prefix,this.form.value.Factor,this.form.value.GridCost,this.form.value.DoorCloserCost,this.form.value.DropSealCost,this.form.value.GlassFactor,this.form.value.GlassCounter)

  }


}
