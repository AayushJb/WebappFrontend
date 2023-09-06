import { Component, OnDestroy, OnInit ,AfterViewInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnInit, OnDestroy {

  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  UserFullName : string;

  constructor(private userService : UsersService , public spinnerService : SpinnerService) { }



  showMenu = '';
  showSubMenu = '';

  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  ngOnInit(): void {

     this.userIsAuthenticated = this.userService.getIsAuth();
     this.UserFullName = this.userService.getUserFullName();
     this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated =>{
     this.userIsAuthenticated = isAuthenticated;
     this.UserFullName = this.userService.getUserFullName();
    })
  }

  ngOnDestroy(): void {
  this.authListenerSubs.unsubscribe();
  }

  OnLogOut()
  {
  this.userService.logout();
  }
  
  ngAfterViewInit(): void {
    
  }
}
