import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { FormGroup } from '@angular/forms';
import { OwnerModel } from '../core/models/agreement.model';

@Component({
  selector: 'app-offers-cmp',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit{

  SkData = {} as any;
  Total = 9;
  Processed = 0;
  IsLoading = true;

  SuccessNum = 0;
  InsurerData = null as OwnerModel;

  Timer = null;

  TimeForProcess = 180;
  TimerLabel = "3:00";

  constructor(private _main: MainService)
  {
  }
  ngOnInit(): void {
    this.InsurerData = this._main.Copy(this._main.Agreement.insurerIsOwner ? this._main.Agreement.owner : this._main.Agreement.insurer) as OwnerModel;
    this.SkData = this._main.Copy(this._main.SkEnum) as any;
    this.Total = Object.keys(this.SkData).length;
    this.Processed = 0;
    this.IsLoading = true;
    this.Timer = setInterval(()=> this.ProcessTimer(), 1000)
    for(const i in this.SkData)
    {
      this.SkData[i].status = 'loading';

      this._main.GetOffer(this.SkData[i].id,
        (res) => {
          if(res)
          {
            if(res.errors.length > 0)
            {
              this.SkData[i].status = 'error';
            }
            else if (res.results.length > 0)
            {
              this.SkData[i].total = Math.round(res.results[0].total);
              this.SkData[i].eId = res.results[0].eId;
              this.SkData[i].status = 'ok';
            }
          }
          this.CheckProcessed();
        },
        (err) => {
          this.SkData[i].status = 'error';
          this.CheckProcessed();
        })
    }
  }
  
  Navigate(Sk)
  {
    if(Sk && Sk.status == 'ok')
    {
      this._main.ChoseOffer(Sk);
      this._main.Navigate(['/full', 'offer']);
    }
    
  }

  Save()
  {
      // this._main.Navigate(['/full', 'offer']);
  }

  CheckProcessed()
  {
    this.Processed += 1;
    if(this.Processed == this.Total)
    {
      this.IsLoading = false;
      clearInterval(this.Timer);
      let res = [];

      for(const i in this.SkData)
      {
        if(this.SkData[i].status == 'ok')
        {
          res.push(this.SkData[i]);
        }
      }

      this.SuccessNum = res.length;
    }
  }

  ProcessTimer()
  {
    this.TimeForProcess -= 1;
    let time = this.TimeForProcess;
    let minute = 0;

    while(time >= 60)
    {
      minute += 1;
      time -= 60;
    }

    let seconds = time;
    this.TimerLabel = minute + ":" + (seconds < 10 ? "0" : "") + seconds;
    
  }
}