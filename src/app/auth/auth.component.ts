import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { LoginModel } from '../core/models/login.model';
import { Validator } from '../core/base/field.validator';


@Component({
  selector: 'auth-cmp',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit
{
    LoginModel: LoginModel = new LoginModel();
    PasswordError:string = "";
    EmailError:string = "";
    
    IsLoggendIn = false;
    constructor(private auth: AuthService, private cdr: ChangeDetectorRef) 
    {
        this.IsLoggendIn = this.auth.IsLoggedIn;
        this.auth.onAuthChange$.subscribe(
            (val) => this.IsLoggendIn = val
        );
        this.auth.http.http.post("http://192.168.1.97/api/jsonrpc",{
            "jsonrpc": "2.0", 
            "method": "Api_Test",
            "id": "23432423"
          }, {headers:null}).subscribe((res)=> console.log(res));
        this.auth.Login({});
    }
    ngOnInit() 
    {
        this.cdr.detectChanges();
    }

    Logout()
    {

    }

    Login()
    {
        this.auth.Login
        this.EmailError = "";
        this.PasswordError = "";

        if(!this.LoginModel.username)
        {
            this.EmailError = "Email is required!";
            return;
        }
        else if(!Validator.ValidateEmail(this.LoginModel.username))
        {
            this.EmailError = "Email is incorrect";;
            return;
        }
        if (!this.LoginModel.password)
        {
            this.PasswordError = "Password can't be blank!";
            return;
        }
        if (this.LoginModel.password.length < 4)
        {
            this.PasswordError = "Password must be over 4 characters";
            return;
        }
        console.log(this.LoginModel);

        this.auth.Login(
            this.LoginModel
        );
    }
}