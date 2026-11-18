import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../../../shared/shared.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-receita-form',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './receita-form.component.html',
  styleUrl: './receita-form.component.css'
})
export class ReceitaFormComponent {

    private fb = inject(FormBuilder);
    private sharedService = inject(SharedService);

    receitaForm!: FormGroup;

    ngOnInit() {
      this.receitaForm = this.fb.group({
        id: [''],
        receita: [''],
        status: ['']
      });
    }
}
