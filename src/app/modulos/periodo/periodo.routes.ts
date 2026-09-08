import { Routes } from "@angular/router";

export const periodoRoutes: Routes = [
   { path: '', title: 'Listar Periodos', loadComponent: () => import('./periodo-list/periodo-list.component').then((m) => m.PeriodoListComponent) },
   { path: 'editar/:id', title: 'Editar Periódo', loadComponent: ()=> import('./periodo-form/periodo-form.component').then((p)=> p.PeriodoFormComponent)},
   { path: 'new', title: 'Periodo', loadComponent: () => import('./periodo-form/periodo-form.component').then((m) => m.PeriodoFormComponent) }
];