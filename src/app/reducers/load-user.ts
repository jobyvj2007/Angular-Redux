import * as loaduser from '../actions/load-user';
import * as adduser from '../actions/add-user';
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

export function reducer(state = initialState, action: loaduser.Actions | adduser.Actions): State {
  switch (action.type) {
    case loaduser.LOAD_DB_ADD_USER: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case loaduser.LOAD_ADDED_USERS_COMPLETE: {
      const loadusers =  action.payload;
      return {
        loaded: true,
        loading: false,
        ids: loadusers.map(loaduser => loaduser.id)
      };
    }

    case adduser.ADD_DDBB_USER: {

      const ddbbuser = action.payload;
      console.log("Add DB reducer is calling"); 
      console.log(ddbbuser)
      if (state.ids.indexOf(ddbbuser.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, ddbbuser.id ]
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoadUserIds = (state: State) => state.ids;
