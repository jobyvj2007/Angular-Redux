import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Github } from '../models/github';


@Injectable()
export class GithubUserService {
  private API_PATH = 'https://api.github.com/search/users';

  constructor(private http: Http) {}

  searchGithubUsers(queryTitle: string): Observable<Github[]> {
    return this.http.get(`${this.API_PATH}?q=${queryTitle}`)
      .map(res => res.json().items || []);
  }

}
