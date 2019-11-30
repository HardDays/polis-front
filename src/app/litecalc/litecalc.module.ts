import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { LiteCalcComponent } from './litecalc.component';
import { LiteCalcRoutingModule } from './litecalc.routing';

@NgModule({
  declarations: [
    LiteCalcComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LiteCalcRoutingModule,
    AutocompleteLibModule,
    TextMaskModule,
    MyDatePickerModule
  ],
  providers: [ ]
})
export class LiteCalcModule {}