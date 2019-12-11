import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DocsComponent } from './docs.component';
import { DocsRoutingModule } from './docs.routing';

@NgModule({
  declarations: [
    DocsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DocsRoutingModule
  ],
  providers: [ 
  ]
})
export class DocsModule {}