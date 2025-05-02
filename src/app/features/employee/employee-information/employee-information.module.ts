import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeInformationPageRoutingModule } from './employee-information-routing.module';

import { EmployeeInformationPage } from './employee-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeInformationPageRoutingModule
  ],
  declarations: [EmployeeInformationPage]
})
export class EmployeeInformationPageModule {}
