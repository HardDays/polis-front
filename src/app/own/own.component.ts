import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel } from '../core/models/agreement.model';
import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'app-own-cmp',
    templateUrl: './own.component.html'
  })
  export class OwnComponent implements OnInit {

    CityDics = [];

    phoneMask = ['+', '7',' ', '(', /\d/,/\d/,/\d/,')', ' ', /\d/, /\d/, /\d/,'-',/\d/,/\d/,'-',/\d/,/\d/];
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
        // disableUntil: this.GetDisableUntilData(new Date()),
        showClearDateBtn: false,
        height: '41px',
        openSelectorOnInputClick: true
    };

    Form: FormGroup = new FormGroup({
        "fio": new FormControl('',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]),
        "birthday": new FormControl('',[
          Validators.required
        ]),
        "city": new FormControl('',[
          Validators.required
        ]),
        "exp": new FormControl('',[
          Validators.required,
          Validators.min(0),
          Validators.max(90)
        ]),
        "phone": new FormControl('',[
          Validators.required,
          Validators.pattern(/^\+(7)\s\(\d\d\d\)\s\d\d\d\-\d\d\-\d\d$/)
        ])
    });

    SelectedKladr = {} as any;

    
    constructor(private _main: MainService)
    {
        const data = this._main.Copy(this._main.Agreement) as AgreementModel;
        if(data.name)
            this.Form.get("fio").setValue(data.name);

        if(data.owner && data.owner.birthdate)
        {
            const date = data.owner.birthdate.split("-");
            this.Form.get('birthday').setValue({
                date: {
                    year: Number.parseInt(date[0]),
                    month: Number.parseInt(date[1]),
                    day: Number.parseInt(date[2])
                }
            })
        }
        
        if(data.phone)
        {
            this.Form.get('phone').setValue(data.phone);
        }
        
        if(!data.multidrive && data.drivers.length > 0)
        {
            this.Form.get('exp').setValue(data.drivers[0].exp);
        }

        if(data.owner && data.owner.city)
        {
            this._main.GetAddrByKladr(data.owner.city, (res) => {
                if(res)
                {
                    if(res instanceof Array && res.length > 0)
                    {
                        this.SelectedKladr = res[0];
                    }
                }
                
            },
            (err) => {
            })
        }
        
    }
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    UpdateDics($event, callback?:() => void)
    {
        this._main.KladrDics($event, (res) => {
            this.CityDics = res;
            if(callback && typeof callback == "function")
            {
                callback();
            }
        },
        (err) => {
            if(callback && typeof callback == "function")
            {
                callback();
            }
        })
    }

    selectEvent($event)
    {
        this.SelectedKladr = $event;
    }

    Save()
    {
        const data = this.Form.getRawValue();
        const agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        const split = data.fio.split(" ");

        const lname = split[0];
        const fname = split[1];
        const mname = split.length > 2 ? split[2] : "";

        if(!agr.multidrive)
        {
            for(const item of agr.drivers)
            {
                item.exp = data.exp;
            }

            agr.drivers[0].birthdate = data.birthday.date.year + "-" + data.birthday.date.month + "-" + data.birthday.date.day;
            agr.drivers[0].firstname = fname;
            agr.drivers[0].lastname = lname;
            agr.drivers[0].middlename = mname;
        }

        agr.owner.firstname = fname;
        agr.owner.lastname = lname;
        agr.owner.middlename = mname;
        agr.owner.birthdate = data.birthday.date.year + "-" + data.birthday.date.month + "-" + data.birthday.date.day;
        agr.owner.city = this.SelectedKladr.data.kladr_id;

        agr.name = data.fio;
        agr.phone = data.phone;


        this._main.SaveAgreement(agr,(res) => {
            this._main.Navigate("confirm");
            // this._main.Navigate("ndrivers");
        },
        (err) => {
        })
    }

    GetDisableUntilData(date: Date)
    {
        const new_date = new Date(date.getTime() + (1000 * 60 * 60 * 24 * 4));
        const str = new_date.toISOString();

        const arr = str.split("T")[0].split("-");

        return {
            year: Number.parseInt(arr[0]),
            month: Number.parseInt(arr[1]),
            day: Number.parseInt(arr[2])
        };
    }
  
  }
  