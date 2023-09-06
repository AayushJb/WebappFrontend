import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit, OnDestroy {

  users : User[] = [];
  private usersSub : Subscription;

  constructor(public usersService : UsersService) { }

  ngOnInit(): void {

    this.usersService.getUsers();

    this.usersSub = this.usersService.getUserUpdateListener().subscribe((users:User[])=>{

    this.users = users;
    });

  }

  ngOnDestroy(){

    this.usersSub.unsubscribe();
   }


 //===============================Deleting Subsystem=============================================

 OnDeleteUser(userId:string){

  this.usersService.deleteUser(userId);

  }

}
