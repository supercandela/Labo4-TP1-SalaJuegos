import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-codigo-secreto',
  templateUrl: './codigo-secreto.component.html',
  styleUrl: './codigo-secreto.component.css',
})
export class CodigoSecretoComponent {
  tiempo: number = 0;
  timerInterval: any; // Guardará el ID del setInterval para poder detenerlo
  codigoSecreto: number[] = [];
  intentoCodigoActual: number[] = [];
  intentosAnteriores: { numerosIngresados: number[]; pistas: string[] }[] = [];
  numeroYPosicion: number = 0;
  intentos: number = 1;
  intentosMaximos: number = 10;
  botonesDeshabilitados: boolean[] = Array(10).fill(false);

  constructor() {
    this.reiniciarPartida();
  }

  reiniciarPartida() {
    this.generarCodigoSecreto();
    this.intentos = 1;
    this.intentosAnteriores = [];
    this.iniciarReloj();
  }

  // Función para iniciar el reloj
  iniciarReloj() {
    // Inicializar el tiempo
    this.tiempo = 0;
    // Configurar el intervalo que se ejecuta cada segundo
    this.timerInterval = setInterval(() => {
      this.tiempo++;
    }, 1000); // Se ejecuta cada 1000 milisegundos (1 segundo)
  }

  // Función para detener el reloj
  detenerReloj() {
    clearInterval(this.timerInterval);
  }

  // Función para generar el código secreto con 4 dígitos diferentes
  generarCodigoSecreto() {
    const digitos = new Set<number>();

    while (digitos.size < 4) {
      const numeroRandom = Math.floor(Math.random() * 10);
      digitos.add(numeroRandom);
    }

    this.codigoSecreto = Array.from(digitos);
    console.log('Código secreto generado:', this.codigoSecreto);
  }

  agregarDigito(digito: number) {
    if (this.intentoCodigoActual.length < 4) {
      this.intentoCodigoActual.push(digito);
      this.botonesDeshabilitados[digito] = true;
    }
  }

  borrarUltimo() {
    this.botonesDeshabilitados[
      this.intentoCodigoActual[this.intentoCodigoActual.length - 1]
    ] = false;
    this.intentoCodigoActual.pop();
  }

  compararCodigoIngresado() {
    this.numeroYPosicion = 0;
    let rojas: string[] = [];
    let amarillas: string[] = [];
    let grises: string[] = [];
    let pistasAGuardar: string[] = [];

    // Comparar los dígitos ingresados con el código secreto
    this.intentoCodigoActual.forEach((digit, index) => {
      if (digit === this.codigoSecreto[index]) {
        this.numeroYPosicion++;
        rojas.push('red');
      } else if (this.codigoSecreto.includes(digit)) {
        amarillas.push('yellow');
      } else {
        grises.push('grey');
      }
    });

    pistasAGuardar = [...rojas, ...amarillas, ...grises];
    // Agregar este intento a la lista de intentos
    this.intentosAnteriores.push({
      numerosIngresados: [...this.intentoCodigoActual],
      pistas: pistasAGuardar,
    });

    // Reiniciar para un nuevo intento
    this.intentoCodigoActual = [];
    this.resetButtons();
    this.checkGameStatus();
  }

  resetButtons(): void {
    this.botonesDeshabilitados = Array(10).fill(false);
  }

  // Función para verificar si el jugador ha adivinado o si perdió
  checkGameStatus() {
    if (this.numeroYPosicion == 4) {
      this.detenerReloj();
      Swal.fire({
        icon: 'success',
        title: '¡Ganaste!',
        text: 'Adivinaste el código en: ' + this.tiempo + ' segundos',
      });
    } else if (this.intentos >= this.intentosMaximos) {
      Swal.fire({
        icon: 'error',
        title: '¡Perdiste!',
        text: 'El código era: ' + this.codigoSecreto.join(' '),
      });
    }
    this.intentos++;
  }
}
