import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _apiUrl = `${environment.api}/`;
  
  constructor(private http: HttpClient, private router: Router) { }

  booklist(): Observable<Book[]>{
    return this.http.get<Book[]>(this._apiUrl+"booklist").pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError('bookList', []))
    );
    // return this.http.get<Book[]>(this._apiUrl+"booklist")
    //   .pipe(
    //     tap(books => console.log('Fetch Book')),
    //     catchError(this.handleError('bookList', []))
    //   );
  }


  //
  addBook (book): Observable<Book> {
    return this.http.post<Book>(this._apiUrl+"bookAdd", book).pipe(
       map((book: Book) => {
        return book;
      }),
      catchError(this.handleError<Book>('addProduct'))
    );
    // return this.http.post<Book>(this._apiUrl+"add", book).pipe(
    //   tap((book: Book) => console.log(`added product w/ id=${book._id}`)),
    //   catchError(this.handleError<Book>('addProduct'))
    // );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
