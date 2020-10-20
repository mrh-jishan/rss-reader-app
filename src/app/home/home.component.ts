import { Component, OnInit } from '@angular/core';
import {FeedServiceService} from "../feed-service.service";

@Component({
  selector: 'rss-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  feeds = [];
  constructor(   private feedServiceService: FeedServiceService) { }

  ngOnInit(): void {
    this.feedServiceService.getFeedList('http://localhost:8080/https://www.smh.com.au/rss/feed.xml').subscribe(res => {
      this.feeds = res.rss.channel.item;
    });
  }

}
