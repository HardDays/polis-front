import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';
import { Router } from '@angular/router';

@Component({
    selector: 'car-cmp',
    templateUrl: './car.component.html'
})

export class CarComponent implements OnInit {
    Disabled = true;
    CarInfo:any = null as any;

    FormData = {
        model: '',
        engine_power: "0 л.с."
    };
    constructor(protected service: SimpleService, protected router : Router)
    {

    }
    ngOnInit(): void 
    {
        this.FormData.engine_power = parseInt(this.service.CarModel.engine_power) + " л.с.";
        this.FormData.model = this.service.CarModel.car_mark + " " + this.service.CarModel.car_model;
        // this.service.GetCarModelFullInfo(this.service.CarModel.car_model_id,(res) => {
        //     console.log(this.service.CarModel, res);
        //     this.FormData.model = res.car_mark + " " + res.title;
        // })
    }

    CreateCar()
    {
        console.log(this.service.CarModel);
        
        this.service.CreateCarObject(this.service.CarModel,
            (res) => {
                this.router.navigate(['simple', 'drivers']);
            });
        // routerLink="../drivers" 
    }
}