import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';
import { Router } from '@angular/router';

@Component({
    selector: 'start-cmp',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

    CarNumber = "";
    RequestProcessing=false;

    constructor(protected service: SimpleService, protected router: Router)
    {

    }
    ngOnInit(): void {

        if(this.service.CarModel && this.service.CarModel.number_plate)
        {
            this.CarNumber = this.service.CarModel.number_plate;
        }
    }


    CheckCarNumber()
    {
        this.RequestProcessing = true;
        this.service.CheckCarPlateNumber(this.CarNumber,
            (res) => {
                console.log(res);
                this.RequestProcessing = false;
                this.router.navigate(["simple", "car"]);
            },
            (err) => {
                console.log(err);
                this.RequestProcessing = false;
            })
        // console.log(this.CarNumber);
    }
}