import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private baseUrl = `${environment.NG_APP_API_URL}/api/reportes`;

  constructor(private http: HttpClient) {}

  crear(data: any): Observable<any> {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    return this.http.post(this.baseUrl, formData);
  }

  // Nuevo método para obtener todos los reportes
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

    // Actualizacion: actualizar estado de un reporte / JF
  actualizarEstado(id: number, estado: string): Observable<any> {
    const params = new HttpParams().set('estado', estado);
    return this.http.patch<any>(`${this.baseUrl}/${id}/estado`, null, { params });
  }

  // mejora: obtener un reporte por ID (para "ver estado de mi reporte") //JF
getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

}
