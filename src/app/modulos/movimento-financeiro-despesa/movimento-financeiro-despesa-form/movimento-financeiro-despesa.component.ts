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
    private movimentoFinanceiroService = inject(MovimentoFinanceiroService);

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
        dataReceita: [''],
        dataDespesa: [''],
        dataRecebimento: [''],
        dataPagamento: [''],
        statusRecebimento: [''],
        statusPagamento: [''],
        tipoRecebimento: [''],
        tipoPagamento: [''],
        formaRecebimento: [''],
        formaPagamento: [''],
        valor: [''],
        receita: [''],
        despesa: [''],
        observacao: [''],
        userId: [''],
        periodoId: [''],
        carteiraId: [''], 
        descricaoReceitaId: [''],
        descricaoDespesaId: ['']
      });

      this.preencherComboboxPeriodo();
      this.preencherComboboxDescricaoReceita();
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
    
        public preencherComboboxDescricaoReceita() {
          this.sharedService.comboboxDescricaoReceita().pipe(take(1)).subscribe({
             next: (res) => {
               this.descricaoReceitas = res;
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
        if(this.idFin){
          this.movFinForm.get('receita')?.setValue(true);
          this.movimentoFinanceiroService.salvarReceita(form.value).pipe(take(1)).subscribe({
              next: (res) => {
                  
                  this.sharedService.saveShow("Registro Salvo", "Sucesso!")
              },
              error: (err) => {
                console.log(err);
                this.sharedService.warningShow("Ops! Algo Errado!!", "Verifique o Console!");
              }
            });
        } else {
          this.movFinForm.get('despesa')?.setValue(false);
          this.movimentoFinanceiroService.salvarDespesa(form.value).pipe(take(1)).subscribe({
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
    }
    public novoRegistro(): void {
      this.movFinForm.reset();
    }

}
