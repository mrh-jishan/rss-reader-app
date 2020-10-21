import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./reducers";
import {initDataLoad} from "./redux/feed.actions";

@Component({
  selector: 'rss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  constructor() {
  }

  ngOnInit() {

  }
}
