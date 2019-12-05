import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel } from '../core/models/agreement.model';
import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'app-confirm-cmp',
    templateUrl: './confirm.component.html'
  })
  export class ConfirmComponent implements OnInit {

    phoneMask = ['(', /\d/,/\d/,/\d/,')', ' ', /\d/, /\d/, /\d/,'-',/\d/,/\d/,'-',/\d/,/\d/];
    

    Form: FormGroup = new FormGroup({
        "phone": new FormControl('',[
          Validators.required,
          Validators.pattern(/^\(\d\d\d\)\s\d\d\d\-\d\d\-\d\d$/)
        ]),
        "code": new FormControl('',[
            Validators.required,
            Validators.pattern(/^\d\d\d\d$/)
        ])
    });


    constructor(private _main: MainService)
    {
        const data = this._main.Copy(this._main.Agreement) as AgreementModel;

        // console.log();
        this.Form.get("phone").setValue(data.phone.replace(data.phone.slice(0,3), ""));
    }
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    get code()
    {
        return this.Form.get("code");
    }

    Save()
    {
        for(const i in this.Form.controls)
        {
            this.Form.get(i).markAsDirty();
            this.Form.get(i).markAsTouched();
            if(this.Form.get(i).hasError('wrong'))
            {
                this.Form.get(i).setErrors({
                    wrong : null
                })
            }
            this.Form.get(i).updateValueAndValidity();
        }
        this.Form.updateValueAndValidity();

        if(this.Form.valid)
        {
            if(this.Form.controls.code.value !== '0000')
            {
                this.code.setErrors({
                    'wrong': true
                });
                this.Form.updateValueAndValidity();
                return;
            }
            const agr = this._main.Copy(this._main.Agreement) as AgreementModel;

            if(agr.phone != this.Form.controls.phone.value)
            {
                agr.phone = "+7 " + this.Form.controls.phone.value;
            }

            this._main.SaveAgreement(agr,(res) => {
                this._main.Navigate(['calc_lite']);
                // this._main.Navigate("ndrivers");
            },
            (err) => {
            })
        }
    }

    Resend(){
        for(const i in this.Form.controls)
        {
            this.Form.get(i).markAsDirty();
            this.Form.get(i).markAsTouched();
            if(this.Form.get(i).hasError('wrong'))
            {
                this.Form.get(i).setErrors({
                    wrong : null
                })
            }
            this.Form.get(i).updateValueAndValidity();
        }
        this.Form.updateValueAndValidity();
    }
  
  }
  