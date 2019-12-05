import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrevComponent } from './prev.component';

const routes: Routes = [
    {
        path: '', component: PrevComponent, children:[
            { path: '', redirectTo: 'start', pathMatch: 'full'},
            { path: 'start', loadChildren: 'src/app/start/start.module#StartModule'},
            { path: 'car', loadChildren: 'src/app/car/car.module#CarModule'},
            { path: 'ndrivers', loadChildren: 'src/app/ndrivers/ndrivers.module#NdriversModule'},
            { path: 'is_owner', loadChildren: 'src/app/isowner/isowner.module#IsOwnerModule'},
            { path: 'own', loadChildren: 'src/app/own/own.module#OwnModule'},
            { path: 'confirm', loadChildren: 'src/app/confirm/confirm.module#ConfirmModule'},
            { path: 'calc_lite', loadChildren: 'src/app/litecalc/litecalc.module#LiteCalcModule'}
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PrevRoutingModule { }