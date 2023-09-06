import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DesignService } from 'src/app/services/design.service';
import { Design } from 'src/app/shared/design.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

  form : FormGroup;
  designs : Design[] = [];
  design : Design;
  isLoading = false;
  private designsSub : Subscription;
  private mode = 'designs';
  private designId : string;



  constructor(public designsService :DesignService, public route : ActivatedRoute) { }


  ngOnInit() {
    //===================Reactive Form==========================================
    
    this.form = new FormGroup({
      'Design' : new FormControl(null,{validators:[Validators.required]})
    });
    
    
    
    //===========================================================================
      this.route.paramMap.subscribe((paramMap:ParamMap)=>{
       if(paramMap.has('designId')) {
    
        this.mode = 'edit';
        this.designId = paramMap.get('designId');
    
    
    
        this.designsService.getDesign(this.designId).subscribe(designData=>{
    
    
          this.design = {_id:designData._id,Design : designData.Design,DateCreated : designData.DateCreated}
          this.form.setValue({'Design':this.design.Design});
        });
       }else{
    
        this.mode = 'designs';
        this.designId = null;
       }
    
    
      });
    
    
      }
    
    
    //==============================Adding Subsystems========================================
    
      onSaveDesign(){
    
        if(this.form.invalid){
    
          return;
        }
    
    
       if(this.mode === 'designs'){
        this.designsService.addDesigns(this.form.value.Design);
    
       }else{
    
        this.designsService.updateDesign(this.designId,this.form.value.Design)
        
       }
    
    
      this.form.reset();
    
      }
    

}
