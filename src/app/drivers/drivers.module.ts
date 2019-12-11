import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { DriversComponent } from './drivers.component';
import { DriversRoutingModule } from './drivers.routing';
import { DriverFormModule } from '../input_modules/driver/driver.module';

@NgModule({
  declarations: [
    DriversComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DriversRoutingModule,
    MyDatePickerModule,
    DriverFormModule
  ],
  providers: []
})
export class DriversModule {}