import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  nombreUsuario: string = '';

  constructor(
    // private authService: AuthService, 
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.nombreUsuario = this.authService.getUsuario();
  }

  cerrarSesion (){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
