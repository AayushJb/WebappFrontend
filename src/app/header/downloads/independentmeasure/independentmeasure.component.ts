import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route } from '@angular/router';
import { SitedetailsService } from 'src/app/services/sitedetails.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Measurement } from 'src/app/shared/measurement.model';
import { Model } from 'src/app/shared/model.model';
import { Order } from 'src/app/shared/order.model';
import { Solution } from 'src/app/shared/solution.model';
import { User } from 'src/app/shared/user.model';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-independentmeasure',
  templateUrl: './independentmeasure.component.html',
  styleUrls: ['./independentmeasure.component.css']
})
export class IndependentmeasureComponent implements OnInit {

 
 
  orders : Order[] = [];
  users : User[] = [];

  HeadingString : string;
  SubHeadingString : string;

  ContactPerson : string;
  ContactPhone : string;
  AddressOne : string;
  AddressTwo : string;
  AddressThree : string;
  glassfinishes :any;
  glassvariants : any;
  handlevariant:any;
  handles :any


  ProjectName : string ;
  Location : string ;
  OrderNumber : string ;
  Architect : string ;
  Solutions : Solution[] = [];
  Associate : string ;
  Address :string ;
  PhoneNo : string ;
  EmailId : string ;
  MeasureOutput : Measurement[] = [];
  models : Model[] =[];

  SolLen : number;
  RemainderOS : number;
  testRemOS : number;
  QuotientOS : number[] = [];

  constructor(public wqgformService : WqgformService,public sitedetailsservice : SitedetailsService, public route : ActivatedRoute) { }

  ngOnInit(): void {


    
    this.route.data.subscribe((response)=>{
      this.models = response.models.models
     })
     
    // ============GET GENERAL SETTINGS=======

    this.wqgformService.getUsers().subscribe((usersData)=>{
      this.users = usersData.users;     
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
          this.AddressThree = item.AddressLineThree
             
         }
     
        })
   
       })



     for(var i=0;i<this.Solutions.length;i++)
     {

      let Code: string = "";
      let MeasurementImage : string = "";

      let HeadingString : string;
      let SubHeadingString : string;
      let PrintName : string;

      if(!this.Solutions[i].SubOrientation)
      {
        PrintName = this.Solutions[i].Orientation
      }

      if(this.Solutions[i].SubOrientation)
      {
        PrintName = this.Solutions[i].SubOrientation
      }


       
      if(this.Solutions[i].SubSystem=="NONE")
      {
       
        SubHeadingString = this.Solutions[i].System+"/"+this.Solutions[i].SystemType+"/"+PrintName
       
      }
      
      if(this.Solutions[i].SystemType=="NONE")
      {
       
        SubHeadingString = this.Solutions[i].System+"/"+this.Solutions[i].SubSystem+"/"+PrintName
       
      }
      
      
      if(this.Solutions[i].SubSystem!=="NONE"&&this.Solutions[i].SystemType!=="NONE")
      {
       
        SubHeadingString = this.Solutions[i].System+"/"+this.Solutions[i].SubSystem+"/"+this.Solutions[i].SystemType+"/"+PrintName
       
      }
 
    

      this.models.map(item => {
       
        if(this.Solutions[i].System===item.System&&this.Solutions[i].SubSystem===item.SubSystem&&this.Solutions[i].Orientation===item.Orientation&&!this.Solutions[i].SubOrientation)
         {
            Code = item.Code
            MeasurementImage = item.imageMSpath
        }
        if(this.Solutions[i].System===item.System&&this.Solutions[i].SubSystem===item.SubSystem&&this.Solutions[i].SubOrientation===item.SubOrientation)
        {
         
         Code = item.Code
         MeasurementImage = item.imageMSpath
        }
       })

       for(var j = 0 ; j <Number(this.Solutions[i].Quantity);j++)
       {
       

        let Sno : string;
        if(j<1)
        {
          Sno = (i+1).toString()  
        }

        if(j>=1)
        {
          Sno = (i+1).toString() + "." + (j+1).toString()
        }

       
       HeadingString = Sno + "/" + this.Solutions[i].Space + "/" + this.Solutions[i].Floor;
      
        

        const measurement : Measurement = {
          Sno : Sno,
          HeadingString : HeadingString,
          SubHeadingString : SubHeadingString,
          PrintName : PrintName,
          Floor : this.Solutions[i].Floor,
          Space : this.Solutions[i].Space,
          System : this.Solutions[i].System,
          SubSystem  : this.Solutions[i].SubSystem,
          SystemType : this.Solutions[i].SystemType,
          Orientation : this.Solutions[i].Orientation,
          SubOrientation : this.Solutions[i].SubOrientation,
          Code : Code,
          Width : this.Solutions[i].Width,
          Height : this.Solutions[i].Height,
          Color : this.Solutions[i].Color,
          InnerGlass : this.Solutions[i].GlassFinish,
          OuterGlass : this.Solutions[i].OuterGlassFinish,
          Grid : this.Solutions[i].Grid,
          Handle : this.Solutions[i].Handle,
          DoorCloser : this.Solutions[i].DoorCloser,
          DropSeal : this.Solutions[i].DropSeal,
          Lock : this.Solutions[i].Lock,
          MeasurementImage : MeasurementImage

        }

        this.MeasureOutput.push(measurement)
     

       }




     }


 


      



    
      

      //=============================================Infinite Solution================================================================
      //=============================================================================================================

   
     
      this.SolLen  = this.MeasureOutput.length;


      //==================Order Page Number============================
      this.RemainderOS = this.SolLen%12;
    
      let Quotient:number = (this.SolLen - this.RemainderOS) / 12;

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
  

}
