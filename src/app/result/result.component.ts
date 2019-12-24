import { Component,  OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';

@Component({
  selector: 'app-result-cmp',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{

  Offer = {} as any;

  Email = '';
  IsLoading = false;
  IsSuccess = false;
  IsError = false;
  

  QueryTimer = null;

  constructor(private _main: MainService)
  {
    this.IsLoading = true;
    this.Offer = this._main.Copy(this._main.Offer) as any;
    this.Email = this._main.Agreement.email;
    // console.log(JSON.stringify(this.Offer));
    this.CheckPaymentStatus();
    // console.log(window.location, document.URL);
    this.QueryTimer = setInterval(() => this.CheckPaymentStatus(), 15000);
  }
  ngOnInit(): void {

  }

  CheckPaymentStatus()
  {
    this._main.CheckPayment(this.Offer.eId, 
        (res) => {
            if(res && res.results)
            {
                const result = res.results;

                if(result.state == 2)
                {
                    this.SetError();
                }
                else if (result.state == 1)
                {
                    this.SetSuccess();
                }
            }
        },
        (err) => {
            console.log(err);
        })
  }

  SetError()
  {
    this.DeteleLoadingAndTimers();
    this.IsError = true;
  }

  SetSuccess()
  {
    this.DeteleLoadingAndTimers();
    this.IsSuccess = true;
  }

  DeteleLoadingAndTimers()
  {
      this.IsLoading = false;
      clearInterval(this.QueryTimer);
  }
}