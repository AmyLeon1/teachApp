import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {HardCodedAuthenticationService} from "./hard-coded-authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private hardcodedAuthenticationService:HardCodedAuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   if(this.hardcodedAuthenticationService.isUserLoggedIn())
    return true;

   //if user tries to access page that is required for them to be logged in they
    //can be directed to the login page

    this.router.navigate(['login']);

   return false;
  }
}
