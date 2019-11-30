import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { IsownerComponent } from './isowner.component';
import { IsOwnerRoutingModule } from './isowner.routing';

@NgModule({
  declarations: [
    IsownerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IsOwnerRoutingModule,
    AutocompleteLibModule
  ],
  providers: [ ]
})
export class IsOwnerModule {}