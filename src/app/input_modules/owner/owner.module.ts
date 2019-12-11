import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MyDatePickerModule } from 'mydatepicker';
import { OwnerFormComponent } from './owner.component';


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
        OwnerFormComponent
    ],
    exports: [ 
        OwnerFormComponent
    ]
})
export class OwnerFormModule {}