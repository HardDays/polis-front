import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { NgAutoCompleteComponent, CreateNewAutocompleteGroup, SelectedAutocompleteItem } from 'ng-auto-complete';
import { VehicleModel, AgreementModel } from 'src/app/core/models/agreement.model';
import { MainService } from 'src/app/core/services/main.service';

@Component({
    selector: 'app-simple-car-cmp',
    templateUrl: './simple.component.html',
    styleUrls: ['./../car.module.css']
  })
  export class SimpleCarComponent implements OnInit 
  {
      @Input() Car: VehicleModel
    ModelsDics = [];
    Form: FormGroup = new FormGroup({
        "model": new FormControl('', [
            Validators.required
        ]),
        "year": new FormControl('',[
            Validators.required,
            Validators.min(1990),
            Validators.max(new Date().getFullYear())
        ]),
        "power": new FormControl('',[
            Validators.required,
            Validators.min(1),
            Validators.max(9999)
        ])
    });


    CarModel = {
        model: "",
        brand: "",
        full_title: ""
    };

    Data = {
        model: {
            model: "",
            brand: "",
            full_title: ""
        },
        year: null,
        power: null
    };

    YearMask = function(rawValue)
    {
        const date = new Date();
        const val = date.getFullYear() + '';
        let arr = [];
        arr.push(new RegExp("[1-"+ val[0]+"]"));

        let currValue = rawValue + '';

        if(currValue.length > 0 && currValue[0] == "2")
        {
            arr.push(new RegExp("[0-" + val[1] + "]" ));
        }
        else{
            arr.push(/[9]/);
        }

        for(let i=1; i < 3; ++i)
        {
            if(currValue.length > i && currValue[0] == "2")
            {
                arr.push(new RegExp("[0-" + val[i+1] + "]" ));
            }
            else{
                arr.push(/\d/);
            }
        }
        
        return arr;
    }

    PowerMask = function(rawValue)
    {
        return [/[1-9]/,/\d/,/\d/,/\d/];
    }
    constructor(private _main: MainService)
    {
        // this.Car = this._main.Copy(this._main.Agreement.vehicle);
        
        
    }
    ngOnInit(): void {
        if(this.Car)
        {
            const data = {
                power: this.Car.power ? this.Car.power : null,
                year: this.Car.year ? this.Car.year : null
            };
            this.Form.patchValue(data);

            if(this.Car.brand && this.Car.model)
            {
                const full_title = this.Car.brand + " " + this.Car.model
                this.UpdateDics(full_title,
                () => {
                    const index = this.ModelsDics.findIndex(obj => obj.full_title == full_title);
                    if(index >= 0)
                    {
                        this.CarModel = this.ModelsDics[index];
                        this.Form.get('model').patchValue(this.CarModel.full_title);
                        // this.Data.model = this.ModelsDics[index];
                    }
                });
            }
        }

        
    }


    UpdateDics($event, callback?:() => void)
    {
        this._main.CarDics($event, (res) => {
            this.ModelsDics = res;
            if(callback && typeof callback == "function")
            {
                callback();
            }
        },
        (err) => {
            if(callback && typeof callback == "function")
            {
                callback();
            }
        })
    }

    selectEvent($event)
    {
        this.CarModel = $event;
    }

    unselectEvent()
    {
        this.CarModel = {
            model: "",
            brand: "",
            full_title: ""
        };
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
        const agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        result.model = this.CarModel.model;
        result.brand = this.CarModel.brand;

        const data = this.Form.getRawValue();
        if( typeof data.power == 'string')
        {
            result.power = Number.parseInt(this._main.ReplaceAll(data.power,'\u2000', ""));
        }
        else if (typeof data.power == 'number')
        {
            result.power = Math.round(data.power);
        }

        if( typeof data.year == 'string')
        {
            result.year = Number.parseInt(this._main.ReplaceAll(data.year,'\u2000', ""));
        }
        else if (typeof data.year == 'number')
        {
            result.year = Math.round(data.year);
        }

        return result;

    }


    
  
  }
  