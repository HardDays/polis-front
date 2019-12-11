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

@Component({
    selector: 'app-owner-form-cmp',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.css']
  })
  export class OwnerFormComponent implements OnInit 
  {
    Addr = null as any;

    AddOptions: any[] = [];
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
        indicateInvalidDate: true
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
        indicateInvalidDate: true
    };

    Form: FormGroup = new FormGroup({
        "name": new FormControl('', [
            Validators.required
        ]),
        "birthdate": new FormControl('',[
            Validators.required
        ]),
        "number": new FormControl('', [
            Validators.required
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

        console.log(this._main.Agreement);
        this.InitData();
    }

    InitData()
    {
        let data = {} as any;

        const agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        if(agr.owner.firstname || agr.owner.lastname)
        {
            let arr = [];
            if(agr.owner.lastname)
                arr.push(agr.owner.lastname);

            if(agr.owner.firstname)
                arr.push(agr.owner.firstname);

            if(agr.owner.middlename)
                arr.push(agr.owner.middlename);


            data.name = arr.join(" ");
        }

        if(agr.owner.passportSerial  || agr.owner.passportNumber )
        {
            data.number = agr.owner.passportSerial + agr.owner.passportNumber;
        }

        if(agr.owner.passportDate)
        {
            data.passportDate = this.ParseStrToObj(agr.owner.passportDate);
        }

        if(agr.owner.birthdate)
        {
            data.birthdate = this.ParseStrToObj(agr.owner.birthdate);
        }

        if(agr.owner.fullAddress)
        {
            data.address = agr.owner.fullAddress;
        }

        this.Form.patchValue(data);
    }


    GetData()
    {
        for(const i in this.Form.controls)
        {
            this.Form.get(i).markAsDirty();
            this.Form.get(i).markAsTouched();
            this.Form.get(i).updateValueAndValidity();
        }
        this.Form.updateValueAndValidity();

        console.log(this.Form);
        if(this.Form.invalid)
        {
            return false;
        }
        let result = this._main.Copy(this._main.Agreement.owner) as OwnerModel

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

        result.passportSerial  = data.number.substr(0,4);
        result.passportNumber = data.number.replace(result.passportSerial, "");

        return result;

    }

    ParseDateObjToStr(obj)
    {
        return obj.date.year + "-" + obj.date.month + "-" + obj.date.day;
    }

    ParseStrToObj(str: string)
    {
        const split = str.split("-");

        return {
            date: {
                year: split[0],
                month: split[1],
                day: split[2]
            }
        }
    }

    UpdateDics($event)
    {
        const kladr = this._main.Agreement.owner.city;
        this._main.GetAddr($event, kladr, 
            (res) => {
                this.AddOptions = res;
                console.log(res);
            },
            (err) => {
                console.log(err);
            })
        // console.log($event);
    }

    selectEvent($event)
    {
        this.Addr = $event;
        console.log($event);
    }


    
  
  }
  