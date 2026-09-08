import { Routes } from '@angular/router';

export const receitaRoutes: Routes = [
   { path: '', title: 'Listar Receitas', loadComponent: () => import('./receita-list/receita-list.component').then((m) => m.ReceitaListComponent) },
   { path: 'editar/:id', title: 'Editar Receita', loadComponent: ()=> import('./receita-form/receita-form.component').then((p)=> p.ReceitaFormComponent)},
   { path: 'new', title: 'Receita', loadComponent: () => import('./receita-form/receita-form.component').then((m) => m.ReceitaFormComponent) }
];