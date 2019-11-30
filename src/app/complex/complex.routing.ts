import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ComplexComponent } from './complex.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: ComplexComponent}
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
export class ComplexRoutingModule{}