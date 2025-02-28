import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomedosPage } from './homedos.page';

const routes: Routes = [
  {
    path: '',
    component: HomedosPage
  },
  {
    path: 'settings',
    loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomedosPageRoutingModule {}
