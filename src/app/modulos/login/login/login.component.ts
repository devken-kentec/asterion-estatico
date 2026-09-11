import { Component, inject } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { User } from '../../../domain/user.domain';

@Component({
  selector: 'app-login',
  imports: [
         RouterModule, 
         FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private sharedService = inject(SharedService);
  private router = inject(Router)

  public email!: string;
  public senha!: string;
  public normal: boolean = true;
  public submeter: boolean = false;

  public emailR!:  string;
  public senhaR1!: string;
  public senhaR2!: string;

  public recuperarSenha(){
    this.normal = !this.normal;
  }

  public testarSenha(){
    if(this.senhaR1 === this.senhaR2){
        this.submeter = true;
    }
  }

  public logarUser(){
     if(this.email !== "" && this.senha !== ""){
       this.sharedService.loginApi(this.email, this.senha).pipe(take(1)).subscribe((res: User)=>{
          if(res.nome){
              let autentication: string = "true";
              sessionStorage.setItem('nome', res.nome);
              sessionStorage.setItem('chaveUsuario', res.chaveUsuario);
              sessionStorage.setItem('role', res.role);
              sessionStorage.setItem('autenticacao', autentication);

              if(res.role === "DEV-SYSTEM"){
                this.router.navigate(['/manager/system']);
              } else if (res.role === "ADM-SYSTEM") {
                this.router.navigate(['/produto']);
              } else {
                this.router.navigate(['/home']);
              } 
          }
      });
     }
  }
}
