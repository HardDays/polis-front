import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OwnerComponent } from './owner.component';

@NgModule({
  declarations: [
    OwnerComponent
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
    OwnerComponent
  ],
  providers: []
})
export class OwnerModule {}