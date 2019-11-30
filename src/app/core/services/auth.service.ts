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
export class AuthService
{
    protected token_field:string = "token";
    protected user_field:string = "user";

    public onAuthChange$: Subject<boolean> = new Subject<boolean>();
    public IsLoggedIn: boolean = false;

    public CurrentUser: UserModel = new UserModel();
    public onUserChange$: Subject<UserModel> = new Subject<UserModel>();

    constructor(public http: HttpService, private router: Router) 
    {
        this.onAuthChange$.subscribe(val => {
            this.IsLoggedIn = val;
            if(this.IsLoggedIn)
            {
                this.GetCurrentUserInfo();
            }
            else{
                this.DeleteUserInfo();
            } 
        });

        this.onUserChange$.subscribe(val => {
            if(val)
            {
                this.UpdateUserInfo(val);
            }
            else{
                // this.CurrentUser = new UserModel();
                this.DeleteUserInfo();
            }
        });
        this.onAuthChange$.next(false);
        this.GetCurrentUserFromLocalStorage();
        this.GetTokenFromLocalStorage();
        // this.B2CLogin();
    }

    B2CLogin()
    {
        // var params = {};
        // for(var i in data)
        // {
        //     params[i.toString()] = data[i];
        // }
        this.http.CommonRequest(
            () => this.http.PostData('/v1/users/b2c-login', null),
            (res: TokenModel) => this.InitSession(res)
        )
    }

    Login(data: any)
    {
        // var params = {};
        // for(var i in data)
        // {
        //     params[i.toString()] = data[i];
        // }
        this.http.CommonRequest(
            () => this.http.PostData('/v1/users/obtain-token', JSON.stringify(data)),
            (res: TokenModel) => this.InitSession(res)
        )
    }

    Logout()
    {
        localStorage.removeItem(this.token_field);
        this.CurrentUser = new UserModel();
        this.http.DeleteAuthToken();
        this.onAuthChange$.next(false);
        this.onUserChange$.next(null);
        // this.DeleteUserInfo();
    }

    InitSession(data:TokenModel)
    {
        localStorage.setItem(this.token_field ,data.token);
        this.http.BaseInitByToken(data.token);
        this.onAuthChange$.next(true);
    }

    GetTokenFromLocalStorage()
    {
        const token = localStorage.getItem(this.token_field);

        if(token)
        {
            this.http.BaseInitByToken(token);
            this.onAuthChange$.next(true);
        }
    }

    GetCurrentUserInfo()
    {
        this.http.CommonRequest(
            () => this.http.GetData("/v1/users/current_user"),
            (res: UserModel) => {
                this.onUserChange$.next(res);
            },
            (err) => {
                this.Logout();
            }
        )
    }

    UpdateUserInfo(data:UserModel)
    {
        this.CurrentUser = data;
        localStorage.setItem(this.user_field, JSON.stringify(this.CurrentUser));
    }

    DeleteUserInfo()
    {
        this.CurrentUser = new UserModel();
        localStorage.removeItem(this.user_field);
    }

    GetCurrentUserFromLocalStorage()
    {
        const str = localStorage.getItem(this.user_field);

        if(str)
        {
            this.onUserChange$.next(JSON.parse(str));
            // this.UpdateUserInfo(JSON.parse(str));
        }
    }
}
