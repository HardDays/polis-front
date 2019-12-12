import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { FormGroup } from '@angular/forms';
import { OwnerFormComponent } from '../input_modules/owner/owner.component';
import { AgreementModel, OwnerModel } from '../core/models/agreement.model';

@Component({
  selector: 'app-insurer-cmp',
  templateUrl: './insurer.component.html',
  styleUrls: ['./insurer.component.css']
})
export class InsurerComponent implements OnInit{

  IsOwnerInsurer = 1;
  @ViewChild('insurer', {static: false}) insurer: OwnerFormComponent;
  Insurer = new OwnerModel();
  constructor(private _main: MainService)
  {
    this.Insurer = this._main.Copy(this._main.Agreement.insurer) as OwnerModel;
  }
  ngOnInit(): void {
  }
  
  Navigate()
  {
    //   this._main.Navigate(['/full','owner']);
  }

  Save()
  {
    const data = this.insurer.GetData();
    if(!data)
    {
      return;
    }

    let agr = this._main.Copy(this._main.Agreement) as AgreementModel;
    agr.insurer = data;
    this._main.SaveAgreement(agr,
      (res) => {
        let navigate = ['/full', 'check'];
        this._main.Navigate(navigate);
      },
      (err) => {
      })

    
  }
}