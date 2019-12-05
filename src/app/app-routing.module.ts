import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'prev', pathMatch: 'full'},
  { path: 'prev', loadChildren: 'src/app/prev/prev.module#PrevModule'},
  // { path: 'start', loadChildren: 'src/app/start/start.module#StartModule'},
  // { path: 'car', loadChildren: 'src/app/car/car.module#CarModule'},
  // { path: 'ndrivers', loadChildren: 'src/app/ndrivers/ndrivers.module#NdriversModule'},
  // { path: 'is_owner', loadChildren: 'src/app/isowner/isowner.module#IsOwnerModule'},
  // { path: 'own', loadChildren: 'src/app/own/own.module#OwnModule'},
  // { path: 'confirm', loadChildren: 'src/app/confirm/confirm.module#ConfirmModule'},
  { path: 'calc_lite', loadChildren: 'src/app/litecalc/litecalc.module#LiteCalcModule'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
