import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../auth/login/login/login.component';
import { CustomerfeedbackComponent } from '../header/downloads/customerfeedback/customerfeedback.component';
import { GoodsdeliveryComponent } from '../header/downloads/goodsdelivery/goodsdelivery.component';
import { IndependentcustomerComponent } from '../header/downloads/independentcustomer/independentcustomer.component';
import { IndependentgoodsComponent } from '../header/downloads/independentgoods/independentgoods.component';
import { IndependentmeasureComponent } from '../header/downloads/independentmeasure/independentmeasure.component';
import { IndependentworkComponent } from '../header/downloads/independentwork/independentwork.component';
import { MeasurementsheetComponent } from '../header/downloads/measurementsheet/measurementsheet.component';
import { WorkcompletionComponent } from '../header/downloads/workcompletion/workcompletion.component';
import { ProjectsService } from '../services/projects.service';
import { SpinnerService } from '../services/spinner.service';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit, OnInit, OnDestroy {

  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;
  UserProfile : string;
  AppPerm : string;
  appstatus : string;
  ShowMeasurement : boolean =true;
  ShowWork : boolean=true;
  ShowGoods : boolean=true;
  ShowCustomer : boolean=true;
  ShowWin : boolean=true;
  Collapse : boolean = false;

  constructor(private userService : UsersService , public spinnerService : SpinnerService, public projectService : ProjectsService) { }

  ngOnInit(): void {
  

   

    this.userIsAuthenticated = this.userService.getIsAuth();
    this.UserFullName = this.userService.getUserFullName();
    this.UserProfile = this.userService.getProfile();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
    this.userIsAuthenticated = isAuthenticated;
    this.UserFullName = this.userService.getUserFullName();
    this.UserProfile = this.userService.getProfile();
  
   })

   

  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    }
  
    OnLogOut()
    {
    this.userService.logout();
    }

   
    onActivate(event :any)
    { 
      this.ShowMeasurement = true;
      this.ShowCustomer = true;
      this.ShowGoods = true;
      this.ShowWork =true;
      this.ShowWin = true;
      
      
      if(event instanceof IndependentmeasureComponent)
      {
        this.ShowMeasurement=false;
      }
     
      if(event instanceof IndependentmeasureComponent)
      {
        this.ShowMeasurement=false;
      }
      if(event instanceof IndependentworkComponent)
      {
        this.ShowWork=false;
      }
      if(event instanceof IndependentgoodsComponent)
      {
        this.ShowGoods=false;
      }
      if(event instanceof IndependentcustomerComponent)
      {
        this.ShowCustomer=false;
      }
    }

    ngAfterViewInit(): void {

      
    }

    collapseSubMenus()
    {
      this.Collapse = true;
    }



    //routerLink ="/analytics"
}





