import { Component } from '@angular/core';

@Component({
  selector: 'app-movimento-financeiro-despesa-list',
  imports: [],
  templateUrl: './movimento-financeiro-despesa-list.component.html',
  styleUrl: './movimento-financeiro-despesa-list.component.css'
})
export class MovimentoFinanceiroDespesaListComponent {


  // public listaAvancadaDespesa(): void {
  //     console.log(this.dataInicial, this.dataFinal);
  //     this.movimentoFinanceiroService.buscaAvancadaDespesa(this.dataInicial, this.dataFinal).pipe(take(1)).subscribe(
  //       res => { this.listaDespesas = res }
  //     );
  //   }

  // public listarDespesas(){
  //   this.movimentoFinanceiroService.listarMovimentoFinanceiroDespesa().pipe(take(1)).subscribe(
  //     res => {
  //       this.listaDespesas = res;
  //       res.forEach(element => {
  //          this.somaDespesa = this.somaDespesa + element.valor;
  //       });
  //     }
  //   )
  // }
}
