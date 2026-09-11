import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DescricaoReceita } from '../../../domain/descricao-receita.domain';
import { ReceitaService } from '../receita.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-receita-list',
  imports: [
   
  ],
  templateUrl: './receita-list.component.html',
  styleUrl: './receita-list.component.css'
})
export class ReceitaListComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private receitaService = inject(ReceitaService);

  public listaDescricoesReceita: DescricaoReceita[] = [];

    public ngOnInit(): void {
      
    }
  
    public editar(id: number){
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }
    
    public listarReceita(): void {
      this.receitaService.listarReceita().pipe(take(1)).subscribe((res: DescricaoReceita[]) => {
        this.listaDescricoesReceita = res;
      });
    }
}
