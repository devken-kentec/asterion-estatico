import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
   { path: '', title: 'Home', loadComponent: () => import('./home-view/home-view.component').then((m) => m.HomeViewComponent) },  
];