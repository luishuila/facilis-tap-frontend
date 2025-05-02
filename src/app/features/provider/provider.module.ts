import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderPageRoutingModule } from './provider-routing.module';

import { ProviderPage } from './provider.page';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { ProviderComponentsPageModule } from './components/provider-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderPageRoutingModule,
    SharedPageModule,
    ProviderComponentsPageModule
  ],
  declarations: [ProviderPage]
})
export class ProviderPageModule {}
