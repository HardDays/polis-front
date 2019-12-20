import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { NgAutoCompleteComponent, CreateNewAutocompleteGroup, SelectedAutocompleteItem } from 'ng-auto-complete';
import { VehicleModel, AgreementModel } from 'src/app/core/models/agreement.model';
import { MainService } from 'src/app/core/services/main.service';
import { IMyDpOptions } from 'mydatepicker';
import { conformToMask } from 'text-mask-core';

@Component({
    selector: 'app-full-car-cmp',
    templateUrl: './full.component.html',
    styleUrls: ['./../car.module.css']
  })
  export class FullCarComponent implements OnInit 
  {
    @Input() Car: VehicleModel
    ModelsDics = [];

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
        // disableUntil: this.DisableUntil(),
        disableSince: this.DisableFrom(),
        // maxYear: this.GetMaxYear(),
        showClearDateBtn: false,
        height: '37px',
        inline: false,
        openSelectorOnInputClick: true,
        editableDateField: true,
        indicateInvalidDate: false
    };

    DocMask = [
        /[УКЕНХВАРОСМТукенхваросмт0-9]/,
        /[УКЕНХВАРОСМТукенхваросмт0-9]/,
        ' ',
        /[УКЕНХВАРОСМТукенхваросмт0-9]/,
        /[УКЕНХВАРОСМТукенхваросмт0-9]/,
        ' ',
        /\d/, /\d/, /\d/, /\d/, /\d/, /\d/
    ];
    DocReg = /^[а-яА-Я0-9]{2}\s[а-яА-Я0-9]{2}\s\d{6}$/;

    Form: FormGroup = new FormGroup({
        "num_type": new FormControl('', [
            Validators.required
        ]),
        "number": new FormControl('',[
            Validators.required
        ]),
        "docType": new FormControl('',[
            Validators.required
        ]),
        "doc_number": new FormControl('', [
            Validators.required,
            Validators.pattern(this.DocReg)
        ]),
        "docDate": new FormControl('', [
            Validators.required
        ])
    });

    get docType()
    {
        return this.Form.get('docType');
    }

    constructor(private _main: MainService)
    {
        
    }
    ngOnInit(): void {
        console.log(this.Car);
        if(this.Car)
        {
            let data = {
                num_type: "vin",
                number: "",
                docType: 0,
                doc_number: "",
                docDate: {}
            };
    
            // const agr = this._main.Copy(this._main.Agreement) as AgreementModel;
    
            if(this.Car.vin)
            {
                data.num_type = "vin";
                data.number = this.Car.vin;
            }
            else if(this.Car.bodyNum)
            {
                data.num_type = "bodyNum";
                data.number = this.Car.bodyNum;
            }
            else if(this.Car.chassisNum)
            {
                data.num_type = "chassisNum";
                data.number = this.Car.chassisNum;
            }
    
            if(this.Car.docType !== null)
            {
                data.docType = this.Car.docType;
            }
    
            if(this.Car.docNumber || this.Car.docSerial)
            {
                data.doc_number = conformToMask(this.Car.docSerial + this.Car.docNumber, this.DocMask, {fuide: false}).conformedValue;
            }
    
            if(this.Car.docDate)
            {
                data.docDate = this.ParseDate(this.Car.docDate);
            }
    
            this.Form.patchValue(data);
        }
    }
    DisableUntil()
    {
        const date = new Date();

        return {
            year: date.getFullYear() - 5,
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }

    DisableFrom()
    {
        const date = new Date();

        const newdate = new Date(date.getTime() + 1000*60*60*24);

        return {
            year: newdate.getFullYear(),
            month: newdate.getMonth()+1,
            day: newdate.getDate()
        }
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

        const result = {} as any;
        const data = this.Form.getRawValue();
        result[data.num_type] = data.number;
        result.docType = data.docType;
        
        if(result.docType == 2)
        {
            result.docNumber = this._main.ReplaceAll(data.doc_number, " ", "");
            result.docSerial = null;
        }
        else{
            const splitData = data.doc_number.split(" ");
            result.docSerial = splitData[0] + splitData[1];
            result.docNumber = splitData[2];
        }
        

        result.docDate = this.ParseDateObjToStr(data.docDate);

        // console.log(result);
        // return false;
        return result;

    }

    ParseDate(_date)
    {
        let date = new Date(_date);
        return {
            date:{
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            }
        }
    }

    ParseDateObjToStr(obj)
    {
        return obj.date.year + "-" + obj.date.month + "-" + obj.date.day;
    }


    
  
  }
  