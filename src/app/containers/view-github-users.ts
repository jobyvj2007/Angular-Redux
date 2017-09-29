import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import { Github } from '../models/github';

@Component({
  selector: 'bc-view-github-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>List of Users</md-card-title>
    </md-card>

    <bc-github-user-list [githubs]="githubs$ | async"></bc-github-user-list>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class ViewGithubUserPageComponent {

  githubs$: Observable<Github[]>;

  constructor(store: Store<fromRoot.State>) {
      this.githubs$ = store.select(fromRoot.getGithubUserListCollection);
      console.log("----------");
      console.log(this.githubs$);
  }
}
