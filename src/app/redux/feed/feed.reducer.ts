import {Action, createReducer, on} from '@ngrx/store';
import {addItemFeed, itemClicked, itemOnViewport, loadFeed} from './feed.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Item} from "../../model/feed";


export interface FeedState extends EntityState<Item> {
  selectedItemId: string;
}


export function selectItemId(item: Item): string {
  return item.link;
}

export function sortByDate(b: Item, a: Item): number {
  const compare = new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
  if (compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  } else return 0;
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: selectItemId,
  sortComparer: sortByDate,
});

export const initialState = adapter.getInitialState(adapter.getInitialState());

const _feedReducer = createReducer(initialState,
  on(loadFeed, (state, {item}) => adapter.addMany(item, initialState)),
  on(addItemFeed, (state, {item}) => adapter.addMany(item, state)),
  on(itemClicked, (state, {item}) => adapter.updateOne({id: item.link,
    changes: {...item, visited: true}}, state)),
  on(itemOnViewport, (state, {item}) => adapter.updateOne({id: item.link,
    changes: {...item, viewed: true}}, state))
);

export function feedReducer(state: FeedState, action: Action) {
  return _feedReducer(state, action);
}

export const {selectAll, selectTotal, selectEntities, selectIds} = adapter.getSelectors();
