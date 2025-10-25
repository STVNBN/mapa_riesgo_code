import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment'; // ⬅️ importa environment

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width:720px;margin:48px auto;text-align:center">
      <h1>Reportes Urbanos</h1>

      <ng-container *ngIf="!(auth.isAuthenticated$ | async); else dentro">
        <p>Inicia sesión para continuar.</p>
        <button (click)="auth.loginWithRedirect()">Iniciar sesión</button>
      </ng-container>

      <ng-template #dentro>
        <p>Sesión iniciada ✅</p>
        <button (click)="logout()">Cerrar sesión</button>

        <hr />
        <button (click)="probar()">Probar /api/hola</button>
        <pre *ngIf="data">{{ data | json }}</pre>
      </ng-template>
    </div>
  `
})
export class AppComponent {
  data: any;
  readonly origin = window.location.origin;

  constructor(public auth: AuthService, private http: HttpClient) {}

  probar() {
    this.http.get(`${environment.NG_APP_API_URL}/api/hola`) // ⬅️ usa environment
      .subscribe({
        next: d => this.data = d,
        error: e => this.data = e
      });
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.origin } });
  }
}
