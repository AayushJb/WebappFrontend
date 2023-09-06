import { Component, OnInit } from '@angular/core';
import { CustomerfeedbackComponent } from './header/downloads/customerfeedback/customerfeedback.component';
import { UsersService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userService : UsersService){}
  
 
  ngOnInit(): void {
  
   {
   
    
     // this.userService.autoAuthUser()
   
   }

    
   
  }
  title = 'WebApp';
  
 
 
}
