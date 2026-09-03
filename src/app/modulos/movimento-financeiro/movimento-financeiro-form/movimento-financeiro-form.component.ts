import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Periodo } from '../../../domain/periodo.domain';
import { SharedService } from '../../../../shared/shared.service';
import { take } from 'rxjs';
import { DescricaoReceita } from '../../../domain/descricao-receita.domain';
import { DescricaoDespesa } from '../../../domain/descricao-despesa.domain';
import { MovimentoCaixa } from '../../../domain/movimento-caixa.domain';
import { MovimentoFinanceiroService } from '../movimento-financeiro.service';
import { MovimentoFinanceiroDespesa, MovimentoFinanceiroReceita } from '../../../domain/movimento-financeiro.domain';

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
    caixaForm!: FormGroup;
    contaForm!: FormGroup;
    idFin!: boolean;
    descricaoReceitas: DescricaoReceita[] = [];
    descricaoDespesas: DescricaoDespesa[] = [];
    movimentosCaixa: MovimentoCaixa[] = [];
    periodos: Periodo[] = [];

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
        descricaoReceitaId: [''],
        descricaoDespesaId: ['']
      });

      this.caixaForm = this.fb.group({
        id: [''],
        entrada: [''],
        saida: [''],
        data: [''],
        status: [''],
        userId: [''],
        movimentoFinanceiroId: ['']
      });

    this.contaForm = this.fb.group({
        id: [''],
        entrada: [''],
        saida: [''],
        data: [''],
        status: [''],
        prazo: [''],
        userId: [''],
        movimentoFinanceiroId: ['']
      });
      
      this.preencherComboboxPeriodo();
      this.preencherComboboxDescricaoReceita();
      this.preencherComboboxDescricaoDespesa();
      this.idFin = true;
    }

    public escolherOperacao(){
        this.idFin = !this.idFin;
        this.movFinForm.reset();
    }

    public preencherFromMovFinReceita(movimentoFinan: MovimentoFinanceiroReceita) {
      this.movFinForm.patchValue(movimentoFinan);
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

    public salvarMovimentoFinanceiro() {
      let form = this.movFinForm;
      if(form.valid){
        form.get('userId')?.setValue(1);
        if(this.idFin){
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
