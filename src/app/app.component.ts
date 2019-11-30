import { Component, ViewChild, OnInit } from '@angular/core';
import { PeriodComponent } from './period/preiod.component';
import { TransportComponent } from './transport/transport.component';
import { PolicyholderComponent } from './policyholder/policyholder.component';
import { OwnerComponent } from './owner/owner.component';
import { DriversComponent } from './drivers/drivers.component';
import { MainService } from './core/services/main.service';
import { CompanyModel } from './core/models/company.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass','./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  
}
