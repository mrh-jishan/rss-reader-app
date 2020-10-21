import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SideNavComponent} from './side-nav/side-nav.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';
import {LayoutComponent} from './layout/layout.component';
import {HeaderComponent} from './header/header.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {PermanentNavDirective} from './permanent-nav.directive';
import {LeftNavComponent} from './left-nav/left-nav.component';
import {AddFeedDialogComponent} from './add-feed-dialog/add-feed-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RssItemComponent} from './rss-item/rss-item.component';
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {Store, StoreModule} from '@ngrx/store';
import {AppState, metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {initDataLoad} from "./redux/feed/feed.actions";
import {initStorage} from "./redux/item/item.actions";
import { SafeHtmlPipePipe } from './safe-html-pipe.pipe';
import {InViewportModule} from "ng-in-viewport";

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomeComponent,
    SettingsComponent,
    LayoutComponent,
    HeaderComponent,
    PermanentNavDirective,
    LeftNavComponent,
    AddFeedDialogComponent,
    RssItemComponent,
    SafeHtmlPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    MatMenuModule,
    MatBadgeModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    InViewportModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<AppState>) => {
        return () => {
          store.dispatch(initStorage());
          store.dispatch(initDataLoad());
        };
      },
      multi: true,
      deps: [Store]
    }
  ],
  entryComponents: [
    AddFeedDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
