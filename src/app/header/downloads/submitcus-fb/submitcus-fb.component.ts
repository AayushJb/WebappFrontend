import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProcoreService } from 'src/app/services/procore.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Order } from 'src/app/shared/order.model';
import { User } from 'src/app/shared/user.model';
import { mimeType } from '../../settings/colors/mime-type.validator';

@Component({
  selector: 'app-submitcus-fb',
  templateUrl: './submitcus-fb.component.html',
  styleUrls: ['./submitcus-fb.component.css']
})
export class SubmitcusFBComponent {

  form : FormGroup
  imagePreview :string;

  ProjectName : string;
  ClientName  : string;
  Location  : string;
  OrderNumber  : string;
  Architect : string;
  Associate : string;
  users : User[] = [];
  ProjectID : string;

  constructor(public wqgformService : WqgformService, public route : ActivatedRoute, public procoreService : ProcoreService) {}

  
  ngOnInit(): void {



    this.form = new FormGroup({
      'Quality' : new FormControl('Excellent',{validators:[Validators.required]}),
      'Schedule' :  new FormControl('Excellent',{validators:[Validators.required]}),
      'Installation' :  new FormControl('Excellent',{validators:[Validators.required]}),
      'Professionalism' :  new FormControl('Excellent',{validators:[Validators.required]}),
      'Overall' :  new FormControl('Excellent',{validators:[Validators.required]}),
      'Image' :  new FormControl(null,{validators:[Validators.required],asyncValidators : [mimeType]})
    })


          
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      let Id = paramMap.get('orderId');



      this.wqgformService.getOrder(Id).subscribe((orderData:Order)=>{

      this.ProjectName = orderData.ProjectName;
      this.ClientName =  orderData.ClientName
      this.Location = orderData.Location;
      this.OrderNumber = orderData.OrderNo;
      this.Architect = orderData.Architect;
      this.Associate = orderData.Associate;
      this.ProjectID = orderData.ProjectID;

      })
      
   


     })



  }





  onSaveCFB()
  {

    this.procoreService.getCurrentDateTime();

    if(this.form.invalid){

      return;
    }



    this.procoreService.SaveCustomerFeedBackForm(this.form.value.Quality,this.form.value.Schedule,
      this.form.value.Installation,this.form.value.Professionalism,this.form.value.Overall, this.form.value.Image,this.OrderNumber,this.ProjectName,this.ProjectID);

 


    this.form.reset();

  }


  OnImagePicked(event :Event){
    const file =(event.target as HTMLInputElement).files[0];
    this.form.patchValue({'Image': file});
    this.form.get('Image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
     this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

}
