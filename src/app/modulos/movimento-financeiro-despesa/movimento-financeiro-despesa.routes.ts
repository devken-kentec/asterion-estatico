import { Routes } from "@angular/router";

export const movimentoFinanceiroDespRoutes: Routes = [
   { path: '', title: 'Listar Receitas', loadComponent: () => import('./movimento-financeiro-despesa-list/movimento-financeiro-despesa-list.component').then((m) => m.MovimentoFinanceiroDespesaListComponent) },
   { path: 'desp', title: 'Movimento Financeiro', loadComponent: () => import('./movimento-financeiro-despesa-form/movimento-financeiro-despesa.component').then((m) => m.MovimentoFinanceiroDespesaComponent) }
];