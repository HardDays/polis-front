import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { NgAutoCompleteComponent, CreateNewAutocompleteGroup, SelectedAutocompleteItem } from 'ng-auto-complete';
import { VehicleModel, AgreementModel } from 'src/app/core/models/agreement.model';
import { MainService } from 'src/app/core/services/main.service';
import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'app-full-car-cmp',
    templateUrl: './full.component.html',
    styleUrls: ['./../car.module.css']
  })
  export class FullCarComponent implements OnInit 
  {
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
        indicateInvalidDate: true
    };

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
            Validators.required
        ]),
        "docDate": new FormControl('', [
            Validators.required
        ])
    });

    constructor(private _main: MainService)
    {
        let data = {
            num_type: "vin",
            number: "",
            docType: 0,
            doc_number: "",
            docDate: {}
        };

        const agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        if(agr.vehicle.vin)
        {
            data.num_type = "vin";
            data.number = agr.vehicle.vin;
        }
        else if(agr.vehicle.bodyNum)
        {
            data.num_type = "bodyNum";
            data.number = agr.vehicle.bodyNum;
        }
        else if(agr.vehicle.chassisNum)
        {
            data.num_type = "chassisNum";
            data.number = agr.vehicle.chassisNum;
        }

        if(agr.vehicle.docType !== null)
        {
            data.docType = agr.vehicle.docType;
        }

        if(agr.vehicle.docNumber || agr.vehicle.docSerial)
        {
            data.doc_number = agr.vehicle.docSerial + agr.vehicle.docNumber;
        }

        if(agr.vehicle.docDate)
        {
            data.docDate = this.ParseDate(agr.vehicle.docDate);
        }
        console.log(data);

        this.Form.patchValue(data);


        
    }
    ngOnInit(): void {

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
        result.docSerial = data.doc_number.substr(0,4);
        result.docNumber = data.doc_number.replace(result.docSerial, "");

        result.docDate = this.ParseDateObjToStr(data.docDate);

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
  