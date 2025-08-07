import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeIndependentPageRoutingModule } from './employee-independent-routing.module';

import { EmployeeIndependentPage } from './employee-independent.page';
import { EmployeeComponentsModule } from '../components/employee-components.module';
import { ServicesComponentsModule } from '../../services/components/services-components.module';
import { AddressComponentsPageModule } from '../../address/components/address-components.module';
import { ProviderComponentsPageModule } from '../../provider/components/provider-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeIndependentPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeComponentsModule,
    ServicesComponentsModule,
    AddressComponentsPageModule,
    ProviderComponentsPageModule
  ],
  declarations: [EmployeeIndependentPage]
})
export class EmployeeIndependentPageModule {}
