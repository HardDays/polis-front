import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { OwnerRoutingModule } from './owner.routing';
import { OwnerFormModule } from '../input_modules/owner/owner.module';


@NgModule({
  declarations: [
    OwnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OwnerRoutingModule,
    OwnerFormModule
  ],
  providers: [ 
  ]
})
export class OwnerModule {}