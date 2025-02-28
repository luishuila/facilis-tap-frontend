import { NgModule } from '@angular/core';

// import { SwiperModule } from 'swiper/angular';

import { SwiperComponent } from './components/swiper/swiper.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { IonicModule } from '@ionic/angular';
import { MapsComponent } from './components/maps/maps.component';
import { BtnComponent } from './components/btn/btn.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  imports: [
      IonicModule,
    CommonModule,
    
  ],
  declarations: [SwiperComponent,CardComponent, MapsComponent,BtnComponent,InputComponent],
  exports:[ SwiperComponent,CardComponent, MapsComponent,BtnComponent,InputComponent]
})
export class SharedPageModule {}


