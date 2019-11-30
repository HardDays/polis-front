import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';

declare var Buffer: any;
@Injectable()
export class CityService {

    serverUrl = 'https://kladr-api.ru';
    // serverUrl = 'https://venture-box-back-test.herokuapp.com';

    protected Cities = [];
    public CitiesUpdated : Subject<boolean> = new Subject<boolean>();
    // public token: TokenModel = new TokenModel('');
    constructor(public http: HttpService) 
    {
    }

    GetCities()
    {
        return this.Cities;
    }


    GetCityDics(params?:any, success?: (data) => void, fail?: (err) => void)
    {

        this.Cities = [];
        this.http.CommonRequest(
            () => this.http.GetDataFromOtherUrl(this.serverUrl + '/api.php?' +this.ParseObjectToGetString(params)),
            (res) => {
                if(res && res.result)
                {
                    for(const i of res.result)
                    {
                        if(i.typeShort == "г")
                        {
                            this.Cities.push({
                                id: i.id,
                                value: i.name+ (i.parents && i.parents.length > 0 ? (", " + i.parents[0].name + " " + i.parents[0].type) : "")
                            });
                        }
                    }
                }
                this.CitiesUpdated.next(true);
            },
            err => {
                console.log(err);
            }
        )
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