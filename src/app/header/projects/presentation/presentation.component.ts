import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Order } from 'src/app/shared/order.model';
import { Solution } from 'src/app/shared/solution.model';
import { Output }  from  'src/app/shared/output.model';
import { Model } from 'src/app/shared/model.model';
import { Color } from 'src/app/shared/color.model';
import { Handle } from 'src/app/shared/handle.model';
import { Handlevariant } from 'src/app/shared/handlevariant.model';
import { Glassvariant } from 'src/app/shared/glassvariant.model';
import { Glassfinish } from 'src/app/shared/glassfinish.model';
import { HandleService } from 'src/app/services/handle.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/shared/user.model';
import { ConfigOutput } from 'src/app/shared/configout.model';
import { Grid } from 'src/app/shared/grid.model';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./style.component.css','./presentation.component.css']
})
export class PresentationComponent implements OnInit  {


  orderId : string;
  orders : Order;
  output : Output[] = [];
  ProjectName: string;
  Location : string;
  OrderNumber : string;
  Architect : string;
  Associate : string;
  GrandTotal : string;
  FinalAmount : string;
  Discount : string;
  DiscountValue : string;
  Advance : string;
  PipeLineDate : string;
  WinDate : string;
  GLNumberFlag : boolean = false;

  Address : string; 
  PhoneNo : string; 
  EmailId : string; 
  BeneficiaryName  : string; 
  AccountNo  : string; 
  IfscCode  : string; 
  Swift  : string; 

  testRemOS  : number;
  testRemEP : number;

   OutputTemp : ConfigOutput[] = [];


   //=============================SwingFlush hardcode===================================================
   
 


   swingimages = [
    {
      "SubOrientation" : "D-LEFT OP",
       "Handle" : "SLIM",
       "Lock" : "KEY KNOB",
       "Image" : "https://i.imgur.com/sh3VD4R.jpg"
    },
    {
      "SubOrientation" : "D-LEFT OP",
       "Handle" : "SLIM",
       "Lock" : "COIN KNOB",
       "Image" : "https://i.imgur.com/dFEqZet.jpg"
    },
    {
      "SubOrientation" : "D-LEFT OP",
       "Handle" : "SLIM",
       "Lock" : "NO",
       "Image" : "https://i.imgur.com/QrkmHhm.jpg"
    },
    {
      "SubOrientation" : "D-RIGHT OP",
       "Handle" : "SLIM",
       "Lock" : "KEY KNOB",
       "Image" : "https://i.imgur.com/7N9SILd.jpg"
    },
    {
      "SubOrientation" : "D-RIGHT OP",
       "Handle" : "SLIM",
       "Lock" : "COIN KNOB",
       "Image" : "https://i.imgur.com/KMIGWtR.jpg"
    },
    {
      "SubOrientation" : "D-RIGHT OP",
       "Handle" : "SLIM",
       "Lock" : "NO",
       "Image" : "https://i.imgur.com/OzIKr58.jpg"
    },
    {
      "SubOrientation" : "D-LEFT OP",
       "Handle" : "SQUARE SLIM",
       "Lock" : "KEY KNOB",
       "Image" : "https://i.imgur.com/mnQxRkS.jpg"
    },
    {
      "SubOrientation" : "D-LEFT OP",
       "Handle" : "SQUARE SLIM",
       "Lock" : "COIN KNOB",
       "Image" : "https://i.imgur.com/oapJLGC.jpg"
    },
    {
      "SubOrientation" : "D-LEFT OP",
       "Handle" : "SQUARE SLIM",
       "Lock" : "NO",
       "Image" : "https://i.imgur.com/VlxbR9h.jpg"
    },
    {
      "SubOrientation" : "D-RIGHT OP",
       "Handle" : "SQUARE SLIM",
       "Lock" : "KEY KNOB",
       "Image" : "https://i.imgur.com/z1ViHoH.jpg"
    },
    {
      "SubOrientation" : "D-RIGHT OP",
       "Handle" : "SQUARE SLIM",
       "Lock" : "COIN KNOB",
       "Image" : "https://i.imgur.com/5HpgyXr.jpg"
    },
    {
      "SubOrientation" : "D-RIGHT OP",
       "Handle" : "SQUARE SLIM",
       "Lock" : "NO",
       "Image" : "https://i.imgur.com/t6uXtPP.jpg"
    },

    {
      "SubOrientation" : "D-LEFT OP",
       "Handle" : "TO BE SUPPLIED SWING",
       "Lock" : "NO",
       "Image" : "https://i.imgur.com/Qdc93Ni.jpg"
    },
    {
      "SubOrientation" : "D-RIGHT OP",
       "Handle" : "TO BE SUPPLIED SWING",
       "Lock" : "NO",
       "Image" : "https://i.imgur.com/39W1uJV.jpg"
    },

    {
      "SubOrientation" : "D-LEFT OP",
       "Handle" : "STANDARD",
       "Lock" : "NO",
       "Image" : "https://i.imgur.com/VPf0byh.jpg"
    },
    {
      "SubOrientation" : "D-RIGHT OP",
       "Handle" : "STANDARD",
       "Lock" : "NO",
       "Image" : "https://i.imgur.com/KI0KLL9.jpg"
    }
  
    
    
   ]
 

  
   //===================================================================================================

  Solutions : Solution[] = [];
  private ordersSub : Subscription;
  SolLen : number = 0;
  QuotientOS : number[] = [];
  QuotientEP : number[] = [];
  RemainderArray = [];
  RemainderOS : number = 0;
  RemainderEP : number = 0;
  htmlOS = '';

  grids : Grid[]=[];
  users : User[] = [];
  models : Model[] = [];
  colors : Color[] = [];
  handles : Handle[] = [];
  handlevariant : Handlevariant[] = [];
  glassvariants : Glassvariant[] = [];
  glassfinishes : Glassfinish[] = [];

  constructor( public wqgformService :  WqgformService, public route : ActivatedRoute ) { }



  ngOnInit(): void {

    //=============================GET REQUIREMENTS FOR PRESENTATION===============================================
    //=============================GET REQUIREMENTS FOR PRESENTATION===============================================
    

    //===============GET GENERAL SETTINGS=======

    this.wqgformService.getUsers().subscribe((usersData)=>{
      this.users = usersData.users;     
     });

    this.wqgformService.getGrids().subscribe((gridsData)=>{
      this.grids = gridsData.grids
    }) 

    //===============GET MODELS==================
    this.route.data.subscribe((modelsData)=>{
      this.models = modelsData.models.models;
    });

    //=============GET COLORS====================
    this.route.data.subscribe((colorData)=>{
      this.colors = colorData.colors.colors;
     });

    //============GET GLASS FINISHES=============
     this.route.data.subscribe((glassfinishData)=>{
     this.glassfinishes = glassfinishData.glassfinishes.glassfinishes;
     });

    //========GET GLASS VARIANTS=================
      this.route.data.subscribe((glassvariantData)=>{
      this.glassvariants = glassvariantData.glassvariants.glassvariants;
     });

    //=========GET HANDLE VARIANTS================
      this.wqgformService.getHandleVariants().subscribe((handlevariantsData)=>{
      this.handlevariant = handlevariantsData.handlevariants;
     });

    //==========GET HANDLE========================
      this.wqgformService.getHandles().subscribe((handlesData)=>{
      this.handles = handlesData.handles;
    });

   


  //=============================================================================================================
  //=============================================================================================================



  //this.ordersSub = this.wqgformService. getOrderUpdateListener().subscribe((order:any)=>{

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      let Id = paramMap.get('id');



      this.wqgformService.getOrder(Id).subscribe((orderData:Order)=>{

      this.ProjectName = orderData.ProjectName;
      this.Location = orderData.Location;
      this.OrderNumber = orderData.OrderNo;
      this.Architect = orderData.Architect;
      this.Solutions = orderData.Solutions;
      this.Associate = orderData.Associate;
      this.GrandTotal = orderData.GrandTotal;
      this.FinalAmount = (Math.ceil(Number(orderData.FinalAmount))).toString();
      this.Discount = orderData.Discount;
      this.Advance = orderData.Advance;
      this.PipeLineDate = orderData.EditDate;
      this.WinDate = orderData.WinDate;
      this.DiscountValue = (Math.ceil(Number(this.GrandTotal)*Number(this.Discount)/100)).toString();
      
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
        }
        
      });

      //============================Getting Other details into the output array from Solutions array=================
      //=============================================================================================================

      this.Solutions.map(sols =>{

         let OrientationImage :string = "";
         let ColorImage:string ="";
         let GlassFinishImage:string = "";
         let GlassVariantImage:string = "";
         let OuterGlassFinishImage:string = "";
         let OuterGlassVariantImage:string = "";
         let HandleImage:string = "";
         let HandleVariantImage:string = "";
         let PSEImage:string ="";
         let Code:string = "";
         let RefImage : string = "";
         let GlassFinishName : string = "";
         let OuterFinishName : string = "";
         let Grid : string = ""


        
         if(sols.Grid)
         {
          if(sols.Grid==="NO")
          {
            Grid =""
          }
          if(sols.Grid==="YES")
          {
            Grid = "YES"
          }
          if(sols.ProcoreField)
          {
            Grid = sols.Grid+"_"+ sols.ProcoreField


            this.grids.map((item)=>{
              if(item.GridName===sols.Grid&&item.Design===sols.ProcoreField&&item.GlassNumber==="YES")
              {
                   this.GLNumberFlag = true
              }
            })
          }

         }

         if(sols.GlassVariant)
         {
          GlassFinishName = sols.GlassVariant
         }
         if(!sols.GlassVariant)
         {
          GlassFinishName = sols.GlassFinish
         } 

         if(sols.OuterGlassVariant)
         {
          OuterFinishName = sols.OuterGlassVariant
         }
         if(!sols.OuterGlassVariant)
         {
          OuterFinishName = sols.OuterGlassFinish
         }

        this.models.map(mods=>{
      
         if(sols.System!=="WALTZ.SWING"&& sols.SubSystem!=="FLUSH")
         {
           
           if(sols.System===mods.System&&sols.SubSystem===mods.SubSystem&&sols.SystemType===mods.SystemType&&sols.Orientation===mods.Orientation&&!sols.SubOrientation)
           {
            OrientationImage = mods.imageMRIpath;
            PSEImage = mods.imagePSEpath;
            Code = mods.Code;
            RefImage = mods.imageSORIpath
           
           }

           if(sols.System===mods.System&&sols.SubSystem===mods.SubSystem&&sols.SystemType===mods.SystemType&&sols.Orientation===mods.Orientation&&sols.SubOrientation===mods.SubOrientation)
           {
            OrientationImage = mods.imageMRIpath;
            PSEImage = mods.imagePSEpath;
            Code = mods.Code;
            RefImage = mods.imageSORIpath
            
           }

         }
         if(sols.System==="WALTZ.SLIDE"&& sols.SubSystem==="FLUSH")
         {
           
           if(sols.System===mods.System&&sols.SubSystem===mods.SubSystem&&sols.SystemType===mods.SystemType&&sols.Orientation===mods.Orientation&&!sols.SubOrientation)
           {
            OrientationImage = mods.imageMRIpath;
            PSEImage = mods.imagePSEpath;
            Code = mods.Code;
            RefImage = mods.imageSORIpath
           
           }

           if(sols.System===mods.System&&sols.SubSystem===mods.SubSystem&&sols.SystemType===mods.SystemType&&sols.Orientation===mods.Orientation&&sols.SubOrientation===mods.SubOrientation)
           {
            OrientationImage = mods.imageMRIpath;
            PSEImage = mods.imagePSEpath;
            Code = mods.Code;
            RefImage = mods.imageSORIpath
            
           }

         }
         
         if(sols.System==="WALTZ.GLIDE"&& sols.SubSystem==="FLUSH")
         {
           
           if(sols.System===mods.System&&sols.SubSystem===mods.SubSystem&&sols.SystemType===mods.SystemType&&sols.Orientation===mods.Orientation&&!sols.SubOrientation)
           {
            OrientationImage = mods.imageMRIpath;
            PSEImage = mods.imagePSEpath;
            Code = mods.Code;
            RefImage = mods.imageSORIpath
           
           }

           if(sols.System===mods.System&&sols.SubSystem===mods.SubSystem&&sols.SystemType===mods.SystemType&&sols.Orientation===mods.Orientation&&sols.SubOrientation===mods.SubOrientation)
           {
            OrientationImage = mods.imageMRIpath;
            PSEImage = mods.imagePSEpath;
            Code = mods.Code;
            RefImage = mods.imageSORIpath
            
           }

         }


         if(sols.System==="WALTZ.SWING"&& sols.SubSystem==="REGULAR")
         {
           
           if(sols.System===mods.System&&sols.SubSystem===mods.SubSystem&&sols.SystemType===mods.SystemType&&sols.Orientation===mods.Orientation&&!sols.SubOrientation)
           {
            OrientationImage = mods.imageMRIpath;
            PSEImage = mods.imagePSEpath;
            Code = mods.Code;
            RefImage = mods.imageSORIpath
           
           }

           if(sols.System===mods.System&&sols.SubSystem===mods.SubSystem&&sols.SystemType===mods.SystemType&&sols.Orientation===mods.Orientation&&sols.SubOrientation===mods.SubOrientation)
           {
            OrientationImage = mods.imageMRIpath;
            PSEImage = mods.imagePSEpath;
            Code = mods.Code;
            RefImage = mods.imageSORIpath
            
           }

         }

      

         if(sols.System==="WALTZ.SWING"&& sols.SubSystem==="FLUSH")
         {

           if(sols.System===mods.System&&sols.SubSystem===mods.SubSystem&&sols.SystemType===mods.SystemType&&sols.Orientation===mods.Orientation&&!sols.SubOrientation)
           {
            OrientationImage = mods.imageMRIpath;
            PSEImage = mods.imagePSEpath;
            Code = mods.Code;
            RefImage = mods.imageSORIpath
           
           }

           if(sols.System===mods.System&&sols.SubSystem===mods.SubSystem&&sols.SystemType===mods.SystemType&&sols.Orientation===mods.Orientation&&sols.SubOrientation===mods.SubOrientation)
           {
            OrientationImage = mods.imageMRIpath;
            PSEImage = mods.imagePSEpath;
            Code = mods.Code;


            this.swingimages.map(item=>{

              if(sols.Handle !=="STANDARD")
              {
                if(sols.SubOrientation===item.SubOrientation&&sols.Handle===item.Handle&&sols.Lock===item.Lock)
              {
                RefImage = item.Image
                console.log(RefImage)
              }
              }
             
              if(sols.Handle ==="STANDARD")
              {
              if(sols.SubOrientation===item.SubOrientation&&sols.Handle===item.Handle)
              {
                RefImage = item.Image
                console.log(RefImage)
              }
             }
            })



            


            
           }

         }




         });

         this.colors.map(cols=>{
          if(sols.Color===cols.Color)
          {
           ColorImage = cols.imagePath
          }
         });

         this.glassfinishes.map(fins =>{
           if(fins.GlassModel===sols.GlassFinish)
           {
              GlassFinishImage = fins.imagePath;
           }
           if(fins.GlassModel===sols.OuterGlassFinish)
           {
             OuterGlassFinishImage = fins.imagePath;
           }
         });

         this.glassvariants.map(vars =>{
           if(vars.GlassVariantModel===sols.GlassVariant)
           {
             GlassVariantImage = vars.imagePath;
           }
           if(vars.GlassVariantModel===sols.OuterGlassVariant)
           {
             OuterGlassVariantImage = vars.imagePath;
           }
         });

         this.handles.map(han =>{
           if(sols.Handle===han.Handle)
           {
             HandleImage = han.imagePath;
           }
         });

         this.handlevariant.map(hanvar=>{
           if(sols.HandleVariant===hanvar.HandleVariant)
           {
             HandleVariantImage=hanvar.HandleVariant;
           }
         });

         let PerAmount = Math.ceil(Number(sols.Amount)/Number(sols.Quantity))
        
         let HandleString =""
         if(sols.Handle==="TO BE SUPPLIED 2.0"||sols.Handle==="TO BE SUPPLIED GLIDE REG"||sols.Handle==="TO BE SUPPLIED GLIDE FLU"||sols.Handle==="TO BE SUPPLIED NXT"||sols.Handle==="TO BE SUPPLIED SWING REG"||sols.Handle==="TO BE SUPPLIED SWING")
         {
          HandleString = "TO BE SUPPLIED"
         }else{
          HandleString= sols.Handle
         }

         let LockString = "";

         if(sols.Lock)
         {
          if(sols.Lock!=="NO")
          {
            LockString = sols.Lock
          }
         }


        const outputsol: Output = {

          SolutionNo : sols.SolutionNo,
          Floor : sols.Floor,
          Space : sols.Space,
          System : sols.System,
          SubSystem : sols.SubSystem,
          SystemType : sols.SystemType,
          Orientation : sols.Orientation,
          OrientationImage : OrientationImage,
          SubOrientation : sols.SubOrientation,
          SubOrientatioImage : "https://i.imgur.com/ExRvQVo.jpg",
          RefImage : RefImage,
          Code : Code,
          PSEImage : PSEImage,
          Grid  : Grid,
          Width : sols.Width,
          Height : sols.Height,
          Quantity : sols.Quantity,
          Color : sols.Color,
          ColorImage : ColorImage,
          GlassCategory : sols.GlassCategory,
          GlassSubCategory : sols.GlassCategory,
          GlassFinish : GlassFinishName,
          GlassFinishImage : GlassFinishImage,
          GlassVariant : sols.GlassVariant,
          GlassVariantImage : GlassVariantImage,
          Matte : sols.Matte,
          OuterGlassCategory : sols.OuterGlassCategory,
          OuterGlassSubCategory : sols.OuterGlassSubCategory,
          OuterGlassFinish : OuterFinishName,
          OuterGlassFinishImage : OuterGlassFinishImage,
          OuterGlassVariant : sols.OuterGlassVariant,
          OuterGlassVariantImage : OuterGlassVariantImage,
          OuterMatte : sols.OuterMatte,
          Handle : HandleString,
          HandleImage : HandleImage,
          HandleVariant : sols.HandleVariant,
          HandleVariantImage : HandleVariantImage,
          DoorCloser : sols.DoorCloser,
          DropSeal : sols.DropSeal,
          Lock  :LockString,
          Remarks : sols.Remarks,
          SystemRemarks : PerAmount.toString(),
          Amount : sols.Amount,
          GridNumberFlag : this.GLNumberFlag

        }
     
       this.output.push(outputsol)

       console.log(this.output)


      });


      //=============================================Infinite Solution================================================================
      //=============================================================================================================

      
      //=================Combining Config Pages=====================================
    

      
      for(var m = 0 ; m<this.output.length ; m++)
      {
        
        var duplicate = false;
        for(var n = 0 ; n<this.OutputTemp.length; n++)
            {
              
              if(this.output[m].System===this.OutputTemp[n].System&&this.output[m].SubSystem===this.OutputTemp[n].SubSystem&&this.output[m].SystemType===this.OutputTemp[n].SystemType&&this.output[m].Orientation===this.OutputTemp[n].Orientation&&this.output[m].SubOrientation===this.OutputTemp[n].SubOrientation&&this.output[m].GlassFinish===this.OutputTemp[n].GlassFinish&&this.output[m].OuterGlassFinish===this.OutputTemp[n].OuterGlassFinish&&this.output[m].Handle===this.OutputTemp[n].Handle&&this.output[m].DoorCloser===this.OutputTemp[n].DoorCloser&&this.output[m].Grid===this.OutputTemp[n].Grid&&this.output[m].DropSeal===this.OutputTemp[n].DropSeal&&this.output[m].Color===this.OutputTemp[n].Color&&this.output[m].Lock===this.OutputTemp[n].Lock)
              { 
                duplicate = true; 
              }  
                       
            }      
       if(duplicate == false){
        
         const Temp : ConfigOutput = {
          System : this.output[m].System,
          SubSystem : this.output[m].SubSystem,
          SystemType : this.output[m].SystemType,
          Orientation : this.output[m].Orientation,
          OrientationImage : this.output[m].OrientationImage,
          SubOrientation : this.output[m].SubOrientation,
          SubOrientatioImage : this.output[m].SubOrientatioImage,
          RefImage :this.output[m].RefImage,
          Code : this.output[m].Code,
          PSEImage : this.output[m].PSEImage,
          Grid  : this.output[m].Grid,
          Width : this.output[m].Width,
          Height : this.output[m].Height,
          Quantity : this.output[m].Quantity,
          Color : this.output[m].Color,
          ColorImage : this.output[m].ColorImage,
          GlassCategory : this.output[m].GlassCategory,
          GlassSubCategory : this.output[m].GlassSubCategory,
          GlassFinish : this.output[m].GlassFinish,
          GlassFinishImage : this.output[m].GlassFinishImage,
          GlassVariant : this.output[m].GlassVariant,
          GlassVariantImage : this.output[m].GlassVariantImage,
          Matte : this.output[m].Matte,
          OuterGlassCategory : this.output[m].OuterGlassCategory,
          OuterGlassSubCategory : this.output[m].OuterGlassSubCategory,
          OuterGlassFinish : this.output[m].OuterGlassFinish,
          OuterGlassFinishImage : this.output[m].OuterGlassFinishImage,
          OuterGlassVariant : this.output[m].OuterGlassVariant,
          OuterGlassVariantImage : this.output[m].OuterGlassVariantImage,
          OuterMatte : this.output[m].OuterMatte,
          Handle : this.output[m].Handle,
          HandleImage : this.output[m].HandleImage,
          HandleVariant : this.output[m].HandleVariant,
          HandleVariantImage : this.output[m].HandleVariantImage,
          DoorCloser : this.output[m].DoorCloser,
          DropSeal : this.output[m].DropSeal,
          Lock  : this.output[m].Lock,
          Remarks : [],
          GridNumberFlag : this.output[m].GridNumberFlag,
         } 
        
        
        this.OutputTemp.push(Temp)
      
        }
      }

     
    
    
      for(var n = 0; n<this.OutputTemp.length; n++)
      { 
        let Flag : boolean = true;
        let NewQuant : number = 0;
        let Count : number = 0;
        let remarks : string[]  = [];

        for(var k = 0 ; k<this.output.length ; k++)
        { 
          if(this.output[k].System===this.OutputTemp[n].System&&this.output[k].SubSystem===this.OutputTemp[n].SubSystem&&this.output[k].SystemType===this.OutputTemp[n].SystemType&&this.output[k].Orientation===this.OutputTemp[n].Orientation&&this.output[k].SubOrientation===this.OutputTemp[n].SubOrientation&&this.output[k].GlassFinish===this.OutputTemp[n].GlassFinish&&this.output[k].OuterGlassFinish===this.OutputTemp[n].OuterGlassFinish&&this.output[k].Handle===this.OutputTemp[n].Handle&&this.output[k].DoorCloser===this.OutputTemp[n].DoorCloser&&this.output[k].Grid===this.OutputTemp[n].Grid&&this.output[k].DropSeal===this.OutputTemp[n].DropSeal&&this.output[k].Color===this.OutputTemp[n].Color&&this.output[k].Lock===this.OutputTemp[n].Lock)
               { 
                 NewQuant = NewQuant + Number(this.output[k].Quantity)
                 Count = Count + 1;
                 Flag = false;
                 let rem = '';
                 if(this.output[k].Remarks)
                 {
                   rem= this.output[k].Floor + ","+this.output[k].Space +","+ this.output[k].Width+ "X"+ this.output[k].Height + ",Qty:"+this.output[k].Quantity + ",Remarks:" + this.output[k].Remarks
                 }

                 if(!this.output[k].Remarks)
                 {
                   rem= this.output[k].Floor + ","+this.output[k].Space +","+ this.output[k].Width+ "X"+ this.output[k].Height + ",Qty:"+this.output[k].Quantity
                 }

                 remarks.push(rem)

                } 

        }

        this.OutputTemp[n].Quantity = NewQuant.toString();
        this.OutputTemp[n].Remarks = remarks
       
      }

     
      //============================================================================
     
      this.SolLen  = this.output.length;


      //==================Order Page Number============================
      this.RemainderOS = this.SolLen%9;
    
      let Quotient:number = (this.SolLen - this.RemainderOS) / 9;
      
      this.testRemOS = Quotient;

      for(var i = 0;i<Quotient;i++)
      {
         this.QuotientOS.push(i);
      }
     
     

      

      //===============ESTIMATE PAGE====================================
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

      this.testRemEP = this.testRemOS + this.OutputTemp.length*2

      for(var j = 0;j<QuotientEPage;j++)
      {
          this.QuotientEP.push(j);
      }


      });

      });




  
  
    }




    onPrint(divName) {
      const printContents = document.getElementById(divName).innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }










}























