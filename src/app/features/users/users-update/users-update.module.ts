import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersUpdatePageRoutingModule } from './users-update-routing.module';

import { UsersUpdatePage } from './users-update.page';
import { UpdateUsersInformationComponent } from '../components/update-users-information/update-users-information.component';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { UpdateUsersCredentialsComponent } from '../components/update-users-credentials/update-users-credentials.component';
import { AddressFormComponent } from '../../address/components/address-form/address-form.component';
import { UsersComponentsModule } from '../components/users-components.module';
import { AddressComponentsPageModule } from '../../address/components/address-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersUpdatePageRoutingModule,
    SharedPageModule,
    ReactiveFormsModule,
    UsersComponentsModule,
    AddressComponentsPageModule
  ],
  declarations: [UsersUpdatePage,

    ],
    exports:[]
})
export class UsersUpdatePageModule {}
