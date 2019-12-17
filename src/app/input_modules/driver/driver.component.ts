import { Component, OnInit, HostListener, ViewChild, Input, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { NgAutoCompleteComponent, CreateNewAutocompleteGroup, SelectedAutocompleteItem } from 'ng-auto-complete';
import { VehicleModel, AgreementModel } from 'src/app/core/models/agreement.model';
import { MainService } from 'src/app/core/services/main.service';
import { DriverModel } from '../../core/models/agreement.model';
import { IMyDpOptions } from 'mydatepicker';
import { conformToMask } from 'text-mask-core';

@Component({
    selector: 'app-driver-form-cmp',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.module.css']
  })
  export class DriverFormComponent implements OnInit 
  {

    @Input() driver: DriverModel;
    @Input() index: number;

    @Output() onDelete = new EventEmitter<number>();

    IsOpened = false;

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

    ExpOptions: IMyDpOptions = {
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
        disableSince: this.ExpDisable(),
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
        "license": new FormControl('',[
            Validators.required,
            Validators.pattern(this.DocReg)
        ]),
        "expdate": new FormControl('',[
            Validators.required
        ])
    });

    get name()
    {
        return this.Form.get('name');
    }

    get license()
    {
        return this.Form.get('license');
    }

    get birthdate()
    {
        return this.Form.get('birthdate');
    }

    get expdate()
    {
        return this.Form.get('expdate');
    }

    BdayDisable()
    {
        const date = new Date();

        return {
            year: date.getFullYear()-18,
            month: date.getMonth()+1,
            day: date.getDate()
        }
    }

    ExpDisable()
    {
        const date = new Date();

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
        this.IsOpened = this.index == 0;

        this.InitData();
    }

    InitData()
    {
        let data = {} as any;

        if(this.driver.firstname || this.driver.lastname)
        {
            let arr = [];
            if(this.driver.lastname)
                arr.push(this.driver.lastname);

            if(this.driver.firstname)
                arr.push(this.driver.firstname);

            if(this.driver.middlename)
                arr.push(this.driver.middlename);


            data.name = arr.join(" ");
        }

        if(this.driver.licenseSerial || this.driver.licenseNumber)
        {
            data.license = conformToMask(this.driver.licenseSerial + this.driver.licenseNumber, this.DocMask, {fuide: false}).conformedValue;
        }

        if(this.driver.expdate)
        {
            data.expdate = this.ParseStrToObj(this.driver.expdate);
        }

        if(this.driver.birthdate)
        {
            data.birthdate = this.ParseStrToObj(this.driver.birthdate);
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

        if(this.Form.invalid)
        {
            return false;
        }
        
        let result = this._main.Copy(this.driver) as DriverModel;
        const data = this.Form.getRawValue();
        result.birthdate = this.ParseDateObjToStr(data.birthdate);
        result.expdate = this.ParseDateObjToStr(data.expdate);
        result.licenseDate = result.expdate;

        const split = data.name.split(" ");

        const lname = split[0];
        const fname = split[1];
        const mname = split.length > 2 ? split[2] : "";
        result.firstname = fname;
        result.lastname = lname;
        result.middlename = mname;

        const spl = data.license.split(" ");
        result.licenseSerial = spl[0] + spl[1];
        result.licenseNumber = spl[2];

        return result;

    }

    Delete()
    {
        this.onDelete.emit(this.index);
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

    Open()
    {
        this.IsOpened = true;
    }


    
  
  }
  