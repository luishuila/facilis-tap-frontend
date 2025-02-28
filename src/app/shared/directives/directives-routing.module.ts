import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectivesPage } from './directives.page';

const routes: Routes = [
  {
    path: '',
    component: DirectivesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectivesPageRoutingModule {}
