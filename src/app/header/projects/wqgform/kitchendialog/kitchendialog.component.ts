import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { KitchendialogService } from 'src/app/services/kitchendialog.service';
import { KitchentypeService } from 'src/app/services/kitchentype.service';
import { WqgformService } from 'src/app/services/wqgform.service';
import { Drawing } from 'src/app/shared/drawing.model';
import { Glasssubcat } from 'src/app/shared/glasssubcat.model';
import { Hinge } from 'src/app/shared/hinge.model';
import { KitchenHandle } from 'src/app/shared/kitchenhandle.model';
import { KitchenHandlePosition } from 'src/app/shared/kitchenhandleposition.model';
import { KitchenSpecs } from 'src/app/shared/kitchenspecs.model';
import { KitchenType } from 'src/app/shared/kitchentype.model';

@Component({
  selector: 'app-kitchendialog',
  templateUrl: './kitchendialog.component.html',
  styleUrls: ['./kitchendialog.component.css']
})
export class KitchendialogComponent implements OnInit, OnDestroy {

  KitchenType : string;
  GlassFinish : string;
  FrameFinish : string;
  Matte : string;
  GlassSubCat : string;
  KitchenSpec : KitchenSpecs;

  editindex : any;
 


  kitchenhandles : KitchenHandle[] = [];
  selectedkitchenhandles = [];
  statickitchenhandles = [];

  formKitchenDialog : FormGroup
  subscription : Subscription[] = [];

  handlepositions : KitchenHandlePosition[] =[];
  selectedhandlepositions = [];
  statichandlepositions = [];

  hinges : Hinge[] = [];
  selectedhinges  =[];
  statichinges = [];

  drawings : Drawing;
  kitchenspecs : KitchenSpecs[] = [];
  private kitchensSub : Subscription;
  editmode : boolean = false;

  glasssubcats : Glasssubcat[] =[];




  constructor(public dialogRef : MatDialogRef<KitchendialogComponent>,
     public kitchendialogService : KitchendialogService,
     public wqgformService : WqgformService

    ) { }

  ngOnInit(): void {

    this.formKitchenDialog = new FormGroup({
      'Handle' : new FormControl(null,{validators:[Validators.required]}),
      'HandlePosition' : new FormControl(null,{validators:[Validators.required]}),
      'Hinge' : new FormControl(null,{validators:[Validators.required]}),
      'Drawing' : new FormControl(null,{validators:[Validators.required]}),
      'Width' : new FormControl(null,{validators:[Validators.required]}),
      'Height' : new FormControl(null,{validators:[Validators.required]}),
      'Quantity' : new FormControl(1,{validators:[Validators.required]}),
 
     });

  
     this.wqgformService.getGlasssubcats().subscribe((glasssubcatData)=>{

      this.glasssubcats = glasssubcatData.glasssubcats

     });


     this.kitchensSub = this.kitchendialogService.getKitchenSpecsUpdateListener().subscribe((kitchenspecs:KitchenSpecs[])=>{

      this.kitchenspecs = kitchenspecs;
    
      });

    this.KitchenType = this.kitchendialogService.kitchenType;
    this.GlassFinish = this.kitchendialogService.GlassFinish;
    this.FrameFinish = this.kitchendialogService.FrameFinish;
    this.Matte = this.kitchendialogService.Matte;
    this.GlassSubCat = this.kitchendialogService.GlassSubcat;
    this.KitchenSpec = this.kitchendialogService.KitchenSpec;
    
  

   if(!this.KitchenSpec)
   {
    this.kitchendialogService.getKitchenTypes().subscribe((response)=>{

      this.kitchenhandles = [];
      this.selectedkitchenhandles = [];
      this.statickitchenhandles = [];
    
       let KitchenHandleTemp = [];

       response.kitchentypes.map(item =>{
      
        if(item.KitchenTypeName===this.KitchenType)
        {
          KitchenHandleTemp = item.KitchenHandles
        }
       })

       this.kitchendialogService.getKitchenHandles().subscribe((response)=>{

        
        response.kitchenhandles.map(itemKh =>{
          KitchenHandleTemp.map((item)=>{
          if(itemKh.HandleName===item)
          {
             this.kitchenhandles.push(itemKh);
             this.selectedkitchenhandles.push(itemKh)
             this.statickitchenhandles.push(itemKh)
          }
          })

        })
       })
       
      

      
    })
   }

   if(this.KitchenSpec)
   {
    this.kitchendialogService.getKitchenTypes().subscribe((response)=>{

      this.kitchenhandles = [];
      this.selectedkitchenhandles = [];
      this.statickitchenhandles = [];
    
       let KitchenHandleTemp = [];

       response.kitchentypes.map(item =>{
      
        if(item.KitchenTypeName===this.KitchenType)
        {
          KitchenHandleTemp = item.KitchenHandles
        }
       })

       this.kitchendialogService.getKitchenHandles().subscribe((response)=>{
      
        
        response.kitchenhandles.map(itemKh =>{
    
          if(itemKh.HandleName===this.KitchenSpec.Drawing.HandleType)
          {
             this.selectedkitchenhandles.push(itemKh)

             itemKh.HandlePositions.map(item=>{
              this.kitchendialogService.getKitchenHandlePositions().subscribe((responseHP)=>{
               responseHP.kitchenhandlepositions.map(itemHp =>{
               
                if(itemHp.KitchenHandlePosition===item)
                {
                 this.handlepositions.push(itemHp)
                 this.statichandlepositions.push(itemHp);
      
                }
               })
              })
            })
           
  

          }

          KitchenHandleTemp.map((item)=>{
          if(itemKh.HandleName===item)
          {
             this.kitchenhandles.push(itemKh);
             this.statickitchenhandles.push(itemKh)
          }
          
          })

        })
       })
       
       
    
       this.kitchendialogService.getKitchenHandlePositions().subscribe((response)=>{
        response.kitchenhandlepositions.map((item)=>{
          if(item.KitchenHandlePosition===this.KitchenSpec.Drawing.HandlePosition)
          {
            this.selectedhandlepositions.push(item)
            item.Hinge.map(itemHp =>{
              this.kitchendialogService.getHinges().subscribe((responseHI)=>{
                responseHI.hinges.map(itemSu =>{
                  if(itemSu.HingeName===itemHp)
                  {
                    this.statichinges.push(itemSu)
                  }
                })
              })
            })

          }
        })
       })


       this.kitchendialogService.getHinges().subscribe((response)=>{
         response.hinges.map(item =>{
           if(item.HingeName===this.KitchenSpec.Drawing.HingePosition)
           {
             this.selectedhinges.push(item)

           }
         })
       })

      
      
    })
  
    this.drawings = this.KitchenSpec.Drawing

    this.formKitchenDialog.patchValue({'Handle':this.KitchenSpec.Drawing.HandleType});
    this.formKitchenDialog.patchValue({'HandlePosition':this.KitchenSpec.Drawing.HandlePosition});
    this.formKitchenDialog.patchValue({'Hinge':this.KitchenSpec.Drawing.HingePosition});
    this.formKitchenDialog.patchValue({'Width':this.KitchenSpec.Width});
    this.formKitchenDialog.patchValue({'Height':this.KitchenSpec.Height});
    this.formKitchenDialog.patchValue({'Quantity':this.KitchenSpec.Quantity});

    this.editmode = true;

    this.kitchensSub = this.kitchendialogService.getKitchenSpecsUpdateListener().subscribe((kitchenspecs:KitchenSpecs[])=>{

      this.kitchenspecs = kitchenspecs;
    
      });


   }

    
    this.OnKitchenHandleChanges();
    this.OnKitchenHandlePositionChanges();
    this.OnHingePositionChange();
    
  }


  handleChanges(HandleName : string)
  {
    this.selectedkitchenhandles = [];
    this.kitchenhandles.map(item =>{
    //=========================Collapse=============================
      if(item.HandleName===HandleName)
       {
        this.selectedkitchenhandles.push(item);
       }
    })

  }

  uncollapseHandle()
 {
   this.selectedkitchenhandles = [];
   this.selectedkitchenhandles = this.statickitchenhandles;
 }

  OnKitchenHandleChanges()
  {

    this.subscription.push(this.formKitchenDialog.get('Handle').valueChanges.subscribe(response=>{

      this.handlepositions = []
      this.selectedhandlepositions = []
      this.statichandlepositions = []

      this.formKitchenDialog.patchValue({'HandlePosition':null});
      this.formKitchenDialog.patchValue({'Hinge':null});

      this.drawings = null;
     

      this.kitchendialogService.getKitchenHandles().subscribe((responseKH)=>{
       
        responseKH.kitchenhandles.map(item=>{

          


          if(item.HandleName===response)
          {

           item.HandlePositions.map(item=>{
        this.kitchendialogService.getKitchenHandlePositions().subscribe((responseHP)=>{
         responseHP.kitchenhandlepositions.map(itemHp =>{

          if(itemHp.KitchenHandlePosition===item)
          {
           this.handlepositions.push(itemHp)
           this.selectedhandlepositions.push(itemHp)
           this.statichandlepositions.push(itemHp);

          }
         })
        })
      })

           
          }
          
        })

      })
    

      this.kitchendialogService.getDrawings().subscribe((responseDr)=>{
 
     

        responseDr.drawings.map((item)=>{
         
         if(item.HingePosition===this.formKitchenDialog.value.Hinge&&item.HandleType===response&& this.formKitchenDialog.value.HandlePosition===item.HandlePosition&&this.formKitchenDialog.value.Hinge===item.HingePosition)
         {
           this.drawings = item;
         }
        })
   
      })
     
  
     
    }));


   

  }

  OnKitchenHandlePositionChanges()
  {

    this.subscription.push(this.formKitchenDialog.get('HandlePosition').valueChanges.subscribe(response=>{

      this.drawings = null;

      this.hinges = []
      this.selectedhinges = [];
      this.statichinges = [];

      this.formKitchenDialog.patchValue({'Hinge':null});
     

      this.kitchendialogService.getKitchenHandlePositions().subscribe((responseKH)=>{
       
        responseKH.kitchenhandlepositions.map(item=>{

          


          if(item.KitchenHandlePosition===response)
          {

           item.Hinge.map(item=>{
          this.kitchendialogService.getHinges().subscribe((responseHP)=>{
         responseHP.hinges.map(itemHp =>{

          if(itemHp.HingeName===item)
          {
           this.hinges.push(itemHp)
           this.selectedhinges.push(itemHp)
           this.statichinges.push(itemHp)

          }
         })
        })
      })

           
          }
          
        })

      })
    


      this.kitchendialogService.getDrawings().subscribe((responseDr)=>{
 
     

        responseDr.drawings.map((item)=>{
         if(item.HingePosition===this.formKitchenDialog.value.Hinge &&item.HandleType===this.formKitchenDialog.value.Handle&& response===item.HandlePosition&&this.formKitchenDialog.value.Hinge===item.HingePosition)
         {
           this.drawings = item;
         }
        })
   
      })

     
    }));

  }

  handlePositionChanges(HandlePositionName : string)
  {
    this.selectedhandlepositions = [];
    this.handlepositions.map(item =>{
    //=========================Collapse=============================
      if(item.KitchenHandlePosition===HandlePositionName)
       {
        this.selectedhandlepositions.push(item);
       }
    })

  }

  uncollapseHandlePosition()
 {
   this.selectedhandlepositions = [];
   this.selectedhandlepositions = this.statichandlepositions;
 }

  OnHingePositionChange()
  {
  
    this.subscription.push(this.formKitchenDialog.get('Hinge').valueChanges.subscribe(response=>{

      this.drawings = null;

      this.kitchendialogService.getDrawings().subscribe((responseDr)=>{
 
        responseDr.drawings.map((item)=>{
         if(item.HingePosition===response&&item.HandleType===this.formKitchenDialog.value.Handle&&this.formKitchenDialog.value.HandlePosition===item.HandlePosition&&this.formKitchenDialog.value.Hinge===item.HingePosition)
         {
           this.drawings = item;           
         }
        })
   
      })
          
    }));

  }
 
  hingeChanges(Hinge : string)
  {
    
    this.selectedhinges = [];
    this.hinges.map(item =>{
    //=========================Collapse=============================
      if(item.HingeName===Hinge)
       {
        this.selectedhinges.push(item);
       }
    })

  }

  uncollapseHinge()
 {
   this.selectedhinges = [];
   this.selectedhinges = this.statichinges;
 }



  onSaveKitchenSpecs()
  {
    

    let GlassSubCatCost : any;
    //=============================Calculation of price=================
   
    //=================================get GlassSubCats Cost==================================
    this.glasssubcats.map(item =>{
      if(item.GlassSubCategory===this.GlassSubCat){
        GlassSubCatCost = item.GlassSubCategoryCost
      }
    })

    let width  :any = this.formKitchenDialog.value.Width
    let height : any = this.formKitchenDialog.value.Height
    let quantity : any = this.formKitchenDialog.value.Quantity
    let Sqft : any = (width*height*0.00001076391042*quantity).toFixed(2);

    let KitchenCost:any = parseInt(this.drawings.Price)*Sqft + GlassSubCatCost*Sqft

    let serial :any;
   

    this.kitchendialogService.addAndUpdateKitchenSpecs(
      this.editmode,
      this.editindex,
      serial,
      width,
      height,
      quantity,
      this.drawings,
      Sqft,
      KitchenCost
    )

 
  
   this.kitchenspecs = this.kitchendialogService.KitchenSpecs

   this.formKitchenDialog.patchValue({'Width':null});
   this.formKitchenDialog.patchValue({'Height':null});
   this.formKitchenDialog.patchValue({'Quantity':1});
    //=======reset edit mode if it was true=============================
   
    this.editmode = false;


  }


  ngOnDestroy(){

    this.subscription.forEach(item =>{
      if(item) item.unsubscribe()
    })

 
  }

  onEditKitchenSpec(index : any)
  {

    this.kitchenhandles =  [];
    this.selectedkitchenhandles = [];
    this.statickitchenhandles = [];

    this.editindex = index;
  
 
    this.hinges = [];
    this.selectedhinges  =[];
    this.statichinges = [];


    this.drawings = null
   
    this.editmode = true;

    this.formKitchenDialog.patchValue({'Handle':null});
    this.formKitchenDialog.patchValue({'HandlePosition':null});
    this.formKitchenDialog.patchValue({'Hinge':null});
    this.formKitchenDialog.patchValue({'Width':null});
    this.formKitchenDialog.patchValue({'Height':null});
    this.formKitchenDialog.patchValue({'Quantity':1});


    this.kitchendialogService.getKitchenTypes().subscribe((response)=>{

      this.kitchenhandles = [];
      this.selectedkitchenhandles = [];
      this.statickitchenhandles = [];
    
       let KitchenHandleTemp = [];

       response.kitchentypes.map(item =>{
      
        if(item.KitchenTypeName===this.KitchenType)
        {
          KitchenHandleTemp = item.KitchenHandles
        }
       })

       this.kitchendialogService.getKitchenHandles().subscribe((response)=>{

        
        response.kitchenhandles.map(itemKh =>{
          if(itemKh.HandleName===this.kitchenspecs[index].Drawing.HandleType)
          {
            this.selectedkitchenhandles.push(itemKh)
          }

          KitchenHandleTemp.map((item)=>{
          if(itemKh.HandleName===item)
          {
             this.kitchenhandles.push(itemKh);
             this.statickitchenhandles.push(itemKh)
          }
          })

        })
       })
       
      

      
    })


  
    this.selectedhandlepositions = [];

    
     this.formKitchenDialog.patchValue({'Handle':this.kitchenspecs[index].Drawing.HandleType});
     this.formKitchenDialog.patchValue({'HandlePosition':this.kitchenspecs[index].Drawing.HandlePosition});
     this.formKitchenDialog.patchValue({'Hinge':this.kitchenspecs[index].Drawing.HingePosition});
     this.formKitchenDialog.patchValue({'Width':this.kitchenspecs[index].Width});
     this.formKitchenDialog.patchValue({'Height':this.kitchenspecs[index].Height});
     this.formKitchenDialog.patchValue({'Quantity':this.kitchenspecs[index].Quantity});

     this.editmode = true;

  }
 
  
  onDeleteKitchenSpec(index : any)
  {
    this.kitchendialogService.deleteKitchenSpec(index);
  }


  OnCloseDialog()
  {
    this.dialogRef.close();
  }


  OnReset()
  { 
    this.handlepositions = [];
    this.selectedhandlepositions = [];
    this.statichandlepositions = [];

    this.hinges = [];
    this.selectedhinges = [];
    this.statichinges = [];

    this.drawings = null;

    this.selectedkitchenhandles = [];
    this.statickitchenhandles = [];

    this.selectedkitchenhandles = this.kitchenhandles;
    
    this.formKitchenDialog.patchValue({'Handle':null});
    this.formKitchenDialog.patchValue({'HandlePosition':null});
    this.formKitchenDialog.patchValue({'Hinge':null});
    this.formKitchenDialog.patchValue({'Width':null});
    this.formKitchenDialog.patchValue({'Height':null});
    this.formKitchenDialog.patchValue({'Quantity':1});
    

  }

}
