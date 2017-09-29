import { Action } from '@ngrx/store';
import { Github } from '../models/github';

export const GITHUB_SEARCH =           '[Github] Github Search';
export const GITHUB_SEARCH_COMPLETE =  '[Github] Github Search Complete';


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class GithubSearchAction implements Action {
  readonly type = GITHUB_SEARCH;

  constructor(public payload: string) { }
}

export class GithubSearchCompleteAction implements Action {
  readonly type = GITHUB_SEARCH_COMPLETE;

  constructor(public payload: Github[]) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GithubSearchAction
  | GithubSearchCompleteAction
