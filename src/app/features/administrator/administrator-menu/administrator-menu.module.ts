import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorMenuPageRoutingModule } from './administrator-menu-routing.module';

import { AdministratorMenuPage } from './administrator-menu.page';
import { UsersComponentsModule } from '../../users/components/users-components.module';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { AddressComponentsPageModule } from '../../address/components/address-components.module';
import { ProviderComponentsPageModule } from '../../provider/components/provider-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorMenuPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UsersComponentsModule,
    SharedPageModule,
    ReactiveFormsModule,
    AddressComponentsPageModule,
    ProviderComponentsPageModule
  ],
  declarations: [AdministratorMenuPage]
})
export class AdministratorMenuPageModule { }
