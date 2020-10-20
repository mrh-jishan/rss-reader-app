import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
import {FormsModule} from "@angular/forms";
import { RssItemComponent } from './rss-item/rss-item.component';
import {MatCardModule} from "@angular/material/card";

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
    RssItemComponent
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
    MatCardModule
  ],
  providers: [],
  entryComponents: [
    AddFeedDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
