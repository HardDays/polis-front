import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgreementModel } from '../core/models/agreement.model';

@Component({
  selector: 'app-fail-cmp',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.css']
})
export class FailComponent implements OnInit{

  Offer = {} as any;
  IsLoading = false;
  Url = "";

  constructor(private _main: MainService)
  {
    this.Offer = this._main.Copy(this._main.Offer) as any;
    this.Url = localStorage.getItem('payurl');
    console.log(this.Url);
  }
  ngOnInit(): void {
  }

  Navigate()
  {
      location.href = this.Url;
  }
}