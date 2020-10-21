import {createAction, props} from '@ngrx/store';
import {Feed, Item, lStorage} from "../model/feed";

export const initDataLoad = createAction('[Feed Component] initDataLoad');
export const loadFeed = createAction('[Feed Component] loadFeed', props<{item: Item[]}>());
export const itemClicked = createAction('[Feed Component] itemClicked', props<{item: Item}>());

// export const updateFeed = createAction('[Feed Component] updateFeed',props<{feed: Feed}>());
// export const createFeed = createAction('[Feed Component] createFeed',props<{feed: Feed}>());
// export const loadFeedByUrl = createAction('[Feed Component] loadFeed', props<{feed: lStorage}>());


