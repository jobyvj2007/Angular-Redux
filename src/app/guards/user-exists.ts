import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { GithubUserService } from '../services/github-users';
import * as fromRoot from '../reducers';
import * as user from '../actions/github';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.State>,
    private githubusers: GithubUserService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return of(true);
  }
}
