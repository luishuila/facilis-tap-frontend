import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule } from '@angular/core';

// import { SwiperModule } from 'swiper/angular';

import { FacCategoryComponent } from './components/fac-category/fac-category.component';
import { CommonModule } from '@angular/common';
import { FacCardComponent } from './components/fac-card/fac-card.component';
import { IonicModule } from '@ionic/angular';
import { MapsComponent } from './components/maps/maps.component';
import { FacBtnComponent } from './components/fac-btn/fac-btn.component';
import { FacInputComponent } from './components/fac-input/fac-input.component';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FacDateComponent } from './components/fac-date/fac-date.component';
import { FacRadioComponent } from './components/fac-radio/fac-radio.component';
import { FacTextareaComponent } from './components/fac-textarea/fac-textarea.component';
import { FacSelectComponent } from './components/fac-select/fac-select.component';
import { FacItemSlidingComponent } from './components/fac-item-sliding/fac-item-sliding.component';

import { FacItemListComponent } from './components/fac-item-list/fac-item-list.component';
import { FacModalSelectComponent } from './components/fac-modal-select/fac-modal-select.component';
import { FacSubCategoryComponent } from './components/fac-subcategory/fac-subcategory.component';
import { FacCheckboxComponent } from './components/fac-checkbox/fac-checkbox.component';
import { FacAvatarComponent } from './components/fac-avatar/fac-avatar.component';
@NgModule({
  imports: [
    
      IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    FacCategoryComponent,
    FacCardComponent,
     MapsComponent,
     FacBtnComponent,
     FacInputComponent,
      FacDateComponent,
      FacRadioComponent,
      FacTextareaComponent,
      FacSelectComponent,
      FacItemSlidingComponent,
      FacItemListComponent,
      FacModalSelectComponent,
      FacSubCategoryComponent,
      FacCheckboxComponent,
      FacAvatarComponent
    ],
      
  exports:[ 
    FacCategoryComponent,
    FacCardComponent, 
    MapsComponent,
    FacBtnComponent,
    FacInputComponent,
    FacDateComponent, 
    FacRadioComponent,
    FacTextareaComponent,
    FacSelectComponent,
    FacItemSlidingComponent,
    FacItemListComponent,
    FacModalSelectComponent,
    FacSubCategoryComponent,
    FacCheckboxComponent,
    FacAvatarComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FacInputComponent),
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedPageModule {}


