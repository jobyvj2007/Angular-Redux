import { Component, Input, OnInit } from '@angular/core';
import { Adduser } from '../models/adduser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import * as adduser from '../actions/add-user';
import * as loaduser from '../actions/load-user';

@Component({
  selector: 'bc-show-user-list',
  template: `
    <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '15px' }"></ngx-loading>
    <ul>
        <li *ngFor="let adduser of addusers; let i=index;">
        {{ i }}&nbsp;&nbsp;
        <button md-raised-button color="primary" (click)="addUserToCollection(adduser)">
            {{ adduser.username }}
        </button><br><br>
        </li>
    </ul>    
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    ul li {
        list-style-type: none;
    }
  `]
})
export class ShowUserListComponent implements OnInit {

  public loading = true;
  @Input() addusers: Adduser[];
  constructor(private store: Store<fromRoot.State>) {}
  addUserToCollection(user:Adduser) {
      this.store.dispatch(new adduser.LoadAddUserAction(user));
  }
  ngOnInit() {
    this.loading = false;
  }
}
