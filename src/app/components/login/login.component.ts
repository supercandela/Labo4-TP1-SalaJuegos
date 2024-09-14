import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { Observable } from 'rxjs';
// import { AuthResponseData, AuthService } from './auth.service';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';

import { BehaviorSubject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  private isLoading: boolean = false;
  public isLogin: boolean = true;
  private usuarioMail: string = '';
  private errorMensaje: string = '';
  public loginsCollection:any[] = [];
  public countLogins:number = 0;
  private sub!:Subscription;
  
  constructor(
    // private authService: AuthService, 
    private router: Router,
    public auth: Auth,
    private firestore: Firestore
  ) {}

  async authenticate (email: string, password: string) {
    this.isLoading = true;

    //Chequea si el usuario se quiere loguear o si quiere crear una nueva cuenta y hace el llamado a la api según lo que necesita
    if (this.isLogin) {
      await signInWithEmailAndPassword(this.auth, email, password).then((res) => {
        if (res.user.email !== null) {
          this.usuarioMail = res.user.email;
          this.router.navigateByUrl('/home');
        }
      }).catch((e) => {
        switch (e.code) {
          case "auth/invalid-credential":
            this.errorMensaje = "El email ingresado no está registrado.";
            break;
          case "auth/email-already-in-use":
            this.errorMensaje = "El email ingresado ya está registrado.";
            break;
          default:
            this.errorMensaje = e.code
            break;
        }
        Swal.fire({
          icon: "error",
          title: "Algo salió mal...", 
          text: this.errorMensaje
        });
      })
    } else {
      await createUserWithEmailAndPassword(this.auth, email, password).then((res) => {
        if (res.user.email !== null) {
          this.usuarioMail = res.user.email;
          Swal.fire({
            icon: "success",
            title: "¡Bienvenido!", 
            text: "Usuario creado con éxito."
          });
          this.router.navigateByUrl('/home');
        }       
      }).catch((e) => {
        console.log(e);
        switch (e.code) {
          case "auth/invalid-email":
            this.errorMensaje = "El email ingresado no es válido.";
            break;
          case "auth/email-already-in-use":
            this.errorMensaje = "El email ingresado ya está registrado.";
            break;
          default:
            this.errorMensaje = e.code
            break;
        }
        Swal.fire({
          icon: "error",
          title: "Algo salió mal...", 
          text: this.errorMensaje
        });
      });
    }

    this.registrarLogUsuario();
  }

  onSubmit (authform: NgForm) {
    if (!authform.valid) {
      return;
    }

    const email = authform.value.email;
    const password = authform.value.password;

    console.log(email, password);

    this.authenticate(email, password);
  }

  cambiarEntreIngresoYRegistro () {
    this.isLogin = !this.isLogin;
  }

  // logout (){
  //   signOut(this.auth).then(() => {
  //     console.log(this.auth.currentUser?.email)
  //   })
  // }

  loginRapido (authform: NgForm, email: string, password: string) {
    authform.controls['email'].setValue(email);
    authform.controls['password'].setValue(password);
  }

  registrarLogUsuario () {
    let col = collection(this.firestore, 'logins');
    addDoc(col, { fecha: new Date(), "usuario": this.usuarioMail});
  }

  getLoginsUsuarios () {
    let col = collection(this.firestore, 'logins');
    const observable = collectionData(col);

    this.sub = observable.subscribe((respuesta:any) => {
      this.loginsCollection = respuesta;
      this.countLogins = this.loginsCollection.length;
      console.log(respuesta);
    })
  }

}