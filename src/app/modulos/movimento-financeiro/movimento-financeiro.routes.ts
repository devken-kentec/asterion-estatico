import { Routes } from "@angular/router";

export const movimentoFinanceiroRoutes: Routes = [
   { path: '', title: 'Lista Financeiro', loadComponent: () => import('./movimento-financeiro-list/movimento-financeiro-list.component').then((m) => m.MovimentoFinanceiroListComponent) },
   { path: 'new', title: 'Movimento Financeiro', loadComponent: () => import('./movimento-financeiro-form/movimento-financeiro-form.component').then((m) => m.MovimentoFinanceiroFormComponent) }
];