// import { Injectable } from '@angular/core';
// import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
//
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class HttpIntercepterBasicAuthService implements HttpInterceptor {
//
//   constructor(
//   ) { }
//
//   //whatever request is being sent out, we want to add a header
//   intercept(request: HttpRequest<any>, next: HttpHandler) {
//     //All of these were used for hardcoding testing
//     //basic authentication service can provide them
//     // let username="AmyLeon"
//     //  let password="dummy"
//     // let basicAuthHeaderString = "Basic" + window.btoa(username + ":" + password);
//
//     //using basic auth service instead of hard coding
//     let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
//      let username = this.basicAuthenticationService.getAuthenticatedUser();
//
//     //if both have values set AUthorization header
//     //execute only if both have valid value
//     if (basicAuthHeaderString && username){
//     //cloning to override to allow us to add authorization header
//     request = request.clone({
//       setHeaders: {
//         Authorization: basicAuthHeaderString
//       }
//     })
//   }
//     //send to next http handler
//     //sending modified request
//     return next.handle(request);
//   }
// }
