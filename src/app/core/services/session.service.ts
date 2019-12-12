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
    private chosen_offer = "offer";
    constructor(public http: HttpService, private router: Router) 
    {
    }

    public SaveOffer(data: any)
    {
        localStorage.setItem(this.chosen_offer, JSON.stringify(data));
    }

    public LoadOffer()
    {
        const offer = localStorage.getItem(this.chosen_offer);

        return offer ? JSON.parse(offer) : {};
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

    public SavePage(Page: string[])
    {
        localStorage.setItem(this.last_page, JSON.stringify(Page));
    }

    public LoadPage()
    {
        const page = localStorage.getItem(this.last_page);

        let result = ["/prev", "start"];

        try{
            result = page ? JSON.parse(page) : ["/prev", "start"];
        }
        catch(err)
        {
            result = ["/prev", "start"]
        }
        return result;
    }
}
