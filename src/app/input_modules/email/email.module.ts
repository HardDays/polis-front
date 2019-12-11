import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EmailFormComponent } from './email.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        CommonModule,
        // RouterModule,
        ReactiveFormsModule
    ],
    declarations: [
        EmailFormComponent
    ],
    exports: [ 
        EmailFormComponent
    ]
})
export class EmailFormModule {}