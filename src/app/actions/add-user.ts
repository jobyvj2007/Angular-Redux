import { Action } from '@ngrx/store';
import { Adduser } from '../models/adduser';

export const ADD_USER          = '[Adduser] Add User';
export const ADD_DDBB_USER     = '[Adduser] Add DDBB User';
export const ADD_USER_COMPLETE = '[Adduser] Add User Complete';
export const LOAD_ADD_USER     = '[Adduser] Load Add User';
export const SELECT_USER       = '[Adduser] Select';
export const LOAD_ALL_ADDED_USERS_COMPLETE = '[Adduser] Load All Added Users Completed';

export class AddUserAction implements Action {
  readonly type = ADD_USER;

  constructor(public payload: string) { }
}
export class AddDDBBUserAction implements Action {
  readonly type = ADD_DDBB_USER;

  constructor(public payload: Adduser) { }
}
export class LoadAddUserAction implements Action {
  readonly type = LOAD_ADD_USER;

  constructor(public payload: Adduser) { }
}
export class AddUserCompleteAction implements Action {
  readonly type = ADD_USER_COMPLETE;

  constructor(public payload: Adduser[]) { }
}
export class LoadAllAddedUsersComplete implements Action {
  readonly type = LOAD_ALL_ADDED_USERS_COMPLETE;

  constructor(public payload: Adduser) { }
}

export type Actions
  = AddUserAction
  | AddUserCompleteAction
  | LoadAddUserAction
  | LoadAllAddedUsersComplete
  | AddDDBBUserAction