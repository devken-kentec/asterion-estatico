import { Component, inject } from '@angular/core';
import { MovimentoFinanceiroDespesa, MovimentoFinanceiroReceita } from '../../../domain/movimento-financeiro.domain';
import { MovimentoFinanceiroService } from '../movimento-financeiro.service';
import { take } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movimento-financeiro-list-receita',
  imports: [
    RouterLink
  ],
  templateUrl: './movimento-financeiro-list.component.html',
  styleUrl: './movimento-financeiro-list.component.css',
  preserveWhitespaces: true
})
export class MovimentoFinanceiroListReceitaComponent {

  private movimentoFinanceiroService = inject(MovimentoFinanceiroService);

  public listaReceitas: MovimentoFinanceiroReceita[] = [];
  public listaDespesas: MovimentoFinanceiroDespesa[] = [];

  public mostrarListaReceita: boolean = false;
  public mostrarListaDespesa: boolean = false;

  ngOnInit(): void {
    
  }

  editar(id: number){

  }

  recuperarDados(lista: any){

  }

  mostrarReceita(){
    this.mostrarListaReceita = true;
    this.mostrarListaDespesa = false;
    this.listarReceitas();
  }

  mostrarDespesa(){
    this.mostrarListaReceita = false;
    this.mostrarListaDespesa = true;
    this.listarDespesas()
  }

  public listarReceitas(){
    this.movimentoFinanceiroService.listarMovimentoFinanceiroReceita().pipe(take(1)).subscribe(
      res => {
        this.listaReceitas = res;
      }
    )
  }

    public listarDespesas(){
    this.movimentoFinanceiroService.listarMovimentoFinanceiroDespesa().pipe(take(1)).subscribe(
      res => {
        this.listaDespesas = res;
      }
    )
  }
}
