import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmComponent } from './confirm.component';

const routes: Routes =
[
  {
    path: '',pathMatch: "full", component: ConfirmComponent
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
export class ConfirmRoutingModule { }