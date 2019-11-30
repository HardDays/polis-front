import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Validator } from '../core/base/field.validator';
import { PeriodModel } from '../core/models/period.model';
import { DictsService } from '../core/services/dicts.service';
import { CarModel } from '../core/models/car.model';
import { CarService } from '../core/services/car.service';


@Component({
  selector: 'transport-cmp',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit
{
    Car: CarModel = new CarModel();

    CarMarksDics:any[] = [];
    SelectedMark = 0;
    CarModelsDics:any[] = [];
    YearDic: number[] = [];
    constructor(private dicts: DictsService, private cars: CarService) 
    {
        if(!this.Car.credential)
            this.Car.credential = [
                {number: "", series: "", credential_type: "VEHICLE_REGISTRATION"},
                {number: "", series:"", credential_type: "DIAGNOSTIC_CHART"}
            ];
    }
    ngOnInit() 
    {
        // this.cdr.detectChanges();
        this.UpdateCarMarksDics();
        this.UpdateYearDic();
    }

    GetData()
    {
        return this.Car;
    }

    SetData(data)
    {
        this.Car = data ? JSON.parse(data) : new CarModel();

        if(this.Car.car_model_id)
        {
            this.cars.GetCarModelFullInfo(this.Car.car_model_id,
                (res) => {
                    this.CarMarkUpdated(res.car_mark_id);
                }
            );
        }
    }

    UpdateYearDic()
    {
        this.YearDic = [];
        let year = new Date().getFullYear();

        for(let i=0; i< 50; ++i)
        {
            this.YearDic.push(year);
            year--;
        }
    }

    UpdateCarMarksDics()
    {
        this.CarMarksDics = [];
        this.dicts.GetCarMarkDics(
            (res: any[]) =>
            {
                this.CarMarksDics = res;
            }
        )
    }

    CarMarkUpdated($event)
    {
        this.SelectedMark = $event;
        this.UpdateCarModelsDics();
    }

    UpdateCarModelsDics()
    {
        this.CarModelsDics = [];
        if(this.SelectedMark)
        {
            this.dicts.GetCarModelDics(
                this.SelectedMark,
                (res: any[]) =>
                {
                    this.CarModelsDics = res;
                }
            )
        }
    }

    CheckCarByPlateNumber()
    {
        if(this.Car.number_plate.length > 7)
        {
            this.cars.CheckCarPlateNumber(this.Car.number_plate,
                (res:any) => {
                    const mark = this.CarMarksDics.find((obj) => obj.title == res.car_mark);
                    // this.SelectedMark = mark.id;
                    this.CarMarkUpdated(mark.id);
                    this.Car.car_model_id = res.car_model_id;
                    this.Car.manufacturing_year = res.manufacturing_year;
                    this.Car.engine_power = res.engine_power;
                    this.Car.vin_number = res.vin_number ? res.vin_number : '';

                    var checkTOBody = {
                        "ident_type": "",
                        "ident_number": ""
                    };

                    if(this.Car.vin_number)
                    {
                        checkTOBody.ident_type = "VIN";
                        checkTOBody.ident_number = this.Car.vin_number;
                    }
                    else{
                        checkTOBody.ident_type = "BodyNumber";
                        checkTOBody.ident_number = this.Car.number_plate;
                    }
                    this.CheckTO(checkTOBody);
                    if(res.credential)
                    {
                        for(let i in res.credential)
                        {
                            this.Car.credential[i] = res.credential[i];
                        }
                    }
                },
                (fail) => {
                    console.log(fail);
                });
        }
    }

    CheckTO(data:any)
    {
        this.cars.CheckTO(data, 
            (res)=>{
                if(res)
                {
                    this.Car.credential[1].issue_date = res.next_to;
                    this.Car.credential[1].number = res.number;
                }
            });
    }
}