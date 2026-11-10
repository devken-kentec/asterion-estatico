import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../../../shared/shared.service';
import { MovimentoFinanceiroService } from '../../movimento-financeiro/movimento-financeiro.service';
import { DescricaoReceita } from '../../../domain/descricao-receita.domain';
import { DescricaoDespesa } from '../../../domain/descricao-despesa.domain';
import { Periodo } from '../../../domain/periodo.domain';
import { Carteira } from '../../../domain/carteira.domain';
import { take } from 'rxjs';
import { MovimentoFinanceiroDespesa } from '../../../domain/movimento-financeiro.domain';
import { MovimentoFinanceiroDespesaService } from '../movimento-financeiro-despesa.service';

@Component({
  selector: 'app-movimento-financeiro-despesa',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './movimento-financeiro-despesa.component.html',
  styleUrl: './movimento-financeiro-despesa.component.css'
})
export class MovimentoFinanceiroDespesaComponent {

    private fb = inject(FormBuilder);
    private sharedService = inject(SharedService);
    private movimentoFinanceiroDespesaService = inject(MovimentoFinanceiroDespesaService);

    movFinForm!: FormGroup;
    idFin!: boolean;
    descricaoReceitas: DescricaoReceita[] = [];
    descricaoDespesas: DescricaoDespesa[] = [];
    periodos: Periodo[] = [];
    carteiras: Carteira[] = [];

    ngOnInit() {
      this.movFinForm = this.fb.group({
        id: [''],
        numeroDocumento: [''],
        dataDespesa: [''],
        dataPagamento: [''],
        statusPagamento: [''],
        tipoPagamento: [''],
        formaPagamento: [''],
        valor: [''],
        despesa: [''],
        observacao: [''],
        userId: [''],
        periodoId: [''],
        carteiraId: [''], 
        descricaoDespesaId: [''],
        destino: ['']
      });

      this.preencherComboboxPeriodo();
      this.preencherComboboxDescricaoDespesa();
      this.preencherComboboxCarteira();
      this.idFin = true;
    }

    public preencherFromMovFinDespesa(movimentoFinan: MovimentoFinanceiroDespesa) {
      this.movFinForm.patchValue(movimentoFinan);
    }

    public preencherComboboxPeriodo() {
      this.sharedService.comboboxPeriodoVigente().pipe(take(1)).subscribe({
          next: (res) => {
            this.periodos = res;
          },
          error: (err) => {
            console.log(err);
            //this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
          }
      });
    }

    public preencherComboboxDescricaoDespesa() {
      this.sharedService.comboboxDescricaoDespesa().pipe(take(1)).subscribe({
          next: (res) => {
            this.descricaoDespesas = res;  
          },
          error: (err) => {
            console.log(err);
            //this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
          }
      });
    }

    public preencherComboboxCarteira() {
      this.sharedService.comboboxCarteira().pipe(take(1)).subscribe({
          next: (res) => {
            this.carteiras = res;  
          },
          error: (err) => {
            console.log(err);
            //this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
          }
      });
    }
   
    public salvarMovimentoFinanceiro() {
      let form = this.movFinForm;
      if(form.valid){
        form.get('userId')?.setValue(1);
          this.movFinForm.get('despesa')?.setValue(false);
          this.movimentoFinanceiroDespesaService.salvarDespesa(form.value).pipe(take(1)).subscribe({
              next: (res) => {
                  this.preencherFromMovFinDespesa(res);
                  this.sharedService.saveShow("Registro Salvo", "Sucesso!")
              },
              error: (err) => {
                console.log(err);
                this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
              }
            });
        }
    }

    public novoRegistro(): void {
      this.movFinForm.reset();
    }

}
