import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {

    return this.auth.getAccessTokenSilently().pipe(
      map(token => {
        // Decode JWT payload manually
        const payload = JSON.parse(atob(token.split('.')[1]));

        const permissions = payload['permissions'] as string[] | undefined;

        const isAdmin =
          permissions?.includes('reportes:ver') || false;

        if (!isAdmin) {
          this.router.navigateByUrl('/');
          return false;
        }

        return true;
      })
    );
  }
}
