import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', canActivate: [authGuard], component: AppComponent },
  { path: '**', redirectTo: '' }
];
