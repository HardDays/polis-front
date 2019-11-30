import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DriversComponent } from './drivers.component';

@NgModule({
  declarations: [
    DriversComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    // AuthRoutingModule,
    // TextMaskModule
  ],
  exports:[
    DriversComponent
  ],
  providers: []
})
export class DriversModule {}