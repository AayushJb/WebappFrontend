import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlassonlyService } from 'src/app/services/glassonly.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Glassonlyfinish } from 'src/app/shared/glassonlyfinish.model';
import { GlassOrder } from 'src/app/shared/glassorder.model';
import { GlassOutput } from 'src/app/shared/glassoutput.model';
import { GlassSolution } from 'src/app/shared/glasssolution.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-glasspresentation',
  templateUrl: './glasspresentation.component.html',
  styleUrls: ['./glasspresentation.component.css','./style.component.css']
})
export class GlasspresentationComponent {

  orderId : string;
  OrderCounter : string;
  Version : string;
  glassorders : GlassOrder;
  glassoutput : GlassOutput[] = [];
  ProjectName: string;
  ClientName : string;
  Location : string;
  OrderNumber : string;
  Architect : string;
  GSTProj : string;
  GST : string;
  Packing : string;
  Freight : string;
  OtherCharges : string;
  TempCharges : string
  GSTValue : string;
  Profile : string;
  InsuranceCost : string; 



  Associate : string;
  GrandTotal : string;
  FinalAmount : string;
  Discount : string;
  DiscountValue : string;
  Advance : string;
  PipeLineDate : string;
  WinDate : string;
  GLNumberFlag : boolean = false;
  OrderPieces : string;
  OrderSquarefeet : string;
  OrderWeight : string


  Address : string; 
  PhoneNo : string; 
  EmailId : string; 
  BeneficiaryName  : string; 
  AccountNo  : string; 
  IfscCode  : string; 
  Swift  : string; 

  testRemOS  : number;
  testRemEP : number;
  chargable : number;

//  GlassOutputTemp : GlassConfigOutput[] = [];


  Solutions : GlassSolution[] = [];
  private glassordersSub : Subscription;
  SolLen : number = 0;
  QuotientOS : number[] = [];
  QuotientEP : number[] = [];
  RemainderArray = [];
  RemainderOS : number = 0;
  RemainderEP : number = 0;
  htmlOS = '';

 
  users : User[] = [];
 
  glassonlyfinishes : Glassonlyfinish[] = [];

  constructor( public glassonlyService : GlassonlyService, public route : ActivatedRoute , public wqgformService : WqgformService ) { }



  ngOnInit(): void {

    //=============================GET REQUIREMENTS FOR PRESENTATION===============================================
    //=============================GET REQUIREMENTS FOR PRESENTATION===============================================
    

    //===============GET GENERAL SETTINGS=======

    this.wqgformService.getUsers().subscribe((usersData)=>{
      this.users = usersData.users;     
     });


 
  
 

    //============GET GLASS FINISHES=============
    
     this.route.data.subscribe((glassonlyfinishData)=>{

     
     this.glassonlyfinishes = glassonlyfinishData.glassonlyfinishes.glassonlyfinish;
     });

   
   


  //=============================================================================================================
  //=============================================================================================================



  
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      let Id = paramMap.get('id');



      this.glassonlyService.getGlassOrder(Id).subscribe((orderData:GlassOrder)=>{

       


        let OrderProjectRefNo = ""
        let Version = ""
 
        if(orderData.OrderNo.includes("/V-"))
        {
         let hyphen = orderData.OrderNo.lastIndexOf("/V-");
         let tempproref = orderData.OrderNo.substring(0, hyphen);
         let slash = tempproref.lastIndexOf("/");
         let proref = tempproref.substring(slash + 1, hyphen); 
         Version = orderData.OrderNo.substring(hyphen + 1, orderData.OrderNo.length); 
         OrderProjectRefNo = proref + "/" + Version
        }
     
        if(!orderData.OrderNo.includes("/V-"))
        {
         let slash = orderData.OrderNo.lastIndexOf("/");
         let proref = orderData.OrderNo.substring(slash+ 1, orderData.OrderNo.length);
         OrderProjectRefNo = proref
        }


      this.ProjectName = orderData.ProjectName;
      this.Location = orderData.Location;
      this.OrderNumber = orderData.OrderNo;
      this.OrderCounter = OrderProjectRefNo;
      this.Version = Version 
      this.Architect = orderData.Architect;
      this.GSTProj = orderData.GST
      this.InsuranceCost = Number(orderData.InsuranceCost).toFixed(2).toString()
     
      this.ClientName = orderData.ClientName;
      this.Solutions = orderData.Solutions;
      this.Associate = orderData.Associate;
      this.GrandTotal = Number(orderData.GrandTotal).toFixed(2).toString();
      this.FinalAmount = ((Number(orderData.FinalAmount)).toFixed(2)).toString();
      this.Discount = orderData.Discount;
      this.Advance = orderData.Advance;
      this.PipeLineDate = orderData.EditDate;
      this.WinDate = orderData.WinDate;
      this.TempCharges = orderData.TempCharge.toString()

       if(orderData.DiscountPercent==="Percent")
       {
         this.DiscountValue = ((Number(this.GrandTotal)*Number(this.Discount)/100)).toFixed(2).toString();
       }

       if(orderData.DiscountPercent==="Value")
       {
         this.DiscountValue = (this.Discount).toString();
       }

       if(orderData.FreightPercent==="Percent")
       {
         this.Freight = ((Number(this.GrandTotal) - Number(this.DiscountValue) + Number(this.TempCharges) )*Number(orderData.Freight)*0.01).toFixed(2).toString()
       }

       if(orderData.FreightPercent==="Value")
       {
         this.Freight = (orderData.Freight).toString();
       }

       if(orderData.PackingPercent==="Percent")
       {
         this.Packing = ((Number(this.GrandTotal) - Number(this.DiscountValue) + Number(this.TempCharges) )*Number(orderData.Packing)*0.01).toFixed(2).toString()
       }

       if(orderData.PackingPercent==="Value")
       {
         this.Packing = (orderData.Packing).toString();
       }

       if(orderData.OtherChargesPercent==="Percent")
       {
         this.OtherCharges = ((Number(this.GrandTotal) - Number(this.DiscountValue) + Number(this.TempCharges) )*Number(orderData.OtherCharges)*0.01).toFixed(2).toString()
       }

       if(orderData.OtherChargesPercent==="Value")
       {
         this.OtherCharges = (orderData.OtherCharges).toString();
       }



      
       this.GSTValue = (((Number(this.FinalAmount)*100)/118)*0.18).toFixed(2).toString()
     
       

      
      
      this.OrderSquarefeet = Number(orderData.TotalSquareFeet).toFixed(2)
      this.OrderPieces = Number(orderData.Pieces).toFixed(0)

      this.SolLen = orderData.Solutions.length
      
      this.users.map(item =>{
        if(item.UserFullName===this.Associate)
        {
          this.Address  = item.Address;
          this.PhoneNo = item.PhoneNo;
          this.EmailId = item.EmailId;
          this.BeneficiaryName = item.BeneficiaryName;
          this.AccountNo = item.AccountNo;
          this.IfscCode = item.IfscCode;
          this.Swift = item.Swift;   
          this.Profile = item.Profile; 
          this.GST = item.GST
          this.chargable = Number(item.Chargeable)
        }
        
      });

      //============================Getting Other details into the output array from Solutions array=================
      //=============================================================================================================

   
      for(var i=0 ; i< this.Solutions.length ; i++)
      {

        let SolutionNo = i+1
        let GlassApplication = this.Solutions[i].GlassApplication
        let GlassCategory = this.Solutions[i].GlassCategory
        let GlassSubCategory = this.Solutions[i].GlassSubCategory
        let GlassFinish = this.Solutions[i].GlassFinish
        let Glassvariant = ""
        let Matte = this.Solutions[i].Matte
        let Temperable = this.Solutions[i].Tempered
        let Sizes = this.Solutions[i].Sizes
        let SizesLength = ""
        let SizesQuotient = ""
        let SizesExtra  = ""
        let GlassThumbnailImage = ""
        let GlassOrientationImage = ""
        let GlassPotraitImage = ""
        let GlassApplicationImage = ""
        let Amount = this.Solutions[i].Amount
        let TotalPieces = this.Solutions[i].Pieces
        let TotalSquarefeet = this.Solutions[i].Squarefeet
        let RatePerSqft = ""
        let GlassCode = ""
        let Remarks = ""
        if(this.Solutions[i].SolutionName)
        {
          if(this.Solutions[i].SolutionName!=="")
            {
              Remarks = this.Solutions[i].SolutionName
            }
          
           
        }
        
        let Weight = 0
        let StandardSizes = ""
        let StandardThickness = ""
        let TemperedOption = ""
        let StandardLamination = ""
        let WeightPerMetre = ""
       


        
         this.glassonlyfinishes.map(item=>{

      
          if(item.GlassVariantModelWithThickness ===this.Solutions[i].GlassVariant)
          {
       
            Glassvariant = item.GlassPrintName
            GlassThumbnailImage = item.imagethumbnailpath
            GlassOrientationImage = item.imageorientationpath
            GlassPotraitImage = item.imagepotraitpath
            GlassApplicationImage = item.imageapplicationpath
            GlassCode = item.GlassVariantModelWithThickness
            Weight = Number(this.Solutions[i].Squarefeet)*Number(item.Weigth)
            StandardSizes = item.MaxWidth+"X"+item.MaxHeight
            StandardThickness = item.Thickness
            SizesExtra = item.Label
            StandardLamination = item.Lamination
            WeightPerMetre = item.Weigth
            RatePerSqft = item.Price
          }

         })


       

    

     

        
   

    

        const outputsol: GlassOutput = {

          SolutionNo : SolutionNo.toString(),
          GlassApplication : GlassApplication,
          GlassCategory: GlassCategory,
          GlassSubCategory: GlassSubCategory,
          GlassFinish: GlassFinish,
          Glassvariant: Glassvariant,
          Matte: Matte,
          Temperable: Temperable,
          Sizes: Sizes,
          SizesLength: SizesLength,
          SizesQuotient: SizesQuotient,
          SizesExtra : SizesExtra,
          GlassThumbnailImage: GlassThumbnailImage,
          GlassOrientationImage: GlassOrientationImage,
          GlassPotraitImage: GlassPotraitImage,
          GlassApplicationImage: GlassApplicationImage,
          Amount: Number(Amount).toFixed(2).toString(),
          TotalPieces: TotalPieces,
          TotalSquarefeet: TotalSquarefeet,
          RatePerSqft: RatePerSqft,
          GlassCode: GlassCode,
          Remarks: Remarks,
          Weight: Weight.toString(),
          StandardSizes: StandardSizes,
          StandardThickness: StandardThickness,
          TemperedOption: TemperedOption,
          StandardLamination: StandardLamination,
          WeightPerMetre: WeightPerMetre

        }
     
       this.glassoutput.push(outputsol)

       console.log(this.glassoutput)


      }

      this.RemainderEP = this.SolLen%4

      let QuotientEPage:number = (this.SolLen - this.RemainderEP) / 4;
      if(this.RemainderEP===0)
      {
        QuotientEPage = QuotientEPage
      }

      if(this.RemainderEP>0)
      {
        QuotientEPage = QuotientEPage + 1;
      }

      this.testRemEP = this.testRemOS + this.glassoutput.length*2

      for(var j = 0;j<QuotientEPage;j++)
      {
          this.QuotientEP.push(j);
      }


      


      });

      });




  
















  
    }




  



}
