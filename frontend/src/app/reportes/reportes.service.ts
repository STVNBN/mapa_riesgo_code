import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private baseUrl = 'http://localhost:8080/api/reportes';

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
}
