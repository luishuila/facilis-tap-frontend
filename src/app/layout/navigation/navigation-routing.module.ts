import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationPage } from './navigation.page';

const routes: Routes = [
  {
    path: '',
    component: NavigationPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../features/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../../features/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'quote',
        loadChildren: () => import('../../features/quote/quote.module').then(m => m.QuotePageModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('../../features/employee/employee.module').then(m => m.EmployeePageModule)
      },
      {
        path: 'provider',
        loadChildren: () => import('../../features/provider/provider.module').then(m => m.ProviderPageModule)
      },
      {
        path: 'administrator',
        loadChildren: () => import('../../features/administrator/administrator.module').then(m => m.AdministratorPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../../features/administrator/administrator-menu/administrator-menu.module').then(m => m.AdministratorMenuPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../features/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'personalinformation',
        loadChildren: () => import('../../features/users/users-update/users-update.module').then( m => m.UsersUpdatePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationPageRoutingModule {}
