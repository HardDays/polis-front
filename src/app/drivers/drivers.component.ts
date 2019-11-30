import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DictsService } from '../core/services/dicts.service';
import { CarModel } from '../core/models/car.model';
import { CarService } from '../core/services/car.service';
import { PolicyholderModel, CredentialModel, AddressModel, ContactModel } from '../core/models/policyholder.model';
import { DriverModel } from '../core/models/driver.model';


@Component({
  selector: 'drivers-cmp',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit
{
    Drivers: DriverModel[] = [];
    DriversVals = [
        1,2,3,4,0
    ];
    SelectedVal = 1;

    

    constructor(private dicts: DictsService, private cars: CarService) 
    {
        this.SelectedVal = 1;
        this.Drivers = [
            new DriverModel()
        ];
    }

    ngOnInit() 
    {
    }

    SetData(data)
    {
        this.Drivers = data ? JSON.parse(data) : [
            new DriverModel()
        ];
        this.SelectedVal = this.Drivers.length;
    }

    GetData()
    {
        return this.Drivers;
    }
    DriversChange($event)
    {
        this.SelectedVal = $event;

        const curLength = this.Drivers.length;

        if(this.SelectedVal > curLength)
        {
            const needToAdd = this.SelectedVal - curLength;
            for(let i=0; i < needToAdd; ++i)
            {
                this.Drivers.push(new DriverModel());
            }
        }
        else if (this.SelectedVal < curLength)
        {
            const needToDelete = curLength - this.SelectedVal;

            this.Drivers.length = this.SelectedVal;
        }
    }

    
}