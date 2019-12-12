import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OwnerFormModule } from '../input_modules/owner/owner.module';
import { InsurerComponent } from './insurer.component';
import { InsurerRoutingModule } from './insurer.routing';


@NgModule({
  declarations: [
    InsurerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InsurerRoutingModule,
    OwnerFormModule
  ],
  providers: [ 
  ]
})
export class InsurerModule {}