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
export class CarService
{
    constructor(public http: HttpService, private router: Router) 
    {
    }

    CheckCarPlateNumber(number: string, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/cars/by_number_plate", {"number_plate": number}),
            success,
            fail
        )
    }

    GetPeriodDics(success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/v1/dicts/insurance_periods'),
            success,
            fail
        );
    }

    CheckTO(data:any, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/cars/ticket_check", data),
            success,
            fail
        )
    }

    GetCarModelFullInfo(modelId: number, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData("/v1/dicts/car_models/"+modelId),
            success,
            fail
        );
    }
}
