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
    }
  
}