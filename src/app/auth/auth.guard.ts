import { Route } from "@angular/compiler/src/core";
import {  OnDestroy } from '@angular/core';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { UsersService } from "../services/user.service";
 


@Injectable()

export class AuthGuard implements CanActivate, OnDestroy{
  constructor(private userService : UsersService, private router : Router){}

  private authListenerSubs : Subscription;

  isAuth : boolean;

 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     /*
     this.userService.getAuthStatusListener().subscribe((isAuthRes)=>{
     this.isAuth = isAuthRes
     alert(this.isAuth)

    })
*/
   this.isAuth = this.userService.getIsAuth()
  
    if(!this.isAuth)
    {
      
      this.router.navigate(['/login']);
    }
    return this.isAuth;
  
  }

  ngOnDestroy(){

    this.authListenerSubs.unsubscribe();
   }

}

