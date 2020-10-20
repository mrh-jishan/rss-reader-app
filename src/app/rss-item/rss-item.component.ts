import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rss-rss-item',
  templateUrl: './rss-item.component.html',
  styleUrls: ['./rss-item.component.scss']
})
export class RssItemComponent implements OnInit {

  @Input("item") item;

  constructor() { }

  ngOnInit(): void {
    console.log(this.item)
  }

  open(link) {
    window.open(link)
  }
}
