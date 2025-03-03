import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorFormPage } from './administrator-form.page';

const routes: Routes = [
  {
    path: '',
    component: AdministratorFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorFormPageRoutingModule {}
