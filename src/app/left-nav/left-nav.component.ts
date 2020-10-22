import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AddFeedDialogComponent} from "../add-feed-dialog/add-feed-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FeedServiceService} from "../feed-service.service";
import {lStorage} from "../model/feed";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {tap} from "rxjs/operators";
import {noop, Observable} from "rxjs";
import {addStorage, removeStorage} from "../redux/item/item.actions";
import {addItemFeed, initDataLoad} from "../redux/feed/feed.actions";
import {selectAllItem} from "../redux/item/item.selectors";

@Component({
  selector: 'rss-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftNavComponent implements OnInit {

  lStore: Observable<lStorage[]>;

  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              private feedServiceService: FeedServiceService) {
  }

  ngOnInit(): void {
    this.lStore = this.store.pipe(
      select(selectAllItem)
    )
  }

  openDialog(): void {
    this.dialog.open(AddFeedDialogComponent, {
      width: '550px',
      height: '200px'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.feedServiceService.getFeedListByUrl(result.url).pipe(
          tap(data => {
            const obj: lStorage = {
              link: result.url,
              title: data.title,
              image: data.image
            }
            this.feedServiceService.saveLocalFeedItems(obj);
            this.store.dispatch(addStorage({item: obj}));
            this.store.dispatch(addItemFeed({item: data.item}))
          })
        ).subscribe(
          noop,
          () => alert('Failed to add url...')
        );
      }
    });
  }

  removeFeed(feed: lStorage) {
    this.feedServiceService.removeFeedItem(feed);
    this.store.dispatch(removeStorage({item: feed}));
    this.store.dispatch(initDataLoad());
  }

  reloadFeed(feed: lStorage) {
    this.feedServiceService.getFeedListByUrl(feed.link).pipe(
      tap(data => {
        this.store.dispatch(addItemFeed({item: data.item}))
      })
    ).subscribe(
      noop,
      () => alert('Failed to load...')
    );
  }
}
