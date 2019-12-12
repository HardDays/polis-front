import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { DcComponent } from './dc.component';
import { DcRoutingModule } from './dc.routing';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
  };

@NgModule({
  declarations: [
    DcComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DcRoutingModule,
    SwiperModule,
    TextMaskModule,
    MyDatePickerModule
  ],
  providers: [ 
    {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class DcModule {}