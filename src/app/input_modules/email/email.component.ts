import { Component, OnInit, HostListener, ViewChild, Input, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleModel, AgreementModel } from 'src/app/core/models/agreement.model';
import { MainService } from 'src/app/core/services/main.service';

@Component({
    selector: 'app-email-form-cmp',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
  })

  export class EmailFormComponent implements OnInit 
  {
    Form: FormGroup = new FormGroup({
        "email": new FormControl('', [
            Validators.required,
            Validators.email
        ])
    });

    constructor(private _main: MainService)
    {
    }
    ngOnInit(): void {
        this.InitData();
    }

    InitData()
    {
        const agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        
        this.Form.patchValue(agr);
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
        return this.Form.getRawValue();

    }
  }
  