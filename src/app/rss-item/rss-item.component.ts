import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {itemClicked, itemOnViewport} from "../redux/feed/feed.actions";
import {Item} from "../model/feed";

@Component({
  selector: 'rss-rss-item',
  templateUrl: './rss-item.component.html',
  styleUrls: ['./rss-item.component.scss']
})
export class RssItemComponent implements OnInit {

  @Input("item") item: Item;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  open(item: Item) {
    this.store.dispatch(itemOnViewport({item: item}))
    window.open(item.link)
  }

  visited(item: Item) {
    this.store.dispatch(itemClicked({item: item}))
  }
  newFeed(item: Item) {
    return !item.viewed && new Date(item.pubDate).getTime() < new Date().getTime()? 'fiber_new': 'visibility'
  }
}
