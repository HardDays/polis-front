import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index.routing';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
  };

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IndexRoutingModule,
    SwiperModule
  ],
  providers: [ 
    {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class IndexModule {}