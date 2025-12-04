import { AuthService } from '@auth0/auth0-angular';

import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router'; // <-- Agrega esto
import { ReportesService } from '../reportes/reportes.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink], // <-- Agrega RouterLink aquí
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements AfterViewInit {

  // Modelo que mapea 1:1 con el backend
  model = {
    telefono: '',
    tipoDeReporte: '',
    descripcion: '',
    direccion: '',
    latitud: '',
    longitud: '',
  };

  foto: File | null = null;
  saving = false;

  // UI auxiliares
  coordenadas = '';
  private map!: L.Map;
  private marker?: L.Marker;

  constructor(private api: ReportesService, public auth: AuthService) {}

  ngAfterViewInit(): void {
    this.map = L.map('map', { center: [13.6929, -89.2182], zoom: 13 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      this.setLatLng(lat, lng);
      this.drawMarker(lat, lng);
    });

    setTimeout(() => this.map.invalidateSize(), 0);
  }

  private setLatLng(lat: number, lng: number) {
    this.model.latitud = lat.toString();
    this.model.longitud = lng.toString();
    this.coordenadas = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }

  private drawMarker(lat: number, lng: number) {
    if (this.marker) this.map.removeLayer(this.marker);
    this.marker = L.marker([lat, lng]).addTo(this.map);
  }

  centrarEnMiUbicacion(): void {
    if (!navigator.geolocation) {
      alert('Geolocalización no soportada por el navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const nextZoom = Math.max(this.map.getZoom() ?? 13, 16);
        this.map.setView([lat, lng], nextZoom);

        this.setLatLng(lat, lng);
        this.drawMarker(lat, lng);

        setTimeout(() => this.map.invalidateSize(), 0);
      },
      (err) => {
        let msg = `Error de geolocalización: ${err.message}`;
        if (err.code === 1) msg += ' (Permiso denegado)';
        if (err.code === 2) msg += ' (Posición no disponible)';
        if (err.code === 3) msg += ' (Tiempo de espera agotado)';
        alert(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  onTelefonoInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.model.telefono = input.value.replace(/[^0-9]/g, '').slice(0, 8);
  }

  onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    this.foto = input.files && input.files[0] ? input.files[0] : null;
  }

  limpiarFoto() {
    this.foto = null;
    const file = document.getElementById('foto') as HTMLInputElement | null;
    if (file) file.value = '';
  }

  guardar() {
    if (!this.model.tipoDeReporte || !this.model.descripcion) {
      alert('Completa tipo de reporte y descripción.');
      return;
    }
    if (!this.model.latitud || !this.model.longitud) {
      alert('Selecciona un punto en el mapa para capturar Lat/Lng.');
      return;
    }

    this.saving = true;
    this.api.crear({
      telefono: this.model.telefono,
      tipoDeReporte: this.model.tipoDeReporte,
      descripcion: this.model.descripcion,
      direccion: this.model.direccion,
      latitud: this.model.latitud,
      longitud: this.model.longitud,
      foto: this.foto
    }).subscribe({
      next: (r) => {
        this.saving = false;
        alert('✅ Reporte guardado con ID ' + r.id);
        this.model.tipoDeReporte = '';
        this.model.descripcion = '';
        this.model.direccion = '';
        this.model.latitud = '';
        this.model.longitud = '';
        this.coordenadas = '';
        this.limpiarFoto();
        if (this.marker) { this.map.removeLayer(this.marker); this.marker = undefined; }
      },
      error: (err) => {
        this.saving = false;
        console.error(err);
        alert('❌ Error al guardar: ' + (err?.error?.message || err.statusText || 'ver consola'));
      }
    });
  }

  logout() {
    localStorage.clear();
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin }
    });
  }
}
