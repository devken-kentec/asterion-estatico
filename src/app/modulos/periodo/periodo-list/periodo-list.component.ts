import { Component, inject } from '@angular/core';
import { Periodo } from '../../../domain/periodo.domain';
import { PeriodoService } from '../periodo.service';
import { take } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-periodo-list',
  imports: [
    RouterLink
  ],
  templateUrl: './periodo-list.component.html',
  styleUrl: './periodo-list.component.css',
  preserveWhitespaces: true
})
export class PeriodoListComponent {

  private periodoService = inject(PeriodoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public listaPeriodos: Periodo[] = [];

  public ngOnInit(): void {
    this.listarPeriodos();
  }

  public editar(id: number){
     this.router.navigate(["editar", id], { relativeTo: this.route });
  }

  public listarPeriodos(): void {
    this.periodoService.listarPeriodos().pipe(take(1)).subscribe((res: Periodo[]) => {
      this.listaPeriodos = res;
    });
  }
}
