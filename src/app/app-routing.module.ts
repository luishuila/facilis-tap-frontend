import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',  
    loadChildren: () => import('./layout/main-layout/main-layout.module').then(m => m.MainLayoutPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'auth', 
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: '**',
    redirectTo: 'auth', 
    pathMatch: 'full'
  },
  {
    path: 'address',
    loadChildren: () => import('./features/address/address.module').then( m => m.AddressPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking',  // ✅ Cambiado a 'enabledBlocking' para mayor control
      onSameUrlNavigation: 'ignore',
      scrollPositionRestoration: 'enabled',
      
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
