import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel, DriverModel } from '../core/models/agreement.model';

@Component({
    selector: 'app-isowner-cmp',
    templateUrl: './isowner.component.html'
  })
  export class IsownerComponent implements OnInit {

    constructor(private _main: MainService)
    {
    }
    ngOnInit(): void {
    }

    IsOwner($event)
    {
        let agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        agr.insurerIsOwner = $event;

        this._main.SaveAgreement(agr,
            (res) => {
                this._main.Navigate(["/prev", "own"]);
            },  
            (err) => {
            })
    }
  
  }
  