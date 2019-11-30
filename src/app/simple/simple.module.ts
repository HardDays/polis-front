import { NgModule } from "@angular/core";
import { SimpleComponent } from './simple.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SimpleRoutingModule } from './simple.routing';
import { InfoComponent } from './info/info.component';
import { StartComponent } from './start/start.component';
import { CarComponent } from './car/car.component';
import { DriversComponent } from './drivers/drivers.component';
import { IsOwnerComponent } from './is_owner/is_owner.component';
import { OwnerComponent } from './owner/owner.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { FinalComponent } from './final/final.component';
import { TransportComponent } from './transport/transport.component';
import { DriverComponent } from './driver/driver.component';
import { HolderComponent } from './holder/holder.component';
import { SuperFinalComponent } from './super_final/super_final.component';

@NgModule({
    declarations: [
        SimpleComponent,
        InfoComponent,
        StartComponent,
        CarComponent,
        DriversComponent,
        IsOwnerComponent,
        OwnerComponent,
        FinalComponent,
        TransportComponent,
        DriverComponent,
        HolderComponent,
        SuperFinalComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
        ReactiveFormsModule,
        // TextMas
        SimpleRoutingModule,   
        AutocompleteLibModule
    ],
    providers:[]
})
export class SimpleModule{}