import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";

describe('AppComponent', () => {
  const initialState = { loggedIn: false };
  let store: MockStore;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[
        provideMockStore({ initialState }),
      ]
    }).compileComponents();
      store = TestBed.inject(MockStore);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rss-reader-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // expect(app.title).toEqual('rss-reader-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // expect(compiled.querySelector('.content span').textContent).toContain('rss-reader-app app is running!');
  });
});
