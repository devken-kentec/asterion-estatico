import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Periodo } from '../../../domain/periodo.domain';
import { SharedService } from '../../../../shared/shared.service';
import { take } from 'rxjs';
import { DescricaoReceita } from '../../../domain/descricao-receita.domain';
import { DescricaoDespesa } from '../../../domain/descricao-despesa.domain';
import { MovimentoFinanceiroService } from '../movimento-financeiro.service';
import { MovimentoFinanceiroDespesa, MovimentoFinanceiroReceita } from '../../../domain/movimento-financeiro.domain';
import { Carteira } from '../../../domain/carteira.domain';

@Component({
  selector: 'app-movimento-financeiro-form',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './movimento-financeiro-form.component.html',
  styleUrl: './movimento-financeiro-form.component.css',
  preserveWhitespaces: true
})
export class MovimentoFinanceiroFormComponent {

    private fb = inject(FormBuilder);
    private sharedService = inject(SharedService);
    private movimentoFinanceiroService = inject(MovimentoFinanceiroService);

    movFinForm!: FormGroup;
    descricaoReceitas: DescricaoReceita[] = [];
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
      this.preencherComboboxCarteira();
    }

    public preencherFromMovFinReceita(movimentoFinan: MovimentoFinanceiroReceita) {
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
        
          this.movFinForm.get('receita')?.setValue(true);
          this.movimentoFinanceiroService.salvarReceita(form.value).pipe(take(1)).subscribe({
              next: (res) => {
                  this.preencherFromMovFinReceita(res);
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
