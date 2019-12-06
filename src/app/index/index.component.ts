import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-cmp',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit{

    Index = 0;
  constructor()
  {
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");

    setInterval(() => {
        this.Index = this.Index < 3 ? this.Index + 1 : 0;
    }, 2000);
  }
  
}