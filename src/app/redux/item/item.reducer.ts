import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {lStorage} from "../../model/feed";
import {addStorage, loadStorage, removeStorage} from "./item.actions";


export interface ItemState extends EntityState<lStorage> {
  selectedItemId: string;
}

export function selectItemId(item: lStorage): string {
  return item.link;
}

export const adapter: EntityAdapter<lStorage> = createEntityAdapter<lStorage>({
  selectId: selectItemId
});

export const initialState = adapter.getInitialState({});

const _itemReducer = createReducer(initialState,
  on(loadStorage, (state, {item}) => adapter.addMany(item, state)),
  on(addStorage, (state, {item}) => adapter.addOne(item, state)),
  on(removeStorage, (state, {item}) => adapter.removeOne(item.link, state))
);

export function itemReducer(state: ItemState, action: Action) {
  return _itemReducer(state, action);
}

export const {selectAll} = adapter.getSelectors();
