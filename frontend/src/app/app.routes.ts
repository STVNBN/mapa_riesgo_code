import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./mapa/mapa.component').then(m => m.MapaComponent)
  },

  // Ruta para generar reporte (solo requiere estar autenticado)
  {
    path: 'generar-reporte',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./mapa/mapa.component').then(m => m.MapaComponent)
  },

  // Ruta "Ver Reportes" — SOLO ADMIN (requiere permiso reportes:ver)
  {
    path: 'ver-reportes',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./reportes/ver/ver.component').then(v => v.VerComponent)
  },

  // Consultar estado del reporte (público)
  {
    path: 'estado-reporte',
    loadComponent: () =>
      import('./reportes/ver/estado/estado.component')
        .then(m => m.EstadoReporteComponent)
  },

  // Fallback
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
