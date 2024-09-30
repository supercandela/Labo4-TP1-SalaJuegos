import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  tieneSesionActiva: boolean = false;
  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.tieneSesionActiva = this.authService.sesionActiva();
    this.nombreUsuario = this.authService.getUsuario();
  }

  cerrarSesion (){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
