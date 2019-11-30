import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel } from '../core/models/agreement.model';
import { IMyDpOptions } from 'mydatepicker';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-lite-calc-cmp',
    templateUrl: './litecalc.component.html'
  })
  export class LiteCalcComponent implements OnInit {
      SkData = {} as any;
    constructor(private _main: MainService, private _sanitize: DomSanitizer)
    {
        
    }
    ngOnInit(): void {
        this.SkData = this._main.Copy(this._main.SkEnum) as any;
        console.log('lite_calc');
        // throw new Error("Method not implemented.");
        this._main.LiteCalculation(res => {
            // console.log(res);
            if(res && res.calculations &&  res.calculations.results.length > 0)
            {
                for(const item of res.calculations.results)
                {
                    if(this.SkData[item.sk])
                        this.SkData[item.sk].total = item.total;
                }
            }
            // console.log(this.SkData);
        }, err => {console.log(err)})
    }
  
  }
  