import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './core/services/http.service';
import { AuthService } from './core/services/auth.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { PeriodModule } from './period/period.module';
import { DictsService } from './core/services/dicts.service';
import { TransportModule } from './transport/transport.module';
import { CarService } from './core/services/car.service';

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
    AuthModule,
    PeriodModule,
    TransportModule
    // HttpClientModule,
    // TextMaskModule,
  ],
  providers: [
    HttpModule,
    AuthService,
    HttpService,
    DictsService,
    CarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
