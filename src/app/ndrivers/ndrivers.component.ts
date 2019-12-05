import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel, DriverModel } from '../core/models/agreement.model';

@Component({
    selector: 'app-ndrivers-cmp',
    templateUrl: './ndrivers.component.html'
  })
  export class NdriversComponent implements OnInit {

    constructor(private _main: MainService)
    {
    }
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    SelectDriversNumber($event)
    {
        const agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        if($event == 0)
        {
            agr.multidrive = 1;
            agr.drivers = [];
        }
        else{
            agr.multidrive = 0;
            agr.drivers = [];
            for(let i=0; i<$event; i++)
            {
                agr.drivers.push(new DriverModel());
            }
        }

        this._main.SaveAgreement(agr,
            (res) => {
                this._main.Navigate(["/prev", "is_owner"]);
            },  
            (err) => {
            })
    }
  
  }
  