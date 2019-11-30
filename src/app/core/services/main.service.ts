import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { AgreementModel, VehicleModel } from '../models/agreement.model';
import { SessionService } from './session.service';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable()
export class MainService
{
    Agreement: AgreementModel;
    LastPage: string;
    SkEnum = {
        1: {
            id:1,
            name: 'Альфастрахование',
            currency: 'р.',
            total: 0,
            img: 'assets/img/alpha.png'
        },
        27: {
            id: 27,
            name: 'Зетта Страхование',
            currency: 'р.',
            total: 0,
            img: 'assets/img/zetta.png'
        },
        5: {
            id: 5,
            name: 'Росгоссрах',
            currency: 'р.',
            total: 0,
            img: 'assets/img/rgs.png'
        },
        7: {
            id: 7,
            name: 'Согласие',
            currency: 'р.',
            total: 0,
            img: 'assets/img/sg.svg'
        },
        32: {
            id: 32,
            name: 'Ресо',
            currency: 'р.',
            total: 0,
            img: 'assets/img/reso.png'
        },
        3: {
            id: 3,
            name: "Ингосстрах",
            currency: 'р.',
            total: 0,
            img: 'assets/img/ings.png'
        },
        33: {
            id: 33,
            name: "ВСК",
            currency: 'р.',
            total: 0,
            img: 'assets/img/vsk.png'
        },
        36: {
            id: 36,
            name: 'Ренессанс Страхование',
            currency: 'р.',
            total: 0,
            img: 'assets/img/rns.png'
        },
        107: {
            id: 107,
            name: 'Тинькофф Страхование',
            currency: 'р.',
            total: 0,
            img: 'assets/img/tinkoff.png'
        }
    };
    constructor(public http: HttpService, private router: Router, public _session: SessionService, private _sanitize: DomSanitizer) 
    {
        this.Agreement = this._session.LoadAgreement();
        this.LastPage = this._session.LoadPage();
        console.log(this);
    }

    Navigate(Page)
    {
        this.LastPage = Page;
        this._session.SavePage(Page);
        this.router.navigate(["/" + Page]);
    }

    CheckCarByNumber(Obj, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/cars/by_number_plate', Obj),
            (res: VehicleModel) => {
                this.Agreement.vehicle = res;
                this.Agreement.licensePlate = Obj.number_plate;
                // console.log(JSON.stringify(this.Agreement));
                this.SaveAgreement(this.Agreement,success, fail);
            },
            fail
        );
    }

    SaveAgreement(Obj, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/calculate/save', Obj),
            (res: AgreementModel) => {
                this.Agreement = res;
                this._session.SaveAgreement(this.Agreement);
                if(success && typeof success == "function")
                {
                    success(res);
                }
            },
            fail
        );
    }

    CarDics(Text, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/cars', {
                "title": Text,
                "limit": 10
            }),
            success,
            fail
        )
    }

    Copy(Obj)
    {
        return JSON.parse(JSON.stringify(Obj));
    }

    KladrDics(Text, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/regions/kladr', "count=10&query=" + Text),
            success,
            fail
        )
    }

    GetAddrByKladr(Query, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/addr/kladr', "query=" + Query),
            success,
            fail
        )
    }

    LiteCalculation(success?: (data) => void, fail?: (err) => void)
    {
        const obj = this.Copy(this.Agreement) as AgreementModel;
        if(!obj.multidrive && obj.drivers.length > 0)
        {
            const now = new Date();
            for(const i in obj.drivers)
            {
                const res = now.getTime() - new Date(obj.drivers[i].birthdate).getTime();

                console.log(res, res / (1000 * 60 * 60 * 24 * 365));
                obj.drivers[i].age = Math.round(res / (1000 * 60 * 60 * 24 * 365));
            }
        }
        this.http.CommonRequest(
            () => this.http.PostData('/calculate/lite', obj),
            success,
            fail
        )
    }
}
