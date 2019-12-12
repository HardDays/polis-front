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
      (res: AgreementModel) => {
        let navigate = ["/offers"];
        if(!this.ValidateDc(res))
        {
          navigate = ["/full", "dc"];
        }
        this._main.Navigate(navigate);
      },
      (err) => {
      })
      

  }

  ValidateDc(data: AgreementModel)
  {
    if(!data.vehicle.dcDate || !data.vehicle.dc)
    {
      return false;
    }

    if(data.vehicle.dcDate)
    {
      const now = new Date();
      const date = new Date(data.vehicle.dcDate);

      if(now.getTime() > date.getTime())
      {
        return false;
      }
    }

    return true;
  }
  
}