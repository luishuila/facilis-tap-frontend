import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeIndependentPageRoutingModule } from './employee-independent-routing.module';

import { EmployeeIndependentPage } from './employee-independent.page';
import { EmployeeComponentsModule } from '../components/employee-components.module';
import { ServicesComponentsModule } from '../../services/components/services-components.module';

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
    ServicesComponentsModule
  ],
  declarations: [EmployeeIndependentPage]
})
export class EmployeeIndependentPageModule {}
