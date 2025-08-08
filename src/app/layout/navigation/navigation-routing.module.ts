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
        loadChildren: () => import('../../features/appointment/appointment.module').then(m => m.AppointmentPageModule)
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
        path: 'employee-information/:id',
        loadChildren: () => import('../../features/employee/employee-information/employee-information.module').then( m => m.EmployeeInformationPageModule)
      },
      {
        path: 'employee-information',
        loadChildren: () => import('../../features/employee/employee-information/employee-information.module').then( m => m.EmployeeInformationPageModule)
      },
      {
        path: 'employee-independent',
        loadChildren: () => import('../../features/employee/employee-independent/employee-independent.module').then( m => m.EmployeeIndependentPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../../features/administrator/administrator-menu/administrator-menu.module').then(m => m.AdministratorMenuPageModule)
      },
      {
        path: 'admin-edite/:id',
        loadChildren: () => import('../../features/administrator/administrator-menu/administrator-menu.module').then(m => m.AdministratorMenuPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../features/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('../../features/services/services.module').then(m => m.ServicesPageModule)
      },
      // {
      //   path: 'services',
      //   loadChildren: () => import('../../features/services/services.module').then(m => m.ServicesPageModule)
      // },

      {
        path: 'services/:id',
        loadChildren: () => import('../../features/services/services.module').then(m => m.ServicesPageModule)
      },
      {
        path: 'personalinformation',
        loadChildren: () => import('../../features/users/users-update/users-update.module').then( m => m.UsersUpdatePageModule)
      },
    
      {
        path: 'profile-services',
        loadChildren: () => import('../../features/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'profiles/:id',
        loadChildren: () => import('../../features/profile-users/profile-users.module').then( m => m.ProfileUsersPageModule)
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
