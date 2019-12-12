import { Component, ViewChild, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { AgreementModel } from '../core/models/agreement.model';
import { SimpleCarComponent } from '../input_modules/car/simple/simple.component';
import { FullCarComponent } from '../input_modules/car/full/full.component';


@Component({
  selector: 'app-vehicle-cmp',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit{
    
    BottomOpened = true;
    TopOpened = false;

    @ViewChild('simple', {static: false}) simple: SimpleCarComponent;
    @ViewChild('full', {static: false}) full: FullCarComponent;
    constructor(private _main: MainService)
    {
    }
    ngOnInit(): void 
    {

    }


    Save()
    {
        const simple = this.simple.GetData();
        const full = this.full.GetData();
        if(!simple || !full)
        {
            return;
        }
        const data = {...simple, ...full};

        let agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        for(const i in data)
        {
            agr.vehicle[i] = data[i];
        }
        // this._main.Navigate(['/full', 'drivers']);
        // if(this.Form.valid)
        // {
        //     const vals = this.Form.getRawValue();
        //     let agr = this._main.Copy(this._main.Agreement) as AgreementModel;
        //     agr.date = vals.date.date.year + "-" + vals.date.date.month + "-" + vals.date.date.day;  

            this._main.SaveAgreement(agr,(res) => {
                this._main.Navigate(['/full', 'drivers']);
                // this._main.Navigate("ndrivers");
            },
            (err) => {
            })
        // }
    }
  
}