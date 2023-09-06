import { Component, OnInit , OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./loginstyle.component.css','./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy  {
  form : FormGroup;
  users : User[] = [];
  


  

  constructor(public userService : UsersService,private router : Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({

      'UserName' : new FormControl(null,{validators:[Validators.required]}),
      'Password' : new FormControl(null,{validators:[Validators.required]}),
    });

    

  }


  onLogin(){
    if(this.form.invalid)
    {
      return
    }
    
    this.userService.login(this.form.value.UserName.toUpperCase(),this.form.value.Password)
/*
    this.userService.getUsersData().subscribe(response=>{
    this.users = response.users;

    this.users.map(item=>{
    if(item.UserName===this.form.value.UserName&&item.Password===this.form.value.Password)
    {
      this.router.navigate(["/projects"]);
    }

    })

    })
 */ 
    

  
  }

  ngOnDestroy(){

   
   }


}
