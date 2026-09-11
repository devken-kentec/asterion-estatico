import { Routes } from '@angular/router';

export const loginRoutes: Routes = [
   { path: '', title: 'Login', loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent) }  
];