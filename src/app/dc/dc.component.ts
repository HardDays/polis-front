import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel } from '../core/models/agreement.model';
import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'app-dc-cmp',
    templateUrl: './dc.component.html',
    styleUrls: ['./dc.component.css']
  })
  export class DcComponent implements OnInit {
    Index = 0;
    Form: FormGroup = new FormGroup({
        "dcDate": new FormControl('',[
          Validators.required,
          this.CheckDcDate()
        ]),
        "dc": new FormControl('',[
            Validators.required
        ])
    });

    Before = "";
    After = "";

    CheckDcDate()
    {
        return (control: AbstractControl): {[key: string]: any} | null => {
            if(control.value)
            {
                const now = new Date(new Date().getTime() +  + 1000*60*60*24*3);
                const date = new Date(control.value);

                if(now.getTime() > date.getTime())
                {
                    return {'wrong': true};
                }
            }
            return null;
        };
    }

    get dcDate()
    {
        return this.Form.get('dcDate');
    }

    get dc()
    {
        return this.Form.get('dc');
    }


    constructor(private _main: MainService)
    {
        const vehicle = this._main.Copy(this._main.Agreement.vehicle) as VehicleModel;

        this.dc.patchValue(vehicle.dc);
        if(vehicle.dcDate)
        {
            this.dcDate.setValue(vehicle.dcDate);
        }

        for(const i in this.Form.controls)
        {
            this.Form.get(i).markAsDirty();
            this.Form.get(i).markAsTouched();
            this.Form.get(i).updateValueAndValidity();
        }
        this.Form.updateValueAndValidity();

        this.Before = this.DisableBefore();
        // this.After = this.DisableFrom();
    }
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
        setInterval(() => {
            this.Index = this.Index < 4 ? this.Index + 1 : 0;
        }, 4000);
    }

    DisableBefore()
    {
        const date = new Date();

        const newDate = new Date(date.getTime() + 1000*60*60*24*3);

        const year =  newDate.getFullYear();
        const month = ((newDate.getMonth() + 1) < 10 ?  "0" : "") +  (newDate.getMonth() + 1);
        const day = ((newDate.getDate()) < 10 ?  "0" : "") +  (newDate.getDate());

        return [year,month,day].join("-");
    }


    Navigate()
    {
        for(const i in this.Form.controls)
        {
            this.Form.get(i).markAsDirty();
            this.Form.get(i).markAsTouched();
            this.Form.get(i).updateValueAndValidity();
        }
        this.Form.updateValueAndValidity();

        if(this.Form.invalid){
            return;
        }

        const agr = this._main.Copy(this._main.Agreement)as AgreementModel;

        const data = this.Form.getRawValue();

        agr.vehicle.dc = data.dc;
        agr.vehicle.dcDate = data.dcDate;


        this._main.SaveAgreement(agr,
            (res) => {
              this._main.Navigate(['/offers']);
            },
            (err) => {
            })
      
    }
  }
  