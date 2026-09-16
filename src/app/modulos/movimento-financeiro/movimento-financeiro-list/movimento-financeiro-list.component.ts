import { Component, inject } from '@angular/core';
import { MovimentoFinanceiroDespesa, MovimentoFinanceiroReceita } from '../../../domain/movimento-financeiro.domain';
import { MovimentoFinanceiroService } from '../movimento-financeiro.service';
import { take } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movimento-financeiro-list-receita',
  imports: [
    RouterLink,
    NgClass,
    FormsModule
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
  public mostrarListaResultado: boolean = false;

  public somaReceita: number = 0;
  public somaDespesa: number = 0;

  public dataInicial!: string;
  public dataFinal!: string;

  ngOnInit(): void {
    
  }

  public editar(id: number){

  }

  public recuperarDados(lista: any){

  }

  public mostrarReceita(){
    this.mostrarListaReceita = true;
    this.mostrarListaDespesa = false;
    this.mostrarListaResultado =  false;
    this.listarReceitas();
  }

  public mostrarDespesa(){
    this.mostrarListaReceita = false;
    this.mostrarListaDespesa = true;
    this.mostrarListaResultado =  false;
    this.listarDespesas();
  }

  public mostrarResultado(){
    this.somaReceita = 0;
    this.somaDespesa = 0;
    this.mostrarListaReceita = false;
    this.mostrarListaDespesa = false;    
    this.mostrarListaResultado =  true;
    this.listarReceitas();
    this.listarDespesas();
  }

  public listaAvancada(): void {
    console.log(this.dataInicial, this.dataFinal);
    this.movimentoFinanceiroService.buscaAvancada(this.dataInicial, this.dataFinal).pipe(take(1)).subscribe(
      res => { this.listaReceitas = res }
    );
  }

  public listaAvancadaDespesa(): void {
    console.log(this.dataInicial, this.dataFinal);
    this.movimentoFinanceiroService.buscaAvancadaDespesa(this.dataInicial, this.dataFinal).pipe(take(1)).subscribe(
      res => { this.listaDespesas = res }
    );
  }

  public listarReceitas(){
    this.movimentoFinanceiroService.listarMovimentoFinanceiroReceita().pipe(take(1)).subscribe(
      res => {
        this.listaReceitas = res;
        res.forEach(element => {
           this.somaReceita = this.somaReceita + element.valor;
        });
      }
    )
  }

    public listarDespesas(){
    this.movimentoFinanceiroService.listarMovimentoFinanceiroDespesa().pipe(take(1)).subscribe(
      res => {
        this.listaDespesas = res;
        res.forEach(element => {
           this.somaDespesa = this.somaDespesa + element.valor;
        });
      }
    )
  }

  public mostrarResulatado(valorReceita: number, valorDespesa: number): number {
    return valorReceita - valorDespesa;
  }
}
