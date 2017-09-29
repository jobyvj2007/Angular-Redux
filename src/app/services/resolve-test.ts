import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GoogleBooksService } from '../services/google-books';
import { Book } from '../models/book';

@Injectable()
export class ResolveTestService implements Resolve<Book[]>{

  private API_PATH = 'https://jsonplaceholder.typicode.com/posts/1';
  constructor(private googleservice: GoogleBooksService) {}
  
  resolve(route: ActivatedRouteSnapshot) {
    return this.googleservice.searchBooks('joby');
  }

}
