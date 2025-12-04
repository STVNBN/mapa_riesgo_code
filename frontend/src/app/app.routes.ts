import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./mapa/mapa.component').then(m => m.MapaComponent)
  },
  // ✅ Ruta para el botón "GR"
  {
    path: 'generar-reporte',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./mapa/mapa.component').then(m => m.MapaComponent)
  },
  {
    path: 'ver-reportes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./reportes/ver/ver.component').then(v => v.VerComponent)
  },

// mejora: Consultar estado del reporte (público, sin authGuard) //JF
  {
    path: 'estado-reporte',
    loadComponent: () =>
      import('./reportes/ver/estado/estado.component')
        .then(m => m.EstadoReporteComponent)
  },

  // Fallback
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
