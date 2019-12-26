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

    ErrorStr = [];

    expMask = (rawValue) => 
    {
        let data = this.Form.get('birthday').value;

        if(!data)
            return [/[1-8]/,/\d/];

        const age = this._main.GetAge(data.date);

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

    CalendarDisableFrom = this.DisableSince();
    CalendarDisableBefore = this.DisableBefore();

    // myDatePickerOptions: IMyDpOptions = {
    //     // other options...
    //     dateFormat: 'dd.mm.yyyy',
    //     dayLabels: {
    //         su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'
    //     },
    //     monthLabels:{
    //         1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек'
    //     },
    //     showTodayBtn: false,
    //     disableSince: this.DisableSince(),
    //     maxYear: this.GetMaxYear(),
    //     showClearDateBtn: false,
    //     height: '38px',
    //     inline: false,
    //     openSelectorOnInputClick: true,
    //     editableDateField: true,
    //     indicateInvalidDate: false
    // };

    ErrorNames = {
        fio: "ФИО",
        birthday: "Дата рождения",
        city: "Город регистрации" + (this._main.Agreement.insurerIsOwner ? "" : " собственника"),
        exp: "Стаж вождения",
        phone: "Телефон",
        check: "Условия передачи информации и страхования"
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

    FioOptions: any[] = [];

    Fio = {
        value: "",
        unrestricted_value: "",
        data: {
            surname: "",
            name: "",
            patronymic: "",
            gender: "",
            source: null,
            qc: 0
        }
    } as any;
    
    constructor(private _main: MainService)
    {
        const data = this._main.Copy(this._main.Agreement) as AgreementModel;

        this.IsOwner = data.insurerIsOwner;

        if(data.name)
        {
            this.Form.get("fio").setValue(data.name);
            this._main.GetFio(data.name, (res)=>{
                if(res && res.length > 0)
                {
                    this.Fio = res[0];
                    // console.log(this.Fio);
                    //Галавиев Ильфат Ринатович
                }
            })
        }
            

        if(data.owner && data.owner.birthdate)
        {
            this.Form.get('birthday').setValue(data.owner.birthdate);
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

    UpdateKladrDics($event, callback?:() => void)
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

    selectKladrEvent($event)
    {
        this.SelectedKladr = $event;
    }

    unselectKladrEvent()
    {
        this.SelectedKladr = {} as any;
    }

    Save()
    {
        console.log(this.Form.getRawValue());
        this.ErrorStr = [];
        for(const i in this.Form.controls)
        {
            this.Form.get(i).markAsDirty();
            this.Form.get(i).markAsTouched();
            this.Form.get(i).updateValueAndValidity();
        }
        if(!this.Fio || !this.Fio.data.name || !this.Fio.data.surname)
        {
            this.Form.get('fio').setErrors({'wrong': true});
        }
        this.Form.updateValueAndValidity();

        if(!this.Form.valid || !this.Form.get('check').value)
        {
            for(const i in this.Form.controls)
            {
                if(this.Form.get(i).invalid)
                    this.ErrorStr.push(this.ErrorNames[i]);
            }
            this.IsError = true;
            return;
        }
            
        const data = this.Form.getRawValue();
        const agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        // result.firstname = this.Fio.data.name;
        // result.lastname = this.Fio.data.surname;
        // result.middlename = this.Fio.data.patronymic;
        // const split = data.fio.split(" ");

        const lname = this.Fio.data.surname;
        const fname = this.Fio.data.name;
        const mname = this.Fio.data.patronymic;

        if(!agr.multidrive)
        {
            for(const item of agr.drivers)
            {
                item.exp = Number.parseInt(this._main.ReplaceAll(data.exp,'\u2000', ""));
            }

            agr.drivers[0].birthdate = data.birthday;
            agr.drivers[0].firstname = fname;
            agr.drivers[0].lastname = lname;
            agr.drivers[0].middlename = mname;
        }

        if(this.IsOwner)
        {
            agr.owner.firstname = fname;
            agr.owner.lastname = lname;
            agr.owner.middlename = mname;
            agr.owner.birthdate = data.birthday;
        }
        else{
            agr.insurer.firstname = fname;
            agr.insurer.lastname = lname;
            agr.insurer.middlename = mname;
            agr.insurer.birthdate = data.birthday;
        }

        
        agr.owner.city = this.SelectedKladr.data.kladr_id;

        agr.name = this.Fio.value;
        agr.phone = "+7 " + data.phone;


        this._main.SaveAgreement(agr,(res) => {
            console.log(res);
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

        const year = date.getFullYear() - 18;
        const month = ((date.getMonth() + 1) < 10 ?  "0" : "") +  (date.getMonth() + 1);
        const day = date.getDate();

        return [year,month,day].join("-");
    }

    DisableBefore()
    {
        let date = new Date();

        const year =  date.getFullYear();
        const month = ((date.getMonth() + 1) < 10 ?  "0" : "") +  (date.getMonth() + 1);
        const day = ((date.getDate()) < 10 ?  "0" : "") +  (date.getDate());

        return [year,month,day].join("-");
    }

    // GetMaxYear()
    // {
    //     const data = this.DisableSince();

    //     return data.year;
    // }

    // onCalendarToggle(event: number): void {
    //     if(!this.Form.controls.birthday.value && event == 1)
    //     {
    //         let obj = this.DisableSince();
    //         obj.day -= 1;
    //         this.Form.get('birthday').setValue({
    //             date: obj
    //         })
    //     }
    // }

    ValidateExp()
    {
        return (control: AbstractControl): {[key: string]: any} | null => {
            if(this.Form && this.Form.controls)
            {
                let data = this.Form.get('birthday').value;

                if(!data)
                    return null;


                const age = this._main.GetAge(data);

                const diff = age - 18;

                const val = Number.parseInt(control.value);

                if(val > diff)
                {
                    return {'wrong': true};
                }
                
            }
            return null;
          };
    }

    RegionInputCleared()
    {
        this.SelectedKladr = {} as any;
    }
  
    UpdateFioDics($event)
    {
        // const kladr = this._main.Agreement.owner.city;
        this._main.GetFio($event,
            (res) => {
                this.FioOptions = res;
            },
            (err) => {

            })
    }

    selectFioEvent($event)
    {
        this.Fio = $event;
        console.log(this.Fio);
    }

    unselectFioEvent()
    {
        this.Fio = null as any;
    }
  }
  