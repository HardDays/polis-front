import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-offer-cmp',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit{

  constructor(private _main: MainService)
  {
  }
  ngOnInit(): void {
  }
  
  Navigate()
  {
    this._main.Navigate(['/full', 'check']);
  }

  Save()
  {
      this._main.Navigate(['/full', 'check']);
  }
}