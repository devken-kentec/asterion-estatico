import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodo } from '../../domain/periodo.domain';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

   private readonly api = `${environment.api}/asterion/api/v1/periodo`;
   private http = inject(HttpClient);

  constructor() { }

  public listarPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(`${this.api}/todosPeriodo`);
  }
}