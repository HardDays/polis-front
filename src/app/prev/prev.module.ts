import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PrevComponent } from './prev.component';
import { PrevRoutingModule } from './prev.routing';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PrevComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    PrevRoutingModule
  ],
  providers: []
})
export class PrevModule { }
