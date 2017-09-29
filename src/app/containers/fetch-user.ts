import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../reducers';
import { Adduser } from '../models/adduser';

@Component({
  selector: 'bc-fetch-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>My Users</md-card-title>
    </md-card><br>
    <u>Prefetch Data</u>: <i>{{ prefetchMessage }}</i>
    <bc-show-user-list [addusers]="addusers$ | async"></bc-show-user-list>
    <br><br>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class FetchUserPageComponent implements OnInit{

  addusers$: Observable<Adduser[]>;
  prefetchMessage:string;
  constructor(store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.addusers$ = store.select(fromRoot.getLoadUserCollection);
  }
  ngOnInit () {
    this.route.data.forEach(data => {
      console.log('prefetch data');
      console.log(data.myMessage);
      this.prefetchMessage = data.myMessage;
    });
  }
}
