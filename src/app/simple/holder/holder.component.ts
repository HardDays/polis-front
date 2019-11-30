import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';
import { Router } from '@angular/router';
import { DadataService } from '../../core/services/dadata.service';

@Component({
    selector: 'holder-cmp',
    templateUrl: './holder.component.html'
})

export class HolderComponent implements OnInit {

    UfmsDics = [];
    AddrDics = [];
    KladrId = 0;
    FormData = {
        'fio': '',
        'bday':'',
        'number': '',
        'issue_date': '',
        'who': '',
        'addr':''
    };

    Holder = {
        "address":[{
            "address_type":"LEGAL_ADDRESS",
            "address_query": ""
        }],
        "credential":[
            {
                "credential_type":"RUSSIAN_INTERNAL_PASSPORT",
                "issue_date":"",
                "issue_point":"ОТДЕЛЕНИЕМ В НОВО-САВИНОВСКОМ РАЙОНЕ ОУФМС РОССИИ ПО РЕСП. ТАТАРСТАН В Г. КАЗАНИ",
                "issue_point_code":"160-007",
                "number":"",
                "series":""
                
            }
        ],
            "contact":[
                {"contact_type":"PHONE","data":"+79885413188"},
                {"contact_type":"EMAIL","data":"paramonov.kirill.alexandrovich@gmail.com"}
            ],
            "last_name":"",
            "first_name":"",
            "patronymic":"",
            "birth_date":"",
            "valid_from":null
    }
    constructor(protected service: SimpleService, protected router: Router, protected dadata: DadataService)
    {
        const driver = this.service.DriverModel;
        console.log(driver);
        this.FormData.fio = driver.last_name + " " + driver.first_name + " " + driver.patronymic;
        this.FormData.bday = driver.birth_date;
        console.log(this.FormData);
    }
    ngOnInit(): void 
    {
        this.KladrId = this.service.AggreementModel.owner_registration.kladr_id;
        // console.log(this.service.AggreementModel.owner_registration.kladr_id);
    }

    onAddrChangeSearch($event)
    {
        console.log($event)
        this.dadata.GetAddress($event, this.KladrId,(res) => {
            this.AddrDics = res.suggestions;
            // this.UfmsDics = res.suggestions;
        })
        // console.log($event);
    }

    selectAddrEvent($event)
    {
        // console.log($event);
        this.Holder.address[0].address_query = $event.unrestricted_value;
        for(const i in $event.data)
        {
            // if(i !== 'metro' && typeof $event.data[i] != 'object' && typeof $event.data[i] != 'function')
                this.Holder.address[0][i] = $event.data[i];
        }
        console.log(this.Holder);
    }

    onUFMSChangeSearch($event)
    {
        this.dadata.GetUFMS($event,(res) => {
            this.UfmsDics = res.suggestions;
        })
        // console.log($event);
    }

    selectUFMSEvent($event)
    {
        this.Holder.credential[0].issue_point_code = $event.data.code;
        this.Holder.credential[0].issue_point = $event.data.name;
        console.log(this.Holder);
    }

    Save()
    {
        const fio = this.FormData.fio.split(" ");
        const series = this.FormData.number.substr(0,4);
        const number = this.FormData.number.substr(4);
        this.Holder.first_name = fio[1];
        this.Holder.last_name = fio[0];
        this.Holder.patronymic = fio[2];
        this.Holder.birth_date = this.FormData.bday;
        this.Holder.credential[0].issue_date = this.FormData.issue_date;
        this.Holder.credential[0].number = number;
        this.Holder.credential[0].series = series;
        

        this.service.FullObject.holder = JSON.parse(JSON.stringify(this.Holder));

        localStorage.setItem('full', JSON.stringify(this.service.FullObject));
        console.log(this.Holder);
        this.service.CreateHolder(this.Holder, (res)=>{
            console.log(res);
            this.router.navigate(['simple', 'super_final']);
        },
        (err) => {
            console.log(err);
        })

        // console.log(this.FormData);
    }
}