import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioActivo: User | null = null;

  constructor(private auth: Auth) {
    onAuthStateChanged(auth, (usuario) => {
      this.usuarioActivo = usuario;
    });
  }

  registrarNuevoUsuario(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    signOut(this.auth).then(() => {
      console.log(this.auth.currentUser?.email);
    });
  }

  getUsuario() {
    return this.usuarioActivo?.email ? this.usuarioActivo?.email : '';
  }

  sesionActiva() {
    return !!this.usuarioActivo;
  }
}
