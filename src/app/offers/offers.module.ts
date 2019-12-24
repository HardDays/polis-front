import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OffersComponent } from './offers.component';
import { OffersRoutingModule } from './offers.routing';
import { PipesModule } from '../core/pipes/pipes.module';


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
    OffersRoutingModule,
    PipesModule
  ],
  providers: [ 
  ]
})
export class OffersModule {}