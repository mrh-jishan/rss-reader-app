import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RssItemComponent} from './rss-item.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {SafeHtmlPipePipe} from "../safe-html-pipe.pipe";

describe('RssItemComponent', () => {
  let component: RssItemComponent;
  let fixture: ComponentFixture<RssItemComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RssItemComponent,
        SafeHtmlPipePipe ],
      providers: [
        provideMockStore({  }),
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssItemComponent);
    component = fixture.componentInstance;
    component.item = {pubDate: '05/03/2020', viewed: true, visited: true, description: 'test', link: 'http://go', title: 'title'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
