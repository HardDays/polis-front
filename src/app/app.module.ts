import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './core/services/http.service';
import { AuthService } from './core/services/auth.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    // FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    AuthModule
    // HttpClientModule,
    // TextMaskModule,
  ],
  providers: [
    HttpModule,
    AuthService,
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
