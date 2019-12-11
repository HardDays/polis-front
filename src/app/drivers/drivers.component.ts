import { Component, ViewChild, OnInit, ViewChildren, QueryList } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { AgreementModel, DriverModel } from '../core/models/agreement.model';
import { SimpleCarComponent } from '../input_modules/car/simple/simple.component';

@Component({
  selector: 'app-drivers-cmp',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit{

    Drivers: DriverModel[] = [];
    @ViewChildren('drivers') drivers: QueryList<SimpleCarComponent>

    constructor(private _main: MainService)
    {
        this.Drivers = this._main.Copy(this._main.Agreement.drivers) as DriverModel[];
    }

    ngOnInit(): void {
    }

    DisableFrom()
    {
        const date = new Date();

        const newDate = new Date(date.getTime() + 1000*60*60*24*3);

        return {
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
            day: newDate.getDate()
        }
    }

    Save()
    {
        let agr = this._main.Copy(this._main.Agreement) as AgreementModel;
        let result = [];

        this.drivers.forEach(item => {
            result.push(item.GetData());
        });
        
        agr.drivers = result;
        this._main.SaveAgreement(agr,
            (res) => {
                console.log(agr, res);
                this._main.Navigate(['/sum']);
            },
            (err) => {}
        )
    }

    AddDriver()
    {
        this.Drivers.push(new DriverModel());
    }

    DeleteDriver(index)
    {
        this.Drivers.splice(index,1);
    }
}