import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';

@Component({
    selector: 'transport-cmp',
    templateUrl: './transport.component.html'
})

export class TransportComponent implements OnInit {
    
    Companies = [];
    Car = {} as any;

    constructor(protected service: SimpleService)
    {
        this.Car = this.service.CarModel;
        this.service.FullObject.car = JSON.parse(JSON.stringify(this.Car));
        localStorage.setItem('full', JSON.stringify(this.service.FullObject));
    }

    ngOnInit(): void 
    {
        
    }
}