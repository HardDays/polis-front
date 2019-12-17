import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel } from '../core/models/agreement.model';
import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'app-own-cmp',
    templateUrl: './own.component.html',
    styleUrls: ['./own.component.css']
  })
  export class OwnComponent implements OnInit {

    CityDics = [];
    IsError = false;
    phoneMask = ['(', /\d/,/\d/,/\d/,')', ' ', /\d/, /\d/, /\d/,'-',/\d/,/\d/,'-',/\d/,/\d/];

    IsOwner = 1;

    expMask = (rawValue) => 
    {
        let data = this.Form.get('birthday').value;

        if(!data)
            return [/[1-8]/,/\d/];

        const age = this._main.GetAge(data.date.year + "-" + data.date.month + "-" + data.date.day);

        const diff = age - 18;
        if(diff == 0)
        {
            return [/[0]/];
        }
        else if (diff < 10)
        {
            return [new RegExp("[0-" + diff + "]" )];
        }
        else {
            let mask = [/[0-9]/];

            if(rawValue[0] && rawValue[0] != "0")
            {
                mask.push(/\d/);
            }
        }
        return [/[1-8]/,/\d/];
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
        disableSince: this.DisableSince(),
        maxYear: this.GetMaxYear(),
        showClearDateBtn: false,
        height: '38px',
        inline: false,
        openSelectorOnInputClick: true,
        editableDateField: true,
        indicateInvalidDate: false
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
          this.ValidateExp()
        ]),
        "phone": new FormControl('',[
          Validators.required,
          Validators.pattern(/^\(\d\d\d\)\s\d\d\d\-\d\d\-\d\d$/)
        ]),
        "check": new FormControl('', [
            Validators.required
        ])
    });


    get exp()
    {
        return this.Form.get('exp');
    }
    SelectedKladr = {} as any;

    
    constructor(private _main: MainService)
    {
        const data = this._main.Copy(this._main.Agreement) as AgreementModel;

        this.IsOwner = data.insurerIsOwner;

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
            this.Form.get("phone").setValue(data.phone.replace(data.phone.slice(0,3), ""));
            // this.Form.get('phone').setValue(data.phone);
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
                        this.Form.get('city').setValue(res[0].value)
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
        for(const i in this.Form.controls)
        {
            this.Form.get(i).markAsDirty();
            this.Form.get(i).markAsTouched();
            this.Form.get(i).updateValueAndValidity();
        }
        this.Form.updateValueAndValidity();
        if(!this.Form.valid || !this.Form.get('check').value)
        {
            this.IsError = true;
            return;
        }
            
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
                item.exp = Number.parseInt(this._main.ReplaceAll(data.exp,'\u2000', ""));
            }

            agr.drivers[0].birthdate = data.birthday.date.year + "-" + data.birthday.date.month + "-" + data.birthday.date.day;
            agr.drivers[0].firstname = fname;
            agr.drivers[0].lastname = lname;
            agr.drivers[0].middlename = mname;
        }

        if(this.IsOwner)
        {
            agr.owner.firstname = fname;
            agr.owner.lastname = lname;
            agr.owner.middlename = mname;
            agr.owner.birthdate = data.birthday.date.year + "-" + data.birthday.date.month + "-" + data.birthday.date.day;
        }
        else{
            agr.insurer.firstname = fname;
            agr.insurer.lastname = lname;
            agr.insurer.middlename = mname;
            agr.insurer.birthdate = data.birthday.date.year + "-" + data.birthday.date.month + "-" + data.birthday.date.day;
        }

        
        agr.owner.city = this.SelectedKladr.data.kladr_id;

        agr.name = data.fio;
        agr.phone = "+7 " + data.phone;


        this._main.SaveAgreement(agr,(res) => {
            this._main.Navigate(["/prev", "confirm"]);
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

    DisableSince()
    {
        let date = new Date();

        return {
            year: date.getFullYear() - 18,
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }

    GetMaxYear()
    {
        const data = this.DisableSince();

        return data.year;
    }

    onCalendarToggle(event: number): void {
        if(!this.Form.controls.birthday.value && event == 1)
        {
            let obj = this.DisableSince();
            obj.day -= 1;
            this.Form.get('birthday').setValue({
                date: obj
            })
        }
    }

    ValidateExp()
    {
        return (control: AbstractControl): {[key: string]: any} | null => {
            if(this.Form && this.Form.controls)
            {
                let data = this.Form.get('birthday').value;

                if(!data)
                    return null;


                const age = this._main.GetAge(data.date.year + "-" + data.date.month + "-" + data.date.day);

                const diff = age - 18;

                const val = Number.parseInt(control.value);

                if(val > diff)
                {
                    return {'wrong': true};
                }

                console.log(diff, val);
                
            }
            return null;
          };
    }
  
  }
  