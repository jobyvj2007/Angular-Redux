import { Component, Input } from '@angular/core';
import { Github } from '../models/github';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import * as githubCollection from '../actions/github-collection';

@Component({
  selector: 'bc-github-user-list',
  template: `
    <bc-github-user-view *ngFor="let github of githubs" [github]="github" (addUserToList)="addUserToList($event)"></bc-github-user-view>
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class GithubUserListComponent {
  @Input() githubs: Github[];
  
  addUserToList (user: Github) {
    this.store.dispatch(new githubCollection.AddGithubUserAction(user));
  }

  constructor(private store: Store<fromRoot.State>) {}
}
