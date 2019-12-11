import { Component, ViewChild, OnInit } from '@angular/core';
import { MainService } from '../core/services/main.service';

@Component({
  selector: 'app-docs-cmp',
  templateUrl: './docs.component.html'
})
export class DocsComponent implements OnInit{

  constructor(private _main: MainService)
  {
  }
  ngOnInit(): void {
  }

  Navigate()
  {
      this._main.Navigate(["/full"]);

  }
  
}