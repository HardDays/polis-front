import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { FormGroup } from '@angular/forms';
import { OwnerFormComponent } from '../input_modules/owner/owner.component';
import { AgreementModel, OwnerModel } from '../core/models/agreement.model';

@Component({
  selector: 'app-owner-cmp',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit{

  IsOwnerInsurer = 1;
  @ViewChild('owner', {static: false}) owner: OwnerFormComponent;
  Owner = new OwnerModel();
  constructor(private _main: MainService)
  {
    this.IsOwnerInsurer = this._main.Agreement.insurerIsOwner;

    this.Owner = this._main.Copy(this._main.Agreement.owner) as OwnerModel;
  }
  ngOnInit(): void {
  }
  
  Navigate()
  {
    //   this._main.Navigate(['/full','owner']);
  }

  Save()
  {
    const data = this.owner.GetData();
    if(!data)
    {
      return;
    }

    let agr = this._main.Copy(this._main.Agreement) as AgreementModel;
    agr.owner = data;
    this._main.SaveAgreement(agr,
      (res) => {
        let navigate = ['/full', 'check'];
        if(!this.IsOwnerInsurer)
        {
          navigate = ['/full', 'insurer'];
        }
        this._main.Navigate(navigate);
      },
      (err) => {
      })

    
  }
}