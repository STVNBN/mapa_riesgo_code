import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router'; // 👈 importa
import { CommonModule } from '@angular/common';
import { ReportesService } from '../reportes.service';

@Component({
  selector: 'app-ver',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],          // 👈 agrega
  templateUrl: './ver.html',
})
export class VerComponent implements OnInit {
  reportes: any[] = [];
  cargando = false;
  error: string | null = null;

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
}
