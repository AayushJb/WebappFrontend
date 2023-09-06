import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ProcoreService } from 'src/app/services/procore.service';
import { SitedetailsService } from 'src/app/services/sitedetails.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Model } from 'src/app/shared/model.model';
import { Order } from 'src/app/shared/order.model';
import { Solution } from 'src/app/shared/solution.model';
import { User } from 'src/app/shared/user.model';
import { WorkCompletion } from 'src/app/shared/workcompletion.model';


@Component({
  selector: 'app-workcompletion',
  templateUrl: './workcompletion.component.html',
  styleUrls: ['./workcompletion.component.css']
})
export class WorkcompletionComponent implements OnInit {

  users : User[] =[];
  models : Model[] =[];

  observable: Observable<string>

  ContactPerson : string;
  ContactPhone : string;
  AddressOne : string;
  AddressTwo : string;
  AddressThree : string;
  City : string;
  State : string;

  ProjectName : string ;
  Location : string ;
  OrderNumber : string ;
  Architect : string ;
  Solutions : Solution[] = [];
  Associate : string ;

  Address : string;
  PhoneNo : string;
  EmailId  : string;
  count : number =0;

  WorkCompletion : WorkCompletion[] =[];

  SolLen : number;
  RemainderOS : number;
  testRemOS : number;
  QuotientOS : number[] = [];

  punches : any =[];
  

  constructor(private wqgformService : WqgformService,public route : ActivatedRoute, public sitedetailsservice : SitedetailsService , private procoreService: ProcoreService) { }

  ngOnInit(): void {
   
    this.wqgformService.getUsers().subscribe((usersData)=>{
      this.users = usersData.users;     
     });
  
    //===============GET MODELS==================
    this.route.data.subscribe((modelsData)=>{
     this.models = modelsData.models.models;

    });

   

    
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      let Id = paramMap.get('orderId');



      this.wqgformService.getOrder(Id).subscribe((orderData:Order)=>{

        

      
      this.ProjectName = orderData.ProjectName;
      this.Location = orderData.Location;
      this.OrderNumber = orderData.OrderNo;
      this.Architect = orderData.Architect;
      this.Solutions = orderData.Solutions;
      this.Associate = orderData.Associate;
   
    

      
      

      

      
       
      
      this.users.map(item =>{
        if(item.UserFullName===this.Associate)
        {
          this.Address  = item.Address;
          this.PhoneNo = item.PhoneNo;
          this.EmailId = item.EmailId; 
        }
      });

      //============================Getting Other details into the output array from Solutions array=================
      //=============================================================================================================



      this.sitedetailsservice.getSiteDetails().subscribe((response)=>{
     
        response.sitedetails.map((item)=>{

         if(item.OrderNumber===this.OrderNumber)
         {

          this.ContactPerson = item.ContactPerson;
          this.ContactPhone = item.Phone;
          this.AddressOne = item.AddressLineOne;
          this.AddressTwo = item.AddressLineTwo;
          this.AddressThree = item.AddressLineThree;
          this.City = item.City;
          this.State = item.State;
             
         }
     
        })
   
       })



     for(var i=0;i<this.Solutions.length;i++)
     {

      let Code: string = "";
      let ModelImage: string = "";

      
      let PrintName : string;

      if(!this.Solutions[i].SubOrientation)
      {
        PrintName = this.Solutions[i].Orientation
      }

      if(this.Solutions[i].SubOrientation)
      {
        PrintName = this.Solutions[i].SubOrientation
      }

      this.models.map(item => {
        if(this.Solutions[i].System===item.System&&this.Solutions[i].SystemType===item.SystemType&&this.Solutions[i].SubSystem===item.SubSystem&&this.Solutions[i].Orientation===item.Orientation&&!this.Solutions[i].SubOrientation)
        {
            Code = item.Code
            ModelImage = item.imageSORIpath
        }

        if(this.Solutions[i].System===item.System&&this.Solutions[i].SystemType===item.SystemType&&this.Solutions[i].SubSystem===item.SubSystem&&this.Solutions[i].SubOrientation===item.SubOrientation&&this.Solutions[i].Orientation===item.Orientation)
        {
         Code = item.Code
         ModelImage = item.imageSORIpath
        }
       })

       for(var j = 0 ; j <Number(this.Solutions[i].Quantity);j++)
       {
       
        this.count = this.count + 1

        let Sno : string;
        if(j<2&&this.Solutions[i].Quantity==="1")
        {
          Sno = (i+1).toString()  
        }

        if(this.Solutions[i].Quantity!=="1")
        {
          Sno = (i+1).toString() + "." + (j+1).toString()
        }

        let innerglass : string;
        let OuterGlass : string;
 
        if(this.Solutions[i].GlassVariant)
        {
         innerglass = this.Solutions[i].GlassVariant;
        }
        if(!this.Solutions[i].GlassVariant)
        {
         innerglass = this.Solutions[i].GlassFinish;
        }
 
       if(this.Solutions[i].OuterGlassVariant)
       {
         OuterGlass = this.Solutions[i].OuterGlassVariant
       }
 
       if(!this.Solutions[i].OuterGlassVariant)
       {
         OuterGlass = this.Solutions[i].OuterGlassFinish
       }
 
  
       
       

        const workcompletion : WorkCompletion = {
          Sno : Sno,
          PrintName : PrintName,
          Floor : this.Solutions[i].Floor,
          Space : this.Solutions[i].Space,
          System : this.Solutions[i].System,
          SubSystem  :this.Solutions[i].SubSystem,
          SystemType : this.Solutions[i].SystemType,
          Orientation : this.Solutions[i].Orientation,
          SubOrientation : this.Solutions[i].SubOrientation,
          Width : this.Solutions[i].Width,
          Height : this.Solutions[i].Height,
          Color : this.Solutions[i].Color,
          Grid : this.Solutions[i].Grid,
          InnerGlass : innerglass,
          OuterGlass : OuterGlass,
          ModelImage : ModelImage,
          LocationID : "project/locations/"
         

        }

        this.WorkCompletion.push(workcompletion)
       

       }

     }


     
     this.SolLen  = this.WorkCompletion.length;


     //==================Order Page Number============================
     this.RemainderOS = this.SolLen%4;
   
     let Quotient:number = (this.SolLen - this.RemainderOS) / 4;

     if(this.RemainderOS===0)
     {
       Quotient = Quotient
     }

     if(this.RemainderOS>0)
     {
       Quotient = Quotient + 1;
     }
     
     this.testRemOS = Quotient;

     for(var i = 0;i<Quotient;i++)
     {
        this.QuotientOS.push(i);
     }
    




      

    });

      });
  }

  gotodownloads()
  {
    
  }

}
