import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./reducers";
import {initReloadDataLoad} from "./redux/feed/feed.actions";

@Component({
  selector: 'rss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    setInterval(() => {
      this.store.dispatch(initReloadDataLoad());
    }, 50000);
  }
}
