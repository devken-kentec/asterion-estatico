import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimentoFinanceiroDespesa } from '../../domain/movimento-financeiro.domain';

@Injectable({
  providedIn: 'root'
})
export class MovimentoFinanceiroDespesaService {

  private readonly api = `${environment.api}/asterion/api/v1/movimentoFinanceiro`;
  private http = inject(HttpClient);

  constructor() { }

  public listarMovimentoFinanceiroDespesa(): Observable<MovimentoFinanceiroDespesa[]> {
    return this.http.get<MovimentoFinanceiroDespesa[]>(`${this.api}/listaDespesa`);
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

  public buscaAvancadaDespesa(dataInicial: string, dataFinal: string): Observable<MovimentoFinanceiroDespesa[]> {

    const httpParams = new HttpParams()
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal);

    const url = this.api + "/buscarDespesa?" + httpParams;

    return this.http.get<MovimentoFinanceiroDespesa[]>(url);
  }
}
