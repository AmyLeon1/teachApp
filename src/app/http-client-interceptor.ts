import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
// @ts-ignore
import { LocalStorageService } from 'ngx-webstorage';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  //inject local storage service
  // @ts-ignore
  constructor(@Inject(LocalStorageService) private $localStorage) {

  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.$localStorage.retrieve("authenticationToken");
    console.log('jwt token ' + token);
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + token)
      });
      //send to server
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
