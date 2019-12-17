import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CheckComponent } from './check.component';
import { CheckRoutingModule } from './check.routing';
import { EmailFormModule } from '../input_modules/email/email.module';
import { DriverFormModule } from '../input_modules/driver/driver.module';
import { OwnerFormModule } from '../input_modules/owner/owner.module';
import { CarFormModule } from '../input_modules/car/car.module';

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
    EmailFormModule,
    CarFormModule,
    DriverFormModule,
    OwnerFormModule
  ],
  providers: [ 
  ]
})
export class CheckModule {}