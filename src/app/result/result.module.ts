import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ResultComponent } from './result.component';
import { ResultRoutingModule } from './result.routing';


@NgModule({
  declarations: [
      ResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ResultRoutingModule
  ],
  providers: [ 
  ]
})
export class ResultModule {}