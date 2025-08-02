import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorPageRoutingModule } from './administrator-routing.module';

import { AdministratorPage } from './administrator.page';
import { ProviderComponentsPageModule } from '../provider/components/provider-components.module';
import { EmployeeComponentsModule } from '../employee/components/employee-components.module';
import { ServicesComponentsModule } from '../services/components/services-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorPageRoutingModule,
    ProviderComponentsPageModule,
    EmployeeComponentsModule,
    ServicesComponentsModule
  ],
  declarations: [AdministratorPage]
})
export class AdministratorPageModule {}
