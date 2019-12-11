import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OfferComponent } from './offer.component';
import { OfferRoutingModule } from './offer.routing';


@NgModule({
  declarations: [
    OfferComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OfferRoutingModule
  ],
  providers: [ 
  ]
})
export class OfferModule {}