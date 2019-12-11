import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from './vehicle.component';
const routes: Routes =
[
  {
    path: '',pathMatch: "full", component: VehicleComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  providers: []
})
export class VehicleRoutingModule { }