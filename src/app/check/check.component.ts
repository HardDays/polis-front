import { Component, ViewChild, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { EmailFormComponent } from '../input_modules/email/email.component';
import { AgreementModel, DriverModel } from '../core/models/agreement.model';
import { SimpleCarComponent } from '../input_modules/car/simple/simple.component';
import { FullCarComponent } from '../input_modules/car/full/full.component';
import { DriverFormComponent } from '../input_modules/driver/driver.component';
import { OwnerFormComponent } from '../input_modules/owner/owner.component';

@Component({
  selector: 'app-check-cmp',
  templateUrl: './check.component.html'
})
export class CheckComponent implements OnInit{

  TopOpened = true;
  BottomOpened = true;
  @ViewChild('email', {static: false}) form: EmailFormComponent;

  @ViewChild('simple', {static: false}) simple: SimpleCarComponent;
  @ViewChild('full', {static: false}) full: FullCarComponent;
  ShowVehicleModal = false;

  ShowDriversModal = false;
  @ViewChildren('drivers') drivers: QueryList<DriverFormComponent>;

  ShowOwnerModal = false;
  @ViewChild('owner', {static: false}) owner: OwnerFormComponent;

  ShowInsurerModal = false;
  @ViewChild('insurer', {static: false}) insurer: OwnerFormComponent;

  Agr: AgreementModel = new AgreementModel();

  constructor(private _main: MainService)
  {
    this.Agr = this._main.Copy(this._main.Agreement) as AgreementModel;
  }
  ngOnInit(): void {
    console.log(this.Agr);
  }

  Navigate()
  {
    const data = this.form.GetData();
    if(!data)
    {
      return;
    }

    let agr = this._main.Copy(this.Agr) as AgreementModel;

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

  ConfirmVehicleData()
  {
    let simple = this.simple.GetData();
    let full = this.full.GetData();

    if(!simple || !full)
    {
      return;
    }

    const data = {...simple, ...full};
    for(const i in data)
    {
      this.Agr.vehicle[i] = data[i];
    }

    this.ShowVehicleModal = false;
  }

  AddDriver()
  {
      this.Agr.drivers.push(new DriverModel());

      setTimeout(() => {
          this.drivers.last.Open();
      }, 10);
  }

    DeleteDriver(index)
    {
      this.Agr.drivers.splice(index,1);
    }

    ConfirmDriversData()
    {
      let result = [];
      let isError = false;
      this.drivers.forEach(item => {
          const data = item.GetData();
          if(!data)
          {
              isError = true;
              item.Open();
          }
          else{
              result.push(data);
          }
      });

      if(isError)
      {
          return;
      }
      
      this.Agr.drivers = result;
      this.ShowDriversModal = false;
    }

    ConfirmOwnerData()
    {
      const data = this.owner.GetData();
      if(!data)
      {
        return;
      }

      this.Agr.owner = data;
      this.ShowOwnerModal = false;
    }

    ConfirmInsurerData()
    {
      const data = this.insurer.GetData();
      if(!data)
      {
        return;
      }

      this.Agr.insurer = data;
      this.ShowInsurerModal = false;
    }
  
}