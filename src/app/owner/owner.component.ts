import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DictsService } from '../core/services/dicts.service';
import { CarModel } from '../core/models/car.model';
import { CarService } from '../core/services/car.service';
import { PolicyholderModel, CredentialModel, AddressModel, ContactModel } from '../core/models/policyholder.model';


@Component({
  selector: 'owner-cmp',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit
{
    IsOwnerEqualPolicyholder = true;
    Owner: PolicyholderModel = new PolicyholderModel();
    AddressesEquals = true;

    constructor(private dicts: DictsService, private cars: CarService) 
    {
        // if(!this.Owner.credential)
        // {
        //     this.Owner.credential = [
        //         new CredentialModel("RUSSIAN_INTERNAL_PASSPORT")
        //     ];
        // }

        // if(!this.Owner.address)
        // {
        //     this.Owner.address = [
        //         new AddressModel('','LEGAL_ADDRESS'),
        //         new AddressModel('', 'ACTUAL_ADDRESS')
        //     ];
        // }

        // if(!this.Owner.contact)
        // {
        //     this.Owner.contact = [
        //         new ContactModel('PHONE'),
        //         new ContactModel('EMAIL')
        //     ];
        // }
    }
    ngOnInit() 
    {
    }

    SetData(data)
    {
        this.Owner = data ? JSON.parse(data) : new PolicyholderModel();
    }

    GetData()
    {
        return this.Owner;
    }

    AddressChanged($event)
    {
        this.Owner.address[0].address_query = $event;
        if(this.AddressesEquals)
            this.Owner.address[1].address_query = $event;
    }
}