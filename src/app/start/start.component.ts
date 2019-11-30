import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';

@Component({
    selector: 'app-start-cmp',
    templateUrl: './start.component.html'
  })
  export class StartComponent implements OnInit {
    CarNumber: string = "";

      constructor(private _main: MainService)
      {

      }
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    CheckCarNumber()
    {
        this._main.CheckCarByNumber({
            "number_plate": this.CarNumber
        },
        (res) => {
            this._main.Navigate("car");
        },
        (err) => {
        })
    }
    
  
  }
  