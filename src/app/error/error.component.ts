import { Component, ViewChild, OnInit, ViewChildren, QueryList } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { AgreementModel, DriverModel } from '../core/models/agreement.model';
import { SimpleCarComponent } from '../input_modules/car/simple/simple.component';

@Component({
  selector: 'app-error-cmp',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{


    constructor(private _main: MainService)
    {
    }

    ngOnInit(): void {
    }

}