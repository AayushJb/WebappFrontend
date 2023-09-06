import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Model } from 'src/app/shared/model.model';
import { Subscription } from 'rxjs';
import { sys, System } from 'typescript';
import { Subsystem } from 'src/app/shared/subsystem.model';
import { Color } from '@swimlane/ngx-charts';
import { DesignPattern } from 'src/app/shared/designpattern.model';
import { mimeType } from '../colors/mime-type.validator';
import { Systemtype } from 'src/app/shared/systemtype.model';
import { DesignpatternsService } from 'src/app/services/designpatterns.service';
import { Grid } from 'src/app/shared/grid.model';

@Component({
  selector: 'app-designpatterns',
  templateUrl: './designpatterns.component.html',
  styleUrls: ['./designpatterns.component.css']
})
export class DesignpatternsComponent implements OnInit {

  form : FormGroup;
  models = [];
  selectedModel = [];
  private modelsSub : Subscription;
  private mode = 'designpatterns';
  private modelId : string;
  systems  = [];
  selectedsystems = [];
  subsystems = [];
  selectedsubsystems = [];
  systemtypes  = [];
  selectedsystemtypes = [];
  selectedorientation = [];
  selectedsuborientation = [];
  colors  = [];
  grids  = [];
  subscription : Subscription[] = [];

  designpatterns : DesignPattern[] = [];
  designpattern : DesignPattern


  imagePreviewRI : string;
  imagePreviewPSE : string;
  imagePreviewEx : string;

  constructor(public designpatternService : DesignpatternsService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'System' : new FormControl(null,{validators:[Validators.required]}),
      'SubSystem' : new FormControl(null,{validators:[Validators.required]}),
      'SystemType' : new FormControl(null,{validators:[Validators.required]}),
      'Orientation' : new FormControl(null,{validators:[Validators.required]}),
      'SubOrientation' : new FormControl(null,{validators:[Validators.required]}),
      'GridType' : new FormControl(null,{validators:[Validators.required]}),
      'Design' : new FormControl(null,{validators:[Validators.required]}),
      'DesignPatternName' : new FormControl(null,{validators:[Validators.required]}),
      'DesignPatternCode' : new FormControl(null),
      'Color' : new FormControl(null,{validators:[Validators.required]}),
      'GlassFinishCount' : new FormControl('ONE',{validators:[Validators.required]}),
      'GLOnePercent' : new FormControl(null,{validators:[Validators.required]}),
      'GLTwoPercent' : new FormControl(null,{validators:[Validators.required]}),
      'DesignPatternCost' : new FormControl(null,{validators:[Validators.required]}),
      'Status' : new FormControl(null),
      'MinGlassHeight' : new FormControl(null,{validators:[Validators.required]}),
      'MinGlassWidth' : new FormControl(null,{validators:[Validators.required]}),
      'ParamOne' : new FormControl(null,{validators:[Validators.required]}),
      'ParamTwo' : new FormControl(null,{validators:[Validators.required]}),
      'ParamThree' : new FormControl(null,{validators:[Validators.required]}),
      'ParamFour' : new FormControl(null,{validators:[Validators.required]}),
      'ParamFive' : new FormControl(null,{validators:[Validators.required]}),
      'imageRIpath' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'imagePSEpath' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]}),
      'imageExtrapath' : new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]})
    
    });





    this.designpatternService.getSystems().subscribe((systemsData)=>{
   
      let systemtemp = [];
       
      systemtemp = systemsData.systems
      this.systems = systemtemp

       systemtemp.map((item)=>{
        if(!this.selectedsystems.includes(item.System))
        {
          this.selectedsystems.push(item.System)
        }
       })

       this.form.patchValue({'System':this.selectedsystems[0]});   
      
    })
    
    this.form.patchValue({'System':this.selectedsystems[0]});  
 

    this.designpatternService.getSubsystems().subscribe((subsystemsData)=>{
      let subsystemstemp = []
      subsystemstemp = subsystemsData.subsystems
      this.subsystems = subsystemstemp
    })

    this.designpatternService.getSystemtypes().subscribe((systemtypesData)=>{
      let systemtypestemp = [];
      systemtypestemp =  systemtypesData.systemtypes
      this.systemtypes =  systemtypestemp 
    })

  
    this.designpatternService.getColors().subscribe((colorsData)=>{
      this.colors = colorsData.colors
    })


    this.designpatternService.getModels().subscribe((modelsData)=>{
      let modelstemp = []
      modelstemp = modelsData.models
      this.models = modelstemp
      

    })




  this.systemValueChanges()
    
  }



  systemValueChanges(){

    this.subscription.push(this.form.get('System').valueChanges.subscribe((response)=>{
    this.selectedsubsystems = [];
    this.selectedsystemtypes = [];
    this.selectedorientation = [];
    this.selectedsuborientation = [];
  

    this.systems.map(item=>{if(item.System===response&&(!this.selectedsubsystems.includes(item.SubSystem))){
      this.selectedsubsystems.push(item.SubSystem)

    }})

    this.form.patchValue({'SubSystem':this.selectedsubsystems[0]});

    this.systems.map(item => {if(item.System===response&& item.SubSystem ===this.selectedsubsystems[0]){

      this.selectedsystemtypes = item.SystemType;

    }})

    this.form.patchValue({'SystemType':this.selectedsystemtypes[0]});

      
    this.models.map((item=>{
      if(item.System===response&&item.SubSystem===this.form.value.SubSystem&&item.SystemType===this.form.value.SystemType)
      {
        if(!this.selectedorientation.includes(item.Orientation))
        {
          this.selectedorientation.push(item.Orientation)
        }
        
      }

      if(item.System===response&&item.SubSystem===this.form.value.SubSystem&&item.SystemType===this.form.value.SystemType&&item.Orientation===this.selectedorientation[0])
      {
        if(!this.selectedsuborientation.includes(item.SubOrientation))
        {
          this.selectedsuborientation.push(item.SubOrientation)
        }
        
      }

    }))

    this.form.patchValue({'Orientation':this.selectedorientation[0]});
    this.form.patchValue({'SubOrientation':this.selectedsuborientation[0]});



    }));

    }

  onSaveDesignPattern()
  {

  }

}
