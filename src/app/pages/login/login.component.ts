import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    auth = inject(AuthService);
    router = inject(Router);


    constructor(){
      effect(()=>{
        console.log("Algo ha cambiado en estas signals")
        if(this.auth.$isLoggedIn()){
          this.router.navigate(['home']);
        }
      })
    }
    login(){
      if(this.auth.$isLoggedIn())
        return;

      this.auth.login();
    }
}  
