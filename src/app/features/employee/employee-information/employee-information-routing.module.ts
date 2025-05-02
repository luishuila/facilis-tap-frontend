import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeInformationPage } from './employee-information.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeInformationPageRoutingModule {}
