import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorMenuPage } from './administrator-menu.page';

const routes: Routes = [
  {
    path: '',
    component: AdministratorMenuPage,
  },
  { 
    path: 'administrator-form',
    loadChildren: () => import('../administrator-form/administrator-form.module').then(m => m.AdministratorFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorMenuPageRoutingModule {}
