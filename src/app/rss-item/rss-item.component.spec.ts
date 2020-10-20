import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssItemComponent } from './rss-item.component';

describe('RssItemComponent', () => {
  let component: RssItemComponent;
  let fixture: ComponentFixture<RssItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
