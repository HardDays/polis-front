import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Response, Headers, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';

declare var Buffer: any;
@Injectable()
export class HttpService {

    // serverUrl = 'https://widget.agentapp.ru/widgets';
    serverUrl = 'https://gde-polis.herokuapp.com/api/v1';
    // serverUrl = 'http://localhost:3000/api/v1';
    // прикрутить 
    public headers: Headers = new Headers([]);
    // public token: TokenModel = new TokenModel('');
    constructor(public http: Http) {
        this.BaseHeadersInit();
    }

    private token : string = "";

    BaseInitByToken(data: string)
    {
        if (data) 
        {
            if (this.headers.has('Authorization')) 
            {
                this.headers.delete('Authorization');
            }
            this.headers.append('Authorization', "Token " + data);
            this.token = data;
            // this.token = new TokenModel(data);
        }
    }

    DeleteAuthToken()
    {
        if (this.headers.has('Authorization')) 
        {
            this.headers.delete('Authorization');
        }
    }

    BaseHeadersInit()
    {
        if (!this.headers.has('Content-Type'))
        {
            this.headers.append('Content-Type', 'application/json');
        }
        if (!this.headers.has('Accept'))
        {
            this.headers.append('Accept', 'application/json, text/plain, */*');
        }
        this.headers.append('B2C-DOMAIN', 'widget.agentapp.ru');
        // this.headers.append('Origin', 'https://widget.agentapp.ru/widgets/');
        // this.headers.append('Sec-Fetch-Mode', 'cors');

        // this.headers.append('Access-Control-Allow-Credentials', 'true');
        // this.headers.append('Access-Control-Allow-Origin', 'https://widget.agentapp.ru');
        // this.headers.append('GET', 'POST', 'OPTIONS');
    }

    // GetToken(): TokenModel
    // {
    //     return this.token;
    // }

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

    GetQueryStr(method: string, params?: string)
    {
        return this.serverUrl + method + (params ? ('?' + params) : '');
    }

    GetData(method: string, params?: string)
    {
        return this.http.get(this.serverUrl + method + '?' + params, {headers: this.headers});
    }

    DeleteData(method: string)
    {
        return this.http.delete(this.serverUrl + method, {headers: this.headers});
    }

    DeleteDataWithBody(method: string, body: any)
    {
        return this.http.delete(this.serverUrl + method, new RequestOptions({
            headers: this.headers,
            body: body
          }));
    }

    DeleteDataWithParam(method: string, param)
    {
        return this.http.delete(this.serverUrl + method + '?' + param, {headers: this.headers});
    }

    PostData(method: string, data: any)
    {
        return this.http.post(this.serverUrl + method, data, {headers: this.headers});
    }

    PatchData(method: string, data: any)
    {
        return this.http.patch(this.serverUrl + method, data, {headers: this.headers});
    }

    PutData(method: string, data: string)
    {
        return this.http.put(this.serverUrl + method, data, {headers: this.headers});
    }

    GetDataFromOtherUrl(url: string)
    {
        return this.http.get(url);
    }

    ParseReqBody(data: any)
    {
        var params = {};
        for(const i in data)
        {
            if(Array.isArray(data[i]))
            {
                params[i.toString()] = [];
                for(const j in data[i])
                {
                    params[i.toString()][j.toString()] = data[i][j];
                }
            }
            else if(typeof data[i] == "object")
                params[i.toString()] = this.ParseReqBody(data[i]);
            else
                params[i.toString()] = data[i];
        }

        return params;
    }
}
