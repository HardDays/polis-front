import { Component, ViewChild, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { AgreementModel, DriverModel } from '../core/models/agreement.model';

export interface IKBM {
  kbm: string;
  factor: number;
  found: boolean;
}

@Component({
  selector: 'app-sum-cmp',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.css']
})
export class SumComponent implements OnInit{

  Drivers: any[] = [];
  Kbms = [] as IKBM[];

  AvgPrice = 0;

  TotalPrice = 0;
  Multi = false;
  constructor(private _main: MainService)
  {
    // this.GetAvgPrice();
    this.CheckKBM();
  }
  ngOnInit(): void {
  }

  Save()
  {
    let agr = this._main.Copy(this._main.Agreement) as AgreementModel;

    agr.drivers = this.Drivers.filter(obj => obj.selected);
    agr.multidrive = agr.drivers.length > 0 ? 0 : 1;
    // console.log(agr);
    this._main.SaveAgreement(agr,
      (res: AgreementModel) => {
        this._main.Navigate(['/passport']);
      },
      (err) => {
      })
    // 
  }

  CheckKBM()
  {
    const data = this._main.Copy(this._main.Agreement.drivers) as any[];

    if(data && data.length > 0)
    {
      this.Drivers = data;
      for(const i in this.Drivers)
      {
        this.Drivers[i].selected = true;
      }

      this._main.CheckKBM({drivers: this.Drivers, owner: {juridicalPerson: 0}},
        (res) => {
          if(res && res.results)
          {
            if(res.results.detail)
            {
              this.Kbms = res.results.detail;
            }
            else{
              this.Kbms = [];
              for(const i in this.Drivers)
              {
                this.Kbms.push({
                  kbm: res.results.kbm,
                  factor: res.results.factor,
                  found: res.results.found
                })
              }
            }

            this.GetAvgPrice();
          }
        },
        (err) => {
        })
    }
  }

  GetAvgPrice()
  {
    this._main.LiteCalculation(
      res => {
        let sum = 0;
        let count = 0;
        if(res && res.calculations)
        {
          res.calculations.results.forEach(element => {
            count += 1;
            sum += element.total;
          });
        }

        this.AvgPrice = count ? Math.round(sum / count) : 0;
        this.UpdateTotalPrice();
      },
      err => {
        this.UpdateTotalPrice();
      }
    )
  }

  

  Round(Val)
  {
    // console.log(Val);
    return Math.round(Val);
  }

  ChangeCheck(i,$event)
  {
    if(i === null)
    {
      this.Multi = $event;
      if(this.Multi)
      {
        this.Drivers.forEach(obj => obj.selected = false);
      }
      else
      {
        this.Drivers.forEach(obj => obj.selected = true);
      }
    }
    else{
      this.Drivers[i].selected = $event;

      const count = this.Drivers.filter(obj => obj.selected);
      this.Multi = count.length ? false : true;
    }
    this.UpdateTotalPrice();
    // console.log(i, $event);
  }

  UpdateTotalPrice()
  {
    const fl = this.Drivers.filter(obj => obj.selected);

    if(fl.length == 0)
    {
      this.TotalPrice = this.Round(this.AvgPrice * 1.8);
    }
    else{
      let max = 0;
      for(const i in this.Drivers)
      {
        if(this.Drivers[i].selected && this.Kbms[i])
        {
          max = this.Kbms[i].factor > max ? this.Kbms[i].factor : max;
        }
      }

      this.TotalPrice = this.Round(this.AvgPrice * max)
    }
  }
  
}