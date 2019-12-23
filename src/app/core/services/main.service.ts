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
    LastPage: string[];

    Offer = {};
    SkEnum = {
        1: {
            id:1,
            name: 'Альфастрахование',
            currency: 'р.',
            total: 0,
            img: 'assets/img/alpha.png',
            base_rate: 0,
            status: 'loading'
        },
        27: {
            id: 27,
            name: 'Зетта Страхование',
            currency: 'р.',
            total: 0,
            img: 'assets/img/zetta.png',
            base_rate: 0,
            status: 'loading'
        },
        5: {
            id: 5,
            name: 'Росгосстрах',
            currency: 'р.',
            total: 0,
            img: 'assets/img/rgs.png',
            base_rate: 0,
            status: 'loading'
        },
        7: {
            id: 7,
            name: 'Согласие',
            currency: 'р.',
            total: 0,
            img: 'assets/img/sg.png',
            base_rate: 0,
            status: 'loading'
        },
        32: {
            id: 32,
            name: 'Ресо',
            currency: 'р.',
            total: 0,
            img: 'assets/img/reso.png',
            base_rate: 0,
            status: 'loading'
        },
        3: {
            id: 3,
            name: "Ингосстрах",
            currency: 'р.',
            total: 0,
            img: 'assets/img/ings.png',
            base_rate: 0,
            status: 'loading'
        },
        33: {
            id: 33,
            name: "ВСК",
            currency: 'р.',
            total: 0,
            img: 'assets/img/vsk.png',
            base_rate: 0,
            status: 'loading'
        },
        36: {
            id: 36,
            name: 'Ренессанс Страхование',
            currency: 'р.',
            total: 0,
            img: 'assets/img/rns.png',
            base_rate: 0,
            status: 'loading'
        },
        107: {
            id: 107,
            name: 'Тинькофф Страхование',
            currency: 'р.',
            total: 0,
            img: 'assets/img/tinkoff.png',
            base_rate: 0,
            status: 'loading'
        }
    };
    constructor(public http: HttpService, private router: Router, public _session: SessionService, private _sanitize: DomSanitizer) 
    {
        this.Agreement = this._session.LoadAgreement();
        this.LastPage = this._session.LoadPage();

        this.Offer = this._session.LoadOffer();
    }

    Navigate(Page)
    {
        this.LastPage = Page;
        this._session.SavePage(Page);
        this.router.navigate(Page);
    }

    ChoseOffer(data)
    {
        this.Offer = data;
        this._session.SaveOffer(data);
    }

    CheckCarByNumber(Obj, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/cars/by_number_plate', Obj),
            (res: VehicleModel) => {
                this.Agreement.vehicle = res;
                this.Agreement.licensePlate = Obj.number_plate;
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

    GetAddr(Query, KladrId?, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/regions/addr',this.ParseObjectToSearchString({
                query: Query,
                kladr_id: KladrId ? KladrId : null,
                count: 10
            })),
            success,
            fail
        )
    }

    GetFio(Query, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/dadata/fio',"query=" + Query),
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
                if(!obj.drivers[i].age)
                    obj.drivers[i].age = this.GetAge(obj.drivers[i].birthdate);
                if(!obj.drivers[i].exp && obj.drivers[i].expdate)
                    obj.drivers[i].exp = this.GetAge(obj.drivers[i].expdate);
            }
        }
        this.http.CommonRequest(
            () => this.http.PostData('/calculate/lite', obj),
            success,
            fail
        )
    }

    ReplaceAll(text: string, find: string, replace: string): string
    {
        return text.split(find).join(replace);
    }

    ParseObjectToSearchString(obj)
    {
        let arr = [];

        for(const i in obj)
        {
            arr.push(i + "=" + obj[i]);
        }

        return arr.join("&");
    }

    GetOffer(Sk, success?: (data) => void, fail?: (err) => void )
    {
        let agr = this.Copy(this.Agreement) as AgreementModel;
        agr.vehicle.docDate = agr.vehicle.docDate.split("T")[0];
        agr.vehicle.dcDate = agr.vehicle.dcDate.split("T")[0];
        this.http.CommonRequest(
            () => this.http.PostData('/calculate/offer/' + Sk, {
                agreement: agr
            }),
            success,
            fail
        )
    }

    GetPaymentUrl(eId,data?, success?: (data) => void, fail?: (err) => void )
    {
        this.http.CommonRequest(
            () => this.http.GetData('/pay/link/' + eId, this.ParseObjectToSearchString(data)), 
            success,
            fail
        )
    }

    GetAge(str:string)
    {
        let diff  = Date.now() - new Date(str).getTime()

        const age = new Date(diff);

        return Math.abs(age.getUTCFullYear() - 1970);
    }

    CheckKBM(data, success?: (data) => void, fail?: (err) => void )
    {
        this.http.CommonRequest(
            () => this.http.PostData('/calculate/kbm', data),
            success,
            fail
        );
    }

    ParseDateObjToStr(obj)
    {
        return obj.date.year + "-" + (obj.date.month < 10 ? "0": "") + obj.date.month + "-" + (obj.date.day < 10 ? "0" : "") + obj.date.day;
    }

    CheckPayment(Id, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/pay/status/' + Id, ''),
            success,
            fail
        );
    }


    GetAgeStr(age)
    {
        let result = age + " ";

        if(age % 10 == 0 || age % 10 >= 5 || (age > 10 && age < 15))
        {
            result += "лет";
        }
        else
        {
            result += "год";
            if ( age % 10 != 1)
            {
                result += "а";
            }
        }

        return result;
    }
}
