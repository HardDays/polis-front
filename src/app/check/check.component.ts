import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { EmailFormComponent } from '../input_modules/email/email.component';
import { AgreementModel } from '../core/models/agreement.model';

@Component({
  selector: 'app-check-cmp',
  templateUrl: './check.component.html'
})
export class CheckComponent implements OnInit{

  @ViewChild('email', {static: false}) form: EmailFormComponent
  constructor(private _main: MainService)
  {
  }
  ngOnInit(): void {
  }

  Navigate()
  {
    const data = this.form.GetData();
    if(!data)
    {
      return;
    }

    let agr = this._main.Copy(this._main.Agreement) as AgreementModel;

    for(const i in data)
    {
      agr[i] = data[i];
    }

    this._main.SaveAgreement(agr,
      (res) => {
        console.log(res);
        this._main.Navigate(["/offers"]);
      },
      (err) => {
        console.log(err);
      })
      

  }
  
}