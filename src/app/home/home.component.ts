import {Component, OnInit} from '@angular/core';
import {FeedServiceService} from "../feed-service.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {tap} from "rxjs/operators";
import {feeds, selectAllFeeds} from "../redux/feed.selectors";
import {Observable} from "rxjs";
import {FeedState} from "../redux/feed.reducer";
import {Feed, Item} from "../model/feed";

@Component({
  selector: 'rss-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  feed$: Observable<Item[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.feed$ = this.store.pipe(
      select(selectAllFeeds)
    );
  }

}
