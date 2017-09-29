import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as adduser from '../actions/add-user';
import { Adduser } from '../models/adduser';
import * as loaduser from '../actions/load-user';

@Injectable()
export class AddUserEffects {

  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('books_app');
  });

  @Effect()
  addAddUserToCollection$: Observable<Action> = this.actions$
    .ofType(adduser.LOAD_ADD_USER)
    .map((action: adduser.LoadAddUserAction) => action.payload)
    .mergeMap(addthisuser => this.db.insert('addusers', [ addthisuser ])
        .map(() => {
         console.log("Add DB Effect is calling"); 
         return new adduser.AddDDBBUserAction(addthisuser)
        }));


  @Effect()
  loadAddUserCollection$: Observable<Action> = this.actions$
    .ofType(loaduser.LOAD_DB_ADD_USER)
    .startWith(new loaduser.LoadDBAddUserAction())
    .switchMap(() => {
      return this.db.query('addusers')
        .toArray()
        .map((users: Adduser[]) => {
          return new loaduser.LoadAllAddedUsersComplete(users)
        })
      }  
    );      

    constructor(private actions$: Actions, private db: Database) { }
}