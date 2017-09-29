import { createSelector } from 'reselect';
import { Github } from '../models/github';
import * as github from '../actions/github';
import * as githubCollection from '../actions/github-collection';

export interface State {
  ids: number[];
  userEntities: { [id: number]: Github };
};

export const initialState: State = {
  ids: [],
  userEntities: {},
};

export function reducer(state = initialState, action: github.Actions | githubCollection.Actions ): State {

  switch (action.type) {
    case githubCollection.GITHUB_LOAD_SUCCESS:
    case github.GITHUB_SEARCH_COMPLETE: {
      if(action.payload) {
        const userList = action.payload;
        const newUserList = userList.filter(user => !state.userEntities[user.id]);

        const newUsersIds = newUserList.map(user => user.id);
        const newUserEntities = newUserList.reduce((entities: { [id: number]: Github }, user: Github) => {
          return Object.assign(entities, {
            [user.id]:user
          });
        }, {});
        return {
          ids: [ ...state.ids, ...newUsersIds ],
          userEntities: Object.assign({}, state.userEntities, newUserEntities)
        };
      }
    }
    default: {
      return state;
    }
  }
}

export const getGithubUserEntities = (state: State) => state.userEntities;

export const getGithubUserIds = (state: State) => state.ids;

export const getGithubUserAll = createSelector(getGithubUserEntities, getGithubUserIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});