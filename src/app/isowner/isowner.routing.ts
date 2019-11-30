import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { IsownerComponent } from './isowner.component';

const routes: Routes =
[
  {
    path: '',pathMatch: "full", component: IsownerComponent
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
export class IsOwnerRoutingModule { }