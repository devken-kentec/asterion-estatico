import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgClass,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'asterion';

  private sharedService = inject(SharedService);
  private router = inject(Router);

  public open: boolean = false;
  public anoCorrente!: number;
  public url_atual!: string;

  ngOnInit() {
    //this.router.navigate(['/home']);
    this.anoCorrente = new Date().getFullYear();
  }

  public abrirMenu() {
    this.open = !this.open;
  }
}
