import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';
import { Router } from '@angular/router';

@Component({
    selector: 'driver-cmp',
    templateUrl: './driver.component.html'
})

export class DriverComponent implements OnInit {
    Driver = {
        "last_name": '',
        "first_name": '',
        "patronymic":  '',
        "birth_date": '',
        "gender": "M",
        "driving_experience_started" : "",
        "driver_licenses":[{
            "credential_type": "DRIVER_LICENSE",
            "series": "",
            "number": "",
            "issue_date": ""
        }]
    };

    FormData = {
        'fio': '',
        'bday':'',
        'number': '',
        'issue_date': '',
        'exp_started': ''
    };
    constructor(protected service: SimpleService, protected router: Router)
    {
        
        
    }
    ngOnInit(): void {
        const driver = this.service.DriverModel;
        console.log(driver);
        this.FormData.fio = driver.last_name + " " + driver.first_name + " " + driver.patronymic;
        this.FormData.bday = driver.birth_date;
        console.log(this.FormData);
    }

    Save()
    {
        // let driver = this.service.DriverModel;
        const fio = this.FormData.fio.split(" ");
        const series = this.FormData.number.substr(0,4);
        const number = this.FormData.number.substr(4);
        let driver = {
            "last_name": fio[0],
            "first_name": fio[1],
            "patronymic": fio.length > 2 ? fio[2] : "",
            "birth_date": this.FormData.bday,
            "gender": "M",
            "driving_experience_started" : this.FormData.exp_started,
            "driver_licenses":[{
                "credential_type": "DRIVER_LICENSE",
                "series": series,
                "number": number,
                "issue_date": this.FormData.issue_date
            }]
        };

        this.service.FullObject.driver = driver;
        localStorage.setItem('full', JSON.stringify(this.service.FullObject));
        this.service.CreateDriver(driver, 
            (res) => {
                // console.log(res);
                this.router.navigate(['simple', 'holder']);
            },
            (err) => {
                console.log(err);
            }
        )

        console.log(driver);
    }

    Next()
    {
        this.router.navigate(['simple', 'is_owner']);
    }
}