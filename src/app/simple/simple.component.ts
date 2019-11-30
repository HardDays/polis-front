import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'simple-cmp',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.css']
})

export class SimpleComponent implements OnInit {

    FormVals = {
        "valid_from": "2019-06-30",
        "valid_to": "2020-06-29",
        "engine_power": 95,
        "is_car_without_registration": false,
        "car_type": "B",
        "target_of_using": 11,
        "has_car_trailer": false,
        "insurance_period": 8,
        "owner_registration": {
            "address_query": "г Санкт-Петербург",
            "region_kladr_id": "7800000000000"
    
        },
        "periods": [
            // {
            //     "start_date": "2019-06-30",
            //     "end_date": "2019-09-29"
            // }
        ],
        "drivers_ids":[
            // "{{driver_id}}"
        ]
    };

    constructor()
    {

    }

    ngOnInit(): void {
        
    }
}