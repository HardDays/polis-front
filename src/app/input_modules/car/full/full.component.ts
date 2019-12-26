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

    Before = "";
    After = "";

    get docType()
    {
        return this.Form.get('docType');
    }

    constructor(private _main: MainService)
    {
        this.Before = this.DisableBefore();
        this.After = this.DisableFrom();
    }

    ngOnInit(): void {
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
                data.docDate = this.Car.docDate;
            }
    
            this.Form.patchValue(data);
        }
    }
    DisableBefore()
    {
        let date = new Date();

        if(this._main.Agreement.vehicle.year)
        {
            date.setFullYear(this._main.Agreement.vehicle.year);
            
        }
        else{
            date.setFullYear(date.getFullYear() - 100);
        }
        date.setMonth(0);
        date.setDate(1);
        date = new Date(date.getTime() - 1000*60*60*24);
        const year =  date.getFullYear();
        const month = ((date.getMonth() + 1) < 10 ?  "0" : "") +  (date.getMonth() + 1);
        const day = ((date.getDate()) < 10 ?  "0" : "") +  (date.getDate());

        console.log([year,month,day].join("-"));
        return [year,month,day].join("-");
    }

    DisableFrom()
    {
        const date = new Date();

        const newdate = new Date(date.getTime() + 1000*60*60*24);

        const year = newdate.getFullYear();
        const month = ((newdate.getMonth() + 1) < 10 ?  "0" : "") +  (newdate.getMonth() + 1);
        const day = newdate.getDate();

        return [year,month,day].join("-");
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
        

        result.docDate = data.docDate;

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
  