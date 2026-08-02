import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'movfin', loadChildren: () => import('./modulos/movimento-financeiro/movimento-financeiro.routes').then((m) => m.movimentoFinanceiroRoutes)},
];
