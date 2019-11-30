import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { LoginModel } from '../core/models/login.model';
import { Validator } from '../core/base/field.validator';
import { UserModel } from '../core/models/user.model';


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
    User: UserModel = new UserModel();
    IsLoggendIn = false;
    constructor(private auth: AuthService, private cdr: ChangeDetectorRef) 
    {
        this.IsLoggendIn = this.auth.IsLoggedIn;
        this.User = this.auth.CurrentUser;
        this.auth.onAuthChange$.subscribe(
            (val) => {
                // console.log('loged in', val);
                this.IsLoggendIn = val;
            }
        );
        this.auth.onUserChange$.subscribe(
            val => {
                this.User = val;
            }
        )
        // this.auth.Login({});
    }
    ngOnInit() 
    {
        this.cdr.detectChanges();
    }

    Logout()
    {
        this.auth.Logout();
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
            {
                "username" : this.LoginModel.username,
                "password" : this.LoginModel.password
            }
        );
    }
}