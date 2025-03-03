import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorPage } from './administrator.page';

const routes: Routes = [
  {
    path: '',
    component: AdministratorPage
  },  {
    path: 'administrator-list',
    loadChildren: () => import('./administrator-list/administrator-list.module').then( m => m.AdministratorListPageModule)
  },
  {
    path: 'administrator-menu',
    loadChildren: () => import('./administrator-menu/administrator-menu.module').then( m => m.AdministratorMenuPageModule)
  },
  {
    path: 'administrator-form',
    loadChildren: () => import('./administrator-form/administrator-form.module').then( m => m.AdministratorFormPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorPageRoutingModule {}
