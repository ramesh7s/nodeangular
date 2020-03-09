// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenInterceptorService {

//   constructor() { }
// }
import { Injectable,Injector } from '@angular/core'; // we may have to add Injector if use of auth service directly not works
import { HttpInterceptor } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  // constructor(private injector : Injector) { }
  constructor(private loginService : LoginService) { }

  intercept(req,next)
  {
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${this.loginService.getToken()}`
      }
    });

    return next.handle(tokenizedReq)
  }
  
} 