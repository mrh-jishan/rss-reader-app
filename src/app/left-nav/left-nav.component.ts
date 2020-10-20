import { Component, OnInit } from '@angular/core';
import {AddFeedDialogComponent} from "../add-feed-dialog/add-feed-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'rss-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddFeedDialogComponent, {
      width: '250px',
      data: {name: 'name is robin', animal: 'cow is animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
