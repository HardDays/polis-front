import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { FormGroup } from '@angular/forms';
import { OwnerFormComponent } from '../input_modules/owner/owner.component';
import { AgreementModel } from '../core/models/agreement.model';

@Component({
  selector: 'app-owner-cmp',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit{

  @ViewChild('owner', {static: false}) owner: OwnerFormComponent;
  constructor(private _main: MainService)
  {
  }
  ngOnInit(): void {
  }
  
  Navigate()
  {
    //   this._main.Navigate(['/full','owner']);
  }

  Save()
  {
    console.log('save');
    const data = this.owner.GetData();
    if(!data)
    {
      return;
    }

    let agr = this._main.Copy(this._main.Agreement) as AgreementModel;
    agr.owner = data;
    this._main.SaveAgreement(agr,
      (res) => {
        this._main.Navigate(['/full', 'check']);
      },
      (err) => {
        console.log(err);
      })

    
  }
}