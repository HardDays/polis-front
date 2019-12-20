import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FailComponent } from './fail.component';
import { FailRoutingModule } from './fail.routing';


@NgModule({
  declarations: [
    FailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    FailRoutingModule
  ],
  providers: [ 
  ]
})
export class FailModule {}