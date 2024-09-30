import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public isLogin: boolean = true;
  private usuarioMail: string = '';
  private errorMensaje: string = '';
  public loginsCollection: any[] = [];
  public countLogins: number = 0;
  private sub!: Subscription;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  async authenticate(email: string, password: string) {
    let authObs;

    //Chequea si el usuario se quiere loguear o si quiere crear una nueva cuenta y hace el llamado a la api según lo que necesita
    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.registrarNuevoUsuario(email, password);
    }

    if (authObs != undefined) {
      authObs
        .then((res) => {
          if (res.user.email !== null) {
            this.usuarioMail = res.user.email;
            this.registrarLogUsuario();
            this.router.navigateByUrl('/home');
          }
        })
        .catch((e) => {
          switch (e.code) {
            case 'auth/weak-password':
              this.errorMensaje = 'La clave es muy débil. Debe tener al menos 6 caracteres.';
              break;
            case 'auth/invalid-credential':
              this.errorMensaje = 'Usuario o contraseña incorrectos. Verificá tus credenciales.';
              break;
            case 'auth/email-already-in-use':
              this.errorMensaje = 'El email ingresado ya está registrado.';
              break;
            case 'auth/invalid-email':
              this.errorMensaje = 'El email ingresado no es válido.';
              break;
            default:
              this.errorMensaje = e.code;
              break;
          }
          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal...',
            text: this.errorMensaje,
          });
        });
    }
  }

  onSubmit(authform: NgForm) {
    if (!authform.valid) {
      return;
    }

    const email = authform.value.email;
    const password = authform.value.password;

    this.authenticate(email, password);
  }

  cambiarEntreIngresoYRegistro() {
    this.isLogin = !this.isLogin;
  }

  loginRapido(authform: NgForm, email: string, password: string) {
    authform.controls['email'].setValue(email);
    authform.controls['password'].setValue(password);
  }

  registrarLogUsuario() {
    let col = collection(this.firestore, 'logins');
    addDoc(col, { fecha: new Date(), usuario: this.usuarioMail });
  }

  getLoginsUsuarios() {
    let col = collection(this.firestore, 'logins');
    const observable = collectionData(col);

    this.sub = observable.subscribe((respuesta: any) => {
      this.loginsCollection = respuesta;
      this.countLogins = this.loginsCollection.length;
      console.log(respuesta);
    });
  }
}
