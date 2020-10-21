import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {FeedServiceService} from "./feed-service.service";
import {initDataLoad, loadFeed, updateFeed} from "./redux/feed.actions";
import {catchError, exhaustMap, map, mergeMap} from "rxjs/operators";
import {defer, EMPTY, of} from "rxjs";
import {Item} from "./model/feed";


@Injectable()
export class AppEffects {


  // loadAllFeed$ = createEffect(
  //   () => this.actions$
  //     .pipe(
  //       ofType(loadFeed),
  //       mergeMap(() => this.feedServiceService.loadFeedList()
  //         .pipe(map((data) => {
  //             //   console.log('data: ',data)
  //             // const feeds: Channel[] = data.reduce((acc, val) => acc.concat(val), []).map((rss=>{
  //             //       // const item = rss.channel.item;
  //             //   console.log('feeds: ', rss)
  //             // return rss;
  //             // }));
  //             // data.forEach(({rss})=>{
  //             //     console.log(rss)
  //             //   })
  //             //   const flattened = data => [].concat(...data);
  //             // console.log('flta array : ',flattened(data))
  //
  //             return updateFeed(data)
  //           }
  //           ),
  //           catchError(() => EMPTY)
  //         ))
  //     )
  // );

  @Effect()
  init$ = defer(() => this.actions$.pipe(
    ofType(initDataLoad),
    mergeMap(() => this.feedServiceService.loadFeedList().pipe(
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
