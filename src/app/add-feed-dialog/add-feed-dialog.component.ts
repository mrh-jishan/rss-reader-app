import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'rss-add-feed-dialog',
  templateUrl: './add-feed-dialog.component.html',
  styleUrls: ['./add-feed-dialog.component.scss']
})
export class AddFeedDialogComponent implements OnInit {

   form: FormGroup;
   reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(public dialogRef: MatDialogRef<AddFeedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      url: ['', Validators.compose([Validators.required, Validators.pattern(this.reg)])]
    })
  }


}
