import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../core/services/main.service';
import { AgreementModel } from '../core/models/agreement.model';

@Component({
    selector: 'app-start-cmp',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
  })
  export class StartComponent implements OnInit {
    IsLoading = false;
    Number: string = '';
    Region: string = '';

    @ViewChild("main", {static: true}) main : ElementRef;
    @ViewChild("region", {static: true}) region: ElementRef;

    // MainMask = [/u0430-u044f/, ' ', /\d/, /\d/, /\d/, ' ', /а-я/, /а-я/];
    MainMask = [/[УКЕНХВАРОСМТукенхваросмт]/, ' ', /\d/, /\d/, /\d/, ' ',/[УКЕНХВАРОСМТукенхваросмт]/,/[УКЕНХВАРОСМТукенхваросмт]/];
    MainReg = /^[а-яА-Я]\s\d\d\d\s[а-яА-Я][а-яА-Я]$/;

    RegionMask = [/\d/, /\d/, /\d|\s/];
    RegionReg = /^(\d){2}(\d|\u2000)$/

    IsError = false;

    constructor(private _main: MainService)
    {

    }
    ngOnInit(): void {
    }

    NumberChange($event)
    {
      this.Number = $event;

      if(this.MainReg.test(this.Number))
      {
        this.FocusRegion();
      }
    }

    RegionChange($event: string)
    {
      this.Region = $event;
    }

    RegionKeyPress($event)
    {
      if($event.key == "Backspace")
      {
        if(this.Region.length == 0)
        {
          this.FocusMain();
        }
      }
    }

    FocusMain()
    {
      this.main.nativeElement.focus();
    }

    FocusRegion()
    {
      this.region.nativeElement.focus();
    }

    CheckCarNumber()
    {
      this.IsError = false;
      if(!this.RegionReg.test(this.Region))
      {
        this.IsError = true;
        this.FocusRegion();
      }

      if(!this.MainReg.test(this.Number))
      {
        this.IsError = true;
        this.FocusMain();
      }

      if(this.IsError)
      {
        return;
      }
      let number = this._main.ReplaceAll(this.Number + this.Region, " ", "").toLowerCase();
      this._main.Agreement = new AgreementModel();
      number = this._main.ReplaceAll(number, '\u2000','');
      this.IsLoading = true;
        this._main.CheckCarByNumber({
            "number_plate": number
        },
        (res) => {
          this.IsLoading = false;
          this._main.Navigate(["/prev", "car"]);
        },
        (err) => {
          this.IsLoading = false;
        })
    }

    Navigate()
    {
      this._main.Agreement = new AgreementModel();
      this._main.Navigate(["/prev", "car"]);
    }
    
  
  }
  