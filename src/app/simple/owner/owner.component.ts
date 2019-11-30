import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';
import { Router } from '@angular/router';
import { CityService } from '../../core/services/city.service';

@Component({
    selector: 'owner-cmp',
    templateUrl: './owner.component.html'
})

export class OwnerComponent implements OnInit {
    CityDics = [];

    Owner = {
        "fio": "",
        "bday": "",
        "exp": null,
        "kladr_id":"",
        "phone":""
    };
    constructor(protected service: SimpleService, protected router: Router, protected city: CityService)
    {
        this.city.CitiesUpdated.subscribe((val) => {
            this.CityDics = this.city.GetCities();
            // console.log(val);
        });
    }
    ngOnInit(): void {
        this.GetCityDics('');
    }

    selectEvent($event)
    {
        this.Owner.kladr_id = $event.id;
        this.service.AggreementModel.owner_registration.address_query = $event.value;
        console.log(this.Owner);
        // console.log(this.service.AggreementModel);
    }

    onChangeSearch($event)
    {
        this.GetCityDics($event);
        // console.log('change', $event);
    }

    Save()
    {
        const fio = this.Owner.fio.split(" ");
        
        let driver = {
            "last_name": fio[0],
            "first_name": fio[1],
            "patronymic": fio.length > 2 ? fio[2] : "",
            "birth_date": this.Owner.bday,
            "gender": "M",
            "driving_experience_started" : "",
            "driver_licenses":[{
                "credential_type": "DRIVER_LICENSE",
                "series": "1234",
                "number": "567890",
                "issue_date": ""
            }]
        };

        driver.gender = driver.patronymic && driver.patronymic.substr(driver.patronymic.length - 4, 3) == "вна" ? "F" : "M";

        let date = new Date();
        date.setFullYear(date.getFullYear() - this.Owner.exp);

        driver.driving_experience_started = date.toISOString().split("T")[0];

        if(this.Owner.exp < 10)
        {
            driver.driver_licenses[0].issue_date = date.toISOString().split("T")[0];
        }
        else{
            let exp = this.Owner.exp;

            while(exp > 10)
            {
                date.setFullYear(date.getFullYear() + 10);
                exp -= 10;
            }

            driver.driver_licenses[0].issue_date = date.toISOString().split("T")[0];
        }

        this.service.CreateDriver(driver, 
            (res) => {
                this.service.AggreementModel.owner_registration.registration_kladr_id = this.Owner.kladr_id;
                this.service.AggreementModel.owner_registration.kladr_id = this.Owner.kladr_id;
                this.service.AggreementModel.owner_registration.city_kladr_id = this.Owner.kladr_id;

                localStorage.setItem("agr", JSON.stringify(this.service.AggreementModel));
                this.router.navigate(['simple', 'final']);
            },
            (err) => {
                console.log(err);
            }
        )
        // this.router.navigate(['simple']);
    }

    GetCityDics(query:string)
    {
        this.city.GetCityDics({
            limit: 10,
            contentType: "city",
            withParent: 1,
            query: query,
            typeCode: 1
        });
    }

    GetLicenseIssueDate(exp: number, )
    {

    }
}