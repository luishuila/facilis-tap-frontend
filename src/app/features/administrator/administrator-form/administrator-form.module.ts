import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorFormPageRoutingModule } from './administrator-form-routing.module';

import { AdministratorFormPage } from './administrator-form.page';
import { UpdateUsersInformationComponent } from '../../users/components/update-users-information/update-users-information.component';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { UsersComponentsModule } from '../../users/components/users-components.module';
import { AddressComponentsPageModule } from '../../address/components/address-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorFormPageRoutingModule,
    UsersComponentsModule,
      SharedPageModule,
        ReactiveFormsModule,
        AddressComponentsPageModule
  ],
  declarations: [AdministratorFormPage]
})
export class AdministratorFormPageModule {}
