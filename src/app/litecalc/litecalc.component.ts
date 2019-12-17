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
    ShowModal = false;

    ModalText = "";
    constructor(private _main: MainService, private _sanitize: DomSanitizer)
    {
        
    }
    ngOnInit(): void {
        this.IsLoading = true;
        this.SkData = this._main.Copy(this._main.SkEnum) as any;
        let skdata = this._main.Copy(this._main.SkEnum) as any;
        this.GenerateModalText();
        this._main.LiteCalculation(res => {
            
            let result = {} as any;
            if(res && res.calculations &&  res.calculations.results.length > 0)
            {
                for(const item of res.calculations.results)
                {
                    if(skdata[item.sk])
                    {
                        result[item.sk] = this._main.Copy(skdata[item.sk]);
                        result[item.sk].total = Math.round(item.total * 0.6);

                        result[item.sk].base_rate = item.total;
                    }
                }
                this.IsLoading = false;
            }

            this.SkData = result;

            
        }, err => {console.log(err)})
    }

    Navigate()
    {
        this.ShowModal = false;
        this._main.Navigate(['/docs'])
    }

    GenerateModalText()
    {
        const agr = this._main.Copy(this._main.Agreement) as AgreementModel;
        let text = "";

        if(agr.vehicle)
        {
            text += "<p class=\"modal__text\">Автомобиль: <strong>" + agr.vehicle.brand + " " + agr.vehicle.model + ", " + agr.vehicle.power + "</strong></p>";
        }

        if(agr.drivers && agr.drivers.length > 0)
        {
            const age = (agr.drivers[0].age ? agr.drivers[0].age : this.GetAge(agr.drivers[0].birthdate));
            const age_str = age + " " + ((age % 10 == 0 || age % 10 > 4) ? "лет": "года") + ", ";
            const exp_str = agr.drivers[0].exp + " " + ((age % 10 == 0 || age % 10 > 4)? "лет": "года") + " стажа"
            text += "<p class=\"modal__text\">Водитель: <strong>" 
                + agr.drivers[0].lastname + " "  
                + agr.drivers[0].firstname + " " 
                + age_str
                + exp_str
                + "</strong></p>"
        }

        if(agr.owner.city)
        {
            this._main.GetAddrByKladr(agr.owner.city, 
                (res) => {

                    text += "<p class=\"modal__text\">Город регистрации собственника: <strong>" + res[0].value +"</stron></p>";
                    text += "<p class=\"modal__text\">Персональный коэф. безаварийности (КБМ): <span>Неизвестно (необходим точный расчет)</span></p>";
                    this.ModalText = text;
                })
        }
        else{
            text += "<p class=\"modal__text\">Персональный коэф. безаварийности (КБМ): <span>Неизвестно (необходим точный расчет)</span></p>";
            this.ModalText = text;
        }

    }


    GetAge(str:string)
    {
        let diff  = Date.now() - new Date(str).getTime()

        const age = new Date(diff);

        return Math.abs(age.getUTCFullYear() - 1970);
    }
  
  }
  