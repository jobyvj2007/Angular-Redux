import { Action } from '@ngrx/store';
import { Github } from '../models/github';

export const ADD_GITHUB_USER          = '[GithubCollection] Add Github User';
export const ADD_GITHUB_USER_SUCCESS  = '[GithubCollection] Add Github User Success';
export const GITHUB_USER_LOAD         = '[GithubCollection] Github Users Load';
export const GITHUB_LOAD_SUCCESS      = '[GithubCollection] Github User Load Success'

/**
 * Add Book to Collection Actions
 */
export class AddGithubUserAction implements Action {
  readonly type = ADD_GITHUB_USER;

  constructor(public payload: Github) { }
}

export class AddGithubUserSuccessAction implements Action {
  readonly type = ADD_GITHUB_USER_SUCCESS;

  constructor(public payload: Github) { }
}

export class GithubUserLoadAction implements Action {
  readonly type = GITHUB_USER_LOAD;
}

export class GithubUserLoadSuccessAction implements Action {
  readonly type = GITHUB_LOAD_SUCCESS;

  constructor(public payload: Github[]) { }
}

export type Actions
  = AddGithubUserAction
  | AddGithubUserSuccessAction
  | GithubUserLoadAction
  | GithubUserLoadSuccessAction