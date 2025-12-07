import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.NG_APP_API_URL;

  constructor(private http: HttpClient) {}

  getHola() {
    return this.http.get(`${this.baseUrl}/api/hola`);
  }
}
