import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AddFeedDialogComponent} from "../add-feed-dialog/add-feed-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FeedServiceService} from "../feed-service.service";
import {Feed} from "../model/feed";

@Component({
  selector: 'rss-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftNavComponent implements OnInit {

  feeds: Feed[] = []

  constructor(public dialog: MatDialog,
              private feedServiceService: FeedServiceService) {
  }

  ngOnInit(): void {
    this.feeds = this.feedServiceService.getLocalFeedItems();
  }

  openDialog(): void {
    this.dialog.open(AddFeedDialogComponent, {
      width: '550px',
      height: '200px'
    }).afterClosed().subscribe(result => {
      this.feedServiceService.updateFeeder(result.url);
    });
  }

  removeFeed(feed: Feed) {
    this.feedServiceService.removeFeedItem(feed);
  }

  reloadFeed(feed: Feed) {
    this.feedServiceService.reloadFeed(feed);
  }

  navigate(feed: Feed) {
    this.feedServiceService.getFeedList(feed.url).subscribe(res=>{
      console.log(res);
    });
  }
}
