import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as github from '../actions/github';
import { Github } from '../models/github';

@Component({
  selector: 'bc-find-github-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-github-user-search [query]="githubSearchQuery$ | async" [searching]="githubLoading$ | async" (githubSearch)="githubSearch($event)"></bc-github-user-search>
    <bc-github-user-list [githubs]="githubs$ | async"></bc-github-user-list>
  `
})
export class FindGithubUserComponent {
  githubSearchQuery$: Observable<string>;
  githubs$: Observable<Github[]>;
  githubLoading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.githubSearchQuery$ = store.select(fromRoot.getGithubSearchQuery).take(1);
    this.githubs$ = store.select(fromRoot.getGithubUserSearchResults);
    this.githubLoading$ = store.select(fromRoot.getGithubSearchLoading);
  }

  githubSearch(query: string) {
    this.store.dispatch(new github.GithubSearchAction(query));
  }
}
