import { createSelector } from 'reselect';
import { Adduser } from '../models/adduser';
import * as adduser from '../actions/add-user';
import * as loaduser from '../actions/load-user';

export interface State {
  ids: number[];
  entities: { [id: number]: Adduser };
};

export const initialState: State = {
  ids: [],
  entities: {}
};

export function reducer(state = initialState, action: adduser.Actions | loaduser.Actions ): State {

  switch (action.type) {
    //case loaduser.LOAD_ADDED_USERS_COMPLETE:  
    case adduser.ADD_USER: {
  
        const addusers = [JSON.parse(action.payload)];
        const newAddUsers  = addusers.filter(user => !state.entities[user.username]); 
        const newAddUserIds       = newAddUsers.map(user => user.id);
        const newAddUserEntities  = newAddUsers.reduce((entities: { [id: number]: Adduser }, user: Adduser) => {
            return Object.assign(entities, {
            [user.id]: user
            });
        }, {});

        return {
            ids: [ ...state.ids, ...newAddUserIds ],
            entities: Object.assign({}, state.entities, newAddUserEntities)
        };
    }
/*
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
*/

    case loaduser.LOAD_ADDED_USERS_COMPLETE:  {
  
        const addusers1 = action.payload;
        console.log("##########");
        console.table(addusers1);
        console.error(addusers1);
        const newAddUsers1  = addusers1.filter(user => !state.entities[user.id]); 
        const newAddUserIds1       = newAddUsers1.map(user => user.id);
        const newAddUserEntities1  = newAddUsers1.reduce((entities: { [id: number]: Adduser }, user: Adduser) => {
            return Object.assign(entities, {
            [user.id]: user
            });
        }, {});

        return {
            ids: [ ...state.ids, ...newAddUserIds1 ],
            entities: Object.assign({}, state.entities, newAddUserEntities1)
        };
    }

    default: {
      return state;
    }
  }
}

export const getAddUserEntities = (state: State) => state.entities;
export const getAddUserIds = (state: State) => state.ids;
export const getAddUserAll = createSelector(getAddUserEntities, getAddUserIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
