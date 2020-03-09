import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../../services/book.service';
import { LoginService } from '../../services/login.service';
import { Book } from '../../model/book';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.css']
})
export class MydashboardComponent implements OnInit {

  result: any;
  productsDisplayed: Book[] = [];
  isLoggedIn$: Observable<boolean>;
  isLoadingResults = true;
  imgUrl:string =  `${environment.api}`+'/images/uploads/';

  constructor(private _book: BookService,private _login:LoginService) { }

  ngOnInit() {
  	this.bookList();
    this.isLoggedIn$ = this._login.isLoggedIn;
    
  }

  get isLoggedIn(){
    let token = this._login.getToken();
    if(token != null)
      return true;
    else 
      return false;
  }

  bookList(){
    this._book.booklist().subscribe(res => {
      this.productsDisplayed = res;
      this.isLoadingResults = false;
      //console.log(this.productsDisplayed)
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    })
  }

}
