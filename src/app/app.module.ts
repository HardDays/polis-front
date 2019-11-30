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
import { PolicyholderModule } from './policyholder/policyholder.module';
import { OwnerModule } from './owner/owner.module';
import { DriversModule } from './drivers/drivers.module';
import { MainService } from './core/services/main.service';
import { FormsModule } from '@angular/forms';
import { SimpleService } from './simple/simple.service';
import { CityService } from './core/services/city.service';
import { DadataService } from './core/services/dadata.service';

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
    AuthModule,
    
    // HttpClientModule,
    // TextMaskModule,
  ],
  providers: [
    HttpModule,
    AuthService,
    HttpService,
    DictsService,
    CarService,
    MainService,
    SimpleService,
    CityService,
    DadataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
