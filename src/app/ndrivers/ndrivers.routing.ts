import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NdriversComponent } from './ndrivers.component';

const routes: Routes =
[
  {
    path: '',pathMatch: "full", component: NdriversComponent
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
export class NdriversRoutingModule { }