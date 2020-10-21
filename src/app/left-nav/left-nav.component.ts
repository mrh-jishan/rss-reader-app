import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AddFeedDialogComponent} from "../add-feed-dialog/add-feed-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FeedServiceService} from "../feed-service.service";

@Component({
  selector: 'rss-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftNavComponent implements OnInit {

  feeds = []

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

  removeFeed(feed: any) {
    this.feedServiceService.removeFeedItem(feed);
  }

  reloadFeed(feed: any) {
    this.feedServiceService.reloadFeed(feed);
  }
}
