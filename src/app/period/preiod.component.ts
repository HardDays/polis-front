import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Validator } from '../core/base/field.validator';
import { PeriodModel } from '../core/models/period.model';
import { DictsService } from '../core/services/dicts.service';


@Component({
  selector: 'period-cmp',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit
{
    Periods: PeriodModel[] = [];
    FormData = {
        "insurance_period": 8,
        "valid_from": this.ParseDate(this.AddDays(new Date(),3 )),
        "valid_to": this.ParseDate(this.AddDays(this.AddDays(new Date(),3 ), 365))
    };
    constructor(private dicts: DictsService) 
    {
        
    }
    ngOnInit() 
    {
        // this.cdr.detectChanges();
        this.UpdatePeriodsDicts();

    }

    SetData(data)
    {
        this.FormData = data ? JSON.parse(data) : {
            "insurance_period": 8,
            "valid_from": this.ParseDate(this.AddDays(new Date(),3 )),
            "valid_to": this.ParseDate(this.AddDays(this.AddDays(new Date(),3 ), 365))
        };;
    }

    GetData()
    {
        return this.FormData;
    }

    UpdatePeriodsDicts()
    {
        this.Periods = [];
        this.dicts.GetPeriodDics(
            (res: PeriodModel[]) => 
            {
                this.Periods = res;
                // console.log(res);
            },
            (err) => {
                console.log(err);
            }
        )
    }

    AddDays(date: Date, days: number): Date
    {
        date.setDate(date.getDate() + days);
        return date;
    }

    AddMonths(date: Date, months: number):Date
    {
        date.setMonth(date.getMonth() + months);
        return date;
    }

    PeriodChanges($event)
    {
        const period = this.Periods.find((obj)=> obj.id == $event);
        this.FormData.insurance_period = $event;
        this.UpdateFinishDate();
    }

    UpdateFinishDate()
    {
        const period = this.Periods.find((obj)=> obj.id == this.FormData.insurance_period);
        let date = this.FormData.valid_from;
        this.FormData.valid_to = this.ParseDate(this.AddDays(this.AddMonths(new Date(date), period.month_count), -1));
        // console.log(period);
    }

    ParseDate(date: Date)
    {
        return date.toISOString().split("T")[0];
    }
}