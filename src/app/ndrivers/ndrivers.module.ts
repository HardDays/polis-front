import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NdriversComponent } from './ndrivers.component';
import { NdriversRoutingModule } from './ndrivers.routing';

@NgModule({
  declarations: [
    NdriversComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NdriversRoutingModule,
    // AutocompleteLibModule
  ],
  providers: [ ]
})
export class NdriversModule {}