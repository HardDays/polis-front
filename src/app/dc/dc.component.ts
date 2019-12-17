import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel } from '../core/models/agreement.model';
import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'app-dc-cmp',
    templateUrl: './dc.component.html',
    styleUrls: ['./dc.component.css']
  })
  export class DcComponent implements OnInit {
    Index = 0;
    Form: FormGroup = new FormGroup({
        "dcDate": new FormControl('',[
          Validators.required,
          this.CheckDcDate()
        ]),
        "dc": new FormControl('',[
            Validators.required
        ])
    });

    CheckDcDate()
    {
        return (control: AbstractControl): {[key: string]: any} | null => {
            if(control.value)
            {
                const now = new Date(new Date().getTime() +  + 1000*60*60*24*3);
                const date = new Date(control.value.date.year, control.value.date.month-1, control.value.date.day);

                if(now.getTime() > date.getTime())
                {
                    return {'wrong': true};
                }
            }
            return null;
        };
    }

    get dcDate()
    {
        return this.Form.get('dcDate');
    }

    get dc()
    {
        return this.Form.get('dc');
    }


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
        inline: false,
        openSelectorOnInputClick: true,
        editableDateField: true,
        indicateInvalidDate: false
    };
    constructor(private _main: MainService)
    {
        const vehicle = this._main.Copy(this._main.Agreement.vehicle) as VehicleModel;

        this.dc.patchValue(vehicle.dc);
        if(vehicle.dcDate)
        {
            this.dcDate.patchValue(this.ParseStrToObj(vehicle.dcDate));
        }

        for(const i in this.Form.controls)
        {
            this.Form.get(i).markAsDirty();
            this.Form.get(i).markAsTouched();
            this.Form.get(i).updateValueAndValidity();
        }
        this.Form.updateValueAndValidity();
    }
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
        setInterval(() => {
            this.Index = this.Index < 3 ? this.Index + 1 : 0;
        }, 4000);
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

    ParseStrToObj(str: string)
    {
        const date = new Date(str);

        return {
            date: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            }
        }
    }

    Navigate()
    {
        for(const i in this.Form.controls)
        {
            this.Form.get(i).markAsDirty();
            this.Form.get(i).markAsTouched();
            this.Form.get(i).updateValueAndValidity();
        }
        this.Form.updateValueAndValidity();

        if(this.Form.invalid){
            return;
        }

        const agr = this._main.Copy(this._main.Agreement)as AgreementModel;

        const data = this.Form.getRawValue();

        agr.vehicle.dc = data.dc;
        agr.vehicle.dcDate = this.ParseDateObjToStr(data.dcDate);


        this._main.SaveAgreement(agr,
            (res) => {
              this._main.Navigate(['/offers']);
            },
            (err) => {
            })
      
    }
    ParseDateObjToStr(obj)
    {
        return obj.date.year + "-" + obj.date.month + "-" + obj.date.day;
    }

  }
  