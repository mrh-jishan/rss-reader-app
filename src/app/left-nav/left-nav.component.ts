import { Component, OnInit } from '@angular/core';
import {AddFeedDialogComponent} from "../add-feed-dialog/add-feed-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FeedServiceService} from "../feed-service.service";
import * as xml2js from "xml2js";

@Component({
  selector: 'rss-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  feeds = Array(10)

  constructor(public dialog: MatDialog,
              private feedServiceService: FeedServiceService) {}

  ngOnInit(): void {
    this.feedServiceService.getFeedList('http://localhost:8080/http://feeds.bbci.co.uk/news/rss.xml').subscribe(res=>{
      console.log(res)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddFeedDialogComponent, {
      width: '550px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
