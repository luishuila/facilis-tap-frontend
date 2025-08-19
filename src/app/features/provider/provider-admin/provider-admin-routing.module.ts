import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderAdminPage } from './provider-admin.page';



const routes: Routes = [
  {
    path: '',
    component: ProviderAdminPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderAdminPageRoutingModule {}
