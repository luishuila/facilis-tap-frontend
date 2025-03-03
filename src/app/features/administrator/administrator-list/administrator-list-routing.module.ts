import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorListPage } from './administrator-list.page';

const routes: Routes = [
  {
    path: '',
    component: AdministratorListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorListPageRoutingModule {}
