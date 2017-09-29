import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import * as fromRoot from '../reducers';
import * as adduser from '../actions/add-user';
import { Adduser } from '../models/adduser';
import { AddUserService } from '../services/add-user';
import { Book } from '../models/book';
import { Subscription } from 'rxjs';
//import { LoadingAnimateService } from 'ng2-loading-animate';
@Component({
  selector: 'bc-add-user-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input placeholder="Search for a book" (keyup)="addUser($event.target.value)">
    <bc-show-user-list [addusers]="addusers$ | async"></bc-show-user-list>
    <br>
    <br>
    <u>Resolve Data</u>
    <ul>
      <li *ngFor="let mybook of myBooks">
        {{mybook.volumeInfo.title}}
      </li>
    </ul>
  `,
  styles: [`
  
  `]
})
export class AddUserPageComponent implements OnInit {

  public loading = true;
  addusers$: Observable<Adduser[]>; 
  //busy: Promise<any>;
  //busy: Book;
  myBooks:Book;
  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
      this.addusers$ = store.select(fromRoot.getAddUsersResults);
      //this._loadingSvc.setValue(true);
  }
  ngOnInit() {
    this.route.data.forEach(data => {
      console.log('resolve data');
      console.log(data);
      //this.busy = data.myBooks
      this.myBooks = data.myBooks
    });
  }
  addUser(query: string) {
    const userId:number = Math.floor((Math.random() * 100) + 1);
    const payloadObj = JSON.stringify({ id: userId, username: query });
    this.store.dispatch(new adduser.AddUserAction(payloadObj));
  }
}