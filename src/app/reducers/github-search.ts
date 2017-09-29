import * as github from '../actions/github';
import * as githubCollection from '../actions/github-collection';

export interface State {
  ids: number[];
  loading: boolean;
  query: string;
};

const initialState: State = {
  ids: [],
  loading: false,
  query: ''
};

export function reducer(state = initialState, action: github.Actions | githubCollection.Actions): State {
  switch (action.type) {
    case github.GITHUB_SEARCH: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          query
        };
      }

      return Object.assign({}, state, {
        query,
        loading: true
      });
    }

    case github.GITHUB_SEARCH_COMPLETE: {
      const githubUsers = action.payload;

      return {
        ids: githubUsers.map(user => user.id),
        loading: false,
        query: state.query
      };
    }

    default: {
      return state;
    }
  }
}

export const getGithubIds = (state: State) => state.ids;

export const getGithubQuery = (state: State) => state.query;

export const getGithubLoading = (state: State) => state.loading;
