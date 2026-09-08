import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DescricaoDespesa } from '../../domain/descricao-despesa.domain';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private readonly api = `${environment.api}/asterion/api/v1/descricaoDespesa`;
  private http = inject(HttpClient);

  constructor() { }

    public listarDespesa(): Observable<DescricaoDespesa[]> {
      return this.http.get<DescricaoDespesa[]>(`${this.api}/despesaAtiva`);
    }
}
