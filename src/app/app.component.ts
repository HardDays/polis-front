import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from './core/services/main.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass','./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private _location: Location, private _main: MainService)
  {
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  
  GoBack()
  {
      this._location.back();
  }
}
