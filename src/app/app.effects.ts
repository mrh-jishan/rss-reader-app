import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {FeedServiceService} from "./feed-service.service";
import {initDataLoad, loadFeed} from "./redux/feed/feed.actions";
import {map, mergeMap, tap} from "rxjs/operators";
import {defer} from "rxjs";
import {initStorage, loadStorage} from "./redux/item/item.actions";
import {lStorage} from "./model/feed";


@Injectable()
export class AppEffects {

  @Effect()
  initStorage$ = defer(() => this.actions$.pipe(
    ofType(initStorage),
    map(() => {
      const lStorage: lStorage[] = this.feedServiceService.getLocalFeedItems()
      return loadStorage({item: lStorage});
    })
  ));


  @Effect()
  init$ = defer(() => this.actions$.pipe(
    ofType(initDataLoad),
    mergeMap(() => this.feedServiceService.loadFeedList()
      .pipe(
        map(result => {
          const items = result.flatMap(items => items.item)
          return loadFeed({item: items})
        })
      ))
  ));

  constructor(private actions$: Actions,
              private feedServiceService: FeedServiceService) {
  }

}
