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

    Form: FormGroup = new FormGroup({
        "date": new FormControl('',[
          Validators.required
        ]),
        "usePeriod": new FormControl(12, [
            Validators.required
        ])
    });

    DisableBefore = "";

    DisabledDays = [];

    constructor(private _main: MainService)
    {
        const data = this._main.Copy(this._main.Agreement) as AgreementModel;

        if(data.usePeriod)
            this.Form.get('usePeriod').patchValue(data.usePeriod);

        this.DisableBefore = this.DisableDate();
        this.DisabledDays = this.DisabledDates();
        // this.datepicker.openSelector(1);
    }
    ngOnInit(): void {
        
    }

    DisabledDates()
    {
        const date = new Date();

        const n = 4;
        let result = [];

        for(let i = 0; i < n; ++i)
        {
            const nDate = new Date(date.getTime() + i*1000*60*60*24);

            const year =  nDate.getFullYear();
            const month = ((nDate.getMonth() + 1) < 10 ?  "0" : "") +  (nDate.getMonth() + 1);
            const day = ((nDate.getDate()) < 10 ?  "0" : "") +  (nDate.getDate());

            result.push([year,month,day].join("-"));
        }

        return result;
    }

    DisableDate()
    {
        const date = new Date();

        // const newDate = new Date(date.getTime() + 1000*60*60*24*3);

        const year =  date.getFullYear();
        const month = ((date.getMonth() + 1) < 10 ?  "0" : "") +  (date.getMonth() + 1);
        const day = ((date.getDate()) < 10 ?  "0" : "") +  (date.getDate());

        return [year,month,day].join("-");
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
            agr.date = vals.date;  
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