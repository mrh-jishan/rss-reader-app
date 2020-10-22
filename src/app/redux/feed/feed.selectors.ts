import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FeedState, selectAll} from './feed.reducer';


export const selectFeedState = createFeatureSelector<FeedState>("feed");

export const feeds = createSelector(
  selectFeedState, items => items
);


export const selectAllFeeds = createSelector(
  selectFeedState,
  selectAll
);
