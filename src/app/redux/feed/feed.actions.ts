import {createAction, props} from '@ngrx/store';
import {Item} from "../../model/feed";

export const initDataLoad = createAction('[Feed Component] initDataLoad');
export const loadFeed = createAction('[Feed Component] loadFeed', props<{ item: Item[] }>());

export const initReloadDataLoad = createAction('[Feed Component] initReloadDataLoad');

export const addItemFeed = createAction('[Feed Component] addItemFeed', props<{ item: Item[] }>());
export const itemClicked = createAction('[Feed Component] itemClicked', props<{ item: Item }>());
export const itemOnViewport = createAction('[Feed Component] itemOnViewport', props<{ item: Item }>());
