import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { AgreementModel } from '../models/agreement.model';


@Injectable()
export class SessionService
{
    private aggr_field = "agreement";
    private last_page = "page";
    constructor(public http: HttpService, private router: Router) 
    {
    }


    public SaveAgreement(aggr: AgreementModel)
    {
        localStorage.setItem(this.aggr_field, JSON.stringify(aggr));
    }

    public LoadAgreement(): AgreementModel
    {
        const aggr = localStorage.getItem(this.aggr_field);
        
        return aggr ? JSON.parse(aggr) : new AgreementModel();
    }

    public SavePage(Page: string)
    {
        localStorage.setItem(this.last_page, Page);
    }

    public LoadPage()
    {
        const page = localStorage.getItem(this.last_page);

        return page ? page : "start";
    }
}
