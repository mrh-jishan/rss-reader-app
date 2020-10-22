import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedDialogComponent } from './add-feed-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {provideMockStore} from "@ngrx/store/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('AddFeedDialogComponent', () => {
  let component: AddFeedDialogComponent;
  let fixture: ComponentFixture<AddFeedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeedDialogComponent ],
      imports: [MatDialogModule, HttpClientModule, ReactiveFormsModule],
      providers: [
        provideMockStore({  }),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
