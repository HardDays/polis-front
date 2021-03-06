import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { OwnComponent } from './own.component';
import { OwnRoutingModule } from './own.routing';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { CalendarModule } from '../input_modules/calendar/calendar.module';

@NgModule({
  declarations: [
    OwnComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OwnRoutingModule,
    AutocompleteLibModule,
    TextMaskModule,
    MyDatePickerModule,
    CalendarModule
  ],
  providers: [ ]
})
export class OwnModule {}