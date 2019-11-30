import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './core/services/http.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MainService } from './core/services/main.service';
import { FormsModule } from '@angular/forms';
import { SessionService } from './core/services/session.service';

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
    AppRoutingModule
    
    // HttpClientModule,
    // TextMaskModule,
  ],
  providers: [
    HttpModule,
    HttpService,
    MainService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
