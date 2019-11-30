import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';
import { Router } from '@angular/router';

@Component({
    selector: 'is-owner-cmp',
    templateUrl: './is_owner.component.html'
})

export class IsOwnerComponent implements OnInit {
    constructor(protected service: SimpleService, protected router: Router)
    {
    }
    ngOnInit(): void {
    }

    Next(answer)
    {
        this.service.IsOwner = answer;
        // console.log(this.service.IsOwner);
        this.router.navigate(['simple', 'owner']);
    }
}