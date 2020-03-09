import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { User } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _loginUrl = `${environment.api}/login`;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user: User){
    //return this.http.post<any>(this._loginUrl,user);
    console.log(this._loginUrl)
    return this.http.post(this._loginUrl,user).pipe(
      map((res: Response) => {
        this.loggedIn.next(true);
        return res;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    //console.log(error);
    // return an observable with a user friendly message
    return throwError( error );//`Error Code: ${error.status}\nMessage: ${error.message}`
  }


  getToken() {
    return localStorage.getItem("nodetoken");
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem("nodetoken");
    //localStorage.removeItem("isLoggedin");
    this.router.navigate(['/login']);
  }
}
