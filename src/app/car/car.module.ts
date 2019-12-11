import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CarRoutingModule } from './car.routing';
import { CarComponent } from './car.component';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TextMaskModule } from 'angular2-text-mask';
import { CarFormModule } from '../input_modules/car/car.module';

@NgModule({
  declarations: [
    CarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CarRoutingModule,
    TextMaskModule,
    AutocompleteLibModule,
    CarFormModule
  ],
  providers: [ ]
})
export class CarModule {}