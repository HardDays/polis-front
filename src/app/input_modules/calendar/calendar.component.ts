import { Component, OnInit, HostListener, ViewChild, Input, Output , EventEmitter, ElementRef, forwardRef, ViewEncapsulation, OnDestroy, OnChanges} from '@angular/core';
import { FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { NgAutoCompleteComponent, CreateNewAutocompleteGroup, SelectedAutocompleteItem } from 'ng-auto-complete';
import { VehicleModel, AgreementModel } from 'src/app/core/models/agreement.model';
import { MainService } from 'src/app/core/services/main.service';
import { DriverModel } from '../../core/models/agreement.model';
import { IMyDpOptions, IMyInputFieldChanged } from 'mydatepicker';
import { conformToMask } from 'text-mask-core';

import * as moment from 'moment';
import * as _ from 'lodash';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';

moment.updateLocale("ru", { week: {
    dow: 1, // First day of week is Sunday
    doy: 7  // First week of year must contain 1 January (7 + 0 - 1)
}});

export const CALENDAR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalendarComponent),
    multi: true
};

export interface CalendarDate
{
    mDate: moment.Moment;
    selected?: boolean;
    today?: boolean;
    disabled?: boolean;
}

@Component({
    selector: 'app-calendar-cmp',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    providers: [CALENDAR_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
  })
export class CalendarComponent implements OnInit,ControlValueAccessor
{
    writeValue(obj: any): void {
        console.log(obj);
        if(obj)
        {
            const date = moment(obj);

            if(date.isValid)
            {
                this.DateStr = date.format(this.BaseFormat);
                this.SelectedDate = date;
                this.currentDate = date;
                this.generateCalendar();
    
                for(let week of this.weeks)
                {
                    for(let day of week)
                    {
                        day.selected = day.mDate.isSame(date);
                    }
                }
            }
        }
    }
    registerOnChange(fn: any): void {
    }
    registerOnTouched(fn: any): void {
    }
    setDisabledState?(isDisabled: boolean): void {
    }

    @Input() Show: boolean;
    @Input() DisableBefore: string;
    @Input() DisableFrom: string;
    @Input() StartDate: string;

    @Input() ParentForm: FormGroup;
    @Input() formControlName: string;

    onChangeCb: (_: any) => void = () => { };
    onTouchedCb: () => void = () => { };

    DateRegExp = /^[\d]{2}\.[\d]{2}\.[\d]{4}$/;
    InputMask = (Val) => {
        const val0 = Val && Val[0] ? Number.parseInt(Val[0]) : null;
        const val3 = Val && Val[3] ? Number.parseInt(Val[3]) : null;

        const val6 = Val && Val[6] ? Number.parseInt(Val[6]) : null;
        const year = moment().format("YYYY");
        let mask = [
            /[0-3]/,
            val0 ? (val0 == 3 ? /[0-1]/ : /[0-9]/) : /[1-9]/ ,
            ".",
            /[0-1]/,
            val3 ? /[0-2]/ : /[0-9]/,
            ".",
            /[1-2]/,
            val6 ? (val6 == 1 ? /[9]/ : /[0]/) : /\d/,
            /\d/,
            /[0-9]/
        ];

        return mask;
    };

    SelectedDate: moment.Moment = null;

    DateStr = "";

    BaseFormat = "DD.MM.YYYY";
    ReturnFormat = "YYYY-MM-DD";

    DayNames = [
        'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб','Вс'
    ];

    MonthNames = {
        1: 'Январь', 
        2: 'Февраль', 
        3: 'Март', 
        4: 'Апрель', 
        5: 'Май', 
        6: 'Июнь', 
        7: 'Июль', 
        8: 'Август', 
        9: 'Сентябрь', 
        10: 'Октябрь', 
        11: 'Ноябрь', 
        12: 'Декабрь'
    };

    weeks: CalendarDate[][] = [];
    sortedDates: CalendarDate[] = [];

    currentDate = moment();

    MonthPrev = moment();
    MonthNext = moment();

    constructor(private _elementRef : ElementRef)
    {
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.Show = false;
            this.OnBlur();
        }
    }

    ngOnInit(): void {
        this.formControl.setValidators([ Validators.required, this.ValidateDate()])
        this.currentDate = moment(this.StartDate);
        this.generateCalendar();
    }

    generateCalendar(): void {

        const dates = this.fillDates(this.currentDate);
        const weeks: CalendarDate[][] = [];
        while (dates.length > 0) {
          weeks.push(dates.splice(0, 7));
        }
        this.weeks = weeks;
        this.GetPrevMonth();
        this.GetNextMonth();
    }

    GetPrevMonth(): void {
        this.MonthPrev = moment(this.currentDate).subtract(1, 'months');
    }
    GetNextMonth(): void {
        this.MonthNext = moment(this.currentDate).add(1, 'months');
    }

    fillDates(currentMoment: moment.Moment): CalendarDate[] {

        const firstOfMonth = moment(currentMoment).startOf('month').day();
        const startDiff = firstOfMonth ? (firstOfMonth - 1) : 6;

        const lastOfMonth = moment(currentMoment).endOf('month').day();
        const endDiff = lastOfMonth ? (7 - lastOfMonth) : 0;

        const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(startDiff, 'days');

        const end = startDiff + endDiff + moment(currentMoment).endOf('month').date();

        const start = firstDayOfGrid.date();
        return _.range(start, start + end)
                .map((date: number): CalendarDate => {
                    const d = moment(firstDayOfGrid).date(date);
                    return {
                        today: this.isToday(d),
                        mDate: d,
                        disabled: this.isDisabled(d),
                        selected: d.isSame(this.SelectedDate)
                    };
                });
    }

    isDisabled(date: moment.Moment): boolean
    {
        let result = false;

        if(this.DisableBefore && this.DisableFrom)
        {
            result = !date.isBetween(moment(this.DisableBefore), moment(this.DisableFrom));
        }
        else if(this.DisableBefore)
        {
            result = date.isBefore(moment(this.DisableBefore));
        }
        else if(this.DisableFrom)
        {
            result = date.isAfter(moment(this.DisableFrom));
        }

        return result;
    }

    isToday(date: moment.Moment): boolean {
        return moment().isSame(moment(date), 'day');
    }

    isSelectedMonth(date: moment.Moment): boolean {
        
        return moment(date).isSame(moment(this.currentDate), 'month');
    }

    prevMonth(): void {
        this.currentDate = moment(this.currentDate).subtract(1, 'months');
        this.generateCalendar();
    }
    
    nextMonth(): void {
        this.currentDate = moment(this.currentDate).add(1, 'months');
        this.generateCalendar();
    }

    selectDate(date: CalendarDate)
    {
        if(date.disabled)
        {
            return;
        }

        this.updateDateValue(date);

        if(this.Show)
        {
            this.Show = false;
        }

        this.OnBlur();
    }

    updateDateValue(date: CalendarDate): void {

        this.SelectedDate = date.mDate;

        for(let week of this.weeks)
        {
            for(let day of week)
            {
                day.selected = day.mDate.isSame(date.mDate);
            }
        }

        this.updateFormValue(date);
        this.DateStr = date.mDate.format(this.BaseFormat);
    }

    updateFormValue(date: CalendarDate):void
    {
        this.ParentForm.get(this.formControlName).setValue(date.mDate.format(this.ReturnFormat));
    }

    get formControl()
    {
        return this.ParentForm.get(this.formControlName);
    }

    ValidateDate()
    {
        return (control: AbstractControl): {[key: string]: any} | null => {
            if(this.formControl)
            {
                let data = control.value;

                if(!data)
                    return {'wrong': true};

                const date = moment(data, this.ReturnFormat);

                if(!date.isValid())
                {
                    return {'wrong': true};
                }

                if(this.DisableBefore)
                {
                    if(date.isBefore(moment(this.DisableBefore, this.ReturnFormat)))
                    {
                        return {'wrong': true};
                    }
                }

                if(this.DisableFrom)
                {
                    if(date.isAfter(moment(this.DisableFrom, this.ReturnFormat)))
                    {
                        return {'wrong': true};
                    }
                }
            }
            return null;
          };
    }

    OnFocus()
    {
        this.Show = true;
    }

    OnBlur()
    {
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
    }

    OnInputChanged($event)
    {
        this.DateStr = $event;

        const date = moment($event, this.BaseFormat);

        if(this.DateRegExp.test($event) && date.isValid)
        {
            this.formControl.setValue(date.format(this.ReturnFormat));
            
            this.formControl.updateValueAndValidity();

            if($event.length == 10)
            {
                this.SelectedDate = date;
                this.currentDate = date;
                this.generateCalendar();
    
                for(let week of this.weeks)
                {
                    for(let day of week)
                    {
                        day.selected = day.mDate.isSame(date);
                    }
                }
            }
        }
        else{
            this.formControl.setErrors({'wrong': true});
        }

        this.OnBlur();
    }

  }
  