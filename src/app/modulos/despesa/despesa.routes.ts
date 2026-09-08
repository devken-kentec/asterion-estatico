import { Routes } from "@angular/router";

export const despesaRoutes: Routes = [
   { path: '', title: 'Listar Despesas', loadComponent: () => import('./despesa-list/despesa-list.component').then((m) => m.DespesaListComponent) },
   { path: 'editar/:id', title: 'Editar Despesa', loadComponent: ()=> import('./despesa-form/despesa-form.component').then((p)=> p.DespesaFormComponent)},
   { path: 'new', title: 'Despesa', loadComponent: () => import('./despesa-form/despesa-form.component').then((m) => m.DespesaFormComponent) }
];