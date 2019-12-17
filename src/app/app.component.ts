import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from './core/services/main.service';
import {Location} from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass','./app.component.css']
})
export class AppComponent implements OnInit{

  IsBlue = false;
  constructor(private _location: Location, private _main: MainService, private router: Router)
  {
    router.events.subscribe(
      (val) => {
        if(val instanceof NavigationEnd)
        {
          const url = val.url;

          if(url.indexOf("/prev") == 0 || url.indexOf("/full") == 0)
          {
            this.IsBlue = false;
          }
          else{
            this.IsBlue = true;
          }
        }
      }
    )
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  
  GoBack()
  {
      this._location.back();
  }
}
