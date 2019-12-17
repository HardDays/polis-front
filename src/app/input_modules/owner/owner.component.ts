import { Component, OnInit, HostListener, ViewChild, Input, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { NgAutoCompleteComponent, CreateNewAutocompleteGroup, SelectedAutocompleteItem } from 'ng-auto-complete';
import { VehicleModel, AgreementModel } from 'src/app/core/models/agreement.model';
import { MainService } from 'src/app/core/services/main.service';
import { DriverModel, OwnerModel } from '../../core/models/agreement.model';
import { IMyDpOptions } from 'mydatepicker';
import { conformToMask } from 'text-mask-core';

@Component({
    selector: 'app-owner-form-cmp',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.css']
  })
  export class OwnerFormComponent implements OnInit 
  {

    @Input() Data: OwnerModel;
    Addr = null as any;

    AddOptions: any[] = [];

    DocMask = [
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        ' ',
        /\d/, /\d/, /\d/, /\d/, /\d/, /\d/
    ];
    DocReg = /^\d{2}\s\d{2}\s\d{6}$/;

    BdayOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        dayLabels: {
            su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'
        },
        monthLabels:{
            1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек'
        },
        showTodayBtn: false,
        // disableUntil: this.DisableUntil(),
        disableSince: this.BdayDisable(),
        // maxYear: this.GetMaxYear(),
        showClearDateBtn: false,
        height: '37px',
        inline: false,
        openSelectorOnInputClick: true,
        editableDateField: true,
        indicateInvalidDate: false
    };

    GiveOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        dayLabels: {
            su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'
        },
        monthLabels:{
            1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек'
        },
        showTodayBtn: false,
        // disableUntil: this.DisableUntil(),
        disableSince: this.GiveDisable(),
        // maxYear: this.GetMaxYear(),
        showClearDateBtn: false,
        height: '37px',
        inline: false,
        openSelectorOnInputClick: true,
        editableDateField: true,
        indicateInvalidDate: false
    };

    Form: FormGroup = new FormGroup({
        "name": new FormControl('', [
            Validators.required
        ]),
        "birthdate": new FormControl('',[
            Validators.required
        ]),
        "number": new FormControl('', [
            Validators.required,
            Validators.pattern(this.DocReg)
        ]),
        "passportDate": new FormControl('',[
            Validators.required
        ]),
        "passportForeign": new FormControl(0,[
            Validators.required
        ]),
        "address": new FormControl('', [
            Validators.required
        ])
    });

    BdayDisable()
    {
        const date = new Date();

        return {
            year: date.getFullYear()-18,
            month: date.getMonth()+1,
            day: date.getDate()
        }
    }

    GiveDisable()
    {
        const date = new Date((new Date()).getTime() + 1000*60*60*24);

        return {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            day: date.getDate()
        }
    }



    PowerMask = function(rawValue)
    {
        return [/[1-9]/,/\d/,/\d/,/\d/];
    }
    constructor(private _main: MainService)
    {
    }
    ngOnInit(): void {

        this.InitData();
    }

    InitData()
    {
        let data = {} as any;

        if(this.Data.firstname || this.Data.lastname)
        {
            let arr = [];
            if(this.Data.lastname)
                arr.push(this.Data.lastname);

            if(this.Data.firstname)
                arr.push(this.Data.firstname);

            if(this.Data.middlename)
                arr.push(this.Data.middlename);


            data.name = arr.join(" ");
        }

        if(this.Data.passportSerial  || this.Data.passportNumber )
        {
            data.number = conformToMask(this.Data.passportSerial + this.Data.passportNumber, this.DocMask, {fuide: false}).conformedValue;
            // data.number = this.Data.passportSerial + this.Data.passportNumber;
        }

        if(this.Data.passportDate)
        {
            data.passportDate = this.ParseStrToObj(this.Data.passportDate);
        }

        if(this.Data.birthdate)
        {
            data.birthdate = this.ParseStrToObj(this.Data.birthdate);
        }

        if(this.Data.fullAddress)
        {
            data.address = this.Data.fullAddress;
        }

        this.Form.patchValue(data);
    }


    GetData()
    {
        // console.log(this.Form.getRawValue());
        // return false;
        for(const i in this.Form.controls)
        {
            this.Form.get(i).markAsDirty();
            this.Form.get(i).markAsTouched();
            this.Form.get(i).updateValueAndValidity();
        }
        this.Form.updateValueAndValidity();

        if(this.Form.invalid)
        {
            return false;
        }
        let result = this._main.Copy(this.Data) as OwnerModel

        if(this.Addr)
        {
            result.city = this.Addr.data.city_kladr_id;
            result.street = this.Addr.data.street_with_type ? this.Addr.data.street_with_type : this.Addr.data.street;
            result.house = this.Addr.data.house;
            result.apartment = this.Addr.data.flat ? this.Addr.data.flat : null;
            result.fullkladr = this.Addr.data.kladr_id ? this.Addr.data.kladr_id : 
                (this.Addr.data.house_kladr_id ? this.Addr.data.house_kladr_id : 
                    (this.Addr.data.fias_code ? this.Addr.data.fias_code : this.Addr.data.city_kladr_id)
                );
    
            result.zip = this.Addr.data.postal_code;
            result.fullAddress = this.Addr.unrestricted_value;
        }
        

        const data = this.Form.getRawValue();

        result.birthdate = this.ParseDateObjToStr(data.birthdate);
        result.passportDate = this.ParseDateObjToStr(data.passportDate);

        const split = data.name.split(" ");

        const lname = split[0];
        const fname = split[1];
        const mname = split.length > 2 ? split[2] : "";
        result.firstname = fname;
        result.lastname = lname;
        result.middlename = mname;

        const spl = data.number.split(" ");
        result.passportSerial  = spl[0] + spl[1];
        result.passportNumber = spl[2];

        return result;

    }

    ParseDateObjToStr(obj)
    {
        return obj.date.year + "-" + obj.date.month + "-" + obj.date.day;
    }

    ParseStrToObj(str: string)
    {
        let split = str.split("-");

        return {
            date: {
                year: Number.parseInt(split[0]),
                month: Number.parseInt(split[1]),
                day: Number.parseInt(split[2])
            }
        }
    }

    UpdateDics($event)
    {
        // const kladr = this._main.Agreement.owner.city;
        this._main.GetAddr($event, null, 
            (res) => {
                this.AddOptions = res;
            },
            (err) => {
            })
    }

    selectEvent($event)
    {
        this.Addr = $event;
    }


    
  
  }
  