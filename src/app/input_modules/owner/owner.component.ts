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
    BeforeBday = "";
    AfterBday = "";

    // BeforeBday = "";
    AfterGive = "";


    GiveDisable()
    {
        const date = new Date((new Date()).getTime());

        const year =  date.getFullYear();
        const month = ((date.getMonth() + 1) < 10 ?  "0" : "") +  (date.getMonth() + 1);
        const day = ((date.getDate()) < 10 ?  "0" : "") +  (date.getDate());

        return [year,month,day].join("-");
    }



    PowerMask = function(rawValue)
    {
        return [/[1-9]/,/\d/,/\d/,/\d/];
    }

    BdayBeforeDisable()
    {
        const date = new Date();

        const year =  date.getFullYear() - 90;
        const month = ((date.getMonth() + 1) < 10 ?  "0" : "") +  (date.getMonth() + 1);
        const day = ((date.getDate()) < 10 ?  "0" : "") +  (date.getDate());

        return [year,month,day].join("-");
    }

    BdayDisable()
    {
        const date = new Date();

        const year =  date.getFullYear() - 18;
        const month = ((date.getMonth() + 1) < 10 ?  "0" : "") +  (date.getMonth() + 1);
        const day = ((date.getDate()) < 10 ?  "0" : "") +  (date.getDate());

        return [year,month,day].join("-");
    }

    constructor(private _main: MainService)
    {
        this.AfterBday = this.BdayDisable();
        this.BeforeBday = this.BdayBeforeDisable();

        this.AfterGive = this.GiveDisable();
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

            this._main.GetFio(data.name, (res)=>{
                if(res && res.length > 0)
                {
                    this.Fio = res[0];
                }
            })
        }

        if(this.Data.passportSerial  || this.Data.passportNumber )
        {
            data.number = conformToMask(this.Data.passportSerial + this.Data.passportNumber, this.DocMask, {fuide: false}).conformedValue;
            // data.number = this.Data.passportSerial + this.Data.passportNumber;
        }

        if(this.Data.passportDate)
        {
            data.passportDate = this.Data.passportDate;
        }

        if(this.Data.birthdate)
        {
            data.birthdate = this.Data.birthdate;
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
        if(!this.Fio || !this.Fio.data.name || !this.Fio.data.surname)
        {
            this.Form.get('name').setErrors({'wrong': true});
        }
        this.Form.updateValueAndValidity();

        if(this.Form.invalid)
        {
            return false;
        }
        let result = this._main.Copy(this.Data) as OwnerModel

        if(this.Addr)
        {
            result.city = this.Addr.data.city_kladr_id ? this.Addr.data.city_kladr_id : 
                (this.Addr.data.settlement_kladr_id ? this.Addr.data.settlement_kladr_id : this.Addr.data.kladr_id);
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

        result.birthdate = data.birthdate;
        result.passportDate = data.passportDate;

        // const split = data.name.split(" ");

        // const lname = split[0];
        // const fname = split[1];
        // const mname = split.length > 2 ? split[2] : "";
        result.firstname = this.Fio.data.name;
        result.lastname = this.Fio.data.surname;
        result.middlename = this.Fio.data.patronymic;

        const spl = data.number.split(" ");
        result.passportSerial  = spl[0] + spl[1];
        result.passportNumber = spl[2];

        return result;

    }

    ParseDateObjToStr(obj)
    {
        return this._main.ParseDateObjToStr(obj);
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

    unselectEvent()
    {
        this.Addr = null as any;
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
  