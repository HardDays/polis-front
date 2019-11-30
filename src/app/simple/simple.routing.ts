import { SimpleComponent } from "./simple.component";
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { StartComponent } from './start/start.component';
import { CarComponent } from './car/car.component';
import { DriversComponent } from './drivers/drivers.component';
import { IsOwnerComponent } from './is_owner/is_owner.component';
import { OwnerComponent } from './owner/owner.component';
import { FinalComponent } from './final/final.component';
import { TransportComponent } from './transport/transport.component';
import { DriverComponent } from './driver/driver.component';
import { HolderComponent } from './holder/holder.component';
import { SuperFinalComponent } from './super_final/super_final.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'info'},
    {
        path: 'info', component: InfoComponent
    },
    {
        path: 'start', component: StartComponent
    },
    {
        path: 'car', component: CarComponent
    },
    {
        path: 'drivers', component: DriversComponent
    },
    {
        path: 'is_owner', component: IsOwnerComponent
    },
    {
        path: 'owner', component: OwnerComponent
    },
    {
        path: 'final', component: FinalComponent
    },
    {
        path: 'transport', component: TransportComponent
    },
    {
        path: 'driver', component: DriverComponent
    },
    {
        path: 'holder', component: HolderComponent
    },
    {
        path: 'super_final', component: SuperFinalComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ],
    providers:[]
})
export class SimpleRoutingModule{}