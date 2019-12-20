import { Component, ViewChild, OnInit } from '@angular/core';
import { IMyDpOptions, MyDatePicker, IMySelector } from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { AgreementModel } from '../core/models/agreement.model';

@Component({
  selector: 'app-date-cmp',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit{

    @ViewChild('mydatepicker', {static: false}) mydp: MyDatePicker;
    public selector: IMySelector = {
        open: false
    };
    myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        dayLabels: {
            su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'
        },
        monthLabels:{
            1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек'
        },
        showTodayBtn: false,
        disableUntil: this.DisableFrom(),
        // maxYear: this.GetMaxYear(),
        showClearDateBtn: false,
        height: '37px',
        // inline: true,
        // showInputField: false,
        openSelectorOnInputClick: true,
        editableDateField: true,
        indicateInvalidDate: false
    };

    Form: FormGroup = new FormGroup({
        "date": new FormControl('',[
          Validators.required
        ]),
        "usePeriod": new FormControl(12, [
            Validators.required
        ])
    });

    constructor(private _main: MainService)
    {
        const data = this._main.Copy(this._main.Agreement) as AgreementModel;

        if(data.usePeriod)
            this.Form.get('usePeriod').patchValue(data.usePeriod)
        console.log(this._main.Agreement);
        // this.datepicker.openSelector(1);
    }
    ngOnInit(): void {
        
        this.selector = {
            open: true
        };
    }

    DisableFrom()
    {
        const date = new Date();

        const newDate = new Date(date.getTime() + 1000*60*60*24*3);

        return {
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
            day: newDate.getDate()
        }
    }

    Save()
    {
        this.date.markAsDirty();
        this.date.markAsTouched();
        this.date.updateValueAndValidity();
        this.Form.updateValueAndValidity();

        if(this.Form.valid)
        {
            const vals = this.Form.getRawValue();
            let agr = this._main.Copy(this._main.Agreement) as AgreementModel;
            agr.date = this._main.ParseDateObjToStr(vals.date);  
            agr.usePeriod = typeof vals.usePeriod == 'number' ? vals.usePeriod : Number.parseInt(vals.usePeriod);

            this._main.SaveAgreement(agr,(res) => {
                this._main.Navigate(['/full', 'vehicle']);
                // this._main.Navigate("ndrivers");
            },
            (err) => {
            })
        }

    }

    get date()
    {
        return this.Form.get('date');
    }
  
}