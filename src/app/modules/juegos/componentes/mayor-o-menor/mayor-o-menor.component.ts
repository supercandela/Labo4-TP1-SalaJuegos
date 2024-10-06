import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { CartasService } from '../../../../services/cartas.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css',
})
export class MayorOMenorComponent implements OnInit, OnDestroy {
  idMazo: string = '';
  cartas: any;
  contadorMazo: number = 0;
  cartaActual: any;
  cartaSiguiente: any;
  esCorrecto: boolean = false;
  mensajePostEleccion: string = '';
  subMazo?: Subscription;
  subCartas?: Subscription;
  cardImage: string = '';
  puntaje: number = 0;
  secuencia: number = 0;
  partidaFinalizada: boolean = false;
  private usuarioMail: string = '';

  constructor(
    private cartasService: CartasService,
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subMazo = this.cartasService.getMazoId().subscribe((mazo) => {
      this.idMazo = mazo.deck_id;
      this.pedirCartas();
    });
  }

  pedirCartas() {
    this.subCartas = this.cartasService
      .getCartas(this.idMazo)
      .subscribe((cartas) => {
        this.cartas = cartas;
        this.cardImage = this.cartas.cards[this.contadorMazo].images.png;
      });
  }

  reiniciarPartida() {
    this.puntaje = 0;
    this.secuencia = 0;
    this.esCorrecto = false;
    this.partidaFinalizada = false;
    this.contadorMazo = 0;
    this.mensajePostEleccion = '';
    this.cartasService
      .mezclarCartas(this.idMazo)
      .subscribe(() => this.pedirCartas());
  }

  setearValorCarta(carta: any) {
    let valorCarta;
    switch (carta.value) {
      case 'KING':
        valorCarta = '13';
        break;
      case 'QUEEN':
        valorCarta = '12';
        break;
      case 'JACK':
        valorCarta = '11';
        break;
      case 'ACE':
        valorCarta = '1';
        break;
      default:
        valorCarta = carta.value;
        break;
    }
    return parseInt(valorCarta);
  }

  suponerProximaCarta(valorElegido: string) {
    this.cartaActual = this.cartas.cards[this.contadorMazo];
    this.cartaSiguiente = this.cartas.cards[this.contadorMazo + 1];

    let condicion = false;
    let actual = this.setearValorCarta(this.cartaActual);
    let siguiente = this.setearValorCarta(this.cartaSiguiente);

    switch (valorElegido) {
      case 'mayor':
        condicion = actual < siguiente;
        break;
      case 'menor':
        condicion = actual > siguiente;
        break;
      case 'igual':
        condicion = actual == siguiente;
        break;
    }

    if (condicion) {
      this.esCorrecto = true;
      this.mensajePostEleccion = '¡Acertaste!';
      this.secuencia++;
      this.puntaje += this.secuencia * 1; // Sumar un punto si acierta
    } else {
      this.esCorrecto = false;
      this.mensajePostEleccion = '¡Error!';
      this.secuencia = 0;
    }

    this.cardImage = this.cartas.cards[this.contadorMazo + 1].images.png;
    this.contadorMazo++;

    if (this.contadorMazo == 51) {
      this.partidaFinalizada = true;
      this.mensajePostEleccion = 'Partida Finalizada.';
      this.registrarPuntaje();
    }
  }

  registrarPuntaje() {
    // quién jugó
    this.usuarioMail = this.authService.getUsuario();
    const fechaActual = new Date();
    // en qué día
    const dia = fechaActual.toISOString().split('T')[0];
    // en qué hora
    const hora = fechaActual.toTimeString().split(' ')[0];
    // qué puntaje obtuvo -> this.tiempo

    let col = collection(this.firestore, 'topMayorOMenor');
    addDoc(col, {
      usuario: this.usuarioMail,
      puntaje: this.puntaje,
      dia: dia,
      hora: hora,
    });
  }

  ngOnDestroy() {
    this.subMazo?.unsubscribe();
    this.subCartas?.unsubscribe();
  }
}
