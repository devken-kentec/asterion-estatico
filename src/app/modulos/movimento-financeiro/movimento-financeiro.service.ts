import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MovimentoFinanceiroDespesa, MovimentoFinanceiroReceita } from '../../domain/movimento-financeiro.domain';

@Injectable({
  providedIn: 'root'
})
export class MovimentoFinanceiroService {

  private readonly api = `${environment.api}/asterion/api/v1/movimentoFinanceiro`;
   private http = inject(HttpClient);

  constructor() { }

  public listarMovimentoFinanceiroReceita(): Observable<MovimentoFinanceiroReceita[]> {
    return this.http.get<MovimentoFinanceiroReceita[]>(`${this.api}/listaReceita`);
  }

    public listarMovimentoFinanceiroDespesa(): Observable<MovimentoFinanceiroDespesa[]> {
    return this.http.get<MovimentoFinanceiroDespesa[]>(`${this.api}/listaDespesa`);
  }

  public gravarMovimentoFinanceiroReceita(movimentoFinanceiro: MovimentoFinanceiroReceita): Observable<MovimentoFinanceiroReceita> {
    return this.http.post<MovimentoFinanceiroReceita>(`${this.api}/receita`, movimentoFinanceiro);
  }    
  
  public alterarMovimentoFinanceiroReceita(movimentoFinanceiro: MovimentoFinanceiroReceita): Observable<MovimentoFinanceiroReceita> {
    return this.http.put<MovimentoFinanceiroReceita>(`${this.api}/receita`, movimentoFinanceiro);
  } 

  public salvarReceita(movimentoFinanceiro: MovimentoFinanceiroReceita){
    if( movimentoFinanceiro.id !== null && movimentoFinanceiro.id > 0){
      console.log('Alterando Movimento Financeiro: ');
      return this.alterarMovimentoFinanceiroReceita(movimentoFinanceiro);
     
    } else {
      console.log('Gravando Movimento Financeiro: ');
      return this.gravarMovimentoFinanceiroReceita(movimentoFinanceiro);
    }
  }

  public gravarMovimentoFinanceiroDespesa(movimentoFinanceiro: MovimentoFinanceiroDespesa): Observable<MovimentoFinanceiroDespesa> {
    return this.http.post<MovimentoFinanceiroDespesa>(`${this.api}/despesa`, movimentoFinanceiro);
  }    
  
  public alterarMovimentoFinanceiroDespesa(movimentoFinanceiro: MovimentoFinanceiroDespesa): Observable<MovimentoFinanceiroDespesa> {
    return this.http.put<MovimentoFinanceiroDespesa>(`${this.api}/despesa`, movimentoFinanceiro);
  } 

  public salvarDespesa(movimentoFinanceiro: MovimentoFinanceiroDespesa){
    if( movimentoFinanceiro.id !== null && movimentoFinanceiro.id > 0){
      console.log('Alterando Movimento Financeiro: ');
      return this.alterarMovimentoFinanceiroDespesa(movimentoFinanceiro);
    } else {
      console.log('Gravando Movimento Financeiro: ');
      return this.gravarMovimentoFinanceiroDespesa(movimentoFinanceiro);
    }
  }

  public buscaAvancada(dataInicial: string, dataFinal: string): Observable<MovimentoFinanceiroReceita[]> {

    const httpParams = new HttpParams()
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal);

    const url = this.api + "/buscarReceita?" + httpParams;

    return this.http.get<MovimentoFinanceiroReceita[]>(url);
  }

  public buscaAvancadaDespesa(dataInicial: string, dataFinal: string): Observable<MovimentoFinanceiroDespesa[]> {

    const httpParams = new HttpParams()
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal);

    const url = this.api + "/buscarDespesa?" + httpParams;

    return this.http.get<MovimentoFinanceiroDespesa[]>(url);
  }
}
