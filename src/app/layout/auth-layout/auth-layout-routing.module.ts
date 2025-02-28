import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutPage } from './auth-layout.page';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./../../features/auth/auth.module').then(m => m.AuthPageModule)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthLayoutPageRoutingModule {}
