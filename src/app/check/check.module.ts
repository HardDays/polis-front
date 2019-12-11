import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CheckComponent } from './check.component';
import { CheckRoutingModule } from './check.routing';
import { EmailFormModule } from '../input_modules/email/email.module';

@NgModule({
  declarations: [
    CheckComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CheckRoutingModule,
    EmailFormModule
  ],
  providers: [ 
  ]
})
export class CheckModule {}