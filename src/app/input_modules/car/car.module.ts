import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MyDatePickerModule } from 'mydatepicker';
import { SimpleCarComponent } from './simple/simple.component';
import { FullCarComponent } from './full/full.component';
import { CalendarModule } from '../calendar/calendar.module';
import { TranslateService } from '../../core/services/translit.service';


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
        SimpleCarComponent,
        FullCarComponent
    ],
    exports: [ 
        SimpleCarComponent,
        FullCarComponent
    ],
    providers: [
        TranslateService
    ]
})
export class CarFormModule {}