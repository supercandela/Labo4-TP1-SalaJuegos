import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

import { Auth, signOut } from '@angular/fire/auth';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nombreUsuario: string = '';

  constructor(
    // private authService: AuthService, 
    private router: Router,
    private auth: Auth
  ) {}

  cerrarSesion (){
    signOut(this.auth).then(() => {
      console.log(this.auth.currentUser?.email)
    })
  }
}
