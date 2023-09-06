import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GlassonlyService } from 'src/app/services/glassonly.service';
import { ProcoreService } from 'src/app/services/procore.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/user.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Solution } from 'src/app/shared/solution.model';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule,FormBuilder, FormArray,} from '@angular/forms';
import { Glassfinish } from 'src/app/shared/glassfinish.model';
import { Glasssubcat } from 'src/app/shared/glasssubcat.model';
import { Glasscat } from 'src/app/shared/glasscat.model';
import { Glassvariant } from 'src/app/shared/glassvariant.model';
import { User } from 'src/app/shared/user.model';
import { GeneralSetting } from 'src/app/shared/generalsetting.model';
import { GlassSolution } from 'src/app/shared/glasssolution.model';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Glassonlyfinish } from 'src/app/shared/glassonlyfinish.model';
import { ReactivetableComponent } from './reactivetable/reactivetable.component';

@Component({
  selector: 'app-glassonly',
  templateUrl: './glassonly.component.html',
  styleUrls: ['./glassonly.component.css']
})
export class GlassonlyComponent {



  rows: FormGroup[] = [];
  serialNumber: number = 1;

  TempCharge : number = 0;
  Packing :number = 0;
  Freight : number = 0;
  OtherCharges : number = 0; 
  Chargable : number = 0;

  Dispercent : boolean = true;
  DisValue : boolean = false;

  Frepercent : boolean = true;
  FreValue : boolean = false;

  Pacpercent : boolean = true;
  PacValue : boolean = false;

  Othpercent : boolean = true;
  OthValue : boolean = false;




  

  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;
  ActualProfile  : string; 

  WaltzOrderNo : string;
  ProjectName : string;
  OrderNumber : string;
  ClientName : string;
  Location : string;
  Architect : string;
  GST :string;
  Source : string;
  OfficeID : string;
  OrderCompleted : string;
  form : FormGroup;
  formOr : FormGroup;
  showSpinner : boolean = true;
  matteonly : boolean = false;


  ActualUserFullName : string;
  userID :string;

  
  public formMode = "newOrder"
  private mode = 'solutions';
  public modeButtons = 'Addnew';
  public modeOrder = 'AddOrders';


  public solutionname : boolean =false;



  public procoreID : string;

  public EditSpace : number = null;

  public orderId :string;
  private ordersSub : Subscription;
  public orders = [];

  Factor: number;
  generalsettings : GeneralSetting;
  GlassSolutions : GlassSolution[] =[];
  ProjectDetailsForm : boolean = true;
  SolutionForm : boolean = false;
  TablesForm : boolean = false;

  formSelectSol : FormGroup;
  orderStatus : string;

  thicknessrangedrop : number[] = []






  subscription : Subscription[] = [];

  public maxDiscount : number;
  DiscountArray: number[] = [];
  AdvanceArray:number[] = [];
  users :User[] = [];

  maxWidth:string = '';
  maxHeight:string = '';

 
  OuterMatte : boolean = false;

  Matte : boolean = false;
  Temperable : boolean = false;
  MatteOptions : string[] = [];
  TemperedOPtions : string[] = [];

  doorCloser : boolean = false;
  dropSeal : boolean = false;

  GlassVariant : boolean = false;
  OuterGlassVariant : boolean = false;
  Flush : boolean = false;

  DealerDiscount : string;
  glassfinishes : Glassfinish[] = [];

  selectedGlassFinish = [];
  staticGlassFinish = [];
  glassSubCatTemp = [];

  glassonlyfinishes : Glassonlyfinish[] = [];

  glassvariants : Glassvariant[] = [];
  selectedGlassVariant = [];
  staticGlassVariant = [];

  glasscats : Glasscat[] = [];
  selectedGlasscats = [];

  glasssubcats : Glasssubcat[] = [];
  selectedGlasssubcats = [];
  glasssubcatsTemp = [];


 
  temperableonly: boolean  = false;


  thicknessRange : string[] = []

  
  public winstatus : boolean = false;

  myForm: FormGroup;



  public initialData : any[] = [
    {
        "Width": 65,
        "Height": 54,
        "Quantity": 654
    },
    {
      
        "Width": 54,
        "Height": 6545,
        "Quantity": 645
    },
    {
     
        "Width": 654,
        "Height": 654,
        "Quantity": 56
    },
    {
       
        "Width": 654,
        "Height": 654,
        "Quantity": 6
    }
]

 public maxheight : number
 public maxwidth : number 

selectedGlassOption: any;

 





  constructor( public wqgformService : WqgformService ,
    public glassonlyservice : GlassonlyService,
    public route : ActivatedRoute,
    private userService : UsersService,
    public projectService : ProjectsService,
    private snackbar : MatSnackBar,
    public procoreService : ProcoreService,
    private dialog : MatDialog,
    private formBuilder: FormBuilder
   ) { }


     ngOnInit(): void {

      this.formOr = new FormGroup({
        Discount :new FormControl(0,{validators:[Validators.required]}),
        DiscountPercent : new FormControl("Percent",{validators:[Validators.required]}),
        Freight :new FormControl(0,{validators:[Validators.required]}),
        FreightPercent : new FormControl("Percent",{validators:[Validators.required]}),
        Packing :new FormControl(0,{validators:[Validators.required]}),
        PackingPercent : new FormControl("Percent",{validators:[Validators.required]}),
        OtherCharges :new FormControl(0,{validators:[Validators.required]}),
        OtherChargesPercent :new FormControl("Percent",{validators:[Validators.required]}),
        Insurance :new FormControl("NO",{validators:[Validators.required]}),
        Advance :new FormControl(100,{validators:[Validators.required]})
      });

      this.form = new FormGroup({
        'SolutionName' : new FormControl(null),
        'GlassApplication' : new FormControl('KITCHEN',{validators:[Validators.required]}),
        'GlassCategory' : new FormControl(null,{validators:[Validators.required]}),
        'GlassSubCategory' : new FormControl(null,{validators:[Validators.required]}),
        'ThicknessFrom' : new FormControl(null,{validators:[Validators.required]}),
        'ThicknessTo' : new FormControl(null,{validators:[Validators.required]}),
        'GlassFinish' : new FormControl(null,{validators:[Validators.required]}),
        'GlassVariant' : new FormControl(null,{validators:[Validators.required]}),
        'Tempered' : new FormControl(null,{validators:[Validators.required]}),
        'Matte' : new FormControl(null,{validators:[Validators.required]})
     
      });
  



 

      //======================================CHECKING WHETHER IN EDIT MODE OR NEW FORM=====================================
      this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('orderId')) {
  
       let formStatus : string;
       
       this.orderId = paramMap.get('orderId');
  
       this.projectService.getGlassOrder(this.orderId).subscribe(orderData=>{
   
          
       this.glassonlyservice.GlassSolutions = orderData.Solutions;
       this.glassonlyservice.PrevOrder = orderData;

  
       
  
    
       this.orderStatus = orderData.Status;
       this.OrderCompleted = orderData.Completed;
       this.ActualUserFullName = orderData.Associate;
  
       formStatus = orderData.Completed;
  
  
       if(formStatus!=="NO"){
        this.formMode  = 'editOrder';
        }
   
        if(formStatus==="NO")
        {
         this.formMode  = 'newOrder';
        }
      
        
       this.GlassSolutions = this.glassonlyservice.GlassSolutions;
       this.WaltzOrderNo = orderData.WaltzOrderNo;
       this.ProjectName = orderData.ProjectName;
       this.OrderNumber = orderData.OrderNo;
       this.ClientName = orderData.ClientName;
       this.Location = orderData.Location;
       this.Architect = orderData.Architect;
       this.Source = orderData.Source;
       this.GST = orderData.GST;
      
       if(orderData.Status==="Win")
       {
        this.winstatus = true;
       }
  
       if(orderData.Status==="Old Win")
       {
        this.winstatus = true;
       }
  
       if(orderData.Status==="Commercial Hold")
       {
        this.winstatus = true;
       }
  
       if(orderData.Status==="Pipeline")
       {
        this.winstatus = false;
       }

      
  
  
       this.formOr.patchValue({'ProjectName':orderData.ProjectName});
       this.formOr.patchValue({'ClientName':orderData.ClientName});
       this.formOr.patchValue({'Location':orderData.Location});
       this.formOr.patchValue({'Architect':orderData.Architect});
       this.formOr.patchValue({'Source':orderData.Source});
       this.formOr.patchValue({'DiscountPercent':orderData.DiscountPercent});
       this.formOr.patchValue({'Discount':orderData.Discount});
       this.formOr.patchValue({'FreightPercent':orderData.FreightPercent});
       this.formOr.patchValue({'Freight':orderData.Freight});
       this.formOr.patchValue({'PackingPercent':orderData.PackingPercent});
       this.formOr.patchValue({'Packing':orderData.Packing});
       this.formOr.patchValue({'OtherChargesPercent':orderData.OtherChargesPercent});
       this.formOr.patchValue({'OtherCharges':orderData.OtherCharges});
       this.formOr.patchValue({'Insurance':orderData.Insurance});
   
  
     
  
       this.ProjectDetailsForm = false;
       this.SolutionForm = false;
       this.TablesForm = true;
       this.modeButtons = 'Addnew';
       this.showSpinner  = false;
  
       });
      
      
  
      }else{
  
       this.formMode = 'newOrder';
       this.glassonlyservice.GlassSolutions = [];
       this.orderId = null;
      }


     
     
     });
  
     
 
      //===============Getting the User and MaxDiscount Value==========================================
      this.userIsAuthenticated = this.userService.getIsAuth();
      this.UserFullName = this.userService.getUserFullName();
      this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
      this.UserFullName = this.userService.getUserFullName();
      
      });
     
   //=====================FOR Discount=============================
      this.wqgformService.getUsers().subscribe((userData)=>{
        userData.users.map(item =>{
           
         if(item.UserFullName===this.UserFullName)
         {
          this.maxDiscount = Number(item.MaxDiscount)
          this.DealerDiscount = (item.DealerDiscount);
          this.OfficeID = item.ProcoreOfficeID;
          this.ActualProfile = item.Profile;
         }
         
         if(item.UserFullName===this.ActualUserFullName)
         {
          this.userID  =item.EmailId; 
          this.TempCharge  = Number(item.TempCharge)
          this.Packing  = Number(item.Packing)
          this.Freight  = Number(item.FreightGlass)
          this.OtherCharges = Number(item.OtherCharge)
          this.Chargable = Number(item.Chargeable)
  
         }
        
  
        });
        for(var i = 0; i<=this.maxDiscount;i++)
        {
          this.DiscountArray.push(i);
        }
       });
     
      for(var j = 0; j<=100;j++)
      {
        this.AdvanceArray.push(j);
      }
     

      this.rows = [];
    
      this.addRow()
      
    
  
  
  //===========================================================================================================================
  //===============================KITCHEN FUNCTIONS===========================================================================
  //===========================================================================================================================
  
      
  combineLatest({

    subscription0 : this.glassonlyservice.getGlassOnlyFinishes(),

    subscription1 : this.glassonlyservice.getGeneralSetting(),

    subscription2 : this.glassonlyservice.getGlasscats(),
    
    subscription3 : this.glassonlyservice.getGlasssubcats(),

    subscription4 : this.glassonlyservice.getGlassfinishes(),

    subscription5 : this.glassonlyservice.getGlassVariants()



  }).subscribe((response)=>{

   
    this.glassonlyfinishes = response.subscription0.glassonlyfinish;
    this.Factor = Number(response.subscription1.GlassFactor);
    this.glasscats = response.subscription2.glasscats;
    this.glasssubcats = response.subscription3.glasssubcats;
    this.glassvariants = response.subscription5.glassvariants; 


    /*
    response.subscription4.glassfinishes.map((item)=>{
      if(item.Status==="ACTIVE")
      {
        this.glassfinishes.push(item)
        
      }
    })
   */
 
    this.selectedGlasscats = []

    this.glassonlyfinishes.map(item =>{
     if(!this.selectedGlasscats.includes(item.GlassCategory))
      {
        
        {
          this.selectedGlasscats.push(item.GlassCategory)
        }
        
      }
    })


    console.log(this.selectedGlasscats)
    
    //======================================INITIALIZE FORM======================================================
       
     if(this.mode)
     {



      this.form.patchValue({'GlassCategory':"TRANSLUCENT"});
      this.form.patchValue({'GlassSubCategory':"WIREMESH"});
    
 
      this.selectedGlassFinish =[];
      this.form.patchValue({'GlassFinish':null});
      this.staticGlassFinish =[];
      this.selectedGlassVariant =[];
      this.form.patchValue({'GlassVariant':null});
      this.GlassVariant = false;
      this.form.get('GlassVariant').disable();
      this.Matte  = false;
      this.Temperable = false;
      this.MatteOptions = [];
      this.TemperedOPtions = [];



     
      
 
 
  
      let glassFinTemp = [];
     
  

      this.glassonlyfinishes.map((item)=>{
        if(item.GlassSubCategory==="WIREMESH")
        {
          glassFinTemp.push(item)
        }
      })
    
    
     

      this.thicknessRange = []

      for(var i = 0; i < glassFinTemp.length ; i++)
      {
         if(!this.thicknessRange.includes(glassFinTemp[i].Thickness))
         {
          this.thicknessRange.push(glassFinTemp[i].Thickness)
         }
      }

     

      const numericNumbers = this.thicknessRange.map(Number);
     
      const maxNumber = Math.max(...numericNumbers);
      const minNumber = Math.min(...numericNumbers);
 
     
 
    
     this.thicknessrangedrop = this.thicknessRange.map(Number);

     this.thicknessrangedrop.sort((a,b)=>a-b)
 
    
      this.form.patchValue({'ThicknessFrom':minNumber.toString()});
      this.form.patchValue({'ThicknessTo':maxNumber.toString()});


  




     }

 
 


    //===========================================================================================================

  })
  
  
  

  
    

     this.OnGlassCatChanges()
     this.OnGlassSubCatChanges()
     this.OnFromThicknessChanges()
     this.OnToThicknessChanges()
     this.OnSurfaceChange()
     this.OnTemperedChange()
     this.OnChangeGlass()
     this.OnDiscountchanges()
     this.OnMaxDiscountChanges()
     this.OnMaxOtherChargesChanges()
     this.OnOtherchargeschanges()
     this.OnMaxPackingChanges()
     this.OnPackingchanges()
     this.OnFreightchanges()
     this.OnMaxFreightChanges()
  
  
  }




//===================================================================================================================================
//===================================================================================================================================
//===================================================================================================================================

OnDiscountchanges()
{
  this.subscription.push(this.formOr.get('DiscountPercent').valueChanges.subscribe(response=>{

    if(response==="Value")
    {
      this.Dispercent  = false;
      this.DisValue = true;
      this.formOr.patchValue({'Discount':""});
    }
    if(response==="Percent")
    {
      this.Dispercent  = true;
      this.DisValue = false;
      this.formOr.patchValue({'Discount':""});
    }

  


  }))
}


OnMaxDiscountChanges()
{

  this.subscription.push(this.formOr.get('Discount').valueChanges.subscribe(response=>{    
    
  if(response>100&&this.Dispercent===true)
  {
 
   this.formOr.patchValue({'Discount':""});
  }

  }));

}

OnFreightchanges()
{
  this.subscription.push(this.formOr.get('FreightPercent').valueChanges.subscribe(response=>{

    if(response==="Value")
    {
      this.Frepercent  = false;
      this.FreValue = true;
      this.formOr.patchValue({'Freight':""});
    }
    if(response==="Percent")
    {
      this.Frepercent  = true;
      this.FreValue = false;
      this.formOr.patchValue({'Freight':""});
    }

  }))
}



OnMaxFreightChanges()
{

  this.subscription.push(this.formOr.get('Freight').valueChanges.subscribe(response=>{    
    
   

  if(response>100&&this.Frepercent===true)
  {
 
   this.formOr.patchValue({'Freight':""});
  }

  }));

}


OnPackingchanges()
{
  this.subscription.push(this.formOr.get('PackingPercent').valueChanges.subscribe(response=>{

    if(response==="Value")
    {
      this.Pacpercent  = false;
      this.PacValue = true;
      this.formOr.patchValue({'Packing':""});
    }
    if(response==="Percent")
    {
      this.Pacpercent  = true;
      this.PacValue = false;
      this.formOr.patchValue({'Packing':""});
    }

  


  }))
}


OnMaxPackingChanges()
{

  this.subscription.push(this.formOr.get('Packing').valueChanges.subscribe(response=>{    
    
   

  if(response>100&&this.Pacpercent===true)
  {
   this.formOr.patchValue({'Packing':""});
  }

  }));

}


OnOtherchargeschanges()
{
  this.subscription.push(this.formOr.get('OtherChargesPercent').valueChanges.subscribe(response=>{

    if(response==="Value")
    {
      this.Othpercent  = false;
      this.OthValue = true;
      this.formOr.patchValue({'OtherCharges':""});
    }
    if(response==="Percent")
    {
      this.Othpercent  = true;
      this.OthValue = false;
      this.formOr.patchValue({'OtherCharges':""});
    }

  


  }))
}


OnMaxOtherChargesChanges()
{

  this.subscription.push(this.formOr.get('OtherCharges').valueChanges.subscribe(response=>{    
    
   

  if(response>100&&this.Othpercent==true)
  {
   this.formOr.patchValue({'OtherCharges':""});
  }

  }));

}




OnFromThicknessChanges()
{
  this.subscription.push(this.form.get('ThicknessFrom').valueChanges.subscribe(response=>{

    this.selectedGlassFinish =[];
    this.form.patchValue({'GlassFinish':null});
    this.staticGlassFinish =[];
    this.selectedGlassVariant =[];
    this.form.patchValue({'GlassVariant':null});
    this.GlassVariant = false;
    this.form.get('GlassVariant').disable();
    this.Matte  = false;
    this.Temperable = false;
    this.MatteOptions = [];
    this.TemperedOPtions = [];
  
    


    let namespace = []

    this.glassonlyfinishes.map((item)=>{
      if(item.GlassSubCategory===this.form.value.GlassSubCategory&&Number(item.Thickness)>=response&&Number(item.Thickness)<=this.form.value.ThicknessTo&&item.LeadTime==="ACTIVE")
      {
        if(!namespace.includes(item.GlassFinish))
        {
          this.selectedGlassFinish.push(item)
          this.staticGlassFinish.push(item)
          namespace.push(item.GlassFinish)
        }
      }
    })



  }))
}


OnToThicknessChanges()
{
  this.subscription.push(this.form.get('ThicknessTo').valueChanges.subscribe(response=>{


    this.selectedGlassFinish =[];
    this.form.patchValue({'GlassFinish':null});
    this.staticGlassFinish =[];
    this.selectedGlassVariant =[];
    this.form.patchValue({'GlassVariant':null});
    this.GlassVariant = false;
    this.form.get('GlassVariant').disable();

    this.Matte  = false;
    this.Temperable = false;
    this.MatteOptions = [];
    this.TemperedOPtions = [];



    let namespace = []

    this.glassonlyfinishes.map((item)=>{
      if(item.GlassSubCategory===this.form.value.GlassSubCategory&&Number(item.Thickness)>=this.form.value.ThicknessFrom&&Number(item.Thickness)<=response&&item.LeadTime==="ACTIVE")
      {
        if(!namespace.includes(item.GlassFinish))
        {
          this.selectedGlassFinish.push(item)
          this.staticGlassFinish.push(item)
          namespace.push(item.GlassFinish)
        }
      }
    })




 
  }))
}


OnGlassCatChanges(){

 

  this.subscription.push(this.form.get('GlassCategory').valueChanges.subscribe(response=>{
   

    this.selectedGlassFinish =[];
    this.form.patchValue({'GlassFinish':null});
    this.staticGlassFinish =[];
    this.selectedGlassVariant =[];
    this.form.patchValue({'GlassVariant':null});
    this.GlassVariant = false;
    this.form.get('GlassVariant').disable();
    this.Matte  = false;
    this.Temperable = false;
    this.MatteOptions = [];
    this.TemperedOPtions = [];



   
    this.selectedGlasssubcats = [];
    this.staticGlassFinish =[];
    this.selectedGlassFinish = [];
    this.selectedGlassVariant =[];
    this.staticGlassVariant =[];

    


    this.form.patchValue({'GlassFinish':null});
    this.form.patchValue({'GlassVariant':null});

   
    let namespace3 = []

    this.selectedGlasscats = []

    this.glassonlyfinishes.map(item=>{
      if(item.GlassCategory===response)
      {
         if(!namespace3.includes(item.GlassSubCategory))
         {
          this.selectedGlasssubcats.push(item.GlassSubCategory)
          namespace3.push(item.GlassSubCategory)
         }
      }
    })




   
   

  this.form.patchValue({'GlassSubCategory':this.selectedGlasssubcats[0]});



  }))

}


OnGlassSubCatChanges()
{

  this.subscription.push(this.form.get('GlassSubCategory').valueChanges.subscribe(response=>{
  
    
   
 
    this.selectedGlassFinish =[];
    this.form.patchValue({'GlassFinish':null});
    this.staticGlassFinish =[];
    this.selectedGlassVariant =[];
    this.form.patchValue({'GlassVariant':null});
    this.GlassVariant = false;
    this.form.get('GlassVariant').disable();
    this.Matte  = false;
    this.Temperable = false;
    this.MatteOptions = [];
    this.TemperedOPtions = [];
 

    let glassFinTemp = [];
     
  

      this.glassonlyfinishes.map((item)=>{
        if(item.GlassSubCategory===response)
        {
          glassFinTemp.push(item)
        }
      })
    
    
     

      this.thicknessRange = []

      for(var i = 0; i < glassFinTemp.length ; i++)
      {
         if(!this.thicknessRange.includes(glassFinTemp[i].Thickness))
         {
          this.thicknessRange.push(glassFinTemp[i].Thickness)
         }
      }

     

      const numericNumbers = this.thicknessRange.map(Number);
     
      const maxNumber = Math.max(...numericNumbers);
      const minNumber = Math.min(...numericNumbers);
 
     
 
      this.thicknessrangedrop = this.thicknessRange.map(Number);

      this.thicknessrangedrop.sort((a,b)=>a-b)
    
      this.form.patchValue({'ThicknessFrom':minNumber.toString()});
      this.form.patchValue({'ThicknessTo':maxNumber.toString()});


      let namespace = []

      this.glassonlyfinishes.map((item)=>{
        if(item.GlassSubCategory===this.form.value.GlassSubCategory&&Number(item.Thickness)>=this.form.value.ThicknessFrom&&Number(item.Thickness)<=this.form.value.ThicknessTo&&item.LeadTime==="ACTIVE")
        {
          if(!namespace.includes(item.GlassFinish))
          {
            this.selectedGlassFinish.push(item)
            this.staticGlassFinish.push(item)
            namespace.push(item.GlassFinish)
          }
        }
      })





   
 

  }))

}


uncollapseGlassFinish()
{
  this.selectedGlassFinish = [];
  this.selectedGlassFinish = this.staticGlassFinish;
}


OnChangeGlass()
{
  this.subscription.push(this.form.get('GlassFinish').valueChanges.subscribe(response=>{

    this.selectedGlassFinish = [];
    this.selectedGlassVariant = [];
    this.staticGlassVariant =[];
    this.Matte  = true;
    this.Temperable = true;
    this.MatteOptions = [];
    this.TemperedOPtions = [];
    
  
  
    let namespace = []
    this.glassonlyfinishes.map(item =>{
    //=========================Collapse=============================
  
      if(item.GlassFinish===response)
       {
  
        if(!namespace.includes(item.GlassFinish))
        {
          this.selectedGlassFinish.push(item);
          namespace.push(item.GlassFinish)
        }
        
  
       }
    })
  
  
  
    this.selectedGlassVariant =[];
    this.staticGlassVariant =[];
  
  
    this.GlassVariant=true;
    let GlassVariantsTemp = [];
    this.form.patchValue({'GlassVariant':null});
    this.form.get('GlassVariant').enable();
  
   
    let GlassTemp = []
  
    let namespace2 = []

    this.glassonlyfinishes.map((item)=>{
      if(item.GlassFinish===response&&Number(item.Thickness)>=this.form.value.ThicknessFrom&&Number(item.Thickness)<=this.form.value.ThicknessTo)
      {
        if(!namespace2.includes(item))
        {
          GlassTemp.push(item)
          namespace2.push(item)
        }
       
      }
    })
  
  
    GlassTemp.map(item=>{
      if(!this.MatteOptions.includes(item.Matte))
      {
        this.MatteOptions.push(item.Matte)
      }
      if(!this.TemperedOPtions.includes(item.Temperable))
      {
        this.TemperedOPtions.push(item.Temperable)
      }
    })
  
  
    this.selectedGlassVariant =[];
    this.staticGlassVariant =[];
    this.form.patchValue({'GlassVariant':null});
    this.form.get('GlassVariant').enable();
    this.form.patchValue({'Tempered': null}); 
    this.form.patchValue({'Matte': null}); 
  
    if(this.MatteOptions.includes("GLOSS"))
    {
    //  this.form.patchValue({'Matte': "GLOSS"}); 
    }else
    {
     // this.form.patchValue({'Matte': "MATTE"});  
    }
    if(this.TemperedOPtions.includes("YES"))
    {
      //this.form.patchValue({'Tempered': "YES"}); 
    }else
    {
      //this.form.patchValue({'Tempered': "NO"}); 
    }
  
   let namespace1 = [] 

   this.selectedGlassVariant = []
   this.staticGlassVariant = []

  /*
    this.glassonlyfinishes.map((item)=>{
      if(item.GlassFinish===response&&Number(item.Thickness)>=this.form.value.ThicknessFrom&&Number(item.Thickness)<=this.form.value.ThicknessTo&&item.Matte===this.form.value.Matte&&item.Temperable===this.form.value.Tempered&&item.Status==="ACTIVE")
      {
        if(!namespace1.includes(item))
        {
        this.selectedGlassVariant.push(item)
        this.staticGlassVariant.push(item)
        namespace1.push(item)

        }
      }
    })
  */
  
    
  }))
}

/*
OnGlassFinishChanges(GlassModel:string){

  

 

  this.selectedGlassFinish = [];
  this.staticGlassVariant =[];
  this.Matte  = true;
  this.Temperable = true;
  this.MatteOptions = [];
  this.TemperedOPtions = [];
  


  console.log(GlassModel)




  
  


  let namespace = []
  this.glassonlyfinishes.map(item =>{
  //=========================Collapse=============================

    if(item.GlassFinish===GlassModel)
     {

      if(!namespace.includes(item.GlassFinish))
      {
        this.selectedGlassFinish.push(item);
        namespace.push(item.GlassFinish)
      }
      

     }
  })



  this.selectedGlassVariant =[];
  this.staticGlassVariant =[];


  this.GlassVariant=true;
  let GlassVariantsTemp = [];
  this.form.patchValue({'GlassVariant':null});
  this.form.get('GlassVariant').enable();

 
  let GlassTemp = []


  this.glassonlyfinishes.map((item)=>{
    if(item.GlassFinish===GlassModel&&Number(item.Thickness)>=this.form.value.ThicknessFrom&&Number(item.Thickness)<=this.form.value.ThicknessTo)
    {
      GlassTemp.push(item)
    }
  })


  GlassTemp.map(item=>{
    if(!this.MatteOptions.includes(item.Matte))
    {
      this.MatteOptions.push(item.Matte)
    }
    if(!this.TemperedOPtions.includes(item.Temperable))
    {
      this.TemperedOPtions.push(item.Temperable)
    }
  })


  this.selectedGlassVariant =[];
  this.staticGlassVariant =[];
  this.form.patchValue({'GlassVariant':null});
  this.form.get('GlassVariant').enable();

  if(this.MatteOptions.includes("GLOSS"))
  {
    this.form.patchValue({'Matte': "GLOSS"}); 
  }else
  {
    this.form.patchValue({'Matte': "MATTE"});  
  }
  if(this.TemperedOPtions.includes("YES"))
  {
    this.form.patchValue({'Tempered': "YES"}); 
  }else
  {
    this.form.patchValue({'Tempered': "NO"}); 
  }

 

  this.glassonlyfinishes.map((item)=>{
    if(item.GlassFinish===this.form.value.GlassFinish&&Number(item.Thickness)>=this.form.value.ThicknessFrom&&Number(item.Thickness)<=this.form.value.ThicknessTo&&item.Matte===this.form.value.Matte&&item.Temperable===this.form.value.Tempered)
    {
      this.selectedGlassVariant.push(item)
      this.staticGlassVariant.push(item)
    }
  })

 



}
*/

OnGlassVariantChanges(GlassVariantModelWithThickness : string)
{
  this.selectedGlassVariant = [];


 
  this.glassonlyfinishes.map((item)=>{
    if(item.GlassVariantModelWithThickness===GlassVariantModelWithThickness)
    {
      this.selectedGlassVariant.push(item)
  

      this.maxheight  = Number(item.MaxHeight)
      this.maxwidth  = Number(item.MaxWidth)
 
   
    }
  })
 



 const formValues = this.rows.map(row => row.value);

for(var i = 0; i< formValues.length; i++)
{
  if(Number(formValues[i].Width)>Number(this.maxwidth))
  {
    const widthControl = this.rows[i].get('Width');
    widthControl.setValue(null)
  }
  if(Number(formValues[i].Height)>Number(this.maxheight))
  {
    const heightControl = this.rows[i].get('Height');
    heightControl.setValue(null)
  }
}






}


uncollapseGlassVariant(){
  this.selectedGlassVariant = [];
  this.selectedGlassVariant = this.staticGlassVariant;
}




OnSurfaceChange()
{
  this.subscription.push(this.form.get('Matte').valueChanges.subscribe(response=>{


    
    this.selectedGlassVariant =[];
    this.staticGlassVariant = [];
    this.form.patchValue({'GlassVariant':null});
    this.GlassVariant = true;



    this.selectedGlassVariant =[];
    this.staticGlassVariant = [];

    let namespace1 = []
    
  this.glassonlyfinishes.map((item)=>{
    if(item.GlassFinish===this.form.value.GlassFinish&&Number(item.Thickness)>=this.form.value.ThicknessFrom&&Number(item.Thickness)<=this.form.value.ThicknessTo&&item.Matte===response&&item.Temperable===this.form.value.Tempered&&item.Status==="ACTIVE")
    {
      if(!namespace1.includes(item))
      {
      this.selectedGlassVariant.push(item)
      this.staticGlassVariant.push(item)
       namespace1.push(item)
      }
    }
  })
   

   






 
  }))
}


OnTemperedChange()
{
  this.subscription.push(this.form.get('Tempered').valueChanges.subscribe(response=>{


    this.selectedGlassVariant =[];
    this.form.patchValue({'GlassVariant':null});
    this.GlassVariant = true;

    this.selectedGlassVariant =[];
    this.staticGlassVariant = [];

    let namespace1 = []

  this.glassonlyfinishes.map((item)=>{
    if(item.GlassFinish===this.form.value.GlassFinish&&Number(item.Thickness)>=this.form.value.ThicknessFrom&&Number(item.Thickness)<=this.form.value.ThicknessTo&&item.Matte===this.form.value.Matte&&item.Temperable===response&&item.Status==="ACTIVE")
    {
      if(!namespace1.includes(item))
      {
      this.selectedGlassVariant.push(item)
      this.staticGlassVariant.push(item)
      namespace1.push(item)
      }
    }
  })
   

   






 
  }))
}

//===================================================================================================================================
//===================================================================================================================================
//===================================================================================================================================



OrderNo : string = '';
Status  : string = '';
Active  : string = '';
Completed  : string = '';
WinDate  : string = '';
CompletionDate : string = '';
Associate  : string = '';
ProjectManager  : string = '';
DateCreated  : string = '';

  onSaveOrder()
  {

    this.glassonlyservice.updateOrder(
      this.formOr.value.Insurance,
      this.formOr.value.FreightPercent,
      this.formOr.value.PackingPercent,
      this.formOr.value.OtherChargesPercent,
      this.formOr.value.DiscountPercent,
      this.formOr.value.Packing,
      this.formOr.value.Freight,
      this.formOr.value.OtherCharges,
      this.formMode, 
      this.orderId,
      this.WaltzOrderNo,
      this.OrderNo,
      this.ProjectName,
      this.ClientName,
      this.Location,
      this.Architect,
      this.GST,
      this.Source,
      this.formOr.value.Discount,
      this.formOr.value.Advance,
      this.Status,
      this.Active,
      this.Completed,
      this.WinDate,
      this.CompletionDate,
      this.UserFullName,
      this.ProjectManager,
      this.DealerDiscount,
      this.DateCreated,
      this.userID,
      this.ActualProfile
    
       )

  }


  onSaveSolution(){
 
    if(this.form.invalid){
  
       const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
  
    let message : string = "";
  
    for (var i = 0; i<invalid.length; i++)
    {
      if(i===0)
      {
       message = invalid[i]
      }
      if(i>0)
      {
       message = message + ", "+invalid[i]
      }
    }
   
  
      
        let action = "Dismiss"
        this.snackbar.open(message + " IS MISSING!!!!!", action, {
          duration: 10000,
        })
  
      return;
    }

    const formValue = this.rows.map(row => row.value);

    for(var i = 0; i< formValue.length; i++)
    {
      if(!formValue[i].Width)
      {
        let action = "Dismiss"
        let sno = i+1
        this.snackbar.open( "Width in Sno "+sno+" is missing!!!!!", action, {
          duration: 5000,
        })

       return
      }
      if(!formValue[i].Height)
      {
        let action = "Dismiss"
        let sno = i+1
        this.snackbar.open( "Height in Sno "+sno+" is missing!!!!!", action, {
          duration: 5000,
        })

       return
      }
      if(!formValue[i].Quantity)
      {
        let action = "Dismiss"
        let sno = i+1
        this.snackbar.open( "Quantity in Sno "+sno+" is missing!!!!!", action, {
          duration: 5000,
        })

       return
      }
    }
   
  
    
  
   if(this.modeButtons==="UpdateSpace"||this.modeButtons==="Addnew"){
    this.ProjectDetailsForm = false;
    this.SolutionForm = false;
    this.TablesForm = true;
   }
   if(this.modeButtons==="SaveAndAddnew")
   {
    this.ProjectDetailsForm = false;
    this.SolutionForm = true;
    this.TablesForm = false;
  }



  //======================================Cost Calculation==========================================
  //======================================Cost Calculation==========================================
  //======================================Cost Calculation==========================================
  const formValues = this.rows.map(row => row.value);
  this.glassonlyservice.glasssizes = this.rows.map(row => row.value)



  let Sizes = this.glassonlyservice.glasssizes

  let GlassCost = 0;
  let AreaSquarefeet = 0;
  let MattePrice = 0;
  let TemperedPrice = 0;
  let Amount = 0;
  let Squarefeet = 0;
  let Weight = 0;
  let TotalSqm = 0;
  let Pieces = 0;
  let TemperedCost = 0;

  
  

  let DrawingCost = 0

  for(var i = 0; i < Sizes.length;i++)
  {
    let NewHeight =Number(Sizes[i].Height)
    let NewWidth =Number(Sizes[i].Width)

    if(this.Chargable>0)
    {
      if(Number(Sizes[i].Height)<200)
      {
        NewHeight =200
      }
      if(Number(Sizes[i].Width)<200)
      {
        NewWidth =200
      }
    }
    if(this.Chargable<1)
    {
      if(Number(Sizes[i].Height)<200)
      {
        NewHeight =250
      }
      if(Number(Sizes[i].Width)<200)
      {
        NewWidth =250
      }
    }



 


    if(Sizes[i].Drawing==="CUSTOM")
    {
      DrawingCost = DrawingCost +  Number(Sizes[i].Quantity)*(Number(NewWidth)+this.Chargable)*(Number(NewHeight)+this.Chargable)*0.00001076*0.15
    }

   
    TotalSqm = TotalSqm + Number(Sizes[i].Quantity)*(Number(NewWidth)+this.Chargable)*(Number(NewHeight)+this.Chargable)*0.00001076
    Pieces = Pieces + Number(Sizes[i].Quantity)
  }

  Squarefeet = TotalSqm



  this.glassonlyfinishes.map(item=>{
    if(item.GlassVariantModelWithThickness===this.form.value.GlassVariant)
    {
      GlassCost = Number(item.Price)
      MattePrice = 0
      TemperedCost = Number(item.TemperableCost)
    }
  })



  Amount = Number(((Squarefeet*GlassCost)*this.Factor).toFixed(2))
  let TempChargeSol = (DrawingCost*GlassCost*this.Factor).toFixed(2)
 

  this.glassonlyservice.addAndUpdateSolutions(
    
    this.OrderCompleted,
    this.orderStatus,
    this.orderId,
    this.EditSpace,
    this.modeButtons,
    this.form.value.SolutionName,
    this.form.value.GlassApplication,
    this.form.value.GlassCategory,
    this.form.value.GlassSubCategory,
    this.form.value.ThicknessFrom,
    this.form.value.ThicknessTo,
    this.form.value.GlassFinish,
    this.form.value.GlassVariant,
    Sizes,
    this.form.value.Tempered,
    this.form.value.Matte,
    Amount.toString(),
    Squarefeet.toFixed(2).toString(),
    Weight.toString(),
    Pieces.toString(),
    TempChargeSol
    )


    this.form.reset();
    this.EditSpace = null;
    this.glassonlyservice.glasssizes = []
    this.GlassSolutions = this.glassonlyservice.GlassSolutions;
    this.rows =[]
    this.addRow()

   

    this.selectedGlassFinish =[];
    this.form.patchValue({'GlassFinish':null});
    this.staticGlassFinish =[];
    this.selectedGlassVariant =[];
    this.form.patchValue({'GlassVariant':null});
    this.GlassVariant = false;
    this.form.get('GlassVariant').disable();


    this.form.patchValue({'GlassApplication':"KITCHEN"});
    this.form.patchValue({'GlassCategory':"TRANSLUCENT"});
    this.form.patchValue({'GlassSubCategory':"WIREMESH"});
  
    this.glassonlyservice.glasssizes = []

  
  
   
  
  
    
  
    
  }

  onDeleteSolution(index: string)
  {
 


      this.glassonlyservice.deleteGlassSolution(index);
    
  }


  onEditSolution(index : number)
  {

    this.modeButtons = 'UpdateSpace'
    this.ProjectDetailsForm = false;
    this.SolutionForm = true;
    this.TablesForm = false;
    this.EditSpace = index;
   





    this.form.patchValue({'SolutionName':this.glassonlyservice.GlassSolutions[index].SolutionName});
    this.form.patchValue({'GlassApplication':this.glassonlyservice.GlassSolutions[index].GlassApplication});
    this.form.patchValue({'GlassCategory':this.glassonlyservice.GlassSolutions[index].GlassCategory});
    this.form.patchValue({'GlassSubCategory':this.glassonlyservice.GlassSolutions[index].GlassSubCategory});
    this.form.patchValue({'ThicknessFrom':this.glassonlyservice.GlassSolutions[index].ThicknessFrom});
    this.form.patchValue({'ThicknessTo':this.glassonlyservice.GlassSolutions[index].ThicknessTo});
   
    this.selectedGlassFinish = []

    for(var i = 0 ;i < this.staticGlassFinish.length; i++)
    {

      if(this.staticGlassFinish[i].GlassFinish===this.glassonlyservice.GlassSolutions[index].GlassFinish)
      {
        this.selectedGlassFinish.push(this.staticGlassFinish[i])
      }
      
    }

    this.form.patchValue({'GlassFinish':this.glassonlyservice.GlassSolutions[index].GlassFinish});
   

    this.form.patchValue({'Tempered':this.glassonlyservice.GlassSolutions[index].Tempered});
    this.form.patchValue({'Matte':this.glassonlyservice.GlassSolutions[index].Matte});


    this.selectedGlassVariant = [];
    console.log(this.staticGlassVariant)

    if(this.glassonlyservice.GlassSolutions[index].GlassVariant)
    {
      this.GlassVariant = true;
      this.form.get('GlassVariant').enable();
    }

    this.staticGlassVariant = [];

    let GlassTemp = []

    this.glassonlyfinishes.map((item)=>{
      if(item.GlassFinish===this.glassonlyservice.GlassSolutions[index].GlassFinish&&Number(item.Thickness)>=Number(this.glassonlyservice.GlassSolutions[index].ThicknessFrom)&&Number(item.Thickness)<=Number(this.glassonlyservice.GlassSolutions[index].ThicknessTo))
      {
        GlassTemp.push(item)
      }
    })


    this.Matte =true;
    this.Temperable =true;
    this.MatteOptions = [];
    this.TemperedOPtions = [];
    
  GlassTemp.map(item=>{
    if(!this.MatteOptions.includes(item.Matte))
    {
      this.MatteOptions.push(item.Matte)
    }
    if(!this.TemperedOPtions.includes(item.Temperable))
    {
      this.TemperedOPtions.push(item.Temperable)
    }
  })


  this.form.patchValue({'Matte':this.glassonlyservice.GlassSolutions[index].Matte});
  this.form.patchValue({'Tempered':this.glassonlyservice.GlassSolutions[index].Tempered});

this.staticGlassVariant = []
 
   let namespace1 = []
  this.glassonlyfinishes.map((item)=>{
    if(item.GlassFinish===this.glassonlyservice.GlassSolutions[index].GlassFinish&&Number(item.Thickness)>=Number(this.glassonlyservice.GlassSolutions[index].ThicknessFrom)&&Number(item.Thickness)<=Number(this.glassonlyservice.GlassSolutions[index].ThicknessTo)&&item.Matte===this.glassonlyservice.GlassSolutions[index].Matte&&item.Temperable===this.glassonlyservice.GlassSolutions[index].Tempered&&item.Status==="ACTIVE")
    {
      if(!namespace1.includes(item))
      {
      this.staticGlassVariant.push(item)
      namespace1.push(item)
      }
    }
  })


  this.selectedGlassVariant = []

    for( var j =0; j< this.staticGlassVariant.length; j++)
    {
      if(this.staticGlassVariant[j].GlassVariantModelWithThickness===this.glassonlyservice.GlassSolutions[index].GlassVariant)
      {
        this.selectedGlassVariant.push(this.staticGlassVariant[j])
     
        this.maxheight  = Number(this.staticGlassVariant[j].MaxHeight)
        this.maxwidth  = Number(this.staticGlassVariant[j].MaxWidth)
 

        
      }
    }

    this.form.patchValue({'GlassVariant':this.glassonlyservice.GlassSolutions[index].GlassVariant});
  

  

    this.glassonlyservice.glasssizes = this.glassonlyservice.GlassSolutions[index].Sizes

    {
      this.initialData = []

      this.initialData = this.glassonlyservice.glasssizes
      this.rows = this.initialData.map(data =>
        this.formBuilder.group({
          Width: [data.Width, Validators.required],
          Height: [data.Height, Validators.required],
          Quantity : [data.Quantity, Validators.required],
          Drawing : [data.Drawing, Validators.required]
        })
      );


      this.glassonlyservice.glasssizes = this.rows.map(row => row.value)
    } 
  

    

  }

  onAddSpace()
  {
    this.ProjectDetailsForm = false;
    this.SolutionForm = true;
    this.TablesForm = false;
    this.modeButtons = 'Addnew';

  }

  //=============================Save Solution=======================================
  onAddNewButton(){
  this.modeButtons="Addnew"
  this.showSpinner = true;

  }
  
  onSaveAndAddNewButton(){
    this.modeButtons = 'SaveAndAddnew';
    this.showSpinner = true;
  }
  











  //=====================================================================================================



    
  createRow(): FormGroup {
    const row = this.formBuilder.group({
      Width: ['', Validators.required],
      Height: ['', Validators.required],
      Quantity: [1, Validators.required],
      Drawing: ['NONE', Validators.required],
    });

    return row;

  }


  addRow(): void {
    this.rows.push(this.createRow());
  }

  deleteRow(index: number): void {
    this.rows.splice(index, 1);
    this.updateSerialNumbers();
  }

 



  updateSerialNumbers(): void {
    this.rows.forEach((row, index) => {
      row.patchValue({ serialNumber: index + 1 }, { emitEvent: false });
    });
  }

  onEnter(event: KeyboardEvent): void {
    event.preventDefault();
  }

  onInputWidthEvent(group :FormGroup, index: number, inputName: string) {

    const inputControl = group.get('Width');
    const inputValue = inputControl.value;
    if (inputValue > this.maxwidth) {
      inputControl.setValue(null);
    }
   
  }

  onInputHeightEvent(group :FormGroup, index: number, inputName: string)
  {

    const inputControl = group.get('Height');
    const inputValue = inputControl.value;
    if (inputValue > this.maxheight) {
      inputControl.setValue(null);
    }
  }

 



  


 //=======================================================================================================

 


}
