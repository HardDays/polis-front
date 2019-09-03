// import { CompanyModel } from './../models/company.model';
// import { LoginModel } from './../models/login.model';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
// import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { HttpService } from './http.service';


@Injectable()
export class AuthService
{
    protected token_field:string = "token";

    public onAuthChange$: Subject<boolean> = new Subject<boolean>();
    public IsLoggedIn: boolean = false;

    constructor(public http: HttpService, private router: Router) 
    {
        this.onAuthChange$.next(false);
    }

    Login(data: LoginModel)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/v1/users/obtain-token', {
                    "username": "kka@pro-brokers.ru",
                    "password": "kka@pro"
                }),
            (res: TokenModel) => console.log(res)
        )
    }

    InitSession(data:TokenModel)
    {
        localStorage.setItem(this.token_field ,data.token);
        // this.http.BaseInitByToken(data.token);
        this.onAuthChange$.next(true);
    }
}
