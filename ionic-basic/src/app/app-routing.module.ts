import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
            },
            {
    path: '',
    redirectTo: 'alumnos',
    pathMatch: 'full'
  },
  {
    path: 'alumnos',
    children: [
      {
        path:'',
        loadChildren: () => import('./alumnos/alumnos.module').then( m => m.AlumnosPageModule)
      },
      {
        path:':idAlumno',
        loadChildren: () => import('./alumnos/detalle-alumno/detalle-alumno.module').then( m => m.DetalleAlumnoPageModule)
      }
    ]
  },
  {
    path: 'recetas',
    loadChildren: () => import('./recetas/recetas.module').then( m => m.RecetasPageModule)
  },
  {
    path: 'detalle-receta',
    loadChildren: () => import('./detalle-receta/detalle-receta.module').then( m => m.DetalleRecetaPageModule)
  },
  {
    path: 'tabs', canActivate:[AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: ()=> import('./login/login.module').then(m=>m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: ()=> import('./register/register.module').then(m=>m.RegisterPageModule)
  },
  {
    path: 'admin', canActivate:[AuthGuard],
    loadChildren: ()=> import('./admin/admin.module').then(m=>m.AdminPageModule)
  },
{
  path:'destinos',canActivate:[AuthGuard],
  loadChildren: ()=> import('./destinos/destinos.module').then(m=>m.DestinosPageModule)
},
{
  path: 'galeria', canActivate:[AuthGuard],
    loadChildren: () => import('./galeria/galeria.module').then( m => m.GaleriaPageModule)
},
  {
    path: 'galeria',canActivate:[AuthGuard],
    loadChildren: () => import('./galeria/galeria.module').then( m => m.GaleriaPageModule)
  },
  {
    path: 'segment-button',
    loadChildren: () => import('./segment-button/segment-button.module').then( m => m.SegmentButtonPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
