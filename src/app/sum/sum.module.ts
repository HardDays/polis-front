import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { SumComponent } from './sum.component';
import { SumRoutingModule } from './sum.routing';

@NgModule({
  declarations: [
    SumComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SumRoutingModule,
    MyDatePickerModule
  ],
  providers: []
})
export class SumModule {}