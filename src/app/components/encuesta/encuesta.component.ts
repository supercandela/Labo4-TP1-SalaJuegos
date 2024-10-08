import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css',
})
export class EncuestaComponent {
  encuestaForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [
        '18',
        [Validators.required, Validators.min(18), Validators.max(99)],
      ],
      telefono: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{1,10}$')],
      ],
      recomendar: ['', Validators.required],
      juegoFavorito: ['', Validators.required],
      juegosNuevos: ['', Validators.required],
    });
  }

  enviarEncuesta() {
    if (this.encuestaForm.valid) {
      console.log('Formulario válido:', this.encuestaForm.value.nombre);
      let col = collection(this.firestore, 'encuestas');
      addDoc(col, {
        apellido: this.encuestaForm.value.apellido,
        edad: this.encuestaForm.value.edad,
        juegoFavorito: this.encuestaForm.value.juegoFavorito,
        juegosNuevos: this.encuestaForm.value.juegosNuevos,
        nombre: this.encuestaForm.value.nombre,
        recomendar: this.encuestaForm.value.recomendar,
        telefono: this.encuestaForm.value.telefono,
      });
    } else {
      console.log('Formulario no válido');
      this.encuestaForm.markAllAsTouched();
    }
  }
}
