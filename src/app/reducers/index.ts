import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {feedReducer} from '../redux/feed/feed.reducer';
import {itemReducer} from "../redux/item/item.reducer";

export interface AppState {
  feed: any;
  item: any;
}

export const reducers: ActionReducerMap<AppState> = {
  feed: feedReducer,
  item: itemReducer,
};


export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.debug("state before: ", state);
    console.debug("action", action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
