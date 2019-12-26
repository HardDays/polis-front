import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TextMaskModule } from 'angular2-text-mask';
import { CalendarComponent } from './calendar.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        CommonModule,
        // RouterModule,
        ReactiveFormsModule,
        TextMaskModule
    ],
    declarations: [
        CalendarComponent
    ],
    exports: [
        CalendarComponent
    ]
})
export class CalendarModule {}
