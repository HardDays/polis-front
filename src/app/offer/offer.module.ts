import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OfferComponent } from './offer.component';
import { OfferRoutingModule } from './offer.routing';
import { PipesModule } from '../core/pipes/pipes.module';


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
    OfferRoutingModule,
    PipesModule
  ],
  providers: [ 
  ]
})
export class OfferModule {}