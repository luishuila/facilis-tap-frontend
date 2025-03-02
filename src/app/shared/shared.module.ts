import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule } from '@angular/core';

// import { SwiperModule } from 'swiper/angular';

import { SwiperComponent } from './components/swiper/swiper.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { IonicModule } from '@ionic/angular';
import { MapsComponent } from './components/maps/maps.component';
import { BtnComponent } from './components/btn/btn.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputDateComponent } from './components/input-date/input-date.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';
import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  imports: [
      IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    SwiperComponent,
    CardComponent,
     MapsComponent,
     BtnComponent,
      InputComponent,
      InputDateComponent,
      InputRadioComponent,
      InputTextareaComponent,
      SelectComponent
    ],
      
  exports:[ SwiperComponent,
    CardComponent, 
    MapsComponent,
    BtnComponent,
    InputComponent,
    InputDateComponent, 
    InputRadioComponent,
    InputTextareaComponent,
    SelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedPageModule {}


