import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { ErrorRoutingModule } from './error.routing';


@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorRoutingModule
  ],
  providers: [ 
  ]
})
export class ErrorModule {}