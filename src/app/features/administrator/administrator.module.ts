import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorPageRoutingModule } from './administrator-routing.module';

import { AdministratorPage } from './administrator.page';
import { ProviderComponentsPageModule } from '../provider/components/provider-components.module';
import { EmployeeComponentsPageModule } from '../employee/components/employee-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorPageRoutingModule,
    ProviderComponentsPageModule,
    EmployeeComponentsPageModule
  ],
  declarations: [AdministratorPage]
})
export class AdministratorPageModule {}
