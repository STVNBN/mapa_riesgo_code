import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';   // botón de volver al inicio //jf
import { ReportesService } from '../../reportes.service';


@Component({
  selector: 'app-estado-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],  // botón de volver al inicio (routerlink) //jf
  templateUrl: './estado.html',
  styleUrls: ['./estado.scss']
})
export class EstadoReporteComponent {

  idReporte!: number;
  resultado: any = null;
  cargando = false;
  error: string | null = null;

  constructor(private reportesService: ReportesService) {}

  buscarEstado() {
    if (!this.idReporte) {
      this.error = 'Ingrese un ID válido';
      return;
    }

    this.error = null;
    this.cargando = true;

    this.reportesService.getById(this.idReporte).subscribe({
      next: data => {
        this.resultado = data;
        this.cargando = false;
      },
      error: err => {
        this.error = 'No se encontró un reporte con ese ID';
        this.cargando = false;
        this.resultado = null;
      }
    });
  }

  // para mostrar chip coloreado
  obtenerClaseEstado(estado: string) {
    switch (estado) {
      case 'PENDIENTE': return 'estado estado-pendiente';
      case 'EJECUCION': return 'estado estado-ejecucion';
      case 'FINALIZADO': return 'estado estado-finalizado';
      default: return 'estado estado-recibido';
    }
  }

  // 👉 texto bonito para el chip
  formatearEstado(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'Pendiente de autorización';
      case 'EJECUCION':
        return 'En ejecución';
      case 'FINALIZADO':
        return 'Finalizado';
      case 'RECIBIDO':
        return 'Recibido';
      default:
        return estado;
    }
  }

  // 👉 mensaje explicativo debajo del estado
  obtenerMensajeEstado(estado: string): string {
    switch (estado) {
      case 'RECIBIDO':
        return 'Tu reporte ha sido recibido exitosamente.';
      case 'PENDIENTE':
        return 'Tu reporte está pendiente de ser autorizado.';
      case 'EJECUCION':
        return 'Tu reporte está siendo ejecutado.';
      case 'FINALIZADO':
        return 'Tu reporte ha sido finalizado.';
      default:
        return '';
    }
  }

  // 👉 icono por estado
  obtenerIconoEstado(estado: string): string {
    switch (estado) {
      case 'RECIBIDO':
        return '📬';
      case 'PENDIENTE':
        return '⏳';
      case 'EJECUCION':
        return '🚧';
      case 'FINALIZADO':
        return '✔️';
      default:
        return 'ℹ️';
    }
  }
}
