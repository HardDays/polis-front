import { Component, ViewChild, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { AgreementModel } from '../core/models/agreement.model';

@Component({
  selector: 'app-sum-cmp',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.css']
})
export class SumComponent implements OnInit{

    constructor(private _main: MainService)
    {
    }
    ngOnInit(): void {
    }

    Save()
    {
        this._main.Navigate(['/passport']);
        // if(this.Form.valid)
        // {
        //     const vals = this.Form.getRawValue();
        //     let agr = this._main.Copy(this._main.Agreement) as AgreementModel;
        //     agr.date = vals.date.date.year + "-" + vals.date.date.month + "-" + vals.date.date.day;  

        //     this._main.SaveAgreement(agr,(res) => {
        //         this._main.Navigate(['calc_lite']);
        //         // this._main.Navigate("ndrivers");
        //     },
        //     (err) => {
        //     })
        //     console.log(vals, agr);
        // }
    }
  
}