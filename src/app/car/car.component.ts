import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel } from '../core/models/agreement.model';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { NgAutoCompleteComponent, CreateNewAutocompleteGroup, SelectedAutocompleteItem } from 'ng-auto-complete';
import { SimpleCarComponent } from '../input_modules/car/simple/simple.component';

@Component({
    selector: 'app-car-cmp',
    templateUrl: './car.component.html',
    styleUrls: ['./car.component.css']
  })
  export class CarComponent implements OnInit 
  {

    Vehicle: VehicleModel = new VehicleModel();
    IsLoading = false;
    @ViewChild('simple', {static: false}) simple: SimpleCarComponent;

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
        this.Vehicle = this._main.Copy(this._main.Agreement.vehicle) as VehicleModel;
    }
    ngOnInit(): void {

    }

    SaveCar()
    {

        const data = this.simple.GetData();
        if(!data)
        {
            return;
        }
        this.IsLoading = true;
        let agr = this._main.Copy(this._main.Agreement) as AgreementModel;

        for(const i in data)
        {
            agr.vehicle[i] = data[i];
        }
       
        this._main.SaveAgreement(agr,(res) => {
            this.IsLoading = false;
            this._main.Navigate(["/prev","ndrivers"]);
        },
        (err) => {
            this.IsLoading = false;
        })
    }


    
  
  }
  