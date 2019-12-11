import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PassportComponent } from './passport.component';
import { PassportRoutingModule } from './passport.routing';


@NgModule({
  declarations: [
    PassportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PassportRoutingModule
  ],
  providers: [ 
  ]
})
export class PassportModule {}