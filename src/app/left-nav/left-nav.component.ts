import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AddFeedDialogComponent} from "../add-feed-dialog/add-feed-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FeedServiceService} from "../feed-service.service";
import {Feed, lStorage} from "../model/feed";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
// import {loadFeed, loadFeedByUrl} from "../redux/feed.actions";
import {tap} from "rxjs/operators";
import {feeds} from "../redux/feed.selectors";

@Component({
  selector: 'rss-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftNavComponent implements OnInit {

  feeds: lStorage[] = []

  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              private feedServiceService: FeedServiceService) {
  }

  ngOnInit(): void {
    this.store.pipe(
      select(feeds),
      tap(channel => {
        console.log('feeds data: ', channel)
      })
    )
  }

  openDialog(): void {
    this.dialog.open(AddFeedDialogComponent, {
      width: '550px',
      height: '200px'
    }).afterClosed().subscribe(result => {
      this.feedServiceService.updateFeeder(result.url);
    });
  }

  removeFeed(feed: lStorage) {
    this.feedServiceService.removeFeedItem(feed);
  }

  reloadFeed(feed: lStorage) {
    this.feedServiceService.reloadFeed(feed);
  }

  navigate(feed: lStorage) {
    // this.store.dispatch(loadFeedByUrl({feed: feed}))
  }
}
