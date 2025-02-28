import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',  // La ruta principal no debe redirigir automáticamente
    loadChildren: () => import('./layout/main-layout/main-layout.module').then(m => m.MainLayoutPageModule)
  },
  {
    path: 'auth',  // La ruta principal no debe redirigir automáticamente
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./features/home/home.module').then(m => m.HomePageModule)
  // },
  {
    path: '**',  // La ruta de comodín debe ir al final
    redirectTo: 'home',
    pathMatch: 'full'
  }
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
