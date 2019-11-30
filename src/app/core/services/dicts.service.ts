// import { CompanyModel } from './../models/company.model';
// import { LoginModel } from './../models/login.model';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
// import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { HttpService } from './http.service';
import { UserModel } from '../models/user.model';


@Injectable()
export class DictsService
{
    constructor(public http: HttpService, private router: Router) 
    {
    }

    GetPeriodDics(success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/v1/dicts/insurance_periods'),
            success,
            fail
        );
    }

    GetCarMarkDics(success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/v1/dicts/car_marks'),
            success,
            fail
        );
    }

    GetCarModelDics(markId:number, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/v1/dicts/car_models',"car_mark=" + markId),
            success,
            fail
        );
    }
}
