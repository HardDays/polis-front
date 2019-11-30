// import { CompanyModel } from './../models/company.model';
// import { LoginModel } from './../models/login.model';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
// import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpService } from './http.service';


@Injectable()
export class MainService
{
    constructor(public http: HttpService, private router: Router) 
    {
    }

    CreateDrivers(model, success?: (ok) => void, fail?: (err) => void)
    {
        // console.log(this.http.ParseReqBody(model));
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/drivers", JSON.stringify(this.http.ParseReqBody(model))),
            success,
            fail
        )
    }

    Calculations(model, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/calculations", JSON.stringify(model)),
            success,
            fail
        )
    }

    CreatePolicyHolder(model, success?: (ok) => void, fail?: (err) => void)
    {
        // console.log(this.http.ParseReqBody(model));
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/insurants/natural_persons", JSON.stringify(this.http.ParseReqBody(model))),
            success,
            fail
        )
    }

    CreateCar(model, success?: (ok) => void, fail?: (err) => void)
    {
        // /insured_objects/cars
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/cars", JSON.stringify(this.http.ParseReqBody(model))),
            success,
            fail
        )
    }

    CreateOwner(model, success?: (ok) => void, fail?: (err) => void)
    {
        // /insured_objects/cars
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/owners/natural_persons", JSON.stringify(this.http.ParseReqBody(model))),
            success,
            fail
        )
    }

    Combine(model, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/", JSON.stringify(this.http.ParseReqBody(model))),
            success,
            fail
        )
    }

    UpdateAgreement(aggr_id, data,success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PatchData("/v1/agreements/" + aggr_id, data),
            success,
            fail
        );
    }

    GetSCompanies(success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData("/v1/companies/", ''),
            success,
            fail
        );
    }

    GetLogoFullPath(url)
    {
        return this.http.GetQueryStr(url);
    }

    GetScompanyOffer(aggr_id, company_code, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/"+aggr_id+"/results/" + company_code, ""),
            success,
            fail
        )
    }

    GetAggreementInfo(aggr_id, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData("/v1/agreements/" + aggr_id, ''),
            success,
            fail
        );
    }
    
}
