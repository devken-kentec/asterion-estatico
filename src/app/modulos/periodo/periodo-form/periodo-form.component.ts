import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Periodo } from '../../../domain/periodo.domain';
import { SharedService } from '../../../../shared/shared.service';
import { MovimentoFinanceiroService } from '../../movimento-financeiro/movimento-financeiro.service';

@Component({
  selector: 'app-periodo-form',
  imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule
  ],
  templateUrl: './periodo-form.component.html',
  styleUrl: './periodo-form.component.css'
})
export class PeriodoFormComponent {
    private fb = inject(FormBuilder);
    private sharedService = inject(SharedService);
    private movimentoFinanceiroService = inject(MovimentoFinanceiroService);
    
    periodoForm!: FormGroup;
    
    ngOnInit() {
      this.periodoForm = this.fb.group({
        id: [''],
        periodo: [''],
        status: ['']
      });
    }
  
    salvarStatusPeriodo(): void{
      let form = this.periodoForm;
      if(form.valid){
        console.log('Formulário válido. Dados do período:', form.value);
      }
    } 
}
