import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-offers-cmp',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit{

  SkData = {} as any;
  constructor(private _main: MainService)
  {
  }
  ngOnInit(): void {
    this.SkData = this._main.Copy(this._main.SkEnum) as any;

    for(const i in this.SkData)
    {
      this.SkData[i].status = 'loading';

      this._main.GetOffer(this.SkData[i].id,
        (res) => {
          if(res)
          {
            console.log(res);
            if(res.errors.length > 0)
            {
              this.SkData[i].status = 'error';
            }
            else if (res.results.length > 0)
            {
              this.SkData[i].total = Math.round(res.results[0].total);
              this.SkData[i].eId = res.results[0].eId;
              this.SkData[i].status = 'ok';
            }
          }
        },
        (err) => {
          this.SkData[i].status = 'error';
          console.log(err);
        })
    }
  }
  
  Navigate(Sk)
  {
    this._main.Navigate(['/full', 'offer']);
  }

  Save()
  {
      this._main.Navigate(['/full', 'offer']);
  }
}