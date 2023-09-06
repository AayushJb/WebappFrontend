import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Model } from 'src/app/shared/model.model';
import { Subsystem } from 'src/app/shared/subsystem.model';
import { System } from 'src/app/shared/system.model';
import { Systemtype } from 'src/app/shared/systemtype.model';
import { Color } from 'src/app/shared/color.model';
import { Glasscat } from 'src/app/shared/glasscat.model';
import { Glasssubcat } from 'src/app/shared/glasssubcat.model';
import { Glassfinish } from 'src/app/shared/glassfinish.model';
import { Glassvariant } from 'src/app/shared/glassvariant.model';
import { Handle } from 'src/app/shared/handle.model';
import { Handlevariant } from 'src/app/shared/handlevariant.model';
import { Solution } from 'src/app/shared/solution.model';
import { Order } from 'src/app/shared/order.model';
import { GeneralSetting } from 'src/app/shared/generalsetting.model';
import { UsersService } from 'src/app/services/user.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { User } from 'src/app/shared/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';
import { KitchentypeService } from 'src/app/services/kitchentype.service';
import { KitchenType } from 'src/app/shared/kitchentype.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { KitchendialogComponent } from './kitchendialog/kitchendialog.component';
import { KitchendialogService } from 'src/app/services/kitchendialog.service';
import { KitchenSpecs } from 'src/app/shared/kitchenspecs.model';
import { isThisTypeNode } from 'typescript';
import { ProcoreService } from 'src/app/services/procore.service';
import { FullGlassvariant } from 'src/app/shared/fullglassvariants.model';
import { Grid } from 'src/app/shared/grid.model';
import { Design } from 'src/app/shared/design.model';


@Component({
  selector: 'app-wqgform',
  templateUrl: './wqgform.component.html',
  styleUrls: ['./wqgform.component.css']
})
export class WqgformComponent implements OnInit, OnDestroy{


  showSpinner : boolean = true;

  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;

  ActualProfile  : string; 

  disablediscount : boolean =false;


  public formMode = "newOrder"
  private mode = 'solutions';
  public modeButtons = 'Addnew';
  public modeOrder = 'AddOrders';

  public winstatus : boolean = false;
  public GetPDFButton : boolean = false;

  public LockFlag : boolean = false;
  public LockFlagYes : boolean = true;
  public StandardFlag : boolean = false;


  private solutionId : string;
  private solutionsSub : Subscription;

  public procoreID : string;

  public EditSpace : number = null;

  public orderId :string;
  private ordersSub : Subscription;
  public orders = [];

  Factor: number;
  DropSealCost : number;
  DoorCloserCost : number;
  GridCost : number;
  Lock : boolean;

  ProjectName : string;
  OrderNumber : string;
  ClientName : string;
  Location : string;
  Architect : string;
  Source : string;
  OfficeID : string;
  OrderCompleted : string;
  



  generalsettings : GeneralSetting;
  Solutions : Solution[] =[];
  ProjectDetailsForm : boolean = true;
  SolutionForm : boolean = false;
  TablesForm : boolean = false;

  form : FormGroup;
  formOr : FormGroup;
  formSelectSol : FormGroup;

  orderStatus : string;

  
 // glassfinishTemp =[]


  models : Model[] = [];
  systems : System[] = [];
  subsystems : Subsystem[] = [];
  systemtypes : Systemtype[] = [];
  subscription : Subscription[] = [];

  public maxDiscount : number;
  DiscountArray: number[] = [];
  AdvanceArray:number[] = [];
  users :User[] = [];

  maxWidth:string = '';
  maxHeight:string = '';

  handle : boolean = false;
  selectedHandle = [];
  selectedHandleVariant = [];


  Matte : boolean = false;
  OuterMatte : boolean = false;

  doorCloser : boolean = false;
  dropSeal : boolean = false;

  GlassVariant : boolean = false;
  OuterGlassVariant : boolean = false;
  Flush : boolean = false;

  handleVarients : boolean = false;
  handles : Handle[] = [];
  selectedHandles = [];
  handlevariant : Handlevariant[] = [];

  selectedSystems = [];
  selectedSubsystems = [];
  selectedSystemTypes = [];
  DealerDiscount : string;

  flushFlag : Boolean =false;

  selectedModels = [];
  staticModels = [];
  currentModel = [];

  colors : Color[] = [];
  selectedColor = [];
  staticColor = [];

  glassfinishes : Glassfinish[] = [];
  selectedGlassFinish = [];
  staticGlassFinish = [];
  glassSubCatTemp = [];

  glassvariants : Glassvariant[] = [];
  selectedGlassVariant = [];
  staticGlassVariant = [];

  glasscats : Glasscat[] = [];
  selectedGlasscats = [];

  glasssubcats : Glasssubcat[] = [];
  selectedGlasssubcats = [];
  glasssubcatsTemp = [];

  outerglasssubcats : Glasssubcat[] = [];
  outerselectedGlasssubcats = [];
  outerglasssubcatsTemp = [];

  outerglassvariants : Glassvariant[] = [];
  outerselectedGlassVariant = [];
  outerstaticGlassVariant = [];

  grids : Grid[] = [];
  selectedgrids = [];

  GLFlag : boolean = false;

  designs : Grid[] = [];
  selecteddesign = [];
  staticdesign = [];
  designflag : boolean = false;

  

  outerglasscats : Glasscat[] = [];
  outerselectedGlasscats = [];

  OuterGlassFinishArray =[];
  outerglassfinishes : Glassfinish[] = [];
  outerselectedGlassFinish = [];
  outerstaticGlassFinish = [];
  outerglassfinishTemp = [];

  selectedSuborients = [];
  staticSuborients = [];
  grid:boolean = false;



 //=================
  glassfullvariants : FullGlassvariant[] =[];

  ActualUserFullName : string;
  userID :string;


  



  constructor( public wqgformService : WqgformService ,
     public route : ActivatedRoute,
     public routeO :ActivatedRoute,
     private userService : UsersService,
     public projectService : ProjectsService,
     private snackbar : MatSnackBar,
     public procoreService : ProcoreService,
     private dialog : MatDialog
 
  
      ) { }

  ngOnInit(): void {


    this.wqgformService.getCurrentDateTime();
    //======================================CHECKING WHETHER IN EDIT MODE OR NEW FORM=====================================
  this.route.paramMap.subscribe((paramMap:ParamMap)=>{
    if(paramMap.has('orderId')) {

     let formStatus : string;
     
     this.orderId = paramMap.get('orderId');

     this.projectService.getOrder(this.orderId).subscribe(orderData=>{
 
        
     this.wqgformService.Solutions = orderData.Solutions;
     this.wqgformService.PrevOrder = orderData;
     

  

 
    
     this.procoreID = orderData.ProjectID;

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
    
      

     this.Solutions = this.wqgformService.Solutions;

     this.ProjectName = orderData.ProjectName;
     this.OrderNumber = orderData.OrderNo;
     this.ClientName = orderData.ClientName;
     this.Location = orderData.Location;
     this.Architect = orderData.Architect;
     this.Source = orderData.Source;
    
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
     this.formOr.patchValue({'Discount':orderData.Discount});

     if(orderData.Status==="Win"||this.orderStatus==="Old Win"||this.orderStatus==="Commercial Hold")
     {
      this.disablediscount = true;
     }

     this.ProjectDetailsForm = false;
     this.SolutionForm = false;
     this.TablesForm = true;
     this.modeButtons = 'Addnew';

     this.showSpinner  = false;

     });
    
    

    }else{

     this.formMode = 'newOrder';
     this.wqgformService.Solutions = [];
     this.orderId = null;
    }
   
   });

   
   
/*
  this.procoreService.getClients().subscribe((res)=>{
  console.log(res)
  })
*/

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
       
       if(item.UserFullName=== this.ActualUserFullName)
       {
        this.userID  =item.EmailId; 
       
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
   
   

    this.formOr = new FormGroup({

      Discount :new FormControl(0,{validators:[Validators.required]}),
      Advance :new FormControl(100,{validators:[Validators.required]}),
    });

    this.form = new FormGroup({
      'Floor' : new FormControl('GROUND',{validators:[Validators.required]}),
      'Space' : new FormControl(null,{validators:[Validators.required]}),
      'System' : new FormControl(null,{validators:[Validators.required]}),
      'SubSystem' : new FormControl(null,{validators:[Validators.required]}),
      'SystemType' : new FormControl(null,{validators:[Validators.required]}),
      'Orientation' : new FormControl(null,{validators:[Validators.required]}),
      'SubOrientation' : new FormControl(null,{validators:[Validators.required]}),
      'Grid' : new FormControl(null,{validators:[Validators.required]}),
      'Design' : new FormControl(null,{validators:[Validators.required]}),
      'Width' : new FormControl(null,{validators:[Validators.required]}),
      'Height' : new FormControl(null,{validators:[Validators.required]}),
      'Quantity' : new FormControl('1',{validators:[Validators.required]}),
      'Color' : new FormControl(null,{validators:[Validators.required]}),
      'GlassCategory' : new FormControl(null,{validators:[Validators.required]}),
      'GlassSubCategory' : new FormControl(null,{validators:[Validators.required]}),
      'GlassFinish' : new FormControl(null,{validators:[Validators.required]}),
      'GlassVariant' : new FormControl(null,{validators:[Validators.required]}),
      'Matte' : new FormControl("NO",{validators:[Validators.required]}),
      'OuterGlassCategory' : new FormControl(null,{validators:[Validators.required]}),
      'OuterGlassSubCategory' : new FormControl(null,{validators:[Validators.required]}),
      'OuterGlassFinish' : new FormControl(null,{validators:[Validators.required]}),
      'OuterGlassVariant' : new FormControl(null,{validators:[Validators.required]}),
      'OuterMatte' : new FormControl("NO",{validators:[Validators.required]}),
      'Handle' : new FormControl("NONE",{validators:[Validators.required]}),
      'HandleVariant' : new FormControl(null,{validators:[Validators.required]}),
      'DoorCloser' : new FormControl("NO",{validators:[Validators.required]}),
      'DropSeal' : new FormControl("NO",{validators:[Validators.required]}),
      'Lock' : new FormControl("NO",{validators:[Validators.required]}),
      'Remarks' : new FormControl(null),

    });




      this.form.get('SubOrientation').disable();//=====
      this.form.get('Grid').disable();//=====
      this.form.get('GlassVariant').disable();//=====
      this.form.get('Design').disable();
      this.form.get('Matte').disable();//=====
      this.form.get('Handle').disable();//=====
      this.form.get('HandleVariant').disable();//=====
      this.form.get('DoorCloser').disable();//=====
      this.form.get('DropSeal').disable();//=====
      this.form.get('OuterGlassCategory').disable();//=====
      this.form.get('OuterGlassFinish').disable();//=====
      this.form.get('OuterGlassSubCategory').disable();//=====
      this.form.get('OuterGlassVariant').disable();//=====
      this.form.get('OuterMatte').disable();//=====



//===========================================================================================================================
//===============================KITCHEN FUNCTIONS===========================================================================
//===========================================================================================================================




//===========================================================================================================================
//===============================KITCHEN FUNCTIONS===========================================================================
//===========================================================================================================================


//===========================Get Solutions for table=============================


//=========================get General Settings==================
this.wqgformService.getGeneralSetting().subscribe((responseData)=>{
 
  this.Factor = Number(responseData.Factor);
  this.DropSealCost = Number(responseData.DropSealCost);
  this.DoorCloserCost = Number(responseData.DoorCloserCost);
  this.GridCost = Number(responseData.GridCost);



})


 //=======================get Systems=====================

this.wqgformService.getSystems().subscribe((systemsData)=>{
    this.systems = systemsData.systems;
    systemsData.systems.map(item=>{if(!this.selectedSystems.includes(item.System)){
      this.selectedSystems.push(item.System);
    }});
   this.form.patchValue({'System':this.selectedSystems[0]});
})

//===========================GET MODELS==============================

this.wqgformService.getModels().subscribe((modelsData)=>{
this.models = modelsData.models;

let namespace = [];

this.selectedModels =[];
this.staticModels =[];

modelsData.models.map(item =>{
  if(item.System==this.selectedSystems[0] && item.SubSystem==this.selectedSubsystems[0] && item.SystemType==this.selectedSystemTypes[0]&& (!namespace.includes(item.Orientation))&& item.Status === "ACTIVE")
  {
     this.selectedModels.push(item);
     this.staticModels.push(item);
     namespace.push(item.Orientation)

  }


});

});

//=================================get Colors==================================
 this.wqgformService.getColors().subscribe((colorData)=>{

  this.colors = colorData.colors;

 })

 //=================================get GlassCats==================================
 this.wqgformService.getGlasscats().subscribe((glasscatData)=>{

  this.glasscats = glasscatData.glasscats;

 });

 //=================================get GlassSubCats==================================
 this.wqgformService.getGlasssubcats().subscribe((glasssubcatData)=>{

  this.glasssubcats = glasssubcatData.glasssubcats;

 });

 //=================================get Glassfinishes==================================
 this.wqgformService.getGlassfinishes().subscribe((glassfinishData)=>{


  glassfinishData.glassfinishes.map((item)=>{
    if(item.Status==="ACTIVE")
    {
      this.glassfinishes.push(item)
      this.outerglassfinishes.push(item)
    }
  })

  

 });

 //=================================get GlassVariants==================================
  this.wqgformService.getGlassVariants().subscribe((glassvariantData)=>{

    this.glassvariants = glassvariantData.glassvariants; 

   });

   this.wqgformService.getFullGlassVariants().subscribe((glassvariantData)=>{

    this.glassfullvariants = glassvariantData.glassfullvariants; 

/*
    let glass = []
   this.glassfinishes.map(item=>{
    glass.push(item.GlassPrintName)
   })

   console.log(glass)

  /*
    for(var i=0;i < this.glassfinishes.length; i++)
    {
      for(var j=0;j<this.glassfullvariants.length;j++)
      {
        if(this.glassfinishes[i].GlassModel===this.glassfullvariants[j].Glassfinish)
        {
          this.glassfinishes[i].GlassVariants.push(this.glassfullvariants[j].GlassVariantModel)
        }
      }

    }

 
    console.log(this.glassfinishes)
   
  
    for(var i = 0;i<this.glasssubcats.length;i++)
    {
      for(var j = 0;j<this.glassfullvariants.length;j++)
      {
        if(this.glasssubcats[i].GlassSubCategory===this.glassfullvariants[j].GlassSubCategory)
        {
          if(!this.glasssubcats[i].GlassFinish.includes(this.glassfullvariants[j].Glassfinish))
          {
            this.glasssubcats[i].GlassFinish.push(this.glassfullvariants[j].Glassfinish)
          }
        }
      }
    }

    console.log(this.glasssubcats)
*/
   });


 //================================get Handles Variants==========================

 this.wqgformService.getHandleVariants().subscribe((handlevariantsData)=>{
  this.handlevariant = handlevariantsData.handlevariants;

 })

 //================================get Handle =========================

 this.wqgformService.getHandles().subscribe((handlesData)=>{
  this.handles = handlesData.handles;

 })


 this.wqgformService.getGrids().subscribe((gridsData)=>{
  
 this.grids = gridsData.grids
 this.selectedgrids = [];
 this.grids.map((item)=>{

  if(!this.selectedgrids.includes(item.GridName))
  {
   
    if(item.Status==="ACTIVE")
    {
      this.selectedgrids.push(item.GridName)
    } 
   


  }

 }) 


 })





//============================== initiallization of changes====================
  

  

   this.systemValueChanges();
   this.subsystemValuechanges();
   this.systemTypeValuechanges();
   this.OnGlassCatChanges();
   this.OnGlassSubCatChanges();
   this.OnOuterGlassCatChanges();
   this.OnOuterGlassSubCatChanges();
   this.handleValuechanges();
   //this.OnHeightChanges();
   this.OnDiscountChanges();
   this.OnGridChanges()


}


  

  //=========================================================================================================

  //======================================================================================================== 






  



  

  

  //=========================================================================================================

  systemValueChanges(){


    this.subscription.push(this.form.get('System').valueChanges.subscribe((response)=>{

      this.maxWidth = '';
      this.maxHeight = '';
      this.handle = false;
      this.selectedHandle = [];
      this.selectedHandleVariant = [];
      this.Matte = false;
      this.OuterMatte = false;
      this.doorCloser = false;
      this.dropSeal = false;
      this.GlassVariant = false;
      this.OuterGlassVariant = false;
      this.Flush= false;
      this.handleVarients= false;
      this.selectedHandles = [];
      this.selectedSubsystems = [];
      this.selectedSystemTypes = [];
      this.flushFlag =false;
      this.selectedModels = [];
      this.staticModels = [];
      this.currentModel = [];
      this.selectedColor = [];
      this.staticColor = [];
      this.selectedGlassFinish = [];
      this.staticGlassFinish = [];
      this.glassSubCatTemp = [];
      this.OuterGlassFinishArray =[];
      this.outerselectedGlassFinish = [];
      this.outerstaticGlassFinish = [];
      this.outerglassfinishTemp = [];
      this.selectedGlassVariant = [];
      this.staticGlassVariant = [];
      this.outerselectedGlassVariant = [];
      this.outerstaticGlassVariant = [];
      this.selectedGlasscats = [];
      this.outerselectedGlasscats = [];
      this.selectedGlasssubcats = [];
      this.glasssubcatsTemp = [];
      this.outerselectedGlasssubcats = [];
      this.outerglasssubcatsTemp = [];
      this.selectedSuborients = [];
      this.staticSuborients = [];
      this.grid = false;
      this.form.patchValue({'Orientation':null});
      this.form.patchValue({'SubOrientation':null});
      this.form.patchValue({'Grid': null});
      this.form.patchValue({'Color':null});
      this.form.patchValue({'GlassCategory':null});
      this.form.patchValue({'GlassSubCategory':null});
      this.form.patchValue({'GlassFinish':null});
      this.form.patchValue({'GlassVariant':null});
      this.form.patchValue({'Matte':null});
      this.form.patchValue({'OuterGlassCategory':null});
      this.form.patchValue({'OuterGlassFinish':null});
      this.form.patchValue({'OuterGlassSubCategory':null});
      this.form.patchValue({'OuterGlassVariant':null});
      this.form.patchValue({'OuterMatte':null});
      this.form.patchValue({'Handle':null});
      this.form.patchValue({'HandleVariant':null});
      this.form.patchValue({'DoorCloser':null});
      this.form.patchValue({'DropSeal':null});


    this.systems.map(item=>{if(item.System===response&&(!this.selectedSubsystems.includes(item.SubSystem))){this.selectedSubsystems.push(item.SubSystem)

    }})



    this.form.patchValue({'SubSystem':this.selectedSubsystems[0]});

    this.systems.map(item => {if(item.System===response&& item.SubSystem ===this.selectedSubsystems[0]){

      this.selectedSystemTypes = item.SystemType;

    }})

    this.form.patchValue({'SystemType':this.selectedSystemTypes[0]});

    let namespace = [];
    this.selectedModels=[]
    this.staticModels=[]


   
    this.models.map(item=>{
     if(item.System===response && item.SubSystem===this.form.value.SubSystem && item.SystemType === this.form.value.SystemType && (!namespace.includes(item.Orientation))&& item.Status === "ACTIVE")
     {
      this.selectedModels.push(item)
      this.staticModels.push(item)
      this.form.patchValue({'Orientation':null});
      namespace.push(item.Orientation)

     }
    
    })

    
    }));

 }
    //==============================Subsystem Value changes ===================
  subsystemValuechanges(){


       this.subscription.push(this.form.get('SubSystem').valueChanges.subscribe((response)=>{


      this.maxWidth = '';
      this.maxHeight = '';
      this.handle = false;
      this.selectedHandle = [];
      this.selectedHandleVariant = [];
      this.Matte = false;
      this.OuterMatte = false;
      this.doorCloser = false;
      this.dropSeal = false;
      this.GlassVariant = false;
      this.OuterGlassVariant = false;
      this.Flush= false;
      this.handleVarients= false;
      this.selectedHandles = [];
      this.selectedSystemTypes = [];
      this.flushFlag =false;
      this.selectedModels = [];
      this.staticModels = [];
      this.currentModel = [];
      this.selectedColor = [];
      this.staticColor = [];
      this.selectedGlassFinish = [];
      this.staticGlassFinish = [];
      this.glassSubCatTemp = [];
      this.OuterGlassFinishArray =[];
      this.outerselectedGlassFinish = [];
      this.outerstaticGlassFinish = [];
      this.outerglassfinishTemp = [];
      this.selectedGlassVariant = [];
      this.staticGlassVariant = [];
      this.outerselectedGlassVariant = [];
      this.outerstaticGlassVariant = [];
      this.selectedGlasscats = [];
      this.outerselectedGlasscats = [];
      this.selectedGlasssubcats = [];
      this.glasssubcatsTemp = [];
      this.outerselectedGlasssubcats = [];
      this.outerglasssubcatsTemp = [];
      this.selectedSuborients = [];
      this.staticSuborients = [];
      this.grid = false;
      this.form.patchValue({'Orientation':null});
      this.form.patchValue({'SubOrientation':null});
      this.form.patchValue({'Grid': null});
      this.form.patchValue({'Color':null});
      this.form.patchValue({'GlassCategory':null});
      this.form.patchValue({'GlassSubCategory':null});
      this.form.patchValue({'GlassFinish':null});
      this.form.patchValue({'GlassVariant':null});
      this.form.patchValue({'Matte':null});
      this.form.patchValue({'OuterGlassCategory':null});
      this.form.patchValue({'OuterGlassFinish':null});
      this.form.patchValue({'OuterGlassSubCategory':null});
      this.form.patchValue({'OuterGlassVariant':null});
      this.form.patchValue({'OuterMatte':null});
      this.form.patchValue({'Handle':null});
      this.form.patchValue({'HandleVariant':null});
      this.form.patchValue({'DoorCloser':null});
      this.form.patchValue({'DropSeal':null});
     
       
      



        if(response==="FLUSH"){
          
          this.flushFlag = true;
          this.form.get('OuterGlassCategory').enable();//=====
          this.form.get('OuterGlassFinish').enable();//=====
          this.form.get('OuterGlassSubCategory').enable();//=====
        
        }else 
        { this.flushFlag = false
          this.OuterGlassVariant = false;
          this.OuterMatte = false;
          this.outerselectedGlasssubcats = [];
          this.outerglasssubcatsTemp = [];
          this.outerselectedGlassVariant = [];
          this.outerstaticGlassVariant = [];
          this.outerselectedGlasscats = [];
          this.OuterGlassFinishArray =[];
          this.outerselectedGlassFinish = [];
          this.outerstaticGlassFinish = [];
          this.outerglassfinishTemp = [];
          this.form.patchValue({'OuterGlassCategory':null});
          this.form.get('OuterGlassCategory').disable();//=====
          this.form.patchValue({'OuterGlassCategory':null});
          this.form.get('OuterGlassCategory').disable();//=====
          this.form.patchValue({'OuterGlassFinish':null});
          this.form.get('OuterGlassFinish').disable();//=====
          this.form.patchValue({'OuterGlassSubCategory':null});
          this.form.get('OuterGlassSubCategory').disable();//=====
          this.form.patchValue({'OuterGlassVariant':null});
          this.form.get('OuterGlassVariant').disable();//=====
          this.form.patchValue({'OuterMatte':null});
          this.form.get('OuterMatte').disable();//=====

        };

        this.systems.map(item => {if(item.System===this.form.value.System && item.SubSystem===response){
        this.selectedSystemTypes = item.SystemType;

        }})

        this.form.patchValue({'SystemType':this.selectedSystemTypes[0]});

        let namespace = [];
        this.selectedModels=[]
        this.staticModels=[]



        this.models.map(item =>{
         if(item.System===this.form.value.System && item.SubSystem===response && item.SystemType===this.form.value.SystemType && (!namespace.includes(item.Orientation))&& item.Status === "ACTIVE")
          {
           this.selectedModels.push(item);
           this.staticModels.push(item);
           this.form.patchValue({'Orientation':null});
           namespace.push(item.Orientation)
          }

        })




       }))

   }
 //==========================================================================================================

 systemTypeValuechanges(){

      this.maxWidth = '';
      this.maxHeight = '';
      this.handle = false;
      this.selectedHandle = [];
      this.selectedHandleVariant = [];
      this.Matte = false;
      this.OuterMatte = false;
      this.doorCloser = false;
      this.dropSeal = false;
      this.GlassVariant = false;
      this.OuterGlassVariant = false;
      this.Flush = false;
      this.handleVarients = false;
      this.selectedHandles = [];
      this.flushFlag = false;
      this.selectedModels = [];
      this.staticModels = [];
      this.currentModel = [];
      this.selectedColor = [];
      this.staticColor = [];
      this.selectedGlassFinish = [];
      this.staticGlassFinish = [];
      this.glassSubCatTemp = [];
      this.OuterGlassFinishArray =[];
      this.outerselectedGlassFinish = [];
      this.outerstaticGlassFinish = [];
      this.outerglassfinishTemp = [];
      this.selectedGlassVariant = [];
      this.staticGlassVariant = [];
      this.outerselectedGlassVariant = [];
      this.outerstaticGlassVariant = [];
      this.selectedGlasscats = [];
      this.outerselectedGlasscats = [];
      this.selectedGlasssubcats = [];
      this.glasssubcatsTemp = [];
      this.outerselectedGlasssubcats = [];
      this.outerglasssubcatsTemp = [];
      this.selectedSuborients = [];
      this.staticSuborients = [];
      this.grid = false;
      this.form.patchValue({'Orientation':null});
      this.form.patchValue({'SubOrientation':null});
      this.form.patchValue({'Grid': null});
      this.form.patchValue({'Color':null});
      this.form.patchValue({'GlassCategory':null});
      this.form.patchValue({'GlassSubCategory':null});
      this.form.patchValue({'GlassFinish':null});
      this.form.patchValue({'GlassVariant':null});
      this.form.patchValue({'Matte':null});
      this.form.patchValue({'OuterGlassCategory':null});
      this.form.patchValue({'OuterGlassFinish':null});
      this.form.patchValue({'OuterGlassSubCategory':null});
      this.form.patchValue({'OuterGlassVariant':null});
      this.form.patchValue({'OuterMatte':null});
      this.form.patchValue({'Handle':null});
      this.form.patchValue({'HandleVariant':null});
      this.form.patchValue({'DoorCloser':null});
      this.form.patchValue({'DropSeal':null});

  this.subscription.push(this.form.get('SystemType').valueChanges.subscribe((response)=>{
  this.selectedModels = [];
  this.selectedSuborients = [];
  this.staticModels = [];

  let namespace = [];

   this.models.map(item =>{
    if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===response && (!namespace.includes(item.Orientation))&& item.Status === "ACTIVE")
     {
      this.selectedModels.push(item);
      this.staticModels.push(item);
      namespace.push(item.Orientation)
      this.form.patchValue({'Orientation':null});
     }

   })

  }))

}
//==========================================Handle Variant===================================================

handleValuechanges(){



     this.subscription.push(this.form.get('Handle').valueChanges.subscribe((response)=>{
     this.handleVarients = false;
     this.handles.map((item)=>{
       if(item.Handle==response){
         this.selectedHandleVariant=item.HandleVariant;
       }
    });
    if(this.selectedHandleVariant.length>0){

      this.handleVarients = true;
      this.form.get('HandleVariant').enable();//=====
      this.form.patchValue({'HandleVariant':this.selectedHandleVariant[0]});
      }
      else{
        this.form.get('HandleVariant').disable();//=====
      }

      if(this.form.value.System==="WALTZ.SWING"&&this.form.value.SubSystem==="FLUSH")
      {
        this.LockFlagYes = false;
        this.form.get('Lock').enable()
        this.form.patchValue({'Lock':"NO"});
        this.Lock =true
    
      }else{this.LockFlagYes = true;}

      if(this.form.value.System==="WALTZ.SWING"&&this.form.value.SubSystem==="FLUSH"&&response!=="TO BE SUPPLIED SWING")
      {
        this.LockFlag =true;
        this.form.get('Lock').enable()
        this.Lock =true
        
        
      }else{
        this.LockFlag = false
      }



     }))



  }



//===========================================================================================================

orientationChanges(ori :string){

this.grid = false;
this.GlassVariant=false;
this.OuterGlassVariant=false;
this.form.patchValue({'GlassVariant':null});
this.form.get('GlassVariant').disable();//=====
this.form.patchValue({'OuterGlassVariant':null});
this.form.get('OuterGlassVariant').disable();//=====

this.form.get('SubOrientation').disable();//=====




this.selectedSuborients = [];
this.staticSuborients = [];
this.selectedModels = [];
this.selectedColor = [];
this.selectedGlasscats = [];
this.outerselectedGlasscats = [];
this.glasssubcatsTemp = [];
this.outerglasssubcatsTemp = [];
this.selectedGlasssubcats = [];
this.outerselectedGlasssubcats = [];
this.maxWidth = '';
this.maxHeight = '';
this.selectedGlassVariant =[];
this.staticGlassVariant =[];
this.outerselectedGlassVariant =[];
this.outerstaticGlassVariant =[];



let namespace = [];

this.models.map(item => {

  //=============Collapse Configs
  if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===this.form.value.SystemType && item.Orientation === ori && (!namespace.includes(item.Orientation)) && item.Status === "ACTIVE" )
     {
      this.selectedModels.push(item);
      namespace.push(item.Orientation);
      this.form.get('SubOrientation').disable();//=====
     }

//====================================
  if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===this.form.value.SystemType && item.Orientation === ori && item.SOFlag !== "NO" && item.Status === "ACTIVE")
     {
      this.selectedSuborients.push(item);
      this.staticSuborients.push(item);

      this.form.get('SubOrientation').enable();//=====
      this.form.patchValue({'SubOrientation':false});
     }

})

//========================When no Sub Orientation Modify the form========================================
if(this.selectedSuborients.length>0)
{
  this.grid = false;
  this.form.get('Grid').disable();
  this.form.patchValue({'Grid': null});


}
else
//=====================Start======
{
  this.maxWidth = '';
  this.maxHeight = '';
  this.handle = false;
  this.selectedHandle = [];
  this.selectedHandleVariant = [];
  this.Matte = false;
  this.OuterMatte = false;
  this.doorCloser = false;
  this.dropSeal = false;
  this.GlassVariant = false;
  this.OuterGlassVariant = false;
  this.handleVarients= false;
  this.selectedHandles = [];
  this.selectedColor = [];
  this.staticColor = [];
  this.selectedGlassFinish = [];
  this.staticGlassFinish = [];
  this.glassSubCatTemp = [];
  this.OuterGlassFinishArray =[];
  this.outerselectedGlassFinish = [];
  this.outerstaticGlassFinish = [];
  this.outerglassfinishTemp = [];
  this.selectedGlassVariant = [];
  this.staticGlassVariant = [];
  this.outerselectedGlassVariant = [];
  this.outerstaticGlassVariant = [];
  this.selectedGlasscats = [];
  this.outerselectedGlasscats = [];
  this.selectedGlasssubcats = [];
  this.glasssubcatsTemp = [];
  this.outerselectedGlasssubcats = [];
  this.outerglasssubcatsTemp = [];
  this.selectedSuborients = [];
  this.staticSuborients = [];
  this.grid = false;
  this.form.patchValue({'SubOrientation':null});
  this.form.get('SubOrientation').disable();//=======
  this.form.patchValue({'Grid': null});
  this.form.get('Grid').disable();//=======
  this.form.patchValue({'Color':null});
  this.form.patchValue({'GlassCategory':null});
  this.form.patchValue({'GlassSubCategory':null});
  this.form.patchValue({'GlassFinish':null});
  this.form.patchValue({'GlassVariant':null});
  this.form.patchValue({'Matte':null});
  this.form.patchValue({'OuterGlassCategory':null});
  this.form.patchValue({'OuterGlassFinish':null});
  this.form.patchValue({'OuterGlassSubCategory':null});
  this.form.patchValue({'OuterGlassVariant':null});
  this.form.patchValue({'OuterMatte':null});
  this.form.patchValue({'Handle':null});
  this.form.patchValue({'HandleVariant':null});
  this.form.patchValue({'DoorCloser':null});
  this.form.patchValue({'DropSeal':null});
  this.form.patchValue({'Lock':null});




//============================for colors=======some part glass=========
  let ColorArray =[];
  let GlassSubCatArray = [];

  this.models.map(item =>{
    if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===this.form.value.SystemType && item.Orientation === ori && item.SubOrientation === ori && item.Status === "ACTIVE")
     {

      ColorArray = item.Colors;//====for color===
      GlassSubCatArray =  item.GlassFinishes;
      this.glassSubCatTemp = item.GlassFinishes;
      this.maxWidth = item.MaxWidth;
      this.maxHeight = item.MaxHeight;

      //===========================for grid=======
      if(item.Grid==="YES"){
        this.grid=true;
        this.form.get('Grid').enable();//=========
        this.form.patchValue({'Grid': "NO"});
      
      };
      if(item.Grid==="NO"){
        this.grid=false;
        this.form.get('Grid').disable();//=========    
        this.form.patchValue({'Grid': null});  
      };

      //===========================for Lock=========
      if(item.Lock==="YES"){
        this.Lock=true;
        this.form.get('Lock').enable();//=========
        this.form.patchValue({'Lock': "NO"});

      

        if(this.form.value.System==="WALTZ.SWING"&&this.form.value.SubSystem==="FLUSH")
        {
          this.LockFlag =true
        }else{
          this.LockFlag = false
        }
      
      };
      if(item.Lock==="NO"){
        this.Lock=false;
        this.form.get('Lock').disable();//=========    
        this.form.patchValue({'Lock': null});  
      };

      //===========================for Handle=======

      if(item.Handles.length>0)
      {
         
        this.handle = true;
        item.Handles.map(item =>{
  
          this.selectedHandle.push(item);
  
        });
     
  
        console.log(this.selectedHandle)
        this.form.get('Handle').enable();//=====
        this.form.patchValue({'Handle':this.selectedHandle[0]});
  
  
      }else {
        this.form.get('Handle').disable();//=====
      }
  


      //===========================for DoorCloser=======
      if(item.DoorCloser==="YES"){this.doorCloser=true
        this.form.patchValue({'DoorCloser':"NO"});
        this.form.get('DoorCloser').enable();
      };
      if(item.DoorCloser==="NO"){this.doorCloser=false; this.form.get('DoorCloser').disable();};

      //=========================for DropSeal========

      if(item.DropSeal==="YES"){this.dropSeal=true;
        this.form.patchValue({'DropSeal':"NO"});
        this.form.get('DropSeal').enable();

      };
      if(item.DropSeal==="NO"){this.dropSeal=false;  this.form.get('DropSeal').disable(); };

     }
  })


  ColorArray.map(itemCA=>{

  this.colors.map(item=>{
    if(item.Color===itemCA){
      this.selectedColor.push(item);
      this.staticColor.push(item);

    }
  })


  })
//=========================for inner  glass finishes======================================

let catsArray = [];


GlassSubCatArray.map(item =>{

  this.glasscats.map(itemC =>{
   if(itemC.GlassSubCategory.includes(item)&&(!catsArray.includes(itemC.GlassCategory)))
   {
     catsArray.push(itemC.GlassCategory)
   }

  })

})

this.selectedGlasscats = catsArray;
this.outerselectedGlasscats = catsArray;

this.form.patchValue({'GlassCategory':this.selectedGlasscats[0]});



if(this.flushFlag===true){
this.form.patchValue({'OuterGlassCategory':this.outerselectedGlasscats[0]});
}


//=================================================================================

}

//=================END=====================
//=======================================================================================

}

//==============================================cOLLAPSE SUBORIENTATION AND OTHER THINGS============================================================
suborientationChanges(sori : string){

this.selectedSuborients = [];
this.models.map(item =>{
//=========================Collapse Sub Configs=============================
  if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===this.form.value.SystemType && item.SubOrientation === sori && item.Status === "ACTIVE")
   {
    this.selectedSuborients.push(item);
   }
})

//=============================================
//=============================================
//=============================================
this.maxWidth = '';
this.maxHeight = '';
this.handle = false;
this.selectedHandle = [];
this.selectedHandleVariant = [];
this.Matte = false;
this.OuterMatte = false;
this.doorCloser = false;
this.dropSeal = false;
this.GlassVariant = false;
this.OuterGlassVariant = false;
this.handleVarients= false;
this.selectedHandles = [];
this.selectedColor = [];
this.staticColor = [];
this.selectedGlassFinish = [];
this.staticGlassFinish = [];
this.glassSubCatTemp = [];
this.OuterGlassFinishArray =[];
this.outerselectedGlassFinish = [];
this.outerstaticGlassFinish = [];
this.outerglassfinishTemp = [];
this.selectedGlassVariant = [];
this.staticGlassVariant = [];
this.outerselectedGlassVariant = [];
this.outerstaticGlassVariant = [];
this.selectedGlasscats = [];
this.outerselectedGlasscats = [];
this.selectedGlasssubcats = [];
this.glasssubcatsTemp = [];
this.outerselectedGlasssubcats = [];
this.outerglasssubcatsTemp = [];

this.grid = false;

this.form.patchValue({'Grid': null});
this.form.patchValue({'Color':null});
this.form.patchValue({'GlassCategory':null});
this.form.patchValue({'GlassSubCategory':null});
this.form.patchValue({'GlassFinish':null});
this.form.patchValue({'GlassVariant':null});
this.form.patchValue({'Matte':null});
this.form.patchValue({'OuterGlassCategory':null});
this.form.patchValue({'OuterGlassFinish':null});
this.form.patchValue({'OuterGlassSubCategory':null});
this.form.patchValue({'OuterGlassVariant':null});
this.form.patchValue({'OuterMatte':null});
this.form.patchValue({'Handle':null});
this.form.patchValue({'HandleVariant':null});
this.form.patchValue({'DoorCloser':null});
this.form.patchValue({'DropSeal':null});
this.form.patchValue({'Lock':null});




//============================for colors=======some part glass=========
let ColorArray =[];
let GlassSubCatArray = [];

this.models.map(item =>{
  if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===this.form.value.SystemType&&item.Orientation === this.form.value.Orientation &&  item.SubOrientation === sori && item.Status === "ACTIVE")
   {

    ColorArray = item.Colors;//====for color===
    GlassSubCatArray  =  item.GlassFinishes;
    this.glassSubCatTemp = item.GlassFinishes;
    this.maxWidth = item.MaxWidth;
    this.maxHeight = item.MaxHeight;

    //===========================for grid=======
    if(item.Grid==="YES"){this.grid=true;
    this.form.get('Grid').enable();//=====
    this.form.patchValue({'Grid':"NO"});

    };
    if(item.Grid==="NO"){this.grid=false;
    this.form.get('Grid').disable();//=====  
    this.form.patchValue({'Grid': null});
    };


   //================LOck========================

    if(item.Lock==="YES"){
      this.Lock=true;
      this.form.get('Lock').enable();//=========
      this.form.patchValue({'Lock': "NO"});
   

      if(this.form.value.System==="WALTZ.SWING"&&this.form.value.SubSystem==="FLUSH")
      {
        this.LockFlag =true
      }else{
        this.LockFlag = false
      }
    
    };
    if(item.Lock==="NO"){
      this.Lock=false;
      this.form.get('Lock').disable();//=========    
      this.form.patchValue({'Lock': null});  
    };
    //===========================for Handle=======


    if(item.Handles.length>0)
    {
       
      this.handle = true;
      item.Handles.map(item =>{

        this.selectedHandle.push(item);

      });
   

      console.log(this.selectedHandle)
      this.form.get('Handle').enable();//=====
      this.form.patchValue({'Handle':this.selectedHandle[0]});


    }else {
      this.form.get('Handle').disable();//=====
    }



    //===========================for DoorCloser=======
    if(item.DoorCloser==="YES"){this.doorCloser=true;
      this.form.get('DoorCloser').enable();//=====
      this.form.patchValue({'DoorCloser':"NO"});
    };
    if(item.DoorCloser==="NO"){this.doorCloser=false; this.form.get('DoorCloser').disable();};

    //=========================for DropSeal========

    if(item.DropSeal==="YES"){this.dropSeal=true;
      this.form.patchValue({'DropSeal':"NO"});
      this.form.get('DropSeal').enable();//=====

    };
    if(item.DropSeal==="NO"){this.dropSeal=false;
       this.form.get('DropSeal').disable();
      }

   }
})


ColorArray.map(itemCA=>{

this.colors.map(item=>{
  if(item.Color===itemCA){
    this.selectedColor.push(item);
    this.staticColor.push(item);

  }
})


})
//=========================for inner  glass finishes======================================

let catsArray = [];


GlassSubCatArray.map(item =>{

  this.glasscats.map(itemC =>{
   if(itemC.GlassSubCategory.includes(item)&&(!catsArray.includes(itemC.GlassCategory)))
   {
     catsArray.push(itemC.GlassCategory)
   }

  })

})

this.selectedGlasscats = catsArray;
this.outerselectedGlasscats = catsArray;

this.form.patchValue({'GlassCategory':this.selectedGlasscats[0]});


if(this.flushFlag===true){
this.form.patchValue({'OuterGlassCategory':this.outerselectedGlasscats[0]});
}


}

//==============================================cOLLAPSE FRAME FINISHES AND OTHER THINGS============================================================
colorChanges(color : string){

  this.selectedColor = [];
  this.colors.map(item =>{
  //=========================Collapse=============================
    if(item.Color===color)
     {
      this.selectedColor.push(item);
     }
  })

  }

uncollapseColor()
{

  this.selectedColor = [];
  this.selectedColor = this.staticColor;

}


//======================================On Grid Changes==========================
OnGridChanges(){

  this.subscription.push(this.form.get('Grid').valueChanges.subscribe(response=>{
 
    

    this.designs = [];
    this.designflag = false;
    this.selecteddesign = [];
    this.staticdesign =[];
    this.form.get('Design').disable();
    this.form.patchValue({'Design': null});
    this.GLFlag = false;
   
    this.grids.map((item)=>{
      if(item.GridName===response&&item.Status==="ACTIVE")
      {
        this.designs.push(item)
        this.selecteddesign.push(item)
        this.staticdesign.push(item)
      }
    })


    if(this.selecteddesign.length>0)
    {
      this.designflag = true
      this.form.get('Design').enable();
    }

  }))

}

designChanges(design : string)
{
  this.selecteddesign = [];

  this.designs.map((item)=>{
    if(item.Design===design)
    {
      this.selecteddesign.push(item)
      if(item.GlassNumber==="YES")
      {
        this.GLFlag = true;
        this.form.get('OuterGlassCategory').enable();//=====
        this.form.patchValue({'OuterGlassCategory':this.outerselectedGlasscats[0]});
        this.form.get('OuterGlassFinish').enable();//=====
      
      
        this.form.get('OuterGlassSubCategory').enable();//=====
        this.form.patchValue({'OuterSubGlassCategory':this.outerselectedGlasssubcats[0]});
      
        
      }

      if(item.GlassNumber==="NO")
      {
        this.GLFlag = false;
        this.form.get('OuterGlassCategory').disable();//=====
        this.form.get('OuterGlassFinish').disable();//=====
        this.form.get('OuterGlassSubCategory').disable();//=====
      }
    }
  })

  
}

uncollapseDesign()
{

  this.selecteddesign = [];
  this.selecteddesign = this.staticdesign;

}


//======================================On Glass Finish Change=========================================================================

OnGlassFinishChanges(GlassModel:string){


  this.selectedGlassFinish = [];
  this.staticGlassVariant =[];


  this.glassfinishes.map(item =>{
  //=========================Collapse=============================
    if(item.GlassModel===GlassModel)
     {


      this.selectedGlassFinish.push(item);
      if(item.Matte==="YES"&&item.GlassVariants.length<1){this.Matte = true;
        this.form.get('Matte').enable();//=====
        this.form.patchValue({'Matte':"NO"});
      }else{this.Matte = false
        this.form.get('Matte').disable();//=====
      };
     }
  })



  this.selectedGlassVariant =[];
  this.staticGlassVariant =[];


  this.GlassVariant=false;
  let GlassVariantsTemp = [];
  this.glassfinishes.map(item =>{
    if(item.GlassModel===GlassModel)
    {
      GlassVariantsTemp = item.GlassVariants;
    }
  });


if(GlassVariantsTemp.length>0){this.GlassVariant=true;
  this.form.get('GlassVariant').enable();//=====
}
else{this.GlassVariant=false;
  this.form.get('GlassVariant').disable();//=====
}

GlassVariantsTemp.map(item=>{

  this.glassvariants.map(itemGv=>{

    if(itemGv.GlassVariantModel===item)
    {
      this.selectedGlassVariant.push(itemGv);
      this.staticGlassVariant.push(itemGv);
    }
  })

})


}


//============================================On OUter Glass FInish CHange=======================================
OnOuterGlassFinishChanges(GlassModel:string){

  this.OuterGlassVariant= false;
  this.outerselectedGlassFinish = [];
  this.outerstaticGlassVariant =[];
  this.glassfinishes.map(item =>{
  //=========================Collapse=============================
    if(item.GlassModel===GlassModel)
     {
      this.outerselectedGlassFinish.push(item);
      if(item.Matte=="YES"&&item.GlassVariants.length<1){this.OuterMatte = true;
        this.form.get('OuterMatte').enable();//=====
      this.form.patchValue({'OuterMatte':"NO"});
      }else{this.OuterMatte = false;
        this.form.get('OuterMatte').disable();//=====
      };
     }
  })



  this.outerselectedGlassVariant =[];
  this.outerstaticGlassVariant =[];


  this.OuterGlassVariant=false;
  let OuterGlassVariantsTemp = [];
  this.glassfinishes.map(item =>{
    if(item.GlassModel===GlassModel)
    {
      OuterGlassVariantsTemp = item.GlassVariants;
    }
  });


if(OuterGlassVariantsTemp.length>0){this.OuterGlassVariant=true;
  this.form.get('OuterGlassVariant').enable();//=====
}
else{this.OuterGlassVariant=false;
  this.form.get('OuterGlassVariant').disable();//=====
}

OuterGlassVariantsTemp.map(item=>{

  this.glassvariants.map(itemGv=>{

    if(itemGv.GlassVariantModel===item)
    {
      this.outerselectedGlassVariant.push(itemGv);
      this.outerstaticGlassVariant.push(itemGv);
    }
  })

})



}


//=========================================COLLAPSIBLE LABELS=================================================================
uncollapseConfig(){
  this.selectedModels = [];
  this.selectedModels = this.staticModels
}
//==========================================================================================================
uncollapseSubConfig(){
  this.selectedSuborients = [];
  this.selectedSuborients = this.staticSuborients;
}
//========================================================================
uncollapseGlassFinish(){
  this.selectedGlassFinish = [];
  this.selectedGlassFinish = this.staticGlassFinish;
}

//========================================================================
uncollapseOuterGlassFinish(){
  this.outerselectedGlassFinish = [];
  this.outerselectedGlassFinish = this.outerstaticGlassFinish;
}


//========================================================================
uncollapseGlassVariant(){
  this.selectedGlassVariant = [];
  this.selectedGlassVariant = this.staticGlassVariant;
}


//========================================================================
uncollapseOuterGlassVariant(){
  this.outerselectedGlassVariant = [];
  this.outerselectedGlassVariant = this.outerstaticGlassVariant;
}


//=================================Inner Glass Variant==========================================
OnGlassVariantChanges(GlassVariantModel : string)
{
  this.selectedGlassVariant = [];
  this.glassvariants.map(item =>{
  //=========================Collapse=============================
    if(item.GlassVariantModel===GlassVariantModel)
     {
      this.selectedGlassVariant.push(item);
      if(item.Matte=="YES"){this.Matte = true;
        this.form.get('Matte').enable();//=====
      this.form.patchValue({'Matte':"NO"});
      }else{this.Matte = false
        this.form.get('Matte').disable();//=====
      };
     }
  })

}


//=================================Outer Glass Variant==========================================
OnOuterGlassVariantChanges(GlassVariantModel : string)
{
  this.outerselectedGlassVariant = [];
  this.glassvariants.map(item =>{
  //=========================Collapse=============================
    if(item.GlassVariantModel===GlassVariantModel)
     {
      this.outerselectedGlassVariant.push(item);
      if(item.Matte=="YES"){this.OuterMatte = true;
        this.form.get('OuterMatte').enable();//=====
        this.form.patchValue({'OuterMatte':"NO"});
      }else{this.OuterMatte = false;
        this.form.get('OuterMatte').disable();//=====
      };
     }
  })

}
//===============================Glass Category Changes===================================================================
OnGlassCatChanges(){

 

  this.subscription.push(this.form.get('GlassCategory').valueChanges.subscribe(response=>{
   
    this.selectedGlasssubcats = [];
    this.staticGlassFinish =[];
    this.selectedGlassFinish = [];
    this.selectedGlassVariant =[];
    this.staticGlassVariant =[];


    this.form.patchValue({'GlassFinish':null});
    this.form.patchValue({'GlassVariant':null});

   this.glasscats.map(item =>{
     if(item.GlassCategory===response)
     {

        item.GlassSubCategory.map(itemSc =>{
          if(this.glassSubCatTemp.includes(itemSc))
          {
             this.selectedGlasssubcats.push(itemSc);
          }
        })

     }
   })

   this.form.patchValue({'GlassSubCategory':this.selectedGlasssubcats[0]});

  }))

}

//===============================Outer Glass Category Changes===================================================================
OnOuterGlassCatChanges(){



  this.subscription.push(this.form.get('OuterGlassCategory').valueChanges.subscribe(response=>{

    this.outerselectedGlasssubcats = [];
    this.outerstaticGlassFinish =[];
    this.outerselectedGlassFinish = [];
    this.outerselectedGlassVariant =[];
    this.outerstaticGlassVariant =[];

    this.form.patchValue({'OuterGlassVariant':null});

    this.form.patchValue({'OuterGlassFinish':null});

    this.glasscats.map(item =>{
     if(item.GlassCategory===response){

        item.GlassSubCategory.map(itemSc =>{
          if(this.glassSubCatTemp.includes(itemSc))
          {
             this.outerselectedGlasssubcats.push(itemSc);
          }
        })

     }
   })

   this.form.patchValue({'OuterGlassSubCategory':this.outerselectedGlasssubcats[0]});

  }))

}


//=================================Outer Glass Sub Category Changes=============================================
OnOuterGlassSubCatChanges(){


  this.subscription.push(this.form.get('OuterGlassSubCategory').valueChanges.subscribe(response=>{


    this.outerselectedGlassFinish = [];
    this.outerstaticGlassFinish =[];
    this.outerselectedGlassVariant =[];
    this.outerstaticGlassVariant =[];
    this.form.patchValue({'OuterGlassFinish':null});
    this.form.patchValue({'OuterGlassVariant':null});
    this.OuterGlassVariant = false;
     this.form.get('OuterGlassVariant').disable();




  let outerglassFinTemp = [];

   this.glasssubcats.map(item =>{
    if(item.GlassSubCategory === response)
    {
     item.GlassFinish.map(itemGF=>{
      outerglassFinTemp.push(itemGF)
    })
    }
   });
   

   
   this.outerselectedGlassFinish = [];
   this.outerstaticGlassFinish =[];
   outerglassFinTemp.map(item=>{

    this.glassfinishes.map(itemG =>{if(itemG.GlassModel===item&&itemG.MaxHeight>=this.form.value.Height)
      {

       this.outerselectedGlassFinish.push(itemG);
       this.outerstaticGlassFinish.push(itemG);

      }
    })
   })
  }))

}

//================================  Glass Sub Category Changes=============================================
OnGlassSubCatChanges(){


 

  this.subscription.push(this.form.get('GlassSubCategory').valueChanges.subscribe(response=>{

 
    this.selectedGlassFinish = [];
    this.staticGlassFinish =[];
    this.selectedGlassVariant =[];
    this.staticGlassVariant =[];
    this.form.patchValue({'GlassFinish':null});
    this.form.patchValue({'GlassVariant':null});
    this.form.patchValue({'GlassVariant':null});
    this.GlassVariant = false;
    this.form.get('GlassVariant').disable();

    let glassFinTemp = [];
   


   this.glasssubcats.map(item =>{
    if(item.GlassSubCategory === response)
    {
     item.GlassFinish.map(itemGF=>
      {
      glassFinTemp.push(itemGF)
      })
    }
   });

   this.selectedGlassFinish = [];
   this.staticGlassFinish =[];
 
   glassFinTemp.map(item=>{

    this.glassfinishes.map(itemG =>{if(itemG.GlassModel===item&&itemG.MaxHeight>=this.form.value.Height)
      {

       this.selectedGlassFinish.push(itemG);
       this.staticGlassFinish.push(itemG);

      }
   });
   });

   
  }));
}

//==================================On Solution Height Changes=============================================


OnHeightChanges()
{


  let Height  = this.form.value.Height
  
 
    
    
  

  
   this.selectedGlassFinish = [];
   this.staticGlassFinish =[];
   this.selectedGlassVariant =[];
   this.staticGlassVariant =[];
   this.form.patchValue({'GlassFinish':null});
   this.form.patchValue({'GlassVariant':null});
   this.GlassVariant = false;
   this.form.get('GlassVariant').disable();




  let glassFinTemp = [];


  this.glasssubcats.map(item =>{
   if(item.GlassSubCategory === this.form.value.GlassSubCategory)
   {
    item.GlassFinish.map(itemGF=>{
     glassFinTemp.push(itemGF)
   })
   }
  });

  this.selectedGlassFinish = [];
  this.staticGlassFinish =[];

  

  glassFinTemp.map(item=>{

   this.glassfinishes.map(itemG =>{if(itemG.GlassModel===item&&itemG.MaxHeight>=Height)
     {

      this.selectedGlassFinish.push(itemG);
      this.staticGlassFinish.push(itemG);

     }
  });
  });

    this.outerselectedGlassFinish = [];
    this.outerstaticGlassFinish =[];
    this.outerselectedGlassVariant =[];
    this.outerstaticGlassVariant =[];
    this.form.patchValue({'OuterGlassFinish':null});
    this.form.patchValue({'OuterGlassVariant':null});
    this.OuterGlassVariant = false;
    this.form.get('OuterGlassVariant').disable();



  let outerglassFinTemp = [];

   this.glasssubcats.map(item =>{
    if(item.GlassSubCategory === this.form.value.OuterGlassSubCategory)
    {
     item.GlassFinish.map(itemGF=>{
      outerglassFinTemp.push(itemGF)
    })
    }
   });

   this.outerselectedGlassFinish = [];
   this.outerstaticGlassFinish =[];
   outerglassFinTemp.map(item=>{

    this.glassfinishes.map(itemG =>{if(itemG.GlassModel===item&&itemG.MaxHeight>=Height)
      {

       this.outerselectedGlassFinish.push(itemG);
       this.outerstaticGlassFinish.push(itemG);

      }
    })
   })

  if(Height>this.maxHeight)
  {
  // alert("cjh")
   this.form.patchValue({'Height':""});
  }






}

//=======================================On Discount Changes==============================================

OnDiscountChanges()
{

  this.subscription.push(this.formOr.get('Discount').valueChanges.subscribe(response=>{    
    
   
  if(response>this.maxDiscount)
  {
 
   this.formOr.patchValue({'Discount':""});
  }

  }));

}

//=========================================================================================================
  ngOnDestroy(){

    this.subscription.forEach(item =>{
      if(item) item.unsubscribe()
    })

    this.authListenerSubs.unsubscribe();
  
  }


//=============================Save Solution=======================================
//=============================Save Solution=======================================
//=============================Save Solution=======================================
onAddNewButton(){
this.modeButtons="Addnew"
this.showSpinner = true;
}

onSaveAndAddNewButton(){
  this.modeButtons = 'SaveAndAddnew';
  this.showSpinner = true;
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



  let GridPrice : number = 0;
  let GLOnePercent : number = 0;
  let GlassNumberFlag : boolean = false;
  let GLTwoPercent : number = 0;
  let HardwarePrice : number = 0;
  let ProfilePrice : number = 0;
  let GlassFinishPrice : number = 0;
  let GlassVariantPrice : number = 0;
  let OuterGlassFinishPrice : number = 0;
  let OuterGlassVariantPrice : number = 0;
  let HandlePrice : number = 0;
  let HandleVariantPrice : number = 0;
  let DoorCloserPrice : number = 0;
  let DropSealPrice : number = 0;
  let MattePrice : number = 0;
  let OuterMattePrice : number = 0;

  let AreaMm = Number(this.form.value.Width)*Number(this.form.value.Height);

  let AreaFt = 0.00001076391042*AreaMm;

  let SquareFeet = ((AreaFt*this.form.value.Quantity)).toFixed(3).toString();
  let Amount : Number  = 0;

  let DCount : number = 0;


 if(!this.form.value.SubOrientation)
 {

  this.models.map(item => {
  //====================================
    if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===this.form.value.SystemType && item.Orientation === this.form.value.Orientation &&item.SubOrientation! == this.form.value.Orientation && item.Status === "ACTIVE")
       {

        let D :number = 0;
        let F :number = 0;
        let Doors = [];
       

         
       
        for(var i = 0; i<item.Orientation.length;i++)
        {

          if(item.Orientation[i]==="D"){DCount = DCount + 1;D=D+Number(item.Dcost);}
          if(item.Orientation[i]==="F"){F=F+Number(item.FCost);}
        }
      HardwarePrice = D+F;

      let costofprofile = Number(item.HardwareCost);
      let MinSqft : number;

      if(costofprofile>AreaFt)
      {
        MinSqft = costofprofile;
      }

       if(costofprofile<AreaFt)
      {
        MinSqft = AreaFt  ;
      }



      ProfilePrice = Number(item.ProfileCost)*MinSqft;

       }

  })

}

if(this.form.value.SubOrientation)
{

 this.models.map(item => {
 //====================================
   if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===this.form.value.SystemType&&item.Orientation === this.form.value.Orientation &&  item.SubOrientation === this.form.value.SubOrientation && item.Status === "ACTIVE")
      {

       let D :number = 0;
       let F :number = 0;
       let Doors = [];
       for(var i = 0; i<item.Orientation.length;i++)
       {

         if(item.Orientation[i]==="D"){DCount = DCount + 1;D=D+Number(item.Dcost);}
         if(item.Orientation[i]==="F"){F=F+Number(item.FCost);}
       }
     HardwarePrice = D+F;

     let costofprofile = Number(item.HardwareCost);
     let MinSqft : number;

     if(costofprofile>AreaFt)
     {
       MinSqft = costofprofile;
     }

      if(costofprofile<AreaFt)
     {
       MinSqft = AreaFt  ;
     }



     ProfilePrice = Number(item.ProfileCost)*MinSqft;
     

      }

 })

}

if(this.form.value.Grid)
{
if(this.form.value.Grid ==="YES")
{
 GridPrice = this.GridCost;
}

if(this.form.value.Grid ==="NO")
{
 GridPrice = 0;
}

if(this.form.value.Design)
{
  this.grids.map(item =>{
    if(item.GridName===this.form.value.Grid && item.Design===this.form.value.Design)
    {
      GridPrice = Number(item.Price) 

      if(item.GlassNumber==="YES")
      {
        GLOnePercent = Number(item.GLOnePercent)*0.01;
        GLTwoPercent = 1-GLOnePercent;
        GlassNumberFlag = true
      }
     
    }
  })
}



}


//======= Inner Glass Finish Cost===========
//======= Inner Glass Finish Cost===========
//======= Inner Glass Finish Cost===========
if(!this.form.value.GlassVariant)
{

this.glassfinishes.map(item=>{if(item.GlassModel ===this.form.value.GlassFinish){GlassFinishPrice = Number(item.Price)}})

}

if(!this.form.value.OuterGlassVariant)
{

this.glassfinishes.map(item=>{if(item.GlassModel ===this.form.value.OuterGlassFinish){OuterGlassFinishPrice = Number(item.Price)}})

}

if(this.form.value.GlassVariant)
{

this.glassvariants.map(item=>{if(item.GlassVariantModel===this.form.value.GlassVariant){GlassFinishPrice = Number(item.Price)}})

}

if(this.form.value.OuterGlassVariant)
{

this.glassvariants.map(item=>{if(item.GlassVariantModel===this.form.value.OuterGlassVariant){OuterGlassFinishPrice = Number(item.Price)}})

}

if(this.form.value.Matte==="YES")
{
 MattePrice = 200;
}

if(this.form.value.OuterMatte==="YES")
{
 OuterMattePrice = 200;
}

if(!this.form.value.HandleVariant)
{
this.handles.map(item => {if(item.Handle===this.form.value.Handle){HandlePrice=Number(item.Price)}})
}

if(this.form.value.HandleVariant)
{
this.handlevariant.map(item => {if(item.HandleVariant===this.form.value.HandleVariant){HandlePrice=Number(item.Price)}})

}

if(this.form.value.DropSeal==="YES")
{
  DropSealPrice = this.DropSealCost;

}

if(this.form.value.DoorCloser === "YES")
{
 DoorCloserPrice = this.DoorCloserCost;
}
let LockCost : number = 0
if(this.form.value.Lock === "YES")
{
  LockCost = 12000;
}


// Value =  parseInt((hardwarecost + glasscost1*AreaFT +glasscost2*AreaFT+ mattecost1*AreaFT+ mattecost2*AreaFT + totalprofilecost + GridCost*AreaFT + DoorPrice + HandlePrice*Dcount+DropSealCost + LockCost )*Quantity*ChangedFactor)  

if(GlassNumberFlag)
{
  GlassFinishPrice = GlassFinishPrice*GLOnePercent;
  MattePrice = MattePrice*GLOnePercent;
  OuterGlassFinishPrice = OuterGlassFinishPrice*GLTwoPercent;
  OuterMattePrice = OuterMattePrice*GLTwoPercent;
}




Amount = parseInt(((ProfilePrice + HardwarePrice  + GlassFinishPrice*AreaFt + OuterGlassFinishPrice*AreaFt + MattePrice*AreaFt + OuterMattePrice*AreaFt + GridPrice*AreaFt + HandlePrice*DCount + DoorCloserPrice + DropSealPrice + LockCost)*Number(this.form.value.Quantity)*this.Factor).toString());



//=========================================================================thi=======================
//================================================================================================
//================================================================================================

 

  this.wqgformService.addAndUpdateSolutions(
    this.OrderCompleted,
    this.orderStatus,
    this.procoreID,
    this.orderId,
    this.EditSpace,
    this.modeButtons,
    this.form.value.Floor,
    this.form.value.Space,
    this.form.value.System,
    this.form.value.SubSystem,
    this.form.value.SystemType,
    this.form.value.Orientation,
    this.form.value.SubOrientation,
    this.form.value.Grid,
    this.form.value.Design,
    this.form.value.Width,
    this.form.value.Height,
    this.form.value.Quantity,
    this.form.value.Color,
    this.form.value.GlassCategory,
    this.form.value.GlassSubCategory,
    this.form.value.GlassFinish,
    this.form.value.GlassVariant,
    this.form.value.Matte,
    this.form.value.OuterGlassCategory,
    this.form.value.OuterGlassSubCategory,
    this.form.value.OuterGlassFinish,
    this.form.value.OuterGlassVariant,
    this.form.value.OuterMatte,
    this.form.value.Handle,
    this.form.value.HandleVariant,
    this.form.value.DoorCloser,
    this.form.value.DropSeal,
    this.form.value.Lock,
    Amount.toString(),
    SquareFeet,
    this.form.value.Remarks
    )



  this.form.reset();
  this.form.patchValue({'Floor':'GROUND'});
  this.form.patchValue({'Quantity':1});
  this.form.patchValue({'System':"WALTZ.SLIDE"});
  this.EditSpace = null;
  this.Solutions = this.wqgformService.Solutions;


  

  
}

//============================Edit Solution=======================================
//============================Edit Solution=======================================
//============================Edit Solution=======================================

onEditSolution(index:number,ProcoreLocationID:any,ProcorePunchItemID:any){


  this.modeButtons = 'UpdateSpace'
  this.ProjectDetailsForm = false;
  this.SolutionForm = true;
  this.TablesForm = false;
  this.EditSpace = index;

  this.selectedModels = [];
  this.selectedColor = [];
  this.staticColor = [];
  this.outerselectedGlassFinish = [];


  

  if(this.wqgformService.Solutions)

  this.form.patchValue({'Floor':this.wqgformService.Solutions[index].Floor});
  this.form.patchValue({'Space':this.wqgformService.Solutions[index].Space});
  this.form.patchValue({'System':this.wqgformService.Solutions[index].System});
  this.form.patchValue({'SubSystem':this.wqgformService.Solutions[index].SubSystem});
  this.form.patchValue({'SystemType':this.wqgformService.Solutions[index].SystemType});
  this.form.patchValue({'Height':Number(this.wqgformService.Solutions[index].Height)});
  this.form.patchValue({'Matte':""});
  this.form.patchValue({'OuterMatte':""});
  this.Matte = false;


//=========For Orientations=============================================================

  this.form.patchValue({'Orientation':this.wqgformService.Solutions[index].Orientation});
  


  this.form.get('SubOrientation').disable();//=====
  this.form.get('Grid').disable();//=====
  this.form.get('GlassVariant').disable();//=====
  this.form.get('Matte').disable();//=====
  this.form.get('Handle').disable();//=====
  this.form.get('HandleVariant').disable();//=====
  this.form.get('DoorCloser').disable();//=====
  this.form.get('DropSeal').disable();//=====
  this.form.get('OuterGlassCategory').disable();//=====
  this.form.get('OuterGlassFinish').disable();//=====
  this.form.get('OuterGlassSubCategory').disable();//=====
  this.form.get('OuterGlassVariant').disable();//=====
  this.form.get('OuterMatte').disable();//=====
  this.form.get('Lock').disable();//=====
  this.form.get('Design').disable();//=====

  let namespace = [];

  this.models.map(item => {

  if(item.Orientation===this.wqgformService.Solutions[index].Orientation &&item.System===this.wqgformService.Solutions[index].System && item.SubSystem===this.wqgformService.Solutions[index].SubSystem && item.SystemType===this.wqgformService.Solutions[index].SystemType && (!namespace.includes(item))&& item.Status === "ACTIVE")
  {

    this.selectedModels = [];
     this.selectedModels.push(item);
     namespace.push(item)
    
  }

  //====================================
    if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===this.form.value.SystemType && item.Orientation === this.form.value.Orientation && item.SOFlag!=="NO" && item.Status === "ACTIVE")
       {
        //this.selectedSuborients.push(item);
        this.staticSuborients.push(item);
        this.form.patchValue({'SubOrientation':false});
        if(item.SOFlag==="YES")
        {
   
         this.form.get('SubOrientation').enable();
         this.form.patchValue({'SubOrientation':null});
   
        }
       }
  //====================================
    if(item.System===this.wqgformService.Solutions[index].System && item.SubSystem===this.wqgformService.Solutions[index].SubSystem && item.SystemType===this.wqgformService.Solutions[index].SystemType && item.Orientation === this.wqgformService.Solutions[index].Orientation && item.SubOrientation === this.wqgformService.Solutions[index].SubOrientation && item.Status === "ACTIVE")
      {
      this.selectedSuborients.push(item);
      }
  });



  if(this.selectedSuborients.length>0)
  {
    this.grid = false;
    this.form.get('SubOrientation').enable();//=====
    
  }
  else
  //=====================Start======
  {
    

  //============================for colors=======some part glass=========
    let ColorArray =[];
    let GlassSubCatArray = [];
    this.selectedGlassFinish = [];

    this.models.map(item =>{
      if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===this.form.value.SystemType && item.Orientation === this.form.value.Orientation && item.SubOrientation ===  this.form.value.Orientation && item.Status === "ACTIVE")
       {

        ColorArray = item.Colors;//====for color===
        GlassSubCatArray =  item.GlassFinishes;
        this.glassSubCatTemp = item.GlassFinishes;
        this.maxWidth = item.MaxWidth;
        this.maxHeight = item.MaxHeight;

        //===========================for grid=======
        if(item.Grid==="YES"){this.grid=true
          this.form.get('Grid').enable();
        };
        if(item.Grid==="NO"){this.grid=false
          this.form.get('Grid').disable();
        };

        //===========Lock=======================
        if(item.Lock==="YES"){this.Lock=true
          this.form.get('Lock').enable();
       
          if(this.form.value.System==="WALTZ.SWING"&&this.form.value.SubSystem==="FLUSH")
          {
            this.LockFlag =true
          }else{
            this.LockFlag = false
          }

        };
        if(item.Lock==="NO"){this.Lock=false
          this.form.get('Lock').disable();
        };
        //===========================for Handle=======
       
        
        if(item.Handles.length>0)
        {
          this.form.get('Handle').enable();
          this.handle = true;
          item.Handles.map(item =>{
    
            this.selectedHandle.push(item);
    
          });


          if(this.wqgformService.Solutions[index].Handle==="STANDARD")
          {
            this.StandardFlag = true;
          }else{
            this.StandardFlag = false;
          }
        
          
    
        }


        //===========================for DoorCloser=======
        if(item.DoorCloser==="YES"){this.doorCloser=true
          this.form.patchValue({'DoorCloser':"NO"});
          this.form.get('DoorCloser').enable();
        };
        if(item.DoorCloser==="NO"){this.doorCloser=false
          this.form.get('DoorCloser').disable();
        };

        //=========================for DropSeal========

        if(item.DropSeal==="YES"){this.dropSeal=true;
          this.form.get('DropSeal').enable();


        };
        if(item.DropSeal==="NO"){this.dropSeal=false
          this.form.get('DropSeal').disable();
        };

       }

    })



  //=========================for inner  glass finishes======================================
  this.selectedGlasscats = [];
  this.selectedGlasssubcats = [];
  
  let catsArray = [];



 GlassSubCatArray.map(item =>{

  this.glasscats.map(itemC =>{
   if(itemC.GlassSubCategory.includes(item)&&(!catsArray.includes(itemC.GlassCategory)))
   {
     catsArray.push(itemC.GlassCategory)
   }

  })

  })

  this.selectedGlasscats = catsArray;
 
  this.outerselectedGlasscats = catsArray;

  if(this.flushFlag===true){

    this.form.get('OuterGlassCategory').enable();//=====
    this.form.get('OuterGlassFinish').enable();//=====
    this.form.get('OuterGlassSubCategory').enable();//=====
    this.form.patchValue({'OuterGlassCategory':this.outerselectedGlasscats[0]});
  }

  this.form.patchValue({'GlassCategory':this.wqgformService.Solutions[index].GlassCategory});
  this.form.patchValue({'GlassSubCategory':this.wqgformService.Solutions[index].GlassSubCategory});
  this.form.patchValue({'OuterGlassCategory':this.wqgformService.Solutions[index].OuterGlassCategory});
  this.form.patchValue({'OuterGlassSubCategory':this.wqgformService.Solutions[index].OuterGlassSubCategory});
  //=================================================================================

  this.selectedColor = [];
  this.staticColor = [];
  this.selectedGlassFinish = [];
  this.outerselectedGlassFinish = [];
 
   ColorArray.map(itemCA=>{

    this.colors.map(item=>{
      if(item.Color===itemCA){
       // this.selectedColor.push(item);
       this.staticColor.push(item);
      }
    })


    })

    this.colors.map(item =>{
      //=========================Collapse=============================
        if(item.Color===this.wqgformService.Solutions[index].Color)
         {
          this.selectedColor.push(item);
         }
      })

//=========================================================================
  


  this.glassfinishes.map(item=>{
    if(item.GlassModel===this.wqgformService.Solutions[index].GlassFinish)
    {
      this.selectedGlassFinish = [];
      this.selectedGlassFinish.push(item);
      if(item.Matte==="YES")
      {
          this.Matte = true;
          this.form.get('Matte').enable();
          this.form.patchValue({'Matte':this.wqgformService.Solutions[index].Matte});
      }
      if(item.Matte==="NO")
      {
          this.Matte = false;
          this.form.get('Matte').disable();
      }
    }
  })


 //=========================================================================


this.outerglassfinishes.map(item=>{
  if(item.GlassModel===this.wqgformService.Solutions[index].OuterGlassFinish)
  {
    this.outerselectedGlassFinish = [];
    this.outerselectedGlassFinish.push(item);
    
    if(item.Matte==="YES")
    {
        this.OuterMatte = true;
        this.form.get('OuterMatte').enable();
        this.form.patchValue({'OuterMatte':this.wqgformService.Solutions[index].OuterMatte});
    }
    if(item.Matte==="NO")
    {
        this.Matte = false;
        this.form.get('Matte').disable();
    }
  }
});


  }





//=========For SubOrientations==========================================================

  if(this.wqgformService.Solutions[index].SubOrientation){
  this.form.patchValue({'SubOrientation':this.wqgformService.Solutions[index].SubOrientation});


   //============================for colors=======some part glass=========
let ColorArray =[];
let GlassSubCatArray = [];

this.models.map(item =>{
  if(item.System===this.form.value.System && item.SubSystem===this.form.value.SubSystem && item.SystemType===this.form.value.SystemType&&item.Orientation === this.form.value.Orientation &&  item.SubOrientation === this.form.value.SubOrientation && item.Status === "ACTIVE")
   {

    ColorArray = item.Colors;//====for color===
    GlassSubCatArray =  item.GlassFinishes;
    this.glassSubCatTemp = item.GlassFinishes;
    this.maxWidth = item.MaxWidth;
    this.maxHeight = item.MaxHeight;

    //===========================for grid=======
    if(item.Grid==="YES"){this.grid=true;
      this.form.get('Grid').enable();

    };
    if(item.Grid==="NO"){this.grid=false;
      this.form.get('Grid').disable();
    };
    //===========================for Handle=======


    if(item.Handles.length>0)
    {
      this.form.get('Handle').enable();
      this.handle = true;
      item.Handles.map(item =>{

        this.selectedHandle.push(item);

      });

      if(this.wqgformService.Solutions[index].Handle==="STANDARD")
      {
        this.StandardFlag = true;
      }else{
        this.StandardFlag = false;
      }
      

    }

    //===========================for DoorCloser=======
    if(item.DoorCloser==="YES"){this.doorCloser=true
      this.form.get('DoorCloser').enable();

    };
    if(item.DoorCloser==="NO"){this.doorCloser=false;

      this.form.get('DoorCloser').disable();
    
    };

    //=========================for DropSeal========

    if(item.DropSeal==="YES"){this.dropSeal=true;
      this.form.get('DropSeal').enable();


    };
    if(item.DropSeal==="NO"){this.dropSeal=false
      this.form.get('DropSeal').disable();
    };

   }


})





//=========================for inner  glass finishes======================================

let catsArray = [];
this.selectedGlasscats = [];
this.selectedGlasssubcats = [];

GlassSubCatArray.map(item =>{

 this.glasscats.map(itemC =>{
  if(itemC.GlassSubCategory.includes(item)&&(!catsArray.includes(itemC.GlassCategory)))
  {
    catsArray.push(itemC.GlassCategory)
  }

 })

 })

 this.selectedGlasscats = catsArray;

 this.outerselectedGlasscats = catsArray;



if(this.flushFlag===true){
  this.form.get('OuterGlassCategory').enable();//=====
  this.form.get('OuterGlassFinish').enable();//=====
  this.form.get('OuterGlassSubCategory').enable();//=====
  this.form.patchValue({'OuterGlassCategory':this.outerselectedGlasscats[0]});

}


  this.form.patchValue({'GlassCategory':this.wqgformService.Solutions[index].GlassCategory});
  this.form.patchValue({'GlassSubCategory':this.wqgformService.Solutions[index].GlassSubCategory});
  this.form.patchValue({'OuterGlassCategory':this.wqgformService.Solutions[index].OuterGlassCategory});
  this.form.patchValue({'OuterGlassSubCategory':this.wqgformService.Solutions[index].OuterGlassSubCategory});


this.selectedColor = [];
this.staticColor = [];
this.selectedGlassFinish = [];
this.outerselectedGlassFinish = [];



ColorArray.map(itemCA=>{
this.colors.map(item=>{
  if(item.Color===itemCA){
   // this.selectedColor.push(item);
    this.staticColor.push(item);
  }
})
})

this.colors.map(item =>{
  //=========================Collapse=============================
    if(item.Color===this.wqgformService.Solutions[index].Color)
     {
      this.selectedColor.push(item);
     }
  })



 console.log(this.wqgformService.Solutions[index].Grid)
 
  if(this.wqgformService.Solutions[index].Grid)
  {

    this.selecteddesign = [];
    this.staticdesign = [];

      this.selectedgrids = [];
      this.grids.map((item)=>{
     
       if(!this.selectedgrids.includes(item.GridName))
       {
        
         if(item.Status==="ACTIVE")
         {
           this.selectedgrids.push(item.GridName)
         } 
        
     
     
       }
     
      }) 
     

      this.form.patchValue({'Grid':this.wqgformService.Solutions[index].Grid});
     
      

    if(this.wqgformService.Solutions[index].ProcoreField)
    {

      this.form.get('Design').enable();
      this.grids.map((item)=>{
        if(item.GridName===this.form.value.Grid)
        {
          this.staticdesign.push(item)
        }
  
        if(item.GridName===this.form.value.Grid&&item.Design===this.wqgformService.Solutions[index].ProcoreField)
        {
          this.selecteddesign.push(item)
          if(item.GlassNumber==="YES")
          {
            this.GLFlag = true;
            this.form.get('OuterGlassCategory').enable();//=====
            this.form.patchValue({'OuterGlassCategory':this.wqgformService.Solutions[index].OuterGlassCategory});
            this.form.get('OuterGlassFinish').enable();//=====
            this.form.get('OuterGlassSubCategory').enable();//=====
            this.form.patchValue({'OuterSubGlassCategory': this.wqgformService.Solutions[index].OuterGlassSubCategory});
          
            
          }
    
          if(item.GlassNumber==="NO")
          {
            this.GLFlag = false;
            this.form.get('OuterGlassCategory').disable();//=====
            this.form.get('OuterGlassFinish').disable();//=====
            this.form.get('OuterGlassSubCategory').disable();//=====
          }
        }
      })
    }

  
  



  }
 



this.glassfinishes.map(item=>{
  if(item.GlassModel===this.wqgformService.Solutions[index].GlassFinish)
  {
    this.selectedGlassFinish = [];
    this.selectedGlassFinish.push(item);
    if(item.Matte==="YES")
    {
      this.Matte = true;
      this.form.get('Matte').enable();
      this.form.patchValue({'Matte':this.wqgformService.Solutions[index].Matte});
    }
    if(item.Matte==="NO")
    {
      this.Matte = false;
      this.form.get('Matte').disable();
    }

  }
})


//=========================================================================



this.outerglassfinishes.map(item=>{
if(item.GlassModel===this.wqgformService.Solutions[index].OuterGlassFinish)
{
  this.outerselectedGlassFinish = [];
  this.outerselectedGlassFinish.push(item);
  if(item.Matte==="YES")
  {
    this.OuterMatte = true;
    this.form.get('OuterMatte').enable();
    this.form.patchValue({'OuterMatte':this.wqgformService.Solutions[index].OuterMatte});
  }
  if(item.Matte==="NO")
  {
    this.OuterMatte = false;
    this.form.get('OuterMatte').disable();
  }
}
});


  this.form.patchValue({'OuterGlassFinish':this.wqgformService.Solutions[index].OuterGlassFinish});





  }



  if(this.wqgformService.Solutions[index].GlassVariant)
  {
    this.GlassVariant=true;
    this.form.get('GlassVariant').enable();
    let GlassVariantTemp = [];
    this.glassfinishes.map(item=>{
      if(item.GlassModel===this.wqgformService.Solutions[index].GlassFinish)
      {
        GlassVariantTemp = item.GlassVariants
      }
    })


    GlassVariantTemp.map((item)=>{
      this.glassvariants.map(itemGV=>{
        if(item===itemGV.GlassVariantModel)
        {
          this.staticGlassVariant.push(itemGV)
        }
      })
    })

    this.glassvariants.map(itemGV=>{
      if(itemGV.GlassVariantModel===this.wqgformService.Solutions[index].GlassVariant)
      {
        this.selectedGlassVariant.push(itemGV)
        if(itemGV.Matte==="YES")
        {
          this.Matte = true;
          this.form.get('Matte').enable();
          this.form.patchValue({'Matte':this.wqgformService.Solutions[index].Matte});
        }
        if(itemGV.Matte==="NO")
        {
          this.Matte = false;
          this.form.get('Matte').disable();
        }
      }
    })
  }

  if(this.wqgformService.Solutions[index].OuterGlassVariant)
  {
    this.OuterGlassVariant=true;
    this.form.get('OuterGlassVariant').enable();
    let GlassVariantTemp = [];
    this.glassfinishes.map(item=>{
      if(item.GlassModel===this.wqgformService.Solutions[index].GlassFinish)
      {
        GlassVariantTemp = item.GlassVariants
      }
    })


    GlassVariantTemp.map((item)=>{
      this.glassvariants.map(itemGV=>{
        if(item===itemGV.GlassVariantModel)
        {
          this.outerstaticGlassVariant.push(itemGV)
        }
      })
    })

    this.glassvariants.map(itemGV=>{
      if(itemGV.GlassVariantModel===this.wqgformService.Solutions[index].OuterGlassVariant)
      {
        this.outerselectedGlassVariant.push(itemGV)
        if(itemGV.Matte==="YES")
        {
          this.OuterMatte = true;
          this.form.get('OuterMatte').enable();
          this.form.patchValue({'OuterMatte':this.wqgformService.Solutions[index].OuterMatte});
        }
        if(itemGV.Matte==="NO")
        {
          this.OuterMatte = false;
          this.form.get('OuterMatte').disable();
        }
      }
    })
  }

  this.form.patchValue({'Width':this.wqgformService.Solutions[index].Width});

  
  this.form.patchValue({'Height':Number(this.wqgformService.Solutions[index].Height)});
  
  this.form.patchValue({'Quantity':this.wqgformService.Solutions[index].Quantity});

  this.form.patchValue({'Color':this.wqgformService.Solutions[index].Color});

  this.form.patchValue({'GlassFinish':this.wqgformService.Solutions[index].GlassFinish});

  this.form.patchValue({'GlassVariant':this.wqgformService.Solutions[index].GlassVariant});
  this.form.patchValue({'Design':this.wqgformService.Solutions[index].ProcoreField});


  if(this.wqgformService.Solutions[index].Matte==="YES")
  {
   
    this.Matte = true;
    this.form.get('Matte').enable();
    this.form.patchValue({'Matte':this.wqgformService.Solutions[index].Matte});

  }

  if(this.wqgformService.Solutions[index].OuterMatte==="YES")
  {
   
    this.OuterMatte = true;
    this.form.get('OuterMatte').enable();
    this.form.patchValue({'OuterMatte':this.wqgformService.Solutions[index].OuterMatte});

  }

  if(this.wqgformService.Solutions[index].Lock)
  {
   
    this.Lock = true;
    this.form.get('Lock').enable();
    this.form.patchValue({'Lock':this.wqgformService.Solutions[index].Lock});
  
    if(this.form.value.System==="WALTZ.SWING"&&this.form.value.SubSystem==="FLUSH")
    {
      this.LockFlag =true
    }else{
      this.LockFlag = false
    }

  }


 
  this.form.patchValue({'OuterGlassFinish':this.wqgformService.Solutions[index].OuterGlassFinish});

  this.form.patchValue({'OuterGlassVariant':this.wqgformService.Solutions[index].OuterGlassVariant});

  this.form.patchValue({'Handle':this.wqgformService.Solutions[index].Handle});

  this.form.patchValue({'HandleVariant':this.wqgformService.Solutions[index].HandleVariant});

  this.form.patchValue({'DoorCloser':this.wqgformService.Solutions[index].DoorCloser});

  this.form.patchValue({'DropSeal':this.wqgformService.Solutions[index].DropSeal});
  this.form.patchValue({'Lock':this.wqgformService.Solutions[index].Lock});

  this.form.patchValue({'Remarks':this.wqgformService.Solutions[index].Remarks});
   this.form.patchValue({'Height':this.wqgformService.Solutions[index].Height});

}


//============================Delete Solution=======================================
//============================Delete Solution=======================================
//============================Delete Solution=======================================
onDeleteSolution(index : number,LocationID : any,PunchItemID : any){


  this.wqgformService.deleteSolution(this.orderId,this.procoreID,index,LocationID,PunchItemID,this.OrderCompleted);
}

//==================================================================================
//==================================================================================
//==================================================================================


OrderNo : string = '';
Status  : string = '';
Active  : string = '';
Completed  : string = '';
WinDate  : string = '';
CompletionDate : string = '';
Associate  : string = '';
ProjectManager  : string = '';
DateCreated  : string = '';




//===============================State Changes in Form=====

onAddSpace(){

  this.ProjectDetailsForm = false;
  this.SolutionForm = true;
  this.TablesForm = false;
  this.modeButtons = 'Addnew';

}


//=============================Save Order=======================================
//=============================Save Order=======================================
//=============================Save Order=======================================



onSaveOrder(){
 
  this.wqgformService.getCurrentDateTime();
  console.log(this.userID)
 
   this.wqgformService.updateOrder(
    this.formMode, 
    this.orderId,
    this.OrderNo,
    this.ProjectName,
    this.ClientName,
    this.Location,
    this.Architect,
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
    this.OfficeID,
    this.DealerDiscount,
    this.DateCreated,
    this.userID,
    this.ActualProfile
  

     )

  


 }

 DeleteQuantity(){
  this.form.patchValue({'Quantity': 0});
 }





}
