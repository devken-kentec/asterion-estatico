import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DespesaService } from '../despesa.service';
import { take } from 'rxjs';
import { DescricaoDespesa } from '../../../domain/descricao-despesa.domain';

@Component({
  selector: 'app-despesa-list',
  imports: [
      RouterLink
  ],
  templateUrl: './despesa-list.component.html',
  styleUrl: './despesa-list.component.css'
})
export class DespesaListComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private despesaService = inject(DespesaService);

  public listarDespesas: DescricaoDespesa[] = [];

  public ngOnInit(): void {
    this.listarDespesa();
  }

  public editar(id: number){
      this.router.navigate(["editar", id], { relativeTo: this.route });
  }
  
  public listarDespesa(): void {
    this.despesaService.listarDespesa().pipe(take(1)).subscribe((res: DescricaoDespesa[]) => {
      this.listarDespesas = res;
    });
  }
}
