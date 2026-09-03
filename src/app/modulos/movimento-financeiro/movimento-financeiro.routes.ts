import { Routes } from "@angular/router";

export const movimentoFinanceiroRoutes: Routes = [
   { path: '', title: 'Listar Receitas', loadComponent: () => import('./movimento-financeiro-list/movimento-financeiro-list.component').then((m) => m.MovimentoFinanceiroListReceitaComponent) },
   { path: 'new', title: 'Movimento Financeiro', loadComponent: () => import('./movimento-financeiro-form/movimento-financeiro-form.component').then((m) => m.MovimentoFinanceiroFormComponent) }
];