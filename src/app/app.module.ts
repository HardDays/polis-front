import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './core/services/http.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MainService } from './core/services/main.service';
import { FormsModule } from '@angular/forms';
import { SessionService } from './core/services/session.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule
  ],
  providers: [
    HttpModule,
    HttpService,
    MainService,
    SessionService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
