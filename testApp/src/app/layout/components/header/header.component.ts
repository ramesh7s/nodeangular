import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  isLoggedIn$: Observable<boolean>;// {1}
  constructor(private _login:LoginService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this._login.isLoggedIn; // {2}
    //console.log("header",this.isLoggedIn$);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


  get isLoggedIn(){
    let token = this._login.getToken();
    // console.log("loginStatus",loginStatus)
    if(token != null)
      return true;
    else 
      return false;
  }

  onLogout(){
    localStorage.removeItem("nodetoken");
    localStorage.removeItem("isLoggedin");
    this.router.navigate(['/login']);
  }

}
