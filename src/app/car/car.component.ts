import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel } from '../core/models/agreement.model';

@Component({
    selector: 'app-car-cmp',
    templateUrl: './car.component.html'
  })
  export class CarComponent implements OnInit {

    ModelsDics = [];
    Data = {
        model: {
            model: "",
            brand: "",
            full_title: ""
        },
        year: null,
        power: null
    };
    Car = new VehicleModel();
    constructor(private _main: MainService)
    {
        this.Car = this._main.Copy(this._main.Agreement.vehicle);
        if(this.Car)
        {
            this.Data.power = this.Car.power ? this.Car.power : null;
            this.Data.year = this.Car.year ? this.Car.year : null;

            if(this.Car.brand && this.Car.model)
            {
                const full_title = this.Car.brand + " " + this.Car.model
                this.UpdateDics(full_title,
                () => {
                    const index = this.ModelsDics.findIndex(obj => obj.full_title == full_title);
                    if(index >= 0)
                    {
                        this.Data.model = this.ModelsDics[index];
                        console.log(this.Data);
                    }
                });
            }
        }
        
        
        // console.log(car);
    }
    ngOnInit(): void {
        console.log('car');
        // throw new Error("Method not implemented.");
    }

    UpdateDics($event, callback?:() => void)
    {
        console.log($event);
        this._main.CarDics($event, (res) => {
            this.ModelsDics = res;
            if(callback && typeof callback == "function")
            {
                callback();
            }
        },
        (err) => {
            console.log(err);
            if(callback && typeof callback == "function")
            {
                callback();
            }
        })
    }

    selectEvent($event)
    {
        this.Data.model = $event;
        // console.log(this.service.AggreementModel);
    }

    SaveCar()
    {
        const agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        agr.vehicle.model = this.Data.model.model;
        agr.vehicle.brand = this.Data.model.brand;
        agr.vehicle.power = this.Data.power;
        agr.vehicle.year = this.Data.year;

        this._main.SaveAgreement(agr,(res) => {
            this._main.Navigate("ndrivers");
        },
        (err) => {
            console.log(err);
        })
    }
  
  }
  