import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MyDatePickerModule } from 'mydatepicker';
import { DriverFormComponent } from './driver.component';
import { CalendarModule } from '../calendar/calendar.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        CommonModule,
        // RouterModule,
        ReactiveFormsModule,
        TextMaskModule,
        AutocompleteLibModule,
        MyDatePickerModule,
        CalendarModule
    ],
    declarations: [
        DriverFormComponent
    ],
    exports: [ 
        DriverFormComponent
    ]
})
export class DriverFormModule {}