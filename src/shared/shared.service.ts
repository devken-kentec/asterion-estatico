import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Periodo } from "../app/domain/periodo.domain";
import { DescricaoReceita } from "../app/domain/descricao-receita.domain";
import { DescricaoDespesa } from "../app/domain/descricao-despesa.domain";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private readonly api = environment.api;
  private http = inject(HttpClient);
  private toastrService = inject(ToastrService);


  public comboboxPeriodoVigente() {
    return this.http.get<Periodo[]>(`${this.api}/asterion/api/v1/periodo/periodoVigente`);
  }

  public comboboxDescricaoReceita() {
    return this.http.get<DescricaoReceita[]>(`${this.api}/asterion/api/v1/descricaoReceita/receitaAtiva`);
  }

  public comboboxDescricaoDespesa() {
    return this.http.get<DescricaoDespesa[]>(`${this.api}/asterion/api/v1/descricaoDespesa/despesaAtiva`);
  }

  saveShow(mensagem: string, titulo: string){
    this.toastrService.success(mensagem, titulo);
  }

  removeShow(mensagem: string, titulo: string){
    this.toastrService.error(mensagem, titulo)
  }

  warningShow(mensagem: string, titulo: string){
    this.toastrService.warning(mensagem, titulo)
  }

}