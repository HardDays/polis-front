import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';

@Component({
    selector: 'final-cmp',
    templateUrl: './final.component.html'
})

export class FinalComponent implements OnInit {
    
    Companies = [];
    CalculateFull = {
        "from" : 0,
        "to" : 0
    };

    constructor(protected service: SimpleService)
    {

    }

    ngOnInit(): void 
    {
        this.service.CalculateFull(
            res => {
                this.CalculateFull.to = Math.round(res.calculation.premium);
                this.CalculateFull.from = Math.round(res.calculation.coeffs.S_min);
                let avg: number = Math.round((this.CalculateFull.from + this.CalculateFull.to)/2);
                this.Companies = this.service.Companies;
                for(let cmp of this.Companies)
                {
                    this.service.CalculateCompany(cmp.code,
                        (res) => {
                            cmp.data = Math.round(res.premium) + ' р.';
                            // console.log(res);
                        },
                        (err) => {
                            const body = JSON.parse(err._body);

                            if(body.detail)
                            {
                                cmp.data = "от " + this.CalculateFull.from
                            }
                            else if(body.error)
                            {
                                const arr = body.error.split(":");
                                if(arr[arr.length - 1 ] == " 500")
                                    cmp.data = this.CalculateFull.to;
                                else {
                                    cmp.data = avg;
                                }
                            }
                            else{
                                cmp.data = this.CalculateFull.to;
                            }
                            cmp.data += " р.";
                            // console.log(res);
                        });
                }
                // console.log(res);
            }
        )
    }
}