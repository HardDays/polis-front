import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DateRoutingModule } from './date.routing';
import { DateComponent } from './date.component';
import { MyDatePickerModule } from 'mydatepicker';
import { CalendarModule } from '../input_modules/calendar/calendar.module';

@NgModule({
  declarations: [
    DateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DateRoutingModule,
    MyDatePickerModule,
    CalendarModule
  ],
  providers: [ 
  ]
})
export class DateModule {}