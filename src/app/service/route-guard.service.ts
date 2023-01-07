import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {RegistrationService} from "./registration.service";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private regService: RegistrationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.regService.isUserLoggedIn())
      return true;

    //if user tries to access page that is required for them to be logged in they'll be directed to the homepage
    this.router.navigate(['']);
    return false;
  }
}
