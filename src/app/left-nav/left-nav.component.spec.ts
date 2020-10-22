import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftNavComponent } from './left-nav.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";

describe('LeftNavComponent', () => {
  let component: LeftNavComponent;
  let fixture: ComponentFixture<LeftNavComponent>;
  let store: MockStore;
  let initialState = {ids: []}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftNavComponent ],
      imports: [MatDialogModule, HttpClientModule],
      providers: [
        provideMockStore({  initialState}),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
