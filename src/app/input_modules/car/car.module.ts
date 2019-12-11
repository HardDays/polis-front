import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SimpleCarComponent } from './simple/simple.component';
import { FullCarComponent } from './full/full.component';
import { MyDatePickerModule } from 'mydatepicker';


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
        MyDatePickerModule
    ],
    declarations: [
        SimpleCarComponent,
        FullCarComponent
    ],
    exports: [ 
        SimpleCarComponent,
        FullCarComponent
    ]
})
export class CarFormModule {}