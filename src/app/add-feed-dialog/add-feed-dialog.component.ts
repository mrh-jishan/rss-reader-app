import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'rss-add-feed-dialog',
  templateUrl: './add-feed-dialog.component.html',
  styleUrls: ['./add-feed-dialog.component.scss']
})
export class AddFeedDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddFeedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


}
