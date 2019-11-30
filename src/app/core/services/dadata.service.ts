import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers, URLSearchParams} from '@angular/http';
import { Observable, Subject } from 'rxjs';

declare var Buffer: any;
@Injectable()
export class DadataService {

    serverUrl = 'https://suggestions.dadata.ru';
    // serverUrl = 'https://venture-box-back-test.herokuapp.com';

    protected Cities = [];
    public CitiesUpdated : Subject<boolean> = new Subject<boolean>();
    protected headers: Headers = new Headers([]);
    // public token: TokenModel = new TokenModel('');
    constructor(public http: Http) 
    {
        if (!this.headers.has('Content-Type'))
        {
            this.headers.append('Content-Type', 'application/json');
        }
        if (!this.headers.has('Accept'))
        {
            this.headers.append('Accept', 'application/json, text/plain, */*');
        }
        this.headers.append('Authorization', 'Token 42f86217e754ff52c35eb5175e36bac5b5c99b07');
    }
    validResp(resp){
        let body = resp._body;
        if(body==" ")return false;
        return true;
    }
    CommonRequest(fun:()=>Observable<Response>, success?: (data) => void, fail?: (err) => void)
    {
        // this.BaseHeadersInit();

        // this.headers.set('Authorization', "Token " + this.token);
        return fun()
            .subscribe(
                (resp: Response) =>
                {
                    // console.log(resp);
                    if(success && typeof success == "function")
                    {
                        success(this.validResp(resp)?resp.json():"");
                    }
                },
                (error) =>
                {
                    if(fail && typeof fail == "function")
                    {
                        let errObj = error;
                        errObj.body = this.validResp(error)?error.json():""
                        fail(errObj);
                    }
                }
            )
    }


    GetUFMS(req:string, success?: (data) => void, fail?: (err) => void )
    {
        this.CommonRequest(
            () => this.http.post(this.serverUrl + '/suggestions/api/4_1/rs/suggest/fms_unit', {"query":req,"count":20} , {headers: this.headers}),
            success,
            fail
        );
    }

    GetAddress(req:string,kladrId, success?: (data) => void, fail?: (err) => void )
    {
        this.CommonRequest(
            () => this.http.post(
                'https://dadata.ru/api/v2/suggest/address', 
                {
                    "query":req,
                    "count":20,
                    "locations":[
                        {"kladr_id":kladrId}
                    ],
                    "restrict_value":true}, {headers: this.headers}),
            success,
            fail
        );
    }

    ParseObjectToGetString(params: any)
    {
        let result = "";
        for(const i in params)
        {
            result += i + "=" + params[i] + "&";
        }
        return result;
    }


    
}