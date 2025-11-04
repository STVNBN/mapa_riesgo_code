import { environment } from '../environments/environment';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAuth0, AuthHttpInterceptor } from '@auth0/auth0-angular';

const AUTH0_DOMAIN   = environment.NG_APP_AUTH0_DOMAIN;
const AUTH0_CLIENTID = environment.NG_APP_AUTH0_CLIENT_ID;
const AUTH0_AUDIENCE = environment.NG_APP_AUTH0_AUDIENCE;
const API_URL        = environment.NG_APP_API_URL;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },

    provideAuth0({
      domain: AUTH0_DOMAIN,
      clientId: AUTH0_CLIENTID,
      authorizationParams: {
        audience: AUTH0_AUDIENCE,
        redirect_uri: window.location.origin,
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${API_URL}/api/*`,
            tokenOptions: {
              authorizationParams: { audience: AUTH0_AUDIENCE }
            }
          }
        ]
      }
    }),
  ],
};
