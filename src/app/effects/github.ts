import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import { GithubUserService } from '../services/github-users';
import * as github from '../actions/github';
import * as githubCollection from '../actions/github-collection';
import { Database } from '@ngrx/db';
import { Github } from '../models/github';

@Injectable()
export class GithubEffects {

  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('books_app');
  });

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(github.GITHUB_SEARCH)
    .debounceTime(300)
    .map(toPayload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }
      const nextSearch$ = this.actions$.ofType(github.GITHUB_SEARCH).skip(1);
      return this.githubUserService.searchGithubUsers(query)
        .takeUntil(nextSearch$)
        .map(users => new github.GithubSearchCompleteAction(users))
        .catch(() => of(new github.GithubSearchCompleteAction([])));
    });

    @Effect()
    addGithubUserCollection$: Observable<Action> = this.actions$
    .ofType(githubCollection.ADD_GITHUB_USER)
    .map((action: githubCollection.AddGithubUserAction) => action.payload)
    .mergeMap(user =>
      this.db.insert('githubs', [ user ])
        .map(() => new githubCollection.AddGithubUserSuccessAction(user))
        .catch(() => of(new githubCollection.AddGithubUserSuccessAction(user)))
    );

    @Effect()
    getGithubUserCollection$: Observable<Action> = this.actions$
    .ofType(githubCollection.GITHUB_USER_LOAD)
    .startWith(new githubCollection.GithubUserLoadAction())
    .switchMap(() =>
      this.db.query('githubs')
        .toArray()
        .map((users: Github[]) => {
          return new githubCollection.GithubUserLoadSuccessAction(users);
        }
        )
    );

    constructor(private actions$: Actions, private githubUserService: GithubUserService, private db: Database) { }
}