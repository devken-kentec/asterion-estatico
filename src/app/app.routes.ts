import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', title: 'Home', loadChildren: () => import('./modulos/home/home.routes').then((m) => m.homeRoutes) },
    { path: 'movfin', loadChildren: () => import('./modulos/movimento-financeiro/movimento-financeiro.routes').then((m) => m.movimentoFinanceiroRoutes)},
    { path: 'periodo', loadChildren: () => import('./modulos/periodo/periodo.routes').then((m) => m.periodoRoutes)},
    { path: 'despesa', loadChildren: () => import('./modulos/despesa/despesa.routes').then((m) => m.despesaRoutes)},
    { path: 'receita', loadChildren: () => import('./modulos/receita/receita.routes').then((m) => m.receitaRoutes)},
    { path: 'login', loadChildren: () => import('./modulos/login/login.routes').then((m) => m.loginRoutes)}
];
