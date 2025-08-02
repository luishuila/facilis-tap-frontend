import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeIndependentPage } from './employee-independent.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeIndependentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeIndependentPageRoutingModule {}
