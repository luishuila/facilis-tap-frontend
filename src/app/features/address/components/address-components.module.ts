import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AddressFormComponent } from './address-form/address-form.component';
import { SharedPageModule } from 'src/app/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
        SharedPageModule,
        ReactiveFormsModule
  ],
  declarations: [AddressFormComponent],
  exports:[AddressFormComponent]
})
export class AddressComponentsPageModule {}
