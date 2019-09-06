import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TransportComponent } from './transport.component';

@NgModule({
  declarations: [
    TransportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    // AuthRoutingModule,
    // TextMaskModule
  ],
  exports:[
    TransportComponent
  ],
  providers: []
})
export class TransportModule {}