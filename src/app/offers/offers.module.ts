import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OffersComponent } from './offers.component';
import { OffersRoutingModule } from './offers.routing';


@NgModule({
  declarations: [
    OffersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OffersRoutingModule
  ],
  providers: [ 
  ]
})
export class OffersModule {}