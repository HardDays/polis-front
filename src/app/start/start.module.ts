import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StartComponent } from './start.component';
import { StartRoutingModule } from './start.routing';

@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StartRoutingModule

  ],
  providers: [ ]
})
export class StartModule {}