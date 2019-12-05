import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { ConfirmComponent } from './confirm.component';
import { ConfirmRoutingModule } from './confirm.routing';

@NgModule({
  declarations: [
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ConfirmRoutingModule,
    // AutocompleteLibModule,
    TextMaskModule,
    MyDatePickerModule
  ],
  providers: [ ]
})
export class ConfirmModule {}