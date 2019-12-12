import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-offer-cmp',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit{

  Offer = {} as any;
  IsLoading = false;
  Url = '';
  ButtonDisabled = true;
  constructor(private _main: MainService)
  {
    this.Offer = this._main.Copy(this._main.Offer) as any;
  }
  ngOnInit(): void {
    this.IsLoading = true;
    this.GetPaymentHandler(this.Offer.eId)
    
  }

  GetPaymentHandler(eId, data?)
  {
    this._main.GetPaymentUrl(eId, 
      (res) => {
        if(res.results)
        {
          if(res.results.needSmsCode)
          {
            //TODO: Show Modal window
          }
          else{
            this.Url = res.results;
            this.ButtonDisabled = false;
          }
        }
        else{
          this._main.Navigate(['/offers']);
        }
        // console.log(res);
        this.IsLoading = false;
      },
      (err) => {
        this._main.Navigate(['/offers']);
        this.IsLoading = false;
      })  
  }
  
  Navigate()
  {
    this._main.Navigate(['/full', 'check']);
  }

  Save()
  {
      this._main.Navigate(['/full', 'check']);
  }

  GetUrl()
  {
    if(!this.IsLoading && !this.ButtonDisabled && this.Url)
    {
      this.IsLoading = true;
      location.href = this.Url;
    }
  }
}