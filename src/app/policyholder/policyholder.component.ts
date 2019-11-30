import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DictsService } from '../core/services/dicts.service';
import { CarModel } from '../core/models/car.model';
import { CarService } from '../core/services/car.service';
import { PolicyholderModel, CredentialModel, AddressModel, ContactModel } from '../core/models/policyholder.model';


@Component({
  selector: 'policyholder-cmp',
  templateUrl: './policyholder.component.html',
  styleUrls: ['./policyholder.component.css']
})
export class PolicyholderComponent implements OnInit
{
    Model: PolicyholderModel = new PolicyholderModel();
    AddressesEquals = true;

    constructor(private dicts: DictsService, private cars: CarService) 
    {
        // if(!this.Model.credential)
        // {
        //     this.Model.credential = [
        //         new CredentialModel("RUSSIAN_INTERNAL_PASSPORT")
        //     ];
        // }

        // if(!this.Model.address)
        // {
        //     this.Model.address = [
        //         new AddressModel('','LEGAL_ADDRESS'),
        //         new AddressModel('', 'ACTUAL_ADDRESS')
        //     ];
        // }

        // if(!this.Model.contact)
        // {
        //     this.Model.contact = [
        //         new ContactModel('PHONE'),
        //         new ContactModel('EMAIL')
        //     ];
        // }
    }

    SetData(data)
    {
        this.Model = data ? JSON.parse(data) : new PolicyholderModel();
    }

    GetData()
    {
        return this.Model;
    }
    ngOnInit() 
    {
    }

    AddressChanged($event)
    {
        this.Model.address[0].address_query = $event;
        if(this.AddressesEquals)
            this.Model.address[1].address_query = $event;
    }
}