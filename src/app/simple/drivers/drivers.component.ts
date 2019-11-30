import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';
import { Router } from '@angular/router';

@Component({
    selector: 'drivers-cmp',
    templateUrl: './drivers.component.html'
})

export class DriversComponent implements OnInit {
    Selected = 1;
    constructor(protected service: SimpleService, protected router: Router)
    {
        
    }
    ngOnInit(): void {
    }

    Next()
    {
        this.service.DriversCount = this.Selected;
        this.router.navigate(['simple', 'is_owner']);
    }
}