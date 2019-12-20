import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgreementModel } from '../core/models/agreement.model';

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
  ShowModal = false;

  Phone = "";

  Form: FormGroup = new FormGroup({
    "code": new FormControl('',[
        Validators.required
    ]),
    "phone": new FormControl('',[])
  });

  get code()
  {
    return this.Form.get("code");
  }

  constructor(private _main: MainService)
  {
    this.Offer = this._main.Copy(this._main.Offer) as any;
    const agr = this._main.Copy(this._main.Agreement) as AgreementModel;

    this.Form.get('phone').patchValue(agr.phone.replace("+7", ""));
  }
  ngOnInit(): void {
    this.IsLoading = true;

    const data = {
      successUrl: window.location.origin + "/full/result",
      failUrl: window.location.origin + "/full/fail"
    };
    this.GetPaymentHandler(this.Offer.eId, data);
    
  }

  ConfirmPhone()
  {
    const data = this.Form.getRawValue()
    const params = {
      successUrl: window.location.origin + "/full/result",
      failUrl: window.location.origin + "/full/fail",
      smsCode: data.code
    };
    this.GetPaymentHandler(this.Offer.eId, params);
  }

  GetPaymentHandler(eId, data?)
  {
    this._main.GetPaymentUrl(eId, data,
      (res) => {
        if(res.results)
        {
          if(res.results.needSmsCode)
          {
            this.ShowModal = true;
          }
          else{
            this.Url = res.results;
            this.ButtonDisabled = false;
            this.ShowModal = false;
          }
        }
        else{
          this._main.Navigate(['/offers']);
        }
        this.IsLoading = false;
      },
      (err) => {
        this._main.Navigate(['/offers']);
        this.IsLoading = false;
      })  
  }
  
  Navigate()
  {
    this._main.Navigate(['/offers']);
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
      
      localStorage.setItem('payurl', this.Url);
      location.href = this.Url;

    }
  }
}