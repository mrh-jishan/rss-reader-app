import {Component, OnInit, Renderer2} from '@angular/core';
import {FeedServiceService} from "../feed-service.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {tap} from "rxjs/operators";
import {feeds, selectAllFeeds} from "../redux/feed/feed.selectors";
import {Observable} from "rxjs";
import {FeedState} from "../redux/feed/feed.reducer";
import {Feed, Item} from "../model/feed";
import {itemOnViewport} from "../redux/feed/feed.actions";

@Component({
  selector: 'rss-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  feed$: Observable<Item[]>;

  constructor(private store: Store<AppState>) {
  }

  public onIntersection(item: Item): void {
    this.store.dispatch(itemOnViewport({item: item}))
  }

  ngOnInit(): void {
    this.feed$ = this.store.pipe(
      select(selectAllFeeds)
    );
  }

}
