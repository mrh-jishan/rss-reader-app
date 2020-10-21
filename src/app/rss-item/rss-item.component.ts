import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {itemClicked} from "../redux/feed.actions";
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
    this.store.dispatch(itemClicked({item: item}))
    window.open(item.link)
  }

  visited(item: Item) {
    this.store.dispatch(itemClicked({item: item}))
  }
}
