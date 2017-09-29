import { Action } from '@ngrx/store';
import { Adduser } from '../models/adduser';

export const LOAD_DB_ADD_USER              = '[Adduser] Load  DB Add User';
export const LOAD_ADDED_USERS_COMPLETE     = '[Adduser] Load Added Users Completed'
export const DB_ADD_USER                      = '[Adduser] Add User';

export class LoadDBAddUserAction implements Action {
  readonly type = LOAD_DB_ADD_USER;
}
export class AddDBUserAction implements Action {
  readonly type = DB_ADD_USER;
  constructor(public payload: Adduser) { }
}
export class LoadAllAddedUsersComplete implements Action {
  readonly type = LOAD_ADDED_USERS_COMPLETE;
  constructor(public payload: Adduser[]) { }
}
export type Actions
  = LoadDBAddUserAction
  | LoadAllAddedUsersComplete