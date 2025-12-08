import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../reportes.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ver',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './ver.html',
  styleUrls: ['./ver.scss']   // 👈 AQUÍ enlazamos los estilos
})
export class VerComponent implements OnInit {
  reportes: any[] = [];
  cargando = false;
  error: string | null = null;

  apiBaseUrl = environment.NG_APP_API_URL;

  constructor(private api: ReportesService, private router: Router) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.cargando = true;
    this.api.getAll().subscribe({
      next: data => {
        this.reportes = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los reportes';
        this.cargando = false;
      },
    });
  }

  irAInicio(): void {
    this.router.navigate(['/']);
  }

  handleImgError(event: any): void {
    event.target.style.display = 'none';
  }

  // mejora: llamar al backend para cambiar estado / JF
  cambiarEstado(reporte: any, estado: string): void {
    this.api.actualizarEstado(reporte.id, estado).subscribe({
      next: (actualizado) => {
        reporte.estado = actualizado.estado;
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar el estado del reporte');
      },
    });
  }

  // mejora: clase CSS según el estado / JF
  estadoClase(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'estado estado-pendiente';
      case 'EJECUCION':
        return 'estado estado-ejecucion';
      case 'FINALIZADO':
        return 'estado estado-finalizado';
      default:
        return 'estado estado-recibido';
    }
  }

  // mejora: texto amigable según el estado / JF
  etiquetaEstado(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'Pendiente de autorización';
      case 'EJECUCION':
        return 'En ejecución';
      case 'FINALIZADO':
        return 'Finalizado';
      default:
        return 'Recibido';
    }
  }
}
