import * as githubCollection from '../actions/github-collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: number[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  ids: []
};

export function reducer(state = initialState, action: githubCollection.Actions): State {
  switch (action.type) {
    case githubCollection.GITHUB_USER_LOAD: {

      return Object.assign({}, state, {
        loading: true
      });
    }
    
    case githubCollection.GITHUB_LOAD_SUCCESS: {

      const users = action.payload;
      return {
        loaded: true,
        loading: false,
        ids: users.map(user => user.id)
      };
    }
    
    case githubCollection.ADD_GITHUB_USER_SUCCESS: {
      const user = action.payload;

      if (state.ids.indexOf(user.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, user.id ]
      });
    }

    default: {
      return state;
    }
  }
}


export const getGithubCollectionLoaded = (state: State) => state.loaded;

export const getGithubCollectionLoading = (state: State) => state.loading;

export const getGithubCollectionIds = (state: State) => state.ids;
