import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { VehicleModel, AgreementModel } from '../core/models/agreement.model';
import { IMyDpOptions } from 'mydatepicker';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-lite-calc-cmp',
    templateUrl: './litecalc.component.html',
    styleUrls: ['./litecalc.component.css']
  })
  export class LiteCalcComponent implements OnInit {
      SkData = {} as any;
      IsLoading = true;
    constructor(private _main: MainService, private _sanitize: DomSanitizer)
    {
        
    }
    ngOnInit(): void {
        this.IsLoading = true;
        this.SkData = this._main.Copy(this._main.SkEnum) as any;
        this._main.LiteCalculation(res => {
            console.log(res);
            let result = {} as any;
            if(res && res.calculations &&  res.calculations.results.length > 0)
            {
                for(const item of res.calculations.results)
                {
                    if(this.SkData[item.sk])
                    {
                        result[item.sk] = this._main.Copy(this.SkData[item.sk]);
                        result[item.sk].total = Math.round(item.total * 0.6);

                        result[item.sk].base_rate = item.total;
                    }
                }
                this.IsLoading = false;
            }

            this.SkData = result;

            
        }, err => {console.log(err)})
    }
  
  }
  