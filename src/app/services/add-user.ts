import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Adduser } from '../models/adduser';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddUserService {

  private API_PATH = 'https://jsonplaceholder.typicode.com/posts/1';
  constructor(private http: Http) {}
  
  addUser(queryTitle: string) {
    return queryTitle;//this.http.get(`${this.API_PATH}`).map(res => res.json() || []);
  }

}
