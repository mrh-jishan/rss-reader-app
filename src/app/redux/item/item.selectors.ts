import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ItemState, selectAll} from "./item.reducer";


export const selectItemState =
  createFeatureSelector<ItemState>("item");


export const feeds = createSelector(
  selectItemState, items => items
);

export const selectAllItem = createSelector(
  selectItemState,
  selectAll
);
