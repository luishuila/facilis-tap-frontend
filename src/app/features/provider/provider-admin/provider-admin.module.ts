import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { UsersComponentsModule } from '../../users/components/users-components.module';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { AddressComponentsPageModule } from '../../address/components/address-components.module';
import { ProviderComponentsPageModule } from '../components/provider-components.module';
import { ServicesComponentsModule } from '../../services/components/services-components.module';
import { ProviderAdminPage } from './provider-admin.page';
import { ProviderAdminPageRoutingModule } from './provider-admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderAdminPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UsersComponentsModule,
    SharedPageModule,
    ReactiveFormsModule,
    AddressComponentsPageModule,
    ProviderComponentsPageModule,
    ServicesComponentsModule
  ],
  declarations: [ProviderAdminPage]
})
export class ProviderAdminPageModule { }
