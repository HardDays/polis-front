import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';

@Component({
  selector: 'app-passport-cmp',
  templateUrl: './passport.component.html'
})
export class PassportComponent implements OnInit{

  constructor(private _main: MainService)
  {
  }
  ngOnInit(): void {
  }
  
  Navigate()
  {
      this._main.Navigate(['/full','owner']);
  }
}