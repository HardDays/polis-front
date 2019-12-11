import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './full.component';

const routes: Routes = [
    {
        path: '', component: FullComponent, children:[
            { path: '', redirectTo: 'date', pathMatch: 'full'},
            { path: 'date', loadChildren: 'src/app/date/date.module#DateModule'},
            { path: 'vehicle', loadChildren: 'src/app/vehicle/vehicle.module#VehicleModule'},
            { path: 'drivers', loadChildren: 'src/app/drivers/drivers.module#DriversModule'},
            { path: 'owner', loadChildren: 'src/app/owner/owner.module#OwnerModule'},
            { path: 'check', loadChildren: 'src/app/check/check.module#CheckModule'},
            { path: 'offer', loadChildren: 'src/app/offer/offer.module#OfferModule'}
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FullRoutingModule { }