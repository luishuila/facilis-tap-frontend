import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedPageModule } from 'src/app/shared/shared.module';
import { ProviderFormComponent } from './provider-form/provider-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPageModule,
    ReactiveFormsModule
  ],
  declarations: [ProviderFormComponent],
  exports:[ProviderFormComponent]
})
export class ProviderComponentsPageModule {}
