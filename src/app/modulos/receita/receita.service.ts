import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DescricaoReceita } from '../../domain/descricao-receita.domain';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private readonly api = `${environment.api}/asterion/api/v1/descricaoReceita`;
  private http = inject(HttpClient);
  
  constructor() { }

  public listarReceita(): Observable<DescricaoReceita[]> {
    return this.http.get<DescricaoReceita[]>(`${this.api}/receitaAtiva`);
  }
}
