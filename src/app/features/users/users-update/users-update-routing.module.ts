import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersUpdatePage } from './users-update.page';

const routes: Routes = [
  {
    path: '',
    component: UsersUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersUpdatePageRoutingModule {}
