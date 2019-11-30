import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ComplexComponent } from './complex.component';
import { ComplexRoutingModule } from './complex.routing';
import { PeriodModule } from '../period/period.module';
import { TransportModule } from '../transport/transport.module';
import { PolicyholderModule } from '../policyholder/policyholder.module';
import { OwnerModule } from '../owner/owner.module';
import { DriversModule } from '../drivers/drivers.module';

@NgModule({
    declarations: [
        ComplexComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
        ReactiveFormsModule,
        // TextMas
        ComplexRoutingModule,   
        PeriodModule,
        TransportModule,
        PolicyholderModule,
        OwnerModule,
        DriversModule
    ],
    providers:[]
})
export class ComplexModule{}