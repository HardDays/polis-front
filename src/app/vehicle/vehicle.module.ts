import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { VehicleComponent } from './vehicle.component';
import { VehicleRoutingModule } from './vehicle.routing';
import { CarFormModule } from '../input_modules/car/car.module';

@NgModule({
  declarations: [
    VehicleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    CarFormModule,
    // ReactiveFormsModule,
    VehicleRoutingModule,
    // MyDatePickerModule
  ],
  providers: []
})
export class VehicleModule {}